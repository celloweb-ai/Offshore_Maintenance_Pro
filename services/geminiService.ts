
import { GoogleGenAI, Type } from "@google/genai";
import { MaintenancePlan, InstrumentType, PlatformType, UserSettings } from "../types.ts";

// Corrected: Use import.meta.env with correct Vite environment variable name
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("VITE_GEMINI_API_KEY não configurada. Verifique o arquivo .env.local");
}

const ai = new GoogleGenAI({ apiKey });

const MAINTENANCE_PLAN_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    id: { type: Type.STRING },
    instrumentType: { type: Type.STRING },
    platformType: { type: Type.STRING },
    tag: { type: Type.STRING },
    intervalMonths: { type: Type.NUMBER },
    personnel: { 
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    materials: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    standards: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    testProcedures: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          action: { type: Type.STRING },
          details: { type: Type.STRING },
          reference: { type: Type.STRING }
        },
        required: ["id", "action", "details", "reference"]
      }
    },
    safetyPrecautions: {
      type: Type.ARRAY,
      items: { type: Type.STRING }
    },
    technicalSpecifications: {
      type: Type.OBJECT,
      properties: {
        rangeMin: { type: Type.NUMBER },
        rangeMax: { type: Type.NUMBER },
        unit: { type: Type.STRING },
        accuracy: { type: Type.STRING },
        expectedSignal: { type: Type.STRING }
      },
      required: ["rangeMin", "rangeMax", "unit", "accuracy", "expectedSignal"]
    }
  },
  required: [
    "id", "instrumentType", "platformType", "tag", "intervalMonths", 
    "personnel", "materials", "standards", "testProcedures", "safetyPrecautions",
    "technicalSpecifications"
  ]
};

/**
 * Generates a technical maintenance plan using Gemini.
 * Returns any to allow proper type narrowing with isValidPlan in the consumer component.
 */
export const generateMaintenancePlan = async (
  instrumentType: InstrumentType,
  platformType: PlatformType,
  tag: string,
  settings?: UserSettings
): Promise<any> => {
  const personnelGuidance = settings?.defaultPersonnel 
    ? `Para a seção de pessoal envolvido, utilize preferencialmente estas funções: ${settings.defaultPersonnel}.`
    : "Determine o pessoal técnico necessário (ex: Instrumentista, Ajudante).";

  const supervisorGuidance = settings?.defaultSupervisorRole 
    ? `Considere que a validação será feita pelo cargo: ${settings.defaultSupervisorRole}.`
    : "";

  const prompt = `Gere um plano de manutenção preventiva técnica detalhado para o seguinte cenário offshore:
    Instrumento: ${instrumentType}
    Tipo de Unidade: ${platformType}
    Tag do Instrumento: ${tag}

    Orientações de Equipe:
    ${personnelGuidance}
    ${supervisorGuidance}

    O plano deve incluir:
    1. Um ID único (string).
    2. Intervalo recomendado em meses.
    3. Pessoal técnico necessário (baseado nas orientações acima).
    4. Recursos materiais e ferramentas específicas.
    5. Normas técnicas de referência (NR-10, NR-13, NR-37, ISA, IEC, API).
    6. Procedimentos de teste passo a passo (cada um com seu próprio ID).
    7. Precauções de segurança críticas.
    8. Especificações Técnicas de Calibração: Defina uma faixa de operação realista, unidade de engenharia apropriada, classe de exatidão típica e sinal de saída esperado (Ex: 4-20mA HART).

    Aja como um engenheiro de instrumentação sênior. Responda estritamente em JSON seguindo o esquema fornecido.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-thinking-exp-1219', // Model compatible with @google/genai v1beta API
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: MAINTENANCE_PLAN_SCHEMA,
      },
    });

    const plan = JSON.parse(response.text);
    return {
      ...plan,
      createdAt: new Date().toISOString()
    };
  } catch (error) {
    console.error("Error generating plan:", error);
    // Improved error handling with more details
    if (error instanceof Error) {
      throw new Error(`Falha ao gerar o plano: ${error.message}`);
    }
    throw new Error("Falha ao gerar o plano de manutenção. Verifique sua conexão e tente novamente.");
  }
};
