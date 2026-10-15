import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function TaskModal({ isOpen, onClose, onSave, editingTask }) {
  if (!isOpen) return null;

  const [title, setTitle] = useState(editingTask?.title || '');
  const [subject, setSubject] = useState(editingTask?.subject || '');
  const [category, setCategory] = useState(editingTask?.category || 'Tugas');
  
  // Format awal untuk datetime-local (jika edit, ambil string mentahnya)
  const [dueDate, setDueDate] = useState(editingTask?.dueDate ? editingTask.dueDate.slice(0, 16) : '');
  
  const [priority, setPriority] = useState(editingTask?.priority || 'Sedang');
  const [description, setDescription] = useState(editingTask?.description || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    onSave({
      id: editingTask?.id || Date.now().toString(),
      title,
      subject,
      category,
      // Menyimpan string dueDate mentah-mentah (misal: "2026-10-14T15:08") tanpa konversi UTC Date()
      dueDate,
      priority,
      status: editingTask?.status || 'Belum Dikerjakan',
      progress: editingTask?.progress || 0,
      description,
      subtasks: editingTask?.subtasks || []
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-blue-100 rounded-3xl p-6 w-full max-w-lg shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="font-bold text-slate-800 text-base">
            {editingTask ? 'Edit Tugas' : 'Tambah Tugas Baru'}
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-medium text-slate-700">Nama Tugas</label>
            <input
              required
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-1 p-2.5 bg-blue-50/50 border border-blue-100 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-medium text-slate-700">Mata Kuliah</label>
              <input
                required
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full mt-1 p-2.5 bg-blue-50/50 border border-blue-100 rounded-xl"
              />
            </div>
            <div>
              <label className="font-medium text-slate-700">Prioritas</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full mt-1 p-2.5 bg-blue-50/50 border border-blue-100 rounded-xl"
              >
                <option value="Tinggi">Tinggi</option>
                <option value="Sedang">Sedang</option>
                <option value="Rendah">Rendah</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-medium text-slate-700">Tanggal & Jam Deadline</label>
            <input
              required
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full mt-1 p-2.5 bg-blue-50/50 border border-blue-100 rounded-xl"
            />
          </div>

          <div>
            <label className="font-medium text-slate-700">Deskripsi / Instruksi</label>
            <textarea
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-1 p-2.5 bg-blue-50/50 border border-blue-100 rounded-xl"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-xl">Batal</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700">Simpan</button>
          </div>
        </form>
      </div>
    </div>
  );
}