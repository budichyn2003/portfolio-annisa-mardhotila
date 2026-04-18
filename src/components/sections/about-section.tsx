"use client";

import { motion } from "framer-motion";
import { Target, BarChart2, ShieldCheck } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <h2 className="text-sm font-bold text-blue-600 tracking-wider uppercase mb-2">About Me</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
              Mengubah Data Menjadi <span className="text-blue-600">Keputusan Tepat</span>
            </h3>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Lulusan Ekonomi Pembangunan dengan pengalaman di Bank Indonesia, PLN, dan Kanwil DJP. Saya terbiasa mengelola ribuan data dengan tingkat akurasi tinggi serta berkontribusi dalam efisiensi sistem administrasi digital.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2 grid gap-4"
          >
            {[
              { icon: <ShieldCheck size={24} className="text-blue-600" />, title: "Data Accuracy", desc: "Menjaga tingkat akurasi tinggi dalam pengelolaan data." },
              { icon: <Target size={24} className="text-blue-600" />, title: "Administration Efficiency", desc: "Mendigitalisasi proses operasional menjadi terstruktur." },
              { icon: <BarChart2 size={24} className="text-blue-600" />, title: "Data Management", desc: "Memonitor aset menggunakan sistem informasi kompleks." }
            ].map((item, index) => (
              <div key={index} className="glass-panel p-6 rounded-2xl flex gap-4 items-start">
                <div className="p-3 bg-blue-50 rounded-lg">{item.icon}</div>
                <div>
                  <h4 className="text-lg font-bold text-slate-800 mb-1">{item.title}</h4>
                  <p className="text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}