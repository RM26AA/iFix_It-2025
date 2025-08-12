import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Languages, Copy, Download, Check, Loader2 } from 'lucide-react';
import { GeminiService } from '@/services/geminiService';
import { LanguageSelector } from './LanguageSelector';
import { toast } from 'sonner';

interface TranslatorProps {
  geminiService: GeminiService;
}

export const Translator: React.FC<TranslatorProps> = ({ geminiService }) => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      toast.error('Please enter text to translate');
      return;
    }
    
    if (!targetLanguage) {
      toast.error('Please select a target language');
      return;
    }

    setIsLoading(true);
    try {
      const result = await geminiService.translateText(inputText, targetLanguage);
      setTranslatedText(result);
      toast.success(`Translated to ${targetLanguage}!`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to translate text');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!translatedText) return;
    
    try {
      await navigator.clipboard.writeText(translatedText);
      setCopied(true);
      toast.success('Translation copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy translation');
    }
  };

  const handleDownload = () => {
    if (!translatedText) return;
    
    const content = `Original Text:\n${inputText}\n\nTranslated to ${targetLanguage}:\n${translatedText}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `translation-${targetLanguage.toLowerCase().replace(/\s+/g, '-')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Translation downloaded as file!');
  };

  return (
    <Card className="card-feature">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Languages className="w-5 h-5 text-primary" />
          Translator
        </CardTitle>
        <CardDescription>
          Translate text to different languages
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Text to Translate
          </label>
          <Textarea
            placeholder="Enter text to translate..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="input-primary min-h-[100px] resize-none"
          />
          <Badge variant="secondary" className="text-xs mt-2">
            {inputText.length} characters
          </Badge>
        </div>

        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Translate to
          </label>
          <LanguageSelector 
            value={targetLanguage}
            onValueChange={setTargetLanguage}
            placeholder="Select target language"
          />
        </div>

        <Button 
          onClick={handleTranslate}
          disabled={!inputText.trim() || !targetLanguage || isLoading}
          className="w-full btn-primary"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Translating...
            </>
          ) : (
            <>
              <Languages className="w-4 h-4 mr-2" />
              Translate
            </>
          )}
        </Button>

        {translatedText && (
          <div className="animate-slide-up">
            <label className="text-sm font-medium text-foreground mb-2 block">
              Translation ({targetLanguage})
            </label>
            <div className="card-result p-4 rounded-lg">
              <p className="text-foreground whitespace-pre-wrap">{translatedText}</p>
            </div>
            <div className="flex gap-2 mt-3">
              <Button 
                onClick={handleCopy}
                variant="secondary"
                size="sm"
                className="btn-secondary"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
              <Button 
                onClick={handleDownload}
                variant="secondary"
                size="sm"
                className="btn-secondary"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};