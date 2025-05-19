import React from 'react';
import { FaFileAlt, FaHistory, FaCog, FaPencilAlt } from 'react-icons/fa';

const features = [
  {
    title: 'Essay Generator',
    description: 'Create well-structured essays with AI-powered assistance. Perfect for students and professionals.',
    icon: <FaFileAlt className="w-12 h-12 text-blue-500" />,
  },
  {
    title: 'Resume Builder',
    description: 'Design professional resumes with customizable templates and real-time editing.',
    icon: <FaPencilAlt className="w-12 h-12 text-green-500" />,
  },
  {
    title: 'Document History',
    description: 'Access and manage all your previously generated documents in one place.',
    icon: <FaHistory className="w-12 h-12 text-purple-500" />,
  },
  {
    title: 'Customization Options',
    description: 'Personalize your experience with various settings and preferences.',
    icon: <FaCog className="w-12 h-12 text-orange-500" />,
  },
];

const FeaturesPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Features</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover the powerful tools and features that make DocuGenius your ultimate document creation companion.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center mb-4">
              {feature.icon}
              <h2 className="text-2xl font-semibold ml-4">{feature.title}</h2>
            </div>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-3xl font-bold mb-8">Ready to Get Started?</h2>
        <button
          onClick={() => window.location.href = '/essay-generator'}
          className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Try It Now
        </button>
      </div>
    </div>
  );
};

export default FeaturesPage; 