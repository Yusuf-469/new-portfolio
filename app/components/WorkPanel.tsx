"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, FileText } from "lucide-react";
import { useCMS } from "../../lib/cms/CMSContext";

export function WorkPanel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  const { data } = useCMS();
  const projects = data.projects;

  return (
    <section id="work" className="py-32 bg-[#0A0A0A]" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="flex items-end justify-between mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div>
            <p className="text-sm font-mono text-[#00D4FF] mb-4">( OR SELECTED WORK )</p>
            <h2 className="display-text text-4xl lg:text-5xl">BEST PROJECTS</h2>
          </div>
          <p className="text-sm font-mono text-gray-500 hidden md:block">©2025</p>
        </motion.div>

        <div className="relative">
          {/* Progress dots */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/10 hidden lg:block">
            <motion.div
              className="w-full bg-[#00D4FF]"
              style={{ height: useTransform(scrollYProgress, [0, 1], ["0%", "100%"]) }}
            />
          </div>

          <div className="lg:pl-8 space-y-32">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="relative group"
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                {/* Project Card */}
                <div className="relative overflow-hidden">
                  {/* Background with parallax */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${project.bgGradient} opacity-50`}
                    style={{
                      transform: useTransform(
                        scrollYProgress,
                        [0, 1],
                        ["scale(1)", "scale(1.1)"]
                      )
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 p-8 lg:p-12 min-h-[400px] flex flex-col justify-between">
                    {/* Category & Index */}
                    <div className="flex items-center justify-between">
                      <span 
                        className="text-sm font-mono px-3 py-1 rounded-full border border-white/20"
                        style={{ color: project.color, borderColor: `${project.color}40` }}
                      >
                        {project.category}
                      </span>
                      <span className="text-6xl font-display text-white/10 group-hover:text-white/30 transition-colors">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="mt-8">
                      <h3 className="display-text text-5xl lg:text-7xl mb-4 group-hover:text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 transition-all">
                        {project.name}
                      </h3>
                      <p className="text-gray-400 text-lg max-w-xl">
                        {project.description}
                      </p>
                    </div>

                    {/* CTA Buttons */}
                    <div className="mt-8 flex items-center gap-4">
                      {project.pdfUrl ? (
                        <a
                          href={project.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-white transition-colors group/btn"
                          data-cursor-hover
                          download
                        >
                          <FileText size={16} className="group-hover/btn:-translate-y-1 transition-transform" />
                          <span className="text-sm font-medium">Download Case Study</span>
                        </a>
                      ) : (
                        <button
                          className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 hover:border-white transition-colors group/btn"
                          data-cursor-hover
                        >
                          <span className="text-sm font-medium">View Case Study</span>
                          <ArrowUpRight size={16} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-[#00D4FF]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Client Logos Marquee */}
        <div className="mt-32 pt-16 border-t border-white/10">
          <p className="text-center text-sm font-mono text-gray-500 mb-8">TRUSTED BY</p>
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24">
            {["Mintair", "Reef Chain", "KOKOPAI", "DappRush", "Candlestick"].map((brand, index) => (
              <motion.span
                key={index}
                className="text-xl font-display text-gray-600 hover:text-white transition-colors cursor-pointer"
                whileHover={{ scale: 1.1 }}
                data-cursor-hover
              >
                {brand}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
