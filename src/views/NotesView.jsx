import React from 'react';
import { BookOpen, Plus, Trash2, Tag } from 'lucide-react';

export default function NotesView({ notes, onAddNote, onDeleteNote }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-blue-100 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <span>Catatan Kuliah</span>
          </h2>
          <p className="text-xs text-slate-500">Simpan ide, rangkuman, dan instruksi dosen.</p>
        </div>
        <button
          onClick={onAddNote}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Catatan</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {notes.map(note => (
          <div key={note.id} className="bg-white border border-blue-100 rounded-2xl p-5 shadow-sm space-y-3 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md text-xs font-semibold border border-blue-100">
                  {note.subject}
                </span>
                <button onClick={() => onDeleteNote(note.id)} className="text-slate-400 hover:text-rose-600">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <h3 className="font-bold text-slate-800 text-base mt-3">{note.title}</h3>
              <p className="text-xs text-slate-600 mt-2 whitespace-pre-line">{note.content}</p>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">
              Diperbarui: {new Date(note.date).toLocaleDateString('id-ID')}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}