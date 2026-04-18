// src/components/sections/education-section.tsx
"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award } from "lucide-react";

export function EducationSection({ 
  educationData, 
  certificationData 
}: { 
  educationData: any[], 
  certificationData: any[] 
}) {
  return (
    <section id="education" className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Kolom Education */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-blue-50 rounded-xl">
                <GraduationCap className="text-blue-600" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Education</h3>
            </div>
            
            <div className="space-y-6">
              {educationData && educationData.length > 0 ? (
                educationData.map((edu) => (
                  <div key={edu.id} className="glass-panel p-6 rounded-2xl border-l-4 border-l-blue-600">
                    <h4 className="text-xl font-bold text-slate-800">{edu.university}</h4>
                    <p className="text-blue-600 font-medium mb-3">{edu.degree}</p>
                    <div className="flex justify-between items-center">
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 rounded-lg text-sm font-semibold text-slate-700">
                        GPA: <span className="text-blue-600">{edu.gpa}</span>
                      </div>
                      <span className="text-sm font-semibold text-slate-500">{edu.period}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-500">Belum ada data pendidikan.</p>
              )}
            </div>
          </motion.div>

          {/* Kolom Certification */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-blue-50 rounded-xl">
                <Award className="text-blue-600" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-slate-800">Certifications</h3>
            </div>
            
            <div className="space-y-4">
              {certificationData && certificationData.length > 0 ? (
                certificationData.map((cert) => (
                  <div key={cert.id} className="glass-panel p-5 rounded-2xl flex items-start gap-4">
                    <Award className="text-slate-400 mt-1" size={20} />
                    <div>
                      <h4 className="font-bold text-slate-800">{cert.title}</h4>
                      <p className="text-sm text-slate-500">{cert.issuer}</p>
                      {cert.credential_url && (
                        <a href={cert.credential_url} target="_blank" rel="noreferrer" className="text-xs text-blue-600 hover:underline mt-1 block">
                          Lihat Kredensial
                        </a>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-slate-500">Belum ada sertifikasi.</p>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}