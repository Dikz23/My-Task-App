import React from 'react';
import { Monitor, X, Clock, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function WidgetLayarUtama({ isOpen, onClose, tasks }) {
  if (!isOpen) return null;

  // Filter tugas yang belum selesai dan urutkan berdasarkan deadline terdekat
  const upcomingTasks = [...tasks]
    .filter(t => t.status !== 'Selesai')
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5); // Ambil 5 tugas terdekat

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-blue-100 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4 animate-in fade-in zoom-in duration-200">
        
        {/* Widget Header */}
        <div className="flex items-center justify-between border-b border-blue-50 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-200">
              <Monitor className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Widget Layar Utama</h3>
              <p className="text-[11px] text-blue-600 font-medium">TaskPulse Quick View</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-blue-50 rounded-xl transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Widget Content: Deadline Terdekat */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
            <span>Deadline Terdekat</span>
            <span>{upcomingTasks.length} Tugas Aktif</span>
          </div>

          {upcomingTasks.length > 0 ? (
            <div className="space-y-2">
              {upcomingTasks.map((task) => (
                <div 
                  key={task.id} 
                  className="p-3 bg-blue-50/50 border border-blue-100 rounded-2xl flex items-center justify-between gap-3"
                >
                  <div className="space-y-0.5 overflow-hidden">
                    <h4 className="font-semibold text-slate-800 text-xs truncate">{task.title}</h4>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500">
                      <span className="text-blue-700 font-medium">{task.subject}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-amber-600 font-medium">
                        <Clock className="w-3 h-3" />
                        {new Date(task.dueDate).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
                      </span>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-[10px] font-semibold shrink-0 ${
                    task.priority === 'Tinggi' ? 'bg-rose-100 text-rose-700' :
                    task.priority === 'Sedang' ? 'bg-amber-100 text-amber-700' :
                    'bg-slate-200 text-slate-700'
                  }`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-slate-400 text-xs">
              <CheckCircle2 className="w-8 h-8 mx-auto text-emerald-500 mb-2 opacity-75" />
              Hebat! Tidak ada tugas mendesak saat ini.
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="pt-2 text-center border-t border-blue-50">
          <p className="text-[10px] text-slate-400">
            Widget ini mensimulasikan tampilan cepat pada home screen perangkat Anda.
          </p>
        </div>

      </div>
    </div>
  );
}