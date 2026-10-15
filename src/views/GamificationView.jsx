import React, { useState } from 'react';
import { Clock, Calendar, ShieldAlert, Sparkles, Play } from 'lucide-react';

export default function TimeBlockingView({ tasks }) {
  const [selectedBlock, setSelectedBlock] = useState('08:00 - 10:00');
  
  const timeSlots = ['08:00 - 10:00', '10:00 - 12:00', '13:00 - 15:00', '15:00 - 17:00', '19:00 - 21:00'];

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-sm flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <span>Time Blocking & Focus Mode</span>
          </h2>
          <p className="text-xs text-slate-500">Alokasikan blok waktu harian untuk memaksimalkan produktivitas.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Slot Waktu */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm text-slate-700">Blok Waktu Hari Ini</h3>
          {timeSlots.map((slot) => (
            <div 
              key={slot}
              onClick={() => setSelectedBlock(slot)}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                selectedBlock === slot ? 'bg-blue-600 text-white border-blue-600 shadow-sm' : 'bg-white border-blue-100 text-slate-700 hover:bg-blue-50'
              }`}
            >
              <span className="font-semibold text-xs">{slot}</span>
              <span className="text-[10px] opacity-80">Tersedia</span>
            </div>
          ))}
        </div>

        {/* Detail Sesi Blok */}
        <div className="md:col-span-2 bg-white border border-blue-100 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b pb-3">
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Blok: {selectedBlock}</h3>
              <p className="text-xs text-slate-500">Fokus pengerjaan tugas prioritas tinggi.</p>
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-xl hover:bg-blue-700">
              <Play className="w-3.5 h-3.5 fill-current" /> Mulai Focus Mode
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-slate-700">Pilih Tugas untuk Blok Ini:</label>
            <select className="w-full p-2.5 bg-blue-50/50 border border-blue-100 rounded-xl text-xs text-slate-700">
              {tasks.map(t => <option key={t.id} value={t.id}>{t.title} ({t.subject})</option>)}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}