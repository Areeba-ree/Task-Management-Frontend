import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api/services';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await loginUser(formData);
      localStorage.setItem('token', response.data.accessToken);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden font-sans text-[#1C1917]">
      
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#F05A28]/10 rounded-full filter blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-amber-500/10 rounded-full filter blur-3xl pointer-events-none"></div>

    
      <div className="relative max-w-md w-full bg-white border border-[#E8E1D7] rounded-3xl shadow-sm p-8 sm:p-10 z-10 transition-all duration-300">
        
       
        <div className="text-center mb-8">
          <div 
            className="w-12 h-12 rounded-2xl mx-auto flex items-center justify-center font-black text-white text-xl shadow-md mb-4"
            style={{
              background: 'linear-gradient(135deg, #F05A28 0%, #E04818 100%)'
            }}
          >
            T
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1917] tracking-tight">
            Welcome Back
          </h2>
          <p className="text-[#78716C] text-xs font-medium mt-1.5">
            Log in to manage your workspace tasks
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200/80 p-3.5 rounded-2xl mb-6 text-xs text-center font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-extrabold text-[#78716C] mb-1.5 uppercase tracking-widest">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#FAF7F2] border border-[#E8E1D7] focus:border-[#F05A28] rounded-2xl px-4 py-2.5 text-[#1C1917] placeholder-[#A1988A] focus:outline-none focus:ring-2 focus:ring-[#F05A28]/20 transition duration-200 font-medium text-sm"
              placeholder="user@example.com"
            />
          </div>

          <div>
            <label className="block text-[11px] font-extrabold text-[#78716C] mb-1.5 uppercase tracking-widest">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-[#FAF7F2] border border-[#E8E1D7] focus:border-[#F05A28] rounded-2xl px-4 py-2.5 text-[#1C1917] placeholder-[#A1988A] focus:outline-none focus:ring-2 focus:ring-[#F05A28]/20 transition duration-200 font-medium text-sm"
              placeholder="••••••••"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#F05A28] hover:bg-[#E04818] text-white font-semibold py-3 rounded-2xl shadow-[0_8px_20px_rgba(240,90,40,0.30)] hover:shadow-[0_10px_25px_rgba(240,90,40,0.40)] transition duration-200 active:scale-[0.98] disabled:opacity-50 text-xs tracking-wide"
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </form>

        <p className="text-xs text-center text-[#78716C] mt-6 font-medium">
          Don't have an account?{' '}
          <Link to="/signup" className="font-bold text-[#F05A28] hover:text-[#E04818] transition duration-200 hover:underline">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;