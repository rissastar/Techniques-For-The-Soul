import React, { useState, useEffect } from 'react';
import { Heart, Pause, Play, RotateCcw } from 'lucide-react';

const GroundingToolkit = () => {
  const [activeExercise, setActiveExercise] = useState(null);
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
        {/* 5-4-3-2-1 */}
        <div>
          <ExerciseCard
            title="5-4-3-2-1 Technique"
            description="Ground yourself using all five senses"
            id="five-to-one"
            icon="🌟"
            color="blue"
          />
          <div
            className={`transition-all duration-500 ease-out ${
              activeExercise === 'five-to-one'
                ? 'opacity-100 scale-100 translate-y-0 max-h-[1000px]'
                : 'opacity-0 scale-95 -translate-y-2 max-h-0 overflow-hidden'
            }`}
          >
            {activeExercise === 'five-to-one' && (
              <div className="bg-white rounded-xl p-6 shadow border border-blue-200 mt-2">
                {fiveToOneStep < fiveToOneSteps.length ? (
                  <div className="text-center">
                    <div className="text-6xl mb-4">{fiveToOneSteps[fiveToOneStep].icon}</div>
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      {fiveToOneSteps[fiveToOneStep].count}
                    </div>
                    <div className="text-xl text-gray-700 mb-6">
                      {fiveToOneSteps[fiveToOneStep].sense}
                    </div>
                    <p className="text-gray-600 mb-8 italic">
                      {fiveToOneSteps[fiveToOneStep].prompt}
                    </p>
                    <button
                      onClick={() => setFiveToOneStep(prev => prev + 1)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium"
                    >
                      {fiveToOneStep === fiveToOneSteps.length - 1 ? 'Complete' : 'Next'}
                    </button>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-4xl mb-4">✨</div>
                    <h3 className="text-xl font-semibold text-green-700 mb-2">Well done!</h3>
                    <p className="text-gray-600 mb-6">You’ve grounded yourself using your senses.</p>
                    <button
                      onClick={() => setFiveToOneStep(0)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg"
                    >
                      Practice Again
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Box Breathing */}
        <div>
          <ExerciseCard
            title="Box Breathing"
            description="4-4-4-4 breathing pattern for calm"
            id="box-breathing"
            icon="📦"
            color="green"
          />
          <div
            className={`transition-all duration-500 ease-out ${
              activeExercise === 'box-breathing'
                ? 'opacity-100 scale-100 translate-y-0 max-h-[1000px]'
                : 'opacity-0 scale-95 -translate-y-2 max-h-0 overflow-hidden'
            }`}
          >
            {activeExercise === 'box-breathing' && (
              <div className="bg-white rounded-xl p-6 shadow border border-green-200 mt-2 text-center">
                <div className="w-32 h-32 mx-auto mb-6 border-4 border-green-500 rounded-lg flex items-center justify-center relative">
                  <span className="text-2xl font-bold text-green-700 z-10">
                    {boxBreathingPhases[boxBreathingPhase]}
                  </span>
                </div>
                <div className="text-gray-700 mb-2">
                  {boxBreathingActive
                    ? `${boxBreathingPhases[boxBreathingPhase]} for 4 seconds`
                    : 'Ready to begin?'}
                </div>
                <button
                  onClick={() => setBoxBreathingActive(!boxBreathingActive)}
                  className={`${
                    boxBreathingActive ? 'bg-red-500' : 'bg-green-500'
                  } text-white px-6 py-2 rounded-lg font-medium mt-4`}
                >
                  {boxBreathingActive ? 'Pause' : 'Start'}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Muscle Relaxation */}
        <div>
          <ExerciseCard
            title="Progressive Muscle Relaxation"
            description="Release tension throughout your body"
            id="muscle-relaxation"
            icon="💪"
            color="purple"
          />
          <div
            className={`transition-all duration-500 ease-out ${
              activeExercise === 'muscle-relaxation'
                ? 'opacity-100 scale-100 translate-y-0 max-h-[1000px]'
                : 'opacity-0 scale-95 -translate-y-2 max-h-0 overflow-hidden'
            }`}
          >
            {activeExercise === 'muscle-relaxation' && (
              <div className="bg-white rounded-xl p-6 shadow border border-purple-200 mt-2 text-center">
                {muscleTensionStep < muscleGroups.length ? (
                  <>
                    <div className="text-xl font-medium text-purple-700 mb-4">
                      Step {muscleTensionStep + 1} of {muscleGroups.length}
                    </div>
                    <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                      {muscleGroups[muscleTensionStep]}
                    </p>
                    <div className="flex justify-center gap-4">
                      <button
                        onClick={() => setMuscleTensionStep(prev => prev + 1)}
                        className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg"
                      >
                        {muscleTensionStep === muscleGroups.length - 1 ? 'Complete' : 'Next'}
                      </button>
                      {muscleTensionStep > 0 && (
                        <button
                          onClick={() => setMuscleTensionStep(prev => prev - 1)}
                          className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg"
                        >
                          Previous
                        </button>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="text-4xl mb-4">🌸</div>
                    <h3 className="text-xl font-semibold text-green-700 mb-2">Relaxation Complete</h3>
                    <p className="text-gray-600 mb-6">Your body is relaxed and calm.</p>
                    <button
                      onClick={() => setMuscleTensionStep(0)}
                      className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg"
                    >
                      Practice Again
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* 4-6 Breathing */}
        <div>
          <ExerciseCard
            title="4-6 Breathing"
            description="Calming breath work for anxiety"
            id="breathing"
            icon="🫁"
            color="teal"
          />
          <div
            className={`transition-all duration-500 ease-out ${
              activeExercise === 'breathing'
                ? 'opacity-100 scale-100 translate-y-0 max-h-[1000px]'
                : 'opacity-0 scale-95 -translate-y-2 max-h-0 overflow-hidden'
            }`}
          >
            {activeExercise === 'breathing' && (
              <div className="bg-white rounded-xl p-6 shadow border border-teal-200 mt-2 text-center">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full border-4 border-teal-500 flex items-center justify-center">
                  <div className="z-10">
                    <div className="text-2xl font-bold text-teal-700 capitalize">{breathingPhase}</div>
                    <div className="text-lg text-teal-600">{breathingCount}</div>
                  </div>
                </div>
                <div className="text-gray-700 mb-2">
                  {breathingActive
                    ? `${breathingPhase} for ${breathingCount} seconds`
                    : 'Ready to breathe together?'}
                </div>
                <button
                  onClick={() => setBreathingActive(!breathingActive)}
                  className={`${
                    breathingActive ? 'bg-red-500' : 'bg-teal-500'
                  } text-white px-6 py-2 rounded-lg font-medium mt-4`}
                >
                  {breathingActive ? 'Pause' : 'Start Breathing'}
                </button>
              </div>
            )}
          </div>
        </div>
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