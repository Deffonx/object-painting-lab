import { useState } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";

const queryClient = new QueryClient();

const App = () => {
  const [googleClientId, setGoogleClientId] = useState('');
  const [googleClientSecret, setGoogleClientSecret] = useState('');
  const [huggingFaceApiKey, setHuggingFaceApiKey] = useState('');

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={
              <Index 
                googleClientId={googleClientId}
                googleClientSecret={googleClientSecret}
                huggingFaceApiKey={huggingFaceApiKey}
                setGoogleClientId={setGoogleClientId}
                setGoogleClientSecret={setGoogleClientSecret}
                setHuggingFaceApiKey={setHuggingFaceApiKey}
              />
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;