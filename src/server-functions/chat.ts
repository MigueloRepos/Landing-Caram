import { createServerFn } from "@tanstack/react-start";
import { GoogleGenAI } from "@google/genai";

export const chatFn = createServerFn({ method: "POST" })
  .validator((d: { message: string; history: Array<{ role: string; content: string }> }) => d)
  .handler(async ({ data }) => {
    try {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return {
          reply:
            "La API de Gemini no está configurada, pero como soy tu vendedor virtual simulado, te recomiendo el Combo Familiar si vas a compartir. 😋",
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

      const chat = ai.chats.create({
        model: "gemini-3.1-flash-lite",
        config: {
          systemInstruction:
            "Eres un asistente virtual de ventas para 'Caram Helados', una heladería en Puerto Padre, Cuba. Eres amigable, persuasivo y ofreces recomendaciones personalizadas basadas en el catálogo de productos: Vasos de 8 oz ($1.80), Tinas de 4.5 litros ($9.50), Combo Familiar ($18.00), Combo fiesta ($26.00), Combo Escolar ($15.00), Combo fin de semana ($11.00). Ofrece recomendaciones basadas en el gusto que te pidan o la cantidad de personas. Mantén respuestas cortas.",
        },
      });

      // Restore history
      for (const msg of data.history) {
        if (msg.role === "user") {
          // Note: with this SDK we don't manually append to history object, we just send message stream unless we use the REST API way.
          // But we can just use generateContent with concatenated history if chat history restoration is tricky.
          // Let's use generateContent for simplicity since the history is managed by the client.
        }
      }

      // Simplified approach using generateContent to pass full context easily:
      const contents =
        data.history
          .map((m) => `${m.role === "user" ? "Usuario" : "Asistente"}: ${m.content}`)
          .join("\n") + `\nUsuario: ${data.message}`;

      const response = await ai.models.generateContent({
        model: "gemini-3.1-flash-lite",
        contents,
        config: {
          systemInstruction:
            "Eres un asistente virtual de ventas para 'Caram Helados', una heladería en Puerto Padre, Cuba. Eres amigable, persuasivo y ofreces recomendaciones personalizadas basadas en el catálogo de productos: Vasos de 8 oz ($1.80), Tinas de 4.5 litros ($9.50), Combo Familiar ($18.00), Combo fiesta ($26.00), Combo Escolar ($15.00), Combo fin de semana ($11.00). Ofrece recomendaciones basadas en el gusto que te pidan o la cantidad de personas. Mantén respuestas cortas (máx 2-3 oraciones).",
        },
      });

      return { reply: response.text || "Lo siento, no pude procesar tu mensaje." };
    } catch (e) {
      console.error(e);
      return {
        reply: "Lo siento, hubo un error al contactar al asistente. Puedes pedirnos por WhatsApp.",
      };
    }
  });
