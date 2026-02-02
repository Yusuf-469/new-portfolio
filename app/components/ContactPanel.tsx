"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  Phone, Mail, MapPin, Linkedin, Instagram, 
  Twitter, Send, ArrowRight
} from "lucide-react";

// Magnetic Button Component
function MagneticButton({ children, type = "button", className = "" }: { children: React.ReactNode; type?: "button" | "submit" | "reset"; className?: string }) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 150 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;
      
      x.set(distX * 0.3);
      y.set(distY * 0.3);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    ref.current?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseLeave);
      ref.current?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [x, y]);

  return (
    <motion.button
      ref={ref}
      style={{ x: xSpring, y: ySpring }}
      type={type}
      className={className}
      data-cursor-hover
    >
      {children}
    </motion.button>
  );
}

const articles = [
  {
    title: "The Future of AI in Web3 Marketing",
    date: "May 30, 2025",
    category: "AI & Web3"
  },
  {
    title: "Building Crypto Communities That Last",
    date: "May 15, 2025",
    category: "Community"
  },
  {
    title: "Technical Analysis for Content Creators",
    date: "April 28, 2025",
    category: "Trading"
  }
];

export function ContactPanel() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <>
      {/* Insights Section */}
      <section id="insights" className="py-32 bg-[#141414]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            className="flex items-end justify-between mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div>
              <p className="text-sm font-mono text-[#00D4FF] mb-4">( OR INSIGHTS )</p>
              <h2 className="display-text text-4xl lg:text-5xl">LATEST FROM THE STUDIO</h2>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <motion.article
                key={index}
                className="group cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                data-cursor-hover
              >
                <div className="glass-strong p-6 h-full hover:bg-white/5 transition-all duration-300 group-hover:-translate-y-2">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-[#00D4FF]">{article.category}</span>
                    <span className="text-xs text-gray-500">{article.date}</span>
                  </div>
                  <h3 className="text-xl font-medium leading-tight mb-4 group-hover:text-[#00D4FF] transition-colors">
                    {article.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 group-hover:text-white transition-colors">
                    <span>Read More</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <motion.p
                className="text-sm font-mono text-[#00D4FF] mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                ( OR CONTACT )
              </motion.p>

              <motion.h2
                className="display-text text-4xl lg:text-5xl mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Start a Project
                <br />
                Get In Touch
              </motion.h2>

              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 text-gray-400">
                  <Phone size={18} className="text-[#00D4FF]" />
                  <span>+971 58 885 3410</span>
                </div>
                <div className="flex items-center gap-4 text-gray-400">
                  <Mail size={18} className="text-[#00D4FF]" />
                  <span>saklainjawed.fundmanager@gmail.com</span>
                </div>
                <div className="flex items-center gap-4 text-gray-400">
                  <MapPin size={18} className="text-[#00D4FF]" />
                  <span>Dubai, United Arab Emirates</span>
                </div>
                <div className="flex items-center gap-4 text-gray-400">
                  <Linkedin size={18} className="text-[#00D4FF]" />
                  <a href="#" className="hover:text-white transition-colors">
                    linkedin.com/in/md-saklain-jawed
                  </a>
                </div>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="flex gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                {[Linkedin, Instagram, Twitter].map((Icon, index) => (
                  <a
                    key={index}
                    href="#"
                    className="w-10 h-10 glass flex items-center justify-center hover:bg-white/10 transition-colors"
                    data-cursor-hover
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </motion.div>
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-[#00D4FF] transition-colors"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-[#00D4FF] transition-colors"
                      placeholder="your@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Company / Brand
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-[#00D4FF] transition-colors"
                    placeholder="Company name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Project Type
                  </label>
                  <select
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-[#00D4FF] transition-colors"
                  >
                    <option value="">Select project type</option>
                    <option value="content">Content Creation</option>
                    <option value="strategy">Brand Strategy</option>
                    <option value="events">Event Coverage</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 px-4 py-3 focus:outline-none focus:border-[#00D4FF] transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <MagneticButton
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#00D4FF] to-[#7928CA] text-white font-medium py-4 flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <span>Send Message</span>
                  <Send size={18} />
                </MagneticButton>
              </form>
            </motion.div>
          </div>
        </div>

        {/* Footer Giant Text */}
        <div className="mt-32 overflow-hidden">
          <motion.div
            className="flex justify-center"
            animate={{ x: ["0%", "-10%"] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <p className="display-text text-[15vw] leading-none text-white/5 text-center whitespace-nowrap">
              SAKLAIN STUDIOS
            </p>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-gray-500">©2025 Saklain Studios. Based in Dubai, Working Worldwide.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Resume/CV Download</a>
            <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Style Guide</a>
            <a href="#" className="text-sm text-gray-500 hover:text-white transition-colors">Back to Top</a>
          </div>
        </div>
      </section>
    </>
  );
}
