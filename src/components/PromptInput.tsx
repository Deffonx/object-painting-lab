import React from 'react';
import { Input } from "@/components/ui/input";

interface PromptInputProps {
  label: string;
  placeholder: string;
  optional?: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({ label, placeholder, optional }) => {
  return (
    <div>
      <label htmlFor={label} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {optional && <span className="text-gray-500">(optional)</span>}
      </label>
      <Input
        type="text"
        id={label}
        placeholder={placeholder}
        className="w-full"
      />
    </div>
  );
};

export default PromptInput;