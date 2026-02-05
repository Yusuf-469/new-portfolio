"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../lib/cms/AuthContext";
import { Lock, User, ArrowRight } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If already authenticated, redirect to admin
    if (isAuthenticated) {
      router.push("/admin");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (login(username, password)) {
      router.push("/admin");
    } else {
      setError("Invalid credentials. Please try again.");
    }

    setIsLoading(false);
  };

  // Don't render anything while checking auth (redirect will happen)
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="display-text text-4xl font-bold text-white mb-2">S-S.</h1>
          <p className="text-gray-500">CMS Login</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Username
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF] transition-colors"
                placeholder="Enter username"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-12 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF] transition-colors"
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#00D4FF] text-black font-medium py-4 rounded-lg hover:bg-[#00B8E6] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              "Signing in..."
            ) : (
              <>
                Sign In
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {/* Back to Home */}
        <div className="mt-8 text-center">
          <a
            href="/"
            className="text-sm text-gray-500 hover:text-white transition-colors"
          >
            ← Back to Portfolio
          </a>
        </div>

        {/* Demo Credentials Info */}
        <div className="mt-8 p-4 bg-white/5 rounded-lg border border-white/10">
          <p className="text-xs text-gray-500 text-center">
            Demo credentials: saklain / admin123
          </p>
        </div>
      </div>
    </div>
  );
}
