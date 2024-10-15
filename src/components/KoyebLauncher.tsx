import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from 'sonner';

const launchKoyebInstance = async (apiKey: string) => {
  const response = await axios.post(
    'https://app.koyeb.com/v1/services',
    {
      name: 'model-training-instance',
      definition: {
        name: 'model-training',
        scalings: [{ min: 1, max: 1 }],
        ports: [{ port: 8080 }],
        env: [{ key: 'MODEL_TYPE', value: 'object-inpainting' }],
        routes: [{ path: '/', port: 8080 }],
        regions: ['par'],
        instance_types: ['nano'],
        deployments: [
          {
            docker: {
              image: 'your-docker-image:latest',
            },
          },
        ],
      },
    },
    {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};

const KoyebLauncher = () => {
  const [apiKey, setApiKey] = useState('');

  const mutation = useMutation({
    mutationFn: () => launchKoyebInstance(apiKey),
    onSuccess: (data) => {
      toast.success(`Koyeb instance launched successfully. Service ID: ${data.service.id}`);
    },
    onError: (error: Error) => {
      toast.error(`Failed to launch Koyeb instance: ${error.message}`);
    },
  });

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium text-gray-900">Launch Koyeb Instance for Model Training</h2>
      <Input
        type="password"
        placeholder="Enter your Koyeb API key"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        className="w-full"
      />
      <Button 
        onClick={() => mutation.mutate()}
        disabled={mutation.isPending || !apiKey}
        className="w-full"
      >
        {mutation.isPending ? 'Launching...' : 'Launch Koyeb Instance'}
      </Button>
    </div>
  );
};

export default KoyebLauncher;