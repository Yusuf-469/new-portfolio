"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { PortfolioData, Project, Skill } from "../cms/types";
import { 
  getPortfolioData, 
  savePortfolioData, 
  addProject as storageAddProject,
  updateProject as storageUpdateProject,
  deleteProject as storageDeleteProject,
  addSkill as storageAddSkill,
  updateSkill as storageUpdateSkill,
  deleteSkill as storageDeleteSkill,
  updateAbout as storageUpdateAbout,
} from "../cms/storage";

interface CMSContextType {
  data: PortfolioData;
  isLoading: boolean;
  addProject: (project: Omit<Project, "id" | "createdAt">) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  addSkill: (skill: Omit<Skill, "id" | "createdAt">) => void;
  updateSkill: (id: string, updates: Partial<Skill>) => void;
  deleteSkill: (id: string) => void;
  updateAbout: (updates: Partial<PortfolioData["about"]>) => void;
  refreshData: () => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export function CMSProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshData = useCallback(() => {
    setData(getPortfolioData());
  }, []);

  useEffect(() => {
    refreshData();
    setIsLoading(false);
  }, [refreshData]);

  const addProject = (project: Omit<Project, "id" | "createdAt">) => {
    storageAddProject(project);
    refreshData();
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    storageUpdateProject(id, updates);
    refreshData();
  };

  const deleteProject = (id: string) => {
    storageDeleteProject(id);
    refreshData();
  };

  const addSkill = (skill: Omit<Skill, "id" | "createdAt">) => {
    storageAddSkill(skill);
    refreshData();
  };

  const updateSkill = (id: string, updates: Partial<Skill>) => {
    storageUpdateSkill(id, updates);
    refreshData();
  };

  const deleteSkill = (id: string) => {
    storageDeleteSkill(id);
    refreshData();
  };

  const updateAbout = (updates: Partial<PortfolioData["about"]>) => {
    storageUpdateAbout(updates);
    refreshData();
  };

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <CMSContext.Provider 
      value={{ 
        data, 
        isLoading, 
        addProject, 
        updateProject, 
        deleteProject,
        addSkill,
        updateSkill,
        deleteSkill,
        updateAbout,
        refreshData,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (context === undefined) {
    throw new Error("useCMS must be used within a CMSProvider");
  }
  return context;
}
