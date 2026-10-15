import React, { useState } from 'react';
import { UserPlus, Eye, EyeOff, Lock, Mail, User, GraduationCap, CheckCircle2 } from 'lucide-react';

export default function RegisterModal({ isOpen, onRegisterSuccess, onSwitchToLogin }) {
  if (!isOpen) return null;

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [university, setUniversity] = useState('Universitas Pamulang');
  const [major, setMajor] = useState('Teknik Informatika');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Konfirmasi kata sandi tidak cocok!');
      return;
    }

    const newUserData = {
      name: fullName,
      email: email,
      university: `${university} - ${major}`
    };

    alert('Pendaftaran akun berhasil! Anda sekarang masuk.');
    onRegisterSuccess(newUserData);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white border border-blue-100 rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl space-y-5 relative overflow-hidden max-h-[90vh] overflow-y-auto">
        
        {/* Header Branding */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-200 mb-1">
            <UserPlus className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Daftar Akun Mahasiswa</h2>
          <p className="text-xs text-slate-500">Bergabunglah dan tingkatkan manajemen produktivitas kuliahmu.</p>
        </div>

        {/* Form Registrasi */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Nama Lengkap</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                required
                type="text"
                placeholder="Andika Septa Nugraha"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-blue-50/40 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Email Aktif</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                required
                type="email"
                placeholder="andika@mahasiswa.ac.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-blue-50/40 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Universitas / Perguruan Tinggi</label>
              <div className="relative">
                <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  required
                  type="text"
                  placeholder="Universitas Pamulang"
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                  className="w-full pl-10 pr-3 py-2.5 bg-blue-50/40 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium text-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Program Studi / Jurusan</label>
              <input
                required
                type="text"
                placeholder="Teknik Informatika"
                value={major}
                onChange={(e) => setMajor(e.target.value)}
                className="w-full px-3 py-2.5 bg-blue-50/40 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium text-slate-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Kata Sandi</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Minimal 6 karakter"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-8 py-2.5 bg-blue-50/40 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium text-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Konfirmasi Kata Sandi</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  required
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Ulangi kata sandi"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-10 pr-8 py-2.5 bg-blue-50/40 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium text-slate-700"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2 mt-2"
          >
            <CheckCircle2 className="w-4 h-4" /> Daftar & Buat Akun
          </button>
        </form>

        {/* Footer: Beralih ke Login */}
        <div className="pt-2 border-t border-slate-100 text-center text-xs text-slate-500">
          Sudah memiliki akun?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-blue-600 font-bold hover:underline inline-flex items-center gap-1 ml-1"
          >
            Masuk Sekarang
          </button>
        </div>

      </div>
    </div>
  );
}