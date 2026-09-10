import { useState, useEffect } from 'react';

const TaskModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'TODO',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        status: initialData.status || 'TODO',
      });
    } else {
      setFormData({ title: '', description: '', status: 'TODO' });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      
      <div
        className="fixed inset-0 bg-[#1C1917]/40 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      
      <div className="relative max-w-md w-full rounded-3xl p-6 sm:p-8 transition-all duration-300 transform scale-100 z-10 overflow-hidden shadow-xl border border-[#E8E1D7] bg-[#FAF7F2]">
        
        
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl sm:text-2xl font-bold text-[#1C1917] tracking-tight">
            {initialData ? 'Edit Task' : 'Create New Task'}
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F5F0E6] hover:bg-[#E8E1D7] text-[#78716C] hover:text-[#1C1917] flex items-center justify-center font-bold text-sm transition active:scale-95"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-extrabold text-[#78716C] mb-1.5 uppercase tracking-widest">
              Title
            </label>
            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-white border border-[#E8E1D7] focus:border-[#F05A28] rounded-2xl px-4 py-2.5 text-[#1C1917] placeholder-[#A1988A] focus:outline-none focus:ring-2 focus:ring-[#F05A28]/20 transition duration-200 font-medium text-sm"
              placeholder="What needs to be done?"
            />
          </div>

          <div>
            <label className="block text-[11px] font-extrabold text-[#78716C] mb-1.5 uppercase tracking-widest">
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-white border border-[#E8E1D7] focus:border-[#F05A28] rounded-2xl px-4 py-2.5 text-[#1C1917] placeholder-[#A1988A] focus:outline-none focus:ring-2 focus:ring-[#F05A28]/20 transition duration-200 resize-none font-medium text-sm"
              placeholder="Add more details (optional)"
            />
          </div>

          <div>
            <label className="block text-[11px] font-extrabold text-[#78716C] mb-1.5 uppercase tracking-widest">
              Status
            </label>
            <div className="relative">
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-white border border-[#E8E1D7] focus:border-[#F05A28] rounded-2xl px-4 py-2.5 text-[#1C1917] font-semibold focus:outline-none focus:ring-2 focus:ring-[#F05A28]/20 transition duration-200 appearance-none cursor-pointer pr-10 text-sm"
              >
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#A1988A]">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-[#F5F0E6] hover:bg-[#E8E1D7] text-[#1C1917] font-semibold py-2.5 rounded-2xl transition duration-200 active:scale-95 text-xs tracking-wide"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#F05A28] hover:bg-[#E04818] text-white font-semibold py-2.5 rounded-2xl shadow-[0_8px_20px_rgba(240,90,40,0.30)] hover:shadow-[0_10px_25px_rgba(240,90,40,0.40)] transition duration-200 active:scale-95 disabled:opacity-50 text-xs tracking-wide"
            >
              {loading ? 'Saving...' : initialData ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;