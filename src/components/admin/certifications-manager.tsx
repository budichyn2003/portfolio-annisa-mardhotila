// src/components/admin/certifications-manager.tsx
"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import { Plus, Pencil, Trash2, Loader2, X } from "lucide-react";

export function CertificationsManager() {
  const supabase = createClient();
  const [certs, setCerts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState<any>({ title: "", issuer: "", credential_url: "" });

  useEffect(() => { fetchCerts(); }, []);

  const fetchCerts = async () => {
    setIsLoading(true);
    const { data } = await supabase.from("certifications").select("*").order("id");
    if (data) setCerts(data);
    setIsLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    if (formData.id) {
      await supabase.from("certifications").update(formData).eq("id", formData.id);
    } else {
      await supabase.from("certifications").insert([formData]);
    }
    fetchCerts();
    setIsModalOpen(false);
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Hapus sertifikasi ini?")) {
      await supabase.from("certifications").delete().eq("id", id);
      fetchCerts();
    }
  };

  if (isLoading) return <div className="flex justify-center h-64 items-center"><Loader2 className="animate-spin text-blue-600" size={32} /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <button onClick={() => { setFormData({ title: "", issuer: "", credential_url: "" }); setIsModalOpen(true); }} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700">
          <Plus size={18} /> Tambah Sertifikasi
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-sm text-slate-600">
              <th className="p-4 font-medium">Nama Sertifikasi</th>
              <th className="p-4 font-medium">Penerbit</th>
              <th className="p-4 font-medium text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {certs.length === 0 ? <tr><td colSpan={3} className="p-8 text-center text-slate-500">Belum ada data.</td></tr> : certs.map((cert) => (
              <tr key={cert.id} className="border-b border-slate-100">
                <td className="p-4 font-bold text-slate-800">{cert.title}</td>
                <td className="p-4 text-slate-600">{cert.issuer}</td>
                <td className="p-4 flex justify-end gap-2">
                  <button onClick={() => { setFormData(cert); setIsModalOpen(true); }} className="p-2 text-slate-400 hover:text-blue-600"><Pencil size={18}/></button>
                  <button onClick={() => handleDelete(cert.id)} className="p-2 text-slate-400 hover:text-red-600"><Trash2 size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <h3 className="text-xl font-bold mb-4">{formData.id ? "Edit" : "Tambah"} Sertifikasi</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <input type="text" required value={formData.title || ""} onChange={(e) => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 border rounded-lg" placeholder="Nama Sertifikat (ex: AWS Cloud Practitioner)" />
              <input type="text" required value={formData.issuer || ""} onChange={(e) => setFormData({...formData, issuer: e.target.value})} className="w-full px-4 py-2 border rounded-lg" placeholder="Penerbit (ex: Amazon Web Services)" />
              <input type="text" value={formData.credential_url || ""} onChange={(e) => setFormData({...formData, credential_url: e.target.value})} className="w-full px-4 py-2 border rounded-lg" placeholder="URL Kredensial / Link Bukti (Opsional)" />
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