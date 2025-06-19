import React, { useState, useEffect, useRef } from 'react';
import { Heart, Users, TrendingUp, MessageCircle, Sparkles, X } from 'lucide-react';

const STORAGE_KEY = 'communityMoodTracker';
const STORAGE_DATE_KEY = 'communityMoodTrackerDate';

const CommunityMoodTracker = () => {
  const [currentMood, setCurrentMood] = useState(null);
  const [moodSubmitted, setMoodSubmitted] = useState(false);
  const [showCommunityData, setShowCommunityData] = useState(false);
  const [supportMessage, setSupportMessage] = useState('');
  const [showSupportForm, setShowSupportForm] = useState(false);
  const [communityMoods, setCommunityMoods] = useState({
    struggling: 23,
    managing: 45,
    good: 67,
    thriving: 34,
  });
  const [toastMessage, setToastMessage] = useState('');
  const toastTimeoutRef = useRef(null);

  // For announcing submission to screen readers
  const liveRegionRef = useRef(null);

  const moods = [
    {
      id: 'struggling',
      emoji: '🔴',
      label: 'Struggling',
      description: 'Having a really tough time',
      color: 'red',
      supportPrompt:
        "You're not alone in this struggle. Your courage to check in shows strength.",
      resources: ['Crisis support chat', 'Immediate grounding tools', 'Peer support circle'],
    },
    {
      id: 'managing',
      emoji: '🟡',
      label: 'Managing',
      description: 'Getting by, taking it one step at a time',
      color: 'yellow',
      supportPrompt: "Taking things one step at a time is exactly right. You're doing better than you think.",
      resources: ['Self-care toolkit', 'Breathing exercises', 'Community check-ins'],
    },
    {
      id: 'good',
      emoji: '🟢',
      label: 'Doing Well',
      description: 'Feeling stable and positive',
      color: 'green',
      supportPrompt: "It's wonderful to see you in a good space. Your energy lifts the whole community.",
      resources: ['Gratitude practice', 'Connection activities', 'Ways to support others'],
    },
    {
      id: 'thriving',
      emoji: '🔵',
      label: 'Thriving',
      description: 'Feeling strong, connected, and hopeful',
      color: 'blue',
      supportPrompt: 'Your thriving energy is a beacon of hope for others. Thank you for sharing your light.',
      resources: ['Leadership opportunities', 'Mentor matching', 'Creative expression tools'],
    },
  ];

  const colorClasses = {
    red: {
      borderLight: 'border-red-200',
      borderHover: 'hover:border-red-400',
      text: 'text-red-700',
      bgLight: 'bg-red-200',
      bgDark: 'bg-red-500',
      bgDarkHover: 'hover:bg-red-600',
      textLight: 'text-red-500',
      ring: 'focus:ring-red-400',
    },
    yellow: {
      borderLight: 'border-yellow-200',
      borderHover: 'hover:border-yellow-400',
      text: 'text-yellow-700',
      bgLight: 'bg-yellow-200',
      bgDark: 'bg-yellow-500',
      bgDarkHover: 'hover:bg-yellow-600',
      textLight: 'text-yellow-500',
      ring: 'focus:ring-yellow-400',
    },
    green: {
      borderLight: 'border-green-200',
      borderHover: 'hover:border-green-400',
      text: 'text-green-700',
      bgLight: 'bg-green-200',
      bgDark: 'bg-green-500',
      bgDarkHover: 'hover:bg-green-600',
      textLight: 'text-green-500',
      ring: 'focus:ring-green-400',
    },
    blue: {
      borderLight: 'border-blue-200',
      borderHover: 'hover:border-blue-400',
      text: 'text-blue-700',
      bgLight: 'bg-blue-200',
      bgDark: 'bg-blue-500',
      bgDarkHover: 'hover:bg-blue-600',
      textLight: 'text-blue-500',
      ring: 'focus:ring-blue-400',
    },
  };

  const getCurrentMoodData = () => moods.find((mood) => mood.id === currentMood);

  const getTotalResponses = () => Object.values(communityMoods).reduce((sum, count) => sum + count, 0);

  const getMoodPercentage = (moodId) => {
    const total = getTotalResponses();
    return total > 0 ? Math.round((communityMoods[moodId] / total) * 100) : 0;
  };

  // Load from localStorage on mount
  useEffect(() => {
    const savedMood = localStorage.getItem(STORAGE_KEY);
    const savedDate = localStorage.getItem(STORAGE_DATE_KEY);
    const today = new Date().toDateString();

    if (savedMood && savedDate === today) {
      setCurrentMood(savedMood);
      setMoodSubmitted(true);
    } else {
      // Clear if outdated
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_DATE_KEY);
    }
  }, []);

  // Focus management: move focus to heading after submission
  const headingRef = useRef(null);
  useEffect(() => {
    if (moodSubmitted && headingRef.current) {
      headingRef.current.focus();
    }
  }, [moodSubmitted]);

  // Toast management
  const showToast = (message) => {
    setToastMessage(message);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage('');
    }, 4000);
  };

  // Clear timeout if component unmounts
  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  const handleMoodSubmit = (moodId) => {
    setCurrentMood(moodId);
    setMoodSubmitted(true);
    setCommunityMoods((prev) => ({
      ...prev,
      [moodId]: (prev[moodId] || 0) + 1,
    }));

    // Save to localStorage with today's date
    localStorage.setItem(STORAGE_KEY, moodId);
    localStorage.setItem(STORAGE_DATE_KEY, new Date().toDateString());

    // Announce submission for screen readers
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = `Thank you for checking in. Your mood is recorded as ${moods.find(m => m.id === moodId).label}.`;
    }
  };

  const handleSupportSend = (e) => {
    e.preventDefault();
    if (!supportMessage.trim()) return;

    // TODO: send support message backend
    setSupportMessage('');
    setShowSupportForm(false);
    showToast('Your message of support has been shared anonymously with the community. Thank you for caring.');
  };

  const MoodButton = ({ mood }) => {
    const color = colorClasses[mood.color];

    return (
      <button
        aria-pressed={currentMood === mood.id}
        aria-label={`${mood.label} mood: ${mood.description}`}
        onClick={() => handleMoodSubmit(mood.id)}
        className={`p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg bg-white ${color.borderLight} ${color.borderHover} focus:outline-none focus:ring-2 ${color.ring}`}
      >
        <div className="text-4xl mb-3" aria-hidden="true">{mood.emoji}</div>
        <h3 className={`font-semibold ${color.text} mb-2`}>{mood.label}</h3>
        <p className="text-sm text-gray-600">{mood.description}</p>
      </button>
    );
  };

  const CommunityStats = () => (
    <section
      id="community-stats"
      aria-label="Community mood statistics"
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-200"
    >
      <div className="flex items-center gap-2 mb-4">
        <Users className="text-blue-500" size={20} aria-hidden="true" />
        <h3 className="text-lg font-semibold text-gray-800">Community Pulse</h3>
        <span className="text-sm text-gray-500">({getTotalResponses()} responses today)</span>
      </div>

      <div className="space-y-3">
        {moods.map((mood) => {
          const color = colorClasses[mood.color];
          return (
            <div key={mood.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl" aria-hidden="true">{mood.emoji}</span>
                <span className="text-sm font-medium text-gray-700">{mood.label}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className={`${color.bgLight} h-2 rounded-full w-20`}>
                  <div
                    className={`${color.bgDark} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${getMoodPercentage(mood.id)}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-8">{getMoodPercentage(mood.id)}%</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700">
          <Heart className="inline w-4 h-4 mr-1" aria-hidden="true" />
          Remember: All feelings are valid. This community holds space for wherever you are today.
        </p>
      </div>
    </section>
  );

  if (moodSubmitted && currentMood) {
    const moodData = getCurrentMoodData();
    const color = colorClasses[moodData.color];

    return (
      <>
        <main
          className="max-w-2xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen"
          aria-live="polite"
          aria-atomic="true"
        >
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="text-3xl font-bold text-gray-800 mb-2"
          >
            Thank You for Checking In
          </h1>
          <p className="text-gray-600 mb-8">Your feelings matter and you are seen</p>

          <div className={`bg-white rounded-xl p-8 shadow-lg border-2 mb-6 ${color.borderLight}`}>
            <div className="text-center mb-6">
              <div className="text-6xl mb-4" aria-hidden="true">{moodData.emoji}</div>
              <h2 className={`text-2xl font-bold mb-2 ${color.text}`}>{moodData.label}</h2>
              <p className="text-gray-600 italic">{moodData.supportPrompt}</p>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold text-gray-800 mb-3">Recommended for you today:</h3>
              <ul className="grid gap-2 list-disc list-inside">
                {moodData.resources.map((resource, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
                  >
                    <Sparkles className={`${color.textLight}`} size={16} aria-hidden="true" />
                    <span className="text-sm text-gray-700">{resource}</span>
                  </li>
                ))}
              </ul>
            </div>

            {!showSupportForm ? (
              <button
                onClick={() => setShowSupportForm(true)}
                className={`w-full ${color.bgDark} ${color.bgDarkHover} text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-${moodData.color}-600`}
                aria-label="Send support to someone else"
              >
                <MessageCircle size={20} />
                Send Support to Someone Else
              </button>
            ) : (
              <form
                onSubmit={handleSupportSend}
                className="space-y-4"
                aria-live="assertive"
              >
                <label htmlFor="supportMessage" className="font-semibold text-gray-800 block">
                  Send anonymous support to someone who might need it:
                </label>
                <textarea
                  id="supportMessage"
                  value={supportMessage}
                  onChange={(e) => setSupportMessage(e.target.value)}
                  placeholder="Share words of encouragement, hope, or just let someone know they're not alone..."
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-required="true"
                  required
                />
                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg font-medium transition-colors flex-1 focus:outline-none focus:ring-2 focus:ring-green-600"
                  >
                    Send Support
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowSupportForm(false)}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          <CommunityStats />

          <div className="text-center mt-6">
            <button
              onClick={() => {
                setMoodSubmitted(false);
                setCurrentMood(null);
                setShowSupportForm(false);
                setSupportMessage('');
                localStorage.removeItem(STORAGE_KEY);
                localStorage.removeItem(STORAGE_DATE_KEY);
                if (liveRegionRef.current) liveRegionRef.current.textContent = '';
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Check In Again Tomorrow
            </button>
          </div>

          <div className="text-center mt-8 p-4 bg-white rounded-xl border border-gray-200">
            <p className="text-xs text-gray-500">
              Your mood data helps us understand how to better support our community. All responses are anonymous and used only for community wellness insights.
            </p>
          </div>

          {/* Live region for screen reader announcements */}
          <div
            ref={liveRegionRef}
            className="sr-only"
            aria-live="polite"
            aria-atomic="true"
          ></div>
        </main>

        {/* Toast notification */}
        {toastMessage && (
          <div
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-4 z-50 max-w-md w-full"
          >
            <Sparkles size={20} aria-hidden="true" />
            <span>{toastMessage}</span>
            <button
              onClick={() => setToastMessage('')}
              aria-label="Dismiss notification"
              className="ml-auto focus:outline-none focus:ring-2 focus:ring-white rounded"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <main className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-blue-50 min-h-screen">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Community Mood Check-In</h1>
        <p className="text-gray-600 mb-4">
          How are you feeling today? Your response helps us support our community better.
        </p>
        <div className="flex items-center justify-center gap-2 mb-8">
          <Heart className="text-red-500" size={20} aria-hidden="true" />
          <span className="text-sm text-gray-600">All feelings are welcome here</span>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8" role="list">
          {moods.map((mood) => (
            <MoodButton key={mood.id} mood={mood} role="listitem" />
          ))}
        </div>

        <div className="text-center mb-6">
          <button
            onClick={() => setShowCommunityData(!showCommunityData)}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg font-medium transition-colors flex items-center gap-2 mx-auto focus:outline-none focus:ring-2 focus:ring-blue-600"
            aria-expanded={showCommunityData}
            aria-controls="community-stats"
          >
            <TrendingUp size={20} aria-hidden="true" />
            {showCommunityData ? 'Hide' : 'Show'} Community Pulse
          </button>
        </div>

        {showCommunityData && <CommunityStats />}

        <div className="text-center mt-8 p-6 bg-white rounded-xl border border-gray-200">
          <h3 className="font-semibold text-gray-800 mb-2">Why We Track Community Mood</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p>• Helps us understand when the community needs extra support</p>
            <p>• Guides which resources and tools to prioritize</p>
            <p>• Creates transparency about our collective wellbeing</p>
            <p>• Reminds everyone they're not alone in their experiences</p>
          </div>
          <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Privacy Note:</strong> All responses are anonymous. We never store personal identifying information with mood data.
            </p>
          </div>
        </div>
      </main>

      {/* Toast notification */}
      {toastMessage && (
        <div
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-4 z-50 max-w-md w-full"
        >
          <Sparkles size={20} aria-hidden="true" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setToastMessage('')}
            aria-label="Dismiss notification"
            className="ml-auto focus:outline-none focus:ring-2 focus:ring-white rounded"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
      )}
    </>
  );
};

export default CommunityMoodTracker;