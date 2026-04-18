// src/components/sections/projects-section.tsx
"use client";

import { motion } from "framer-motion";
import { FolderGit2, ExternalLink } from "lucide-react";

export function ProjectsSection({ data }: { data: any[] }) {
  return (
    <section id="projects" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-blue-600 tracking-wider uppercase mb-2">Portfolio</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Featured Projects</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {data && data.length > 0 ? (
            data.map((project, index) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group glass-panel rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 hover:shadow-lg border border-slate-100 flex flex-col"
              >
                {project.image_url && (
                  <div className="w-full h-48 overflow-hidden">
                    <img src={project.image_url} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="text-xl font-bold text-slate-800">{project.title}</h4>
                    {project.project_url && (
                      <a href={project.project_url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-600">
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                  <p className="text-slate-600 mb-6 leading-relaxed flex-1">{project.description}</p>
                  
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.technologies.map((tool: string, i: number) => (
                        <span key={i} className="text-xs font-semibold tracking-wide uppercase px-3 py-1 bg-slate-100 text-slate-600 rounded-md">
                          {tool}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-slate-500 col-span-2">Belum ada project yang ditambahkan.</p>
          )}
        </div>
      </div>
    </section>
  );
}