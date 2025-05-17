
import React from 'react';
import { Card } from '@/components/ui/card';

interface WeeklyUpdateProps {
  week: number;
  babySize: string;
  babyInfo: string;
  motherInfo: string;
}

const WeeklyUpdate: React.FC<WeeklyUpdateProps> = ({ week, babySize, babyInfo, motherInfo }) => {
  return (
    <Card className="pregbuddy-card overflow-hidden">
      <div className="flex flex-col">
        <div className="bg-pregbuddy-primary/20 -mx-5 -mt-5 mb-3 px-5 py-3">
          <h2 className="font-semibold text-xl text-pregbuddy-dark">Week {week}</h2>
        </div>
        
        <div className="flex items-center mb-4">
          <div className="bg-pregbuddy-light rounded-full p-3 mr-3">
            <span className="text-xl">👶</span>
          </div>
          <div>
            <h3 className="font-medium">Baby is the size of a {babySize}</h3>
            <p className="text-sm text-gray-600">{babyInfo}</p>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="bg-pregbuddy-secondary/50 rounded-full p-3 mr-3">
            <span className="text-xl">👩</span>
          </div>
          <div>
            <h3 className="font-medium">Mom's changes</h3>
            <p className="text-sm text-gray-600">{motherInfo}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WeeklyUpdate;
