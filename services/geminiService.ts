import { GoogleGenAI, Type } from "@google/genai";
import { ProjectPlan } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const projectPlanSchema = {
  type: Type.OBJECT,
  properties: {
    projectName: {
      type: Type.STRING,
      description: "A creative and professional name for this furniture project. Max 6 words.",
    },
    suggestedFeatures: {
      type: Type.ARRAY,
      description: "An array of 3-5 specific, innovative features for the automated furniture (e.g., 'Wireless charging surface', 'Voice-activated height adjustment').",
      items: {
        type: Type.STRING,
      },
    },
    materialRecommendations: {
      type: Type.ARRAY,
      description: "An array of 2-3 material suggestions that would suit the project (e.g., 'Oak with brushed aluminum accents', 'Carbon fiber for lightweight strength').",
      items: {
        type: Type.STRING,
      },
    },
    nextSteps: {
      type: Type.STRING,
      description: "A concise paragraph (2-3 sentences) outlining the suggested next steps for the client, such as consultation, measurement, or design finalization.",
    },
  },
  required: ["projectName", "suggestedFeatures", "materialRecommendations", "nextSteps"],
};

export const generateProjectPlan = async (topic: string): Promise<ProjectPlan> => {
  try {
    const prompt = `A client has a project idea: "${topic}". Based on this, create a preliminary project plan.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an expert consultant for automated and smart furniture. Your goal is to provide a creative and practical project plan based on the user's idea. Respond only with the JSON object matching the provided schema.",
        responseMimeType: "application/json",
        responseSchema: projectPlanSchema,
        temperature: 0.8,
      },
    });

    const jsonText = response.text.trim();
    const parsedJson = JSON.parse(jsonText);
    
    if (parsedJson.projectName && parsedJson.suggestedFeatures && parsedJson.materialRecommendations && parsedJson.nextSteps) {
        return parsedJson as ProjectPlan;
    } else {
        throw new Error("Received malformed JSON from API");
    }

  } catch (error) {
    console.error("Error generating project plan:", error);
    throw new Error("Failed to communicate with the Gemini API.");
  }
};
