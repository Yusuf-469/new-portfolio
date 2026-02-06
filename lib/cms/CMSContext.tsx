"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { PortfolioData, Project, Skill, MyWork, DEFAULT_PORTFOLIO_DATA } from "../cms/types";
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
  addMyWork as storageAddMyWork,
  updateMyWork as storageUpdateMyWork,
  deleteMyWork as storageDeleteMyWork,
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
  addMyWork: (work: Omit<MyWork, "id" | "createdAt">) => void;
  updateMyWork: (id: string, updates: Partial<MyWork>) => void;
  deleteMyWork: (id: string) => void;
  refreshData: () => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export function CMSProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PortfolioData>(DEFAULT_PORTFOLIO_DATA);
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setData(getPortfolioData());
    setIsLoading(false);
  }, []);

  const refreshData = useCallback(() => {
    setData(getPortfolioData());
  }, []);

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

  const addMyWork = (work: Omit<MyWork, "id" | "createdAt">) => {
    storageAddMyWork(work);
    refreshData();
  };

  const updateMyWork = (id: string, updates: Partial<MyWork>) => {
    storageUpdateMyWork(id, updates);
    refreshData();
  };

  const deleteMyWork = (id: string) => {
    storageDeleteMyWork(id);
    refreshData();
  };

  // Don't render provider content until mounted on client
  if (!isMounted) {
    return (
      <CMSContext.Provider 
        value={{ 
          data: DEFAULT_PORTFOLIO_DATA, 
          isLoading: true,
          addProject: () => {},
          updateProject: () => {},
          deleteProject: () => {},
          addSkill: () => {},
          updateSkill: () => {},
          deleteSkill: () => {},
          updateAbout: () => {},
          addMyWork: () => {},
          updateMyWork: () => {},
          deleteMyWork: () => {},
          refreshData: () => {},
        }}
      >
        {children}
      </CMSContext.Provider>
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
        addMyWork,
        updateMyWork,
        deleteMyWork,
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
