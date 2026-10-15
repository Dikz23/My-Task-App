import React, { useState } from 'react';
import { BookOpen, X, Check } from 'lucide-react';

export default function NoteModal({ isOpen, onClose, onSave, editingNote }) {
  if (!isOpen) return null;

  const [title, setTitle] = useState(editingNote?.title || '');
  const [subject, setSubject] = useState(editingNote?.subject || 'Teknik Informatika');
  const [content, setContent] = useState(editingNote?.content || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: editingNote?.id || Date.now().toString(),
      title,
      subject,
      content,
      date: new Date().toISOString().split('T')[0]
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-blue-100 rounded-3xl p-6 w-full max-w-lg shadow-2xl space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-200">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">
                {editingNote ? 'Edit Catatan Kuliah' : 'Tambah Catatan Baru'}
              </h3>
              <p className="text-[11px] text-blue-600 font-medium">Bank Materi & Referensi</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-blue-50 rounded-xl transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Catatan */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-medium text-slate-700">Judul Catatan / Materi</label>
            <input
              required
              type="text"
              placeholder="Contoh: Rangkuman React Hooks & Context"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-1 p-2.5 bg-blue-50/50 border border-blue-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="font-medium text-slate-700">Mata Kuliah / Kategori</label>
            <input
              required
              type="text"
              placeholder="Contoh: Pemrograman Web"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full mt-1 p-2.5 bg-blue-50/50 border border-blue-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="font-medium text-slate-700">Isi Catatan / Instruksi Dosen</label>
            <textarea
              required
              rows="5"
              placeholder="Tulis catatan, rangkuman, atau link referensi materi di sini..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full mt-1 p-2.5 bg-blue-50/50 border border-blue-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl font-medium">
              Batal
            </button>
            <button type="submit" className="px-5 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 shadow-sm flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" /> Simpan Catatan
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}