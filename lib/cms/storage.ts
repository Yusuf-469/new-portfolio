import { PortfolioData, Project, Skill, MyWork, CMS_STORAGE_KEY, DEFAULT_PORTFOLIO_DATA } from "./types";

export function getPortfolioData(): PortfolioData {
  if (typeof window === "undefined") return DEFAULT_PORTFOLIO_DATA;
  
  try {
    const stored = localStorage.getItem(CMS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // Initialize with default data
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(DEFAULT_PORTFOLIO_DATA));
    return DEFAULT_PORTFOLIO_DATA;
  } catch (error) {
    console.error("Error loading portfolio data:", error);
    return DEFAULT_PORTFOLIO_DATA;
  }
}

export function savePortfolioData(data: PortfolioData): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error("Error saving portfolio data:", error);
  }
}

export function addProject(project: Omit<Project, "id" | "createdAt">): Project {
  const data = getPortfolioData();
  const newProject: Project = {
    ...project,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  data.projects.push(newProject);
  savePortfolioData(data);
  return newProject;
}

export function updateProject(id: string, updates: Partial<Project>): Project | null {
  const data = getPortfolioData();
  const index = data.projects.findIndex((p) => p.id === id);
  if (index === -1) return null;
  
  data.projects[index] = { ...data.projects[index], ...updates };
  savePortfolioData(data);
  return data.projects[index];
}

export function deleteProject(id: string): boolean {
  const data = getPortfolioData();
  const index = data.projects.findIndex((p) => p.id === id);
  if (index === -1) return false;
  
  data.projects.splice(index, 1);
  savePortfolioData(data);
  return true;
}

export function addSkill(skill: Omit<Skill, "id" | "createdAt">): Skill {
  const data = getPortfolioData();
  const newSkill: Skill = {
    ...skill,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  data.skills.push(newSkill);
  savePortfolioData(data);
  return newSkill;
}

export function updateSkill(id: string, updates: Partial<Skill>): Skill | null {
  const data = getPortfolioData();
  const index = data.skills.findIndex((s) => s.id === id);
  if (index === -1) return null;
  
  data.skills[index] = { ...data.skills[index], ...updates };
  savePortfolioData(data);
  return data.skills[index];
}

export function deleteSkill(id: string): boolean {
  const data = getPortfolioData();
  const index = data.skills.findIndex((s) => s.id === id);
  if (index === -1) return false;
  
  data.skills.splice(index, 1);
  savePortfolioData(data);
  return true;
}

export function updateAbout(updates: Partial<PortfolioData["about"]>): void {
  const data = getPortfolioData();
  data.about = { ...data.about, ...updates };
  savePortfolioData(data);
}

export function updateHero(updates: Partial<PortfolioData["hero"]>): void {
  const data = getPortfolioData();
  data.hero = { ...data.hero, ...updates };
  savePortfolioData(data);
}

export function updateContact(updates: Partial<PortfolioData["contact"]>): void {
  const data = getPortfolioData();
  data.contact = { ...data.contact, ...updates };
  savePortfolioData(data);
}

export function addMyWork(work: Omit<MyWork, "id" | "createdAt">): MyWork {
  const data = getPortfolioData();
  const newWork: MyWork = {
    ...work,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  data.myWorks.push(newWork);
  savePortfolioData(data);
  return newWork;
}

export function updateMyWork(id: string, updates: Partial<MyWork>): MyWork | null {
  const data = getPortfolioData();
  const index = data.myWorks.findIndex((w) => w.id === id);
  if (index === -1) return null;
  
  data.myWorks[index] = { ...data.myWorks[index], ...updates };
  savePortfolioData(data);
  return data.myWorks[index];
}

export function deleteMyWork(id: string): boolean {
  const data = getPortfolioData();
  const index = data.myWorks.findIndex((w) => w.id === id);
  if (index === -1) return false;
  
  data.myWorks.splice(index, 1);
  savePortfolioData(data);
  return true;
}

export function resetPortfolioData(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(CMS_STORAGE_KEY, JSON.stringify(DEFAULT_PORTFOLIO_DATA));
}
