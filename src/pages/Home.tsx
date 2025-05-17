
import React, { useEffect, useState } from 'react';
import ProgressRing from '@/components/ProgressRing';
import DailyTip from '@/components/DailyTip';
import WeeklyUpdate from '@/components/WeeklyUpdate';
import { usePregnancy } from '@/context/PregnancyContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

// Daily tips data
const dailyTips = [
  {
    title: 'Boost Your Iron Intake',
    content: 'Try adding spinach, beans and fortified grains to your diet. Pair with vitamin C-rich foods like orange juice to enhance absorption.',
    category: 'Nutrition',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'
  },
  {
    title: 'Stay Hydrated',
    content: 'Aim for 8-10 glasses of water daily to support increased blood volume and amniotic fluid. Add a slice of lemon for flavor!',
    category: 'Health',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'
  },
  {
    title: 'Gentle Morning Exercise',
    content: 'A 10-minute morning stretching routine can help reduce nausea and boost your energy for the day.',
    category: 'Exercise',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7'
  },
  {
    title: 'Connect with Your Baby',
    content: 'Take a few minutes each day to talk or sing to your baby. This bonding time is beneficial for both of you!',
    category: 'Wellbeing',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843'
  }
];

// Weekly data about baby development
const weeklyData = [
  { week: 8, babySize: 'raspberry', babyInfo: 'Baby\'s hands and feet are beginning to form.', motherInfo: 'You may experience morning sickness and fatigue.' },
  { week: 12, babySize: 'lime', babyInfo: 'Baby has developed all vital organs and is making small movements.', motherInfo: 'Your bump may start to show and nausea might improve.' },
  { week: 16, babySize: 'avocado', babyInfo: 'Baby can hear your voice now! Bones are getting stronger.', motherInfo: 'You might feel more energetic in your second trimester.' },
  { week: 20, babySize: 'banana', babyInfo: 'Baby is developing fingerprints and can suck their thumb.', motherInfo: 'You may start feeling the baby\'s movements.' },
  { week: 24, babySize: 'corn', babyInfo: 'Baby\'s face is fully formed with eyelashes, eyebrows, and hair.', motherInfo: 'Your belly button might start to protrude.' },
  { week: 28, babySize: 'eggplant', babyInfo: 'Baby\'s brain is developing rapidly and eyes can open and close.', motherInfo: 'You might experience backaches and trouble sleeping.' },
  { week: 32, babySize: 'squash', babyInfo: 'Baby is practicing breathing and has fingernails and toenails.', motherInfo: 'You may feel short of breath as your uterus expands.' },
  { week: 36, babySize: 'honeydew melon', babyInfo: 'Baby is gaining weight and preparing for birth.', motherInfo: 'You may feel pelvic pressure and have Braxton Hicks contractions.' },
  { week: 40, babySize: 'watermelon', babyInfo: 'Baby is fully developed and ready to meet you!', motherInfo: 'You\'re ready for delivery. Watch for signs of labor.' },
];

const Home = () => {
  const { userData, calculateProgress } = usePregnancy();
  const { toast } = useToast();
  const [dailyTip, setDailyTip] = useState(dailyTips[0]);
  const progress = calculateProgress();
  
  // Find the weekly update closest to the current week
  const weeklyUpdate = weeklyData.reduce((closest, current) => {
    return Math.abs(current.week - userData.currentWeek) < Math.abs(closest.week - userData.currentWeek)
      ? current
      : closest;
  }, weeklyData[0]);

  useEffect(() => {
    // Change daily tip randomly every 24 hours
    const randomTip = dailyTips[Math.floor(Math.random() * dailyTips.length)];
    setDailyTip(randomTip);
  }, []);

  const handleNewTip = () => {
    const randomTip = dailyTips.filter(tip => tip.title !== dailyTip.title)[
      Math.floor(Math.random() * (dailyTips.length - 1))
    ];
    setDailyTip(randomTip);
    toast({
      title: "New Tip Loaded",
      description: "Here's another helpful insight for your pregnancy journey!",
    });
  };

  return (
    <div className="pb-20 pt-6 px-4">
      {/* Welcome message with avatar */}
      <div className="mb-6 flex items-center">
        <Avatar className="h-12 w-12 mr-3 border-2 border-pregbuddy-primary">
          <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" alt={userData.name || 'Mom'} />
          <AvatarFallback className="bg-pregbuddy-primary text-white">
            {userData.name ? userData.name.charAt(0).toUpperCase() : 'M'}
          </AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-semibold text-pregbuddy-dark">
            Hi, {userData.name || 'Mom'}! 👋
          </h1>
          <p className="text-gray-500">Here's your pregnancy update for today</p>
        </div>
      </div>
      
      {/* Trial banner */}
      {userData.isTrialActive && (
        <div className="bg-pregbuddy-primary/30 rounded-xl p-3 mb-6">
          <p className="text-sm text-pregbuddy-dark">
            <span className="font-medium">
              Trial: {userData.trialDaysLeft} days left
            </span> - Enjoy full access to all features
          </p>
        </div>
      )}
      
      {/* Progress ring */}
      <div className="mb-6">
        <ProgressRing 
          percentage={progress.percentage}
          text={`Week ${userData.currentWeek}`}
          subText={progress.trimester}
        />
      </div>
      
      {/* Weekly update card */}
      <div className="mb-6">
        <h2 className="pregbuddy-heading mb-3">Baby's Development</h2>
        <WeeklyUpdate 
          week={weeklyUpdate.week}
          babySize={weeklyUpdate.babySize}
          babyInfo={weeklyUpdate.babyInfo}
          motherInfo={weeklyUpdate.motherInfo}
        />
      </div>
      
      {/* Daily tip */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h2 className="pregbuddy-heading">Today's Tip</h2>
          <Button 
            onClick={handleNewTip}
            variant="ghost" 
            className="text-pregbuddy-dark text-sm"
          >
            New Tip
          </Button>
        </div>
        <DailyTip tip={dailyTip} />
      </div>
    </div>
  );
};

export default Home;
