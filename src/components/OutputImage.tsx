import React from 'react';

const OutputImage = () => {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-medium text-gray-900 mb-2">Output Image</h2>
      <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
        <span className="text-gray-500">Generated image will appear here</span>
      </div>
    </div>
  );
};

export default OutputImage;