
import React from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Image } from 'lucide-react';

interface DailyTipProps {
  tip: {
    title: string;
    content: string;
    category: string;
    image?: string;
  };
}

const DailyTip: React.FC<DailyTipProps> = ({ tip }) => {
  return (
    <Card className="pregbuddy-card animate-fade-in">
      <div className="flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <h3 className="pregbuddy-heading">{tip.title}</h3>
          <span className="text-xs font-medium px-3 py-1 bg-pregbuddy-light text-pregbuddy-dark rounded-full">
            {tip.category}
          </span>
        </div>
        
        {tip.image ? (
          <div className="w-full h-40 overflow-hidden rounded-lg my-2">
            <img 
              src={tip.image} 
              alt={tip.title} 
              className="w-full h-full object-cover" 
              loading="lazy"
            />
          </div>
        ) : (
          <div className="w-full h-40 overflow-hidden rounded-lg my-2 bg-gray-100 flex items-center justify-center">
            <Image className="w-12 h-12 text-gray-300" />
          </div>
        )}
        
        <p className="text-gray-600">{tip.content}</p>
        
        <button className="text-pregbuddy-dark font-medium flex items-center mt-1">
          Read more
          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </Card>
  );
};

export default DailyTip;
