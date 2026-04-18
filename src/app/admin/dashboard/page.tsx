// src/app/admin/dashboard/page.tsx
"use client";

import { ExperienceManager } from "@/components/admin/experience-manager";
import { EducationManager } from "@/components/admin/education-manager";
import { SkillsManager } from "@/components/admin/skills-manager";
import { ProjectsManager } from "@/components/admin/projects-manager";
import { CertificationsManager } from "@/components/admin/certifications-manager";
import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { 
  LogOut, 
  Briefcase, 
  GraduationCap, 
  FolderGit2, 
  Award, 
  Code,
  LayoutDashboard
} from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();
  const [activeTab, setActiveTab] = useState("experience");

  // Fungsi Logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  // Menu navigasi sidebar
  const menuItems = [
    { id: "experience", label: "Experience", icon: <Briefcase size={20} /> },
    { id: "education", label: "Education", icon: <GraduationCap size={20} /> },
    { id: "projects", label: "Projects", icon: <FolderGit2 size={20} /> },
    { id: "skills", label: "Skills", icon: <Code size={20} /> },
    { id: "certifications", label: "Certifications", icon: <Award size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full z-10">
        <div className="h-20 flex items-center px-8 border-b border-slate-100">
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xl">
            <LayoutDashboard size={24} />
            <span>Admin Panel</span>
          </div>
        </div>

        <div className="flex-1 py-6 px-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${
                activeTab === item.id 
                  ? "bg-blue-50 text-blue-700" 
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        <div className="p-4 border-t border-slate-100">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 font-medium hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="ml-64 flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 capitalize">
            Manage {activeTab}
          </h1>
          <p className="text-slate-500 mt-1">
            Tambah, edit, atau hapus data {activeTab} yang akan tampil di halaman publik.
          </p>
        </header>

        {/* Konten Tab Aktif akan dirender di sini */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 min-h-[500px]">
          {activeTab === "experience" && <ExperienceManager />}
          {activeTab === "education" && <EducationManager />}
          {activeTab === "skills" && <SkillsManager />}
          {activeTab === "projects" && <ProjectsManager />}
          {activeTab === "certifications" && <CertificationsManager />}
          
          {(activeTab === "projects" || activeTab === "certifications") && (
            <div className="flex items-center justify-center h-full min-h-[400px]">
              <p className="text-slate-400 font-medium animate-pulse">
                Modul {activeTab} sedang dalam tahap pengembangan...
              </p>
            </div>
          )}
        </div>
      </main>

    </div>
  );
}