import React, { useState } from 'react';
import { 
  Plus, Filter, ArrowUpDown, Trash2, Edit3, Paperclip, 
  CheckSquare, Clock, FileText, Check, ChevronDown 
} from 'lucide-react';

export default function TaskManagementView({ 
  tasks, 
  onAddTask, 
  onEditTask, 
  onDeleteTask, 
  onToggleTaskComplete,
  onToggleSubtask
}) {
  const [filterSubject, setFilterSubject] = useState('All');
  const [filterPriority, setFilterPriority] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  // Filter tasks based on selects
  const filteredTasks = tasks.filter(task => {
    if (filterSubject !== 'All' && task.subject !== filterSubject) return false;
    if (filterPriority !== 'All' && task.priority !== filterPriority) return false;
    if (filterStatus !== 'All' && task.status !== filterStatus) return false;
    return true;
  });

  const subjects = ['All', ...new Set(tasks.map(t => t.subject))];

  return (
    <div className="space-y-6">
      
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl border border-blue-100 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Manajemen Tugas</h2>
          <p className="text-xs text-slate-500">Kelola seluruh daftar tugas kuliah dan proyek Anda.</p>
        </div>
        <button
          onClick={onAddTask}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Tugas Baru</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-wrap items-center gap-3 bg-white p-3 rounded-xl border border-blue-100 text-xs">
        <div className="flex items-center gap-1.5 text-slate-500 font-medium">
          <Filter className="w-3.5 h-3.5" />
          <span>Filter:</span>
        </div>

        {/* Filter Subject */}
        <select 
          value={filterSubject}
          onChange={(e) => setFilterSubject(e.target.value)}
          className="bg-blue-50/50 border border-blue-100 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700"
        >
          {subjects.map(s => <option key={s} value={s}>{s === 'All' ? 'Semua Matkul' : s}</option>)}
        </select>

        {/* Filter Priority */}
        <select 
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          className="bg-blue-50/50 border border-blue-100 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700"
        >
          <option value="All">Semua Prioritas</option>
          <option value="Tinggi">Tinggi</option>
          <option value="Sedang">Sedang</option>
          <option value="Rendah">Rendah</option>
        </select>

        {/* Filter Status */}
        <select 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-blue-50/50 border border-blue-100 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 text-slate-700"
        >
          <option value="All">Semua Status</option>
          <option value="Belum Dikerjakan">Belum Dikerjakan</option>
          <option value="Sedang Dikerjakan">Sedang Dikerjakan</option>
          <option value="Selesai">Selesai</option>
        </select>
      </div>

      {/* Task Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTasks.map((task) => (
          <div 
            key={task.id}
            className="bg-white border border-blue-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
          >
            <div>
              {/* Task Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => onToggleTaskComplete(task.id)}
                    className={`mt-1 w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                      task.status === 'Selesai' 
                        ? 'bg-blue-600 border-blue-600 text-white' 
                        : 'border-slate-300 hover:border-blue-600'
                    }`}
                  >
                    {task.status === 'Selesai' && <Check className="w-3.5 h-3.5" />}
                  </button>
                  <div>
                    <h3 className={`font-semibold text-slate-800 text-base ${task.status === 'Selesai' ? 'line-through text-slate-400' : ''}`}>
                      {task.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-700 rounded-md text-xs font-semibold border border-blue-100">
                        {task.subject}
                      </span>
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded-md text-xs">
                        {task.category}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button onClick={() => onEditTask(task)} className="p-1 text-slate-400 hover:text-blue-600">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button onClick={() => onDeleteTask(task.id)} className="p-1 text-slate-400 hover:text-rose-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Task Description */}
              {task.description && (
                <p className="text-xs text-slate-600 mt-3 line-clamp-2">{task.description}</p>
              )}

              {/* Subtasks Progress */}
              {task.subtasks && task.subtasks.length > 0 && (
                <div className="mt-4 space-y-2 bg-blue-50/40 p-3 rounded-xl border border-blue-50">
                  <div className="flex justify-between text-xs text-slate-600 font-medium">
                    <span>Subtask ({task.subtasks.filter(s => s.completed).length}/{task.subtasks.length})</span>
                    <span>{task.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full transition-all" style={{ width: `${task.progress}%` }}></div>
                  </div>
                  <div className="space-y-1.5 mt-2">
                    {task.subtasks.map((st) => (
                      <label key={st.id} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={st.completed}
                          onChange={() => onToggleSubtask(task.id, st.id)}
                          className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                        />
                        <span className={st.completed ? 'line-through text-slate-400' : ''}>{st.title}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Task Footer Info */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-1 text-blue-600 font-medium">
                <Clock className="w-3.5 h-3.5" />
                <span>{new Date(task.dueDate).toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}</span>
              </div>
              {task.attachment && (
                <a href={task.attachment} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-600 hover:underline">
                  <Paperclip className="w-3.5 h-3.5" />
                  <span>Lampiran</span>
                </a>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}