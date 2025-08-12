import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { GeminiService } from '@/services/geminiService';
import { toast } from 'sonner';

interface SpellCheckerProps {
  geminiService: GeminiService;
}

export const SpellChecker: React.FC<SpellCheckerProps> = ({ geminiService }) => {
  const [word, setWord] = useState('');
  const [checkedWord, setCheckedWord] = useState('');
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheck = async () => {
    if (!word.trim()) {
      toast.error('Please enter a word to check');
      return;
    }

    setIsLoading(true);
    try {
      const result = await geminiService.spellCheck(word.trim());
      setCheckedWord(result);
      setIsCorrect(result.toLowerCase() === word.trim().toLowerCase());
      
      if (result.toLowerCase() === word.trim().toLowerCase()) {
        toast.success('Spelling is correct!');
      } else {
        toast.info('Spelling corrected!');
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to check spelling');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCheck();
    }
  };

  return (
    <Card className="card-feature">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-primary" />
          Spell Checker
        </CardTitle>
        <CardDescription>
          Check the spelling of any word
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter a word to check..."
            value={word}
            onChange={(e) => setWord(e.target.value)}
            onKeyPress={handleKeyPress}
            className="input-primary"
          />
          <Button 
            onClick={handleCheck}
            disabled={!word.trim() || isLoading}
            className="btn-primary px-6"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              'Check'
            )}
          </Button>
        </div>

        {checkedWord && (
          <div className="animate-slide-up">
            <div className={`p-4 rounded-lg border ${
              isCorrect 
                ? 'bg-success/10 border-success/20' 
                : 'bg-warning/10 border-warning/20'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="font-medium text-success">Correct spelling!</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-warning-foreground" />
                    <span className="font-medium text-warning-foreground">Corrected spelling:</span>
                  </>
                )}
              </div>
              <div className="text-foreground">
                {!isCorrect && (
                  <div className="text-sm text-muted-foreground mb-1">
                    You typed: <span className="line-through">{word}</span>
                  </div>
                )}
                <div className="text-lg font-medium">
                  Correct: <span className="text-primary">{checkedWord}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};