"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useCMS } from "../../lib/cms/CMSContext";

const credentials = [
  "CFA LEVEL 1 CANDIDATE",
  "CMT LEVEL 2",
  "FRM LEVEL 1",
  "BBALLB",
  "CS EXECUTIVE",
  "TECHNICAL ANALYST",
];

const marqueeItems = [
  "3D ANIMATION",
  "★",
  "AI VIDEO",
  "★",
  "CRYPTO MARKETING",
  "★",
  "WEB3 CONTENT",
  "★",
  "COMMUNITY ENGAGEMENT",
  "★",
];

export function HeroPanel() {
  const { data } = useCMS();
  const hero = data.hero;
  const contact = data.contact;
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const [displayText, setDisplayText] = useState("");
  const fullText = hero.tagline || "NOT JUST CONTENT. CULTURE.";
  const [isGlitching, setIsGlitching] = useState(true);

  useEffect(() => {
    // Text scramble effect
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        fullText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return fullText[index];
            }
            return String.fromCharCode(33 + Math.floor(Math.random() * 94));
          })
          .join("")
      );

      if (iteration >= fullText.length) {
        clearInterval(interval);
        setIsGlitching(false);
      }

      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <section ref={containerRef} className="relative min-h-screen pt-20 overflow-hidden">
      {/* Hero Content */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-32">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Image Section */}
          <motion.div
            className="lg:col-span-5 relative"
            style={{ y: imageY }}
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              {/* Glitch overlay */}
              <motion.div
                className="absolute inset-0 bg-[#00D4FF]/20 z-10"
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 1, delay: 0.5 }}
              />
              
              {/* Scan line effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00D4FF]/10 to-transparent z-20 pointer-events-none"
                initial={{ top: "-100%" }}
                animate={{ top: "100%" }}
                transition={{ duration: 2, delay: 0.3 }}
              />

              <Image
                src="/saklain.jpg"
                alt="Md Saklain Jawed - Web3 Content Creator"
                fill
                className={`object-cover grayscale hover:grayscale-0 transition-all duration-700 ${
                  isGlitching ? "filter contrast-125" : ""
                }`}
                priority
              />
              
              {/* Circular frame overlay */}
              <div className="absolute inset-0 border-2 border-white/20 m-4" />
            </div>

            {/* Floating badge */}
            <motion.div
              className="absolute -bottom-6 -right-6 glass px-4 py-2 flex items-center gap-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
            >
              <span className="w-2 h-2 bg-[#00D4FF] rounded-full animate-pulse" />
              <span className="text-sm font-medium">{contact.location || "Based in Dubai"}</span>
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            className="lg:col-span-7"
            style={{ y: textY, opacity }}
          >
            <motion.p
              className="text-sm font-mono text-[#00D4FF] mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {hero.subtitle || "WEB3 CONTENT CREATOR & CREATIVE PRODUCER"}
            </motion.p>

            <motion.h1
              className="display-text text-5xl lg:text-7xl xl:text-8xl leading-none mb-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className="block text-white">Md Saklain Jawed</span>
            </motion.h1>

            {/* Animated Tagline */}
            <motion.div
              className="overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl lg:text-4xl font-display text-white/80">
                {displayText}
              </h2>
            </motion.div>

            <motion.p
              className="text-lg text-gray-400 max-w-xl mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              {hero.description || "Creating 3D animations, AI-generated videos, and crypto-native content for Web3 brands."}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <a
                href="#work"
                className="px-8 py-4 bg-gradient-to-r from-[#00D4FF] to-[#7928CA] text-white font-medium hover:opacity-90 transition-opacity"
                data-cursor-hover
              >
                View Portfolio
              </a>
              <a
                href="#contact"
                className="px-8 py-4 border border-white/20 text-white font-medium hover:bg-white/5 transition-colors"
                data-cursor-hover
              >
                Let's Collaborate
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Infinite Scroll Ribbon */}
      <div className="border-y border-white/10 overflow-hidden py-4">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, index) => (
            <span
              key={index}
              className={`text-2xl font-display mx-4 ${
                item === "★"
                  ? "text-[#00D4FF]"
                  : "text-white/60"
              }`}
            >
              {item}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Credentials Ticker */}
      <div className="sticky top-20 z-30 bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/5">
        <motion.div
          className="flex whitespace-nowrap py-3"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        >
          {[...credentials, ...credentials].map((cred, index) => (
            <span
              key={index}
              className="text-xs font-mono text-[#00D4FF] mx-6 hover:text-white transition-colors cursor-pointer"
            >
              {cred}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
