
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSiteStore } from '../../store.tsx';
import { 
  LayoutDashboard, 
  Briefcase, 
  Settings, 
  MessageSquare, 
  Layers, 
  LogOut, 
  Plus, 
  Trash2, 
  Check, 
  X,
  Home,
  Save,
  Image as ImageIcon,
  User,
  Wrench,
  ChevronRight,
  RotateCcw,
  Upload,
  Trash,
  Globe,
  Youtube,
  Phone,
  Edit,
  ArrowRight,
  GripVertical,
  Instagram,
  Activity,
  Film,
  Type,
  Monitor,
  Heart,
  Zap,
  Target,
  Camera,
  PlusCircle,
  MinusCircle,
  Mail,
  MapPin,
  PlayCircle
} from 'lucide-react';
import { Portfolio, Inquiry, ServicePackage, HomeContent, AboutContent, ServicesContent, ContactContent, SiteSettings } from '../../types.ts';

export const AdminDashboard: React.FC = () => {
  const { 
    portfolios, updatePortfolios, toggleDeletePortfolio, permanentDeletePortfolio,
    inquiries, updateInquiry, toggleDeleteInquiry, permanentDeleteInquiry,
    homeContent, updateHome,
    aboutContent, updateAbout,
    servicesContent, updateServicesContent,
    contactContent, updateContactContent,
    siteSettings, updateSettings,
    services, updateServices, toggleDeleteService, permanentDeleteService,
    logout 
  } = useSiteStore();
  
  const [activeTab, setActiveTab] = useState<'dash' | 'home' | 'portfolio' | 'service' | 'about' | 'contact' | 'inquiry' | 'settings' | 'trash'>('dash');
  const [editingPortfolioId, setEditingPortfolioId] = useState<string | null>(null);
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [draggedServiceIndex, setDraggedServiceIndex] = useState<number | null>(null);

  const deletedPortfolios = portfolios.filter(p => p.isDeleted);
  const deletedServices = services.filter(s => s.isDeleted);
  const deletedInquiries = inquiries.filter(i => i.isDeleted);
  const totalTrashCount = deletedPortfolios.length + deletedServices.length + deletedInquiries.length;

  const menuItems = [
    { id: 'dash', label: '대시보드', icon: LayoutDashboard },
    { id: 'home', label: '홈 에디터', icon: Layers },
    { id: 'portfolio', label: '포트폴리오', icon: Briefcase },
    { id: 'service', label: '서비스 항목', icon: Wrench },
    { id: 'about', label: '소개 에디터', icon: User },
    { id: 'contact', label: '문의창 에디터', icon: MessageSquare },
    { id: 'inquiry', label: '문의 내역', icon: Activity },
    { id: 'settings', label: '사이트 설정', icon: Settings },
    { id: 'trash', label: '휴지통', icon: Trash2 },
  ];

  const handleFileUpload = (callback: (base64: string) => void) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => callback(reader.result as string);
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleServiceDragStart = (index: number) => {
    setDraggedServiceIndex(index);
  };

  const handleServiceDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedServiceIndex === null || draggedServiceIndex === index) return;
    const newServices = [...services];
    const item = newServices.splice(draggedServiceIndex, 1)[0];
    newServices.splice(index, 0, item);
    setDraggedServiceIndex(index);
    updateServices(newServices);
  };

  return (
    <div className="min-h-screen bg-[#050606] text-stone-300 flex font-sans">
      <aside className="w-72 border-r border-emerald-900/10 bg-black flex flex-col sticky top-0 h-screen z-20">
        <div className="p-10 flex flex-col items-start border-b border-emerald-900/10">
          <span className="text-[9px] tracking-[0.6em] text-emerald-500 uppercase font-black mb-1">Intelligence</span>
          <h2 className="text-white font-black tracking-tighter uppercase text-2xl italic leading-none">Taskforce</h2>
        </div>
        
        <nav className="flex-grow px-6 py-8 space-y-2 overflow-y-auto">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id as any); setEditingPortfolioId(null); setEditingServiceId(null); }}
              className={`w-full flex items-center space-x-5 px-6 py-5 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                activeTab === item.id ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-950/40 translate-x-1' : 'text-stone-600 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={16} />
              <span>{item.label}</span>
              {item.id === 'trash' && totalTrashCount > 0 && (
                <span className="ml-auto bg-red-500 text-white text-[8px] px-2 py-0.5 rounded-full">{totalTrashCount}</span>
              )}
            </button>
          ))}
          <div className="mt-10 pt-10 border-t border-emerald-900/10">
            <Link to="/" className="w-full flex items-center space-x-5 px-6 py-4 text-emerald-500 hover:text-white transition-all uppercase text-[10px] font-black tracking-widest bg-emerald-900/10 rounded-sm">
              <Home size={16} />
              <span>사이트 바로가기</span>
            </Link>
          </div>
        </nav>

        <div className="p-8 border-t border-emerald-900/10">
          <button onClick={logout} className="w-full flex items-center space-x-5 px-6 py-4 text-stone-800 hover:text-red-500 transition-colors uppercase text-[10px] font-black tracking-widest">
            <LogOut size={16} />
            <span>로그아웃</span>
          </button>
        </div>
      </aside>

      <main className="flex-grow p-16 overflow-y-auto bg-black/40">
        {/* DASHBOARD */}
        {activeTab === 'dash' && (
          <div className="space-y-16 animate-fade-in max-w-7xl">
            <div className="space-y-4">
              <h2 className="text-[10px] font-black text-emerald-500 tracking-[0.5em] uppercase">Control Center</h2>
              <h1 className="text-7xl font-black text-white tracking-tighter uppercase leading-none">Operational Overview</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-stone-950 border border-emerald-900/10 p-10 rounded-sm flex flex-col">
                <Briefcase className="text-emerald-500 mb-6" size={28} />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-600 mb-2">포트폴리오</p>
                <div className="flex items-end justify-between">
                   <p className="text-5xl font-black text-white leading-none">{portfolios.filter(p => !p.isDeleted).length}</p>
                   <button onClick={() => setActiveTab('portfolio')} className="text-stone-700 hover:text-emerald-500 transition-colors"><ChevronRight size={20}/></button>
                </div>
              </div>
              <div className="bg-stone-950 border border-emerald-900/10 p-10 rounded-sm flex flex-col">
                <MessageSquare className="text-emerald-500 mb-6" size={28} />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-600 mb-2">대기 중인 문의</p>
                <div className="flex items-end justify-between">
                   <p className="text-5xl font-black text-white leading-none">{inquiries.filter(i => i.status === 'new' && !i.isDeleted).length}</p>
                   <button onClick={() => setActiveTab('inquiry')} className="text-stone-700 hover:text-emerald-500 transition-colors"><ChevronRight size={20}/></button>
                </div>
              </div>
              <div className="bg-stone-950 border border-emerald-900/10 p-10 rounded-sm flex flex-col">
                <Wrench className="text-emerald-500 mb-6" size={28} />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-600 mb-2">활성 서비스</p>
                <div className="flex items-end justify-between">
                   <p className="text-5xl font-black text-white leading-none">{services.filter(s => !s.isDeleted).length}</p>
                   <button onClick={() => setActiveTab('service')} className="text-stone-700 hover:text-emerald-500 transition-colors"><ChevronRight size={20}/></button>
                </div>
              </div>
              <div className="bg-stone-950 border border-emerald-900/10 p-10 rounded-sm flex flex-col">
                <Trash2 className="text-red-900/40 mb-6" size={28} />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-600 mb-2">휴지통</p>
                <div className="flex items-end justify-between">
                   <p className="text-5xl font-black text-white leading-none">{totalTrashCount}</p>
                   <button onClick={() => setActiveTab('trash')} className="text-stone-700 hover:text-emerald-500 transition-colors"><ChevronRight size={20}/></button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* HOME EDITOR */}
        {activeTab === 'home' && (
          <div className="space-y-16 animate-fade-in max-w-5xl">
            <div className="space-y-4">
              <h2 className="text-[10px] font-black text-emerald-500 tracking-[0.5em] uppercase">Visual Hub</h2>
              <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">Home Editor</h1>
            </div>
            
            <section className="bg-stone-950 p-10 border border-emerald-900/10 rounded-sm space-y-8">
              <div className="flex justify-between items-center border-b border-white/5 pb-6">
                <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3"><Monitor size={18} className="text-emerald-500"/> Hero Section</h3>
                <label className="flex items-center gap-3 cursor-pointer">
                  <span className="text-[10px] font-black text-stone-500 uppercase">Visible</span>
                  <input type="checkbox" checked={homeContent.hero.visible} onChange={e => updateHome({...homeContent, hero: {...homeContent.hero, visible: e.target.checked}})} className="w-5 h-5 accent-emerald-500" />
                </label>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Main Headline</label>
                  <input className="w-full bg-black border border-emerald-900/20 p-4 text-white font-black text-xl outline-none focus:border-emerald-500" value={homeContent.hero.headline} onChange={e => updateHome({...homeContent, hero: {...homeContent.hero, headline: e.target.value}})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Sub Headline</label>
                  <textarea rows={3} className="w-full bg-black border border-emerald-900/20 p-4 text-stone-400 font-bold outline-none focus:border-emerald-500" value={homeContent.hero.subHeadline} onChange={e => updateHome({...homeContent, hero: {...homeContent.hero, subHeadline: e.target.value}})} />
                </div>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">CTA Text</label>
                    <input className="w-full bg-black border border-emerald-900/20 p-4 text-white font-black outline-none focus:border-emerald-500" value={homeContent.hero.ctaText} onChange={e => updateHome({...homeContent, hero: {...homeContent.hero, ctaText: e.target.value}})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Banner Image</label>
                    <div className="flex items-center gap-4">
                      <img src={homeContent.hero.bannerImage} className="w-16 h-10 object-cover rounded-sm border border-white/5" />
                      <button onClick={() => handleFileUpload(img => updateHome({...homeContent, hero: {...homeContent.hero, bannerImage: img}}))} className="text-[9px] font-black text-emerald-500 border border-emerald-500/20 px-4 py-2 hover:bg-emerald-500 hover:text-white transition-all uppercase">Change Image</button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-stone-950 p-10 border border-emerald-900/10 rounded-sm space-y-8">
              <div className="flex justify-between items-center border-b border-white/5 pb-6">
                <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3"><Activity size={18} className="text-emerald-500"/> Stats Section</h3>
                <label className="flex items-center gap-3 cursor-pointer">
                  <span className="text-[10px] font-black text-stone-500 uppercase">Visible</span>
                  <input type="checkbox" checked={homeContent.stats.visible} onChange={e => updateHome({...homeContent, stats: {...homeContent.stats, visible: e.target.checked}})} className="w-5 h-5 accent-emerald-500" />
                </label>
              </div>
              <div className="grid grid-cols-3 gap-8">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Experience (Yrs)</label>
                  <input type="number" className="w-full bg-black border border-emerald-900/20 p-4 text-white font-black outline-none focus:border-emerald-500" value={homeContent.stats.experience} onChange={e => updateHome({...homeContent, stats: {...homeContent.stats, experience: parseInt(e.target.value)}})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Projects</label>
                  <input type="number" className="w-full bg-black border border-emerald-900/20 p-4 text-white font-black outline-none focus:border-emerald-500" value={homeContent.stats.projects} onChange={e => updateHome({...homeContent, stats: {...homeContent.stats, projects: parseInt(e.target.value)}})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Clients</label>
                  <input type="number" className="w-full bg-black border border-emerald-900/20 p-4 text-white font-black outline-none focus:border-emerald-500" value={homeContent.stats.clients} onChange={e => updateHome({...homeContent, stats: {...homeContent.stats, clients: parseInt(e.target.value)}})} />
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ABOUT EDITOR */}
        {activeTab === 'about' && (
          <div className="space-y-16 animate-fade-in max-w-5xl">
            <div className="space-y-4">
              <h2 className="text-[10px] font-black text-emerald-500 tracking-[0.5em] uppercase">Manifesto & Mission</h2>
              <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">About Editor</h1>
            </div>
            
            <section className="bg-stone-950 p-10 border border-emerald-900/10 rounded-sm space-y-8">
              <h3 className="text-sm font-black text-white uppercase tracking-widest border-b border-white/5 pb-6">Manifesto</h3>
              <div className="space-y-4">
                <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Title</label>
                <input className="w-full bg-black border border-emerald-900/20 p-4 text-white font-black text-lg outline-none focus:border-emerald-500" value={aboutContent.manifesto.title} onChange={e => updateAbout({...aboutContent, manifesto: {...aboutContent.manifesto, title: e.target.value}})} />
              </div>
              <div className="space-y-4">
                <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Description</label>
                <textarea rows={4} className="w-full bg-black border border-emerald-900/20 p-4 text-stone-400 font-bold outline-none focus:border-emerald-500" value={aboutContent.manifesto.description} onChange={e => updateAbout({...aboutContent, manifesto: {...aboutContent.manifesto, description: e.target.value}})} />
              </div>
            </section>

            <section className="bg-stone-950 p-10 border border-emerald-900/10 rounded-sm space-y-8">
              <h3 className="text-sm font-black text-white uppercase tracking-widest border-b border-white/5 pb-6">Director Profile</h3>
              <div className="flex gap-10">
                <div className="w-32 h-40 flex-shrink-0 bg-black border border-white/5 overflow-hidden">
                  <img src={aboutContent.director.image} className="w-full h-full object-cover grayscale" />
                </div>
                <div className="flex-grow space-y-6">
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Name</label>
                      <input className="w-full bg-black border border-emerald-900/20 p-4 text-white font-black outline-none focus:border-emerald-500" value={aboutContent.director.name} onChange={e => updateAbout({...aboutContent, director: {...aboutContent.director, name: e.target.value}})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Role</label>
                      <input className="w-full bg-black border border-emerald-900/20 p-4 text-emerald-500 font-black outline-none focus:border-emerald-500" value={aboutContent.director.role} onChange={e => updateAbout({...aboutContent, director: {...aboutContent.director, role: e.target.value}})} />
                    </div>
                  </div>
                  <button onClick={() => handleFileUpload(img => updateAbout({...aboutContent, director: {...aboutContent.director, image: img}}))} className="text-[9px] font-black text-emerald-500 border border-emerald-500/20 px-4 py-2 hover:bg-emerald-500 hover:text-white transition-all uppercase">Update Portrait</button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* CONTACT EDITOR */}
        {activeTab === 'contact' && (
          <div className="space-y-16 animate-fade-in max-w-5xl">
            <div className="space-y-4">
              <h2 className="text-[10px] font-black text-emerald-500 tracking-[0.5em] uppercase">Interaction Point</h2>
              <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">Contact Editor</h1>
            </div>

            <section className="bg-stone-950 p-10 border border-emerald-900/10 rounded-sm space-y-8">
              <h3 className="text-sm font-black text-white uppercase tracking-widest border-b border-white/5 pb-6">Header & Messages</h3>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Headline</label>
                  <input className="w-full bg-black border border-emerald-900/20 p-4 text-white font-black outline-none focus:border-emerald-500" value={contactContent.headline} onChange={e => updateContactContent({...contactContent, headline: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Success Title</label>
                  <input className="w-full bg-black border border-emerald-900/20 p-4 text-emerald-500 font-black outline-none focus:border-emerald-500" value={contactContent.successTitle} onChange={e => updateContactContent({...contactContent, successTitle: e.target.value})} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Sub Headline</label>
                <input className="w-full bg-black border border-emerald-900/20 p-4 text-stone-400 font-bold outline-none focus:border-emerald-500" value={contactContent.subHeadline} onChange={e => updateContactContent({...contactContent, subHeadline: e.target.value})} />
              </div>
            </section>

            <section className="bg-stone-950 p-10 border border-emerald-900/10 rounded-sm space-y-12">
              <h3 className="text-sm font-black text-white uppercase tracking-widest border-b border-white/5 pb-6">Dropdown Options</h3>
              
              <div className="space-y-6">
                <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest flex justify-between items-center">
                  제작 목적 리스트
                  <button onClick={() => updateContactContent({...contactContent, purposes: [...contactContent.purposes, '새 항목']})} className="text-emerald-500 hover:text-white transition-colors"><PlusCircle size={16}/></button>
                </label>
                <div className="flex flex-wrap gap-3">
                  {contactContent.purposes.map((p, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-black border border-emerald-900/20 px-3 py-2 rounded-sm group">
                      <input className="bg-transparent text-[10px] font-black text-white uppercase outline-none focus:text-emerald-500" value={p} onChange={e => {
                        const next = [...contactContent.purposes];
                        next[idx] = e.target.value;
                        updateContactContent({...contactContent, purposes: next});
                      }} />
                      <button onClick={() => updateContactContent({...contactContent, purposes: contactContent.purposes.filter((_, i) => i !== idx)})} className="text-red-900 hover:text-red-500"><X size={12}/></button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest flex justify-between items-center">
                  영상 유형 리스트
                  <button onClick={() => updateContactContent({...contactContent, types: [...contactContent.types, '새 항목']})} className="text-emerald-500 hover:text-white transition-colors"><PlusCircle size={16}/></button>
                </label>
                <div className="flex flex-wrap gap-3">
                  {contactContent.types.map((t, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-black border border-emerald-900/20 px-3 py-2 rounded-sm">
                      <input className="bg-transparent text-[10px] font-black text-white uppercase outline-none focus:text-emerald-500" value={t} onChange={e => {
                        const next = [...contactContent.types];
                        next[idx] = e.target.value;
                        updateContactContent({...contactContent, types: next});
                      }} />
                      <button onClick={() => updateContactContent({...contactContent, types: contactContent.types.filter((_, i) => i !== idx)})} className="text-red-900 hover:text-red-500"><X size={12}/></button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest flex justify-between items-center">
                  예상 예산 리스트
                  <button onClick={() => updateContactContent({...contactContent, budgets: [...contactContent.budgets, '새 항목']})} className="text-emerald-500 hover:text-white transition-colors"><PlusCircle size={16}/></button>
                </label>
                <div className="flex flex-wrap gap-3">
                  {contactContent.budgets.map((b, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-black border border-emerald-900/20 px-3 py-2 rounded-sm">
                      <input className="bg-transparent text-[10px] font-black text-white uppercase outline-none focus:text-emerald-500" value={b} onChange={e => {
                        const next = [...contactContent.budgets];
                        next[idx] = e.target.value;
                        updateContactContent({...contactContent, budgets: next});
                      }} />
                      <button onClick={() => updateContactContent({...contactContent, budgets: contactContent.budgets.filter((_, i) => i !== idx)})} className="text-red-900 hover:text-red-500"><X size={12}/></button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {/* SITE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="space-y-16 animate-fade-in max-w-4xl">
            <div className="space-y-4">
              <h2 className="text-[10px] font-black text-emerald-500 tracking-[0.5em] uppercase">Global Assets</h2>
              <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">Settings</h1>
            </div>
            
            <section className="bg-stone-950 p-12 border border-emerald-900/10 space-y-12 rounded-sm shadow-xl">
              <div className="space-y-8">
                <h3 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.4em] border-b border-white/5 pb-4 flex items-center gap-3"><Phone size={14}/> Contact Information</h3>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Phone Number</label>
                    <input className="w-full bg-black border border-emerald-900/20 p-4 text-white font-black outline-none focus:border-emerald-500" value={siteSettings.contact.phone} onChange={e => updateSettings({...siteSettings, contact: {...siteSettings.contact, phone: e.target.value}})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Email Address</label>
                    <input className="w-full bg-black border border-emerald-900/20 p-4 text-white font-black outline-none focus:border-emerald-500" value={siteSettings.contact.email} onChange={e => updateSettings({...siteSettings, contact: {...siteSettings.contact, email: e.target.value}})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Studio Address</label>
                  <input className="w-full bg-black border border-emerald-900/20 p-4 text-white font-black outline-none focus:border-emerald-500" value={siteSettings.contact.address} onChange={e => updateSettings({...siteSettings, contact: {...siteSettings.contact, address: e.target.value}})} />
                </div>
              </div>

              <div className="space-y-8">
                <h3 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.4em] border-b border-white/5 pb-4 flex items-center gap-3"><Globe size={14}/> Social Media</h3>
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Instagram URL</label>
                    <input className="w-full bg-black border border-emerald-900/20 p-4 text-stone-400 font-bold outline-none focus:border-emerald-500" value={siteSettings.social.instagram} onChange={e => updateSettings({...siteSettings, social: {...siteSettings.social, instagram: e.target.value}})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">YouTube URL</label>
                    <input className="w-full bg-black border border-emerald-900/20 p-4 text-stone-400 font-bold outline-none focus:border-emerald-500" value={siteSettings.social.youtube} onChange={e => updateSettings({...siteSettings, social: {...siteSettings.social, youtube: e.target.value}})} />
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* PORTFOLIO TAB */}
        {activeTab === 'portfolio' && (
          <div className="space-y-12 animate-fade-in">
            <div className="flex justify-between items-end gap-10">
              <div>
                <h2 className="text-[10px] font-black text-emerald-500 tracking-[0.5em] uppercase mb-2">Case Studies</h2>
                <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">Portfolio</h1>
              </div>
              {!editingPortfolioId && (
                <button 
                  onClick={() => setEditingPortfolioId('new')} 
                  className="px-10 py-5 bg-emerald-600 text-white font-black text-[10px] uppercase tracking-widest rounded-sm hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-950/20"
                >
                  새 프로젝트 추가
                </button>
              )}
            </div>
            
            {editingPortfolioId ? (
              <PortfolioEditor 
                portfolio={editingPortfolioId === 'new' ? undefined : portfolios.find(p => p.id === editingPortfolioId)} 
                onSave={(p) => {
                  if (editingPortfolioId === 'new') {
                    updatePortfolios([p, ...portfolios]);
                  } else {
                    updatePortfolios(portfolios.map(item => item.id === p.id ? p : item));
                  }
                  setEditingPortfolioId(null);
                }}
                onCancel={() => setEditingPortfolioId(null)}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {portfolios.filter(p => !p.isDeleted).map(p => (
                  <div key={p.id} className="bg-stone-950 border border-emerald-900/10 p-4 rounded-sm hover:border-emerald-500/40 transition-all group overflow-hidden flex flex-col">
                    <div className="relative aspect-video overflow-hidden mb-6 bg-black rounded-sm">
                       <img 
                        src={p.mediaGallery.find(m => m.isHero)?.url || 'https://via.placeholder.com/800x450'} 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                       />
                       {p.featured && <div className="absolute top-4 left-4 bg-emerald-600 text-white text-[8px] font-black px-3 py-1 uppercase tracking-widest">Featured</div>}
                    </div>
                    <div className="px-4 pb-4 flex-grow">
                      <div className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-2">{p.category}</div>
                      <h3 className="text-white font-black uppercase text-xl mb-4 tracking-tighter line-clamp-1">{p.title}</h3>
                    </div>
                    <div className="flex justify-between items-center p-4 border-t border-emerald-900/5">
                      <button onClick={() => setEditingPortfolioId(p.id)} className="text-[10px] text-emerald-500 hover:text-white uppercase font-black tracking-widest flex items-center gap-2"><Edit size={12}/> 수정</button>
                      <button onClick={() => toggleDeletePortfolio(p.id, true)} className="text-[10px] text-stone-700 hover:text-red-500 uppercase font-black tracking-widest flex items-center gap-2"><Trash size={12}/> 삭제</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SERVICE ITEM TAB */}
        {activeTab === 'service' && (
          <div className="space-y-12 animate-fade-in">
            <div className="flex justify-between items-end gap-10">
              <div>
                <h2 className="text-[10px] font-black text-emerald-500 tracking-[0.5em] uppercase mb-2">Mission Packages</h2>
                <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">Services</h1>
              </div>
              {!editingServiceId && (
                <button 
                  onClick={() => setEditingServiceId('new')} 
                  className="px-10 py-5 bg-emerald-600 text-white font-black text-[10px] uppercase tracking-widest rounded-sm hover:bg-emerald-500 transition-all shadow-xl shadow-emerald-950/20"
                >
                  새 패키지 추가
                </button>
              )}
            </div>

            {editingServiceId ? (
              <ServiceEditor 
                service={editingServiceId === 'new' ? undefined : services.find(s => s.id === editingServiceId)}
                onSave={(s) => {
                  if (editingServiceId === 'new') {
                    updateServices([...services, s]);
                  } else {
                    updateServices(services.map(item => item.id === s.id ? s : item));
                  }
                  setEditingServiceId(null);
                }}
                onCancel={() => setEditingServiceId(null)}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.filter(s => !s.isDeleted).map((s, index) => (
                  <div 
                    key={s.id} 
                    draggable 
                    onDragStart={() => handleServiceDragStart(index)}
                    onDragOver={(e) => handleServiceDragOver(e, index)}
                    className="bg-stone-950 p-10 border border-emerald-900/10 rounded-sm hover:border-emerald-500/30 transition-all flex flex-col group relative cursor-move"
                  >
                    <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-stone-800">
                      <GripVertical size={20} />
                    </div>
                    <div className="aspect-video mb-8 overflow-hidden rounded-sm bg-black">
                       <img src={s.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                    </div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-4">{s.name}</h3>
                    <p className="text-stone-500 text-xs mb-8 flex-grow line-clamp-2">{s.description}</p>
                    <div className="text-xl font-black text-emerald-500 mb-8">
                      {s.priceType === 'hidden' ? '상담 후 확정' : `₩${s.price}${s.priceType === 'range' ? '~' : ''}`}
                    </div>
                    <div className="flex gap-6 pt-6 border-t border-emerald-900/5">
                      <button onClick={() => setEditingServiceId(s.id)} className="text-[10px] text-emerald-500 hover:text-white uppercase font-black tracking-widest flex items-center gap-2">
                        <Edit size={12} /> 수정
                      </button>
                      <button onClick={() => toggleDeleteService(s.id, true)} className="text-[10px] text-stone-700 hover:text-red-500 uppercase font-black tracking-widest flex items-center gap-2">
                        <Trash size={12} /> 삭제
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* INQUIRY TAB */}
        {activeTab === 'inquiry' && (
          <div className="space-y-12 animate-fade-in max-w-5xl">
            <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">Inquiries</h1>
            <div className="space-y-6">
              {inquiries.filter(i => !i.isDeleted).map(inq => (
                <div key={inq.id} className="bg-stone-950 p-10 border border-emerald-900/10 rounded-sm">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-xl font-black text-white">{inq.name}</h3>
                      <p className="text-stone-500 text-[10px] font-black uppercase tracking-widest mt-1">{inq.contact} • {new Date(inq.createdAt).toLocaleDateString()}</p>
                    </div>
                    <select 
                      value={inq.status} 
                      onChange={(e) => updateInquiry(inq.id, e.target.value as any)}
                      className="bg-black border border-emerald-900/20 text-emerald-500 text-[10px] font-black uppercase px-4 py-1 tracking-widest outline-none"
                    >
                      <option value="new">NEW</option>
                      <option value="processing">PROCESSING</option>
                      <option value="completed">COMPLETED</option>
                      <option value="hold">HOLD</option>
                    </select>
                  </div>
                  <div className="bg-black/50 p-6 border border-emerald-900/10 rounded-sm mb-8">
                    <p className="text-stone-400 text-sm leading-relaxed whitespace-pre-wrap">{inq.message}</p>
                  </div>
                  <div className="flex gap-4">
                    <button onClick={() => toggleDeleteInquiry(inq.id, true)} className="text-[9px] font-black text-red-900 uppercase tracking-widest border border-red-900/30 px-6 py-3 hover:bg-red-900 hover:text-white transition-all">삭제(휴지통)</button>
                  </div>
                </div>
              ))}
              {inquiries.filter(i => !i.isDeleted).length === 0 && <div className="py-24 text-center border border-emerald-900/5 text-stone-700 font-black uppercase text-xs tracking-widest">No active inquiries.</div>}
            </div>
          </div>
        )}

        {/* TRASH TAB */}
        {activeTab === 'trash' && (
          <div className="space-y-16 animate-fade-in max-w-7xl">
            <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">Trash Bin</h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
               <div className="space-y-8">
                  <h3 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.4em] border-b border-white/5 pb-4">포트폴리오 ({deletedPortfolios.length})</h3>
                  {deletedPortfolios.map(p => (
                    <div key={p.id} className="bg-stone-900 p-6 border border-red-900/20 flex justify-between items-center group">
                      <span className="text-white text-xs font-black uppercase truncate max-w-[200px]">{p.title}</span>
                      <div className="flex gap-4">
                        <button onClick={() => toggleDeletePortfolio(p.id, false)} title="복구" className="text-emerald-500 opacity-50 hover:opacity-100 transition-opacity"><RotateCcw size={16} /></button>
                        <button onClick={() => { if(confirm('영구 삭제하시겠습니까?')) permanentDeletePortfolio(p.id); }} title="영구 삭제" className="text-red-500 opacity-50 hover:opacity-100 transition-opacity"><Trash size={16} /></button>
                      </div>
                    </div>
                  ))}
               </div>
               <div className="space-y-8">
                  <h3 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.4em] border-b border-white/5 pb-4">서비스 ({deletedServices.length})</h3>
                  {deletedServices.map(s => (
                    <div key={s.id} className="bg-stone-900 p-6 border border-red-900/20 flex justify-between items-center group">
                      <span className="text-white text-xs font-black uppercase truncate max-w-[200px]">{s.name}</span>
                      <div className="flex gap-4">
                        <button onClick={() => toggleDeleteService(s.id, false)} title="복구" className="text-emerald-500 opacity-50 hover:opacity-100 transition-opacity"><RotateCcw size={16} /></button>
                        <button onClick={() => { if(confirm('영구 삭제하시겠습니까?')) permanentDeleteService(s.id); }} title="영구 삭제" className="text-red-500 opacity-50 hover:opacity-100 transition-opacity"><Trash size={16} /></button>
                      </div>
                    </div>
                  ))}
               </div>
               <div className="space-y-8">
                  <h3 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.4em] border-b border-white/5 pb-4">문의 ({deletedInquiries.length})</h3>
                  {deletedInquiries.map(i => (
                    <div key={i.id} className="bg-stone-900 p-6 border border-red-900/20 flex justify-between items-center group">
                      <span className="text-white text-xs font-black uppercase truncate max-w-[200px]">{i.name}</span>
                      <div className="flex gap-4">
                        <button onClick={() => toggleDeleteInquiry(i.id, false)} title="복구" className="text-emerald-500 opacity-50 hover:opacity-100 transition-opacity"><RotateCcw size={16} /></button>
                        <button onClick={() => { if(confirm('영구 삭제하시겠습니까?')) permanentDeleteInquiry(i.id); }} title="영구 삭제" className="text-red-500 opacity-50 hover:opacity-100 transition-opacity"><Trash size={16} /></button>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

/* --- Detailed Editor Components --- */

const PortfolioEditor: React.FC<{ portfolio?: Portfolio, onSave: (p: Portfolio) => void, onCancel: () => void }> = ({ portfolio, onSave, onCancel }) => {
  const [data, setData] = useState<Portfolio>(portfolio || {
    id: Date.now().toString(),
    title: '',
    slug: '',
    status: 'draft',
    featured: false,
    category: '기업홍보',
    tags: [],
    oneLiner: '',
    summary: '',
    clientName: '',
    industry: '',
    date: '',
    scope: [],
    overview: '',
    problem: '',
    solution: '',
    results: '',
    mediaGallery: [],
    videoLinks: []
  });

  const [activeMediaId, setActiveMediaId] = useState<string | null>(null);

  const handleMultiFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setData(prev => {
            const newMedia = {
              id: Math.random().toString(36).substr(2, 9),
              url: reader.result as string,
              type: 'image' as const,
              isHero: prev.mediaGallery.length === 0,
              order: prev.mediaGallery.length,
              caption: '',
              alt: ''
            };
            return { ...prev, mediaGallery: [...prev.mediaGallery, newMedia] };
          });
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const updateMediaItem = (id: string, updates: Partial<Portfolio['mediaGallery'][0]>) => {
    setData(prev => ({
      ...prev,
      mediaGallery: prev.mediaGallery.map(m => {
        if (m.id === id) {
          return { ...m, ...updates };
        }
        if (updates.isHero === true) return { ...m, isHero: false };
        return m;
      })
    }));
  };

  const activeMedia = data.mediaGallery.find(m => m.id === activeMediaId);

  return (
    <div className="bg-stone-950 border border-emerald-900/10 p-12 rounded-sm space-y-16 shadow-2xl animate-fade-in max-w-7xl mx-auto">
      <div className="flex justify-between items-center border-b border-emerald-900/10 pb-8">
        <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Mission Dossier Editor</h2>
        <div className="flex gap-4">
           <button onClick={onCancel} className="px-8 py-3 text-stone-500 font-black uppercase text-[10px] tracking-widest hover:text-white transition-all">Cancel</button>
           <button onClick={() => onSave({...data, status: 'published'})} className="px-10 py-3 bg-emerald-600 text-white font-black uppercase text-[10px] tracking-widest shadow-xl shadow-emerald-950/20">Save & Publish</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="space-y-12">
           <section className="space-y-6">
              <h3 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.4em] flex items-center gap-3"><Type size={14}/> Basic Intelligence</h3>
              <div className="space-y-4">
                 <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Project Title</label>
                 <input 
                  className="w-full bg-black border border-emerald-900/20 p-5 text-white font-black text-xl uppercase outline-none focus:border-emerald-500 transition-all" 
                  value={data.title} 
                  onChange={e => setData({...data, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} 
                  placeholder="EX: BRAND CAMPAIGN 2024"
                 />
              </div>
              <div className="grid grid-cols-2 gap-6">
                 <div className="space-y-4">
                    <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Category</label>
                    <input className="w-full bg-black border border-emerald-900/20 p-4 text-white font-black outline-none focus:border-emerald-500" value={data.category} onChange={e => setData({...data, category: e.target.value})} />
                 </div>
                 <div className="space-y-4">
                    <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Client Name</label>
                    <input className="w-full bg-black border border-emerald-900/20 p-4 text-white font-black outline-none focus:border-emerald-500" value={data.clientName || ''} onChange={e => setData({...data, clientName: e.target.value})} />
                 </div>
              </div>
              <div className="flex items-center gap-4 py-4">
                <input type="checkbox" checked={data.featured} onChange={e => setData({...data, featured: e.target.checked})} className="w-5 h-5 accent-emerald-500" />
                <span className="text-[10px] font-black text-white uppercase tracking-widest">Home Featured Project</span>
              </div>
           </section>

           <section className="space-y-6">
              <h3 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.4em] flex items-center gap-3"><PlayCircle size={14}/> Storytelling</h3>
              <div className="space-y-4">
                 <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Overview</label>
                 <textarea rows={6} className="w-full bg-black border border-emerald-900/20 p-5 text-stone-400 font-bold outline-none focus:border-emerald-500" value={data.overview} onChange={e => setData({...data, overview: e.target.value})} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-4">
                    <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">The Problem</label>
                    <textarea rows={4} className="w-full bg-black border border-emerald-900/20 p-5 text-stone-400 font-bold outline-none focus:border-emerald-500" value={data.problem} onChange={e => setData({...data, problem: e.target.value})} />
                 </div>
                 <div className="space-y-4">
                    <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">The Solution</label>
                    <textarea rows={4} className="w-full bg-black border border-emerald-900/20 p-5 text-stone-400 font-bold outline-none focus:border-emerald-500" value={data.solution} onChange={e => setData({...data, solution: e.target.value})} />
                 </div>
              </div>
              <div className="space-y-4">
                 <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">The Result</label>
                 <textarea rows={3} className="w-full bg-black border border-emerald-900/20 p-5 text-stone-400 font-bold outline-none focus:border-emerald-500" value={data.results} onChange={e => setData({...data, results: e.target.value})} />
              </div>
           </section>
        </div>

        <div className="space-y-12">
           <section className="space-y-8">
              <div className="flex justify-between items-center border-b border-emerald-900/10 pb-4">
                <h3 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.4em] flex items-center gap-3"><ImageIcon size={14}/> Media Assets</h3>
                <label className="text-[9px] font-black text-emerald-500 border border-emerald-500/20 px-4 py-2 hover:bg-emerald-500 hover:text-white transition-all cursor-pointer">
                  Upload Assets
                  <input type="file" multiple accept="image/*" className="hidden" onChange={handleMultiFileUpload} />
                </label>
              </div>
              <div className="grid grid-cols-4 gap-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                 {data.mediaGallery.map(m => (
                   <div 
                    key={m.id} 
                    onClick={() => setActiveMediaId(m.id)}
                    className={`relative aspect-square rounded-sm overflow-hidden border cursor-pointer transition-all ${activeMediaId === m.id ? 'border-emerald-500 scale-95 ring-4 ring-emerald-500/20' : 'border-white/5 opacity-50 hover:opacity-100'}`}
                   >
                     <img src={m.url} className="w-full h-full object-cover" />
                     {m.isHero && <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[7px] font-black px-2 py-0.5 uppercase">Hero</div>}
                   </div>
                 ))}
              </div>
              {activeMedia && (
                <div className="bg-black/50 border border-emerald-900/10 p-6 rounded-sm space-y-6 animate-fade-in">
                   <div className="flex justify-between items-center">
                     <button 
                      onClick={() => updateMediaItem(activeMedia.id, { isHero: true })} 
                      className={`text-[9px] font-black px-4 py-2 uppercase tracking-widest border transition-all ${activeMedia.isHero ? 'bg-emerald-600 text-white border-emerald-600' : 'border-stone-800 text-stone-500 hover:text-white hover:border-white'}`}
                     >
                       {activeMedia.isHero ? '대표 이미지 지정됨' : '대표 이미지로 지정'}
                     </button>
                     <button 
                      onClick={() => { setData({...data, mediaGallery: data.mediaGallery.filter(x => x.id !== activeMedia.id)}); setActiveMediaId(null); }} 
                      className="text-red-900 hover:text-red-500 transition-colors"
                     >
                       <Trash size={16}/>
                     </button>
                   </div>
                   <input 
                    className="w-full bg-stone-950 border border-emerald-900/10 p-3 text-xs text-stone-400 outline-none focus:border-emerald-500" 
                    placeholder="Asset Caption (Optional)" 
                    value={activeMedia.caption || ''} 
                    onChange={e => updateMediaItem(activeMedia.id, { caption: e.target.value })}
                   />
                </div>
              )}
           </section>

           <section className="space-y-6">
              <h3 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.4em] flex items-center gap-3"><Monitor size={14}/> Operational Data</h3>
              <div className="space-y-4">
                 <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Mission Scope (Separate by comma)</label>
                 <input 
                  className="w-full bg-black border border-emerald-900/20 p-4 text-white font-black text-xs outline-none focus:border-emerald-500" 
                  value={data.scope.join(', ')} 
                  onChange={e => setData({...data, scope: e.target.value.split(',').map(s => s.trim()).filter(s => s !== '')})} 
                  placeholder="EX: 기획, 촬영, 편집, 3D"
                 />
              </div>
              <div className="space-y-4">
                 <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Tags (Separate by comma)</label>
                 <input 
                  className="w-full bg-black border border-emerald-900/20 p-4 text-white font-black text-xs outline-none focus:border-emerald-500" 
                  value={data.tags.join(', ')} 
                  onChange={e => setData({...data, tags: e.target.value.split(',').map(s => s.trim()).filter(s => s !== '')})} 
                  placeholder="EX: 브랜드필름, 시네마틱, 드론"
                 />
              </div>
           </section>
        </div>
      </div>
    </div>
  );
};

const ServiceEditor: React.FC<{ service?: ServicePackage, onSave: (s: ServicePackage) => void, onCancel: () => void }> = ({ service, onSave, onCancel }) => {
  const [data, setData] = useState<ServicePackage>(service || {
    id: Date.now().toString(),
    name: '',
    description: '',
    price: '0',
    priceType: 'range',
    inclusions: [],
    options: [],
    image: ''
  });

  const handleFileUpload = (callback: (base64: string) => void) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => callback(reader.result as string);
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="bg-stone-950 border border-emerald-900/10 p-12 rounded-sm space-y-16 shadow-2xl animate-fade-in max-w-5xl mx-auto">
      <div className="flex justify-between items-center border-b border-emerald-900/10 pb-8">
        <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Mission Package Editor</h2>
        <div className="flex gap-4">
           <button onClick={onCancel} className="px-8 py-3 text-stone-500 font-black uppercase text-[10px] tracking-widest hover:text-white transition-all">Cancel</button>
           <button onClick={() => onSave(data)} className="px-10 py-3 bg-emerald-600 text-white font-black uppercase text-[10px] tracking-widest shadow-xl shadow-emerald-950/20">Save Package</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-12">
           <div className="space-y-4">
              <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Package Name</label>
              <input 
                className="w-full bg-black border border-emerald-900/20 p-5 text-white font-black text-xl uppercase outline-none focus:border-emerald-500" 
                value={data.name} 
                onChange={e => setData({...data, name: e.target.value})} 
                placeholder="EX: PREMIUM FILM PACKAGE"
              />
           </div>
           <div className="space-y-4">
              <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Short Description</label>
              <textarea 
                rows={4}
                className="w-full bg-black border border-emerald-900/20 p-5 text-stone-400 font-bold outline-none focus:border-emerald-500" 
                value={data.description} 
                onChange={e => setData({...data, description: e.target.value})} 
                placeholder="Briefly describe what this package offers."
              />
           </div>
           <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Base Price</label>
                <input className="w-full bg-black border border-emerald-900/20 p-4 text-white font-black outline-none focus:border-emerald-500" value={data.price} onChange={e => setData({...data, price: e.target.value})} />
              </div>
              <div className="space-y-4">
                <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Pricing Model</label>
                <select 
                  className="w-full bg-black border border-emerald-900/20 p-4 text-emerald-500 font-black text-[10px] uppercase outline-none"
                  value={data.priceType}
                  onChange={e => setData({...data, priceType: e.target.value as any})}
                >
                  <option value="range">Range (₩ ~)</option>
                  <option value="fixed">Fixed (₩)</option>
                  <option value="hidden">Hide (상담 필요)</option>
                </select>
              </div>
           </div>
           <div className="space-y-4">
              <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Representative Image</label>
              <div className="flex items-center gap-8">
                 <div className="w-48 h-28 border border-white/5 bg-black overflow-hidden flex items-center justify-center rounded-sm">
                   {data.image ? <img src={data.image} className="w-full h-full object-cover" /> : <ImageIcon size={24} className="text-stone-800"/>}
                 </div>
                 <button onClick={() => handleFileUpload((img) => setData({...data, image: img}))} className="px-6 py-3 border border-emerald-500/20 text-emerald-500 text-[9px] font-black uppercase hover:bg-emerald-500 hover:text-white transition-all">Select Media</button>
              </div>
           </div>
        </div>

        <div className="space-y-12">
           <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-emerald-900/10 pb-4">
                <h4 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.4em]">Inclusions</h4>
                <button onClick={() => setData({...data, inclusions: [...data.inclusions, '']})} className="text-emerald-500 hover:text-white transition-colors">
                  <PlusCircle size={20}/>
                </button>
              </div>
              <div className="space-y-3 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                 {data.inclusions.map((inc, idx) => (
                   <div key={idx} className="flex gap-4 group animate-fade-in">
                      <input 
                        className="flex-grow bg-black border border-emerald-900/10 p-3 text-stone-400 text-xs font-bold outline-none focus:border-emerald-500" 
                        value={inc} 
                        onChange={e => {
                          const next = [...data.inclusions];
                          next[idx] = e.target.value;
                          setData({...data, inclusions: next});
                        }} 
                      />
                      <button onClick={() => setData({...data, inclusions: data.inclusions.filter((_, i) => i !== idx)})} className="text-red-900 opacity-0 group-hover:opacity-100 transition-all">
                        <MinusCircle size={18}/>
                      </button>
                   </div>
                 ))}
                 {data.inclusions.length === 0 && <p className="text-[9px] text-stone-700 font-black uppercase">No items added yet.</p>}
              </div>
           </div>

           <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-emerald-900/10 pb-4">
                <h4 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.4em]">Additional Options</h4>
                <button onClick={() => setData({...data, options: [...data.options, { name: '', price: '' }]})} className="text-emerald-500 hover:text-white transition-colors">
                  <PlusCircle size={20}/>
                </button>
              </div>
              <div className="space-y-4">
                {data.options.map((opt, idx) => (
                  <div key={idx} className="grid grid-cols-12 gap-4 group animate-fade-in">
                    <input 
                      placeholder="Option Name" 
                      className="col-span-7 bg-black border border-emerald-900/10 p-3 text-white text-xs font-bold outline-none" 
                      value={opt.name} 
                      onChange={e => {
                        const next = [...data.options];
                        next[idx].name = e.target.value;
                        setData({...data, options: next});
                      }} 
                    />
                    <input 
                      placeholder="Price" 
                      className="col-span-4 bg-black border border-emerald-900/10 p-3 text-emerald-500 text-xs font-bold outline-none" 
                      value={opt.price} 
                      onChange={e => {
                        const next = [...data.options];
                        next[idx].price = e.target.value;
                        setData({...data, options: next});
                      }} 
                    />
                    <button onClick={() => setData({...data, options: data.options.filter((_, i) => i !== idx)})} className="col-span-1 text-red-900 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                      <X size={16}/>
                    </button>
                  </div>
                ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
