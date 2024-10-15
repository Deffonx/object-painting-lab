import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const models = [
  "black-forest-labs/FLUX.1-schnell",
  "UnfilteredAI/SFW-gen-v2",
  "sd-sfw",
  "creative-freedom-sfw-wai",
  "VGen-SFW"
];

const ModelSelector = () => {
  return (
    <div>
      <label htmlFor="model-select" className="block text-sm font-medium text-gray-700 mb-1">
        Select Model
      </label>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          {models.map((model) => (
            <SelectItem key={model} value={model}>
              {model}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ModelSelector;