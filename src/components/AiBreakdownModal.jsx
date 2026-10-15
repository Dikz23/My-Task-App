import React, { useState } from 'react';
import { Sparkles, X, Check } from 'lucide-react';

export default function AiBreakdownModal({ isOpen, onClose, onApplyBreakdown }) {
  if (!isOpen) return null;

  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      setResult({
        title: prompt,
        subtasks: [
          'Riset referensi dan literatur terkait',
          'Penyusunan kerangka dan draft utama',
          'Review materi dan pembacaan ulang',
          'Finalisasi dokumen dan unggah tugas'
        ]
      });
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-blue-100 rounded-3xl p-6 w-full max-w-lg shadow-xl space-y-4">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-500" /> AI Pemecah Tugas
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="space-y-3 text-xs">
          <label className="font-medium text-slate-700">Masukkan Judul / Topik Tugas Besar Anda:</label>
          <input
            type="text"
            placeholder="Contoh: Membuat Laporan Riset Makroekonomi"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-2.5 bg-blue-50/50 border border-blue-100 rounded-xl"
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt}
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Menganalisis...' : 'Generate Breakdown Langkah'}
          </button>

          {result && (
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 space-y-2 mt-4">
              <h4 className="font-bold text-slate-800">Saran Subtask:</h4>
              <ul className="space-y-1">
                {result.subtasks.map((st, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-700">
                    <Check className="w-3.5 h-3.5 text-blue-600" />
                    <span>{st}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}