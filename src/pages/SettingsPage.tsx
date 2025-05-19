import React, { useState } from 'react';
import { Save, Moon, Sun, Globe, Bell, Lock, User, CreditCard, HelpCircle, LogOut } from 'lucide-react';

interface Settings {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    email: boolean;
    desktop: boolean;
    updates: boolean;
  };
  privacy: {
    saveHistory: boolean;
    analytics: boolean;
    autoSave: boolean;
  };
}

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    theme: 'system',
    language: 'en',
    notifications: {
      email: true,
      desktop: true,
      updates: true,
    },
    privacy: {
      saveHistory: true,
      analytics: true,
      autoSave: true,
    }
  });

  const [activeTab, setActiveTab] = useState<string>('appearance');
  const [isModified, setIsModified] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
    setSettings({ ...settings, theme });
    setIsModified(true);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSettings({ ...settings, language: e.target.value });
    setIsModified(true);
  };

  const handleNotificationChange = (key: keyof typeof settings.notifications, value: boolean) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: value
      }
    });
    setIsModified(true);
  };

  const handlePrivacyChange = (key: keyof typeof settings.privacy, value: boolean) => {
    setSettings({
      ...settings,
      privacy: {
        ...settings.privacy,
        [key]: value
      }
    });
    setIsModified(true);
  };

  const saveSettings = () => {
    setIsSaving(true);
    
    // Simulate API call to save settings
    setTimeout(() => {
      setIsSaving(false);
      setIsModified(false);
      setSaveSuccess(true);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1000);
  };

  const tabs = [
    { id: 'appearance', label: 'Appearance', icon: <Sun className="h-5 w-5" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="h-5 w-5" /> },
    { id: 'privacy', label: 'Privacy', icon: <Lock className="h-5 w-5" /> },
    { id: 'account', label: 'Account', icon: <User className="h-5 w-5" /> },
    { id: 'subscription', label: 'Subscription', icon: <CreditCard className="h-5 w-5" /> },
  ];

  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Settings</h1>
          <p className="text-lg text-gray-600">
            Customize your experience and manage your account preferences.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="md:w-64">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <nav className="p-4">
                <ul className="space-y-1">
                  {tabs.map((tab) => (
                    <li key={tab.id}>
                      <button
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                          activeTab === tab.id
                            ? 'bg-blue-50 text-blue-700'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <span className="mr-3">{tab.icon}</span>
                        <span className="font-medium">{tab.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <ul className="space-y-1">
                    <li>
                      <button className="w-full flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                        <HelpCircle className="h-5 w-5 mr-3" />
                        <span className="font-medium">Help & Support</span>
                      </button>
                    </li>
                    <li>
                      <button className="w-full flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors">
                        <LogOut className="h-5 w-5 mr-3" />
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>

          {/* Settings Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                {/* Appearance Settings */}
                {activeTab === 'appearance' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Appearance Settings</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-4">Theme</label>
                        <div className="flex flex-wrap gap-4">
                          <button
                            onClick={() => handleThemeChange('light')}
                            className={`flex flex-col items-center p-4 border rounded-lg transition-colors ${
                              settings.theme === 'light'
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-200 hover:border-gray-300 text-gray-700'
                            }`}
                          >
                            <Sun className="h-6 w-6 mb-2" />
                            <span>Light</span>
                          </button>
                          
                          <button
                            onClick={() => handleThemeChange('dark')}
                            className={`flex flex-col items-center p-4 border rounded-lg transition-colors ${
                              settings.theme === 'dark'
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-200 hover:border-gray-300 text-gray-700'
                            }`}
                          >
                            <Moon className="h-6 w-6 mb-2" />
                            <span>Dark</span>
                          </button>
                          
                          <button
                            onClick={() => handleThemeChange('system')}
                            className={`flex flex-col items-center p-4 border rounded-lg transition-colors ${
                              settings.theme === 'system'
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-200 hover:border-gray-300 text-gray-700'
                            }`}
                          >
                            <div className="h-6 w-6 mb-2 flex">
                              <Sun className="h-6 w-3 overflow-hidden" />
                              <Moon className="h-6 w-3 overflow-hidden" />
                            </div>
                            <span>System</span>
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                        <div className="relative w-full md:w-64">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Globe className="h-5 w-5 text-gray-400" />
                          </div>
                          <select
                            id="language"
                            value={settings.language}
                            onChange={handleLanguageChange}
                            className="appearance-none pl-10 pr-10 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="en">English</option>
                            <option value="fr">Français</option>
                            <option value="es">Español</option>
                            <option value="de">Deutsch</option>
                            <option value="zh">中文</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Notifications Settings */}
                {activeTab === 'notifications' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Notifications Settings</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label htmlFor="email-notifications" className="text-sm font-medium text-gray-700">Email Notifications</label>
                          <Switch 
                            id="email-notifications" 
                            checked={settings.notifications.email} 
                            onChange={(checked) => handleNotificationChange('email', checked)} 
                          />
                        </div>
                        <p className="text-sm text-gray-500">Receive email notifications about your document updates and account activity.</p>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label htmlFor="desktop-notifications" className="text-sm font-medium text-gray-700">Desktop Notifications</label>
                          <Switch 
                            id="desktop-notifications" 
                            checked={settings.notifications.desktop} 
                            onChange={(checked) => handleNotificationChange('desktop', checked)} 
                          />
                        </div>
                        <p className="text-sm text-gray-500">Receive desktop notifications when your documents are ready or when you receive feedback.</p>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label htmlFor="update-notifications" className="text-sm font-medium text-gray-700">Product Updates</label>
                          <Switch 
                            id="update-notifications" 
                            checked={settings.notifications.updates} 
                            onChange={(checked) => handleNotificationChange('updates', checked)} 
                          />
                        </div>
                        <p className="text-sm text-gray-500">Receive notifications about new features, improvements, and tips for using the platform.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Privacy Settings */}
                {activeTab === 'privacy' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Privacy Settings</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label htmlFor="save-history" className="text-sm font-medium text-gray-700">Save Document History</label>
                          <Switch 
                            id="save-history" 
                            checked={settings.privacy.saveHistory} 
                            onChange={(checked) => handlePrivacyChange('saveHistory', checked)} 
                          />
                        </div>
                        <p className="text-sm text-gray-500">Save your document history to access and edit previous documents.</p>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label htmlFor="analytics" className="text-sm font-medium text-gray-700">Usage Analytics</label>
                          <Switch 
                            id="analytics" 
                            checked={settings.privacy.analytics} 
                            onChange={(checked) => handlePrivacyChange('analytics', checked)} 
                          />
                        </div>
                        <p className="text-sm text-gray-500">Allow anonymized usage data collection to help us improve our services.</p>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label htmlFor="auto-save" className="text-sm font-medium text-gray-700">Auto-Save Documents</label>
                          <Switch 
                            id="auto-save" 
                            checked={settings.privacy.autoSave} 
                            onChange={(checked) => handlePrivacyChange('autoSave', checked)} 
                          />
                        </div>
                        <p className="text-sm text-gray-500">Automatically save your documents as you work to prevent data loss.</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Account Settings */}
                {activeTab === 'account' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          value="user@example.com"
                          readOnly
                          className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700 focus:outline-none"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          defaultValue="John Doe"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      
                      <div>
                        <button className="text-blue-600 hover:text-blue-800 transition-colors font-medium">
                          Change Password
                        </button>
                      </div>
                      
                      <div className="pt-6 border-t border-gray-200">
                        <button className="text-red-600 hover:text-red-800 transition-colors font-medium">
                          Delete Account
                        </button>
                        <p className="mt-1 text-sm text-gray-500">
                          This will permanently delete your account and all your data.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Subscription Settings */}
                {activeTab === 'subscription' && (
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-6">Subscription Settings</h2>
                    
                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <CreditCard className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-md font-medium text-gray-900">Free Plan</h3>
                          <p className="mt-1 text-sm text-gray-600">
                            You are currently on the Free plan with limited features.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <h3 className="text-lg font-medium text-gray-900">Upgrade to Premium</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-sm transition-all">
                          <h4 className="text-lg font-medium text-gray-900 mb-2">Monthly</h4>
                          <p className="text-3xl font-bold text-gray-900 mb-2">$9.99<span className="text-sm font-normal text-gray-500">/month</span></p>
                          <ul className="space-y-2 mb-6">
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span className="text-gray-600">Unlimited document generation</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span className="text-gray-600">Advanced formatting options</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span className="text-gray-600">Priority support</span>
                            </li>
                          </ul>
                          <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors">
                            Upgrade Now
                          </button>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-6 hover:border-blue-300 hover:shadow-sm transition-all relative">
                          <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">
                            Best Value
                          </div>
                          <h4 className="text-lg font-medium text-gray-900 mb-2">Annual</h4>
                          <p className="text-3xl font-bold text-gray-900 mb-2">$99.99<span className="text-sm font-normal text-gray-500">/year</span></p>
                          <p className="text-sm text-green-600 font-medium mb-2">Save $19.89 (17%)</p>
                          <ul className="space-y-2 mb-6">
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span className="text-gray-600">Unlimited document generation</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span className="text-gray-600">Advanced formatting options</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span className="text-gray-600">Priority support</span>
                            </li>
                            <li className="flex items-start">
                              <span className="text-green-500 mr-2">✓</span>
                              <span className="text-gray-600">Exclusive templates</span>
                            </li>
                          </ul>
                          <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors">
                            Choose Annual
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Save Button - Only show if settings have been modified */}
                {isModified && (
                  <div className="mt-8 flex items-center justify-end space-x-4">
                    <div className="flex-grow">
                      {saveSuccess && (
                        <div className="text-green-600 animate-fade-in-out">
                          Settings saved successfully!
                        </div>
                      )}
                    </div>
                    <button
                      onClick={saveSettings}
                      disabled={isSaving}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors flex items-center disabled:opacity-70"
                    >
                      {isSaving ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper components
interface SwitchProps {
  id: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({ id, checked, onChange }) => {
  return (
    <label htmlFor={id} className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        id={id}
        className="sr-only"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <div className={`w-11 h-6 rounded-full transition ${checked ? 'bg-blue-600' : 'bg-gray-200'}`}>
        <div 
          className={`absolute top-0.5 left-0.5 bg-white w-5 h-5 rounded-full transition-transform transform ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`} 
        />
      </div>
    </label>
  );
};

const ChevronDown: React.FC<{ className?: string }> = ({ className = "h-5 w-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

export default SettingsPage;