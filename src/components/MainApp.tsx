import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Wand2, CheckCircle, Languages } from 'lucide-react';
import { GeminiService } from '@/services/geminiService';
import { TextFixer } from './TextFixer';
import { SpellChecker } from './SpellChecker';
import { Translator } from './Translator';

interface MainAppProps {
  geminiService: GeminiService;
  onLogout: () => void;
}

export const MainApp: React.FC<MainAppProps> = ({ geminiService, onLogout }) => {
  return (
    <div className="min-h-screen gradient-subtle">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-soft">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
              <Wand2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">iFix-It</h1>
              <p className="text-sm text-muted-foreground">AI Language Assistant</p>
            </div>
          </div>
          <Button 
            onClick={onLogout}
            variant="outline"
            size="sm"
            className="btn-secondary"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Change API Key
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8 animate-fade-in">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Welcome to Your Language Assistant
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose a tool below to fix your text, check spelling, or translate to different languages. 
            Everything is powered by AI to help you communicate better.
          </p>
        </div>

        <Tabs defaultValue="fix" className="w-full">
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-8">
            <TabsTrigger value="fix" className="flex items-center gap-2">
              <Wand2 className="w-4 h-4" />
              Fix Text
            </TabsTrigger>
            <TabsTrigger value="spell" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Spell Check
            </TabsTrigger>
            <TabsTrigger value="translate" className="flex items-center gap-2">
              <Languages className="w-4 h-4" />
              Translate
            </TabsTrigger>
          </TabsList>

          <div className="grid gap-6">
            <TabsContent value="fix" className="animate-slide-up">
              <TextFixer geminiService={geminiService} />
            </TabsContent>

            <TabsContent value="spell" className="animate-slide-up">
              <SpellChecker geminiService={geminiService} />
            </TabsContent>

            <TabsContent value="translate" className="animate-slide-up">
              <Translator geminiService={geminiService} />
            </TabsContent>
          </div>
        </Tabs>

        {/* Tips Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 animate-fade-in">
          <div className="bg-card p-6 rounded-lg border border-border shadow-soft">
            <h3 className="font-semibold text-foreground mb-2">💡 Text Fixing Tips</h3>
            <p className="text-sm text-muted-foreground">
              Paste any text and we'll improve grammar, spelling, and clarity while keeping your original meaning.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border shadow-soft">
            <h3 className="font-semibold text-foreground mb-2">✏️ Spell Checker</h3>
            <p className="text-sm text-muted-foreground">
              Not sure about a word's spelling? Type it in and get instant feedback with corrections.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg border border-border shadow-soft">
            <h3 className="font-semibold text-foreground mb-2">🌍 Translation</h3>
            <p className="text-sm text-muted-foreground">
              Translate your text to 20 different languages including Chinese, Spanish, French, and more.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center">
          <p className="text-sm text-muted-foreground">
            iFix-It - Your AI-powered language assistant. Made with ❤️ to help you communicate better.
          </p>
        </div>
      </footer>
    </div>
  );
};