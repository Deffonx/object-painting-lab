import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import ImageUploader from '@/components/ImageUploader';
import PromptInput from '@/components/PromptInput';
import GenerateButton from '@/components/GenerateButton';
import OutputImage from '@/components/OutputImage';
import KoyebLauncher from '@/components/KoyebLauncher';
import GoogleOAuthForm from '@/components/GoogleOAuthForm';
import HuggingFaceSelector from '@/components/HuggingFaceSelector';
import { Progress } from "@/components/ui/progress"

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
  const [processingProgress, setProcessingProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleLoginSuccess = async (credentialResponse: any) => {
    const token = credentialResponse.credential;
    console.log('Google OAuth token:', token);
    await triggerTraining(token, selectedModel, selectedDataset);
  };

  const triggerTraining = async (token: string, model: string, dataset: string) => {
    setIsProcessing(true);
    setProcessingProgress(0);
    try {
      // Simulating a long-running process
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 500));
        setProcessingProgress(i);
      }
      // In a real scenario, you would make an API call here
      console.log('Training triggered with:', { token, model, dataset });
      window.open('https://script.google.com/macros/s/your-app-id/exec', '_blank');
    } catch (error) {
      console.error('Error triggering training:', error);
    } finally {
      setIsProcessing(false);
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
          {isProcessing && (
            <div className="mt-4">
              <Progress value={processingProgress} className="w-full" />
              <p className="text-sm text-gray-600 mt-2">Processing: {processingProgress}%</p>
            </div>
          )}
          <OutputImage />
          <KoyebLauncher />
        </div>
      </div>
    </div>
  );
};

export default Index;