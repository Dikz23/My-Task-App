import React, { useState } from 'react';
import { Users, X, MessageSquare, Send, CheckCircle2, Shield } from 'lucide-react';

export default function GroupCollaborationModal({ isOpen, onClose, task }) {
  if (!isOpen) return null;

  const [comments, setComments] = useState([
    { id: '1', user: 'Andika Septa', text: 'Bagian frontend sudah saya deploy ke Vercel.', time: '10:30 WIB' }
  ]);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      ...comments,
      { id: Date.now().toString(), user: 'Andika Septa', text: newComment, time: 'Baru saja' }
    ]);
    setNewComment('');
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-blue-100 rounded-3xl p-6 w-full max-w-lg shadow-2xl space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-200">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">Kolaborasi Tugas Kelompok</h3>
              <p className="text-[11px] text-blue-600 font-medium">{task?.title || 'Manajemen Tim'}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-blue-50 rounded-xl transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Anggota Tim */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-700">Anggota Tim Terdaftar:</label>
          <div className="flex flex-wrap gap-2">
            <span className="px-2.5 py-1 bg-blue-50 text-blue-800 border border-blue-100 rounded-lg text-xs font-medium flex items-center gap-1.5">
              <Shield className="w-3 h-3 text-blue-600" /> Andika Septa (Leader)
            </span>
            <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">
              Rizky Ramadhan (Contributor)
            </span>
            <span className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">
              Siti Aminah (Contributor)
            </span>
          </div>
        </div>

        {/* Diskusi & Komentar */}
        <div className="space-y-3">
          <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5 text-blue-600" /> Diskusi & Riwayat Komentar
          </label>
          
          <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-3 max-h-40 overflow-y-auto space-y-2.5">
            {comments.map((c) => (
              <div key={c.id} className="bg-white p-2.5 rounded-xl border border-blue-100 shadow-2xs space-y-1">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-bold text-blue-900">{c.user}</span>
                  <span className="text-slate-400">{c.time}</span>
                </div>
                <p className="text-xs text-slate-700">{c.text}</p>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddComment} className="flex gap-2">
            <input
              type="text"
              placeholder="Tulis komentar atau instruksi tim..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 p-2 bg-blue-50/50 border border-blue-100 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition-colors flex items-center gap-1">
              <Send className="w-3 h-3" /> Kirim
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}