import { useSignal } from "@preact/signals";

/**
 * Props interface for AgentSquad component
 */
export interface Props {
  /**
   * @title Section Title
   * @description The main title for the agent squad section
   * @default Conheça o seu esquadrão
   */
  title?: string;

  /**
   * @title Agent Categories
   * @description Array of agent category tabs
   */
  categories?: Array<{
    id: string;
    label: string;
    agents: Array<{
      id: string;
      name: string;
      description: string;
      imageUrl?: string;
      avatarIcon?: string;
    }>;
  }>;
}

/**
 * Tab Switch Component
 */
function TabSwitch({ 
  categories, 
  activeTab, 
  onTabChange 
}: {
  categories: Props['categories'];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}) {
  if (!categories) return null;

  return (
    <div class="bg-[#E4E4E7] rounded-full p-1 flex flex-wrap sm:flex-nowrap gap-2 sm:gap-4 w-full sm:w-auto justify-center">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onTabChange(category.id)}
          class={`px-3 sm:px-4 py-3 rounded-full text-xs sm:text-base font-normal uppercase transition-all duration-200 whitespace-nowrap ${
            activeTab === category.id
              ? 'bg-[#16A34A] text-[#F0FDF4] font-semibold'
              : 'bg-transparent text-[#71717A] hover:bg-white/50'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  );
}

/**
 * Agent Card Component
 */
function AgentCard({ 
  agent 
}: {
  agent: {
    id: string;
    name: string;
    description: string;
    imageUrl?: string;
    avatarIcon?: string;
  };
}) {
  return (
    <div class="flex flex-col items-center gap-3 sm:gap-4 p-1 sm:p-2">
      {/* Agent Image */}
      <div 
        class="w-full h-[200px] sm:h-[260px] lg:h-[320px] rounded-[9.6px] bg-gradient-to-b from-[#1F0A0A]/10 to-[#1F0A0A]/80 relative overflow-hidden"
        style={{
          backgroundImage: agent.imageUrl ? `url(${agent.imageUrl})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div class="absolute inset-0 bg-gradient-to-b from-[#1F0A0A]/10 to-[#1F0A0A]/80"></div>
      </div>

      {/* Agent Info */}
      <div class="flex flex-col gap-3 sm:gap-4 py-4 sm:py-6 w-full">
        {/* Agent Header */}
        <div class="flex items-center gap-3 sm:gap-4 w-full">
          {/* Agent Avatar */}
          <div class="w-8 h-8 sm:w-10 sm:h-10 rounded-md bg-white border border-[#78716C]/20 shadow-sm flex items-center justify-center">
            {agent.avatarIcon ? (
              <img src={agent.avatarIcon} alt={agent.name} class="w-6 h-6 sm:w-8 sm:h-8 rounded" />
            ) : (
              <div class="w-6 h-6 sm:w-8 sm:h-8 bg-[#A595FF] rounded-sm"></div>
            )}
          </div>
          
          {/* Agent Name */}
          <h3 class="text-[20px] sm:text-[26px] lg:text-[32px] font-medium text-[#0A0A0A] leading-none">
            {agent.name}
          </h3>
        </div>

        {/* Agent Description */}
        <p class="text-[14px] sm:text-[16px] lg:text-[20px] font-normal text-[#A3A3A3] leading-[1.4] w-full whitespace-pre-line">
          {agent.description}
        </p>
      </div>
    </div>
  );
}

/**
 * AgentSquad island component following the Figma design
 */
export default function AgentSquad({
  title = "Conheça o seu esquadrão",
  categories = [
    {
      id: "icp-strategist",
      label: "ICP STRATEGIST",
      agents: [
        {
          id: "scheduler-1",
          name: "Scheduler",
          description: "Marca reuniões com eficiência militar.\nAutomatize a logística e aumente o volume de demos marcadas.",
          imageUrl: "/static/agent-bg-1.jpg"
        },
        {
          id: "scheduler-2", 
          name: "Scheduler",
          description: "Marca reuniões com eficiência militar.\nAutomatize a logística e aumente o volume de demos marcadas.",
          imageUrl: "/static/agent-bg-2.jpg"
        },
        {
          id: "scheduler-3",
          name: "Scheduler", 
          description: "Marca reuniões com eficiência militar.\nAutomatize a logística e aumente o volume de demos marcadas.",
          imageUrl: "/static/agent-bg-3.jpg"
        }
      ]
    },
    {
      id: "lead-hunters",
      label: "Lead Hunters",
      agents: [
        {
          id: "hunter-1",
          name: "Lead Hunter",
          description: "Encontra leads qualificados com precisão cirúrgica.\nIdentifica prospects perfeitos para seu ICP.",
          imageUrl: "/static/agent-bg-1.jpg"
        },
        {
          id: "hunter-2",
          name: "Lead Hunter",
          description: "Encontra leads qualificados com precisão cirúrgica.\nIdentifica prospects perfeitos para seu ICP.",
          imageUrl: "/static/agent-bg-2.jpg"
        },
        {
          id: "hunter-3",
          name: "Lead Hunter",
          description: "Encontra leads qualificados com precisão cirúrgica.\nIdentifica prospects perfeitos para seu ICP.",
          imageUrl: "/static/agent-bg-3.jpg"
        }
      ]
    },
    {
      id: "lead-in-depth", 
      label: "Lead in-depth",
      agents: [
        {
          id: "analyst-1",
          name: "Lead Analyst",
          description: "Analisa leads em profundidade para máxima conversão.\nExtrai insights valiosos de cada prospect.",
          imageUrl: "/static/agent-bg-1.jpg"
        },
        {
          id: "analyst-2",
          name: "Lead Analyst", 
          description: "Analisa leads em profundidade para máxima conversão.\nExtrai insights valiosos de cada prospect.",
          imageUrl: "/static/agent-bg-2.jpg"
        },
        {
          id: "analyst-3",
          name: "Lead Analyst",
          description: "Analisa leads em profundidade para máxima conversão.\nExtrai insights valiosos de cada prospect.",
          imageUrl: "/static/agent-bg-3.jpg"
        }
      ]
    },
    {
      id: "lead-operation",
      label: "Lead Operation", 
      agents: [
        {
          id: "operator-1",
          name: "Lead Operator",
          description: "Executa operações de lead com eficiência máxima.\nAutomatiza processos e otimiza resultados.",
          imageUrl: "/static/agent-bg-1.jpg"
        },
        {
          id: "operator-2",
          name: "Lead Operator",
          description: "Executa operações de lead com eficiência máxima.\nAutomatiza processos e otimiza resultados.",
          imageUrl: "/static/agent-bg-2.jpg"
        },
        {
          id: "operator-3", 
          name: "Lead Operator",
          description: "Executa operações de lead com eficiência máxima.\nAutomatiza processos e otimiza resultados.",
          imageUrl: "/static/agent-bg-3.jpg"
        }
      ]
    }
  ]
}: Props) {
  const activeTab = useSignal(categories[0]?.id || "icp-strategist");
  
  const activeCategory = categories.find(cat => cat.id === activeTab.value);

  return (
    <section class="w-full bg-[#F9FAFB] py-16 sm:py-24 lg:py-32 px-4 sm:px-8 lg:px-16">
      <div class="max-w-[1312px] mx-auto">
        
        {/* Section Header */}
        <div class="flex flex-col items-center gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-10">
          
          {/* Title */}
          <div class="flex flex-col items-center gap-4">
            <h2 class="text-[28px] sm:text-[36px] lg:text-[48px] font-normal text-[#171717] text-center leading-[1.2] tracking-[-0.05em]">
              {title}
            </h2>
          </div>

          {/* Tab Switch */}
          <TabSwitch 
            categories={categories}
            activeTab={activeTab.value}
            onTabChange={(tabId) => activeTab.value = tabId}
          />
        </div>

        {/* Agent Cards Container */}
        {activeCategory && (
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-2 w-full">
            {activeCategory.agents.map((agent) => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
} 