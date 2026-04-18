"use client";

import { motion } from "framer-motion";
import { ArrowRight, Database, CheckCircle } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100/50 border border-blue-200 text-blue-700 text-sm font-medium mb-6"
        >
          <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
          Data-Driven Administration Specialist
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight"
        >
          Hi, I&apos;m <span className="text-gradient-blue">Annisa</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto text-lg text-slate-500 mb-10 leading-relaxed"
        >
          Membantu instansi besar mengelola data dengan akurasi tinggi dan efisiensi sistem administrasi berbasis digital.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <a href="#about" className="flex items-center gap-2 px-8 py-3.5 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all">
            Lihat Profil <ArrowRight size={18} />
          </a>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          <div className="glass-panel p-6 rounded-2xl flex flex-col items-center">
            <Database className="text-blue-500 mb-2" size={28} />
            <h3 className="text-2xl font-bold text-slate-800">1000+</h3>
            <p className="text-sm text-slate-500">Data Managed</p>
          </div>
          <div className="glass-panel p-6 rounded-2xl flex flex-col items-center">
            <CheckCircle className="text-blue-500 mb-2" size={28} />
            <h3 className="text-2xl font-bold text-slate-800">500+</h3>
            <p className="text-sm text-slate-500">Asset Recorded</p>
          </div>
          <div className="glass-panel p-6 rounded-2xl flex flex-col items-center col-span-2 md:col-span-1">
            <h3 className="text-2xl font-bold text-slate-800">99.9%</h3>
            <p className="text-sm text-slate-500">Data Accuracy</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}