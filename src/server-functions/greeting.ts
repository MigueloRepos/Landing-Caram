import { createServerFn } from "@tanstack/react-start";
import { GoogleGenAI } from "@google/genai";

export const generateGreetingFn = createServerFn({ method: "POST" })
  .validator((d: { city: string; country: string }) => d)
  .handler(async ({ data }) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return {
          message: `Le saludamos desde Puerto Padre. Observamos que nos visita desde ${data.city}, ${data.country}. Le invitamos cordialmente a conocer nuestras instalaciones o a realizar un pedido para sus allegados en Puerto Padre. Contamos con facilidades de pago internacional vía Zelle.`,
        };
      }
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents: `El cliente está visitando la página desde ${data.city}, ${data.country}. Genera un mensaje breve (1-2 oraciones) y formal dándole la bienvenida e invitándolo respetuosamente a visitar nuestras tiendas o a enviar un pedido de helados a sus familiares o allegados en Puerto Padre, Las Tunas (Cuba). Mencione que disponemos de pagos desde el exterior vía Zelle.`,
        config: {
          systemInstruction:
            "Eres un representante formal, cortés y respetuoso de Caram Helados. Dirígete siempre al usuario de 'usted', con un lenguaje distinguido y servicial.",
        },
      });

      return {
        message:
          response.text ||
          "Le damos la bienvenida a nuestro portal oficial. Es un honor atenderle.",
      };
    } catch (e) {
      console.error(e);
      return {
        message: `Le saludamos desde Puerto Padre. Observamos que nos visita desde ${data.city}. Puede solicitar helados para sus familiares en Cuba y realizar su pago vía Zelle.`,
      };
    }
  });
