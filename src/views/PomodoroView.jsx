import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Timer, Volume2 } from 'lucide-react';

export default function PomodoroView({ onPlaySound }) {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('focus'); // 'focus' | 'break'

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0) {
      onPlaySound('normal');
      setIsRunning(false);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, onPlaySound]);

  const toggleTimer = () => setIsRunning(!isRunning);
  
  const resetTimer = (newMode = mode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(newMode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="bg-white border border-blue-100 rounded-3xl p-8 shadow-sm text-center space-y-6">
        
        {/* Mode Switcher Buttons */}
        <div className="flex justify-center gap-2 bg-blue-50/60 p-1.5 rounded-2xl w-fit mx-auto border border-blue-100">
          <button
            onClick={() => resetTimer('focus')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              mode === 'focus' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-blue-600'
            }`}
          >
            🎯 Sesi Fokus (25m)
          </button>
          <button
            onClick={() => resetTimer('break')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              mode === 'break' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-blue-600'
            }`}
          >
            ☕ Istirahat (5m)
          </button>
        </div>

        {/* Big Display Timer */}
        <div className="my-8">
          <span className="text-7xl font-extrabold tracking-tight text-blue-900 font-mono">
            {formatTime(timeLeft)}
          </span>
          <p className="text-xs text-slate-500 mt-2 font-medium">
            {mode === 'focus' ? 'Tetap fokus pada tugas Anda!' : 'Waktunya meregangkan badan!'}
          </p>
        </div>

        {/* Timer Control Buttons */}
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={toggleTimer}
            className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
          >
            {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-0.5" />}
          </button>
          <button
            onClick={() => resetTimer(mode)}
            className="w-12 h-12 rounded-xl border border-blue-100 text-slate-600 flex items-center justify-center hover:bg-blue-50 transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

      </div>
    </div>
  );
}