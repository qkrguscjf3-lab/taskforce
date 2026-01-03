
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Instagram, Youtube, Phone, Mail, Lock } from 'lucide-react';
import { useSiteStore } from '../store';

const Logo = () => (
  <div className="flex flex-col items-center">
    <span className="logo-production text-stone-400 uppercase">Production</span>
    <span className="logo-taskforce text-white uppercase">Taskforce</span>
  </div>
);

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const { isAdmin, logout } = useSiteStore();

  const navItems = [
    { label: '홈', path: '/' },
    { label: '포트폴리오', path: '/portfolio' },
    { label: '서비스', path: '/service' },
    { label: '소개', path: '/about' },
    { label: '문의', path: '/contact' },
  ];

  return (
    <header className="fixed w-full z-50 bg-black/80 backdrop-blur-xl border-b border-emerald-900/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <Logo />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-10">
          {navItems.map(item => (
            <Link 
              key={item.path} 
              to={item.path}
              className={`text-xs font-bold uppercase tracking-widest transition-colors hover:text-emerald-400 ${pathname === item.path ? 'text-emerald-500' : 'text-stone-400'}`}
            >
              {item.label}
            </Link>
          ))}
          {isAdmin ? (
            <div className="flex items-center space-x-4 border-l border-white/10 pl-6">
              <Link to="/admin" className="px-5 py-2 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-tighter rounded-sm hover:bg-emerald-500 transition">CMS</Link>
              <button onClick={logout} className="text-[10px] text-stone-600 hover:text-white uppercase font-bold">Logout</button>
            </div>
          ) : (
            <Link to="/admin/login" className="text-stone-700 hover:text-emerald-500 transition-colors">
              <Lock size={14} />
            </Link>
          )}
        </nav>

        {/* Mobile Nav Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-black border-b border-emerald-900/30 px-6 py-10 space-y-6">
          {navItems.map(item => (
            <Link 
              key={item.path} 
              to={item.path}
              onClick={() => setIsOpen(false)}
              className="block text-2xl font-black text-stone-300 hover:text-emerald-500"
            >
              {item.label}
            </Link>
          ))}
          {isAdmin && (
            <Link 
              to="/admin" 
              onClick={() => setIsOpen(false)}
              className="block text-2xl font-black text-emerald-500"
            >
              ADMIN PANEL
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

const Footer: React.FC = () => {
  const { siteSettings } = useSiteStore();
  const { contact, social } = siteSettings;

  return (
    <footer className="bg-black border-t border-emerald-900/10 py-24 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="space-y-6">
          <Logo />
          <p className="text-xs text-stone-500 leading-relaxed max-w-xs">
            PRODUCTION TASKFORCE is a specialized visual creation collective dedicated to cinematic storytelling and brand elevation.
          </p>
          <div className="flex space-x-6">
            <a href={social.instagram} target="_blank" className="text-stone-600 hover:text-emerald-400 transition"><Instagram size={18} /></a>
            <a href={social.youtube} target="_blank" className="text-stone-600 hover:text-emerald-400 transition"><Youtube size={18} /></a>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-black text-emerald-500 mb-8 uppercase tracking-[0.3em]">Contact</h4>
          <ul className="space-y-4 text-xs text-stone-500">
            <li className="flex items-center space-x-3 hover:text-white transition cursor-pointer">
              <Phone size={14} className="text-emerald-800" /> <span>{contact.phone}</span>
            </li>
            <li className="flex items-center space-x-3 hover:text-white transition cursor-pointer">
              <Mail size={14} className="text-emerald-800" /> <span>{contact.email}</span>
            </li>
            <li className="leading-relaxed">{contact.address}</li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-black text-emerald-500 mb-8 uppercase tracking-[0.3em]">Navigation</h4>
          <ul className="space-y-4 text-xs text-stone-500">
            <li><Link to="/portfolio" className="hover:text-emerald-400 transition">Portfolio</Link></li>
            <li><Link to="/service" className="hover:text-emerald-400 transition">Packages</Link></li>
            <li><Link to="/about" className="hover:text-emerald-400 transition">Manifesto</Link></li>
            <li><Link to="/contact" className="hover:text-emerald-400 transition">Inquiry</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[10px] font-black text-emerald-500 mb-8 uppercase tracking-[0.3em]">Legal</h4>
          <ul className="space-y-4 text-xs text-stone-500">
            <li><Link to="/privacy" className="hover:text-emerald-400 transition">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-emerald-400 transition">Service Terms</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-white/5 text-center">
         <p className="text-[10px] text-stone-700 uppercase tracking-widest">© 2024 PRODUCTION TASKFORCE. ALL RIGHTS RESERVED.</p>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
};
