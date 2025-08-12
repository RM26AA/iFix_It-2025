const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

export class GeminiService {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async fixText(text: string): Promise<string> {
    const prompt = `Please fix the following text for proper English grammar, spelling, and clarity while maintaining the original meaning. Only return the corrected text without any explanations or additional comments:

"${text}"`;

    const response = await this.callGeminiAPI(prompt);
    return response.trim();
  }

  async spellCheck(word: string): Promise<string> {
    const prompt = `Please check the spelling of this word and provide the correct spelling if it's wrong. If the word is already correct, just return the word. Only return the corrected word without any explanations:

"${word}"`;

    const response = await this.callGeminiAPI(prompt);
    return response.trim();
  }

  async translateText(text: string, targetLanguage: string): Promise<string> {
    const prompt = `Please translate the following text to ${targetLanguage}. Only return the translated text without any explanations:

"${text}"`;

    const response = await this.callGeminiAPI(prompt);
    return response.trim();
  }

  private async callGeminiAPI(prompt: string): Promise<string> {
    try {
      const response = await fetch(GEMINI_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': this.apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data: GeminiResponse = await response.json();
      
      if (!data.candidates || !data.candidates[0] || !data.candidates[0].content.parts[0]) {
        throw new Error('Invalid response from Gemini API');
      }

      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      throw new Error('Failed to process request. Please check your API key and try again.');
    }
  }
}