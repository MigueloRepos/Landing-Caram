import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/caram/Header";
import { Hero } from "@/components/caram/Hero";
import { WhyChooseUs } from "@/components/caram/WhyChooseUs";
import { Products } from "@/components/caram/Products";
import { Combos } from "@/components/caram/Combos";
import { Birthday } from "@/components/caram/Birthday";
import { AboutUs } from "@/components/caram/AboutUs";
import { Testimonials } from "@/components/caram/Testimonials";
import { FinalCta } from "@/components/caram/FinalCta";
import { MobileNav } from "@/components/caram/MobileNav";
import { ShoppingAssistant } from "@/components/caram/ShoppingAssistant";
import { LocationGreeting } from "@/components/caram/LocationGreeting";

const title = "Caram Helados | Helados artesanales en Puerto Padre";
const description =
  "Helados artesanales cremosos en Puerto Padre, Las Tunas. Copas de 8 oz, tinas de 4.5 L y combos para fiestas y cumpleaños. Pide por WhatsApp.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen pb-16 lg:pb-0">
      <LocationGreeting />
      <Header />
      <main>
        <Hero />
        <WhyChooseUs />
        <Products />
        <Combos />
        <Birthday />
        <AboutUs />
        <Testimonials />
      </main>
      <FinalCta />
      <ShoppingAssistant />
      <MobileNav />
    </div>
  );
}
