import { useState } from 'react';
import { GoogleGenAI, GenerateContentResponse } from '@google/genai';

// Define the shape of the hook's return value for clarity
interface GeminiHook {
  loading: boolean;
  error: Error | null;
  response: string | null;
  generateContent: (prompt: string) => Promise<void>;
}

/**
 * A custom hook for interacting with the Google Gemini API.
 * It manages loading, error, and response states for content generation.
 *
 * @returns {GeminiHook} An object containing the loading state, error state,
 * the API response, and the function to trigger content generation.
 */
export const useGemini = (): GeminiHook => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [response, setResponse] = useState<string | null>(null);

  const generateContent = async (prompt: string) => {
    // Ensure there's a prompt and an API key
    if (!prompt) {
      setError(new Error("Prompt cannot be empty."));
      return;
    }
    if (!process.env.API_KEY) {
        setError(new Error("API_KEY environment variable not set."));
        return;
    }

    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      // Always create a new instance to ensure the latest API key is used
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const result: GenerateContentResponse = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
      });

      // Using the .text getter as per the guidelines
      const text = result.text;

      if (text === undefined) {
        throw new Error("No text response received from the API.");
      }

      setResponse(text);

    } catch (e) {
      // Type guard to ensure e is an Error object
      if (e instanceof Error) {
        setError(e);
      } else {
        setError(new Error("An unknown error occurred during content generation."));
      }
      console.error("Gemini API Error:", e);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, response, generateContent };
};
