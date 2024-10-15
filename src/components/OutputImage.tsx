import React from 'react';
import { useQuery } from '@tanstack/react-query';

const fetchLatestImage = async () => {
  // This is a placeholder function. In a real application, you would fetch the latest generated image here.
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulating API call
  return { imageUrl: 'https://example.com/latest-image.jpg' };
};

const OutputImage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['latestImage'],
    queryFn: fetchLatestImage,
    refetchInterval: 5000, // Refetch every 5 seconds
  });

  if (isLoading) {
    return (
      <div className="mt-6">
        <h2 className="text-lg font-medium text-gray-900 mb-2">Output Image</h2>
        <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
          <span className="text-gray-500">Loading...</span>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mt-6">
        <h2 className="text-lg font-medium text-gray-900 mb-2">Output Image</h2>
        <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
          <span className="text-red-500">Error loading image. Please try again.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <h2 className="text-lg font-medium text-gray-900 mb-2">Output Image</h2>
      {data?.imageUrl ? (
        <img src={data.imageUrl} alt="Generated Image" className="w-full h-64 object-cover rounded-lg" />
      ) : (
        <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
          <span className="text-gray-500">No image generated yet</span>
        </div>
      )}
    </div>
  );
};

export default OutputImage;