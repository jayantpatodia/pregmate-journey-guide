
import React from 'react';
import { Card } from '@/components/ui/card';

export interface Symptom {
  id: number;
  name: string;
  icon: string;
  advice: string[];
  severity: 'mild' | 'moderate' | 'severe';
}

interface SymptomCardProps {
  symptom: Symptom;
}

const SymptomCard: React.FC<SymptomCardProps> = ({ symptom }) => {
  return (
    <Card className="pregbuddy-card cursor-pointer hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-3">
        <div className={`
          w-12 h-12 rounded-full flex items-center justify-center
          ${symptom.severity === 'mild' ? 'bg-pregbuddy-light' : 
            symptom.severity === 'moderate' ? 'bg-pregbuddy-secondary' : 'bg-red-100'}
        `}>
          <span className="text-xl">{symptom.icon}</span>
        </div>
        <div>
          <h3 className="font-medium text-pregbuddy-dark">{symptom.name}</h3>
          <p className="text-xs text-gray-500">Tap for advice</p>
        </div>
      </div>
    </Card>
  );
};

export default SymptomCard;
