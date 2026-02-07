export interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  imageUrl?: string;
  pdfUrl?: string;
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

export interface MyWork {
  id: string;
  title: string;
  type: "framing" | "moving";
  imageUrl: string;
  description?: string;
  createdAt: string;
}

export interface PortfolioData {
  projects: Project[];
  skills: Skill[];
  myWorks: MyWork[];
  hero: {
    subtitle: string;
    tagline: string;
    title: string;
    description: string;
  };
  contact: {
    phone: string;
    email: string;
    location: string;
    linkedin: string;
  };
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
  myWorks: [],
  hero: {
    subtitle: "WEB3 CONTENT CREATOR & CREATIVE PRODUCER",
    tagline: "NOT JUST CONTENT. CULTURE.",
    title: "Md Saklain Jawed",
    description: "CFA L1 • CMT L2 • FRM L1",
  },
  contact: {
    phone: "+971 58 885 3410",
    email: "saklainjawed.fundmanager@gmail.com",
    location: "Dubai, United Arab Emirates",
    linkedin: "linkedin.com/in/md-saklain-jawed",
  },
  about: {
    bio: "Creating 3D animations, AI-generated videos, and crypto-native content for Web3 brands. Bridging finance expertise with creative execution for Web3 brands.",
    location: "Dubai, UAE",
    yearsExperience: "3+",
    projectsCompleted: "50+",
    web3Brands: "10+",
  },
};

export const CMS_STORAGE_KEY = "saklain-portfolio-cms";
export const AUTH_STORAGE_KEY = "saklain-portfolio-auth";
