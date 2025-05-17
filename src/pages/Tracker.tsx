
import React, { useState } from 'react';
import TrackingCard from '@/components/TrackingCard';
import SymptomCard, { Symptom } from '@/components/SymptomCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

// Sample symptoms
const symptoms: Symptom[] = [
  {
    id: 1,
    name: 'Morning Sickness',
    icon: '🤢',
    advice: [
      'Eat small, frequent meals',
      'Avoid strong odors',
      'Try ginger tea or candies',
      'Consult doctor if severe'
    ],
    severity: 'moderate'
  },
  {
    id: 2,
    name: 'Backache',
    icon: '🔄',
    advice: [
      'Practice good posture',
      'Use heating pads',
      'Gentle stretching exercises',
      'Avoid heavy lifting'
    ],
    severity: 'mild'
  },
  {
    id: 3,
    name: 'Headache',
    icon: '🤕',
    advice: [
      'Rest in a dark room',
      'Stay hydrated',
      'Practice relaxation techniques',
      'Contact doctor if severe or persistent'
    ],
    severity: 'mild'
  },
  {
    id: 4,
    name: 'Fatigue',
    icon: '😴',
    advice: [
      'Take short naps when possible',
      'Prioritize sleep',
      'Light exercise for energy',
      'Eat iron-rich foods'
    ],
    severity: 'moderate'
  }
];

const Tracker = () => {
  const { toast } = useToast();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSymptom, setSelectedSymptom] = useState<Symptom | null>(null);
  const [trackingDialogOpen, setTrackingDialogOpen] = useState(false);
  const [trackingType, setTrackingType] = useState<string>('');
  const [trackingValue, setTrackingValue] = useState<string>('');
  
  // Sample tracking data
  const [trackingData, setTrackingData] = useState({
    weight: { value: 65, unit: 'kg', timestamp: '2 days ago', icon: '⚖️' },
    bloodPressure: { value: '110/70', unit: 'mmHg', timestamp: 'Yesterday', icon: '❤️' },
    water: { value: 6, unit: 'glasses', timestamp: 'Today', icon: '💧' },
    sleep: { value: 7.5, unit: 'hours', timestamp: 'Today', icon: '🛌' },
  });

  const handleSymptomClick = (symptom: Symptom) => {
    setSelectedSymptom(symptom);
    setOpenDialog(true);
  };

  const handleTrackingClick = (type: string) => {
    setTrackingType(type);
    setTrackingValue(trackingData[type as keyof typeof trackingData].value.toString());
    setTrackingDialogOpen(true);
  };

  const handleTrackingSave = () => {
    if (trackingType && trackingValue) {
      setTrackingData(prev => ({
        ...prev,
        [trackingType]: {
          ...prev[trackingType as keyof typeof prev],
          value: trackingValue,
          timestamp: 'Just now'
        }
      }));
      
      setTrackingDialogOpen(false);
      toast({
        title: "Tracking Updated",
        description: `Your ${trackingType} has been updated successfully.`,
      });
    }
  };

  return (
    <div className="pb-20 pt-6 px-4">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-pregbuddy-dark">Health Tracker</h1>
        <p className="text-gray-500">Monitor your pregnancy journey</p>
      </div>
      
      {/* Vital tracking section */}
      <div className="mb-6">
        <h2 className="pregbuddy-heading mb-3">Your Vitals</h2>
        <div className="grid grid-cols-2 gap-3">
          <TrackingCard
            title="Weight"
            value={trackingData.weight.value}
            unit={trackingData.weight.unit}
            icon={trackingData.weight.icon}
            timestamp={trackingData.weight.timestamp}
            onClick={() => handleTrackingClick('weight')}
          />
          <TrackingCard
            title="Blood Pressure"
            value={trackingData.bloodPressure.value}
            unit={trackingData.bloodPressure.unit}
            icon={trackingData.bloodPressure.icon}
            timestamp={trackingData.bloodPressure.timestamp}
            onClick={() => handleTrackingClick('bloodPressure')}
          />
          <TrackingCard
            title="Water Intake"
            value={trackingData.water.value}
            unit={trackingData.water.unit}
            icon={trackingData.water.icon}
            timestamp={trackingData.water.timestamp}
            onClick={() => handleTrackingClick('water')}
          />
          <TrackingCard
            title="Sleep"
            value={trackingData.sleep.value}
            unit={trackingData.sleep.unit}
            icon={trackingData.sleep.icon}
            timestamp={trackingData.sleep.timestamp}
            onClick={() => handleTrackingClick('sleep')}
          />
        </div>
      </div>
      
      {/* Symptoms section */}
      <div className="mb-6">
        <h2 className="pregbuddy-heading mb-3">Common Symptoms</h2>
        <div className="space-y-3">
          {symptoms.map(symptom => (
            <div key={symptom.id} onClick={() => handleSymptomClick(symptom)}>
              <SymptomCard symptom={symptom} />
            </div>
          ))}
        </div>
      </div>
      
      {/* Symptom dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="text-xl">{selectedSymptom?.icon}</span>
              {selectedSymptom?.name}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-pregbuddy-light p-4 rounded-lg">
              <h3 className="font-medium mb-2">Helpful advice:</h3>
              <ul className="list-disc pl-5 space-y-1">
                {selectedSymptom?.advice.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
            
            <div className="text-sm text-gray-500">
              <p className="mb-1">Track this symptom over time:</p>
              <Button 
                variant="outline" 
                className="w-full rounded-full border-pregbuddy-primary text-pregbuddy-dark"
              >
                Log Symptom
              </Button>
            </div>
            
            {selectedSymptom?.severity === 'severe' && (
              <div className="bg-red-50 p-3 rounded-lg text-sm text-red-700">
                This symptom may require medical attention. Please consult your healthcare provider.
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Tracking dialog */}
      <Dialog open={trackingDialogOpen} onOpenChange={setTrackingDialogOpen}>
        <DialogContent className="rounded-2xl">
          <DialogHeader>
            <DialogTitle>Update {trackingType}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Input
                type={trackingType === 'sleep' || trackingType === 'weight' ? 'number' : 'text'}
                value={trackingValue}
                onChange={(e) => setTrackingValue(e.target.value)}
                className="rounded-full"
              />
              <span className="text-gray-500">
                {trackingType && trackingData[trackingType as keyof typeof trackingData].unit}
              </span>
            </div>
            
            <Button onClick={handleTrackingSave} className="w-full pregbuddy-button">
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tracker;
