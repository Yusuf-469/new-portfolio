export interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl?: string;
  color: string;
  bgGradient: string;
  createdAt: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  description?: string;
  createdAt: string;
}

export interface PortfolioData {
  projects: Project[];
  skills: Skill[];
  about: {
    bio: string;
    location: string;
    yearsExperience: string;
    projectsCompleted: string;
    web3Brands: string;
  };
}

export const DEFAULT_PORTFOLIO_DATA: PortfolioData = {
  projects: [
    {
      id: "1",
      name: "MINTAIR",
      category: "Web3 Platform Launch",
      description: "Promotional reels and launch visuals for NFT infrastructure platform.",
      color: "#00D4FF",
      bgGradient: "from-[#00D4FF]/20 to-transparent",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      name: "REEF CHAIN",
      category: "Blockchain Marketing",
      description: "Community content and exchange-style marketing for Layer 1 blockchain.",
      color: "#7928CA",
      bgGradient: "from-[#7928CA]/20 to-transparent",
      createdAt: new Date().toISOString(),
    },
    {
      id: "3",
      name: "KOKOPAI",
      category: "AI/Art Project",
      description: "Creative direction and video content for AI art platform.",
      color: "#FF0080",
      bgGradient: "from-[#FF0080]/20 to-transparent",
      createdAt: new Date().toISOString(),
    },
    {
      id: "4",
      name: "THE CANDLESTICK TRADES",
      category: "Trading Education",
      description: "Technical analysis content and trading education visuals.",
      color: "#FFD700",
      bgGradient: "from-[#FFD700]/20 to-transparent",
      createdAt: new Date().toISOString(),
    },
  ],
  skills: [
    { id: "1", name: "3D Animation & Motion Design", category: "Creative", createdAt: new Date().toISOString() },
    { id: "2", name: "AI Video Generation & Editing", category: "Creative", createdAt: new Date().toISOString() },
    { id: "3", name: "Crypto Marketing & Community", category: "Marketing", createdAt: new Date().toISOString() },
    { id: "4", name: "Technical Analysis (TradingView)", category: "Finance", createdAt: new Date().toISOString() },
    { id: "5", name: "Event Coverage & Livestream", category: "Production", createdAt: new Date().toISOString() },
  ],
  about: {
    bio: "I'm a Web3 content creator and creative producer with hands-on experience working with blockchain and crypto brands through DappRush Studios. Specialized in 3D animations, AI-generated videos, and short-form digital content tailored for crypto marketing, community engagement, and livestream promotion.",
    location: "Dubai, UAE",
    yearsExperience: "3+",
    projectsCompleted: "50+",
    web3Brands: "10+",
  },
};

export const CMS_STORAGE_KEY = "saklain-portfolio-cms";
export const AUTH_STORAGE_KEY = "saklain-portfolio-auth";
