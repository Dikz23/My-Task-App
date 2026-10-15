import React from 'react';
import { Settings, User, Bell, Volume2, Database } from 'lucide-react';

export default function SettingsView({ userProfile, setUserProfile, alarmSound, setAlarmSound }) {
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <Settings className="w-5 h-5 text-blue-600" />
          <span>Pengaturan & Profil Pengguna</span>
        </h2>
      </div>

      <div className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm space-y-6">
        {/* User Info */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 border-b pb-2">
            <User className="w-4 h-4 text-blue-600" /> Profile Mahasiswa
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-slate-600">Nama Lengkap</label>
              <input
                type="text"
                value={userProfile.name}
                onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                className="w-full mt-1 p-2 bg-blue-50/50 border border-blue-100 rounded-xl text-xs"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-600">Universitas / Kampus</label>
              <input
                type="text"
                value={userProfile.university}
                onChange={(e) => setUserProfile({...userProfile, university: e.target.value})}
                className="w-full mt-1 p-2 bg-blue-50/50 border border-blue-100 rounded-xl text-xs"
              />
            </div>
          </div>
        </div>

        {/* Audio / Alarm Settings */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 border-b pb-2">
            <Volume2 className="w-4 h-4 text-blue-600" /> Pengaturan Suara Alarm
          </h3>
          <div>
            <label className="text-xs font-medium text-slate-600">Suara Notifikasi Default</label>
            <select
              value={alarmSound}
              onChange={(e) => setAlarmSound(e.target.value)}
              className="w-full mt-1 p-2 bg-blue-50/50 border border-blue-100 rounded-xl text-xs text-slate-700"
            >
              <option value="chime">Chime Ring (Biasa)</option>
              <option value="urgent">Urgent Siren (Penting)</option>
              <option value="digital">Digital Clock Alarm</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}