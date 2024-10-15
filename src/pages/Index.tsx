import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import ImageUploader from '@/components/ImageUploader';
import PromptInput from '@/components/PromptInput';
import GenerateButton from '@/components/GenerateButton';
import OutputImage from '@/components/OutputImage';
import KoyebLauncher from '@/components/KoyebLauncher';
import GoogleOAuthForm from '@/components/GoogleOAuthForm';
import HuggingFaceSelector from '@/components/HuggingFaceSelector';

interface IndexProps {
  googleClientId: string;
  googleClientSecret: string;
  huggingFaceApiKey: string;
  setGoogleClientId: (value: string) => void;
  setGoogleClientSecret: (value: string) => void;
  setHuggingFaceApiKey: (value: string) => void;
}

const Index: React.FC<IndexProps> = ({
  googleClientId,
  googleClientSecret,
  huggingFaceApiKey,
  setGoogleClientId,
  setGoogleClientSecret,
  setHuggingFaceApiKey
}) => {
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedDataset, setSelectedDataset] = useState('');

  const handleLoginSuccess = async (credentialResponse: any) => {
    const token = credentialResponse.credential;
    // Use the token for authentication or pass it to your backend
    console.log('Google OAuth token:', token);
    await triggerTraining(token, selectedModel, selectedDataset);
  };

  const triggerTraining = async (token: string, model: string, dataset: string) => {
    try {
      const response = await fetch('http://localhost:3000/train', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: token,
          model: model,
          dataset: dataset,
        }),
      });

      const result = await response.json();
      if (result.status === 'success') {
        window.open('https://script.google.com/macros/s/your-app-id/exec', '_blank');
      }
    } catch (error) {
      console.error('Error triggering training:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Object Inpainting Tool
        </h1>
        <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
          <GoogleOAuthForm
            clientId={googleClientId}
            clientSecret={googleClientSecret}
            onClientIdChange={setGoogleClientId}
            onClientSecretChange={setGoogleClientSecret}
            onSubmit={() => console.log('Google OAuth config saved')}
          />
          <HuggingFaceSelector
            apiKey={huggingFaceApiKey}
            onApiKeyChange={setHuggingFaceApiKey}
            onModelSelect={setSelectedModel}
            onDatasetSelect={setSelectedDataset}
          />
          <ImageUploader />
          <PromptInput label="Custom Prompt" placeholder="Describe the object you want to modify" />
          <PromptInput label="Multi-Layer Prompts" placeholder="Enter multiple prompts, separated by commas (optional)" optional />
          <GoogleOAuthProvider clientId={googleClientId}>
            <GoogleLogin 
              onSuccess={handleLoginSuccess}
              onError={() => console.log('Login Failed')}
            />
          </GoogleOAuthProvider>
          <GenerateButton />
          <OutputImage />
          <KoyebLauncher />
        </div>
      </div>
    </div>
  );
};

export default Index;