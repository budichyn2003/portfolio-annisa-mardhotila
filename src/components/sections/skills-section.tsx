// src/components/sections/skills-section.tsx
"use client";

import { motion } from "framer-motion";

export function SkillsSection({ data }: { data: any[] }) {
  // Kategori yang ada di form Admin kita
  const categories = ["Hard Skill", "Soft Skill", "Tools & Software"];

  return (
    <section id="skills" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-blue-600 tracking-wider uppercase mb-2">Capabilities</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Professional Skills</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            // Filter skill berdasarkan kategori yang sedang di-loop
            const categorySkills = data ? data.filter(skill => skill.category === category) : [];

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100"
              >
                <h4 className="text-lg font-bold text-slate-800 mb-6 pb-4 border-b border-slate-100">
                  {category}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {categorySkills.length > 0 ? (
                    categorySkills.map((skill) => (
                      <span key={skill.id} className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                        {skill.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-slate-400">Belum ada {category}.</span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}