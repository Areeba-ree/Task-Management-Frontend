import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LogOut, 
  ChevronDown
} from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  
  const getInitials = (name) => {
    if (!name) return 'A';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-[#FFF8F5] border border-[#E8C8B7] px-6 sm:px-10 py-3.5 flex justify-between items-center sticky top-3 mx-3 sm:mx-5 z-40 rounded-2xl shadow-[0_4px_16px_rgba(120,70,45,0.12)]">
      
      <div className="flex items-center space-x-3">
        <div 
          className="w-9 h-9 rounded-2xl flex items-center justify-center font-black text-white text-base shadow-sm"
          style={{
            background: 'linear-gradient(135deg, #F05A28 0%, #E04818 100%)'
          }}
        >
          T
        </div>
        <div>
          <span className="text-lg font-bold text-[#1C1917] tracking-tight block leading-none">
            TaskSphere
          </span>
          <span className="text-[10px] font-semibold tracking-wider text-[#A1988A] uppercase">
            Personal Workspace
          </span>
        </div>
      </div>

      
      <div className="flex items-center gap-4">
        <div className="h-4 w-[1px] bg-[#E8E1D7] hidden sm:block"></div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 hover:opacity-85 transition"
          >
            <div className="w-8 h-8 rounded-full bg-[#F2E3D5] text-[#D94814] font-bold text-xs flex items-center justify-center border border-[#E8D4C1] shadow-[0_0_10px_rgba(240,90,40,0.35)]">
              {getInitials(user.name)}
            </div>
           <span className="text-xs font-bold text-[#1C1917] hidden sm:inline-block capitalize">
          {user.name || 'User'}
             </span>
            <ChevronDown className={`w-3.5 h-3.5 text-[#A1988A] transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
             </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E8E1D7] rounded-2xl shadow-xl py-2 z-50">
              <div className="px-4 py-2 border-b border-[#F5F0E6]">
                <p className="text-[10px] text-[#A1988A] font-semibold uppercase tracking-wider">Signed in as</p>
                <p className="text-xs font-bold text-[#1C1917] truncate">{user.name || 'Areeba'}</p>
              </div>
              
              <div className="my-1 border-t border-[#F5F0E6]" />
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2 transition"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;