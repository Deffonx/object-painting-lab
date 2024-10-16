import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { Progress } from "@/components/ui/progress"

const ImageUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const selectedFile = acceptedFiles[0];
    setFile(selectedFile);
    simulateUpload();
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif']
    }
  });

  const simulateUpload = () => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prevProgress + 10;
      });
    }, 200);
  };

  return (
    <div className="mt-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-blue-500 bg-blue-50' : ''
        }`}
      >
        <input {...getInputProps()} />
        {file ? (
          <div className="space-y-2">
            <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
            <p className="text-sm text-gray-600">{file.name}</p>
          </div>
        ) : (
          <>
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2 text-sm text-gray-600">
              Drag & drop an image here, or click to select
            </p>
          </>
        )}
      </div>
      {progress > 0 && progress < 100 && (
        <div className="mt-4">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-gray-600 mt-2">Uploading: {progress}%</p>
        </div>
      )}
      <p className="text-xs text-gray-500 mt-2">
        Supported formats: JPEG, PNG, GIF (max 5MB)
      </p>
    </div>
  );
};

export default ImageUploader;