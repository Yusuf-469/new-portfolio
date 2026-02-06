"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../../lib/cms/AuthContext";
import { useCMS } from "../../lib/cms/CMSContext";
import { 
  Plus, 
  Trash2, 
  Edit2, 
  LogOut, 
  Briefcase, 
  Award,
  X,
  Image as ImageIcon,
  Check,
  ArrowLeft,
  Lock,
  User,
  Palette,
} from "lucide-react";
import { Project, Skill, MyWork } from "../../lib/cms/types";

type Tab = "projects" | "skills" | "about" | "myworks";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const { isAuthenticated, login, logout, isLoading: authLoading } = useAuth();
  const { data, addProject, updateProject, deleteProject, addSkill, updateSkill, deleteSkill, updateAbout, addMyWork, updateMyWork, deleteMyWork } = useCMS();
  const [activeTab, setActiveTab] = useState<Tab>("projects");
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [isAddingMyWork, setIsAddingMyWork] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const [editingMyWork, setEditingMyWork] = useState<MyWork | null>(null);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");

  // Form states
  const [projectForm, setProjectForm] = useState({
    name: "",
    category: "",
    description: "",
    imageUrl: "",
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

  const [myWorkForm, setMyWorkForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    type: "framing" as "framing" | "moving",
  });

  if (!isOpen) {
    return null;
  }

  const handleLogin = () => {
    if (login(loginForm.username, loginForm.password)) {
      setLoginForm({ username: "", password: "" });
      setLoginError("");
    } else {
      setLoginError("Invalid credentials");
    }
  };

  const handleAddProject = () => {
    if (projectForm.name && projectForm.category && projectForm.description) {
      addProject({
        name: projectForm.name,
        category: projectForm.category,
        description: projectForm.description,
        imageUrl: projectForm.imageUrl || undefined,
        color: projectForm.color,
        bgGradient: projectForm.bgGradient,
      });
      setProjectForm({
        name: "",
        category: "",
        description: "",
        imageUrl: "",
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

  const handleAddMyWork = () => {
    if (myWorkForm.title && myWorkForm.imageUrl) {
      addMyWork({
        title: myWorkForm.title,
        description: myWorkForm.description,
        imageUrl: myWorkForm.imageUrl,
        type: myWorkForm.type,
      });
      setMyWorkForm({
        title: "",
        description: "",
        imageUrl: "",
        type: "framing",
      });
      setIsAddingMyWork(false);
    }
  };

  const handleUpdateMyWork = () => {
    if (editingMyWork) {
      updateMyWork(editingMyWork.id, editingMyWork);
      setEditingMyWork(null);
    }
  };

  const handleLogout = () => {
    logout();
  };

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 z-[100]">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Login Panel */}
        <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-[#0A0A0A] border-l border-white/10 overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <h1 className="display-text text-2xl font-bold text-white">CMS</h1>
              <span className="text-xs text-[#00D4FF] px-2 py-1 bg-[#00D4FF]/10 rounded">Admin</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Login Form */}
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="w-full max-w-sm space-y-6">
              <div className="text-center">
                <Lock className="mx-auto mb-4 text-[#00D4FF]" size={48} />
                <h2 className="text-xl text-white font-semibold">Admin Access</h2>
                <p className="text-sm text-gray-500 mt-2">Enter credentials to manage portfolio</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Username</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                      type="text"
                      value={loginForm.username}
                      onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                      className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF]"
                      placeholder="Username"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-400 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                    <input
                      type="password"
                      value={loginForm.password}
                      onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                      className="w-full bg-[#1A1A1A] border border-white/10 rounded-lg px-12 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF]"
                      placeholder="Password"
                      onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                    />
                  </div>
                </div>

                {loginError && (
                  <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-sm text-red-500 text-center">{loginError}</p>
                  </div>
                )}

                <button
                  onClick={handleLogin}
                  className="w-full bg-[#00D4FF] text-black font-medium py-3 rounded-lg hover:bg-[#00B8E6] transition-colors"
                >
                  Sign In
                </button>
              </div>

              <p className="text-xs text-gray-500 text-center">
                Demo: saklain / admin123
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Slide-in Panel */}
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-2xl bg-[#0A0A0A] border-l border-white/10 overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <h1 className="display-text text-2xl font-bold text-white">CMS</h1>
            <span className="text-xs text-[#00D4FF] px-2 py-1 bg-[#00D4FF]/10 rounded">Admin</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
              title="Back to Profile"
            >
              <ArrowLeft size={20} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10">
          <button
            onClick={() => setActiveTab("projects")}
            className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-colors ${
              activeTab === "projects"
                ? "text-[#00D4FF] border-b-2 border-[#00D4FF]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Briefcase size={18} />
            Projects
          </button>
          <button
            onClick={() => setActiveTab("skills")}
            className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-colors ${
              activeTab === "skills"
                ? "text-[#00D4FF] border-b-2 border-[#00D4FF]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Award size={18} />
            Skills
          </button>
          <button
            onClick={() => setActiveTab("myworks")}
            className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-colors ${
              activeTab === "myworks"
                ? "text-[#00D4FF] border-b-2 border-[#00D4FF]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Palette size={18} />
            My Works
          </button>
          <button
            onClick={() => setActiveTab("about")}
            className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-medium transition-colors ${
              activeTab === "about"
                ? "text-[#00D4FF] border-b-2 border-[#00D4FF]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Edit2 size={18} />
            About
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Projects Tab */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg text-white font-semibold">Projects</h2>
                <button
                  onClick={() => setIsAddingProject(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#00D4FF] text-black rounded-lg hover:bg-[#00B8E6] transition-colors text-sm"
                >
                  <Plus size={16} />
                  Add
                </button>
              </div>

              {/* Add Project Form */}
              {isAddingProject && (
                <div className="bg-[#1A1A1A] rounded-xl p-6 border border-white/10 space-y-4">
                  <h3 className="text-white font-semibold">New Project</h3>
                  <input
                    type="text"
                    placeholder="Project Name"
                    value={projectForm.name}
                    onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF]"
                  />
                  <input
                    type="text"
                    placeholder="Category"
                    value={projectForm.category}
                    onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF]"
                  />
                  <textarea
                    placeholder="Description"
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    rows={3}
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF]"
                  />
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
                      <ImageIcon size={16} />
                      Image URL (optional)
                    </label>
                    <input
                      type="text"
                      placeholder="https://..."
                      value={projectForm.imageUrl}
                      onChange={(e) => setProjectForm({ ...projectForm, imageUrl: e.target.value })}
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF]"
                    />
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={handleAddProject}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#00D4FF] text-black rounded-lg hover:bg-[#00B8E6] transition-colors"
                    >
                      <Check size={16} />
                      Save
                    </button>
                    <button
                      onClick={() => setIsAddingProject(false)}
                      className="flex-1 px-4 py-2 bg-[#1A1A1A] text-white rounded-lg hover:bg-[#252525] transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Projects List */}
              <div className="space-y-3">
                {data.projects.map((project) => (
                  <div key={project.id} className="bg-[#1A1A1A] rounded-xl p-4 border border-white/10">
                    {editingProject?.id === project.id ? (
                      <div className="space-y-4">
                        <h3 className="text-white font-semibold">Edit Project</h3>
                        <input
                          type="text"
                          value={editingProject.name}
                          onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                          className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white"
                        />
                        <input
                          type="text"
                          value={editingProject.category}
                          onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                          className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white"
                        />
                        <textarea
                          value={editingProject.description}
                          onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                          rows={3}
                          className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white"
                        />
                        <div className="flex gap-4">
                          <button
                            onClick={handleUpdateProject}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#00D4FF] text-black rounded-lg"
                          >
                            <Check size={16} />
                            Save
                          </button>
                          <button
                            onClick={() => setEditingProject(null)}
                            className="flex-1 px-4 py-2 bg-[#1A1A1A] text-white rounded-lg"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center"
                            style={{ backgroundColor: `${project.color}20` }}
                          >
                            <span className="text-lg font-bold" style={{ color: project.color }}>
                              {project.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{project.name}</h4>
                            <p className="text-xs text-gray-500">{project.category}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingProject(project)}
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => deleteProject(project.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
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
                <h2 className="text-lg text-white font-semibold">Skills</h2>
                <button
                  onClick={() => setIsAddingSkill(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#00D4FF] text-black rounded-lg hover:bg-[#00B8E6] transition-colors text-sm"
                >
                  <Plus size={16} />
                  Add
                </button>
              </div>

              {/* Add Skill Form */}
              {isAddingSkill && (
                <div className="bg-[#1A1A1A] rounded-xl p-6 border border-white/10 space-y-4">
                  <h3 className="text-white font-semibold">New Skill</h3>
                  <input
                    type="text"
                    placeholder="Skill Name"
                    value={skillForm.name}
                    onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF]"
                  />
                  <select
                    value={skillForm.category}
                    onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00D4FF]"
                  >
                    <option value="Creative">Creative</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance</option>
                    <option value="Production">Production</option>
                    <option value="Technology">Technology</option>
                  </select>
                  <div className="flex gap-4">
                    <button
                      onClick={handleAddSkill}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#00D4FF] text-black rounded-lg"
                    >
                      <Check size={16} />
                      Save
                    </button>
                    <button
                      onClick={() => setIsAddingSkill(false)}
                      className="flex-1 px-4 py-2 bg-[#1A1A1A] text-white rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Skills List */}
              <div className="grid grid-cols-1 gap-3">
                {data.skills.map((skill) => (
                  <div key={skill.id} className="bg-[#1A1A1A] rounded-xl p-4 border border-white/10">
                    {editingSkill?.id === skill.id ? (
                      <div className="space-y-4">
                        <h3 className="text-white font-semibold">Edit Skill</h3>
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
                        <div className="flex gap-4">
                          <button
                            onClick={handleUpdateSkill}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#00D4FF] text-black rounded-lg"
                          >
                            <Check size={16} />
                            Save
                          </button>
                          <button
                            onClick={() => setEditingSkill(null)}
                            className="flex-1 px-4 py-2 bg-[#1A1A1A] text-white rounded-lg"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-white font-medium">{skill.name}</h4>
                          <span className="text-xs text-gray-500">{skill.category}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingSkill(skill)}
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => deleteSkill(skill.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
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
              <h2 className="text-lg text-white font-semibold">About Section</h2>
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
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#00D4FF] text-black rounded-lg hover:bg-[#00B8E6] transition-colors"
                >
                  <Check size={18} />
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* My Works Tab */}
          {activeTab === "myworks" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg text-white font-semibold">My Works</h2>
                <button
                  onClick={() => setIsAddingMyWork(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#00D4FF] text-black rounded-lg hover:bg-[#00B8E6] transition-colors text-sm"
                >
                  <Plus size={16} />
                  Add
                </button>
              </div>

              {/* Add My Work Form */}
              {isAddingMyWork && (
                <div className="bg-[#1A1A1A] rounded-xl p-6 border border-white/10 space-y-4">
                  <h3 className="text-white font-semibold">New Work</h3>
                  <input
                    type="text"
                    placeholder="Title"
                    value={myWorkForm.title}
                    onChange={(e) => setMyWorkForm({ ...myWorkForm, title: e.target.value })}
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF]"
                  />
                  <textarea
                    placeholder="Description (optional)"
                    value={myWorkForm.description}
                    onChange={(e) => setMyWorkForm({ ...myWorkForm, description: e.target.value })}
                    rows={2}
                    className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF]"
                  />
                  <div>
                    <label className="block text-sm text-gray-400 mb-2 flex items-center gap-2">
                      <ImageIcon size={16} />
                      Image URL
                    </label>
                    <input
                      type="text"
                      placeholder="https://..."
                      value={myWorkForm.imageUrl}
                      onChange={(e) => setMyWorkForm({ ...myWorkForm, imageUrl: e.target.value })}
                      className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#00D4FF]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Type</label>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setMyWorkForm({ ...myWorkForm, type: "framing" })}
                        className={`flex-1 py-2 rounded-lg transition-colors ${
                          myWorkForm.type === "framing"
                            ? "bg-[#00D4FF] text-black"
                            : "bg-[#1A1A1A] text-white hover:bg-[#252525]"
                        }`}
                      >
                        Framing
                      </button>
                      <button
                        onClick={() => setMyWorkForm({ ...myWorkForm, type: "moving" })}
                        className={`flex-1 py-2 rounded-lg transition-colors ${
                          myWorkForm.type === "moving"
                            ? "bg-[#00D4FF] text-black"
                            : "bg-[#1A1A1A] text-white hover:bg-[#252525]"
                        }`}
                      >
                        Moving
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={handleAddMyWork}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#00D4FF] text-black rounded-lg hover:bg-[#00B8E6] transition-colors"
                    >
                      <Check size={16} />
                      Save
                    </button>
                    <button
                      onClick={() => setIsAddingMyWork(false)}
                      className="flex-1 px-4 py-2 bg-[#1A1A1A] text-white rounded-lg hover:bg-[#252525] transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* My Works List */}
              <div className="grid grid-cols-1 gap-3">
                {data.myWorks.map((work) => (
                  <div key={work.id} className="bg-[#1A1A1A] rounded-xl p-4 border border-white/10">
                    {editingMyWork?.id === work.id ? (
                      <div className="space-y-4">
                        <h3 className="text-white font-semibold">Edit Work</h3>
                        <input
                          type="text"
                          value={editingMyWork.title}
                          onChange={(e) => setEditingMyWork({ ...editingMyWork, title: e.target.value })}
                          className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white"
                        />
                        <textarea
                          value={editingMyWork.description}
                          onChange={(e) => setEditingMyWork({ ...editingMyWork, description: e.target.value })}
                          rows={2}
                          className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white"
                        />
                        <input
                          type="text"
                          value={editingMyWork.imageUrl}
                          onChange={(e) => setEditingMyWork({ ...editingMyWork, imageUrl: e.target.value })}
                          className="w-full bg-[#0A0A0A] border border-white/10 rounded-lg px-4 py-3 text-white"
                        />
                        <div className="flex gap-4">
                          <button
                            onClick={handleUpdateMyWork}
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#00D4FF] text-black rounded-lg"
                          >
                            <Check size={16} />
                            Save
                          </button>
                          <button
                            onClick={() => setEditingMyWork(null)}
                            className="flex-1 px-4 py-2 bg-[#1A1A1A] text-white rounded-lg"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {work.imageUrl && (
                            <img
                              src={work.imageUrl}
                              alt={work.title}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                          )}
                          <div>
                            <h4 className="text-white font-medium">{work.title}</h4>
                            <p className="text-xs text-gray-500 capitalize">{work.type} • {work.description || "No description"}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingMyWork(work)}
                            className="p-2 text-gray-400 hover:text-white transition-colors"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => deleteMyWork(work.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {data.myWorks.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Palette className="mx-auto mb-3" size={32} />
                    <p>No works yet. Add your first framing or moving picture!</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
