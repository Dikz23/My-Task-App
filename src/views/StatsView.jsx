import React from 'react';
import { BarChart3, CheckCircle2, AlertTriangle, TrendingUp } from 'lucide-react';

export default function StatsView({ tasks }) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'Selesai').length;
  const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          <span>Statistik Produktivitas Akademik</span>
        </h2>
        <p className="text-xs text-slate-500">Laporan perkembangan penyelesaian tugas Anda.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-blue-100 p-5 rounded-2xl text-center space-y-2">
          <p className="text-xs font-semibold text-slate-500">Tingkat Penyelesaian</p>
          <p className="text-4xl font-extrabold text-blue-600">{rate}%</p>
        </div>
        <div className="bg-white border border-blue-100 p-5 rounded-2xl text-center space-y-2">
          <p className="text-xs font-semibold text-slate-500">Tugas Tepat Waktu</p>
          <p className="text-4xl font-extrabold text-emerald-600">{completed}</p>
        </div>
        <div className="bg-white border border-blue-100 p-5 rounded-2xl text-center space-y-2">
          <p className="text-xs font-semibold text-slate-500">Total Tugas Terdaftar</p>
          <p className="text-4xl font-extrabold text-slate-800">{total}</p>
        </div>
      </div>
    </div>
  );
}