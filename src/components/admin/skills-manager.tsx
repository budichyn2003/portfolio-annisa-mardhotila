// src/components/admin/skills-manager.tsx
"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { Plus, Pencil, Trash2, Loader2, X } from "lucide-react";
import type { Skill } from "@/types";

export function SkillsManager() {
  const supabase = createClient();
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [formData, setFormData] = useState<Partial<Skill>>({ category: "Hard Skill", name: "" });

  useEffect(() => { fetchSkills(); }, []);

  const fetchSkills = async () => {
    setIsLoading(true);
    const { data } = await supabase.from("skills").select("*").order("category");
    if (data) setSkills(data);
    setIsLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.id) {
      await supabase.from("skills").update(formData).eq("id", formData.id);
    } else {
      await supabase.from("skills").insert([formData]);
    }
    fetchSkills();
    setIsModalOpen(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Hapus skill ini?")) {
      await supabase.from("skills").delete().eq("id", id);
      fetchSkills();
    }
  };

  if (isLoading) return <div className="flex justify-center h-64 items-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button onClick={() => { setFormData({ category: "Hard Skill", name: "" }); setIsModalOpen(true); }} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <Plus size={18} /> Tambah Skill
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {skills.map((skill) => (
          <div key={skill.id} className="flex justify-between items-center p-4 bg-slate-50 border border-slate-100 rounded-xl">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{skill.category}</span>
              <p className="font-bold text-slate-800">{skill.name}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => { setFormData(skill); setIsModalOpen(true); }} className="p-2 text-slate-400 hover:text-blue-600"><Pencil size={18}/></button>
              <button onClick={() => handleDelete(skill.id)} className="p-2 text-slate-400 hover:text-red-600"><Trash2 size={18}/></button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
            <h3 className="text-xl font-bold mb-4">{formData.id ? "Edit" : "Tambah"} Skill</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <select value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} className="w-full px-4 py-2 border rounded-lg bg-white">
                <option value="Hard Skill">Hard Skill</option>
                <option value="Soft Skill">Soft Skill</option>
                <option value="Tools & Software">Tools & Software</option>
              </select>
              <input type="text" required value={formData.name || ""} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border rounded-lg" placeholder="Nama Skill (ex: Microsoft Excel)" />
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600">Batal</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Simpan</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}