import { GoogleGenAI, Type, Schema } from "@google/genai";
import { GeneratedPersona, PersonaInput } from "../types";

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    name: { type: Type.STRING, description: "A short, catchy nickname for the persona (e.g., 'Modern Speed-Demon Salaryman')." },
    catchphrase: { type: Type.STRING, description: "A dramatic, emotional tagline representing their core mindset." },
    visualImage: { type: Type.STRING, description: "Description of a visual icon or silhouette representing this user." },
    keywords: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3-5 hashtags describing them (e.g., #TimePerformance)." },
    
    attributes: {
      type: Type.OBJECT,
      properties: {
        basic: { type: Type.STRING, description: "Basic demographics (Age, Gender, Job, Status)." },
        playStyle: {
          type: Type.OBJECT,
          properties: {
            time: { type: Type.STRING, description: "Typical playing hours." },
            budget: { type: Type.STRING, description: "Typical budget." },
            hall: { type: Type.STRING, description: "How they choose a parlor." },
            literacy: { type: Type.STRING, description: "Knowledge level." }
          },
          required: ["time", "budget", "hall", "literacy"]
        }
      },
      required: ["basic", "playStyle"]
    },

    privateLife: {
      type: Type.OBJECT,
      description: "Deep dive into their private life to understand the context of their gambling.",
      properties: {
        dailyRoutine: { type: Type.STRING, description: "A brief timeline of a typical day (e.g., '7AM Wake up -> 9PM Work ends -> Pachinko')." },
        hobbies: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Hobbies other than Pachinko (e.g., 'Watching YouTube', 'Sauna')." },
        stressors: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Major life stressors driving them to gamble (e.g., 'Loneliness', 'Overbearing boss')." }
      },
      required: ["dailyRoutine", "hobbies", "stressors"]
    },

    backgroundAnalysis: {
      type: Type.STRING,
      description: "A cohesive narrative explaining why their lifestyle leads to this behavior.",
    },
    specs: {
      type: Type.OBJECT,
      properties: {
        summary: { type: Type.STRING, description: "Overview of desired machine specs." },
        details: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "Specific requirements like '3000 fever', '81% loop'."
        },
        latentNeed: {
          type: Type.STRING,
          description: "The hidden, unconscious desire driving this spec preference (e.g., 'Reclaiming control over time', 'Erasing a sense of defeat')."
        }
      },
      required: ["summary", "details", "latentNeed"]
    },
    enshutsu: {
      type: Type.OBJECT,
      properties: {
        style: { type: Type.STRING, description: "General preference for visual/audio presentation." },
        behaviors: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "Specific behaviors (e.g., 'Skips normal reach')."
        },
        psychologicalInsight: {
          type: Type.STRING,
          description: "The psychological reason for this preference (e.g., 'Fear of disappointment leads to skipping animations', 'Need for social dominance')."
        }
      },
      required: ["style", "behaviors", "psychologicalInsight"]
    },
    developerAdvice: {
      type: Type.OBJECT,
      properties: {
        dos: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "Concrete features to implement."
        },
        donts: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "Features that cause abandonment."
        }
      },
      required: ["dos", "donts"]
    }
  },
  required: ["name", "catchphrase", "visualImage", "keywords", "attributes", "privateLife", "backgroundAnalysis", "specs", "enshutsu", "developerAdvice"]
};

export const generatePersona = async (input: PersonaInput): Promise<GeneratedPersona> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please check your environment.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  let prompt = "";

  if (input.inputMode === 'product') {
    // REVERSE ENGINEERING MODE
    prompt = `
      Role: Expert Pachinko Product Planner and Behavioral Psychologist.
      Task: Reverse Engineer the target audience based on the provided Product Concept.
      
      Product Concept (Input):
      "${input.productConcept}"
      
      Additional Notes: ${input.customNote || "None"}

      Analysis Goal:
      Analyze the specs, gameplay flow, and IP theme described above.
      Deduce who is most likely to play this specific machine.
      - What kind of life do they lead that makes them crave THIS specific spec (e.g., high speed, high risk)?
      - Why do they prefer THIS specific presentation style (e.g., simple flashes vs. complex story)?
      
      Create a highly detailed target persona that fits this product perfectly.
      
      Process:
      1. Define a catchy Name and Tagline for this user.
      2. Profile their Demographics (Attributes) and Play Style (Time/Budget/Literacy) based on the product's requirements (e.g., High risk machine = High budget or desperate user).
      3. **Private Life Deep Dive**: Imagine their daily routine and stressors that drive them to this specific machine.
      4. **Spec Analysis**: Confirm the specs they like (based on input) and explain the **'Latent Need'** (Why does this product heal or excite them?).
      5. **Enshutsu Analysis**: Explain the **'Psychological Insight'** (Why does this UI/Flow matches their mental state?).
      6. Provide actionable advice for developers to further optimize the product for this specific person.

      Output Language: Japanese.
      Ensure the tone is professional yet empathetic to the player's psychology.
      The "dailyRoutine" should look like a timeline.
    `;
  } else {
    // STANDARD MODE (User Driven)
    prompt = `
      Role: Expert Pachinko Product Planner and Behavioral Psychologist.
      Task: Create a highly detailed target persona for a modern Smart Pachinko (e-machine) based on the provided user constraints.
      
      User Profile Inputs:
      1. Basic Attributes: ${input.basicAttributes}
      2. Time Constraints: ${input.time}
      3. Budget Constraints: ${input.budget}
      4. Hall Selection Logic: ${input.hall}
      5. Game Literacy / Attitude: ${input.literacy}
      6. Core Desire / Reward Source: ${input.reward}
      7. Additional Notes: ${input.customNote || "None"}

      Process:
      1. Define a catchy Name and Tagline.
      2. Synthesize the provided inputs into a cohesive 'Basic Attributes' and 'Play Style'.
      3. **Private Life Deep Dive**: Imagine their daily routine, hobbies, and stressors. Be specific and human.
      4. **Spec Analysis**: Analyze the 'Core Desire' to determine the 'Spec' (Risk/Return). **Crucially, identify the 'Latent Need' (unconscious void they are filling).**
      5. **Enshutsu Analysis**: Analyze 'Literacy' and 'Time' for 'UI/Flow'. **Crucially, identify the 'Psychological Insight' (why they behave this way).**
      6. Provide actionable advice for developers.

      Output Language: Japanese.
      Ensure the tone is professional yet empathetic to the player's psychology.
      The "dailyRoutine" should look like a timeline (e.g. "07:00 起床 -> ...").
    `;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7, 
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response generated from AI.");
    }

    return JSON.parse(text) as GeneratedPersona;
  } catch (error) {
    console.error("Error generating persona:", error);
    throw error;
  }
};