import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeadset, FaEnvelope, FaPhone, FaQuestionCircle, FaTicketAlt, FaArrowRight } from 'react-icons/fa';

const SupportPage: React.FC = () => {
  const navigate = useNavigate();
  const [ticketForm, setTicketForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'medium',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Here you would typically send the ticket to your backend
      console.log('Ticket submitted:', ticketForm);
      // Show success message and redirect
      alert('Support ticket submitted successfully!');
      navigate('/help');
    } catch (error) {
      console.error('Error submitting ticket:', error);
      alert('Error submitting ticket. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTicketForm(prev => ({ ...prev, [name]: value }));
  };

  const handleLiveChat = () => {
    // Implement live chat functionality
    window.open('https://chat.docugenius.com', '_blank');
  };

  const handleEmailSupport = () => {
    window.location.href = 'mailto:support@docugenius.com';
  };

  const handlePhoneSupport = () => {
    window.location.href = 'tel:+15551234567';
  };

  const faqItems = [
    {
      question: 'How do I reset my password?',
      answer: 'Click on the "Forgot Password" link on the login page and follow the instructions sent to your email.',
      link: '/help/password-reset',
    },
    {
      question: 'What file formats are supported?',
      answer: 'We support PDF, DOCX, and HTML formats for both import and export.',
      link: '/help/supported-formats',
    },
    {
      question: 'How do I cancel my subscription?',
      answer: 'You can cancel your subscription from the Settings page under the Subscription section.',
      link: '/help/subscription',
    },
    {
      question: 'Is there a mobile app available?',
      answer: 'Yes, our mobile app is available for both iOS and Android devices.',
      link: '/help/mobile-app',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Support Center</h1>
        <p className="text-lg text-gray-600 text-center mb-12">
          We're here to help you with any questions or issues
        </p>

        {/* Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <FaHeadset className="w-8 h-8 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Live Chat</h3>
            <p className="text-gray-600 mb-4">Available 24/7</p>
            <button
              onClick={handleLiveChat}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Start Chat
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <FaEnvelope className="w-8 h-8 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Email Support</h3>
            <p className="text-gray-600 mb-4">support@docugenius.com</p>
            <button
              onClick={handleEmailSupport}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Send Email
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <FaPhone className="w-8 h-8 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Phone Support</h3>
            <p className="text-gray-600 mb-4">+1 (555) 123-4567</p>
            <button
              onClick={handlePhoneSupport}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Call Now
            </button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <FaQuestionCircle className="w-6 h-6 text-blue-500 mr-2" />
              <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            </div>
            <Link
              to="/help"
              className="text-blue-500 hover:text-blue-600 flex items-center"
            >
              View all FAQs
              <FaArrowRight className="ml-2" />
            </Link>
          </div>
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="block border-b border-gray-200 pb-4 hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
                <p className="text-gray-600">{item.answer}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Support Ticket Form */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center mb-6">
            <FaTicketAlt className="w-6 h-6 text-blue-500 mr-2" />
            <h2 className="text-2xl font-bold">Submit a Support Ticket</h2>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={ticketForm.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={ticketForm.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={ticketForm.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                value={ticketForm.priority}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={ticketForm.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Submit Ticket
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SupportPage; 