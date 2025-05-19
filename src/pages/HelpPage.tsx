import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaVideo, FaQuestionCircle, FaLightbulb, FaArrowRight } from 'react-icons/fa';

const HelpPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('guides');

  const guides = [
    {
      title: 'Getting Started with DocuGenius',
      description: 'Learn the basics of our platform',
      icon: <FaBook className="w-6 h-6" />,
      link: '/documentation/getting-started',
    },
    {
      title: 'Creating Your First Document',
      description: 'Step-by-step guide to create documents',
      icon: <FaBook className="w-6 h-6" />,
      link: '/documentation/creating-documents',
    },
    {
      title: 'Using Templates',
      description: 'How to use and customize templates',
      icon: <FaBook className="w-6 h-6" />,
      link: '/documentation/templates',
    },
  ];

  const tutorials = [
    {
      title: 'Document Creation Tutorial',
      description: 'Watch how to create professional documents',
      icon: <FaVideo className="w-6 h-6" />,
      link: '/documentation/videos/document-creation',
    },
    {
      title: 'Template Customization',
      description: 'Learn to customize templates',
      icon: <FaVideo className="w-6 h-6" />,
      link: '/documentation/videos/template-customization',
    },
    {
      title: 'Advanced Features',
      description: 'Explore advanced features and tips',
      icon: <FaVideo className="w-6 h-6" />,
      link: '/documentation/videos/advanced-features',
    },
  ];

  const tips = [
    {
      title: 'Keyboard Shortcuts',
      description: 'Save time with these keyboard shortcuts',
      icon: <FaLightbulb className="w-6 h-6" />,
      link: '/documentation/tips/shortcuts',
    },
    {
      title: 'Best Practices',
      description: 'Follow these best practices for better results',
      icon: <FaLightbulb className="w-6 h-6" />,
      link: '/documentation/tips/best-practices',
    },
    {
      title: 'Troubleshooting',
      description: 'Common issues and their solutions',
      icon: <FaLightbulb className="w-6 h-6" />,
      link: '/documentation/tips/troubleshooting',
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'guides':
        return guides;
      case 'tutorials':
        return tutorials;
      case 'tips':
        return tips;
      default:
        return guides;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Help Center</h1>
        <p className="text-lg text-gray-600 text-center mb-12">
          Find answers, tutorials, and guides to help you get the most out of DocuGenius
        </p>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-gray-200 p-1">
            <button
              onClick={() => setActiveTab('guides')}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                activeTab === 'guides'
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              <FaBook className="inline-block mr-2" />
              Guides
            </button>
            <button
              onClick={() => setActiveTab('tutorials')}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                activeTab === 'tutorials'
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              <FaVideo className="inline-block mr-2" />
              Tutorials
            </button>
            <button
              onClick={() => setActiveTab('tips')}
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                activeTab === 'tips'
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              <FaLightbulb className="inline-block mr-2" />
              Tips & Tricks
            </button>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {renderContent().map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="block p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center space-x-4">
                <div className="text-blue-500">{item.icon}</div>
                <div className="flex-grow">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
                <FaArrowRight className="text-gray-400" />
              </div>
            </Link>
          ))}
        </div>

        {/* Additional Help Options */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Need More Help?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              to="/support"
              className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-300"
            >
              <FaQuestionCircle className="w-6 h-6 text-blue-500 mr-4" />
              <div>
                <h3 className="font-semibold">Contact Support</h3>
                <p className="text-gray-600 text-sm">
                  Get help from our support team
                </p>
              </div>
            </Link>
            <Link
              to="/documentation"
              className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-300"
            >
              <FaBook className="w-6 h-6 text-blue-500 mr-4" />
              <div>
                <h3 className="font-semibold">View Documentation</h3>
                <p className="text-gray-600 text-sm">
                  Browse our detailed documentation
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage; 