import React, { useState } from 'react';
import { FileText, FileEdit, Trash2, Clock, Eye, Download, Search, SortAsc, SortDesc, Filter } from 'lucide-react';

// Mock data for document history
const mockDocuments = [
  {
    id: '1',
    title: 'Climate Change Essay',
    type: 'essay',
    createdAt: new Date('2025-05-15T14:32:00'),
    updatedAt: new Date('2025-05-15T15:47:00'),
    preview: 'Climate change represents one of the most significant challenges facing humanity in the 21st century...'
  },
  {
    id: '2',
    title: 'Software Engineer Resume',
    type: 'resume',
    createdAt: new Date('2025-05-10T09:15:00'),
    updatedAt: new Date('2025-05-12T11:22:00'),
    preview: 'Experienced software engineer with expertise in React, Node.js, and cloud technologies...'
  },
  {
    id: '3',
    title: 'Research Paper: AI Ethics',
    type: 'academic',
    createdAt: new Date('2025-05-08T16:40:00'),
    updatedAt: new Date('2025-05-08T16:40:00'),
    preview: 'This paper examines the ethical implications of artificial intelligence in modern society...'
  },
  {
    id: '4',
    title: 'Biology Lab Report',
    type: 'academic',
    createdAt: new Date('2025-05-02T13:20:00'),
    updatedAt: new Date('2025-05-03T10:15:00'),
    preview: 'This experiment was conducted to examine the effects of different pH levels on enzyme activity...'
  },
  {
    id: '5',
    title: 'Marketing Internship Cover Letter',
    type: 'cover-letter',
    createdAt: new Date('2025-04-28T11:05:00'),
    updatedAt: new Date('2025-04-28T11:05:00'),
    preview: 'I am writing to express my interest in the Marketing Internship position at XYZ Company...'
  }
];

interface Document {
  id: string;
  title: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  preview: string;
}

const DocumentHistory: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Document; direction: 'asc' | 'desc' }>({ 
    key: 'updatedAt', 
    direction: 'desc' 
  });
  const [filterType, setFilterType] = useState<string>('all');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (key: keyof Document) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
  };

  const handleFilter = (type: string) => {
    setFilterType(type);
  };

  const handleDeleteDocument = (id: string) => {
    if (confirm('Are you sure you want to delete this document? This action cannot be undone.')) {
      setDocuments(documents.filter(doc => doc.id !== id));
    }
  };

  const handleViewDocument = (document: Document) => {
    setSelectedDocument(document);
  };

  const closeDocumentPreview = () => {
    setSelectedDocument(null);
  };

  // Sort and filter documents
  const sortedAndFilteredDocuments = [...documents]
    .filter(doc => 
      (filterType === 'all' || doc.type === filterType) && 
      (doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
       doc.preview.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortConfig.key === 'createdAt' || sortConfig.key === 'updatedAt') {
        return sortConfig.direction === 'asc' 
          ? Number(a[sortConfig.key]) - Number(b[sortConfig.key])
          : Number(b[sortConfig.key]) - Number(a[sortConfig.key]);
      }
      
      const aValue = String(a[sortConfig.key]).toLowerCase();
      const bValue = String(b[sortConfig.key]).toLowerCase();
      
      return sortConfig.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    });

  const documentTypes = [
    { value: 'all', label: 'All Documents' },
    { value: 'essay', label: 'Essays' },
    { value: 'resume', label: 'Resumes' },
    { value: 'academic', label: 'Academic Papers' },
    { value: 'cover-letter', label: 'Cover Letters' }
  ];

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Document History</h1>
          <p className="text-lg text-gray-600">
            Manage and access all your previously created documents.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="p-6">
            {/* Search and Filter Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div className="relative flex-grow max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <select
                    value={filterType}
                    onChange={(e) => handleFilter(e.target.value)}
                    className="appearance-none pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    {documentTypes.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Filter className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                <button
                  onClick={() => handleSort('updatedAt')}
                  className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
                  title="Sort by last updated"
                >
                  {sortConfig.key === 'updatedAt' && sortConfig.direction === 'asc' ? (
                    <SortAsc className="h-5 w-5 text-gray-700" />
                  ) : (
                    <SortDesc className="h-5 w-5 text-gray-700" />
                  )}
                </button>
              </div>
            </div>

            {/* Document List */}
            {sortedAndFilteredDocuments.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
                <p className="text-gray-500">
                  {searchTerm || filterType !== 'all' 
                    ? "Try adjusting your search or filters" 
                    : "You haven't created any documents yet"}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {sortedAndFilteredDocuments.map((document) => (
                  <div
                    key={document.id}
                    className="border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all p-4"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex-grow mb-4 md:mb-0">
                        <div className="flex items-center space-x-3">
                          <DocumentTypeIcon type={document.type} />
                          <h3 className="text-lg font-medium text-gray-900">{document.title}</h3>
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>
                            Last updated {formatDate(document.updatedAt)}
                            {document.createdAt.getTime() !== document.updatedAt.getTime() && 
                              ` (Created ${formatDate(document.createdAt)})`}
                          </span>
                        </div>
                        <p className="text-gray-600 mt-2 line-clamp-2">{document.preview}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDocument(document)}
                          className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                          title="View document"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                        <button
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                          title="Edit document"
                        >
                          <FileEdit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteDocument(document.id)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Delete document"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <FileText className="h-5 w-5 text-blue-600 mr-2" />
            Document Management Tips
          </h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Regularly delete documents you no longer need to keep your workspace organized</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Use descriptive titles to make documents easier to find later</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Download important documents to your device as a backup</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>Edit existing documents rather than creating new ones for minor changes</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Document Preview Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <DocumentTypeIcon type={selectedDocument.type} size={6} />
                <h3 className="text-xl font-medium text-gray-900">{selectedDocument.title}</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  title="Download document"
                >
                  <Download className="h-5 w-5" />
                </button>
                <button
                  onClick={closeDocumentPreview}
                  className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                  title="Close preview"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto flex-grow">
              <div className="prose max-w-none">
                {selectedDocument.type === 'essay' && (
                  <>
                    <h1>The Impact of Climate Change on Global Ecosystems</h1>
                    <p className="lead">{selectedDocument.preview}</p>
                    <p>This essay examines the multifaceted impacts of climate change on global ecosystems, analyzing both current effects and projected future consequences. By understanding these impacts, we can better appreciate the urgency of climate action and develop more effective mitigation and adaptation strategies.</p>
                    <h2>Rising Global Temperatures</h2>
                    <p>Global temperatures have risen approximately 1.1°C above pre-industrial levels, with significant regional variations. This warming trend has accelerated in recent decades, with the past decade (2011-2020) being the warmest on record. Rising temperatures directly affect ecosystem functioning through multiple pathways.</p>
                    <p>Altered growing seasons and phenology: Many plant species are flowering earlier, and migration patterns of birds and other animals are shifting. These changes can create mismatches between interdependent species, such as pollinators and the plants they pollinate.</p>
                    <h2>Changes in Precipitation Patterns</h2>
                    <p>Climate change is altering precipitation patterns worldwide, with some regions experiencing increased rainfall and others facing more frequent and severe droughts.</p>
                  </>
                )}
                
                {selectedDocument.type === 'resume' && (
                  <>
                    <div className="border-t-8 border-blue-600 p-6">
                      <h1 className="text-2xl font-bold text-blue-700">John Doe</h1>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-gray-600">
                        <span>john.doe@example.com</span>
                        <span>(123) 456-7890</span>
                        <span>San Francisco, CA</span>
                      </div>
                      <div className="mt-6">
                        <h2 className="text-lg font-semibold mb-2 text-blue-700">Professional Summary</h2>
                        <p className="text-sm text-gray-700">{selectedDocument.preview}</p>
                      </div>
                      <div className="mt-6">
                        <h2 className="text-lg font-semibold mb-3 text-blue-700">Experience</h2>
                        <div className="space-y-4">
                          <div>
                            <div className="flex flex-col sm:flex-row sm:justify-between">
                              <div>
                                <h3 className="text-md font-medium text-gray-900">Senior Software Engineer</h3>
                                <p className="text-sm text-gray-700">Tech Solutions Inc., San Francisco, CA</p>
                              </div>
                              <div className="text-sm text-gray-500 mt-1 sm:mt-0">
                                Jan 2022 - Present
                              </div>
                            </div>
                            <p className="mt-2 text-sm text-gray-600">Developed and maintained enterprise web applications using React, Node.js, and AWS technologies.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                
                {selectedDocument.type === 'academic' && (
                  <>
                    <h1>Research Paper: AI Ethics</h1>
                    <p className="italic">Abstract</p>
                    <p>{selectedDocument.preview}</p>
                    <p>Artificial intelligence technology is rapidly advancing and increasingly being integrated into various aspects of society. This paper explores the ethical considerations that arise from this integration, focusing on issues of privacy, bias, accountability, and the potential long-term impacts on human autonomy and social structures.</p>
                    <h2>Introduction</h2>
                    <p>The field of artificial intelligence has experienced tremendous growth in recent decades, with applications ranging from personal assistants and recommendation systems to autonomous vehicles and medical diagnosis tools. As AI becomes more sophisticated and ubiquitous, it raises important ethical questions about how these technologies should be developed, deployed, and regulated.</p>
                    <h2>Literature Review</h2>
                    <p>The ethical implications of AI have been explored by philosophers, computer scientists, legal scholars, and policymakers. Early work in this area focused primarily on the potential existential risks posed by superintelligent AI systems (Bostrom, 2014; Russell, 2019). More recent scholarship has shifted attention to more immediate concerns about fairness, transparency, and accountability in AI systems that are currently being deployed (Mittelstadt et al., 2016; Selbst et al., 2019).</p>
                  </>
                )}
                
                {selectedDocument.type === 'cover-letter' && (
                  <>
                    <div className="p-6">
                      <div className="text-right mb-8">
                        <p>John Doe</p>
                        <p>123 Main Street</p>
                        <p>San Francisco, CA 94105</p>
                        <p>john.doe@example.com</p>
                        <p>(123) 456-7890</p>
                        <p>May 15, 2025</p>
                      </div>
                      
                      <div className="mb-8">
                        <p>Hiring Manager</p>
                        <p>XYZ Company</p>
                        <p>456 Market Street</p>
                        <p>San Francisco, CA 94105</p>
                      </div>
                      
                      <p className="mb-4">Dear Hiring Manager,</p>
                      
                      <p className="mb-4">{selectedDocument.preview}</p>
                      
                      <p className="mb-4">During my academic career at State University, I have developed strong analytical and communication skills through various marketing projects and coursework. I have also gained practical experience in social media management and content creation through my work with the university's marketing club. I am particularly impressed by XYZ Company's innovative approach to digital marketing and would be excited to contribute to your team.</p>
                      
                      <p className="mb-4">I believe that my enthusiasm for marketing, combined with my creative thinking and attention to detail, would make me a valuable addition to your team. I am eager to apply my skills in a professional environment and to learn from experienced marketers at your company.</p>
                      
                      <p className="mb-8">Thank you for considering my application. I look forward to the opportunity to discuss how my skills and experiences align with the needs of your company.</p>
                      
                      <p>Sincerely,</p>
                      <p>John Doe</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper components and functions
const DocumentTypeIcon: React.FC<{ type: string; size?: number }> = ({ type, size = 5 }) => {
  switch (type) {
    case 'essay':
      return <FileText className={`h-${size} w-${size} text-blue-600`} />;
    case 'resume':
      return <FileText className={`h-${size} w-${size} text-teal-600`} />;
    case 'academic':
      return <FileText className={`h-${size} w-${size} text-purple-600`} />;
    case 'cover-letter':
      return <FileText className={`h-${size} w-${size} text-amber-600`} />;
    default:
      return <FileText className={`h-${size} w-${size} text-gray-600`} />;
  }
};

const formatDate = (date: Date): string => {
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) {
    return 'Today at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (diffInDays === 1) {
    return 'Yesterday at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (diffInDays < 7) {
    return diffInDays + ' days ago';
  } else {
    return date.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
  }
};

const X: React.FC<{ className?: string }> = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18M6 6l12 12"></path>
  </svg>
);

export default DocumentHistory;