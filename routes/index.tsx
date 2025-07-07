import { PageProps } from "$fresh/server.ts";
import Header from "../sections/Header.tsx";
import Hero from "../sections/Hero.tsx";
import AgentSquad from "../islands/AgentSquad.tsx";
import HowItWorks from "../sections/HowItWorks.tsx";
import TetheredFlow from "../islands/TetheredFlow.tsx";

export default function HomePage(props: PageProps) {
  return (
    <div class="min-h-screen bg-neutral-50 relative">
      {/* Animated Background - covers entire page */}
      <div class="fixed inset-0 w-full h-full z-0">
        <TetheredFlow />
      </div>
      
      {/* Page Content - above animation */}
      <div class="relative z-10">
        {/* Header */}
        <Header />
        
        {/* Hero Section */}
        <Hero />
        
        {/* Agent Squad Section */}
        <AgentSquad />
        
        {/* How It Works Section */}
        <HowItWorks />
        
        {/* Additional content placeholder */}
        <div class="py-20 text-center">
          <p class="text-gray-600">Mais seções da landing page virão aqui...</p>
        </div>
      </div>
    </div>
  );
} 