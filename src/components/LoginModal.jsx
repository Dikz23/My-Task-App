import React, { useState } from 'react';
import { LogIn, Eye, EyeOff, Lock, Mail, Sparkles, UserPlus } from 'lucide-react';

export default function LoginModal({ isOpen, onLoginSuccess, onSwitchToRegister }) {
  if (!isOpen) return null;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;

    // Logika simulasi autentikasi login
    const userData = {
      name: email.split('@')[0] || 'Mahasiswa',
      email: email,
      university: 'Universitas Pamulang'
    };

    onLoginSuccess(userData);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white border border-blue-100 rounded-3xl p-6 sm:p-8 w-full max-w-md shadow-2xl space-y-6 relative overflow-hidden">
        
        {/* Hiasan background subtle */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-100/50 rounded-full blur-2xl pointer-events-none"></div>

        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-2xl shadow-lg shadow-blue-200 mb-1">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Academic Suite</h2>
          <p className="text-xs text-slate-500">Masuk untuk mengelola tugas, jadwal & produktivitasmu.</p>
        </div>

        {/* Form Login */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-700 block mb-1">Email Mahasiswa / Kampus</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                required
                type="email"
                placeholder="nama@mahasiswa.ac.id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-blue-50/40 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-slate-700 block mb-1">Kata Sandi</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                required
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-blue-50/40 border border-blue-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium text-slate-700"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px]">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-3.5 h-3.5 text-blue-600 rounded border-blue-300 focus:ring-blue-500"
              />
              Ingat Saya
            </label>
            <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Instruksi reset kata sandi telah dikirim ke email Anda.'); }} className="text-blue-600 font-semibold hover:underline">
              Lupa Kata Sandi?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" /> Masuk ke Akun
          </button>
        </form>

        {/* Footer: Beralih ke Register */}
        <div className="pt-2 border-t border-slate-100 text-center text-xs text-slate-500">
          Belum memiliki akun?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-blue-600 font-bold hover:underline inline-flex items-center gap-1 ml-1"
          >
            <UserPlus className="w-3.5 h-3.5" /> Buat Akun Baru
          </button>
        </div>

      </div>
    </div>
  );
}