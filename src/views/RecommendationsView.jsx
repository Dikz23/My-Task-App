import React from 'react';
import { Compass, Clock, ArrowRight, Zap } from 'lucide-react';

export default function RecommendationsView({ tasks }) {
  // Sort tasks by priority score: DueDate closeness + Priority weight
  const sortedTasks = [...tasks]
    .filter(t => t.status !== 'Selesai')
    .sort((a, b) => {
      const pMap = { 'Tinggi': 3, 'Sedang': 2, 'Rendah': 1 };
      const aScore = pMap[a.priority] * 100 - (new Date(a.dueDate).getTime() / 10000000);
      const bScore = pMap[b.priority] * 100 - (new Date(b.dueDate).getTime() / 10000000);
      return bScore - aScore;
    });

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Compass className="w-5 h-5 text-blue-600" />
          <span>Rekomendasi Jadwal Belajar Smart</span>
        </h2>
        <p className="text-xs text-slate-500">Urutan tugas optimal berdasarkan algoritma prioritas dan estimasi waktu.</p>
      </div>

      <div className="space-y-3">
        {sortedTasks.map((task, idx) => (
          <div key={task.id} className="bg-white border border-blue-100 rounded-2xl p-4 shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-700 border border-blue-100 font-bold flex items-center justify-center text-sm">
                #{idx + 1}
              </span>
              <div>
                <h3 className="font-bold text-slate-800 text-sm">{task.title}</h3>
                <p className="text-xs text-slate-500">{task.subject} • Estimasi: {task.estimatedHours || 2} Jam</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-semibold">
                Saran Pengerjaan Hari Ini
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}