import React from 'react';
import { Upload } from 'lucide-react';

const ImageUploader = () => {
  return (
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
      <input type="file" id="image-upload" className="hidden" accept="image/*" />
      <label htmlFor="image-upload" className="cursor-pointer">
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <span className="mt-2 block text-sm font-medium text-gray-900">
          Upload Image
        </span>
      </label>
    </div>
  );
};

export default ImageUploader;