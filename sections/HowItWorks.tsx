/**
 * Props interface for HowItWorks component
 */
export interface Props {
  /**
   * @title Eyebrow Text
   * @description Small tag text above the title
   * @default Como funciona
   */
  eyebrowText?: string;

  /**
   * @title Section Title
   * @description The main title for the how it works section
   * @default Você define a missão. Os agents executam com precisão.
   */
  title?: string;

  /**
   * @title CTA Button Text
   * @description Text for the call-to-action button
   * @default Iniciar Primeira Missão
   */
  ctaText?: string;

  /**
   * @title CTA Button Link
   * @description URL for the CTA button
   * @default /start-mission
   */
  ctaHref?: string;

  /**
   * @title Process Steps
   * @description Array of process steps
   */
  steps?: Array<{
    number: string;
    title: string;
    description: string;
    illustration: "chat" | "network" | "analytics";
  }>;
}

/**
 * Step Card Component
 */
function StepCard({ 
  step 
}: {
  step: {
    number: string;
    title: string;
    description: string;
    illustration: "chat" | "network" | "analytics";
  };
}) {
  const getIllustrationSrc = () => {
    switch (step.illustration) {
      case "chat":
        return "/static/como-1.svg";
      case "network":
        return "/static/como-2.svg";
      case "analytics":
        return "/static/como-3.svg";
      default:
        return "/static/como-1.svg";
    }
  };

  return (
    <div class="flex flex-col justify-end gap-[10px] w-[295px] h-[508px] relative">
      {/* Card */}
      <div class="absolute inset-0 bg-[#FAFAFA] border border-[#A3A3A3] rounded-[20px] backdrop-blur-[80px] p-7 flex flex-col justify-stretch">
        <div class="flex flex-col gap-20 h-full">
          {/* Header */}
          <div class="flex flex-col gap-8">
            {/* Number and Title */}
            <div class="flex flex-col gap-8">
              <div class="w-10 h-10 bg-[#16A34A] rounded-[12px] flex items-center justify-center">
                <span class="text-[20px] font-bold text-[#F5F5F5] font-geist leading-[1.2]">
                  {step.number}
                </span>
              </div>
              
              <div class="flex flex-col gap-2">
                <h3 class="text-[24px] font-semibold text-[#0A0A0A] leading-none font-inter tracking-[-0.02em]">
                  {step.title}
                </h3>
                <p class="text-[14px] font-medium text-[#71717A] leading-[1.71] font-inter">
                  {step.description}
                </p>
              </div>
            </div>
          </div>
          
          {/* Illustration */}
          <div class="flex-1 flex items-end justify-center">
            <img 
              src={getIllustrationSrc()} 
              alt={`Ilustração da etapa ${step.number}: ${step.title}`}
              class="w-[295px] h-[174px] object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * HowItWorks section following the Figma design
 */
export default function HowItWorks({
  eyebrowText = "Como funciona",
  title = "Você define a missão. Os agents executam com precisão.",
  ctaText = "Iniciar Primeira Missão",
  ctaHref = "/start-mission",
  steps = [
    {
      number: "1",
      title: "Lance a missão",
      description: 'Defina o objetivo: "Encontrar CFOs em fintechs de alto crescimento". O Seals.ai ativa automaticamente os agentes certos para iniciar a operação.',
      illustration: "chat"
    },
    {
      number: "2", 
      title: "Comande os agentes",
      description: "Cada agent executa sua parte com precisão — encontrar leads, enriquecer dados, escrever mensagens, marcar demos. Você decide quando e como ativar cada um.",
      illustration: "network"
    },
    {
      number: "3",
      title: "Acompanhe, aprenda, escale", 
      description: "Monitore o avanço da missão em tempo real. Analise os resultados, refine a estratégia e escale sua operação.",
      illustration: "analytics"
    }
  ]
}: Props) {
  return (
    <>
      {/* Add fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
        
        .how-it-works-btn {
          background: linear-gradient(135deg, #22C55E 0%, #15803D 100%);
          box-shadow: 0px 0px 0px 2px rgba(34, 197, 94, 1);
          border: 2px solid #FAFAFA;
          font-family: 'Geist', sans-serif;
        }
      `}</style>
      
      <section class="w-full bg-[#FAFAFA] py-[144px] px-8">
        <div class="max-w-[1440px] mx-auto">
          <div class="flex flex-col items-center gap-12">
            
            {/* Header */}
            <div class="flex flex-col items-center gap-4 max-w-none mx-auto">
              {/* Eyebrow tag */}
              <div class="bg-[#EFF6FF] border border-[#93C5FD] rounded-[20px] backdrop-blur-[8px] px-4 py-2">
                <span class="text-[12px] font-medium text-[#1E3A8A] font-inter leading-none text-center">
                  {eyebrowText}
                </span>
              </div>
              
              {/* Title */}
              <h2 class="text-[56px] font-normal text-[#0A0A0A] leading-none tracking-[-0.02em] text-center max-w-[906px] font-inter">
                {title}
              </h2>
            </div>

            {/* Steps Row */}
            <div class="flex flex-row justify-center items-center gap-2 w-full">
              {steps.map((step, index) => (
                <StepCard key={index} step={step} />
              ))}
            </div>

            {/* CTA Button */}
            <a
              href={ctaHref}
              class="how-it-works-btn h-[44px] px-8 rounded-full text-[#FAFAFA] font-medium text-[16px] leading-none flex items-center justify-center transition-all duration-200 hover:scale-105"
            >
              {ctaText}
            </a>

          </div>
        </div>
      </section>
    </>
  );
} 