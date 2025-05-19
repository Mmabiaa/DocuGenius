import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    website?: string;
  };
  summary: string;
  experience: Array<{
    company: string;
    position: string;
    location: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description: string;
  }>;
  education: Array<{
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate: string;
    description?: string;
  }>;
  skills: Array<{
    name: string;
    level: number;
  }>;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const resumeData: ResumeData = await req.json();
    const formattedResume = formatResume(resumeData);

    return new Response(
      JSON.stringify({ content: formattedResume }),
      {
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  }
});

function formatResume(data: ResumeData): string {
  const sections = [
    formatHeader(data.personalInfo),
    formatSummary(data.summary),
    formatExperience(data.experience),
    formatEducation(data.education),
    formatSkills(data.skills)
  ];

  return sections.join('\n\n');
}

function formatHeader(info: ResumeData['personalInfo']): string {
  const contactInfo = [
    info.email,
    info.phone,
    info.location,
    info.linkedin,
    info.website
  ].filter(Boolean).join(' | ');

  return `${info.fullName}\n${contactInfo}`;
}

function formatSummary(summary: string): string {
  return `PROFESSIONAL SUMMARY\n${summary}`;
}

function formatExperience(experience: ResumeData['experience']): string {
  const header = 'PROFESSIONAL EXPERIENCE';
  const entries = experience.map(exp => {
    const dateRange = exp.current 
      ? `${exp.startDate} - Present`
      : `${exp.startDate} - ${exp.endDate}`;
    
    return `${exp.position}\n${exp.company}, ${exp.location}\n${dateRange}\n${exp.description}`;
  });

  return `${header}\n${entries.join('\n\n')}`;
}

function formatEducation(education: ResumeData['education']): string {
  const header = 'EDUCATION';
  const entries = education.map(edu => {
    const degree = `${edu.degree} in ${edu.fieldOfStudy}`;
    const dateRange = `${edu.startDate} - ${edu.endDate}`;
    
    return `${edu.institution}\n${degree}\n${dateRange}${edu.description ? '\n' + edu.description : ''}`;
  });

  return `${header}\n${entries.join('\n\n')}`;
}

function formatSkills(skills: ResumeData['skills']): string {
  const header = 'SKILLS';
  const skillsList = skills.map(skill => skill.name).join(', ');

  return `${header}\n${skillsList}`;
}