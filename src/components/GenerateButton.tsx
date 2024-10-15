import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

const generateImage = async () => {
  // This is a placeholder function. In a real application, you would make an API call here.
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulating API call
  return { imageUrl: 'https://example.com/generated-image.jpg' };
};

const GenerateButton = () => {
  const mutation = useMutation({
    mutationFn: generateImage,
    onSuccess: (data) => {
      toast.success('Image generated successfully!');
      // Here you would update the OutputImage component with the new image URL
    },
    onError: (error) => {
      toast.error('Failed to generate image. Please try again.');
    },
  });

  return (
    <Button 
      onClick={() => mutation.mutate()} 
      disabled={mutation.isLoading}
      className="w-full"
    >
      {mutation.isLoading ? 'Generating...' : 'Generate'}
    </Button>
  );
};

export default GenerateButton;