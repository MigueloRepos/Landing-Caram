export const PHONE_DISPLAY = "+53 55260778";
export const WHATSAPP_NUMBER = "5355260778";
export const INSTAGRAM_URL = "https://instagram.com/heladoscaram";

export function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export const ORDER_MESSAGE = "Hola, quiero hacer un pedido de helados Caram";
export const BIRTHDAY_MESSAGE = "Hola, quiero cotizar un pedido para cumpleaños";
