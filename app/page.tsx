import { CreateSection } from "@/components/component/LandingPage/create-section";
import { Features } from "@/components/component/LandingPage/features";
import { Header } from "@/components/component/Base/header";
import { Hero } from "@/components/component/LandingPage/hero";

export default function Home() {
  return (
    <main className="bg-black min-h-screen md:text-lg">
      <div className="z-0 absolute inset-0 overflow-hidden">
        <div
          className="light top-0 left-0 -translate-x-1/2 -translate-y-1/2"
          data-size="medium"
          data-color="sky"
        ></div>
        <div
          className="light top-2/3 left-0 -translate-x-1/2 -translate-y-1/2"
          data-size="small"
          data-color="sky"
        ></div>
        <div
          className="light top-1/3 right-0 translate-x-1/2 -translate-y-1/2"
          data-size="small"
          data-color="teal"
        ></div>
        <div
          className="light bottom-0 left-1/3 -translate-x-1/2 translate-y-1/2"
          data-size="medium"
          data-color="teal"
        ></div>
      </div>
      <div className="relative z-10">

      <Header />
      <Hero />
      <Features />
      <CreateSection />
      </div>
    </main>
  );
}
