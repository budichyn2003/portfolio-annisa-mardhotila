// src/components/sections/contact-form.tsx
"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Send } from "lucide-react";

// Komponen SVG Custom Anti-Error untuk LinkedIn
const LinkedinIcon = ({ size = 20 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect width="4" height="12" x="2" y="9"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export function ContactForm() {
  return (
    <section id="contact" className="py-24 bg-slate-50">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-blue-600 tracking-wider uppercase mb-2">Get In Touch</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">Hubungi Saya</h3>
        </div>

        <div className="grid md:grid-cols-5 gap-12">
          {/* Info Kontak */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 space-y-6"
          >
            <h4 className="text-xl font-bold text-slate-800 mb-4">Mari Berdiskusi</h4>
            <p className="text-slate-600 mb-8 leading-relaxed">
              Tertarik untuk berkolaborasi atau memiliki pertanyaan seputar pengelolaan data administrasi? Jangan ragu untuk menghubungi saya melalui kontak di bawah ini.
            </p>
            
            <a href="mailto:email@example.com" className="flex items-center gap-4 p-4 glass-panel rounded-xl hover:shadow-md transition-shadow group cursor-pointer">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500">Email</p>
                <p className="font-medium text-slate-800">annisa@example.com</p>
              </div>
            </a>

            <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 glass-panel rounded-xl hover:shadow-md transition-shadow group cursor-pointer">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500">WhatsApp</p>
                <p className="font-medium text-slate-800">+62 812 3456 7890</p>
              </div>
            </a>

            <a href="https://linkedin.com/in/annisajustexample" target="_blank" rel="noreferrer" className="flex items-center gap-4 p-4 glass-panel rounded-xl hover:shadow-md transition-shadow group cursor-pointer">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <LinkedinIcon size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500">LinkedIn</p>
                <p className="font-medium text-slate-800">Annisa Mardhotila</p>
              </div>
            </a>
          </motion.div>

          {/* Form Sederhana */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-3 glass-panel p-8 rounded-2xl"
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Nama Lengkap</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Email</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="john@company.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Pesan</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" placeholder="Ceritakan bagaimana saya bisa membantu Anda..."></textarea>
              </div>
              <button type="button" className="w-full py-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 hover:shadow-lg transition-all flex justify-center items-center gap-2">
                Kirim Pesan <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}