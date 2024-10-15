import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface HuggingFaceSelectorProps {
  apiKey: string;
  onApiKeyChange: (value: string) => void;
  onModelSelect: (model: string) => void;
  onDatasetSelect: (dataset: string) => void;
}

const HuggingFaceSelector: React.FC<HuggingFaceSelectorProps> = ({
  apiKey,
  onApiKeyChange,
  onModelSelect,
  onDatasetSelect
}) => {
  const [models, setModels] = useState<string[]>([]);
  const [datasets, setDatasets] = useState<string[]>([]);

  useEffect(() => {
    if (apiKey) {
      fetchModelsAndDatasets();
    }
  }, [apiKey]);

  const fetchModelsAndDatasets = async () => {
    try {
      const modelsResponse = await fetch('https://huggingface.co/api/models', {
        headers: { 'Authorization': `Bearer ${apiKey}` }
      });
      const modelsData = await modelsResponse.json();
      setModels(modelsData.map((model: any) => model.id).slice(0, 10));

      const datasetsResponse = await fetch('https://huggingface.co/api/datasets', {
        headers: { 'Authorization': `Bearer ${apiKey}` }
      });
      const datasetsData = await datasetsResponse.json();
      setDatasets(datasetsData.map((dataset: any) => dataset.id).slice(0, 10));
    } catch (error) {
      console.error('Error fetching Hugging Face data:', error);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Hugging Face Configuration</h2>
      <Input
        type="password"
        placeholder="Hugging Face API Key"
        value={apiKey}
        onChange={(e) => onApiKeyChange(e.target.value)}
      />
      <Select onValueChange={onModelSelect}>
        <SelectTrigger>
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          {models.map((model) => (
            <SelectItem key={model} value={model}>{model}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select onValueChange={onDatasetSelect}>
        <SelectTrigger>
          <SelectValue placeholder="Select a dataset" />
        </SelectTrigger>
        <SelectContent>
          {datasets.map((dataset) => (
            <SelectItem key={dataset} value={dataset}>{dataset}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default HuggingFaceSelector;