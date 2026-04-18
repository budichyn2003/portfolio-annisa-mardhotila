import { createClient } from "@/lib/supabase";
import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { EducationSection } from "@/components/sections/education-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { ContactForm } from "@/components/sections/contact-form";
import { Footer } from "@/components/layout/footer";

// Fungsi untuk ambil data dari Supabase
async function getData() {
  const supabase = createClient();
  
  const [
    { data: experiences },
    { data: educations },
    { data: skills },
    { data: projects },
    { data: certifications }
  ] = await Promise.all([
    supabase.from("experience").select("*").order("order_num", { ascending: true }),
    supabase.from("education").select("*").order("order_num", { ascending: true }),
    supabase.from("skills").select("*").order("order_num", { ascending: true }),
    supabase.from("projects").select("*").order("order_num", { ascending: true }),
    supabase.from("certifications").select("*").order("order_num", { ascending: true }),
  ]);

  return { experiences, educations, skills, projects, certifications };
}

export default async function Home() {
  const data = await getData();

  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      {/* Kirim data dari Supabase ke dalam komponen sebagai props */}
      <ExperienceSection data={data.experiences || []} />
      {/* Kirim DUA data sekaligus ke EducationSection */}
      <EducationSection 
        educationData={data.educations || []} 
        certificationData={data.certifications || []} 
      />
      <SkillsSection data={data.skills || []} />
      <ProjectsSection data={data.projects || []} />
      <ContactForm />
      <Footer />
    </main>
  );
}