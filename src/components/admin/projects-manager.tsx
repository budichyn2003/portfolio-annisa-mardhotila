// src/components/admin/projects-manager.tsx
"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { Plus, Pencil, Trash2, Loader2, Upload, Image as ImageIcon } from "lucide-react";

export function ProjectsManager() {
  const supabase = createClient();
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  
  const [formData, setFormData] = useState<any>({ title: "", description: "", image_url: "", technologies: "", project_url: "" });

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    const { data } = await supabase.from("projects").select("*").order("id");
    if (data) setProjects(data);
    setIsLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    let finalImageUrl = formData.image_url;

    // 1. Jika ada file gambar baru yang dipilih, upload ke Supabase Storage dulu
    if (uploadFile) {
      const fileExt = uploadFile.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `projects/${fileName}`;

      const { error: uploadError } = await supabase.storage.from('portfolio-assets').upload(filePath, uploadFile);
      
      if (!uploadError) {
        // Ambil URL public gambarnya
        const { data } = supabase.storage.from('portfolio-assets').getPublicUrl(filePath);
        finalImageUrl = data.publicUrl;
      } else {
        alert("Gagal upload gambar!");
      }
    }

    // 2. Siapkan data untuk database (pecah text technologies jadi array)
    const payload = {
      title: formData.title,
      description: formData.description,
      image_url: finalImageUrl,
      project_url: formData.project_url,
      technologies: formData.technologies.split(",").map((t: string) => t.trim()).filter((t: string) => t !== "")
    };

    // 3. Simpan ke database
    if (formData.id) {
      await supabase.from("projects").update(payload).eq("id", formData.id);
    } else {
      await supabase.from("projects").insert([payload]);
    }

    fetchProjects();
    setIsModalOpen(false);
    setIsSaving(false);
    setUploadFile(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Yakin hapus project ini?")) {
      await supabase.from("projects").delete().eq("id", id);
      fetchProjects();
    }
  };

  if (isLoading) return <div className="flex justify-center h-64 items-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button onClick={() => { 
            setFormData({ title: "", description: "", image_url: "", technologies: "", project_url: "" }); 
            setUploadFile(null);
            setIsModalOpen(true); 
          }} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <Plus size={18} /> Tambah Project
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((proj) => (
          <div key={proj.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            {proj.image_url ? (
              <img src={proj.image_url} alt={proj.title} className="w-full h-48 object-cover border-b border-slate-100" />
            ) : (
              <div className="w-full h-48 bg-slate-100 flex items-center justify-center text-slate-400 border-b border-slate-100"><ImageIcon size={40}/></div>
            )}
            <div className="p-5">
              <h4 className="font-bold text-lg text-slate-800">{proj.title}</h4>
              <p className="text-sm text-slate-500 line-clamp-2 mt-2">{proj.description}</p>
              <div className="flex justify-end gap-2 mt-4">
                <button onClick={() => { 
                  setFormData({...proj, technologies: proj.technologies ? proj.technologies.join(", ") : ""}); 
                  setIsModalOpen(true); 
                }} className="p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg"><Pencil size={18}/></button>
                <button onClick={() => handleDelete(proj.id)} className="p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg"><Trash2 size={18}/></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6">
            <h3 className="text-xl font-bold mb-4">{formData.id ? "Edit" : "Tambah"} Project</h3>
            <form onSubmit={handleSave} className="space-y-4">
              
              {/* Gambar Project */}
              <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center">
                <label className="cursor-pointer flex flex-col items-center justify-center gap-2">
                  <Upload className="text-slate-400" size={24} />
                  <span className="text-sm text-slate-600 font-medium">
                    {uploadFile ? uploadFile.name : "Klik untuk upload gambar baru"}
                  </span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => setUploadFile(e.target.files ? e.target.files[0] : null)} />
                </label>
              </div>

              <input type="text" required value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border rounded-lg" placeholder="Judul Project" />
              <textarea required rows={3} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2 border rounded-lg" placeholder="Deskripsi detail..." />
              <input type="text" value={formData.technologies} onChange={(e) => setFormData({...formData, technologies: e.target.value})} className="w-full px-4 py-2 border rounded-lg" placeholder="Tools (Pisahkan dengan koma: Excel, EPM, Python)" />
              <input type="text" value={formData.project_url} onChange={(e) => setFormData({...formData, project_url: e.target.value})} className="w-full px-4 py-2 border rounded-lg" placeholder="Link project (jika ada)" />
              
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600">Batal</button>
                <button type="submit" disabled={isSaving} className="px-4 py-2 bg-blue-600 text-white rounded-lg">{isSaving ? "Menyimpan & Upload..." : "Simpan Project"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}