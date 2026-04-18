// src/components/sections/experience-section.tsx
"use client";

import { motion } from "framer-motion";

// Perhatikan: Kita tambahkan { data }: { data: any[] } di sini
export function ExperienceSection({ data }: { data: any[] }) {
  return (
    <section id="experience" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-blue-600 tracking-wider uppercase mb-2">Career Path</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Professional Experience</h3>
        </div>

        <div className="relative border-l-2 border-blue-100 ml-4 md:ml-0">
          {data && data.length > 0 ? (
            data.map((exp, index) => (
              <motion.div 
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="mb-12 relative pl-8 md:pl-10"
              >
                <div className="absolute -left-[11px] top-1 h-5 w-5 rounded-full bg-blue-600 border-4 border-white" />
                <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100">
                  <h4 className="text-xl font-bold text-slate-800">{exp.position}</h4>
                  <p className="text-lg font-medium text-blue-600 mb-2">{exp.company}</p>
                  <span className="inline-block px-3 py-1 mb-4 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold">
                    {exp.period}
                  </span>
                  <p className="text-slate-600 whitespace-pre-line">{exp.description}</p>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-slate-500">Belum ada pengalaman yang ditambahkan.</p>
          )}
        </div>
      </div>
    </section>
  );
}