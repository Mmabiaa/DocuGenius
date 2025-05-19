import React, { useState } from 'react';
import { FaBook, FaCode, FaCog, FaQuestionCircle, FaRocket } from 'react-icons/fa';

const DocumentationPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('getting-started');

  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <FaRocket className="w-5 h-5" />,
      content: (
        <div>
          <h2 className="text-2xl font-bold mb-4">Getting Started with DocuGenius</h2>
          <p className="mb-4">
            Welcome to DocuGenius! This guide will help you get started with our platform.
          </p>
          <h3 className="text-xl font-semibold mb-2">Quick Start Guide</h3>
          <ol className="list-decimal list-inside space-y-2 mb-4">
            <li>Create an account or sign in</li>
            <li>Choose a template or start from scratch</li>
            <li>Customize your document</li>
            <li>Export or share your work</li>
          </ol>
        </div>
      ),
    },
    {
      id: 'api-reference',
      title: 'API Reference',
      icon: <FaCode className="w-5 h-5" />,
      content: (
        <div>
          <h2 className="text-2xl font-bold mb-4">API Reference</h2>
          <p className="mb-4">
            Our API allows you to integrate DocuGenius into your applications.
          </p>
          <div className="bg-gray-100 p-4 rounded-lg mb-4">
            <pre className="text-sm">
              {`// Example API call
const response = await fetch('https://api.docugenius.com/v1/documents', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    template: 'resume',
    data: {
      name: 'John Doe',
      // ... other fields
    }
  })
});`}
            </pre>
          </div>
        </div>
      ),
    },
    {
      id: 'configuration',
      title: 'Configuration',
      icon: <FaCog className="w-5 h-5" />,
      content: (
        <div>
          <h2 className="text-2xl font-bold mb-4">Configuration Guide</h2>
          <p className="mb-4">
            Learn how to configure DocuGenius to meet your specific needs.
          </p>
          <h3 className="text-xl font-semibold mb-2">Settings</h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Account Settings</li>
            <li>API Configuration</li>
            <li>Template Customization</li>
            <li>Export Options</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'faq',
      title: 'FAQ',
      icon: <FaQuestionCircle className="w-5 h-5" />,
      content: (
        <div>
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">How do I reset my password?</h3>
              <p>Click on the "Forgot Password" link on the login page and follow the instructions.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Can I use my own templates?</h3>
              <p>Yes, you can upload and use your own templates in various formats.</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">What file formats are supported?</h3>
              <p>We support PDF, DOCX, and HTML formats for both import and export.</p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex items-center mb-6">
              <FaBook className="w-6 h-6 text-blue-500 mr-2" />
              <h2 className="text-xl font-bold">Documentation</h2>
            </div>
            <nav className="space-y-2">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                    activeSection === section.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  {section.icon}
                  <span>{section.title}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {sections.find((section) => section.id === activeSection)?.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage; 