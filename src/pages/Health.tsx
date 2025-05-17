
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Activity, Award } from 'lucide-react';

// Sample exercise data
const exercises = [
  {
    id: 1,
    title: 'Morning Stretches',
    duration: '1 min',
    target: 'Morning sickness relief',
    steps: [
      'Stand with feet hip-width apart',
      'Raise arms slowly above head',
      'Take 3 deep breaths',
      'Gently bend side to side',
      'Release arms and relax'
    ]
  },
  {
    id: 2,
    title: 'Pelvic Floor Exercise',
    duration: '1 min',
    target: 'Strengthen pelvic muscles',
    steps: [
      'Sit comfortably or lie down',
      'Contract pelvic floor muscles (as if stopping urine flow)',
      'Hold for 5 seconds',
      'Release for 5 seconds',
      'Repeat 10 times'
    ]
  },
  {
    id: 3,
    title: 'Deep Breathing',
    duration: '1 min',
    target: 'Stress reduction',
    steps: [
      'Sit comfortably with back supported',
      'Place hands on belly',
      'Inhale deeply through nose for 4 counts',
      'Hold breath for 1 count',
      'Exhale slowly through mouth for 6 counts',
      'Repeat for 1 minute'
    ]
  }
];

// Sample live sessions
const liveSessions = [
  {
    id: 1,
    title: 'Prenatal Yoga Basics',
    instructor: 'Dr. Anjali Sharma',
    time: 'Today, 5:00 PM',
    duration: '30 min',
    spots: '5 spots left'
  },
  {
    id: 2,
    title: 'Nutrition Q&A',
    instructor: 'Nutritionist Priya Patel',
    time: 'Tomorrow, 10:00 AM',
    duration: '45 min',
    spots: '12 spots left'
  }
];

const Health = () => {
  const [activeExercise, setActiveExercise] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [exerciseComplete, setExerciseComplete] = useState(false);
  
  const startExercise = (id: number) => {
    setActiveExercise(id);
    setCurrentStep(0);
    setExerciseComplete(false);
  };
  
  const nextStep = () => {
    if (activeExercise === null) return;
    
    const exercise = exercises.find(ex => ex.id === activeExercise);
    if (!exercise) return;
    
    if (currentStep < exercise.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setExerciseComplete(true);
    }
  };
  
  const finishExercise = () => {
    setActiveExercise(null);
    setCurrentStep(0);
    setExerciseComplete(false);
  };
  
  return (
    <div className="pb-20 pt-6 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-pregbuddy-dark">Exercise & Wellness</h1>
        <p className="text-gray-500">Stay active and healthy during pregnancy</p>
      </div>
      
      {/* 1-Minute Workouts */}
      <div className="mb-6">
        <h2 className="pregbuddy-heading mb-3">1-Minute Workouts</h2>
        
        {activeExercise === null ? (
          <div className="space-y-3">
            {exercises.map((exercise) => (
              <Card key={exercise.id} className="pregbuddy-card">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-pregbuddy-dark">{exercise.title}</h3>
                    <p className="text-sm text-gray-500">{exercise.duration} • {exercise.target}</p>
                  </div>
                  <Button 
                    onClick={() => startExercise(exercise.id)} 
                    className="pregbuddy-button-secondary"
                  >
                    Start
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="pregbuddy-card">
            {exerciseComplete ? (
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-pregbuddy-primary/20 flex items-center justify-center mb-4">
                  <Award className="text-pregbuddy-dark h-8 w-8" />
                </div>
                <h3 className="font-medium text-pregbuddy-dark text-xl mb-1">Great Job!</h3>
                <p className="text-gray-500 mb-4">You've completed your exercise</p>
                <div className="w-full">
                  <Button 
                    onClick={finishExercise}
                    className="pregbuddy-button w-full"
                  >
                    Done
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                {exercises.filter(ex => ex.id === activeExercise).map(exercise => (
                  <div key={exercise.id}>
                    <h3 className="font-medium text-pregbuddy-dark text-center mb-1">{exercise.title}</h3>
                    <p className="text-sm text-gray-500 text-center mb-6">Step {currentStep + 1} of {exercise.steps.length}</p>
                    
                    <div className="flex items-center justify-center my-6">
                      <div className="w-24 h-24 rounded-full bg-pregbuddy-light flex items-center justify-center">
                        <Activity className="text-pregbuddy-dark h-10 w-10" />
                      </div>
                    </div>
                    
                    <div className="bg-pregbuddy-light p-4 rounded-lg mb-6">
                      <p className="text-center font-medium">{exercise.steps[currentStep]}</p>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button 
                        onClick={finishExercise} 
                        variant="outline"
                        className="rounded-full"
                      >
                        Exit
                      </Button>
                      <Button 
                        onClick={nextStep}
                        className="pregbuddy-button"
                      >
                        {currentStep === exercise.steps.length - 1 ? 'Complete' : 'Next Step'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}
      </div>
      
      {/* Live Sessions */}
      <div className="mb-6">
        <h2 className="pregbuddy-heading mb-3">Upcoming Live Sessions</h2>
        <div className="space-y-3">
          {liveSessions.map((session) => (
            <Card key={session.id} className="pregbuddy-card">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium text-pregbuddy-dark">{session.title}</h3>
                  <p className="text-sm text-gray-600">{session.instructor}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-xs px-2 py-1 bg-pregbuddy-light text-pregbuddy-dark rounded-full">
                      {session.time}
                    </span>
                    <span className="text-xs px-2 py-1 bg-pregbuddy-secondary/30 text-pregbuddy-dark rounded-full">
                      {session.duration}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end justify-between">
                  <span className="text-xs text-pregbuddy-dark">{session.spots}</span>
                  <Button 
                    className="pregbuddy-button mt-2"
                  >
                    Join
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Health;
