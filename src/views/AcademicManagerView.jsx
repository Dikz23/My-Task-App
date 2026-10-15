import React, { useState } from 'react';
import { BookOpen, Users, Award, FileText } from 'lucide-react';

export default function AcademicManagerView() {
  const [subjects, setSubjects] = useState([
    { id: '1', name: 'Pemrograman Web React', lecturer: 'Dr. Budi Santoso, M.Kom', sdm: '3 SKS', room: 'Lab Komputer 3' },
    { id: '2', name: 'Kecerdasan Buatan', lecturer: 'Siti Rahma, M.T.', sdm: '3 SKS', room: 'Ruang 402' }
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          <span>Manajemen Akademik (Mata Kuliah & Dosen)</span>
        </h2>
        <p className="text-xs text-slate-500">Kelola informasi dosen pengampu, ruang kelas, dan bank materi.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {subjects.map(subj => (
          <div key={subj.id} className="bg-white border border-blue-100 rounded-2xl p-5 shadow-sm space-y-3">
            <div className="flex justify-between items-start">
              <h3 className="font-bold text-slate-800 text-sm">{subj.name}</h3>
              <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-md border border-blue-100">{subj.sdm}</span>
            </div>
            <p className="text-xs text-slate-600 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-blue-600" /> Dosen: <span className="font-medium text-slate-800">{subj.lecturer}</span>
            </p>
            <p className="text-xs text-slate-500">Ruangan: {subj.room}</p>
          </div>
        ))}
      </div>
    </div>
  );
}