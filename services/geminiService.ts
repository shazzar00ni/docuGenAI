import { GoogleGenAI, Type, Schema } from "@google/genai";
import { DocFile, SiteStructure } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const structureSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    siteTitle: { type: Type.STRING, description: "A catchy title for the documentation site based on the content." },
    siteDescription: { type: Type.STRING, description: "A short, one-sentence tagline for the site." },
    navigation: {
      type: Type.ARRAY,
      description: "The sidebar navigation structure grouped by logical categories.",
      items: {
        type: Type.OBJECT,
        properties: {
          categoryName: { type: Type.STRING, description: "Name of the section (e.g., 'Getting Started', 'API')." },
          items: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING, description: "Clean display title for the page." },
                fileName: { type: Type.STRING, description: "The EXACT filename from the input list corresponding to this page. Do not modify extension or casing." }
              },
              required: ["title", "fileName"]
            }
          }
        },
        required: ["categoryName", "items"]
      }
    }
  },
  required: ["siteTitle", "siteDescription", "navigation"]
};

export const generateSiteStructure = async (files: DocFile[]): Promise<SiteStructure> => {
  // Create a lightweight representation of files for the AI (filename + preview)
  const fileSummaries = files.map(f => ({
    name: f.name,
    preview: f.content.substring(0, 500) // First 500 chars should be enough for context
  }));

  const prompt = `
    I have a list of Markdown documentation files. 
    Please organize them into a logical documentation website structure.
    
    Files provided:
    ${JSON.stringify(fileSummaries, null, 2)}
    
    Rules:
    1. Group related files into categories (e.g., Introduction, Core Concepts, API Reference, Guides).
    2. Determine a good order for reading (e.g., Installation before Advanced Usage).
    3. CRITICAL: You MUST use the 'fileName' EXACTLY as provided in the input list. Do not change casing, extensions, or remove spaces. If the input is "My File.md", the fileName output must be "My File.md".
    4. Create a professional 'siteTitle' and 'siteDescription' based on the content.
    5. If a file seems like a landing page (index.md, readme.md, home.md), put it first or in a "Welcome" section.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: structureSchema,
        systemInstruction: "You are a senior technical writer and information architect. Your goal is to organize documentation files into a user-friendly, navigable website structure.",
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as SiteStructure;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate site structure. Please try again.");
  }
};