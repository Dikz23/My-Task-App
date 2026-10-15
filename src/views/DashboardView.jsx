import React from 'react';
import { 
  CheckCircle2, Clock, Calendar, Sparkles, 
  Flame, Award, BookOpen, Bell, ArrowRight, Play, CheckSquare 
} from 'lucide-react';

export default function DashboardView({ tasks, onAddTask, onToggleTaskComplete, onOpenAiModal, setActiveTab }) {
  // Hitung statistik cepat
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Selesai').length;
  const inProgressTasks = tasks.filter(t => t.status === 'Sedang Dikerjakan' || t.status === 'Belum Dikerjakan').length;
  const highPriorityTasks = tasks.filter(t => t.priority === 'Tinggi' && t.status !== 'Selesai');

  return (
    <div className="space-y-6">
      
      {/* 1. HERO BANNER & QUICK STATS */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 rounded-3xl p-6 text-white shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-medium backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-blue-200" /> Academic Suite Dashboard
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">Selamat Datang Kembali, Andika!</h2>
          <p className="text-blue-100 text-xs sm:text-sm">Universitas Pamulang • Teknik Informatika. Tetap semangat selesaikan target akademikmu hari ini.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={onOpenAiModal}
            className="px-4 py-2.5 bg-white text-blue-700 text-xs font-bold rounded-xl shadow-md hover:bg-blue-50 transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-blue-600" /> AI Task Breakdown
          </button>
          <button 
            onClick={onAddTask}
            className="px-4 py-2.5 bg-blue-800 text-white text-xs font-bold rounded-xl shadow-md hover:bg-blue-900 transition-all border border-blue-500/50 flex items-center gap-2"
          >
            + Tambah Tugas
          </button>
        </div>
      </div>

      {/* 2. GRID UTAMA: KOLOM-KOLOM FITUR LENGKAP */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* KOLOM 1: Ringkasan Tugas & Deadline Terdekat (2 Span) */}
        <div className="md:col-span-2 space-y-5">
          
          {/* Status Kartu Statistik Cepat */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-sm space-y-1">
              <p className="text-xs text-slate-500 font-medium">Total Tugas</p>
              <p className="text-2xl font-extrabold text-slate-800">{totalTasks}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-sm space-y-1">
              <p className="text-xs text-slate-500 font-medium">Sedang Dikerjakan</p>
              <p className="text-2xl font-extrabold text-blue-600">{inProgressTasks}</p>
            </div>
            <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-sm space-y-1">
              <p className="text-xs text-slate-500 font-medium">Selesai</p>
              <p className="text-2xl font-extrabold text-emerald-600">{completedTasks}</p>
            </div>
          </div>

          {/* Daftar Tugas Prioritas Tinggi / Mendesak */}
          <div className="bg-white border border-blue-100 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-800 text-sm flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-blue-600" /> Tugas Mendesak & Prioritas Tinggi
              </h3>
              <button 
                onClick={() => setActiveTab('tasks')}
                className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
              >
                Lihat Semua <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="space-y-2.5">
              {highPriorityTasks.length === 0 ? (
                <p className="text-xs text-slate-400 py-4 text-center">Kerja bagus! Tidak ada tugas prioritas mendesak saat ini.</p>
              ) : (
                highPriorityTasks.slice(0, 3).map(task => (
                  <div key={task.id} className="p-3.5 bg-blue-50/40 border border-blue-100 rounded-xl flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <input 
                        type="checkbox" 
                        checked={task.status === 'Selesai'}
                        onChange={() => onToggleTaskComplete(task.id)}
                        className="w-4 h-4 text-blue-600 rounded border-blue-300 focus:ring-blue-500 cursor-pointer"
                      />
                      <div>
                        <h4 className="font-bold text-xs text-slate-800">{task.title}</h4>
                        <p className="text-[10px] text-slate-500">{task.subject} • Deadline: {task.dueDate?.replace('T', ' ')}</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 bg-rose-100 text-rose-700 text-[10px] font-bold rounded-md">
                      {task.priority}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Widget Shortcut Fitur Akademik & Time Blocking */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div 
              onClick={() => setActiveTab('timeblocking')}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 p-4 rounded-2xl cursor-pointer hover:shadow-md transition-all space-y-2"
            >
              <div className="flex justify-between items-center text-blue-700 font-bold text-xs">
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> Time Blocking</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
              <p className="text-xs text-slate-600">Alokasikan blok waktu harian dan aktifkan Focus Mode bebas distraksi.</p>
            </div>

            <div 
              onClick={() => setActiveTab('academic')}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 p-4 rounded-2xl cursor-pointer hover:shadow-md transition-all space-y-2"
            >
              <div className="flex justify-between items-center text-blue-700 font-bold text-xs">
                <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4" /> Manajemen Akademik</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
              <p className="text-xs text-slate-600">Kelola daftar mata kuliah, informasi dosen pengampu, dan bank materi.</p>
            </div>
          </div>

        </div>

        {/* KOLOM 2: Sidebar Widget (Pomodoro, Gamifikasi & Streak) */}
        <div className="space-y-5">
          
          {/* Widget Gamifikasi & Level */}
          <div 
            onClick={() => setActiveTab('gamification')}
            className="bg-white border border-blue-100 rounded-2xl p-5 shadow-sm space-y-3 cursor-pointer hover:border-blue-300 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-500" /> Level 3 Scholar
              </span>
              <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">250 Pts</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div className="bg-blue-600 h-full rounded-full w-3/4"></div>
            </div>
            <p className="text-[11px] text-slate-500">75 poin lagi menuju Level 4!</p>
          </div>

          {/* Widget Streak Harian */}
          <div className="bg-white border border-blue-100 rounded-2xl p-5 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-rose-500" /> Streak Belajar
              </span>
              <p className="text-2xl font-extrabold text-slate-800">5 Hari Konsisten</p>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
              🔥
            </div>
          </div>

          {/* Widget Quick Pomodoro Shortcut */}
          <div className="bg-white border border-blue-100 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-slate-800 text-xs flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-600" /> Sesi Fokus Cepat
              </h3>
              <span className="text-[10px] text-slate-400">Pomodoro</span>
            </div>
            <div className="p-4 bg-blue-50/60 rounded-xl text-center space-y-2 border border-blue-100">
              <p className="text-2xl font-black text-blue-900 tracking-wider">25 : 00</p>
              <p className="text-[11px] text-slate-500">Mode Belajar Standar</p>
              <button 
                onClick={() => setActiveTab('pomodoro')}
                className="w-full py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Play className="w-3.5 h-3.5 fill-current" /> Buka Pomodoro Timer
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}