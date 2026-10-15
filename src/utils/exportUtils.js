// Function to export tasks as CSV file
export const exportToCSV = (tasks) => {
  const headers = ['ID', 'Judul', 'Mata Kuliah', 'Kategori', 'Deadline', 'Prioritas', 'Status', 'Progres (%)', 'Estimasi (jam)'];
  const rows = tasks.map(t => [
    t.id,
    `"${t.title.replace(/"/g, '""')}"`,
    `"${t.subject}"`,
    `"${t.category}"`,
    t.dueDate,
    t.priority,
    t.status,
    t.progress,
    t.estimatedHours
  ]);

  const csvContent = "data:text/csv;charset=utf-8," 
    + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `laporan_tugas_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Simple text-formatted print to PDF helper
export const printToPDF = () => {
  window.print();
};