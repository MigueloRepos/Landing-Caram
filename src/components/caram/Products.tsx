import { useState } from "react";
import cups from "@/assets/cups-8oz.jpg";
import tub from "@/assets/tub-4l.jpg";
import { Reveal } from "./Reveal";
import { flushSync } from "react-dom";
import { X, IceCream } from "lucide-react";
import { WhatsAppButton } from "./WhatsAppButton";
import { waLink, ORDER_MESSAGE } from "@/lib/caram";
import { useQuery } from "@tanstack/react-query";
import { getFlavorsFn } from "@/server-functions/flavors";

const products = [
  {
    title: "Vasos de 8 oz",
    text: "El tamaño perfecto para disfrutar donde quieras.",
    price: "$1.80",
    image: cups,
    alt: "Cuatro copas de helado de mango, fresa, chocolate y pistacho decoradas con frutas",
  },
  {
    title: "Tinas de 4.5 litros",
    text: "Más sabor, más momentos para compartir.",
    price: "$9.50",
    image: tub,
    alt: "Tina grande de helado de chocolate con chips",
  },
];

export function Products() {
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[0] | null>(null);

  const { data: flavors, isLoading: flavorsLoading } = useQuery({
    queryKey: ["flavors"],
    queryFn: async () => {
      const res = await getFlavorsFn();
      return res as {
        taste?: string;
        name?: string;
        flavor?: string;
        sabor?: string;
        nombre?: string;
      }[];
    },
  });

  const openProduct = (product: (typeof products)[0]) => {
    if (!document.startViewTransition) {
      setSelectedProduct(product);
      return;
    }
    document.startViewTransition(() => {
      flushSync(() => {
        setSelectedProduct(product);
      });
    });
  };

  const closeProduct = () => {
    if (!document.startViewTransition) {
      setSelectedProduct(null);
      return;
    }
    document.startViewTransition(() => {
      flushSync(() => {
        setSelectedProduct(null);
      });
    });
  };

  return (
    <>
      <style>{`
        .product-card-active { view-transition-name: product-card; }
        .product-image-active { view-transition-name: product-image; }
        .product-title-active { view-transition-name: product-title; }
      `}</style>

      <section id="productos" className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight uppercase sm:text-4xl">
              Nuestros <span className="text-primary">productos</span>
            </h2>
            <p className="mt-3 text-muted-foreground">Calidad artesanal en cada porción</p>
          </Reveal>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {products.map((product, i) => {
              const isActive = selectedProduct?.title === product.title;
              return (
                <Reveal key={product.title} as="article" delay={i * 120} className="group">
                  <button
                    onClick={() => openProduct(product)}
                    className={`w-full text-left overflow-hidden rounded-4xl bg-card text-card-foreground shadow-card transition-transform duration-300 hover:-translate-y-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${isActive ? "opacity-0" : ""}`}
                    style={isActive ? { viewTransitionName: "product-card" } : {}}
                  >
                    <div className="overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.alt}
                        width={1024}
                        height={768}
                        loading="lazy"
                        className="h-56 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-72"
                        style={isActive ? { viewTransitionName: "product-image" } : {}}
                      />
                    </div>
                    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-6 sm:p-8">
                      <div className="min-w-0">
                        <h3
                          className="text-xl font-extrabold tracking-tight uppercase sm:text-2xl"
                          style={isActive ? { viewTransitionName: "product-title" } : {}}
                        >
                          {product.title}
                        </h3>
                        <p className="mt-2 text-sm text-card-foreground/75">{product.text}</p>
                      </div>
                      <div className="flex shrink-0 flex-col items-center rounded-2xl bg-primary px-4 py-3 leading-none text-primary-foreground shadow-soft">
                        <span className="text-xl font-extrabold sm:text-2xl">{product.price}</span>
                        <span className="mt-1 text-[0.6rem] font-semibold tracking-[0.2em] uppercase">
                          C/U
                        </span>
                      </div>
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Expanded Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 pt-16 pb-4 sm:p-6">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={closeProduct}
          />
          <div
            className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-4xl bg-card text-card-foreground shadow-card scrollbar-hide"
            style={{ viewTransitionName: "product-card" }}
          >
            <button
              onClick={closeProduct}
              className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-md transition-colors hover:bg-black/40"
            >
              <X size={20} />
            </button>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.alt}
              className="h-48 w-full object-cover sm:h-72"
              style={{ viewTransitionName: "product-image" }}
            />
            <div className="p-6 sm:p-10">
              <h3
                className="text-3xl font-extrabold tracking-tight uppercase sm:text-4xl"
                style={{ viewTransitionName: "product-title" }}
              >
                {selectedProduct.title}
              </h3>
              <p className="mt-4 text-base sm:text-lg text-card-foreground/80">
                {selectedProduct.text}
              </p>

              <div className="mt-8 border-t border-border pt-6">
                <h4 className="flex items-center gap-2 text-lg font-bold text-foreground">
                  <IceCream className="text-primary" size={24} />
                  Sabores Disponibles
                </h4>

                <div className="mt-4">
                  {flavorsLoading ? (
                    <div className="flex animate-pulse gap-2 flex-wrap">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-8 w-24 rounded-full bg-muted"></div>
                      ))}
                    </div>
                  ) : flavors && flavors.length > 0 ? (
                    <ul className="flex flex-wrap gap-2">
                      {flavors.map((f, i) => {
                        // Adjust depending on the actual column name in Supabase
                        const flavorName =
                          f.taste || f.name || f.flavor || f.sabor || f.nombre || "Sabor especial";
                        return (
                          <li
                            key={i}
                            className="rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary"
                          >
                            {flavorName}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground italic">
                      No tenemos sabores disponibles por ahora.
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-col items-start">
                  <span className="text-sm font-semibold uppercase text-muted-foreground">
                    Precio
                  </span>
                  <span className="text-3xl font-extrabold text-primary">
                    {selectedProduct.price}
                  </span>
                </div>

                <WhatsAppButton href={waLink(ORDER_MESSAGE)} size="lg">
                  Pedir ahora
                </WhatsAppButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
