import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

const launchKoyebInstance = async () => {
  // This is a placeholder function. In a real application, you would make an API call to Koyeb here.
  await new Promise(resolve => setTimeout(resolve, 2000)); // Simulating API call
  return { instanceId: 'koyeb-123' };
};

const KoyebLauncher = () => {
  const mutation = useMutation({
    mutationFn: launchKoyebInstance,
    onSuccess: (data) => {
      toast.success(`Koyeb instance launched successfully. Instance ID: ${data.instanceId}`);
    },
    onError: (error) => {
      toast.error('Failed to launch Koyeb instance. Please try again.');
    },
  });

  return (
    <div>
      <h2 className="text-lg font-medium text-gray-900 mb-2">Launch Koyeb Instance for Model Training</h2>
      <Button 
        onClick={() => mutation.mutate()} 
        disabled={mutation.isLoading}
        className="w-full"
      >
        {mutation.isLoading ? 'Launching...' : 'Launch Koyeb Instance'}
      </Button>
    </div>
  );
};

export default KoyebLauncher;