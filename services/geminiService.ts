import { GoogleGenAI, Type } from "@google/genai";
import { SiteIdea } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // This is a check for development. In the production environment, the key is expected to be set.
  console.warn("API_KEY environment variable not set. Gemini API calls will fail.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

const siteIdeaSchema = {
  type: Type.OBJECT,
  properties: {
    title: {
      type: Type.STRING,
      description: "A creative and concise title for the website. Max 5 words.",
    },
    tagline: {
      type: Type.STRING,
      description: "A short, catchy tagline or slogan for the website. Max 15 words.",
    },
    pages: {
      type: Type.ARRAY,
      description: "An array of 4-6 essential page names for this type of website (e.g., 'Home', 'About Us', 'Services', 'Contact').",
      items: {
        type: Type.STRING,
      },
    },
  },
  required: ["title", "tagline", "pages"],
};

export const generateSiteIdeas = async (topic: string, isAlternative: boolean = false): Promise<SiteIdea> => {
  try {
    const prompt = isAlternative
      ? `Based on the following topic, generate a new and different website structure. Give me an alternative idea: "${topic}"`
      : `Based on the following topic, generate a website structure: "${topic}"`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are a web design consultant. Your goal is to provide a clear, logical, and creative structure for a new website based on the user's topic. Respond only with the JSON object matching the provided schema.",
        responseMimeType: "application/json",
        responseSchema: siteIdeaSchema,
        temperature: 0.9, // Slightly increased temperature for more variety
      },
    });

    const jsonText = response.text.trim();
    // The Gemini API with JSON schema guarantees the output format.
    const parsedJson = JSON.parse(jsonText);
    
    // Basic validation to ensure the parsed object matches our expected structure.
    if (parsedJson.title && parsedJson.tagline && Array.isArray(parsedJson.pages)) {
        return parsedJson as SiteIdea;
    } else {
        throw new Error("Received malformed JSON from API");
    }

  } catch (error) {
    console.error("Error generating site ideas:", error);
    throw new Error("Failed to communicate with the Gemini API.");
  }
};


export const generatePageContent = async (topic: string, siteTitle: string, pageName: string): Promise<string> => {
      try {
        const prompt = `You are a professional content writer creating placeholder text for a new website.
- The website's main topic is: "${topic}"
- The website's title is: "${siteTitle}"

Please write the content for the "${pageName}" page. 

The content should be engaging, relevant to the topic, and approximately 100-150 words. 
Use simple text formatting. For example, you can use paragraphs and line breaks, but avoid complex markdown.
Do not include the page title in the content itself, just the body text.`;

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: prompt,
          config: {
            systemInstruction: "You are a helpful content writing assistant.",
            temperature: 0.7,
          },
        });

        return response.text.trim();

      } catch (error) {
        console.error(`Error generating content for page ${pageName}:`, error);
        throw new Error("Failed to communicate with the Gemini API for page content.");
      }
    };
