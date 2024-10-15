import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface GoogleOAuthFormProps {
  clientId: string;
  clientSecret: string;
  onClientIdChange: (value: string) => void;
  onClientSecretChange: (value: string) => void;
  onSubmit: () => void;
}

const GoogleOAuthForm: React.FC<GoogleOAuthFormProps> = ({
  clientId,
  clientSecret,
  onClientIdChange,
  onClientSecretChange,
  onSubmit
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Google OAuth Configuration</h2>
      <Input
        type="text"
        placeholder="Google Client ID"
        value={clientId}
        onChange={(e) => onClientIdChange(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Google Client Secret"
        value={clientSecret}
        onChange={(e) => onClientSecretChange(e.target.value)}
      />
      <Button onClick={onSubmit}>Save Google OAuth Config</Button>
    </div>
  );
};

export default GoogleOAuthForm;