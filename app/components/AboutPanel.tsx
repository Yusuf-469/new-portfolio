"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Users, Award, Clock } from "lucide-react";

const expertiseItems = [
  "3D Animation & Motion Design",
  "AI Video Generation & Editing",
  "Crypto Marketing & Community",
  "Technical Analysis (TradingView)",
  "Event Coverage & Livestream",
];

const stats = [
  { value: "50+", label: "Projects" },
  { value: "10+", label: "Web3 Brands" },
  { value: "3+", label: "Years Experience" },
  { value: "Dubai", label: "Base" },
];

export function AboutPanel() {
  const [expandedPill, setExpandedPill] = useState<number | null>(null);

  return (
    <section id="about" className="py-32 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Image Section */}
          <div className="relative">
            <motion.div
              className="relative aspect-[3/4] overflow-hidden"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Image
                src="/saklain.jpeg"
                alt="MD SAKLAIN JAWED - Web3 Content Creator"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-br from-[#00D4FF]/20 to-[#7928CA]/20" />
              <div className="absolute inset-4 border border-white/20" />
            </motion.div>

            {/* Location Badge */}
            <motion.div
              className="absolute -bottom-4 -right-4 glass px-4 py-3 flex items-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <MapPin size={16} className="text-[#00D4FF]" />
              <span className="text-sm font-medium">Dubai, UAE</span>
            </motion.div>
          </div>

          {/* Content Section */}
          <div className="flex flex-col justify-center">
            <motion.p
              className="text-sm font-mono text-[#00D4FF] mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              ( OR ABOUT )
            </motion.p>

            <motion.h2
              className="display-text text-4xl lg:text-5xl mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Bridging finance expertise with creative execution for Web3 brands.
            </motion.h2>

            <motion.p
              className="text-gray-400 leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              I'm a Web3 content creator and creative producer with hands-on experience
              working with blockchain and crypto brands through DappRush Studios.
              Specialized in 3D animations, AI-generated videos, and short-form digital
              content tailored for crypto marketing, community engagement, and livestream promotion.
            </motion.p>

            {/* Expertise Pills */}
            <div className="space-y-3 mb-12">
              {expertiseItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <button
                    onClick={() => setExpandedPill(expandedPill === index ? null : index)}
                    className="w-full glass px-5 py-4 text-left flex items-center justify-between hover:bg-white/10 transition-all duration-300 group"
                    data-cursor-hover
                  >
                    <span className="font-medium group-hover:text-[#00D4FF] transition-colors">
                      {item}
                    </span>
                    <span className={`text-[#00D4FF] transition-transform duration-300 ${
                      expandedPill === index ? "rotate-180" : ""
                    }`}>
                      →
                    </span>
                  </button>
                  
                  {/* Expanded content */}
                  {expandedPill === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 py-4 text-gray-500 text-sm">
                        Specialized expertise in {item.toLowerCase()}, delivering
                        premium quality content for Web3 and blockchain brands.
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <p className="display-text text-3xl text-[#00D4FF] mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
