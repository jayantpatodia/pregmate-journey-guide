import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { usePregnancy, Language } from '@/context/PregnancyContext';
import { useNavigate } from 'react-router-dom';
import { Calendar, Bell, Settings, CreditCard, HelpCircle, User, Globe } from 'lucide-react';

const Profile = () => {
  const { userData, updateUserData } = usePregnancy();
  const navigate = useNavigate();
  
  const languages: Language[] = [
    'English',
    'Hindi',
    'Tamil',
    'Telugu',
    'Bengali',
    'Marathi'
  ];
  
  const handleLanguageChange = (language: Language) => {
    updateUserData({ language });
  };

  return (
    <div className="pb-20 pt-6 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-pregbuddy-dark">My Profile</h1>
        <p className="text-gray-500">View and manage your account</p>
      </div>
      
      {/* User info */}
      <Card className="pregbuddy-card mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-pregbuddy-primary/20 flex items-center justify-center">
            <User className="text-pregbuddy-dark h-6 w-6" />
          </div>
          <div>
            <h3 className="font-medium text-pregbuddy-dark">{userData.name}</h3>
            <p className="text-gray-500 text-sm">Due date: {userData.dueDate?.toLocaleDateString()}</p>
          </div>
        </div>
        
        <div className="mt-4">
          <Button 
            variant="outline" 
            className="w-full rounded-full border-pregbuddy-primary text-pregbuddy-dark"
          >
            Edit Profile
          </Button>
        </div>
      </Card>
      
      {/* Subscription */}
      <Card className="pregbuddy-card mb-6">
        <h3 className="font-medium text-pregbuddy-dark mb-2">Your Subscription</h3>
        {userData.isTrialActive ? (
          <div>
            <p className="text-gray-600 mb-4">
              You're on a free trial - {userData.trialDaysLeft} days remaining
            </p>
            <Button className="pregbuddy-button w-full">
              Subscribe Now
            </Button>
          </div>
        ) : userData.isSubscribed ? (
          <div>
            <div className="bg-pregbuddy-primary/20 p-3 rounded-lg mb-4">
              <p className="text-pregbuddy-dark font-medium">Full Access Subscription</p>
              <p className="text-sm text-gray-600">Next billing: June 17, 2025</p>
            </div>
            <Button 
              variant="outline" 
              className="w-full rounded-full border-pregbuddy-primary text-pregbuddy-dark"
            >
              Manage Subscription
            </Button>
          </div>
        ) : (
          <div>
            <p className="text-gray-600 mb-4">
              Your trial has ended. Subscribe to continue accessing premium features.
            </p>
            <Button className="pregbuddy-button w-full">
              Subscribe Now
            </Button>
          </div>
        )}
      </Card>
      
      {/* Settings */}
      <Card className="pregbuddy-card mb-6">
        <h3 className="font-medium text-pregbuddy-dark mb-3">Settings</h3>
        
        <div className="space-y-4">
          {/* Language */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-5 h-5 text-pregbuddy-dark" />
              <h4 className="font-medium">Language</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <button
                  key={lang}
                  className={`px-3 py-1 text-sm rounded-full transition ${
                    userData.language === lang
                      ? 'bg-pregbuddy-dark text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => handleLanguageChange(lang)}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
          
          {/* Notifications */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-pregbuddy-dark" />
              <h4 className="font-medium">Notifications</h4>
            </div>
            <Switch defaultChecked />
          </div>
          
          {/* Other settings items */}
          <button className="flex items-center gap-2 w-full">
            <Calendar className="w-5 h-5 text-pregbuddy-dark" />
            <span className="font-medium">Calendar Sync</span>
          </button>
          
          <button className="flex items-center gap-2 w-full">
            <CreditCard className="w-5 h-5 text-pregbuddy-dark" />
            <span className="font-medium">Payment Methods</span>
          </button>
          
          <button className="flex items-center gap-2 w-full">
            <Settings className="w-5 h-5 text-pregbuddy-dark" />
            <span className="font-medium">App Settings</span>
          </button>
          
          <button className="flex items-center gap-2 w-full">
            <HelpCircle className="w-5 h-5 text-pregbuddy-dark" />
            <span className="font-medium">Help & Support</span>
          </button>
        </div>
      </Card>
      
      {/* About */}
      <div className="text-center">
        <p className="text-xs text-gray-400">PregBuddy v1.0.0</p>
        <p className="text-xs text-gray-400 mt-1">© 2025 PregBuddy. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Profile;
