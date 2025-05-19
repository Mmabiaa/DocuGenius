import React from 'react';
import { FaCheck } from 'react-icons/fa';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out our basic features',
    features: [
      'Basic essay generation',
      'Standard resume templates',
      'Limited document history',
      'Community support',
    ],
    buttonText: 'Get Started',
    buttonClass: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
  },
  {
    name: 'Pro',
    price: '$9.99',
    period: 'per month',
    description: 'Best for students and professionals',
    features: [
      'Advanced essay generation',
      'Premium resume templates',
      'Unlimited document history',
      'Priority support',
      'Custom templates',
      'Export to multiple formats',
    ],
    buttonText: 'Start Free Trial',
    buttonClass: 'bg-blue-500 text-white hover:bg-blue-600',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'per year',
    description: 'For organizations and institutions',
    features: [
      'All Pro features',
      'Custom integrations',
      'Dedicated support',
      'Team collaboration',
      'Advanced analytics',
      'API access',
    ],
    buttonText: 'Contact Sales',
    buttonClass: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
  },
];

const PricingPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Choose the perfect plan for your needs. All plans include a 14-day free trial.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`bg-white rounded-lg shadow-lg overflow-hidden ${
              plan.popular ? 'ring-2 ring-blue-500' : ''
            }`}
          >
            {plan.popular && (
              <div className="bg-blue-500 text-white text-center py-2 text-sm font-semibold">
                Most Popular
              </div>
            )}
            <div className="p-8">
              <h2 className="text-2xl font-bold mb-2">{plan.name}</h2>
              <div className="mb-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-600">/{plan.period}</span>
              </div>
              <p className="text-gray-600 mb-6">{plan.description}</p>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <FaCheck className="text-green-500 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-300 ${plan.buttonClass}`}
              >
                {plan.buttonText}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Need a custom solution?</h2>
        <p className="text-gray-600 mb-8">
          Contact our sales team for a tailored plan that fits your specific needs.
        </p>
        <button
          onClick={() => window.location.href = '/contact'}
          className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Contact Sales
        </button>
      </div>
    </div>
  );
};

export default PricingPage; 