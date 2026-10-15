import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import DashboardView from './views/DashboardView';
import TaskManagementView from './views/TaskManagementView';
import CalendarView from './views/CalendarView';
import PomodoroView from './views/PomodoroView';
import NotesView from './views/NotesView';
import RecommendationsView from './views/RecommendationsView';
import StatsView from './views/StatsView';
import SettingsView from './views/SettingsView';

// Fitur & View Tambahan Tingkat Lanjut
import TimeBlockingView from './views/TimeBlockingView';
import AcademicManagerView from './views/AcademicManagerView';
import GamificationView from './views/GamificationView';

// Modals & Authentication
import TaskModal from './components/TaskModal';
import AiBreakdownModal from './components/AiBreakdownModal';
import WidgetLayarUtama from './components/WidgetLayarUtama';
import AlarmSoundModal from './components/AlarmSoundModal';
import NotificationCenter from './components/NotificationCenter';
import NoteModal from './components/NoteModal';
import GroupCollaborationModal from './components/GroupCollaborationModal';
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';

import { exportToCSV } from './utils/exportUtils';

export default function App() {
  // State Autentikasi (Default belum login, memunculkan modal login)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(true);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const [activeTab, setActiveTab] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Modals visibility state
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [isWidgetModalOpen, setIsWidgetModalOpen] = useState(false);
  const [isAlarmModalOpen, setIsAlarmModalOpen] = useState(false);
  const [isNotifModalOpen, setIsNotifModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isCollabModalOpen, setIsCollabModalOpen] = useState(false);

  const [editingTask, setEditingTask] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [activeCollabTask, setActiveCollabTask] = useState(null);

  // User Stats & Settings
  const [userPoints, setUserPoints] = useState(250);
  const [streak, setStreak] = useState(5);
  const [userProfile, setUserProfile] = useState({
    name: 'Andika Septa Nugraha',
    university: 'Universitas Pamulang'
  });

  // Alarm & Sound Settings (Fitur #4)
  const [alarmSettings, setAlarmSettings] = useState({
    soundType: 'normal',
    volume: 0.8,
    repeat: false
  });

  // Main State: Tasks (dengan LocalStorage persistence)
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks_data');
    return saved ? JSON.parse(saved) : [
      {
        id: '1',
        title: 'Makalah Pemrograman Web React',
        subject: 'Teknik Informatika',
        category: 'Tugas Utama',
        dueDate: '2026-10-15T23:59',
        priority: 'Tinggi',
        status: 'Sedang Dikerjakan',
        progress: 50,
        description: 'Implementasi React Hooks dan Tailwind CSS pada Web App',
        subtasks: [
          { id: 's1', title: 'Setup UI Layout', completed: true },
          { id: 's2', title: 'Integrasi State Data', completed: false }
        ]
      }
    ];
  });

  // Notes state
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem('notes_data');
    return saved ? JSON.parse(saved) : [
      { id: '1', title: 'Materi Algoritma', subject: 'Pemrograman', content: 'Pelajari Big O Notation.', date: '2026-10-10' }
    ];
  });

  // Auto save to LocalStorage
  useEffect(() => {
    localStorage.setItem('tasks_data', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('notes_data', JSON.stringify(notes));
  }, [notes]);

  // Audio Player Helper (Support volume, repeat & soundType)
  const playAlarmSound = (type = alarmSettings.soundType, customVol = alarmSettings.volume) => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();

      osc.frequency.value = type === 'urgent' ? 880 : type === 'overdue' ? 600 : 440;
      gainNode.gain.value = customVol;

      osc.connect(gainNode);
      gainNode.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + (type === 'urgent' ? 0.6 : 0.3));
    } catch (e) {
      console.log('Audio Context Error', e);
    }
  };

  // Handlers Sukses Login / Register
  const handleAuthSuccess = (userData) => {
    setUserProfile({
      name: userData.name || 'Mahasiswa',
      university: userData.university || 'Universitas Pamulang'
    });
    setIsAuthenticated(true);
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(false);
  };

  // Handlers untuk manipulasi Tugas
  const handleSaveTask = (taskData) => {
    if (editingTask) {
      setTasks(tasks.map(t => t.id === taskData.id ? taskData : t));
    } else {
      setTasks([...tasks, taskData]);
      setUserPoints(prev => prev + 10);
    }
    setEditingTask(null);
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleToggleTaskComplete = (id) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const isDone = t.status === 'Selesai';
        if (!isDone) setUserPoints(prev => prev + 25);
        return {
          ...t,
          status: isDone ? 'Belum Dikerjakan' : 'Selesai',
          progress: isDone ? 0 : 100
        };
      }
      return t;
    }));
  };

  const handleToggleSubtask = (taskId, subtaskId) => {
    setTasks(tasks.map(t => {
      if (t.id === taskId) {
        const updatedSubtasks = t.subtasks.map(s => s.id === subtaskId ? { ...s, completed: !s.completed } : s);
        const completedCount = updatedSubtasks.filter(s => s.completed).length;
        const progress = Math.round((completedCount / updatedSubtasks.length) * 100);
        return { ...t, subtasks: updatedSubtasks, progress };
      }
      return t;
    }));
  };

  // Handlers untuk Catatan (Notes)
  const handleSaveNote = (noteData) => {
    if (editingNote) {
      setNotes(notes.map(n => n.id === noteData.id ? noteData : n));
    } else {
      setNotes([...notes, noteData]);
    }
    setEditingNote(null);
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-slate-900 text-white' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* Jika belum terautentikasi, tampilkan Modal Login / Register */}
      {!isAuthenticated && (
        <>
          <LoginModal
            isOpen={isLoginModalOpen}
            onLoginSuccess={handleAuthSuccess}
            onSwitchToRegister={() => {
              setIsLoginModalOpen(false);
              setIsRegisterModalOpen(true);
            }}
          />
          <RegisterModal
            isOpen={isRegisterModalOpen}
            onRegisterSuccess={handleAuthSuccess}
            onSwitchToLogin={() => {
              setIsRegisterModalOpen(false);
              setIsLoginModalOpen(true);
            }}
          />
        </>
      )}

      {/* Jika sudah terautentikasi, tampilkan aplikasi utama */}
      {isAuthenticated && (
        <>
          {/* Header Navigation */}
          <Navbar
            userPoints={userPoints}
            streak={streak}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onOpenWidget={() => setIsWidgetModalOpen(true)}
            onOpenAiModal={() => setIsAiModalOpen(true)}
            onOpenAlarmModal={() => setIsAlarmModalOpen(true)}
            onOpenNotifModal={() => setIsNotifModalOpen(true)}
            onExportCSV={() => exportToCSV(tasks)}
            onSyncCalendar={() => alert('Jadwal terhubung dengan Google Calendar!')}
          />

          <div className="flex">
            {/* Navigation Sidebar */}
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Dynamic Main View */}
            <main className="flex-1 p-4 sm:p-6 max-w-7xl mx-auto">
              {activeTab === 'dashboard' && (
                <DashboardView
                  tasks={tasks}
                  onAddTask={() => { setEditingTask(null); setIsTaskModalOpen(true); }}
                  onToggleTaskComplete={handleToggleTaskComplete}
                  onOpenAiModal={() => setIsAiModalOpen(true)}
                  setActiveTab={setActiveTab}
                />
              )}

              {activeTab === 'tasks' && (
                <TaskManagementView
                  tasks={tasks}
                  onAddTask={() => { setEditingTask(null); setIsTaskModalOpen(true); }}
                  onEditTask={(task) => { setEditingTask(task); setIsTaskModalOpen(true); }}
                  onDeleteTask={handleDeleteTask}
                  onToggleTaskComplete={handleToggleTaskComplete}
                  onToggleSubtask={handleToggleSubtask}
                />
              )}

              {activeTab === 'calendar' && <CalendarView tasks={tasks} />}
              {activeTab === 'pomodoro' && <PomodoroView onPlaySound={playAlarmSound} />}
              
              {/* Fitur Baru: Time Blocking & Focus Mode */}
              {activeTab === 'timeblocking' && <TimeBlockingView tasks={tasks} />}

              {/* Fitur Baru: Manajemen Akademik (Matkul & Dosen) */}
              {activeTab === 'academic' && <AcademicManagerView />}

              {/* Fitur Baru: Gamifikasi, Level & Reward */}
              {activeTab === 'gamification' && <GamificationView userPoints={userPoints} streak={streak} />}

              {activeTab === 'notes' && (
                <NotesView
                  notes={notes}
                  onAddNote={() => { setEditingNote(null); setIsNoteModalOpen(true); }}
                  onDeleteNote={handleDeleteNote}
                />
              )}

              {activeTab === 'recommendations' && <RecommendationsView tasks={tasks} />}
              {activeTab === 'stats' && <StatsView tasks={tasks} />}
              
              {activeTab === 'settings' && (
                <SettingsView
                  userProfile={userProfile}
                  setUserProfile={setUserProfile}
                  alarmSound={alarmSettings.soundType}
                  setAlarmSound={(val) => setAlarmSettings({ ...alarmSettings, soundType: val })}
                />
              )}
            </main>
          </div>

          {/* --- ALL MODALS --- */}
          <TaskModal
            isOpen={isTaskModalOpen}
            onClose={() => setIsTaskModalOpen(false)}
            onSave={handleSaveTask}
            editingTask={editingTask}
          />

          <AiBreakdownModal
            isOpen={isAiModalOpen}
            onClose={() => setIsAiModalOpen(false)}
          />

          <WidgetLayarUtama
            isOpen={isWidgetModalOpen}
            onClose={() => setIsWidgetModalOpen(false)}
            tasks={tasks}
          />

          <AlarmSoundModal
            isOpen={isAlarmModalOpen}
            onClose={() => setIsAlarmModalOpen(false)}
            alarmSettings={alarmSettings}
            setAlarmSettings={setAlarmSettings}
            onPlaySound={playAlarmSound}
          />

          <NotificationCenter
            isOpen={isNotifModalOpen}
            onClose={() => setIsNotifModalOpen(false)}
          />

          <NoteModal
            isOpen={isNoteModalOpen}
            onClose={() => setIsNoteModalOpen(false)}
            onSave={handleSaveNote}
            editingNote={editingNote}
          />

          <GroupCollaborationModal
            isOpen={isCollabModalOpen}
            onClose={() => setIsCollabModalOpen(false)}
            task={activeCollabTask}
          />
        </>
      )}

    </div>
  );
}