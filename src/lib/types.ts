import type { LucideIcon } from 'lucide-react';

export type SectionKey =
  | 'about'
  | 'projects'
  | 'experience'
  | 'education'
  | 'skills'
  | 'awards';

export interface ProfileData {
  name: string;
  roles: string[];
  objective: string;
  location: string;
  email: string;
  avatar: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  link: string;
  icon: LucideIcon;
}

export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  date: string;
  location: string;
  desc: string;
}

export interface EducationItem {
  id: number;
  degree: string;
  school: string;
  date: string;
  details: string;
}

export interface Project {
  id: string;
  title: string;
  role: string;
  stack: string[];
  desc: string;
  learnMoreLink?: string;
  demoLink?: string;
  images: string[];
}

export interface SkillCategory {
  name: string;
  items: string[];
  icon: LucideIcon;
}

export interface SkillsData {
  categories: SkillCategory[];
}

export interface NewsItem {
  id: number;
  category: string;
  date: string;
  title: string;
  description: string;
  ctaLink?: string;
  ctaText?: string;
}

export interface PortfolioData {
  profile: ProfileData;
  socials: SocialLink[];
  experience: ExperienceItem[];
  education: EducationItem[];
  projects: Project[];
  skills: SkillsData;
  awards: string[];
  certificates: string[];
  news: NewsItem[];
}

