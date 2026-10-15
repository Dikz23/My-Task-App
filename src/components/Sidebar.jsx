import React from 'react';
import { 
  LayoutDashboard, CheckSquare, Calendar, BookOpen, 
  Timer, BarChart3, Compass, Settings, CheckCircle2
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'tasks', label: 'Manajemen Tugas', icon: CheckSquare },
    { id: 'calendar', label: 'Kalender Akademik', icon: Calendar },
    { id: 'pomodoro', label: 'Pomodoro Timer', icon: Timer },
    { id: 'notes', label: 'Catatan Kuliah', icon: BookOpen },
    { id: 'recommendations', label: 'Rekomendasi Belajar', icon: Compass },
    { id: 'stats', label: 'Statistik & Laporan', icon: BarChart3 },
    { id: 'settings', label: 'Pengaturan & Profil', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-white border-r border-blue-100 flex flex-col justify-between hidden md:flex min-h-[calc(100vh-61px)]">
      <div className="p-4 space-y-6">
        
        {/* Brand Header */}
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-md shadow-blue-200">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-slate-900 text-base leading-tight">TaskPulse</h1>
            <p className="text-[11px] text-blue-600 font-medium">Academic Suite</p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm shadow-blue-200'
                    : 'text-slate-600 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-blue-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer info */}
      <div className="p-4 border-t border-blue-100">
        <div className="bg-blue-50 p-3 rounded-xl border border-blue-100 text-xs text-slate-600">
          <p className="font-semibold text-blue-900">Semester Ganjil 2026/2027</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Universitas Pamulang</p>
        </div>
      </div>
    </aside>
  );
}