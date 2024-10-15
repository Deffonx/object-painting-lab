import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
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
      cacheTime: 1000 * 60 * 30, // 30 minutes
    },
  },
});

const Index = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Object Inpainting Tool
          </h1>
          <div className="bg-white shadow-md rounded-lg p-6 space-y-6">
            <ImageUploader />
            <ModelSelector />
            <PromptInput label="Custom Prompt" placeholder="Describe the object you want to modify" />
            <PromptInput label="Multi-Layer Prompts" placeholder="Enter multiple prompts, separated by commas (optional)" optional />
            <GenerateButton />
            <OutputImage />
            <KoyebLauncher />
          </div>
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Index;