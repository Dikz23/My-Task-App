import React, { useState } from 'react';
import { Clock, Play, CheckCircle2, Calendar } from 'lucide-react';

export default function TimeBlockingView({ tasks }) {
  const [selectedBlock, setSelectedBlock] = useState('08:00 - 10:00');
  const [selectedTaskId, setSelectedTaskId] = useState(tasks[0]?.id || '');
  const [activeFocus, setActiveFocus] = useState(false);

  const timeSlots = [
    '08:00 - 10:00',
    '10:00 - 12:00',
    '13:00 - 15:00',
    '15:00 - 17:00',
    '19:00 - 21:00'
  ];

  return (
    <div className="space-y-6">
      {/* Header Halaman */}
      <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <span>Time Blocking & Focus Mode</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">Alokasikan blok waktu harian untuk memaksimalkan fokus pengerjaan tugas.</p>
        </div>
        <div className="flex items-center gap-2 bg-blue-50 px-3 py-1.5 rounded-xl border border-blue-100 text-blue-700 text-xs font-semibold">
          <Calendar className="w-4 h-4" /> Hari Ini: Produktif
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Kolom Pilihan Slot Waktu */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-slate-700 px-1">Blok Waktu Hari Ini</h3>
          <div className="space-y-2">
            {timeSlots.map((slot) => (
              <div 
                key={slot}
                onClick={() => setSelectedBlock(slot)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                  selectedBlock === slot 
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-200' 
                    : 'bg-white border-blue-100 text-slate-700 hover:border-blue-300 hover:bg-blue-50/50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Clock className={`w-4 h-4 ${selectedBlock === slot ? 'text-white' : 'text-blue-600'}`} />
                  <span className="font-bold text-xs">{slot}</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                  selectedBlock === slot ? 'bg-blue-500 text-white' : 'bg-blue-50 text-blue-700'
                }`}>
                  Tersedia
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Kolom Pengaturan & Focus Mode */}
        <div className="md:col-span-2 bg-white border border-blue-100 rounded-2xl p-6 shadow-sm space-y-5">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Pengaturan Sesi: {selectedBlock}</h3>
              <p className="text-xs text-slate-500">Pilih tugas yang akan difokuskan pada slot waktu ini.</p>
            </div>
            <button 
              onClick={() => setActiveFocus(!activeFocus)}
              className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-xl hover:bg-blue-700 shadow-sm transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> 
              {activeFocus ? 'Akhiri Sesi Fokus' : 'Mulai Focus Mode'}
            </button>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-medium text-slate-700">Pilih Tugas Utama:</label>
              <select 
                value={selectedTaskId}
                onChange={(e) => setSelectedTaskId(e.target.value)}
                className="w-full mt-1.5 p-3 bg-blue-50/50 border border-blue-100 rounded-xl text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {tasks.length === 0 ? (
                  <option value="">Belum ada tugas tersedia</option>
                ) : (
                  tasks.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.title} ({t.subject} - Prioritas: {t.priority})
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Panel Status Focus Mode */}
            {activeFocus && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl space-y-2 animate-pulse">
                <div className="flex items-center gap-2 text-blue-900 font-bold">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping"></span>
                  Focus Mode Sedang Berjalan!
                </div>
                <p className="text-blue-700 text-xs">
                  Notifikasi dibisukan. Selesaikan tugas pilihan Anda dalam blok waktu <span className="font-bold">{selectedBlock}</span>. Tetap semangat!
                </p>
              </div>
            )}

            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-2">
              <h4 className="font-bold text-slate-700">Tips Time Blocking Mahasiswa:</h4>
              <ul className="space-y-1 text-slate-600 list-disc list-inside">
                <li>Hindari membuka sosial media selama slot waktu fokus aktif.</li>
                <li>Gunakan jeda 5 menit setiap 25 menit pengerjaan (Pomodoro Technique).</li>
                <li>Evaluasi hasil blok waktu di penghujung hari pada menu Statistik.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}