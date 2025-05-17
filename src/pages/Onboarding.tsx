
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePregnancy, PregnancyGoal, Language } from '@/context/PregnancyContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

const Onboarding = () => {
  const navigate = useNavigate();
  const { updateUserData, setOnboarded } = usePregnancy();
  const [currentStep, setCurrentStep] = useState(0);
  const [name, setName] = useState('');
  const [inputMethod, setInputMethod] = useState<'weeks' | 'date'>('weeks');
  const [pregnancyWeek, setPregnancyWeek] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
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
    let currentWeek: number;
    let dueDate: Date;
    
    if (inputMethod === 'weeks') {
      // If user entered pregnancy week
      currentWeek = parseInt(pregnancyWeek);
      
      // Calculate due date based on current week (40 weeks is full term)
      const today = new Date();
      const remainingWeeks = 40 - currentWeek;
      dueDate = new Date(today);
      dueDate.setDate(today.getDate() + (remainingWeeks * 7));
    } else {
      // If user selected due date
      dueDate = selectedDate as Date;
      
      // Calculate current week from due date
      const today = new Date();
      const diffTime = dueDate.getTime() - today.getTime();
      const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
      currentWeek = 40 - diffWeeks;
    }
    
    updateUserData({
      name,
      dueDate,
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
            <h2 className="text-2xl font-semibold text-center text-pregbuddy-dark">Your Pregnancy</h2>
            <p className="text-center text-gray-500">This helps us personalize your journey</p>
            
            <div className="space-y-3 mt-6">
              <div className="flex justify-between mb-4">
                <Button 
                  variant={inputMethod === 'weeks' ? "default" : "outline"}
                  onClick={() => setInputMethod('weeks')}
                  className="w-1/2 mr-2 rounded-full"
                >
                  I know my weeks
                </Button>
                <Button 
                  variant={inputMethod === 'date' ? "default" : "outline"}
                  onClick={() => setInputMethod('date')}
                  className="w-1/2 ml-2 rounded-full"
                >
                  I know my due date
                </Button>
              </div>
              
              {inputMethod === 'weeks' ? (
                <div className="space-y-3">
                  <Label htmlFor="pregnancy-week">How many weeks pregnant are you?</Label>
                  <Input
                    id="pregnancy-week"
                    type="number"
                    min="1"
                    max="40"
                    placeholder="Enter week (1-40)"
                    value={pregnancyWeek}
                    onChange={(e) => setPregnancyWeek(e.target.value)}
                    className="rounded-full"
                  />
                </div>
              ) : (
                <div className="space-y-3">
                  <Label htmlFor="due-date">When is your baby due?</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        id="due-date"
                        className={cn(
                          "w-full justify-start text-left font-normal rounded-full",
                          !selectedDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selectedDate ? format(selectedDate, "PPP") : <span>Select due date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                        disabled={(date) => {
                          // Can't pick dates in the past
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          return date < today;
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}
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
        return inputMethod === 'weeks' 
          ? pregnancyWeek && parseInt(pregnancyWeek) >= 1 && parseInt(pregnancyWeek) <= 40
          : selectedDate !== undefined;
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
