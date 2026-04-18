// src/components/admin/education-manager.tsx
"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { Plus, Pencil, Trash2, Loader2, X } from "lucide-react";
import type { Education } from "@/types";

export function EducationManager() {
  const supabase = createClient();
  const [educations, setEducations] = useState<Education[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState<Partial<Education>>({
    university: "", degree: "", gpa: "", period: "", order_num: 0
  });

  useEffect(() => { fetchEducations(); }, []);

  const fetchEducations = async () => {
    setIsLoading(true);
    const { data } = await supabase.from("education").select("*").order("order_num", { ascending: true });
    if (data) setEducations(data);
    setIsLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    if (formData.id) {
      await supabase.from("education").update(formData).eq("id", formData.id);
    } else {
      await supabase.from("education").insert([formData]);
    }
    fetchEducations();
    setIsModalOpen(false);
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Hapus data pendidikan ini?")) {
      await supabase.from("education").delete().eq("id", id);
      fetchEducations();
    }
  };

  if (isLoading) return <div className="flex justify-center h-64 items-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button onClick={() => { setFormData({ university: "", degree: "", gpa: "", period: "", order_num: educations.length }); setIsModalOpen(true); }} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 font-medium">
          <Plus size={18} /> Tambah Pendidikan
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-sm text-slate-600">
              <th className="p-4 font-medium">Universitas & Gelar</th>
              <th className="p-4 font-medium">GPA & Periode</th>
              <th className="p-4 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {educations.length === 0 ? <tr><td colSpan={3} className="p-8 text-center text-slate-500">Belum ada data.</td></tr> : educations.map((edu) => (
              <tr key={edu.id} className="border-b border-slate-100">
                <td className="p-4"><p className="font-bold text-slate-800">{edu.university}</p><p className="text-sm text-blue-600 font-medium">{edu.degree}</p></td>
                <td className="p-4 text-slate-600"><p>GPA: {edu.gpa}</p><p className="text-sm">{edu.period}</p></td>
                <td className="p-4 flex justify-end gap-2">
                  <button onClick={() => { setFormData(edu); setIsModalOpen(true); }} className="p-2 text-slate-400 hover:text-blue-600"><Pencil size={18} /></button>
                  <button onClick={() => handleDelete(edu.id)} className="p-2 text-slate-400 hover:text-red-600"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6">
            <h3 className="text-xl font-bold mb-4">{formData.id ? "Edit" : "Tambah"} Pendidikan</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <input type="text" required value={formData.university || ""} onChange={(e) => setFormData({...formData, university: e.target.value})} className="w-full px-4 py-2 border rounded-lg" placeholder="Universitas (ex: University of Lampung)" />
              <input type="text" required value={formData.degree || ""} onChange={(e) => setFormData({...formData, degree: e.target.value})} className="w-full px-4 py-2 border rounded-lg" placeholder="Gelar (ex: S1 Ekonomi Pembangunan)" />
              <input type="text" value={formData.gpa || ""} onChange={(e) => setFormData({...formData, gpa: e.target.value})} className="w-full px-4 py-2 border rounded-lg" placeholder="GPA (ex: 3.85)" />
              <input type="text" required value={formData.period || ""} onChange={(e) => setFormData({...formData, period: e.target.value})} className="w-full px-4 py-2 border rounded-lg" placeholder="Periode (ex: 2018 - 2022)" />
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600">Batal</button>
                <button type="submit" disabled={isSaving} className="px-4 py-2 bg-blue-600 text-white rounded-lg">{isSaving ? "Menyimpan..." : "Simpan"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}