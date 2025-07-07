/**
 * Props interface for Hero component
 */
export interface Props {
  /**
   * @title Main Heading
   * @description The main headline text
   * @format textarea
   * @default Mais um software de vendas?\nNão. É o seu esquadrão de elite.
   */
  title?: string;

  /**
   * @title Description
   * @description Supporting description text
   * @format textarea
   * @default Comande um time de AI Agents especialistas em cada etapa do processo de vendas outbound, todos com a mesma missão: qualificar o seu pipeline e transformar seus resultados.
   */
  description?: string;

  /**
   * @title Primary CTA Text
   * @description Text for the primary call-to-action button
   * @default Comece Agora
   */
  primaryCtaText?: string;

  /**
   * @title Primary CTA Link
   * @description URL for the primary CTA button
   * @default /get-started
   */
  primaryCtaHref?: string;

  /**
   * @title Secondary CTA Text
   * @description Text for the secondary call-to-action button
   * @default Conheça seu Esquadrão
   */
  secondaryCtaText?: string;

  /**
   * @title Secondary CTA Link
   * @description URL for the secondary CTA button
   * @default /learn-more
   */
  secondaryCtaHref?: string;

  /**
   * @title Disclaimer Text
   * @description Small disclaimer text below CTAs
   * @default 💳 No credit card • 🔄 Cancel anytime • ✨ 14-day free trial
   */
  disclaimerText?: string;
}

/**
 * Hero section following the Figma design
 */
export default function Hero({
  title = "Mais um software de vendas?\nNão. É o seu esquadrão de elite.",
  description = "Comande um time de AI Agents especialistas em cada etapa do processo de vendas outbound, todos com a mesma missão: qualificar o seu pipeline e transformar seus resultados.",
  primaryCtaText = "Comece Agora",
  primaryCtaHref = "/get-started",
  secondaryCtaText = "Conheça seu Esquadrão",
  secondaryCtaHref = "/learn-more",
  disclaimerText = "💳 No credit card • 🔄 Cancel anytime • ✨ 14-day free trial",
}: Props) {
  return (
    <>
      {/* Adicionar fontes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@1,500&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Geist:wght@400;500&display=swap');
        .hero-btn-primary {
          background: radial-gradient(circle at 50% 50%, #22C55E 0%, #15803D 100%);
          box-shadow: 0px 0px 0px 2px rgba(34, 197, 94, 1);
          border: 2px solid #FAFAFA;
          font-family: 'Geist', sans-serif;
        }
        .hero-btn-secondary {
          background: transparent;
          box-shadow: 0px 0px 0px 2px rgba(34, 197, 94, 1);
          border: 2px solid #22C55E;
          font-family: 'Geist', sans-serif;
        }
      `}</style>
      
      <section class="w-full bg-transparent min-h-[400px] lg:h-[782px] flex flex-col justify-start items-center px-4 sm:px-8 lg:px-16 pt-16 sm:pt-20 lg:pt-24 pb-12 lg:pb-10">
        <div class="max-w-[1440px] mx-auto w-full">
          
          {/* Hero Content Container - Responsive spacing */}
          <div class="flex flex-col items-center gap-6 sm:gap-8 lg:gap-[48px] max-w-none mx-auto">
            
            {/* Hero Text */}
            <div class="flex flex-col items-center gap-4 sm:gap-6 lg:gap-[24px] text-center">
              {/* Main Heading - Responsive */}
              <h1 class="text-center leading-none tracking-[-0.05em]">
                <span class="block text-[32px] sm:text-[40px] md:text-[56px] lg:text-[70px] xl:text-[80px] font-medium text-[#262626] font-inter">
                  Mais um software de vendas?
                </span>
                <span class="block mt-1 sm:mt-2">
                  <span class="text-[32px] sm:text-[40px] md:text-[56px] lg:text-[70px] xl:text-[80px] font-medium text-[#262626] font-inter">Não. É o seu </span>
                  <span class="text-[36px] sm:text-[44px] md:text-[60px] lg:text-[80px] xl:text-[90px] font-medium text-[#262626] italic" style="font-family: 'Crimson Pro', serif;">esquadrão de elite.</span>
                </span>
              </h1>
            </div>

            {/* Description Wrapper - Responsive */}
            <div class="max-w-[860px] mx-auto px-4 sm:px-8 md:px-12 lg:px-[60px]">
              <p class="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] xl:text-[24px] font-normal text-[#A1A1AA] text-center leading-[1.2] font-inter">
                {description}
              </p>
            </div>

            {/* CTA Buttons and Disclaimer - Responsive */}
            <div class="flex flex-col items-center gap-4 sm:gap-6 lg:gap-[24px]">
              
              {/* CTA Buttons */}
              <div class="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-[24px] w-full sm:w-auto">
                {/* Primary CTA Button - Responsive */}
                <a
                  href={primaryCtaHref}
                  class="hero-btn-primary h-[44px] sm:h-[44px] px-6 sm:px-8 rounded-full text-white font-medium text-[14px] sm:text-[16px] leading-none flex items-center justify-center transition-all duration-200 hover:scale-105 min-w-[200px] sm:min-w-auto"
                >
                  {primaryCtaText}
                </a>

                {/* Secondary CTA Button - Responsive */}
                <a
                  href={secondaryCtaHref}
                  class="hero-btn-secondary h-[44px] sm:h-[44px] px-6 sm:px-8 rounded-full text-[#22C55E] font-medium text-[14px] sm:text-[16px] leading-none flex items-center justify-center transition-all duration-200 hover:scale-105 hover:bg-green-50 min-w-[200px] sm:min-w-auto"
                >
                  {secondaryCtaText}
                </a>
              </div>

              {/* Disclaimer - Responsive */}
              <p class="text-[12px] sm:text-[14px] font-normal text-[#71717A] text-center leading-none font-inter px-4">
                {disclaimerText}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
} 