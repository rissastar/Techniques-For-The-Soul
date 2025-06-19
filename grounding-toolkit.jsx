import React, { useState, useEffect } from 'react';
import { Heart, Pause, Play, RotateCcw } from 'lucide-react';

const GroundingToolkit = () => {
  const today = new Date().toISOString().split('T')[0];
  const [activeExercise, setActiveExercise] = useState(null);
  const [completedToday, setCompletedToday] = useState([]);
  const [fiveToOneStep, setFiveToOneStep] = useState(0);
  const [breathingPhase, setBreathingPhase] = useState('inhale');
  const [breathingCount, setBreathingCount] = useState(4);
  const [breathingActive, setBreathingActive] = useState(false);
  const [muscleTensionStep, setMuscleTensionStep] = useState(0);
  const [boxBreathingPhase, setBoxBreathingPhase] = useState(0);
  const [boxBreathingActive, setBoxBreathingActive] = useState(false);

  const fiveToOneSteps = [
    { count: 5, sense: 'things you can SEE', icon: '👀', prompt: 'Look around and name 5 things you can see…' },
    { count: 4, sense: 'things you can TOUCH', icon: '✋', prompt: 'Notice 4 things you can touch or feel…' },
    { count: 3, sense: 'things you can HEAR', icon: '👂', prompt: 'Listen for 3 sounds around you…' },
    { count: 2, sense: 'things you can SMELL', icon: '👃', prompt: 'Take a breath and notice 2 scents…' },
    { count: 1, sense: 'thing you can TASTE', icon: '👅', prompt: 'Notice 1 taste in your mouth…' }
  ];

  const muscleGroups = [
    'Tense your toes and feet for 5 seconds, then release…',
    'Tighten your calf muscles, hold, then let go…',
    'Squeeze your thigh muscles, hold, then relax…',
    'Clench your fists, hold tight, then release…',
    'Tense your arm muscles, hold, then let them go…',
    'Scrunch your shoulders up to your ears, then drop them…',
    'Tighten your face muscles, hold, then soften…',
    'Take a deep breath and notice the relaxation in your whole body…'
  ];

  const boxBreathingPhases = ['Inhale', 'Hold', 'Exhale', 'Hold'];

  useEffect(() => {
    let interval;
    if (breathingActive) {
      interval = setInterval(() => {
        setBreathingCount(prev => {
          if (prev === 1) {
            setBreathingPhase(current => (current === 'inhale' ? 'exhale' : 'inhale'));
            return breathingPhase === 'inhale' ? 6 : 4;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [breathingActive, breathingPhase]);

  useEffect(() => {
    let interval;
    if (boxBreathingActive) {
      interval = setInterval(() => {
        setBoxBreathingPhase(prev => (prev + 1) % 4);
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [boxBreathingActive]);

  // Load completed exercises from localStorage on load
  useEffect(() => {
    const stored = localStorage.getItem('groundingProgress');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.date === today) {
        setCompletedToday(parsed.completed);
      } else {
        localStorage.setItem('groundingProgress', JSON.stringify({ date: today, completed: [] }));
      }
    } else {
      localStorage.setItem('groundingProgress', JSON.stringify({ date: today, completed: [] }));
    }
  }, [today]);

  const markExerciseCompleted = (id) => {
    if (!completedToday.includes(id)) {
      const updated = [...completedToday, id];
      setCompletedToday(updated);
      localStorage.setItem('groundingProgress', JSON.stringify({ date: today, completed: updated }));
    }
  };

  const resetAll = () => {
    setActiveExercise(null);
    setFiveToOneStep(0);
    setBreathingActive(false);
    setBreathingPhase('inhale');
    setBreathingCount(4);
    setMuscleTensionStep(0);
    setBoxBreathingActive(false);
    setBoxBreathingPhase(0);
  };

  const ExerciseCard = ({ title, description, id, icon, color }) => (
    <div
      className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 mb-4 ${
        activeExercise === id
          ? `border-${color}-500 bg-${color}-50 shadow-lg scale-105`
          : 'border-gray-200 hover:border-gray-300 bg-white hover:shadow-md'
      }`}
      onClick={() => setActiveExercise(activeExercise === id ? null : id)}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600 text-sm">{description}</p>
      {completedToday.includes(id) && (
        <div className="mt-2 text-sm text-green-600 font-medium flex items-center gap-1">
          ✅ Practiced today
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Grounding Toolkit</h1>
        <p className="text-gray-600">Find your center with these trauma-informed grounding techniques</p>
        <div className="flex items-center justify-center gap-2 mt-4">
          <Heart className="text-red-500" size={20} />
          <span className="text-sm text-gray-600">You are safe. You are here. You are enough.</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* You can insert all 4 accordion sections here as in the previous message. 
            Just make sure to call markExerciseCompleted('exercise-id') when an exercise is completed. 
            For example: */}
        
        {/* 5-4-3-2-1 Completion Button Example */}
        {/* 
        <button
          onClick={() => {
            setFiveToOneStep(0);
            markExerciseCompleted('five-to-one');
          }}
        >
          Practice Again
        </button>
        */}

        {/* Do the same for other sections: 
            - markExerciseCompleted('muscle-relaxation')
            - markExerciseCompleted('box-breathing')
            - markExerciseCompleted('breathing')
        */}
      </div>

      {activeExercise && (
        <div className="text-center mt-10">
          <button
            onClick={resetAll}
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 mx-auto"
          >
            <RotateCcw size={16} />
            Back to Tools
          </button>
        </div>
      )}

      <div className="text-center mt-8 p-6 bg-white rounded-xl border border-gray-200">
        <p className="text-sm text-gray-600 mb-2">
          <strong>Remember:</strong> Grounding takes practice. Be patient and gentle with yourself.
        </p>
        <p className="text-xs text-gray-500">
          If you're in crisis, please reach out to a mental health professional or crisis hotline.
        </p>
      </div>
    </div>
  );
};

export default GroundingToolkit;