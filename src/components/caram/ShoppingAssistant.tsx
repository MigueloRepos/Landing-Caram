import { useState, useEffect, useRef } from "react";
import {
  ShoppingBag,
  Bot,
  Sparkles,
  Send,
  X,
  ChevronRight,
  ArrowLeft,
  Users,
  PartyPopper,
  Gift,
  IceCream,
  Check,
  RefreshCw,
  MessageCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { chatFn } from "@/server-functions/chat";
import { getFlavorsFn } from "@/server-functions/flavors";
import { useMutation, useQuery } from "@tanstack/react-query";
import { waLink } from "@/lib/caram";

export type PurchaseType = "individual" | "combos" | "birthday" | "remittance" | "ai_chat" | null;

interface ProductOption {
  id: string;
  name: string;
  price: string;
  description: string;
  image?: string;
}

const INDIVIDUAL_PRODUCTS: ProductOption[] = [
  {
    id: "vaso-8oz",
    name: "Vasos de 8 oz",
    price: "$1.80",
    description: "Porción individual cremosa e ideal para disfrutar de inmediato.",
  },
  {
    id: "tina-4.5l",
    name: "Tina de 4.5 Litros",
    price: "$9.50",
    description: "Formato familiar rinde para compartir múltiples porciones.",
  },
];

const COMBOS_PRODUCTS: ProductOption[] = [
  {
    id: "combo-fin-semana",
    name: "Combo Fin de Semana",
    price: "$11.00",
    description: "1 Tina de 4.5L + 2 vasos de 8 oz con sabores a elección.",
  },
  {
    id: "combo-escolar",
    name: "Combo Escolar",
    price: "$15.00",
    description: "1 Tina de 4.5L + 5 vasos de 8 oz, ideal para la merienda.",
  },
  {
    id: "combo-familiar",
    name: "Combo Familiar",
    price: "$18.00",
    description: "2 Tinas de 4.5L + 4 vasos de 8 oz con combinación de sabores.",
  },
  {
    id: "combo-fiesta",
    name: "Combo Fiesta",
    price: "$26.00",
    description: "3 Tinas de 4.5L + 6 vasos de 8 oz para celebraciones grandes.",
  },
];

export function ShoppingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [purchaseType, setPurchaseType] = useState<PurchaseType>(null);

  // Guided wizard states
  const [selectedProduct, setSelectedProduct] = useState<ProductOption | null>(null);
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number>(1);
  const [recipientName, setRecipientName] = useState<string>("");
  const [deliveryAddress, setDeliveryAddress] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<"Efectivo MN" | "Zelle / Exterior">(
    "Efectivo MN",
  );
  const [eventDate, setEventDate] = useState<string>("");
  const [guestCount, setGuestCount] = useState<string>("");
  const [step, setStep] = useState<number>(1);

  // AI Chat states
  const [chatMessages, setChatMessages] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([
    {
      role: "assistant",
      content:
        "Estimado/a cliente, con gusto le atenderé. Puede consultarme sobre la disponibilidad de sabores, precios, recomendaciones o asesoría personalizada para su pedido. ¿En qué le puedo colaborar?",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Fetch available flavors from Supabase
  const { data: flavorsData = [] } = useQuery({
    queryKey: ["assistant-flavors"],
    queryFn: async () => {
      const res = await getFlavorsFn();
      return res as Record<string, string>[];
    },
  });

  const availableFlavors = flavorsData
    .map((f) => f.taste || f.name || f.flavor || f.sabor || f.nombre || "")
    .filter(Boolean);

  const fallbackFlavors = ["Fresa", "Chocolate", "Mango", "Mantecado", "Guayaba", "Pistacho"];
  const activeFlavors = availableFlavors.length > 0 ? availableFlavors : fallbackFlavors;

  // Auto open assistant once on page mount
  useEffect(() => {
    const hasSeenAssistant = sessionStorage.getItem("hasSeenShoppingAssistant");
    if (!hasSeenAssistant) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem("hasSeenShoppingAssistant", "true");
      }, 900);
      return () => clearTimeout(timer);
    }
  }, []);

  // Custom event listener for external open trigger
  useEffect(() => {
    const handleCustomOpen = () => {
      setIsOpen(true);
    };
    window.addEventListener("open-shopping-assistant", handleCustomOpen);
    return () => window.removeEventListener("open-shopping-assistant", handleCustomOpen);
  }, []);

  // AI Chat Mutation
  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const res = await chatFn({ data: { message, history: chatMessages } });
      return res.reply;
    },
    onSuccess: (reply) => {
      setChatMessages((prev) => [...prev, { role: "assistant", content: reply }]);
      setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    },
  });

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatMutation.isPending) return;

    const userText = chatInput.trim();
    setChatMessages((prev) => [...prev, { role: "user", content: userText }]);
    setChatInput("");
    chatMutation.mutate(userText);
    setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const toggleFlavor = (flavor: string) => {
    if (selectedFlavors.includes(flavor)) {
      setSelectedFlavors(selectedFlavors.filter((f) => f !== flavor));
    } else {
      setSelectedFlavors([...selectedFlavors, flavor]);
    }
  };

  const resetWizard = () => {
    setPurchaseType(null);
    setSelectedProduct(null);
    setSelectedFlavors([]);
    setQuantity(1);
    setRecipientName("");
    setDeliveryAddress("");
    setPaymentMethod("Efectivo MN");
    setEventDate("");
    setGuestCount("");
    setStep(1);
  };

  // Build formal WhatsApp Order Message
  const buildWhatsAppMessage = () => {
    let msg = "Estimados Sres. de Helados Caram, les saludo cordialmente.\n\n";
    msg += "Deseo realizar el siguiente pedido guiado por el Asistente de Compra:\n";

    if (purchaseType === "individual" && selectedProduct) {
      msg += `• *Producto:* ${selectedProduct.name} (${selectedProduct.price})\n`;
      msg += `• *Cantidad:* ${quantity}\n`;
    } else if (purchaseType === "combos" && selectedProduct) {
      msg += `• *Combo Seleccionado:* ${selectedProduct.name} (${selectedProduct.price})\n`;
      msg += `• *Cantidad:* ${quantity}\n`;
    } else if (purchaseType === "birthday") {
      msg += `• *Tipo de Solicitud:* Pedido / Cotización Especial de Cumpleaños\n`;
      if (guestCount) msg += `• *Cantidad aproximada de invitados:* ${guestCount} personas\n`;
      if (eventDate) msg += `• *Fecha estimada del evento:* ${eventDate}\n`;
    } else if (purchaseType === "remittance") {
      msg += `• *Tipo de Solicitud:* Envío a Familiar en Puerto Padre desde el Exterior\n`;
      if (selectedProduct)
        msg += `• *Producto/Combo:* ${selectedProduct.name} (${selectedProduct.price})\n`;
    }

    if (selectedFlavors.length > 0) {
      msg += `• *Sabores preferidos:* ${selectedFlavors.join(", ")}\n`;
    }

    if (recipientName) {
      msg += `• *Nombre de quien recibe:* ${recipientName}\n`;
    }

    if (deliveryAddress) {
      msg += `• *Dirección de entrega:* ${deliveryAddress}\n`;
    }

    msg += `• *Método de pago preferido:* ${paymentMethod}\n\n`;
    msg += "Quedo a la espera de su confirmación. Muchas gracias por su atención.";

    return msg;
  };

  return (
    <>
      {/* Floating Trigger Button with badge */}
      <div className="fixed bottom-20 right-4 z-40 flex items-center gap-2.5 md:bottom-8 lg:right-10">
        <motion.button
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 rounded-full bg-[#F9B40E] px-4 py-3 text-[#072B79] font-black shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-[#e0a10a] focus:outline-none focus:ring-4 focus:ring-[#F9B40E]/40 cursor-pointer"
          aria-label="Abrir Asistente de Compra"
        >
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0C8EEF] opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-[#0C8EEF]"></span>
          </span>
          <Bot className="h-6 w-6 text-[#072B79] transition-transform duration-300 group-hover:rotate-12" />
          <span className="hidden font-black text-sm sm:inline-block">Asistente de Compra</span>
        </motion.button>
      </div>

      {/* Main Assistant Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-[#072B79]/80 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative flex h-[90vh] max-h-[680px] w-full max-w-2xl flex-col overflow-hidden rounded-4xl border border-[#072B79]/20 bg-white text-[#072B79] shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#072B79]/10 bg-[#072B79] px-6 py-4 text-white">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F9B40E] text-[#072B79] shadow-md font-bold">
                    <ShoppingBag className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-black tracking-wide sm:text-lg">
                      Asistente de Compra
                    </h2>
                    <p className="text-xs text-white/80 font-medium">
                      Helados Caram • Guía interactiva de pedidos
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {purchaseType && (
                    <button
                      onClick={resetWizard}
                      className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/90 transition-colors hover:bg-white/20 cursor-pointer"
                      title="Reiniciar asistente"
                    >
                      <RefreshCw size={13} />
                      <span className="hidden sm:inline">Reiniciar</span>
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white cursor-pointer"
                    aria-label="Cerrar asistente"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                {/* STEP 0: Select Purchase Type */}
                {!purchaseType && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-5"
                  >
                    <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-center sm:p-5">
                      <p className="text-sm font-semibold text-primary sm:text-base">
                        ¡Le damos la bienvenida a Helados Caram! 🍨
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                        Para ofrecerle una atención personalizada y agilizar su solicitud, ¿qué tipo
                        de compra o gestión desea realizar hoy?
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2">
                      <button
                        onClick={() => {
                          setPurchaseType("individual");
                          setStep(1);
                        }}
                        className="group flex flex-col items-start rounded-2xl border border-border bg-background p-4 text-left transition-all duration-200 hover:border-primary hover:bg-primary/5 hover:shadow-md cursor-pointer"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <IceCream className="h-5 w-5" />
                        </div>
                        <h3 className="mt-3 font-bold text-sm text-foreground group-hover:text-primary">
                          Tinas y Copas Individuales
                        </h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Vasos de 8 oz ($1.80) y Tinas de 4.5 L ($9.50) para su consumo personal o
                          familiar.
                        </p>
                        <span className="mt-3 inline-flex items-center text-xs font-semibold text-primary">
                          Seleccionar <ChevronRight className="ml-1 h-3.5 w-3.5" />
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          setPurchaseType("combos");
                          setStep(1);
                        }}
                        className="group flex flex-col items-start rounded-2xl border border-border bg-background p-4 text-left transition-all duration-200 hover:border-primary hover:bg-primary/5 hover:shadow-md cursor-pointer"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-500 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <Users className="h-5 w-5" />
                        </div>
                        <h3 className="mt-3 font-bold text-sm text-foreground group-hover:text-primary">
                          Combos Especiales
                        </h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Combos Familiar ($18), Fiesta ($26), Escolar ($15) y Fin de Semana ($11).
                        </p>
                        <span className="mt-3 inline-flex items-center text-xs font-semibold text-primary">
                          Seleccionar <ChevronRight className="ml-1 h-3.5 w-3.5" />
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          setPurchaseType("birthday");
                          setStep(1);
                        }}
                        className="group flex flex-col items-start rounded-2xl border border-border bg-background p-4 text-left transition-all duration-200 hover:border-primary hover:bg-primary/5 hover:shadow-md cursor-pointer"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-500/10 text-pink-500 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <PartyPopper className="h-5 w-5" />
                        </div>
                        <h3 className="mt-3 font-bold text-sm text-foreground group-hover:text-primary">
                          Cumpleaños y Eventos
                        </h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Cotización personalizada para fiestas infantiles, reuniones y eventos
                          familiares.
                        </p>
                        <span className="mt-3 inline-flex items-center text-xs font-semibold text-primary">
                          Seleccionar <ChevronRight className="ml-1 h-3.5 w-3.5" />
                        </span>
                      </button>

                      <button
                        onClick={() => {
                          setPurchaseType("remittance");
                          setPaymentMethod("Zelle / Exterior");
                          setStep(1);
                        }}
                        className="group flex flex-col items-start rounded-2xl border border-border bg-background p-4 text-left transition-all duration-200 hover:border-primary hover:bg-primary/5 hover:shadow-md cursor-pointer"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                          <Gift className="h-5 w-5" />
                        </div>
                        <h3 className="mt-3 font-bold text-sm text-foreground group-hover:text-primary">
                          Envío desde el Exterior (Zelle)
                        </h3>
                        <p className="mt-1 text-xs text-muted-foreground">
                          Pague cómodamente desde fuera de Cuba y entregamos el pedido en Puerto
                          Padre.
                        </p>
                        <span className="mt-3 inline-flex items-center text-xs font-semibold text-primary">
                          Seleccionar <ChevronRight className="ml-1 h-3.5 w-3.5" />
                        </span>
                      </button>
                    </div>

                    {/* AI Chat option button */}
                    <div className="pt-2">
                      <button
                        onClick={() => setPurchaseType("ai_chat")}
                        className="flex w-full items-center justify-between rounded-2xl border border-primary/30 bg-primary/10 p-4 transition-all duration-200 hover:bg-primary/20 cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                            <Sparkles className="h-5 w-5" />
                          </div>
                          <div className="text-left">
                            <h4 className="font-bold text-sm text-foreground">
                              Consulta Libre con Asistente de IA
                            </h4>
                            <p className="text-xs text-muted-foreground">
                              Hable directamente con nuestra IA para resolver dudas de sabores y
                              sugerencias.
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-primary" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* GUIDED FLOW FOR INDIVIDUAL PRODUCTS / COMBOS / REMITTANCE */}
                {(purchaseType === "individual" ||
                  purchaseType === "combos" ||
                  purchaseType === "remittance") && (
                  <div className="space-y-6">
                    {/* Top Navigation */}
                    <div className="flex items-center justify-between border-b border-border pb-3">
                      <button
                        onClick={() => {
                          if (step > 1) setStep(step - 1);
                          else setPurchaseType(null);
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
                      >
                        <ArrowLeft size={16} />
                        <span>Atrás</span>
                      </button>
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                        Paso {step} de 3
                      </span>
                    </div>

                    {/* STEP 1: Product Selection */}
                    {step === 1 && (
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                      >
                        <h3 className="font-bold text-base text-foreground">
                          {purchaseType === "individual" && "Seleccione el producto deseado:"}
                          {purchaseType === "combos" && "Seleccione el combo preferido:"}
                          {purchaseType === "remittance" &&
                            "Seleccione el producto o combo a enviar:"}
                        </h3>

                        <div className="grid gap-3 sm:grid-cols-2">
                          {(purchaseType === "individual"
                            ? INDIVIDUAL_PRODUCTS
                            : COMBOS_PRODUCTS
                          ).map((item) => {
                            const isSelected = selectedProduct?.id === item.id;
                            return (
                              <button
                                key={item.id}
                                onClick={() => setSelectedProduct(item)}
                                className={cn(
                                  "flex flex-col justify-between rounded-2xl border p-4 text-left transition-all cursor-pointer",
                                  isSelected
                                    ? "border-primary bg-primary/10 shadow-sm ring-2 ring-primary/30"
                                    : "border-border bg-background hover:border-primary/50",
                                )}
                              >
                                <div>
                                  <div className="flex items-center justify-between gap-2">
                                    <h4 className="font-bold text-sm text-foreground">
                                      {item.name}
                                    </h4>
                                    <span className="rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-extrabold text-primary">
                                      {item.price}
                                    </span>
                                  </div>
                                  <p className="mt-2 text-xs text-muted-foreground">
                                    {item.description}
                                  </p>
                                </div>
                                {isSelected && (
                                  <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary">
                                    <Check size={14} /> Seleccionado
                                  </span>
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {selectedProduct && (
                          <div className="pt-2 flex justify-end">
                            <button
                              onClick={() => setStep(2)}
                              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-md hover:bg-primary/90 cursor-pointer"
                            >
                              Siguiente: Elección de sabores <ChevronRight size={16} />
                            </button>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {/* STEP 2: Flavor Selection & Quantity */}
                    {step === 2 && (
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-5"
                      >
                        <div>
                          <h3 className="font-bold text-base text-foreground">
                            Seleccione los sabores de su preferencia:
                          </h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            Puede elegir uno o varios sabores según la disponibilidad actual en
                            tienda.
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {activeFlavors.map((flavor) => {
                            const isSelected = selectedFlavors.includes(flavor);
                            return (
                              <button
                                key={flavor}
                                onClick={() => toggleFlavor(flavor)}
                                className={cn(
                                  "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-medium transition-all cursor-pointer",
                                  isSelected
                                    ? "border-primary bg-primary text-primary-foreground font-bold shadow-sm"
                                    : "border-border bg-background text-foreground hover:border-primary/50",
                                )}
                              >
                                {isSelected && <Check size={13} />}
                                {flavor}
                              </button>
                            );
                          })}
                        </div>

                        <div className="rounded-2xl border border-border bg-card p-4 space-y-3">
                          <label className="block font-bold text-xs text-foreground uppercase tracking-wider">
                            Cantidad de unidades:
                          </label>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => setQuantity(Math.max(1, quantity - 1))}
                              className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background text-foreground hover:border-primary font-bold cursor-pointer"
                            >
                              -
                            </button>
                            <span className="font-extrabold text-lg text-foreground px-2">
                              {quantity}
                            </span>
                            <button
                              onClick={() => setQuantity(quantity + 1)}
                              className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background text-foreground hover:border-primary font-bold cursor-pointer"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="pt-2 flex justify-between items-center">
                          <button
                            onClick={() => setStep(1)}
                            className="text-xs font-medium text-muted-foreground hover:text-foreground cursor-pointer"
                          >
                            Volver a productos
                          </button>
                          <button
                            onClick={() => setStep(3)}
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-md hover:bg-primary/90 cursor-pointer"
                          >
                            Siguiente: Datos de Entrega <ChevronRight size={16} />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {/* STEP 3: Delivery Details & WhatsApp Order Generation */}
                    {step === 3 && (
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-4"
                      >
                        <h3 className="font-bold text-base text-foreground">
                          Datos finales para el despacho:
                        </h3>

                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-semibold text-foreground mb-1">
                              Nombre de quien recibe en Puerto Padre:
                            </label>
                            <input
                              type="text"
                              value={recipientName}
                              onChange={(e) => setRecipientName(e.target.value)}
                              placeholder="Ej. María González"
                              className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-foreground mb-1">
                              Dirección de entrega o indicación:
                            </label>
                            <input
                              type="text"
                              value={deliveryAddress}
                              onChange={(e) => setDeliveryAddress(e.target.value)}
                              placeholder="Ej. Calle Ave. Libertad #45 e/ Maceo y Martí"
                              className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-foreground mb-1">
                              Método de Pago:
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                              <button
                                type="button"
                                onClick={() => setPaymentMethod("Efectivo MN")}
                                className={cn(
                                  "rounded-xl border py-2 px-3 text-xs font-semibold transition-all cursor-pointer",
                                  paymentMethod === "Efectivo MN"
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "border-border bg-background text-muted-foreground",
                                )}
                              >
                                Efectivo en MN
                              </button>
                              <button
                                type="button"
                                onClick={() => setPaymentMethod("Zelle / Exterior")}
                                className={cn(
                                  "rounded-xl border py-2 px-3 text-xs font-semibold transition-all cursor-pointer",
                                  paymentMethod === "Zelle / Exterior"
                                    ? "border-primary bg-primary/10 text-primary"
                                    : "border-border bg-background text-muted-foreground",
                                )}
                              >
                                Zelle (Desde el exterior)
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Order Summary Preview */}
                        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 space-y-2">
                          <h4 className="font-bold text-xs uppercase tracking-wider text-primary">
                            Resumen del Pedido:
                          </h4>
                          <p className="text-xs text-foreground">
                            • <strong>Producto:</strong> {selectedProduct?.name} (
                            {selectedProduct?.price}) x {quantity}
                          </p>
                          {selectedFlavors.length > 0 && (
                            <p className="text-xs text-foreground">
                              • <strong>Sabores:</strong> {selectedFlavors.join(", ")}
                            </p>
                          )}
                          <p className="text-xs text-foreground">
                            • <strong>Pago:</strong> {paymentMethod}
                          </p>
                        </div>

                        {/* WhatsApp Action */}
                        <div className="pt-2">
                          <a
                            href={waLink(buildWhatsAppMessage())}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-emerald-700 hover:shadow-emerald-600/30 cursor-pointer"
                          >
                            <MessageCircle className="h-5 w-5" />
                            Enviar Pedido Formal por WhatsApp
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}

                {/* GUIDED FLOW FOR BIRTHDAYS */}
                {purchaseType === "birthday" && (
                  <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-5"
                  >
                    <div className="flex items-center justify-between border-b border-border pb-3">
                      <button
                        onClick={() => setPurchaseType(null)}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground cursor-pointer"
                      >
                        <ArrowLeft size={16} />
                        <span>Atrás</span>
                      </button>
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                        Cotización para Eventos
                      </span>
                    </div>

                    <div className="rounded-2xl border border-pink-500/20 bg-pink-500/5 p-4 text-xs text-foreground">
                      <p className="font-bold text-sm text-pink-600 dark:text-pink-400">
                        🎉 Helados para Cumpleaños y Fiestas
                      </p>
                      <p className="mt-1">
                        Preparamos tinas especiales, vasos listos para servir o combos festivos con
                        precios preferenciales para eventos.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1">
                          Cantidad estimada de invitados:
                        </label>
                        <input
                          type="text"
                          value={guestCount}
                          onChange={(e) => setGuestCount(e.target.value)}
                          placeholder="Ej. 25 personas"
                          className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1">
                          Fecha tentativa de la celebración:
                        </label>
                        <input
                          type="date"
                          value={eventDate}
                          onChange={(e) => setEventDate(e.target.value)}
                          className="w-full rounded-xl border border-border bg-background px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-foreground mb-1">
                          Sabores de preferencia:
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                          {activeFlavors.map((flavor) => {
                            const isSelected = selectedFlavors.includes(flavor);
                            return (
                              <button
                                key={flavor}
                                onClick={() => toggleFlavor(flavor)}
                                className={cn(
                                  "rounded-full border px-3 py-1 text-xs font-medium transition-all cursor-pointer",
                                  isSelected
                                    ? "border-primary bg-primary text-primary-foreground font-bold"
                                    : "border-border bg-background text-foreground",
                                )}
                              >
                                {flavor}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <a
                        href={waLink(buildWhatsAppMessage())}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-emerald-700 cursor-pointer"
                      >
                        <MessageCircle className="h-5 w-5" />
                        Solicitar Cotización de Cumpleaños
                      </a>
                    </div>
                  </motion.div>
                )}

                {/* AI CHAT MODE */}
                {purchaseType === "ai_chat" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex h-full flex-col justify-between space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-border pb-2">
                      <button
                        onClick={() => setPurchaseType(null)}
                        className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground cursor-pointer"
                      >
                        <ArrowLeft size={16} />
                        <span>Volver a opciones</span>
                      </button>
                      <span className="flex items-center gap-1 text-xs font-bold text-primary">
                        <Sparkles size={14} /> Asesor IA Caram
                      </span>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-3 pr-1 max-h-[380px]">
                      {chatMessages.map((msg, i) => (
                        <div
                          key={i}
                          className={cn(
                            "flex gap-2.5",
                            msg.role === "user" ? "flex-row-reverse" : "flex-row",
                          )}
                        >
                          <div
                            className={cn(
                              "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs",
                              msg.role === "user"
                                ? "bg-primary text-primary-foreground font-bold"
                                : "bg-card text-card-foreground border border-border",
                            )}
                          >
                            {msg.role === "user" ? "U" : <Bot size={15} />}
                          </div>
                          <div
                            className={cn(
                              "rounded-2xl px-4 py-2.5 text-xs leading-relaxed max-w-[85%]",
                              msg.role === "user"
                                ? "bg-primary text-primary-foreground rounded-tr-none"
                                : "bg-card text-card-foreground border border-border rounded-tl-none shadow-xs",
                            )}
                          >
                            {msg.content}
                          </div>
                        </div>
                      ))}
                      {chatMutation.isPending && (
                        <div className="flex gap-2.5 items-center text-xs text-muted-foreground">
                          <Bot size={15} className="animate-spin text-primary" />
                          <span>El asistente está redactando la respuesta...</span>
                        </div>
                      )}
                      <div ref={chatEndRef} />
                    </div>

                    <form
                      onSubmit={handleSendChat}
                      className="flex items-center gap-2 border-t border-border pt-3"
                    >
                      <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Pregunte sobre sabores, disponibilidad o combos..."
                        className="flex-1 rounded-full border border-border bg-background px-4 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                      <button
                        type="submit"
                        disabled={!chatInput.trim() || chatMutation.isPending}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-50 cursor-pointer"
                      >
                        <Send size={16} />
                      </button>
                    </form>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
