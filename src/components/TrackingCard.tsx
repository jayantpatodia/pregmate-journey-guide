
import React from 'react';
import { Card } from '@/components/ui/card';

interface TrackingCardProps {
  title: string;
  value: string | number;
  unit: string;
  icon: string;
  timestamp?: string;
  onClick?: () => void;
}

const TrackingCard: React.FC<TrackingCardProps> = ({ title, value, unit, icon, timestamp, onClick }) => {
  return (
    <Card 
      className="pregbuddy-card cursor-pointer hover:shadow-lg transition-shadow"
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-pregbuddy-light flex items-center justify-center text-xl">
          {icon}
        </div>
        <div>
          <h3 className="font-medium text-pregbuddy-dark">{title}</h3>
          <div className="flex items-baseline">
            <span className="font-bold text-lg">{value}</span>
            <span className="text-xs text-gray-500 ml-1">{unit}</span>
          </div>
          {timestamp && <p className="text-xs text-gray-400">Last updated: {timestamp}</p>}
        </div>
      </div>
    </Card>
  );
};

export default TrackingCard;
