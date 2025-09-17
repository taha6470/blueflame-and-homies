
import { GoogleGenAI } from "@google/genai";
import type { WorkoutItem } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

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
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("Failed to get analysis from AI. The model may be overloaded or the API key is invalid.");
  }
};
