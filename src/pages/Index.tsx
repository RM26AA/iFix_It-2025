import React, { useState } from 'react';
import { GeminiService } from '@/services/geminiService';
import { ApiKeyInput } from '@/components/ApiKeyInput';
import { MainApp } from '@/components/MainApp';

const Index = () => {
  const [geminiService, setGeminiService] = useState<GeminiService | null>(null);

  const handleApiKeySubmit = (apiKey: string) => {
    const service = new GeminiService(apiKey);
    setGeminiService(service);
  };

  const handleLogout = () => {
    setGeminiService(null);
  };

  if (!geminiService) {
    return <ApiKeyInput onApiKeySubmit={handleApiKeySubmit} />;
  }

  return <MainApp geminiService={geminiService} onLogout={handleLogout} />;
};

export default Index;
