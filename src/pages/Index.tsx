import React, { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import ImageUploader from '@/components/ImageUploader';
import ModelSelector from '@/components/ModelSelector';
import PromptInput from '@/components/PromptInput';
import GenerateButton from '@/components/GenerateButton';
import OutputImage from '@/components/OutputImage';
import KoyebLauncher from '@/components/KoyebLauncher';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes
    },
  },
});

const Index = () => {
  const [accessToken, setAccessToken] = useState('');
  const [hfModels, setHfModels] = useState([]);
  const [hfDatasets, setHfDatasets] = useState([]);
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedDataset, setSelectedDataset] = useState('');

  useEffect(() => {
    const fetchHuggingFaceData = async () => {
      try {
        const modelResponse = await fetch('https://huggingface.co/api/models');
        const models = await modelResponse.json();
        setHfModels(models.slice(0, 10));  // Limit to 10 models for simplicity

        const datasetResponse = await fetch('https://huggingface.co/api/datasets');
        const datasets = await datasetResponse.json();
        setHfDatasets(datasets.slice(0, 10));  // Limit to 10 datasets
      } catch (error) {
        console.error('Error fetching Hugging Face data:', error);
      }
    };

    fetchHuggingFaceData();
  }, []);

  const handleLoginSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    setAccessToken(token);

    await triggerTraining(token, selectedModel, selectedDataset);
  };

  const triggerTraining = async (token, model, dataset) => {
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
  };

  return (
    <QueryClientProvider client={queryClient}>
      <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
        <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
              Object Inpainting Tool
            </h1>
            <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
              <ImageUploader />
              <ModelSelector models={hfModels} onSelect={setSelectedModel} />
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-2">Select Dataset</h2>
                <select 
                  onChange={(e) => setSelectedDataset(e.target.value)}
                  className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  {hfDatasets.map((dataset) => (
                    <option key={dataset.id} value={dataset.id}>{dataset.id}</option>
                  ))}
                </select>
              </div>
              <PromptInput label="Custom Prompt" placeholder="Describe the object you want to modify" />
              <PromptInput label="Multi-Layer Prompts" placeholder="Enter multiple prompts, separated by commas (optional)" optional />
              <GoogleLogin 
                onSuccess={handleLoginSuccess} 
                onError={() => console.log('Login Failed')}
                className="w-full"
              />
              <GenerateButton />
              <OutputImage />
              <KoyebLauncher />
            </div>
          </div>
        </div>
      </GoogleOAuthProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Index;