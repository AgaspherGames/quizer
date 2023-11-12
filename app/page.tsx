import { CreateSection } from "@/components/component/LandingPage/create-section";
import { Features } from "@/components/component/LandingPage/features";
import { Header } from "@/components/component/Base/header";
import { Hero } from "@/components/component/LandingPage/hero";

export default function Home() {
  return (
    <main className="bg-black min-h-screen md:text-lg">
      <Header />
      <Hero />
      <Features />
      <CreateSection />
    </main>
  );
}
