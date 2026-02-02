"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Video, Target, Users, TrendingUp, Sparkles, Share2,
  Play, Layers, Radio
} from "lucide-react";

const services = [
  {
    icon: Video,
    title: "Content Creation",
    description: "3D animations, AI-generated videos, and short-form content optimized for crypto communities.",
    hoverContent: "Preview reel playing...",
    color: "#00D4FF"
  },
  {
    icon: Target,
    title: "Brand Strategy",
    description: "Visual storytelling for blockchain brands. From Mintair to Reef Chain, I craft narratives that resonate.",
    hoverContent: ["Mintair", "Reef Chain", "KOKOPAI"],
    color: "#7928CA"
  },
  {
    icon: Users,
    title: "Community & Events",
    description: "Livestream production, event coverage, and community engagement across Dubai's Web3 ecosystem.",
    hoverContent: "Event photo grid",
    color: "#FF0080"
  },
  {
    icon: TrendingUp,
    title: "Technical Analysis",
    description: "Trading-focused content, market analysis visuals, and exchange-style marketing materials.",
    hoverContent: "Chart animation",
    color: "#00D4FF"
  },
  {
    icon: Sparkles,
    title: "AI & Emerging Tech",
    description: "Cutting-edge AI video generation, motion design, and experimental formats.",
    hoverContent: "Glitch effect preview",
    color: "#7928CA"
  },
  {
    icon: Share2,
    title: "Social Optimization",
    description: "Platform-native content for Instagram, X, Telegram. Reels, Shorts, and viral formats.",
    hoverContent: "Engagement metrics animate",
    color: "#FF0080"
  }
];

export function ServicesPanel() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);

  return (
    <section id="services" className="py-32 bg-[#141414]">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-sm font-mono text-[#00D4FF] mb-4">( OR SERVICES )</p>
          <h2 className="display-text text-4xl lg:text-5xl">WHAT I DO</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredService(index)}
              onMouseLeave={() => setHoveredService(null)}
              className="group relative glass-strong p-8 hover:bg-white/5 transition-all duration-500"
            >
              {/* Hover Glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at center, ${service.color}20 0%, transparent 70%)`
                }}
              />

              {/* Border Glow */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  boxShadow: `0 0 30px ${service.color}40`
                }}
              />

              <div className="relative z-10">
                {/* Icon */}
                <div 
                  className="w-12 h-12 mb-6 flex items-center justify-center rounded-lg"
                  style={{
                    background: `${service.color}20`,
                    color: service.color
                  }}
                >
                  <service.icon size={24} />
                </div>

                {/* Title */}
                <h3 className="display-text text-xl mb-3 group-hover:text-[#00D4FF] transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Hover Reveal Content */}
                <div className={`overflow-hidden transition-all duration-500 ${
                  hoveredService === index ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
                }`}>
                  {typeof service.hoverContent === "string" ? (
                    <p className="text-sm" style={{ color: service.color }}>
                      {service.hoverContent}
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {service.hoverContent.map((item, i) => (
                        <span 
                          key={i}
                          className="text-xs px-2 py-1 rounded"
                          style={{
                            background: `${service.color}20`,
                            color: service.color
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Arrow indicator */}
                <div className="flex items-center gap-2 text-sm text-[#00D4FF] opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Explore</span>
                  <span>→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
