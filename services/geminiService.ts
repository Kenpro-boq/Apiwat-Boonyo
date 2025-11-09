import { GoogleGenAI } from "@google/genai";

// We assume the API_KEY is set in the environment variables
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates a project plan using the Gemini API.
 * @param idea The user's idea for an automated furniture piece.
 * @returns A string containing the generated project plan.
 */
export const generateProjectPlan = async (idea: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Based on this user's idea, generate a preliminary project plan. The idea is: "${idea}"`,
      config: {
        systemInstruction: `You are a project planning assistant for Kenpro Automation Furniture.
Your goal is to take a user's idea and turn it into a structured, inspiring, and clear preliminary project plan.
The plan should be easy to read and understand for a non-technical customer.

Structure your response with the following sections using clear headings:

### Project Concept
Briefly summarize the user's idea in an exciting way.

### Key Features
List 3-5 core automated or smart features of the furniture piece. Use a bulleted list (*).

### Suggested Materials
Recommend a few suitable materials (e.g., "Solid Oak with a matte finish", "Brushed aluminum for mechanical parts").

### Preliminary Timeline
Provide a rough, estimated timeline broken down into phases (e.g., Design & Consultation, Prototyping, Final Build).

### Next Steps
Conclude with a call to action, encouraging the user to contact the Kenpro team to make this idea a reality.
`,
      },
    });

    return response.text;

  } catch (error) {
    console.error("Error generating project plan:", error);
    if (error instanceof Error && error.message.includes('API key')) {
        return "There was an issue with the API configuration. Please contact support.";
    }
    return "Sorry, we couldn't generate a plan at this moment. Please try again later.";
  }
};
