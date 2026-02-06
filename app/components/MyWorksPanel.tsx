"use client";

import { useCMS } from "../../lib/cms/CMSContext";
import { Palette } from "lucide-react";

export default function MyWorksPanel() {
  const { data, isLoading } = useCMS();

  if (isLoading) {
    return (
      <section id="myworks" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-12">
            <Palette className="text-[#00D4FF]" size={28} />
            <h2 className="display-section text-3xl font-bold text-white">My Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-[#1A1A1A] rounded-xl overflow-hidden border border-white/10 animate-pulse"
              >
                <div className="aspect-[4/3] bg-[#252525]" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-[#252525] rounded w-3/4" />
                  <div className="h-3 bg-[#252525] rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const framingWorks = data.myWorks.filter((w) => w.type === "framing");
  const movingWorks = data.myWorks.filter((w) => w.type === "moving");

  return (
    <section id="myworks" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <Palette className="text-[#00D4FF]" size={28} />
          <h2 className="display-section text-3xl font-bold text-white">My Works</h2>
        </div>

        {/* Framing Pictures */}
        {framingWorks.length > 0 && (
          <div className="mb-12">
            <h3 className="text-lg text-gray-400 mb-6 font-medium">Framing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {framingWorks.map((work) => (
                <div
                  key={work.id}
                  className="group bg-[#1A1A1A] rounded-xl overflow-hidden border border-white/10 hover:border-[#00D4FF]/50 transition-all duration-300"
                >
                  {work.imageUrl && (
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={work.imageUrl}
                        alt={work.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h4 className="text-white font-semibold mb-1">{work.title}</h4>
                    {work.description && (
                      <p className="text-sm text-gray-500">{work.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Moving Pictures */}
        {movingWorks.length > 0 && (
          <div>
            <h3 className="text-lg text-gray-400 mb-6 font-medium">Moving</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {movingWorks.map((work) => (
                <div
                  key={work.id}
                  className="group bg-[#1A1A1A] rounded-xl overflow-hidden border border-white/10 hover:border-[#00D4FF]/50 transition-all duration-300"
                >
                  {work.imageUrl && (
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={work.imageUrl}
                        alt={work.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h4 className="text-white font-semibold mb-1">{work.title}</h4>
                    {work.description && (
                      <p className="text-sm text-gray-500">{work.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.myWorks.length === 0 && (
          <div className="text-center py-16 bg-[#1A1A1A] rounded-xl border border-white/10">
            <Palette className="mx-auto mb-4 text-gray-600" size={48} />
            <h3 className="text-xl text-white font-semibold mb-2">No Works Yet</h3>
            <p className="text-gray-500">
              Add your framing and moving pictures through the CMS panel
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
