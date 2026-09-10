import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import TaskModal from '../components/TaskModal';
import { fetchTasks, createTask, updateTask, deleteTask } from '../api/services';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Pin, 
  Zap, 
  CheckCircle2, 
  Loader2,
  MoreHorizontal
} from 'lucide-react';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const loadTasks = async () => {
    try {
      const response = await fetchTasks();
      setTasks(response.data);
    } catch (err) {
      console.error('Failed to load tasks', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const handleOpenCreateModal = () => {
    setEditingTask(null);
    setShowModal(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setShowModal(true);
  };

  const handleSaveTask = async (formData) => {
    setShowModal(false);
    if (editingTask) {
      const previousTasks = tasks;
      setTasks((prev) => prev.map((t) => (t.id === editingTask.id ? { ...t, ...formData } : t)));
      try {
        const response = await updateTask(editingTask.id, formData);
        setTasks((prev) => prev.map((t) => (t.id === editingTask.id ? response.data : t)));
      } catch (err) {
        console.error(err);
        setTasks(previousTasks);
        alert('Failed to update task. Please try again.');
      }
    } else {
      try {
        const response = await createTask(formData);
        setTasks((prev) => [...prev, response.data]);
      } catch (err) {
        console.error(err);
        alert('Failed to create task. Please try again.');
      }
    }
  };

  const handleStatusChange = async (task, newStatus) => {
    const previousTasks = tasks;
    setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, status: newStatus } : t)));
    try {
      await updateTask(task.id, { status: newStatus });
    } catch (err) {
      console.error(err);
      setTasks(previousTasks);
      alert(err.response?.data?.message?.[0] || 'Failed to update status. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    const previousTasks = tasks;
    setTasks((prev) => prev.filter((t) => t.id !== id));
    try {
      await deleteTask(id);
    } catch (err) {
      console.error(err);
      setTasks(previousTasks);
      alert('Failed to delete task. Please try again.');
    }
  };

  const getAllowedStatuses = (currentStatus) => {
    switch (currentStatus) {
      case 'TODO':
        return ['TODO', 'IN_PROGRESS'];
      case 'IN_PROGRESS':
        return ['IN_PROGRESS', 'DONE'];
      case 'DONE':
        return ['DONE'];
      default:
        return ['TODO', 'IN_PROGRESS', 'DONE'];
    }
  };

 
  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'TODO':
        return 'bg-orange-100/70 text-[#F05A28] border-orange-200/80 hover:bg-orange-100';
      case 'IN_PROGRESS':
        return 'bg-amber-100/70 text-amber-800 border-amber-200/80 hover:bg-amber-100';
      case 'DONE':
        return 'bg-emerald-100/70 text-emerald-800 border-emerald-200/80 hover:bg-emerald-100';
      default:
        return 'bg-[#FAF7F2] text-[#1C1917] border-[#E8E1D7]';
    }
  };

  const statusLabels = {
    TODO: 'To do',
    IN_PROGRESS: 'In progress',
    DONE: 'Done',
  };

  const columns = [
    { 
      key: 'TODO', 
      title: 'To do', 
      dotColor: 'bg-[#F05A28]',
      EmptyIcon: Pin
    },
    { 
      key: 'IN_PROGRESS', 
      title: 'In Progress', 
      dotColor: 'bg-amber-500',
      EmptyIcon: Zap
    },
    { 
      key: 'DONE', 
      title: 'Done', 
      dotColor: 'bg-emerald-600',
      EmptyIcon: CheckCircle2
    }
  ];

  return (
    <div className="min-h-screen text-[#1C1917] bg-[#FAF7F2] font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 sm:px-10 py-8">
        
        
        <header className="mb-8">
          <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-widest text-[#F05A28] mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F05A28]"></span>
            Thursday, September 10
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
           <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1917]">
       {getGreeting()}, <span className="capitalize">{user.name ? user.name.split(' ')[0] : 'User'}</span><span className="text-[#F05A28]">.</span>
       </h1>

            <button
              onClick={handleOpenCreateModal}
              className="flex items-center gap-2 bg-[#F05A28] hover:bg-[#E04818] text-white font-semibold px-4 py-2.5 rounded-2xl shadow-[0_8px_20px_rgba(240,90,40,0.35),0_0_18px_rgba(240,90,40,0.20)] hover:shadow-[0_10px_25px_rgba(240,90,40,0.45),0_0_25px_rgba(240,90,40,0.30)] transition-all duration-300 active:scale-95 text-xs tracking-wide self-start sm:self-auto"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              New task
            </button>
          </div>

          <p className="text-[#78716C] text-xs font-medium mt-1.5">
            Analyze and track your daily work seamlessly.
          </p>
        </header>

        {/* Section Heading */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-[#1C1917]">My Tasks</h2>
        </div>

        {/* Task Columns Board */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 text-[#F05A28] animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {columns.map((col) => {
              const colTasks = tasks.filter((t) => t.status === col.key);

              return (
                <div 
                  key={col.key} 
                  className="bg-white/70 border border-[#E8E1D7] rounded-3xl p-5 shadow-sm min-h-[480px] flex flex-col"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4 pb-2">
                    <div className="flex items-center gap-2.5">
                      {/* Dual-Layer Layered Glow Dot */}
                      <div className="relative flex items-center justify-center w-3 h-3">
                        <div className={`absolute w-4 h-4 rounded-full opacity-50 blur-[4px] ${col.dotColor}`}></div>
                        <div className={`relative w-2.5 h-2.5 rounded-full ${col.dotColor}`}></div>
                      </div>

                      <h3 className="font-bold text-sm text-[#1C1917]">{col.title}</h3>
                      <span className="text-[11px] font-semibold text-[#78716C] bg-[#F5F0E6] px-2.5 py-0.5 rounded-full">
                        {colTasks.length}
                      </span>
                    </div>
                    <MoreHorizontal className="w-4 h-4 text-[#A1988A] cursor-pointer hover:text-[#1C1917]" />
                  </div>

                  {/* Task Cards */}
                  <div className="space-y-3.5 flex-1">
                    {colTasks.length === 0 ? (
                      <div className="h-44 border border-dashed border-[#E8E1D7] rounded-2xl flex flex-col items-center justify-center text-center p-4">
                        <col.EmptyIcon className="w-6 h-6 text-[#A1988A] mb-2 stroke-[1.5]" />
                        <p className="text-xs font-semibold text-[#A1988A]">No tasks yet</p>
                      </div>
                    ) : (
                      colTasks.map((task) => (
                        <div
                          key={task.id}
                          className="bg-white border border-[#E8E1D7] hover:border-[#D6C7B2] p-4 rounded-2xl shadow-sm transition group"
                        >
                          <h4 
                            onClick={() => handleOpenEditModal(task)}
                            className="font-bold text-sm text-[#1C1917] group-hover:text-[#F05A28] cursor-pointer transition"
                          >
                            {task.title}
                          </h4>
                          <p className="text-xs text-[#78716C] mt-1 line-clamp-2 leading-relaxed">
                            {task.description || 'No description provided.'}
                          </p>

                          <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#F5F0E6]">
                            {/* Dynamic Badge Selection */}
                            <select
                              value={task.status}
                              onChange={(e) => handleStatusChange(task, e.target.value)}
                              disabled={task.status === 'DONE'}
                              className={`font-semibold text-[11px] rounded-lg px-2.5 py-1 focus:outline-none cursor-pointer border transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed ${getStatusBadgeStyle(task.status)}`}
                            >
                              {getAllowedStatuses(task.status).map((status) => (
                                <option key={status} value={status} className="bg-white text-[#1C1917]">
                                  {statusLabels[status]}
                                </option>
                              ))}
                            </select>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleOpenEditModal(task)}
                                className="text-[#A1988A] hover:text-[#F05A28] transition p-1"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDelete(task.id)}
                                className="text-[#A1988A] hover:text-red-600 transition p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <TaskModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSaveTask}
        initialData={editingTask}
      />
    </div>
  );
};

export default Dashboard;