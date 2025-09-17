
import { GoogleGenAI } from "@google/genai";
import type { WorkoutItem } from '../types';

let ai: GoogleGenAI | null = null;

/**
 * Lazily initializes and returns the GoogleGenAI instance.
 * Throws an error if the API key is not configured.
 */
function getAiInstance(): GoogleGenAI {
    if (!ai) {
        const API_KEY = process.env.API_KEY;

        if (!API_KEY) {
            // This error is thrown only when the function is called, not on module load.
            // It will be caught by the try...catch block in App.tsx.
            throw new Error("API_KEY environment variable not set. The app cannot connect to the AI service.");
        }
        ai = new GoogleGenAI({ apiKey: API_KEY });
    }
    return ai;
}


export const getWorkoutAnalysis = async (workout: WorkoutItem[]): Promise<string> => {
  const workoutString = workout.map(item => `${item.name}: ${item.weight} kg for ${item.reps} reps`).join('\n');

  const prompt = `
    You are an expert fitness coach and personal trainer named 'Blueflame'.
    Analyze the following workout session and provide constructive, encouraging feedback.
    The user is an intermediate lifter.
    The feedback should include:
    1. A brief, positive summary of the workout.
    2. One specific tip for improvement on a key lift (e.g., form advice for Squats or Bench Press).
    3. A suggestion for a complementary exercise to add next time.
    4. An overall motivational closing statement.
    
    Keep the tone encouraging and knowledgeable. Format the response using markdown for readability.

    Today's Workout:
    ${workoutString}
  `;

  try {
    const aiInstance = getAiInstance();
    const response = await aiInstance.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    // Re-throw the error so it can be caught by the UI component and displayed to the user.
    if (error instanceof Error && error.message.startsWith("API_KEY")) {
        throw error;
    }
    throw new Error("Failed to get analysis from AI. The model may be overloaded or the API key is invalid.");
  }
};
