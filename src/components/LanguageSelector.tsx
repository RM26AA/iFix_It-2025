import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const LANGUAGES = [
  'English',
  'Mandarin Chinese',
  'Hindi',
  'Spanish',
  'French',
  'Arabic',
  'Bengali',
  'Portuguese',
  'Russian',
  'Urdu',
  'Indonesian',
  'German',
  'Japanese',
  'Nigerian Pidgin',
  'Egyptian Arabic',
  'Marathi',
  'Telugu',
  'Turkish',
  'Tamil',
  'Yue Chinese'
];

interface LanguageSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  value,
  onValueChange,
  placeholder = "Select language"
}) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="input-primary">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {LANGUAGES.map((language) => (
          <SelectItem key={language} value={language}>
            {language}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};