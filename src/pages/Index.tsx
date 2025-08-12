import React from 'react';
import { GeminiService } from '@/services/geminiService';
import { MainApp } from '@/components/MainApp';

const Index = () => {
  const geminiService = new GeminiService();

  const handleLogout = () => {
    // No logout needed since API key is hardcoded
    window.location.reload();
  };

  return <MainApp geminiService={geminiService} onLogout={handleLogout} />;
};

export default Index;
