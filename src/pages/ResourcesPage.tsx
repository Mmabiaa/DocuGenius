import React from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaFileAlt, FaNewspaper, FaHeadset, FaDownload, FaVideo, FaBookmark } from 'react-icons/fa';

const ResourcesPage: React.FC = () => {
  const resources = [
    {
      title: 'Documentation',
      description: 'Comprehensive guides and API references',
      icon: <FaBook className="w-8 h-8" />,
      link: '/documentation',
      color: 'bg-blue-500',
    },
    {
      title: 'Templates',
      description: 'Ready-to-use document templates',
      icon: <FaFileAlt className="w-8 h-8" />,
      link: '/templates',
      color: 'bg-green-500',
    },
    {
      title: 'Blog',
      description: 'Latest updates and articles',
      icon: <FaNewspaper className="w-8 h-8" />,
      link: '/blog',
      color: 'bg-purple-500',
    },
    {
      title: 'Support',
      description: 'Get help and contact support',
      icon: <FaHeadset className="w-8 h-8" />,
      link: '/support',
      color: 'bg-red-500',
    },
  ];

  const learningResources = [
    {
      title: 'Getting Started Guide',
      description: 'Learn the basics of DocuGenius',
      icon: <FaBookmark className="w-6 h-6" />,
      link: '/documentation/getting-started',
    },
    {
      title: 'Video Tutorials',
      description: 'Step-by-step video guides',
      icon: <FaVideo className="w-6 h-6" />,
      link: '/documentation/videos',
    },
    {
      title: 'Download Templates',
      description: 'Access our template library',
      icon: <FaDownload className="w-6 h-6" />,
      link: '/templates/download',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Resources</h1>
        <p className="text-lg text-gray-600 text-center mb-12">
          Everything you need to get the most out of DocuGenius
        </p>

        {/* Main Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {resources.map((resource) => (
            <Link
              key={resource.title}
              to={resource.link}
              className="block p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center space-x-4">
                <div className={`${resource.color} p-3 rounded-lg text-white`}>
                  {resource.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{resource.title}</h3>
                  <p className="text-gray-600">{resource.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Learning Resources Section */}
        <div className="bg-gray-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Learning Resources</h2>
          <div className="space-y-4">
            {learningResources.map((resource) => (
              <Link
                key={resource.title}
                to={resource.link}
                className="flex items-center p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow duration-300"
              >
                <div className="text-blue-500 mr-4">{resource.icon}</div>
                <div>
                  <h3 className="font-semibold">{resource.title}</h3>
                  <p className="text-gray-600 text-sm">{resource.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourcesPage; 