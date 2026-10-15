import React from 'react';
import { 
  Bell, Award, Sparkles, Moon, Sun, Monitor, 
  Search, RotateCcw, Download, Calendar
} from 'lucide-react';

export default function Navbar({ 
  userPoints, 
  streak, 
  darkMode, 
  setDarkMode, 
  searchTerm, 
  setSearchTerm,
  onOpenWidget,
  onOpenAiModal,
  onExportCSV,
  onSyncCalendar
}) {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-blue-100 shadow-sm transition-colors duration-200">
      <div className="px-4 py-3 flex items-center justify-between gap-4">
        
        {/* Left: Search Bar */}
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
            <input
              type="text"
              placeholder="Cari tugas, matkul, atau kategori..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-blue-50/50 border border-blue-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-slate-800 placeholder-slate-400"
            />
          </div>
        </div>

        {/* Right Action Icons & User Stats */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* AI Assistance Button */}
          <button 
            onClick={onOpenAiModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-xs font-medium hover:opacity-90 transition-opacity shadow-sm"
            title="AI Pemecah Tugas & Study Planner"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
            <span className="hidden sm:inline">AI Breakdown</span>
          </button>

          {/* External Calendar Sync */}
          <button
            onClick={onSyncCalendar}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-100"
            title="Sync Google Calendar"
          >
            <Calendar className="w-4 h-4" />
          </button>

          {/* Quick Export Button */}
          <button
            onClick={onExportCSV}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-100"
            title="Ekspor CSV"
          >
            <Download className="w-4 h-4" />
          </button>

          {/* Desktop Widget Launcher */}
          <button
            onClick={onOpenWidget}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-100"
            title="Buka Widget Desktop"
          >
            <Monitor className="w-4 h-4" />
          </button>

          {/* Points & Streak Badge */}
          <div className="hidden md:flex items-center gap-2 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full text-xs font-semibold text-blue-800">
            <Award className="w-4 h-4 text-blue-600" />
            <span>{userPoints} Pts</span>
            <span className="text-blue-300">|</span>
            <span className="text-amber-600">🔥 {streak} Hari</span>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 text-slate-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Ganti Mode Tampilan"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-blue-600" />}
          </button>
        </div>

      </div>
    </header>
  );
}