import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FileText, FileEdit, BookOpen, Scroll, ArrowRight, Award, Clock, Lock } from 'lucide-react';

const HomePage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <FileEdit className="h-10 w-10 text-blue-600" />,
      title: 'Essay Generator',
      description: 'Generate well-structured essays on any topic with customizable parameters for tone, style, and academic level.',
      link: '/essay-generator'
    },
    {
      icon: <Scroll className="h-10 w-10 text-teal-600" />,
      title: 'Resume Builder',
      description: 'Create professional resumes with modern templates that highlight your skills and experience in the best light.',
      link: '/resume-builder'
    },
    {
      icon: <BookOpen className="h-10 w-10 text-purple-600" />,
      title: 'Academic Papers',
      description: 'Format research papers, lab reports, and other academic documents according to standard citation styles.',
      link: '#'
    }
  ];

  const benefits = [
    {
      icon: <Clock className="h-8 w-8 text-blue-500" />,
      title: 'Save Time',
      description: 'Reduce hours of writing and formatting to minutes with AI-powered generation.'
    },
    {
      icon: <Award className="h-8 w-8 text-teal-500" />,
      title: 'Improve Quality',
      description: 'Get suggestions and enhancements that elevate the quality of your writing.'
    },
    {
      icon: <Lock className="h-8 w-8 text-purple-500" />,
      title: 'Secure & Private',
      description: 'Your documents remain private and secure with advanced encryption.'
    }
  ];

  return (
    <div className={`transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 pt-20 pb-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Your AI Writing Assistant for 
                <span className="text-blue-600"> Academic Success</span>
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Generate essays, create resumes, and format academic papers with our AI-powered tool designed specifically for students.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link 
                  to="/essay-generator" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <a 
                  href="#features" 
                  className="inline-flex items-center justify-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors duration-200"
                >
                  Learn More
                </a>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="relative mx-auto max-w-md">
                <div className="bg-white rounded-xl shadow-xl overflow-hidden transform rotate-3 border-4 border-white">
                  <div className="bg-gray-100 p-2 flex items-center">
                    <div className="flex space-x-1.5">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div className="mx-auto text-sm text-gray-500">Essay Generator</div>
                  </div>
                  <div className="p-6">
                    <div className="h-48 bg-gray-50 rounded mb-4 p-4">
                      <div className="w-full h-4 bg-gray-200 rounded mb-3"></div>
                      <div className="w-5/6 h-4 bg-gray-200 rounded mb-3"></div>
                      <div className="w-full h-4 bg-gray-200 rounded mb-3"></div>
                      <div className="w-3/4 h-4 bg-gray-200 rounded mb-3"></div>
                      <div className="w-full h-4 bg-gray-200 rounded mb-3"></div>
                      <div className="w-4/5 h-4 bg-gray-200 rounded"></div>
                    </div>
                    <div className="flex justify-end">
                      <div className="px-4 py-2 bg-blue-600 text-white text-sm rounded">Generate</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg overflow-hidden transform -rotate-3 border-4 border-white w-5/6 opacity-60 z-0">
                  <div className="bg-gray-100 p-2"></div>
                  <div className="p-6">
                    <div className="h-32 bg-gray-50 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Powerful Document Creation Tools</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform offers everything students need to create professional documents for academic and career success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2"
              >
                <div className="p-8">
                  <div className="mb-5">{feature.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-6">{feature.description}</p>
                  <Link 
                    to={feature.link} 
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Try it now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose DocuGenius?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform is designed specifically for students, with features that help you succeed in your academic journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to transform your academic writing?</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto opacity-90">
            Join thousands of students who are saving time and improving their grades with DocuGenius.
          </p>
          <Link 
            to="/essay-generator" 
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200"
          >
            Get Started for Free
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;