import { createServerFn } from "@tanstack/react-start";
import { GoogleGenAI } from "@google/genai";

export const generateGreetingFn = createServerFn({ method: "POST" })
  .validator((d: { city: string; country: string }) => d)
  .handler(async ({ data }) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return {
          message: `¡Hola desde Puerto Padre! Vemos que nos visitas desde ${data.city}, ${data.country}. Si estás de visita, pasa por nuestras tiendas. Si tienes familiares o amigos aquí, envíales un dulce regalo, ¡acortamos distancias! Pagos desde el exterior vía Zelle disponibles.`,
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
        contents: `El cliente está visitando la página desde ${data.city}, ${data.country}. Genera un mensaje corto (1-2 oraciones) y amigable invitándolo a visitar nuestras tiendas si está en la ciudad, o a realizar un pedido desde el exterior para un familiar, amigo o hijo en Puerto Padre, Las Tunas (Cuba), acortando las distancias. Menciona que el pago desde el exterior se realiza vía Zelle.`,
        config: {
          systemInstruction:
            "Eres el representante de ventas de Caram Helados. Escribe en un tono cálido, cubano, emotivo y directo.",
        },
      });

      return { message: response.text || "¡Hola! Gracias por visitarnos." };
    } catch (e) {
      console.error(e);
      return {
        message: `¡Hola desde Puerto Padre! Vemos que nos visitas desde ${data.city}. Puedes pedir un helado para tus familiares en Cuba y pagar por Zelle.`,
      };
    }
  });
