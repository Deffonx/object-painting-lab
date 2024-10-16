import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from 'lucide-react';

interface Model {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

interface Dataset {
  id: string;
  name: string;
  description: string;
}

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
  const [models, setModels] = useState<Model[]>([]);
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedDataset, setSelectedDataset] = useState<string>('');

  useEffect(() => {
    if (apiKey) {
      fetchModelsAndDatasets();
    }
  }, [apiKey]);

  const fetchModelsAndDatasets = async () => {
    try {
      // This is a mock implementation. In a real scenario, you would fetch from the Hugging Face API
      setModels([
        { id: 'model1', name: 'Inpainting Model 1', description: 'Best for general purpose inpainting', imageUrl: 'https://example.com/model1.jpg' },
        { id: 'model2', name: 'Inpainting Model 2', description: 'Specialized for facial inpainting', imageUrl: 'https://example.com/model2.jpg' },
      ]);
      setDatasets([
        { id: 'dataset1', name: 'General Inpainting Dataset', description: 'Contains a variety of images for general inpainting tasks' },
        { id: 'dataset2', name: 'Facial Inpainting Dataset', description: 'Specialized dataset for facial inpainting tasks' },
      ]);
    } catch (error) {
      console.error('Error fetching Hugging Face data:', error);
    }
  };

  const handleModelSelect = (modelId: string) => {
    setSelectedModel(modelId);
    onModelSelect(modelId);
  };

  const handleDatasetSelect = (datasetId: string) => {
    setSelectedDataset(datasetId);
    onDatasetSelect(datasetId);
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
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Model</label>
        <Select onValueChange={handleModelSelect} value={selectedModel}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a model" />
          </SelectTrigger>
          <SelectContent>
            {models.map((model) => (
              <SelectItem key={model.id} value={model.id}>
                {model.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {selectedModel && (
        <Card>
          <CardHeader>
            <CardTitle>{models.find(m => m.id === selectedModel)?.name}</CardTitle>
            <CardDescription>{models.find(m => m.id === selectedModel)?.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <img src={models.find(m => m.id === selectedModel)?.imageUrl} alt="Model example" className="w-full h-32 object-cover rounded-md" />
          </CardContent>
        </Card>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Dataset</label>
        <Select onValueChange={handleDatasetSelect} value={selectedDataset}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a dataset" />
          </SelectTrigger>
          <SelectContent>
            {datasets.map((dataset) => (
              <SelectItem key={dataset.id} value={dataset.id}>
                {dataset.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {selectedDataset && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="w-full">
                Dataset Info <Info className="ml-2 h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{datasets.find(d => d.id === selectedDataset)?.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default HuggingFaceSelector;