export type Profile = { id: string; name: string; title: string; bio: string; email: string; phone: string; location: string; profile_image_url: string; resume_url: string; };
export type Experience = { id: string; company: string; position: string; description: string; period: string; order_num: number; };
export type Education = { id: string; university: string; degree: string; gpa: string; period: string; };
export type Project = { id: string; title: string; description: string; image_url: string; technologies: string[]; project_url: string; };
export type Skill = { id: string; category: string; name: string; };