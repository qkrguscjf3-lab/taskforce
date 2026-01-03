
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSiteStore } from '../../store';
import { Lock } from 'lucide-react';

export const Login: React.FC = () => {
  const [pw, setPw] = useState('');
  const [error, setError] = useState(false);
  const { login } = useSiteStore();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(pw)) {
      navigate('/admin');
    } else {
      setError(true);
      setPw('');
    }
  };

  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-stone-900 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/10 text-amber-500">
            <Lock size={28} />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tighter mb-2">Admin Panel Access</h1>
          <p className="text-stone-500 text-sm">관리자 비밀번호를 입력하세요.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="relative">
            <input 
              type="password"
              className={`w-full bg-stone-900 border ${error ? 'border-red-500' : 'border-stone-800'} rounded-2xl px-6 py-4 text-white text-center text-2xl tracking-[0.5em] focus:outline-none focus:border-amber-500 transition-all`}
              placeholder="••••"
              value={pw}
              onChange={e => {
                setPw(e.target.value);
                setError(false);
              }}
              autoFocus
            />
            {error && <p className="absolute -bottom-6 left-0 right-0 text-center text-xs text-red-500 font-bold uppercase tracking-wider">Invalid Password</p>}
          </div>
          <button 
            type="submit"
            className="w-full py-4 bg-amber-500 text-black font-black rounded-2xl hover:bg-amber-400 transition-all text-sm tracking-widest uppercase"
          >
            Authenticate
          </button>
        </form>
      </div>
    </div>
  );
};
