"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, MapPin, Settings } from "lucide-react";
import { useAuth } from "../../lib/cms/AuthContext";
import AdminPanel from "./AdminPanel";

const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#insights", label: "Insights" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "glass-strong py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="display-text text-2xl font-bold text-white">
            S-S.
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-400 hover:text-white transition-colors duration-300 relative group"
                  data-cursor-hover
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00D4FF] transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
              {isAuthenticated && (
                <button
                  onClick={() => setIsAdminPanelOpen(true)}
                  className="text-sm font-medium text-[#00D4FF] hover:text-[#00B8E6] transition-colors duration-300 relative group flex items-center gap-1"
                  data-cursor-hover
                >
                  <Settings size={16} />
                  Admin
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00D4FF] transition-all duration-300 group-hover:w-full" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-4 border-l border-white/10 pl-6">
              <span className="text-xs text-mono text-gray-500 hidden xl:block">
                25.2048° N 55.2708° E
              </span>
              <a
                href="#contact"
                className="px-5 py-2.5 text-sm font-medium bg-white text-black hover:bg-[#00D4FF] transition-colors duration-300"
                data-cursor-hover
              >
                Let's Talk
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white"
            onClick={() => setIsMobileMenuOpen(true)}
            data-cursor-hover
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Full-Screen Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-[#0A0A0A] flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <span className="display-text text-2xl font-bold text-white">S-S.</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white"
                data-cursor-hover
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center gap-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="display-text text-4xl font-bold text-gray-400 hover:text-white transition-colors"
                  data-cursor-hover
                >
                  {link.label}
                </motion.a>
              ))}
              {isAuthenticated && (
                <motion.button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsAdminPanelOpen(true);
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navLinks.length * 0.1 }}
                  className="display-text text-4xl font-bold text-[#00D4FF] transition-colors"
                  data-cursor-hover
                >
                  Admin
                </motion.button>
              )}
            </div>

            <div className="p-6 border-t border-white/10">
              <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
                <MapPin size={14} />
                <span className="text-mono">25.2048° N 55.2708° E</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Slide-in Admin Panel */}
      <AdminPanel isOpen={isAdminPanelOpen} onClose={() => setIsAdminPanelOpen(false)} />
    </>
  );
}
