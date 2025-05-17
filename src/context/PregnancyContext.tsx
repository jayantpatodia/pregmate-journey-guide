
import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'English' | 'Hindi' | 'Tamil' | 'Telugu' | 'Bengali' | 'Marathi';

export type PregnancyGoal = 'Normal Delivery' | 'Weight Management' | 'Increase Hemoglobin' | 'Manage Morning Sickness' | 'Stress Reduction';

export type UserData = {
  name: string;
  dueDate: Date | null;
  currentWeek: number;
  language: Language;
  goals: PregnancyGoal[];
  isTrialActive: boolean;
  trialDaysLeft: number;
  isSubscribed: boolean;
};

type PregnancyContextType = {
  userData: UserData;
  isOnboarded: boolean;
  updateUserData: (data: Partial<UserData>) => void;
  setOnboarded: (value: boolean) => void;
  calculateProgress: () => { percentage: number; trimester: string };
};

const defaultUserData: UserData = {
  name: '',
  dueDate: null,
  currentWeek: 0,
  language: 'English',
  goals: [],
  isTrialActive: true,
  trialDaysLeft: 14,
  isSubscribed: false,
};

export const PregnancyContext = createContext<PregnancyContextType | undefined>(undefined);

export function PregnancyProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData>(defaultUserData);
  const [isOnboarded, setIsOnboarded] = useState<boolean>(false);

  const updateUserData = (data: Partial<UserData>) => {
    setUserData(prev => ({ ...prev, ...data }));
  };

  const calculateProgress = () => {
    if (!userData.dueDate) {
      return { percentage: 0, trimester: 'First Trimester' };
    }

    // Pregnancy is typically 40 weeks
    const totalDays = 40 * 7;
    const today = new Date();
    const dueDate = new Date(userData.dueDate);
    
    // Calculate days remaining
    const daysRemaining = Math.floor((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const daysPassed = totalDays - daysRemaining;
    
    // Calculate percentage
    const percentage = Math.min(100, Math.max(0, (daysPassed / totalDays) * 100));
    
    // Determine trimester
    let trimester = 'First Trimester';
    if (percentage >= 66.7) {
      trimester = 'Third Trimester';
    } else if (percentage >= 33.3) {
      trimester = 'Second Trimester';
    }
    
    return { percentage, trimester };
  };

  return (
    <PregnancyContext.Provider 
      value={{ 
        userData, 
        isOnboarded, 
        updateUserData, 
        setOnboarded, 
        calculateProgress 
      }}
    >
      {children}
    </PregnancyContext.Provider>
  );
}

export function usePregnancy() {
  const context = useContext(PregnancyContext);
  if (context === undefined) {
    throw new Error('usePregnancy must be used within a PregnancyProvider');
  }
  return context;
}
