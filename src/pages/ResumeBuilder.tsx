import React, { useState } from 'react';
import { 
  FilePlus, 
  Download, 
  Copy, 
  Check, 
  ChevronRight, 
  ChevronDown, 
  User, 
  BookOpen,
  Briefcase, 
  Award, 
  Code
} from 'lucide-react';

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
}

interface Education {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

interface Skill {
  id: string;
  name: string;
  level: number;
}

interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  summary: string;
}

const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: ''
  },
  education: [
    {
      id: '1',
      institution: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      description: ''
    }
  ],
  experience: [
    {
      id: '1',
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }
  ],
  skills: [
    { id: '1', name: '', level: 3 }
  ],
  summary: ''
};

const resumeTemplates = [
  { id: 'professional', name: 'Professional', color: 'blue' },
  { id: 'modern', name: 'Modern', color: 'teal' },
  { id: 'creative', name: 'Creative', color: 'purple' },
  { id: 'minimal', name: 'Minimal', color: 'gray' }
];

const ResumeBuilder: React.FC = () => {
  const [activeTemplate, setActiveTemplate] = useState(resumeTemplates[0]);
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [activeSection, setActiveSection] = useState<string>('personal');
  const [isGeneratingSummary, setIsGeneratingSummary] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [previewMode, setPreviewMode] = useState<boolean>(false);

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value
      }
    }));
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeData(prev => ({
      ...prev,
      summary: e.target.value
    }));
  };

  const handleEducationChange = (id: string, field: keyof Education, value: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu => 
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }));
  };

  const addEducation = () => {
    const newId = String(Date.now());
    setResumeData(prev => ({
      ...prev,
      education: [
        ...prev.education,
        {
          id: newId,
          institution: '',
          degree: '',
          fieldOfStudy: '',
          startDate: '',
          endDate: '',
          description: ''
        }
      ]
    }));
  };

  const removeEducation = (id: string) => {
    if (resumeData.education.length === 1) return;
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }));
  };

  const handleExperienceChange = (id: string, field: keyof Experience, value: any) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }));
  };

  const addExperience = () => {
    const newId = String(Date.now());
    setResumeData(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id: newId,
          company: '',
          position: '',
          location: '',
          startDate: '',
          endDate: '',
          current: false,
          description: ''
        }
      ]
    }));
  };

  const removeExperience = (id: string) => {
    if (resumeData.experience.length === 1) return;
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const handleSkillChange = (id: string, field: keyof Skill, value: any) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(skill => 
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    }));
  };

  const addSkill = () => {
    const newId = String(Date.now());
    setResumeData(prev => ({
      ...prev,
      skills: [
        ...prev.skills,
        { id: newId, name: '', level: 3 }
      ]
    }));
  };

  const removeSkill = (id: string) => {
    if (resumeData.skills.length === 1) return;
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }));
  };

  const generateSummary = () => {
    setIsGeneratingSummary(true);
    // Simulate AI generating a summary
    setTimeout(() => {
      // Example summary based on the resume data
      const generatedSummary = `Dedicated professional with experience in ${resumeData.experience[0]?.position || 'the industry'} seeking to leverage my skills in ${resumeData.skills.map(s => s.name).filter(Boolean).join(', ') || 'relevant areas'}. Graduate of ${resumeData.education[0]?.institution || 'higher education'} with a degree in ${resumeData.education[0]?.fieldOfStudy || 'my field'}, passionate about delivering exceptional results and continuous growth.`;
      
      setResumeData(prev => ({
        ...prev,
        summary: generatedSummary
      }));
      setIsGeneratingSummary(false);
    }, 2000);
  };

  const copyToClipboard = () => {
    // In a real app, we would generate the resume text format here
    const resumeText = `${resumeData.personalInfo.fullName}\n${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone}\n\n${resumeData.summary}\n\nEXPERIENCE\n${resumeData.experience.map(exp => `${exp.position} at ${exp.company}`).join('\n')}\n\nEDUCATION\n${resumeData.education.map(edu => `${edu.degree} in ${edu.fieldOfStudy} from ${edu.institution}`).join('\n')}\n\nSKILLS\n${resumeData.skills.map(skill => skill.name).filter(Boolean).join(', ')}`;
    
    navigator.clipboard.writeText(resumeText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadResume = () => {
    // In a real app, this would generate a PDF or DOCX
    alert('In a production app, this would download a formatted PDF or DOCX file with your resume.');
  };

  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Resume Builder</h1>
          <p className="text-lg text-gray-600">
            Create a professional resume with our easy-to-use builder.
          </p>
        </div>

        <div className="flex flex-col-reverse lg:flex-row gap-8">
          {/* Resume Builder Form */}
          {!previewMode && (
            <div className="lg:w-2/3">
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">Build Your Resume</h2>
                    <button
                      onClick={togglePreviewMode}
                      className="flex items-center px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md text-sm transition-colors"
                    >
                      Preview
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </button>
                  </div>
                  
                  <div className="mb-6">
                    <div className="flex border-b border-gray-200">
                      <button
                        onClick={() => setActiveSection('personal')}
                        className={`px-4 py-2 font-medium text-sm ${activeSection === 'personal' 
                          ? 'text-blue-600 border-b-2 border-blue-600' 
                          : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        <User className="inline h-4 w-4 mr-1" />
                        Personal
                      </button>
                      <button
                        onClick={() => setActiveSection('summary')}
                        className={`px-4 py-2 font-medium text-sm ${activeSection === 'summary' 
                          ? 'text-blue-600 border-b-2 border-blue-600' 
                          : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        <FilePlus className="inline h-4 w-4 mr-1" />
                        Summary
                      </button>
                      <button
                        onClick={() => setActiveSection('experience')}
                        className={`px-4 py-2 font-medium text-sm ${activeSection === 'experience' 
                          ? 'text-blue-600 border-b-2 border-blue-600' 
                          : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        <Briefcase className="inline h-4 w-4 mr-1" />
                        Experience
                      </button>
                      <button
                        onClick={() => setActiveSection('education')}
                        className={`px-4 py-2 font-medium text-sm ${activeSection === 'education' 
                          ? 'text-blue-600 border-b-2 border-blue-600' 
                          : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        <BookOpen className="inline h-4 w-4 mr-1" />
                        Education
                      </button>
                      <button
                        onClick={() => setActiveSection('skills')}
                        className={`px-4 py-2 font-medium text-sm ${activeSection === 'skills' 
                          ? 'text-blue-600 border-b-2 border-blue-600' 
                          : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        <Code className="inline h-4 w-4 mr-1" />
                        Skills
                      </button>
                    </div>
                  </div>

                  {activeSection === 'personal' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                          <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={resumeData.personalInfo.fullName}
                            onChange={handlePersonalInfoChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., John Doe"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={resumeData.personalInfo.email}
                            onChange={handlePersonalInfoChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., john.doe@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={resumeData.personalInfo.phone}
                            onChange={handlePersonalInfoChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., (123) 456-7890"
                          />
                        </div>
                        <div>
                          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                          <input
                            type="text"
                            id="location"
                            name="location"
                            value={resumeData.personalInfo.location}
                            onChange={handlePersonalInfoChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., San Francisco, CA"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
                          <input
                            type="url"
                            id="linkedin"
                            name="linkedin"
                            value={resumeData.personalInfo.linkedin}
                            onChange={handlePersonalInfoChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., linkedin.com/in/johndoe"
                          />
                        </div>
                        <div>
                          <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                          <input
                            type="url"
                            id="website"
                            name="website"
                            value={resumeData.personalInfo.website}
                            onChange={handlePersonalInfoChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="e.g., johndoe.com"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {activeSection === 'summary' && (
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label htmlFor="summary" className="block text-sm font-medium text-gray-700">Professional Summary</label>
                        <button
                          onClick={generateSummary}
                          disabled={isGeneratingSummary}
                          className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors flex items-center"
                        >
                          {isGeneratingSummary ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Generating...
                            </>
                          ) : (
                            <>AI Generate</>
                          )}
                        </button>
                      </div>
                      <textarea
                        id="summary"
                        name="summary"
                        value={resumeData.summary}
                        onChange={handleSummaryChange}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Briefly describe your professional background and strengths..."
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        A strong summary highlights your key qualifications and career goals in 3-5 sentences.
                      </p>
                    </div>
                  )}

                  {activeSection === 'experience' && (
                    <div className="space-y-6">
                      {resumeData.experience.map((exp, index) => (
                        <div key={exp.id} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-md font-medium">Experience {index + 1}</h3>
                            {resumeData.experience.length > 1 && (
                              <button
                                onClick={() => removeExperience(exp.id)}
                                className="text-sm text-red-600 hover:text-red-800"
                              >
                                Remove
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Company/Organization*</label>
                              <input
                                type="text"
                                value={exp.company}
                                onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., Acme Corporation"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Position/Title*</label>
                              <input
                                type="text"
                                value={exp.position}
                                onChange={(e) => handleExperienceChange(exp.id, 'position', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., Software Engineer"
                                required
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                              <input
                                type="month"
                                value={exp.startDate}
                                onChange={(e) => handleExperienceChange(exp.id, 'startDate', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                              <div className="flex items-center gap-2">
                                <input
                                  type="month"
                                  value={exp.endDate}
                                  onChange={(e) => handleExperienceChange(exp.id, 'endDate', e.target.value)}
                                  disabled={exp.current}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:text-gray-500"
                                />
                                <div className="flex items-center">
                                  <input
                                    type="checkbox"
                                    id={`current-${exp.id}`}
                                    checked={exp.current}
                                    onChange={(e) => handleExperienceChange(exp.id, 'current', e.target.checked)}
                                    className="mr-2"
                                  />
                                  <label htmlFor={`current-${exp.id}`} className="text-sm text-gray-700">
                                    Current
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                            <input
                              type="text"
                              value={exp.location}
                              onChange={(e) => handleExperienceChange(exp.id, 'location', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="e.g., San Francisco, CA"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                              value={exp.description}
                              onChange={(e) => handleExperienceChange(exp.id, 'description', e.target.value)}
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Describe your responsibilities, achievements, and skills used..."
                            />
                          </div>
                        </div>
                      ))}

                      <button
                        onClick={addExperience}
                        className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-gray-800 hover:border-gray-400 transition-colors flex items-center justify-center"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Experience
                      </button>
                    </div>
                  )}

                  {activeSection === 'education' && (
                    <div className="space-y-6">
                      {resumeData.education.map((edu, index) => (
                        <div key={edu.id} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex justify-between items-center mb-4">
                            <h3 className="text-md font-medium">Education {index + 1}</h3>
                            {resumeData.education.length > 1 && (
                              <button
                                onClick={() => removeEducation(edu.id)}
                                className="text-sm text-red-600 hover:text-red-800"
                              >
                                Remove
                              </button>
                            )}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Institution*</label>
                              <input
                                type="text"
                                value={edu.institution}
                                onChange={(e) => handleEducationChange(edu.id, 'institution', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., Stanford University"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Degree*</label>
                              <input
                                type="text"
                                value={edu.degree}
                                onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="e.g., Bachelor of Science"
                                required
                              />
                            </div>
                          </div>

                          <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Field of Study</label>
                            <input
                              type="text"
                              value={edu.fieldOfStudy}
                              onChange={(e) => handleEducationChange(edu.id, 'fieldOfStudy', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="e.g., Computer Science"
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                              <input
                                type="month"
                                value={edu.startDate}
                                onChange={(e) => handleEducationChange(edu.id, 'startDate', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                              <input
                                type="month"
                                value={edu.endDate}
                                onChange={(e) => handleEducationChange(edu.id, 'endDate', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                            <textarea
                              value={edu.description}
                              onChange={(e) => handleEducationChange(edu.id, 'description', e.target.value)}
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Optional: Describe relevant coursework, achievements, etc."
                            />
                          </div>
                        </div>
                      ))}

                      <button
                        onClick={addEducation}
                        className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-gray-800 hover:border-gray-400 transition-colors flex items-center justify-center"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Education
                      </button>
                    </div>
                  )}

                  {activeSection === 'skills' && (
                    <div className="space-y-6">
                      <p className="text-sm text-gray-600 mb-4">
                        Add skills that are relevant to the position you're applying for.
                      </p>

                      {resumeData.skills.map((skill, index) => (
                        <div key={skill.id} className="flex items-center space-x-4">
                          <div className="flex-grow">
                            <input
                              type="text"
                              value={skill.name}
                              onChange={(e) => handleSkillChange(skill.id, 'name', e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="e.g., JavaScript, Project Management, etc."
                            />
                          </div>
                          <div className="w-32">
                            <select
                              value={skill.level}
                              onChange={(e) => handleSkillChange(skill.id, 'level', parseInt(e.target.value))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              <option value={1}>Beginner</option>
                              <option value={2}>Intermediate</option>
                              <option value={3}>Advanced</option>
                              <option value={4}>Expert</option>
                              <option value={5}>Master</option>
                            </select>
                          </div>
                          {resumeData.skills.length > 1 && (
                            <button
                              onClick={() => removeSkill(skill.id)}
                              className="text-red-500 hover:text-red-700"
                            >
                              <X className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                      ))}

                      <button
                        onClick={addSkill}
                        className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-gray-800 hover:border-gray-400 transition-colors flex items-center justify-center"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Skill
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Resume Preview */}
          <div className={previewMode ? "w-full" : "lg:w-1/3"}>
            <div className="sticky top-24">
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-4">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900">{previewMode ? "Resume Preview" : "Preview"}</h2>
                    {previewMode && (
                      <button
                        onClick={togglePreviewMode}
                        className="flex items-center px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md text-sm transition-colors"
                      >
                        Edit
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </button>
                    )}
                  </div>

                  <div className={`border border-gray-200 rounded-lg bg-white ${previewMode ? "min-h-[29.7cm] w-full max-w-[21cm] mx-auto" : "min-h-[400px]"}`}>
                    <div className={`relative p-6 ${activeTemplate.id === 'professional' ? 'border-t-8 border-blue-600' : activeTemplate.id === 'modern' ? 'border-l-8 border-teal-600' : activeTemplate.id === 'creative' ? 'bg-gradient-to-r from-purple-50 to-white' : ''}`}>
                      {/* Header Section */}
                      <div className="mb-6">
                        <h1 className={`text-2xl font-bold ${activeTemplate.id === 'professional' ? 'text-blue-700' : activeTemplate.id === 'modern' ? 'text-teal-700' : activeTemplate.id === 'creative' ? 'text-purple-700' : 'text-gray-900'}`}>
                          {resumeData.personalInfo.fullName || 'Your Name'}
                        </h1>
                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-gray-600">
                          {resumeData.personalInfo.email && (
                            <span>{resumeData.personalInfo.email}</span>
                          )}
                          {resumeData.personalInfo.phone && (
                            <span>{resumeData.personalInfo.phone}</span>
                          )}
                          {resumeData.personalInfo.location && (
                            <span>{resumeData.personalInfo.location}</span>
                          )}
                        </div>
                        {(resumeData.personalInfo.linkedin || resumeData.personalInfo.website) && (
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-600">
                            {resumeData.personalInfo.linkedin && (
                              <span>{resumeData.personalInfo.linkedin}</span>
                            )}
                            {resumeData.personalInfo.website && (
                              <span>{resumeData.personalInfo.website}</span>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Summary Section */}
                      {resumeData.summary && (
                        <div className="mb-6">
                          <h2 className={`text-lg font-semibold mb-2 ${activeTemplate.id === 'professional' ? 'text-blue-700' : activeTemplate.id === 'modern' ? 'text-teal-700' : activeTemplate.id === 'creative' ? 'text-purple-700' : 'text-gray-900'}`}>
                            Professional Summary
                          </h2>
                          <div className={activeTemplate.id === 'modern' ? 'border-l-2 border-teal-200 pl-3' : ''}>
                            <p className="text-sm text-gray-700">{resumeData.summary}</p>
                          </div>
                        </div>
                      )}

                      {/* Experience Section */}
                      {resumeData.experience.some(exp => exp.company || exp.position) && (
                        <div className="mb-6">
                          <h2 className={`text-lg font-semibold mb-3 ${activeTemplate.id === 'professional' ? 'text-blue-700' : activeTemplate.id === 'modern' ? 'text-teal-700' : activeTemplate.id === 'creative' ? 'text-purple-700' : 'text-gray-900'}`}>
                            Experience
                          </h2>
                          <div className="space-y-4">
                            {resumeData.experience.filter(exp => exp.company || exp.position).map((exp, index) => (
                              <div key={index} className={activeTemplate.id === 'modern' ? 'border-l-2 border-teal-200 pl-3' : ''}>
                                <div className="flex flex-col sm:flex-row sm:justify-between">
                                  <div>
                                    <h3 className="text-md font-medium text-gray-900">{exp.position || 'Position'}</h3>
                                    <p className="text-sm text-gray-700">{exp.company || 'Company'}{exp.location ? `, ${exp.location}` : ''}</p>
                                  </div>
                                  <div className="text-sm text-gray-500 mt-1 sm:mt-0">
                                    {exp.startDate && (
                                      <>
                                        {new Date(exp.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                                        {exp.current ? ' - Present' : exp.endDate ? ` - ${new Date(exp.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}` : ''}
                                      </>
                                    )}
                                  </div>
                                </div>
                                {exp.description && (
                                  <p className="mt-2 text-sm text-gray-600">{exp.description}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Education Section */}
                      {resumeData.education.some(edu => edu.institution || edu.degree) && (
                        <div className="mb-6">
                          <h2 className={`text-lg font-semibold mb-3 ${activeTemplate.id === 'professional' ? 'text-blue-700' : activeTemplate.id === 'modern' ? 'text-teal-700' : activeTemplate.id === 'creative' ? 'text-purple-700' : 'text-gray-900'}`}>
                            Education
                          </h2>
                          <div className="space-y-4">
                            {resumeData.education.filter(edu => edu.institution || edu.degree).map((edu, index) => (
                              <div key={index} className={activeTemplate.id === 'modern' ? 'border-l-2 border-teal-200 pl-3' : ''}>
                                <div className="flex flex-col sm:flex-row sm:justify-between">
                                  <div>
                                    <h3 className="text-md font-medium text-gray-900">
                                      {edu.degree ? edu.degree : 'Degree'}
                                      {edu.fieldOfStudy ? ` in ${edu.fieldOfStudy}` : ''}
                                    </h3>
                                    <p className="text-sm text-gray-700">{edu.institution || 'Institution'}</p>
                                  </div>
                                  <div className="text-sm text-gray-500 mt-1 sm:mt-0">
                                    {edu.startDate && (
                                      <>
                                        {new Date(edu.startDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}
                                        {edu.endDate ? ` - ${new Date(edu.endDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short' })}` : ''}
                                      </>
                                    )}
                                  </div>
                                </div>
                                {edu.description && (
                                  <p className="mt-2 text-sm text-gray-600">{edu.description}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Skills Section */}
                      {resumeData.skills.some(skill => skill.name) && (
                        <div>
                          <h2 className={`text-lg font-semibold mb-3 ${activeTemplate.id === 'professional' ? 'text-blue-700' : activeTemplate.id === 'modern' ? 'text-teal-700' : activeTemplate.id === 'creative' ? 'text-purple-700' : 'text-gray-900'}`}>
                            Skills
                          </h2>
                          <div className={activeTemplate.id === 'modern' ? 'border-l-2 border-teal-200 pl-3' : ''}>
                            <div className="flex flex-wrap gap-2">
                              {resumeData.skills.filter(skill => skill.name).map((skill, index) => (
                                <span 
                                  key={index} 
                                  className={`inline-block px-3 py-1 text-sm rounded-full ${
                                    activeTemplate.id === 'professional' 
                                      ? 'bg-blue-100 text-blue-800' 
                                      : activeTemplate.id === 'modern' 
                                        ? 'bg-teal-100 text-teal-800' 
                                        : activeTemplate.id === 'creative' 
                                          ? 'bg-purple-100 text-purple-800' 
                                          : 'bg-gray-100 text-gray-800'
                                  }`}
                                >
                                  {skill.name}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Template and Export Options */}
                  <div className="mt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Template</label>
                      <div className="flex space-x-2">
                        {resumeTemplates.map(template => (
                          <button
                            key={template.id}
                            onClick={() => setActiveTemplate(template)}
                            className={`w-8 h-8 rounded-full border-2 transition-all ${
                              activeTemplate.id === template.id 
                                ? `border-${template.color}-600 ring-2 ring-${template.color}-200` 
                                : 'border-gray-300'
                            }`}
                            style={{ backgroundColor: getTemplateColor(template.color) }}
                            title={template.name}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={copyToClipboard}
                        className="flex items-center px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-sm transition-colors"
                      >
                        {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
                        {copied ? 'Copied' : 'Copy'}
                      </button>
                      <button
                        onClick={downloadResume}
                        className="flex items-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm transition-colors"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper components and functions
const Plus = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
  </svg>
);

const getTemplateColor = (color: string): string => {
  const colors: Record<string, string> = {
    blue: '#2563eb',
    teal: '#0d9488',
    purple: '#7c3aed',
    gray: '#6b7280'
  };
  return colors[color] || colors.blue;
};

export default ResumeBuilder;