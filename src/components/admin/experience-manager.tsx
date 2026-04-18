// src/components/admin/experience-manager.tsx
"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { Plus, Pencil, Trash2, Loader2, X } from "lucide-react";
import type { Experience } from "@/types";

export function ExperienceManager() {
  const supabase = createClient();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // State untuk form
  const [formData, setFormData] = useState<Partial<Experience>>({
    company: "",
    position: "",
    period: "",
    description: "",
    order_num: 0
  });

  // Ambil data dari Supabase saat komponen dimuat
  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("experience")
      .select("*")
      .order("order_num", { ascending: true });

    if (!error && data) {
      setExperiences(data);
    }
    setIsLoading(false);
  };

  const handleOpenModal = (exp?: Experience) => {
    if (exp) {
      setFormData(exp); // Mode Edit
    } else {
      setFormData({ company: "", position: "", period: "", description: "", order_num: experiences.length }); // Mode Tambah Baru
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    if (formData.id) {
      // UPDATE DATA
      const { error } = await supabase.from("experience").update(formData).eq("id", formData.id);
      if (!error) fetchExperiences();
    } else {
      // INSERT DATA BARU
      const { error } = await supabase.from("experience").insert([formData]);
      if (!error) fetchExperiences();
    }

    setIsModalOpen(false);
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Yakin ingin menghapus pengalaman ini?")) {
      await supabase.from("experience").delete().eq("id", id);
      fetchExperiences();
    }
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;
  }

  return (
    <div className="space-y-6">
      {/* Tombol Tambah */}
      <div className="flex justify-end">
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-all font-medium"
        >
          <Plus size={18} /> Tambah Pengalaman
        </button>
      </div>

      {/* Tabel Data */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-sm text-slate-600">
              <th className="p-4 font-medium">Posisi & Perusahaan</th>
              <th className="p-4 font-medium">Periode</th>
              <th className="p-4 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {experiences.length === 0 ? (
              <tr><td colSpan={3} className="p-8 text-center text-slate-500">Belum ada data pengalaman.</td></tr>
            ) : (
              experiences.map((exp) => (
                <tr key={exp.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-slate-800">{exp.position}</p>
                    <p className="text-sm text-blue-600 font-medium">{exp.company}</p>
                  </td>
                  <td className="p-4 text-slate-600">{exp.period}</td>
                  <td className="p-4 flex justify-end gap-2">
                    <button onClick={() => handleOpenModal(exp)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Pencil size={18} />
                    </button>
                    <button onClick={() => handleDelete(exp.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Form Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-xl font-bold text-slate-800">{formData.id ? "Edit Pengalaman" : "Tambah Pengalaman"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-700"><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Posisi / Jabatan</label>
                <input type="text" required value={formData.position || ""} onChange={(e) => setFormData({...formData, position: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 outline-none" placeholder="Contoh: Data Administration Specialist" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Perusahaan / Instansi</label>
                <input type="text" required value={formData.company || ""} onChange={(e) => setFormData({...formData, company: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 outline-none" placeholder="Contoh: Kanwil DJP" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Periode</label>
                <input type="text" required value={formData.period || ""} onChange={(e) => setFormData({...formData, period: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 outline-none" placeholder="Contoh: 2023 - Present" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Deskripsi / Pencapaian</label>
                <textarea required rows={4} value={formData.description || ""} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500/20 outline-none" placeholder="Tuliskan tanggung jawab dan pencapaian..." />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-slate-600 font-medium hover:bg-slate-50 rounded-xl transition-colors">Batal</button>
                <button type="submit" disabled={isSaving} className="px-5 py-2.5 bg-blue-600 text-white font-medium hover:bg-blue-700 rounded-xl transition-colors disabled:opacity-50">
                  {isSaving ? "Menyimpan..." : "Simpan Data"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}