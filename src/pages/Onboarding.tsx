
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePregnancy, PregnancyGoal, Language } from '@/context/PregnancyContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

const Onboarding = () => {
  const navigate = useNavigate();
  const { updateUserData, setOnboarded } = usePregnancy();
  const [currentStep, setCurrentStep] = useState(0);
  const [name, setName] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [language, setLanguage] = useState<Language>('English');
  const [selectedGoals, setSelectedGoals] = useState<PregnancyGoal[]>([]);
  
  const goals: PregnancyGoal[] = [
    'Normal Delivery',
    'Weight Management',
    'Increase Hemoglobin',
    'Manage Morning Sickness',
    'Stress Reduction'
  ];
  
  const languages: Language[] = [
    'English',
    'Hindi',
    'Tamil',
    'Telugu',
    'Bengali',
    'Marathi'
  ];

  const handleGoalToggle = (goal: PregnancyGoal) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter(g => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeOnboarding = () => {
    // Calculate currentWeek from due date
    const today = new Date();
    const dueDateObj = new Date(dueDate);
    
    // Pregnancy is typically 40 weeks
    const diffTime = dueDateObj.getTime() - today.getTime();
    const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
    const currentWeek = 40 - diffWeeks;

    updateUserData({
      name,
      dueDate: dueDateObj,
      currentWeek: Math.max(1, Math.min(40, currentWeek)),
      language,
      goals: selectedGoals,
      isTrialActive: true,
      trialDaysLeft: 14,
      isSubscribed: false
    });
    
    setOnboarded(true);
    navigate('/');
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-center text-pregbuddy-dark">Welcome to PregBuddy</h2>
            <p className="text-center text-gray-500">Let's personalize your pregnancy journey</p>
            <div className="space-y-3 mt-6">
              <Label htmlFor="name">What should we call you?</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-full"
              />
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-center text-pregbuddy-dark">Your Due Date</h2>
            <p className="text-center text-gray-500">This helps us personalize your journey</p>
            <div className="space-y-3 mt-6">
              <Label htmlFor="due-date">When is your baby due?</Label>
              <Input
                id="due-date"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="rounded-full"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-center text-pregbuddy-dark">Language Preference</h2>
            <p className="text-center text-gray-500">Choose your preferred language</p>
            <div className="space-y-3 mt-6">
              <Label htmlFor="language">Select a language</Label>
              <Select
                value={language}
                onValueChange={(value) => setLanguage(value as Language)}
              >
                <SelectTrigger className="rounded-full">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-center text-pregbuddy-dark">Your Pregnancy Goals</h2>
            <p className="text-center text-gray-500">Select what's important to you</p>
            <div className="space-y-3 mt-6">
              {goals.map((goal) => (
                <div key={goal} className="flex items-center space-x-2">
                  <Checkbox
                    id={goal}
                    checked={selectedGoals.includes(goal)}
                    onCheckedChange={() => handleGoalToggle(goal)}
                  />
                  <Label htmlFor={goal} className="cursor-pointer">{goal}</Label>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return name.trim().length > 0;
      case 1:
        return dueDate.trim().length > 0;
      case 2:
        return language !== null;
      case 3:
        return selectedGoals.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center items-center bg-pregbuddy-light/50 p-4">
      <Card className="w-full max-w-md p-6 rounded-3xl">
        {getStepContent()}
        
        <div className="mt-8 flex justify-between">
          {currentStep > 0 ? (
            <Button 
              variant="outline" 
              onClick={handleBack}
              className="rounded-full"
            >
              Back
            </Button>
          ) : (
            <div></div>
          )}
          
          <Button 
            onClick={handleNext}
            disabled={!canProceed()}
            className="pregbuddy-button"
          >
            {currentStep === 3 ? 'Complete' : 'Next'}
          </Button>
        </div>
        
        <div className="flex justify-center mt-6">
          {[0, 1, 2, 3].map((step) => (
            <div 
              key={step}
              className={`w-2 h-2 mx-1 rounded-full ${
                currentStep === step ? 'bg-pregbuddy-dark' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </Card>
      
      <p className="mt-6 text-xs text-gray-500 text-center">
        By continuing, you agree to our Terms of Service and Privacy Policy.
        <br />
        You'll start with a 14-day free trial.
      </p>
    </div>
  );
};

export default Onboarding;
