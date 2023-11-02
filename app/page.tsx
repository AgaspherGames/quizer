import { CreateSection } from "@/components/component/create-section";
import { Features } from "@/components/component/features";
import { Header } from "@/components/component/header";
import { Hero } from "@/components/component/hero";
import { Landing } from "@/components/component/landing";
import Image from "next/image";

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
