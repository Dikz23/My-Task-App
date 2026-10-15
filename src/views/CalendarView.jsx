import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CalendarView({ tasks }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const monthNames = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-blue-600" />
            <span>Kalender Akademik</span>
          </h2>
          <p className="text-xs text-slate-500">Jadwal deadline tugas, ujian, dan kegiatan kuliah.</p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={prevMonth} className="p-2 border border-blue-100 rounded-lg hover:bg-blue-50 text-blue-600">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-bold text-slate-800 text-sm min-w-[120px] text-center">
            {monthNames[month]} {year}
          </span>
          <button onClick={nextMonth} className="p-2 border border-blue-100 rounded-lg hover:bg-blue-50 text-blue-600">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-white border border-blue-100 rounded-2xl p-4 shadow-sm overflow-x-auto">
        <div className="grid grid-cols-7 gap-2 text-center font-bold text-xs text-slate-500 mb-2 border-b border-slate-100 pb-2 min-w-[600px]">
          <span>Minggu</span><span>Senin</span><span>Selasa</span><span>Rabu</span><span>Kamis</span><span>Jumat</span><span>Sabtu</span>
        </div>

        <div className="grid grid-cols-7 gap-2 min-w-[600px]">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="p-2 bg-slate-50/40 rounded-xl min-h-[95px]"></div>
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const formattedMonth = String(month + 1).padStart(2, '0');
            const formattedDay = String(dayNum).padStart(2, '0');
            const dateStr = `${year}-${formattedMonth}-${formattedDay}`;

            // MEMBANDINGKAN HANYA BAGIAN TANGGALNYA SAJA (YYYY-MM-DD) TANPA JAM & TIMEZONE
            const dayTasks = tasks.filter(t => {
              if (!t.dueDate) return false;
              // Mengambil substring tanggal bagian depan (misal: "2026-10-14")
              const taskDateOnly = t.dueDate.includes('T') ? t.dueDate.split('T')[0] : t.dueDate.slice(0, 10);
              return taskDateOnly === dateStr;
            });

            const isToday = new Date().toDateString() === new Date(year, month, dayNum).toDateString();

            return (
              <div 
                key={dayNum} 
                className={`p-2 border rounded-xl flex flex-col justify-between min-h-[95px] transition-all ${
                  isToday 
                    ? 'bg-blue-50/70 border-blue-400 ring-1 ring-blue-400' 
                    : 'bg-white border-slate-100 hover:border-blue-200'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded-md ${
                    isToday ? 'bg-blue-600 text-white' : 'text-slate-700'
                  }`}>
                    {dayNum}
                  </span>
                  {dayTasks.length > 0 && (
                    <span className="text-[10px] bg-blue-100 text-blue-800 font-semibold px-1.5 py-0.5 rounded-full">
                      {dayTasks.length}
                    </span>
                  )}
                </div>

                <div className="space-y-1 mt-1 overflow-y-auto max-h-[55px]">
                  {dayTasks.map(t => (
                    <div 
                      key={t.id} 
                      className={`text-[10px] p-1 rounded font-medium truncate ${
                        t.priority === 'Tinggi' ? 'bg-rose-100 text-rose-800 border border-rose-200' :
                        t.priority === 'Sedang' ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                        'bg-blue-100 text-blue-800 border border-blue-200'
                      }`}
                      title={`${t.title} (${t.subject})`}
                    >
                      {t.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}