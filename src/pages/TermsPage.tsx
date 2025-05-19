import React, { useState } from 'react';

const TermsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'terms' | 'privacy'>('terms');

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Legal Information</h1>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-lg border border-gray-200 p-1">
            <button
              onClick={() => setActiveTab('terms')}
              className={`px-6 py-2 rounded-md ${
                activeTab === 'terms'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Terms of Service
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`px-6 py-2 rounded-md ${
                activeTab === 'privacy'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Privacy Policy
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {activeTab === 'terms' ? (
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-bold mb-4">Terms of Service</h2>
                <p className="text-gray-600 mb-4">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">1. Acceptance of Terms</h3>
                  <p className="text-gray-600">
                    By accessing and using DocuGenius, you agree to be bound by these Terms of Service
                    and all applicable laws and regulations.
                  </p>

                  <h3 className="text-xl font-semibold">2. Use License</h3>
                  <p className="text-gray-600">
                    Permission is granted to temporarily use DocuGenius for personal, non-commercial
                    transitory viewing only.
                  </p>

                  <h3 className="text-xl font-semibold">3. User Account</h3>
                  <p className="text-gray-600">
                    You are responsible for maintaining the confidentiality of your account and
                    password.
                  </p>

                  <h3 className="text-xl font-semibold">4. Service Modifications</h3>
                  <p className="text-gray-600">
                    DocuGenius reserves the right to modify or discontinue the service at any time
                    without notice.
                  </p>
                </div>
              </section>
            </div>
          ) : (
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
                <p className="text-gray-600 mb-4">
                  Last updated: {new Date().toLocaleDateString()}
                </p>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">1. Information We Collect</h3>
                  <p className="text-gray-600">
                    We collect information that you provide directly to us, including your name,
                    email address, and any other information you choose to provide.
                  </p>

                  <h3 className="text-xl font-semibold">2. How We Use Your Information</h3>
                  <p className="text-gray-600">
                    We use the information we collect to provide, maintain, and improve our services,
                    to communicate with you, and to protect our users.
                  </p>

                  <h3 className="text-xl font-semibold">3. Information Sharing</h3>
                  <p className="text-gray-600">
                    We do not share your personal information with third parties except as described
                    in this privacy policy.
                  </p>

                  <h3 className="text-xl font-semibold">4. Data Security</h3>
                  <p className="text-gray-600">
                    We implement appropriate technical and organizational measures to protect your
                    personal information.
                  </p>
                </div>
              </section>
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-gray-600">
          <p>
            If you have any questions about our Terms of Service or Privacy Policy, please{' '}
            <button
              onClick={() => window.location.href = '/contact'}
              className="text-blue-500 hover:text-blue-600"
            >
              contact us
            </button>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsPage; 