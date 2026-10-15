import React, { useState } from 'react';
import { Volume2, VolumeX, X, Bell, Play, Square, Check, Sliders } from 'lucide-react';

export default function AlarmSoundModal({ 
  isOpen, 
  onClose, 
  alarmSettings, 
  setAlarmSettings,
  onPlaySound 
}) {
  if (!isOpen) return null;

  const [isPlaying, setIsPlaying] = useState(false);

  // Pilihan variasi suara alarm
  const soundOptions = [
    { id: 'normal', name: 'Tugas Standard (Soft Chime)', desc: 'Cocok untuk pengingat tugas harian biasa', freq: 440 },
    { id: 'urgent', name: 'Tugas Penting (Siren Alert)', desc: 'Nada keras untuk tugas prioritas tinggi', freq: 880 },
    { id: 'overdue', name: 'Terlambat (Digital Alarm)', desc: 'Pengingat berulang untuk tugas melewati deadline', freq: 600 }
  ];

  const handleTestSound = (type) => {
    setIsPlaying(type);
    onPlaySound(type, alarmSettings.volume, alarmSettings.repeat);
    setTimeout(() => setIsPlaying(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-blue-100 rounded-3xl p-6 w-full max-w-lg shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-blue-50 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-200">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Pengaturan Alarm & Suara Notifikasi</h3>
              <p className="text-[11px] text-blue-600 font-medium">Fitur #4 - Sound & Volume Control</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-blue-50 rounded-xl transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Option List: Suara Khusus per Tingkat Prioritas */}
        <div className="space-y-3 text-xs">
          <label className="font-semibold text-slate-700 block">Pilihan Suara Notifikasi:</label>
          
          {soundOptions.map((option) => {
            const isSelected = alarmSettings.soundType === option.id;
            return (
              <div 
                key={option.id}
                className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                  isSelected 
                    ? 'bg-blue-50/80 border-blue-200 shadow-sm' 
                    : 'bg-white border-slate-100 hover:border-blue-100'
                }`}
              >
                <div 
                  className="flex-1 cursor-pointer"
                  onClick={() => setAlarmSettings({ ...alarmSettings, soundType: option.id })}
                >
                  <div className="flex items-center gap-2">
                    <span className={`font-bold ${isSelected ? 'text-blue-800' : 'text-slate-800'}`}>
                      {option.name}
                    </span>
                    {isSelected && (
                      <span className="px-2 py-0.5 bg-blue-600 text-white text-[10px] rounded-full font-medium">
                        Aktif
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{option.desc}</p>
                </div>

                {/* Tes Suara Button */}
                <button
                  type="button"
                  onClick={() => handleTestSound(option.id)}
                  className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                    isPlaying === option.id
                      ? 'bg-rose-100 text-rose-700 border border-rose-200'
                      : 'bg-white border border-blue-100 text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {isPlaying === option.id ? (
                    <>
                      <Square className="w-3.5 h-3.5 fill-current" />
                      <span>Stop</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Tes</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Volume & Pengulangan (Repeat) Control */}
        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-700 flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-blue-600" /> Pengaturan Tambahan
            </span>
          </div>

          {/* Slider Volume */}
          <div className="space-y-1.5">
            <div className="flex justify-between font-medium text-slate-600">
              <span className="flex items-center gap-1">
                {alarmSettings.volume === 0 ? <VolumeX className="w-3.5 h-3.5 text-slate-400" /> : <Volume2 className="w-3.5 h-3.5 text-blue-600" />}
                Volume Alarm
              </span>
              <span className="text-blue-700 font-bold">{Math.round(alarmSettings.volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={alarmSettings.volume}
              onChange={(e) => setAlarmSettings({ ...alarmSettings, volume: parseFloat(e.target.value) })}
              className="w-full accent-blue-600 cursor-pointer h-1.5 bg-slate-200 rounded-lg"
            />
          </div>

          {/* Toggle Repeat Alarm */}
          <div className="flex items-center justify-between pt-1">
            <div>
              <p className="font-semibold text-slate-700">Pengulangan Alarm (Loop)</p>
              <p className="text-[10px] text-slate-500">Bunyikan alarm berulang hingga tugas dicentang selesai</p>
            </div>
            <input
              type="checkbox"
              checked={alarmSettings.repeat}
              onChange={(e) => setAlarmSettings({ ...alarmSettings, repeat: e.target.checked })}
              className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end pt-1">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200 text-xs flex items-center gap-1.5"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Simpan Pengaturan</span>
          </button>
        </div>

      </div>
    </div>
  );
}