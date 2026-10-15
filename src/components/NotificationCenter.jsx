import React from 'react';
import { Bell, X, CheckCircle2, AlertTriangle, Clock } from 'lucide-react';

export default function NotificationCenter({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-blue-100 rounded-3xl p-6 w-full max-w-md shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
            <Bell className="w-4 h-4 text-blue-600" /> Pusat Notifikasi & Ringkasan
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <div className="p-3 bg-blue-50 border border-blue-100 rounded-xl space-y-1">
            <p className="font-bold text-blue-900">Ringkasan Harian (Pagi)</p>
            <p className="text-slate-600">Anda memiliki 2 tugas prioritas tinggi yang harus dikerjakan hari ini.</p>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl space-y-1">
            <p className="font-bold text-amber-900">Peringatan Deadline (H-1)</p>
            <p className="text-slate-600">Makalah Pemrograman Web dikumpul besok pukul 23:59.</p>
          </div>
        </div>
      </div>
    </div>
  );
}