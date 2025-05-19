import React, { useState } from 'react';
import { FaFileAlt, FaDownload, FaStar, FaSearch } from 'react-icons/fa';

const TemplatesPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Templates' },
    { id: 'resume', name: 'Resumes' },
    { id: 'cover-letter', name: 'Cover Letters' },
    { id: 'business', name: 'Business' },
    { id: 'academic', name: 'Academic' },
  ];

  const templates = [
    {
      id: 1,
      title: 'Professional Resume',
      category: 'resume',
      description: 'Clean and professional resume template',
      downloads: 1234,
      rating: 4.8,
      image: 'https://via.placeholder.com/300x400',
    },
    {
      id: 2,
      title: 'Modern Cover Letter',
      category: 'cover-letter',
      description: 'Contemporary cover letter design',
      downloads: 856,
      rating: 4.6,
      image: 'https://via.placeholder.com/300x400',
    },
    {
      id: 3,
      title: 'Business Proposal',
      category: 'business',
      description: 'Professional business proposal template',
      downloads: 567,
      rating: 4.7,
      image: 'https://via.placeholder.com/300x400',
    },
    {
      id: 4,
      title: 'Research Paper',
      category: 'academic',
      description: 'Academic research paper format',
      downloads: 432,
      rating: 4.5,
      image: 'https://via.placeholder.com/300x400',
    },
  ];

  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Document Templates</h1>
        <p className="text-lg text-gray-600 text-center mb-12">
          Choose from our collection of professionally designed templates
        </p>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
            </div>
            <div className="flex gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={template.image}
                alt={template.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{template.title}</h3>
                <p className="text-gray-600 mb-4">{template.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{template.rating}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      ({template.downloads} downloads)
                    </span>
                  </div>
                  <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
                    <FaDownload className="mr-2" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <FaFileAlt className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No templates found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplatesPage; 