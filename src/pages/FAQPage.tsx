import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'How does the essay generator work?',
    answer: 'Our essay generator uses advanced AI technology to help you create well-structured essays. Simply input your topic, requirements, and any specific points you want to include. The AI will generate a draft that you can then edit and customize to your needs.',
  },
  {
    question: 'What file formats can I export my documents in?',
    answer: 'You can export your documents in multiple formats including PDF, DOCX, and TXT. Premium users also have access to additional formats like HTML and RTF.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes, we take data security very seriously. All your documents and personal information are encrypted and stored securely. We never share your data with third parties without your explicit consent.',
  },
  {
    question: 'Can I cancel my subscription at any time?',
    answer: 'Yes, you can cancel your subscription at any time. If you cancel, you\'ll still have access to your plan until the end of your current billing period.',
  },
  {
    question: 'How do I get support if I have issues?',
    answer: 'We offer multiple support channels including email support, live chat (for Pro users), and a comprehensive help center. You can also reach out to our community forum for peer support.',
  },
  {
    question: 'What\'s the difference between Free and Pro plans?',
    answer: 'The Free plan includes basic features like standard essay generation and limited document history. The Pro plan offers advanced features, unlimited document history, priority support, and access to premium templates.',
  },
];

const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about DocuGenius
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                {openIndex === index ? (
                  <FaChevronUp className="text-gray-500" />
                ) : (
                  <FaChevronDown className="text-gray-500" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-50">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-8">
            Can't find the answer you're looking for? Please chat with our friendly team.
          </p>
          <button
            onClick={() => window.location.href = '/contact'}
            className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQPage; 