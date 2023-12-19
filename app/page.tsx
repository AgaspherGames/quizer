import { CreateSection } from "@/components/component/LandingPage/create-section";
import { Features } from "@/components/component/LandingPage/features";
import { Header } from "@/components/component/Base/header";
import { Hero } from "@/components/component/LandingPage/hero";
import Lights, { LightProps } from "@/components/component/Background/Lights";

const lights: LightProps[] = [
  {
    color: "sky",
    pos: "top-0 left-0",
    size: "medium",
  },
  {
    color: "sky",
    pos: "top-2/3 left-0",
    size: "small",
  },
  {
    color: "teal",
    pos: "top-1/3 right-0",
    size: "small",
    translateToRight: true,
  },
  {
    color: "teal",
    pos: "bottom-0 left-1/3",
    size: "medium",
    translateToBottom: true,
  },
];

export default function Home() {
  return (
    <main className=" min-h-screen md:text-lg">
      <Lights lights={lights} />
      <div className="relative z-10">
        <Header />
        <Hero />
        <Features />
        <CreateSection />
      </div>
    </main>
  );
}
