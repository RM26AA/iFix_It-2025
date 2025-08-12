import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Wand2, Copy, Download, Check, Loader2 } from 'lucide-react';
import { GeminiService } from '@/services/geminiService';
import { toast } from 'sonner';

interface TextFixerProps {
  geminiService: GeminiService;
}

export const TextFixer: React.FC<TextFixerProps> = ({ geminiService }) => {
  const [inputText, setInputText] = useState('');
  const [fixedText, setFixedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleFix = async () => {
    if (!inputText.trim()) {
      toast.error('Please enter some text to fix');
      return;
    }

    setIsLoading(true);
    try {
      const result = await geminiService.fixText(inputText);
      setFixedText(result);
      toast.success('Text fixed successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to fix text');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!fixedText) return;
    
    try {
      await navigator.clipboard.writeText(fixedText);
      setCopied(true);
      toast.success('Text copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy text');
    }
  };

  const handleDownload = () => {
    if (!fixedText) return;
    
    const blob = new Blob([fixedText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'fixed-text.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Text downloaded as file!');
  };

  return (
    <Card className="card-feature">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-primary" />
          Fix My Text
        </CardTitle>
        <CardDescription>
          Paste or type your text below and we'll fix grammar, spelling, and clarity
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">
            Your Text
          </label>
          <Textarea
            placeholder="Type or paste your text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="input-primary min-h-[120px] resize-none"
          />
          <div className="flex justify-between items-center mt-2">
            <Badge variant="secondary" className="text-xs">
              {inputText.length} characters
            </Badge>
            <Button 
              onClick={handleFix}
              disabled={!inputText.trim() || isLoading}
              className="btn-primary"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Fixing...
                </>
              ) : (
                <>
                  <Wand2 className="w-4 h-4 mr-2" />
                  Fix Text
                </>
              )}
            </Button>
          </div>
        </div>

        {fixedText && (
          <div className="animate-slide-up">
            <label className="text-sm font-medium text-foreground mb-2 block">
              Fixed Text
            </label>
            <div className="card-result p-4 rounded-lg">
              <p className="text-foreground whitespace-pre-wrap">{fixedText}</p>
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