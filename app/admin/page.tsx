"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../lib/cms/AuthContext";
import { useCMS } from "../../lib/cms/CMSContext";
import { useRouter } from "next/navigation";
import { 
  Plus, 
  Trash2, 
  Edit2, 
  LogOut, 
  Briefcase, 
  Award,
} from "lucide-react";
import { Project, Skill } from "../../lib/cms/types";

type Tab = "projects" | "skills" | "about";

// Force dynamic rendering to avoid SSR issues with localStorage
export const dynamic = 'force-dynamic';

export default function AdminPage() {
  const { isAuthenticated, logout, isLoading: authLoading } = useAuth();
  const { data, addProject, updateProject, deleteProject, addSkill, updateSkill, deleteSkill, updateAbout } = useCMS();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("projects");
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  // Form states
  const [projectForm, setProjectForm] = useState({
    name: "",
    category: "",
    description: "",
    color: "#00D4FF",
    bgGradient: "from-[#00D4FF]/20 to-transparent",
  });

  const [skillForm, setSkillForm] = useState({
    name: "",
    category: "Creative",
  });

  const [aboutForm, setAboutForm] = useState({
    bio: data.about.bio,
    location: data.about.location,
    yearsExperience: data.about.yearsExperience,
    projectsCompleted: data.about.projectsCompleted,
    web3Brands: data.about.web3Brands,
  });

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    router.push("/login");
    return null;
  }

  const handleAddProject = () => {
    if (projectForm.name && projectForm.category && projectForm.description) {
      addProject(projectForm);
      setProjectForm({
        name: "",
        category: "",
        description: "",
        color: "#00D4FF",
        bgGradient: "from-[#00D4FF]/20 to-transparent",
      });
      setIsAddingProject(false);
    }
  };

  const handleUpdateProject = () => {
    if (editingProject) {
      updateProject(editingProject.id, editingProject);
      setEditingProject(null);
    }
  };

  const handleAddSkill = () => {
    if (skillForm.name) {
      addSkill(skillForm);
      setSkillForm({ name: "", category: "Creative" });
      setIsAddingSkill(false);
    }
  };

  const handleUpdateSkill = () => {
    if (editingSkill) {
      updateSkill(editingSkill.id, editingSkill);
      setEditingSkill(null);
    }
  };

  const handleUpdateAbout = () => {
    updateAbout(aboutForm);
  };

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A]">
      {/* Header */}
      <header className="bg-[#1A1A1A] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="display-text text-2xl font-bold text-white">CMS Dashboard</h1>
            <span className="text-xs text-gray-500 px-2 py-1 bg-white/10 rounded">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
              View Site
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
              activeTab === "projects"
                ? "bg-[#00D4FF] text-black"
                : "bg-[#1A1A1A] text-white hover:bg-[#252525]"
            }`}
          >
            <Briefcase size={20} />
            Projects
          </button>
          <button
            onClick={() => setActiveTab("skills")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
              activeTab === "skills"
                ? "bg-[#00D4FF] text-black"
                : "bg-[#1A1A1A] text-white hover:bg-[#252525]"
            }`}
          >
            <Award size={20} />
            Skills
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
              activeTab === "about"
                ? "bg-[#00D4FF] text-black"
                : "bg-[#1A1A1A] text-white hover:bg-[#252525]"
            }`}
          >
            <Edit2 size={20} />
            About
          </button>
        </div>

        {/* Projects Tab */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl text-white font-semibold">Manage Projects</h2>
              <button
                onClick={() => setIsAddingProject(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#00D4FF] text-black rounded-lg hover:bg-[#00B8E6] transition-colors"
              >
                <Plus size={18} />
                Add Project
              </button>
            </div>

            {/* Add Project Form */}
            {isAddingProject && (
              <div className="bg-[#1A1A1A] rounded-xl p-6 border border-white/10">
                <h3 className="text-white font-semibold mb-4">Add New Project</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Project Name"
                    value={projectForm.name}
                    onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                    className="bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF]"
                  />
                  <input
                    type="text"
                    placeholder="Category"
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF]"
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    className="col-span-2 bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF]"
                  />
                  <input
                    type="color"
                    value={projectForm.color}
                    onChange={(e) => setProjectForm({ ...projectForm, color: e.target.value })}
                    className="bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white"
                  />
                  <select
                    value={projectForm.bgGradient}
                    onChange={(e) => setProjectForm({ ...projectForm, bgGradient: e.target.value })}
                    className="bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00D4FF]"
                  >
                    <option value="from-[#00D4FF]/20 to-transparent">Cyan</option>
                    <option value="from-[#7928CA]/20 to-transparent">Purple</option>
                    <option value="from-[#FF0080]/20 to-transparent">Pink</option>
                    <option value="from-[#FFD700]/20 to-transparent">Gold</option>
                    <option value="from-[#22C55E]/20 to-transparent">Green</option>
                    <option value="from-[#EF4444]/20 to-transparent">Red</option>
                  </select>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={handleAddProject}
                    className="px-6 py-2 bg-[#00D4FF] text-black rounded-lg hover:bg-[#00B8E6] transition-colors"
                  >
                    Add Project
                  </button>
                  <button
                    onClick={() => setIsAddingProject(false)}
                    className="px-6 py-2 bg-[#1A1A1A] text-white rounded-lg hover:bg-[#252525] transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Projects List */}
            <div className="space-y-4">
              {data.projects.map((project) => (
                <div key={project.id} className="bg-[#1A1A1A] rounded-xl p-6 border border-white/10">
                  {editingProject?.id === project.id ? (
                    <div className="space-y-4">
                      <h3 className="text-white font-semibold">Editing Project</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          value={editingProject.name}
                          onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                          className="bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white"
                        />
                        <input
                          type="text"
                          value={editingProject.category}
                          onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                          className="bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white"
                        />
                        <input
                          type="text"
                          value={editingProject.description}
                          onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                          className="col-span-2 bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white"
                        />
                        <input
                          type="color"
                          value={editingProject.color}
                          onChange={(e) => setEditingProject({ ...editingProject, color: e.target.value })}
                          className="bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white"
                        />
                      </div>
                      <div className="flex gap-4">
                        <button
                          onClick={handleUpdateProject}
                          className="px-6 py-2 bg-[#00D4FF] text-black rounded-lg"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingProject(null)}
                          className="px-6 py-2 bg-[#1A1A1A] text-white rounded-lg"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className="w-12 h-12 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${project.color}20` }}
                        >
                          <span className="text-lg font-bold" style={{ color: project.color }}>
                            {project.name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">{project.name}</h4>
                          <p className="text-sm text-gray-400">{project.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => setEditingProject(project)}
                          className="p-2 text-gray-400 hover:text-white transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => deleteProject(project.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === "skills" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl text-white font-semibold">Manage Skills</h2>
              <button
                onClick={() => setIsAddingSkill(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#00D4FF] text-black rounded-lg hover:bg-[#00B8E6] transition-colors"
              >
                <Plus size={18} />
                Add Skill
              </button>
            </div>

            {/* Add Skill Form */}
            {isAddingSkill && (
              <div className="bg-[#1A1A1A] rounded-xl p-6 border border-white/10">
                <h3 className="text-white font-semibold mb-4">Add New Skill</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Skill Name"
                    value={skillForm.name}
                    onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                    className="bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF]"
                  />
                  <select
                    value={skillForm.category}
                    onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                    className="bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00D4FF]"
                  >
                    <option value="Creative">Creative</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance</option>
                    <option value="Production">Production</option>
                    <option value="Technology">Technology</option>
                  </select>
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={handleAddSkill}
                    className="px-6 py-2 bg-[#00D4FF] text-black rounded-lg hover:bg-[#00B8E6] transition-colors"
                  >
                    Add Skill
                  </button>
                  <button
                    onClick={() => setIsAddingSkill(false)}
                    className="px-6 py-2 bg-[#1A1A1A] text-white rounded-lg hover:bg-[#252525] transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Skills List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.skills.map((skill) => (
                <div key={skill.id} className="bg-[#1A1A1A] rounded-xl p-6 border border-white/10">
                  {editingSkill?.id === skill.id ? (
                    <div className="space-y-4">
                      <h3 className="text-white font-semibold">Editing Skill</h3>
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editingSkill.name}
                          onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                          className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white"
                        />
                        <select
                          value={editingSkill.category}
                          onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                          className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white"
                        >
                          <option value="Creative">Creative</option>
                          <option value="Marketing">Marketing</option>
                          <option value="Finance">Finance</option>
                          <option value="Production">Production</option>
                          <option value="Technology">Technology</option>
                        </select>
                      </div>
                      <div className="flex gap-4">
                        <button
                          onClick={handleUpdateSkill}
                          className="px-4 py-2 bg-[#00D4FF] text-black rounded-lg text-sm"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingSkill(null)}
                          className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-semibold">{skill.name}</h4>
                        <span className="text-xs text-gray-500">{skill.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditingSkill(skill)}
                          className="p-2 text-gray-400 hover:text-white transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button
                          onClick={() => deleteSkill(skill.id)}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* About Tab */}
        {activeTab === "about" && (
          <div className="space-y-6">
            <h2 className="text-xl text-white font-semibold">Manage About Section</h2>
            <div className="bg-[#1A1A1A] rounded-xl p-6 border border-white/10 space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Bio</label>
                <textarea
                  value={aboutForm.bio}
                  onChange={(e) => setAboutForm({ ...aboutForm, bio: e.target.value })}
                  rows={4}
                  className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Location</label>
                  <input
                    type="text"
                    value={aboutForm.location}
                    onChange={(e) => setAboutForm({ ...aboutForm, location: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Years Experience</label>
                  <input
                    type="text"
                    value={aboutForm.yearsExperience}
                    onChange={(e) => setAboutForm({ ...aboutForm, yearsExperience: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Projects Completed</label>
                  <input
                    type="text"
                    value={aboutForm.projectsCompleted}
                    onChange={(e) => setAboutForm({ ...aboutForm, projectsCompleted: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Web3 Brands</label>
                  <input
                    type="text"
                    value={aboutForm.web3Brands}
                    onChange={(e) => setAboutForm({ ...aboutForm, web3Brands: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF]"
                  />
                </div>
              </div>
              <button
                onClick={handleUpdateAbout}
                className="px-6 py-2 bg-[#00D4FF] text-black rounded-lg hover:bg-[#00B8E6] transition-colors"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
