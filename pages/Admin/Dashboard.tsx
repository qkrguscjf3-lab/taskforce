
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
  Search,
  RotateCcw,
  Upload,
  Star,
  Tag,
  Calendar,
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
  Link as LinkIcon,
  Monitor,
  Heart,
  Zap,
  Target,
  Camera,
  Layers as LayersIcon
} from 'lucide-react';
import { Portfolio, Inquiry, ServicePackage, HomeContent, AboutContent } from '../../types.ts';

export const AdminDashboard: React.FC = () => {
  const { 
    portfolios, updatePortfolios, toggleDeletePortfolio, permanentDeletePortfolio,
    inquiries, updateInquiry, toggleDeleteInquiry, permanentDeleteInquiry,
    homeContent, updateHome,
    aboutContent, updateAbout,
    siteSettings, updateSettings,
    services, updateServices, toggleDeleteService, permanentDeleteService,
    logout 
  } = useSiteStore();
  
  const [activeTab, setActiveTab] = useState<'dash' | 'home' | 'portfolio' | 'service' | 'about' | 'inquiry' | 'settings' | 'trash'>('dash');
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
    { id: 'service', label: '서비스 관리', icon: Wrench },
    { id: 'about', label: '소개 에디터', icon: User },
    { id: 'inquiry', label: '문의 관리', icon: MessageSquare },
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

  const handleServiceDragEnd = () => {
    setDraggedServiceIndex(null);
  };

  return (
    <div className="min-h-screen bg-[#050606] text-stone-300 flex font-sans">
      {/* Sidebar */}
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
        {/* DASHBOARD OVERVIEW */}
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

        {/* HOME EDITOR TAB */}
        {activeTab === 'home' && (
          <div className="space-y-16 animate-fade-in max-w-5xl">
            <div className="space-y-4">
              <h2 className="text-[10px] font-black text-emerald-500 tracking-[0.5em] uppercase">Visual Hub</h2>
              <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">Home Editor</h1>
            </div>
            
            <div className="space-y-10">
              <section className="bg-stone-950 p-10 border border-emerald-900/10 rounded-sm space-y-8">
                <div className="flex justify-between items-center border-b border-emerald-900/10 pb-6">
                  <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3"><Monitor size={18} className="text-emerald-500"/> Hero Section</h3>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black text-stone-500 uppercase">Visible</span>
                    <input type="checkbox" checked={homeContent.hero.visible} onChange={e => updateHome({...homeContent, hero: {...homeContent.hero, visible: e.target.checked}})} className="w-5 h-5 accent-emerald-500" />
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-8">
                  <div className="space-y-4">
                    <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Main Headline</label>
                    <input className="w-full bg-black border border-emerald-900/20 p-5 text-white font-black outline-none focus:border-emerald-500" value={homeContent.hero.headline} onChange={e => updateHome({...homeContent, hero: {...homeContent.hero, headline: e.target.value}})} />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Sub Headline</label>
                    <textarea className="w-full bg-black border border-emerald-900/20 p-5 text-stone-400 font-bold outline-none focus:border-emerald-500 min-h-[100px]" value={homeContent.hero.subHeadline} onChange={e => updateHome({...homeContent, hero: {...homeContent.hero, subHeadline: e.target.value}})} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">CTA Button Text</label>
                      <input className="w-full bg-black border border-emerald-900/20 p-4 text-white font-black outline-none focus:border-emerald-500" value={homeContent.hero.ctaText} onChange={e => updateHome({...homeContent, hero: {...homeContent.hero, ctaText: e.target.value}})} />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Hero Image</label>
                      <div className="flex items-center gap-4">
                         <img src={homeContent.hero.bannerImage} className="w-20 h-12 object-cover border border-white/5 grayscale" />
                         <button onClick={() => handleFileUpload((img) => updateHome({...homeContent, hero: {...homeContent.hero, bannerImage: img}}))} className="px-6 py-3 bg-emerald-950/20 text-emerald-500 border border-emerald-500/20 text-[9px] font-black uppercase hover:bg-emerald-500 hover:text-white transition-all">이미지 교체</button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-stone-950 p-10 border border-emerald-900/10 rounded-sm space-y-8">
                <div className="flex justify-between items-center border-b border-emerald-900/10 pb-6">
                  <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3"><Activity size={18} className="text-emerald-500"/> Trust Badges (Stats)</h3>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-black text-stone-500 uppercase">Visible</span>
                    <input type="checkbox" checked={homeContent.stats.visible} onChange={e => updateHome({...homeContent, stats: {...homeContent.stats, visible: e.target.checked}})} className="w-5 h-5 accent-emerald-500" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   <div className="space-y-3">
                     <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Experience (Years)</label>
                     <input type="number" className="w-full bg-black border border-emerald-900/20 p-4 text-white font-black outline-none" value={homeContent.stats.experience} onChange={e => updateHome({...homeContent, stats: {...homeContent.stats, experience: parseInt(e.target.value)}})} />
                   </div>
                   <div className="space-y-3">
                     <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Projects Count</label>
                     <input type="number" className="w-full bg-black border border-emerald-900/20 p-4 text-white font-black outline-none" value={homeContent.stats.projects} onChange={e => updateHome({...homeContent, stats: {...homeContent.stats, projects: parseInt(e.target.value)}})} />
                   </div>
                   <div className="space-y-3">
                     <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Clients Count</label>
                     <input type="number" className="w-full bg-black border border-emerald-900/20 p-4 text-white font-black outline-none" value={homeContent.stats.clients} onChange={e => updateHome({...homeContent, stats: {...homeContent.stats, clients: parseInt(e.target.value)}})} />
                   </div>
                </div>
              </section>

              <section className="bg-stone-950 p-10 border border-emerald-900/10 rounded-sm space-y-8">
                 <div className="flex justify-between items-center border-b border-emerald-900/10 pb-6">
                    <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3"><ArrowRight size={18} className="text-emerald-500"/> Workflow Process</h3>
                    <input type="checkbox" checked={homeContent.process.visible} onChange={e => updateHome({...homeContent, process: {...homeContent.process, visible: e.target.checked}})} className="w-5 h-5 accent-emerald-500" />
                 </div>
                 <div className="space-y-6">
                    {homeContent.process.steps.map((step, idx) => (
                      <div key={idx} className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-white/5 rounded-sm bg-black/30">
                         <div className="space-y-2">
                           <label className="text-[8px] font-black text-emerald-900 uppercase">Step {idx + 1} Title</label>
                           <input className="w-full bg-black border border-emerald-900/20 p-3 text-white font-black text-xs" value={step.title} onChange={e => {
                             const newSteps = [...homeContent.process.steps];
                             newSteps[idx].title = e.target.value;
                             updateHome({...homeContent, process: {...homeContent.process, steps: newSteps}});
                           }} />
                         </div>
                         <div className="md:col-span-3 space-y-2">
                           <label className="text-[8px] font-black text-emerald-900 uppercase">Description</label>
                           <input className="w-full bg-black border border-emerald-900/20 p-3 text-stone-500 font-bold text-xs" value={step.description} onChange={e => {
                             const newSteps = [...homeContent.process.steps];
                             newSteps[idx].description = e.target.value;
                             updateHome({...homeContent, process: {...homeContent.process, steps: newSteps}});
                           }} />
                         </div>
                      </div>
                    ))}
                 </div>
              </section>
            </div>
          </div>
        )}

        {/* ABOUT EDITOR TAB */}
        {activeTab === 'about' && (
          <div className="space-y-16 animate-fade-in max-w-6xl">
            <div className="space-y-4">
              <h2 className="text-[10px] font-black text-emerald-500 tracking-[0.5em] uppercase">Manifesto & Philosophy</h2>
              <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">About Editor</h1>
            </div>
            
            <div className="space-y-12">
              {/* Manifesto Section */}
              <section className="bg-stone-950 p-10 border border-emerald-900/10 rounded-sm space-y-8 shadow-xl">
                 <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3 border-b border-emerald-900/10 pb-6"><Globe size={18} className="text-emerald-500"/> Site Manifesto</h3>
                 <div className="space-y-6">
                    <div className="space-y-4">
                      <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Main Statement (Title)</label>
                      <input className="w-full bg-black border border-emerald-900/20 p-5 text-white uppercase font-black text-xl outline-none focus:border-emerald-500" value={aboutContent.manifesto.title} onChange={e => updateAbout({...aboutContent, manifesto: {...aboutContent.manifesto, title: e.target.value}})} />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Manifesto Description</label>
                      <textarea className="w-full bg-black border border-emerald-900/20 p-6 text-stone-400 text-sm leading-relaxed outline-none min-h-[150px] focus:border-emerald-500" value={aboutContent.manifesto.description} onChange={e => updateAbout({...aboutContent, manifesto: {...aboutContent.manifesto, description: e.target.value}})} />
                    </div>
                 </div>
              </section>

              {/* Director Profile Section */}
              <section className="bg-stone-950 p-10 border border-emerald-900/10 rounded-sm space-y-8 shadow-xl">
                 <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3 border-b border-emerald-900/10 pb-6"><User size={18} className="text-emerald-500"/> Director's Intelligence</h3>
                 <div className="flex flex-col md:flex-row gap-12 items-start">
                    <div className="relative group w-48 h-60 overflow-hidden border border-white/5 rounded-sm flex-shrink-0">
                      <img src={aboutContent.director.image} className="w-full h-full object-cover grayscale opacity-50 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
                      <button onClick={() => handleFileUpload((img) => updateAbout({...aboutContent, director: {...aboutContent.director, image: img}}))} className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-emerald-500 uppercase text-[9px] font-black transition-all">
                        <Upload size={18} className="mb-2"/> 이미지 변경
                      </button>
                    </div>
                    <div className="flex-grow space-y-6 w-full">
                       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                             <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Name</label>
                             <input className="w-full bg-black border border-emerald-900/20 p-4 text-white font-black text-lg outline-none" value={aboutContent.director.name} onChange={e => updateAbout({...aboutContent, director: {...aboutContent.director, name: e.target.value}})} />
                          </div>
                          <div className="space-y-2">
                             <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Role</label>
                             <input className="w-full bg-black border border-emerald-900/20 p-4 text-emerald-500 font-black uppercase outline-none" value={aboutContent.director.role} onChange={e => updateAbout({...aboutContent, director: {...aboutContent.director, role: e.target.value}})} />
                          </div>
                       </div>
                    </div>
                 </div>
              </section>

              {/* Core Philosophy Section */}
              <section className="bg-stone-950 p-10 border border-emerald-900/10 rounded-sm space-y-8 shadow-xl">
                 <div className="flex justify-between items-center border-b border-emerald-900/10 pb-6">
                    <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3"><Heart size={18} className="text-emerald-500"/> Core Philosophy</h3>
                    <button onClick={() => {
                      const newItems = [...aboutContent.philosophy.items, { title: 'NEW PILLAR', description: 'Brief description...', icon: 'Zap' }];
                      updateAbout({...aboutContent, philosophy: {...aboutContent.philosophy, items: newItems}});
                    }} className="text-[9px] font-black bg-emerald-600/10 text-emerald-500 px-4 py-2 border border-emerald-500/20 hover:bg-emerald-600 hover:text-white transition-all">항목 추가</button>
                 </div>
                 <div className="space-y-6">
                    {aboutContent.philosophy.items.map((item, idx) => (
                      <div key={idx} className="p-8 bg-black/40 border border-white/5 rounded-sm relative group">
                        <button onClick={() => {
                          const newItems = aboutContent.philosophy.items.filter((_, i) => i !== idx);
                          updateAbout({...aboutContent, philosophy: {...aboutContent.philosophy, items: newItems}});
                        }} className="absolute top-4 right-4 text-red-900 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><X size={16}/></button>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                           <div className="space-y-4">
                              <label className="text-[8px] font-black text-emerald-900 uppercase">Title</label>
                              <input className="w-full bg-black border border-emerald-900/20 p-3 text-white font-black text-sm uppercase" value={item.title} onChange={e => {
                                const newItems = [...aboutContent.philosophy.items];
                                newItems[idx].title = e.target.value;
                                updateAbout({...aboutContent, philosophy: {...aboutContent.philosophy, items: newItems}});
                              }} />
                           </div>
                           <div className="space-y-4 md:col-span-2">
                              <label className="text-[8px] font-black text-emerald-900 uppercase">Description</label>
                              <input className="w-full bg-black border border-emerald-900/20 p-3 text-stone-500 font-bold text-sm" value={item.description} onChange={e => {
                                const newItems = [...aboutContent.philosophy.items];
                                newItems[idx].description = e.target.value;
                                updateAbout({...aboutContent, philosophy: {...aboutContent.philosophy, items: newItems}});
                              }} />
                           </div>
                        </div>
                      </div>
                    ))}
                 </div>
              </section>

              {/* Equipment & Ops Section */}
              <section className="bg-stone-950 p-10 border border-emerald-900/10 rounded-sm space-y-8 shadow-xl">
                 <div className="flex justify-between items-center border-b border-emerald-900/10 pb-6">
                    <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-3"><Camera size={18} className="text-emerald-500"/> Operational Capacity (Equipment)</h3>
                    <button onClick={() => {
                      const newCats = [...aboutContent.equipment.categories, { title: 'NEW UNIT', list: ['Enter gear name...'] }];
                      updateAbout({...aboutContent, equipment: {...aboutContent.equipment, categories: newCats}});
                    }} className="text-[9px] font-black bg-emerald-600/10 text-emerald-500 px-4 py-2 border border-emerald-500/20 hover:bg-emerald-600 hover:text-white transition-all">카테고리 추가</button>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {aboutContent.equipment.categories.map((cat, catIdx) => (
                      <div key={catIdx} className="p-8 bg-black/40 border border-white/5 rounded-sm relative group h-full flex flex-col">
                        <button onClick={() => {
                          const newCats = aboutContent.equipment.categories.filter((_, i) => i !== catIdx);
                          updateAbout({...aboutContent, equipment: {...aboutContent.equipment, categories: newCats}});
                        }} className="absolute top-4 right-4 text-red-900 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><X size={16}/></button>
                        <div className="space-y-6 flex-grow">
                          <input className="w-full bg-transparent border-b border-emerald-900/20 p-2 text-white font-black text-sm uppercase outline-none focus:border-emerald-500" value={cat.title} onChange={e => {
                            const newCats = [...aboutContent.equipment.categories];
                            newCats[catIdx].title = e.target.value;
                            updateAbout({...aboutContent, equipment: {...aboutContent.equipment, categories: newCats}});
                          }} />
                          <div className="space-y-3">
                            {cat.list.map((item, itemIdx) => (
                              <div key={itemIdx} className="flex gap-2 group/item">
                                <input className="flex-grow bg-black/30 border border-emerald-900/10 p-2 text-[10px] text-stone-500 uppercase font-black" value={item} onChange={e => {
                                  const newCats = [...aboutContent.equipment.categories];
                                  newCats[catIdx].list[itemIdx] = e.target.value;
                                  updateAbout({...aboutContent, equipment: {...aboutContent.equipment, categories: newCats}});
                                }} />
                                <button onClick={() => {
                                  const newCats = [...aboutContent.equipment.categories];
                                  newCats[catIdx].list = newCats[catIdx].list.filter((_, i) => i !== itemIdx);
                                  updateAbout({...aboutContent, equipment: {...aboutContent.equipment, categories: newCats}});
                                }} className="text-red-900/50 hover:text-red-500 opacity-0 group-hover/item:opacity-100"><Trash size={12}/></button>
                              </div>
                            ))}
                          </div>
                        </div>
                        <button onClick={() => {
                          const newCats = [...aboutContent.equipment.categories];
                          newCats[catIdx].list.push('New Gear');
                          updateAbout({...aboutContent, equipment: {...aboutContent.equipment, categories: newCats}});
                        }} className="mt-6 w-full py-2 border border-emerald-900/10 text-[8px] font-black text-stone-700 hover:text-emerald-500 uppercase tracking-widest transition-all">+ 장비 추가</button>
                      </div>
                    ))}
                 </div>
              </section>
            </div>
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="space-y-16 animate-fade-in max-w-4xl">
            <div className="space-y-4">
              <h2 className="text-[10px] font-black text-emerald-500 tracking-[0.5em] uppercase">Global Variables</h2>
              <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">Site Settings</h1>
            </div>
            <div className="bg-stone-950 p-12 border border-emerald-900/10 space-y-16 rounded-sm shadow-xl">
              <section className="space-y-8">
                <h3 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.5em] border-b border-emerald-900/10 pb-6 flex items-center gap-4"><Phone size={16} /> 연락처 정보</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">전화번호</label>
                    <input className="w-full bg-black border border-emerald-900/20 p-5 text-white font-black outline-none focus:border-emerald-500" value={siteSettings.contact.phone} onChange={e => updateSettings({...siteSettings, contact: {...siteSettings.contact, phone: e.target.value}})} />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">이메일</label>
                    <input className="w-full bg-black border border-emerald-900/20 p-5 text-white font-black outline-none focus:border-emerald-500" value={siteSettings.contact.email} onChange={e => updateSettings({...siteSettings, contact: {...siteSettings.contact, email: e.target.value}})} />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">주소</label>
                  <input className="w-full bg-black border border-emerald-900/20 p-5 text-white font-black outline-none focus:border-emerald-500" value={siteSettings.contact.address} onChange={e => updateSettings({...siteSettings, contact: {...siteSettings.contact, address: e.target.value}})} />
                </div>
              </section>

              <section className="space-y-8">
                <h3 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.5em] border-b border-emerald-900/10 pb-6 flex items-center gap-4"><Globe size={16} /> 소셜 미디어 링크</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Instagram URL</label>
                    <div className="flex items-center bg-black border border-emerald-900/20 focus-within:border-emerald-500 pr-4">
                      <Instagram size={18} className="ml-5 text-stone-700" />
                      <input className="flex-grow bg-transparent p-5 text-white font-black outline-none" value={siteSettings.social.instagram} onChange={e => updateSettings({...siteSettings, social: {...siteSettings.social, instagram: e.target.value}})} />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">YouTube URL</label>
                    <div className="flex items-center bg-black border border-emerald-900/20 focus-within:border-emerald-500 pr-4">
                      <Youtube size={18} className="ml-5 text-stone-700" />
                      <input className="flex-grow bg-transparent p-5 text-white font-black outline-none" value={siteSettings.social.youtube} onChange={e => updateSettings({...siteSettings, social: {...siteSettings.social, youtube: e.target.value}})} />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}

        {/* PORTFOLIO TAB */}
        {activeTab === 'portfolio' && (
          <div className="space-y-12 animate-fade-in">
            <div className="flex justify-between items-end gap-10">
              <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">Portfolio</h1>
              {!editingPortfolioId && <button onClick={() => setEditingPortfolioId('new')} className="px-10 py-5 bg-emerald-600 text-white font-black text-[10px] uppercase tracking-widest rounded-sm">새 프로젝트 추가</button>}
            </div>
            {editingPortfolioId ? (
              <PortfolioEditor 
                portfolio={editingPortfolioId === 'new' ? undefined : portfolios.find(p => p.id === editingPortfolioId)} 
                onSave={(p) => { updatePortfolios(portfolios.some(item => item.id === p.id) ? portfolios.map(item => item.id === p.id ? p : item) : [p, ...portfolios]); setEditingPortfolioId(null); }}
                onCancel={() => setEditingPortfolioId(null)}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {portfolios.filter(p => !p.isDeleted).map(p => (
                  <div key={p.id} className="bg-stone-950 border border-emerald-900/10 p-4 rounded-sm hover:border-emerald-500 transition-all group overflow-hidden">
                    <div className="relative aspect-video overflow-hidden mb-4 bg-black">
                       <img src={p.mediaGallery.find(m => m.isHero)?.url || 'https://via.placeholder.com/800x450'} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                    </div>
                    <h3 className="text-white font-black uppercase text-sm mb-4 truncate px-2">{p.title}</h3>
                    <div className="flex justify-between items-center p-2">
                      <button onClick={() => setEditingPortfolioId(p.id)} className="text-[10px] text-emerald-500 uppercase font-black tracking-widest">수정</button>
                      <button onClick={() => toggleDeletePortfolio(p.id, true)} className="text-[10px] text-red-900/50 hover:text-red-500 uppercase font-black tracking-widest">삭제</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SERVICE TAB */}
        {activeTab === 'service' && (
          <div className="space-y-12 animate-fade-in">
            <div className="flex justify-between items-end gap-10">
              <div>
                <h2 className="text-[10px] font-black text-emerald-500 tracking-[0.5em] uppercase mb-2">Service Architect</h2>
                <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">Services</h1>
              </div>
              {!editingServiceId && (
                <div className="flex items-center gap-6">
                  <p className="text-[9px] font-black text-stone-600 uppercase tracking-widest hidden md:block">Drag items to reorder</p>
                  <button onClick={() => setEditingServiceId('new')} className="px-10 py-5 bg-emerald-600 text-white font-black text-[10px] uppercase tracking-widest rounded-sm">새 패키지 추가</button>
                </div>
              )}
            </div>
            {editingServiceId ? (
              <ServiceEditor 
                service={editingServiceId === 'new' ? undefined : services.find(s => s.id === editingServiceId)}
                onSave={(s) => { updateServices(services.some(item => item.id === s.id) ? services.map(item => item.id === s.id ? s : item) : [...services, s]); setEditingServiceId(null); }}
                onCancel={() => setEditingServiceId(null)}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {services.filter(s => !s.isDeleted).map((s, index) => {
                  const globalIndex = services.findIndex(item => item.id === s.id);
                  return (
                    <div 
                      key={s.id} 
                      draggable 
                      onDragStart={() => handleServiceDragStart(globalIndex)}
                      onDragOver={(e) => handleServiceDragOver(e, globalIndex)}
                      onDragEnd={handleServiceDragEnd}
                      className={`bg-stone-950 p-10 border rounded-sm hover:border-emerald-500/30 transition-all flex flex-col cursor-move relative group ${
                        draggedServiceIndex === globalIndex ? 'opacity-30 border-emerald-500 scale-95' : 'border-emerald-900/10'
                      }`}
                    >
                      <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-stone-800">
                        <GripVertical size={20} />
                      </div>
                      <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">{s.name}</h3>
                      <p className="text-stone-500 text-xs mb-8 flex-grow">{s.description}</p>
                      <div className="flex gap-6 pt-6 border-t border-emerald-900/5">
                        <button onClick={() => setEditingServiceId(s.id)} className="text-[10px] text-emerald-500 uppercase font-black tracking-widest flex items-center gap-2">
                          <Edit size={12} /> 수정
                        </button>
                        <button onClick={() => toggleDeleteService(s.id, true)} className="text-[10px] text-red-900/50 hover:text-red-500 uppercase font-black tracking-widest flex items-center gap-2">
                          <Trash size={12} /> 삭제
                        </button>
                      </div>
                    </div>
                  );
                })}
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
            </div>
          </div>
        )}

        {/* TRASH TAB */}
        {activeTab === 'trash' && (
          <div className="space-y-16 animate-fade-in max-w-7xl">
            <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">Trash Bin</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               {/* Deleted Portfolios */}
               <div className="space-y-8">
                  <h3 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.4em] border-b border-white/5 pb-4">포트폴리오 ({deletedPortfolios.length})</h3>
                  {deletedPortfolios.map(p => (
                    <div key={p.id} className="bg-stone-900 p-6 border border-red-900/20 flex justify-between items-center group">
                      <span className="text-white text-xs font-black uppercase truncate max-w-[200px]">{p.title}</span>
                      <div className="flex gap-4">
                        <button onClick={() => toggleDeletePortfolio(p.id, false)} className="text-emerald-500 opacity-50 hover:opacity-100 transition-opacity"><RotateCcw size={16} /></button>
                        <button onClick={() => { if(confirm('영구 삭제하시겠습니까?')) permanentDeletePortfolio(p.id); }} className="text-red-500 opacity-50 hover:opacity-100 transition-opacity"><Trash size={16} /></button>
                      </div>
                    </div>
                  ))}
               </div>
               {/* Deleted Inquiries */}
               <div className="space-y-8">
                  <h3 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.4em] border-b border-white/5 pb-4">문의 ({deletedInquiries.length})</h3>
                  {deletedInquiries.map(i => (
                    <div key={i.id} className="bg-stone-900 p-6 border border-red-900/20 flex justify-between items-center group">
                      <span className="text-white text-xs font-black uppercase truncate max-w-[200px]">{i.name}</span>
                      <div className="flex gap-4">
                        <button onClick={() => toggleDeleteInquiry(i.id, false)} className="text-emerald-500 opacity-50 hover:opacity-100 transition-opacity"><RotateCcw size={16} /></button>
                        <button onClick={() => { if(confirm('영구 삭제하시겠습니까?')) permanentDeleteInquiry(i.id); }} className="text-red-500 opacity-50 hover:opacity-100 transition-opacity"><Trash size={16} /></button>
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

/* --- Editor Components --- */

const PortfolioEditor: React.FC<{ portfolio?: Portfolio, onSave: (p: Portfolio) => void, onCancel: () => void }> = ({ portfolio, onSave, onCancel }) => {
  const [data, setData] = useState<Portfolio>(portfolio || {
    id: Date.now().toString(), title: '', slug: '', status: 'draft', featured: false, category: '기업홍보', tags: [],
    oneLiner: '', summary: '', scope: [], overview: '', problem: '', solution: '', results: '',
    mediaGallery: [], videoLinks: []
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

  const handleAddVideo = () => {
    setData({...data, videoLinks: [...data.videoLinks, { platform: 'YouTube', url: '', title: '' }]});
  };

  return (
    <div className="bg-stone-950 border border-emerald-900/10 p-12 rounded-sm space-y-12 shadow-2xl animate-fade-in max-w-7xl mx-auto">
      {/* Upper Grid: Primary Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div className="space-y-8">
           <h4 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.4em] border-b border-emerald-900/10 pb-4 flex items-center gap-3"><Edit size={14}/> 기본 정보</h4>
           
           <div className="space-y-4">
              <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">프로젝트 제목</label>
              <input className="w-full bg-black border border-emerald-900/20 p-4 text-white uppercase font-black text-lg focus:border-emerald-500 transition-all outline-none" placeholder="제목을 입력하세요" value={data.title} onChange={e => setData({...data, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} />
           </div>

           <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">분류 (Category)</label>
                <input className="w-full bg-black border border-emerald-900/20 p-4 text-white uppercase font-black text-xs outline-none focus:border-emerald-500" value={data.category} onChange={e => setData({...data, category: e.target.value})} />
              </div>
              <div className="space-y-4">
                <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">클라이언트</label>
                <input className="w-full bg-black border border-emerald-900/20 p-4 text-white uppercase font-black text-xs outline-none focus:border-emerald-500" value={data.clientName || ''} onChange={e => setData({...data, clientName: e.target.value})} />
              </div>
           </div>

           <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">태그 (쉼표로 구분)</label>
                <input className="w-full bg-black border border-emerald-900/20 p-4 text-white font-black text-xs outline-none focus:border-emerald-500" value={data.tags.join(', ')} onChange={e => setData({...data, tags: e.target.value.split(',').map(t => t.trim())})} />
              </div>
              <div className="flex items-center gap-4 pt-10">
                <input type="checkbox" id="isFeatured" className="w-5 h-5 accent-emerald-500" checked={data.featured} onChange={e => setData({...data, featured: e.target.checked})} />
                <label htmlFor="isFeatured" className="text-[10px] font-black text-stone-500 uppercase tracking-widest cursor-pointer">대표 작품 등록</label>
              </div>
           </div>

           <div className="space-y-4">
              <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">한 줄 요약 (Slogan)</label>
              <input className="w-full bg-black border border-emerald-900/20 p-4 text-stone-400 font-bold outline-none focus:border-emerald-500" value={data.oneLiner} onChange={e => setData({...data, oneLiner: e.target.value})} />
           </div>

           <div className="space-y-4">
              <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">작업 일자</label>
              <input type="date" className="w-full bg-black border border-emerald-900/20 p-4 text-white uppercase font-black text-xs outline-none focus:border-emerald-500" value={data.date} onChange={e => setData({...data, date: e.target.value})} />
           </div>
        </div>

        <div className="space-y-8">
           <h4 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.4em] border-b border-emerald-900/10 pb-4 flex justify-between items-center">
             <span>미디어 자산</span>
             <label className="text-[9px] font-black bg-emerald-600/20 text-emerald-500 px-4 py-2 cursor-pointer hover:bg-emerald-600 hover:text-white transition-all">
               이미지 다중 추가
               <input type="file" multiple accept="image/*" onChange={handleMultiFileUpload} className="hidden" />
             </label>
           </h4>

           <div className="grid grid-cols-4 gap-4 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin">
              {data.mediaGallery.map(m => (
                <div key={m.id} onClick={() => setActiveMediaId(m.id)} className={`relative aspect-video bg-black overflow-hidden border cursor-pointer transition-all ${activeMediaId === m.id ? 'border-emerald-500 scale-[0.98]' : 'border-white/5 opacity-50 hover:opacity-100'}`}>
                  <img src={m.url} className="w-full h-full object-cover" />
                  {m.isHero && <div className="absolute top-0 right-0 bg-emerald-600 text-[7px] font-black px-1 uppercase">Hero</div>}
                </div>
              ))}
              {data.mediaGallery.length === 0 && <div className="col-span-4 py-16 text-center text-[10px] text-stone-700 uppercase font-black border border-dashed border-emerald-900/10">No Assets</div>}
           </div>

           {activeMedia && (
             <div className="bg-black/50 border border-emerald-900/10 p-6 space-y-4 animate-fade-in">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">자산 상세 설정</span>
                  <div className="flex gap-4">
                     <button onClick={() => updateMediaItem(activeMedia.id, { isHero: true })} className={`text-[8px] font-black px-3 py-1 uppercase tracking-widest ${activeMedia.isHero ? 'bg-emerald-600 text-white' : 'bg-stone-900 text-stone-500'}`}>{activeMedia.isHero ? '대표 지정됨' : '대표로 지정'}</button>
                     <button onClick={() => { setData({...data, mediaGallery: data.mediaGallery.filter(x => x.id !== activeMedia.id)}); setActiveMediaId(null); }} className="text-red-900 hover:text-red-500 transition-colors"><Trash size={14}/></button>
                  </div>
                </div>
                <div className="space-y-4">
                   <input className="w-full bg-stone-950 border border-emerald-900/10 p-3 text-xs text-stone-400 outline-none focus:border-emerald-500" placeholder="이미지 캡션 (Caption)" value={activeMedia.caption || ''} onChange={e => updateMediaItem(activeMedia.id, { caption: e.target.value })} />
                   <input className="w-full bg-stone-950 border border-emerald-900/10 p-3 text-xs text-stone-400 outline-none focus:border-emerald-500" placeholder="ALT 텍스트 (Metadata)" value={activeMedia.alt || ''} onChange={e => updateMediaItem(activeMedia.id, { alt: e.target.value })} />
                </div>
             </div>
           )}

           {/* Video Links */}
           <div className="pt-6 border-t border-emerald-900/10 space-y-6">
              <div className="flex justify-between items-center">
                 <h4 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.4em] flex items-center gap-3"><Youtube size={14}/> 영상 링크 임베드</h4>
                 <button onClick={handleAddVideo} className="text-[9px] font-black bg-white/5 text-white px-4 py-2 hover:bg-white/10 transition-all">+ 링크 추가</button>
              </div>
              <div className="space-y-4">
                 {data.videoLinks.map((video, idx) => (
                   <div key={idx} className="flex gap-3 items-center">
                      <input className="flex-1 bg-black border border-emerald-900/20 p-3 text-xs text-white" placeholder="https://youtube.com/..." value={video.url} onChange={e => {
                        const newLinks = [...data.videoLinks];
                        newLinks[idx].url = e.target.value;
                        setData({...data, videoLinks: newLinks});
                      }} />
                      <button onClick={() => setData({...data, videoLinks: data.videoLinks.filter((_, vidx) => vidx !== idx)})} className="text-red-900 hover:text-red-500"><X size={16}/></button>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Narrative Section: Problem / Solution / Results */}
      <div className="space-y-12">
         <h4 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.4em] border-b border-emerald-900/10 pb-4">나러티브 구성 (The Story)</h4>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
               <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest flex items-center gap-2"><ArrowRight size={10} className="text-emerald-900"/> Problem (문제점)</label>
               <textarea className="w-full bg-black border border-emerald-900/20 p-5 text-stone-400 text-sm min-h-[150px] outline-none focus:border-emerald-500 leading-relaxed" value={data.problem} onChange={e => setData({...data, problem: e.target.value})} />
            </div>
            <div className="space-y-4">
               <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest flex items-center gap-2"><ArrowRight size={10} className="text-emerald-900"/> Solution (해결책)</label>
               <textarea className="w-full bg-black border border-emerald-900/20 p-5 text-stone-400 text-sm min-h-[150px] outline-none focus:border-emerald-500 leading-relaxed" value={data.solution} onChange={e => setData({...data, solution: e.target.value})} />
            </div>
            <div className="space-y-4">
               <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest flex items-center gap-2"><ArrowRight size={10} className="text-emerald-900"/> Results (결과물)</label>
               <textarea className="w-full bg-black border border-emerald-900/20 p-5 text-stone-400 text-sm min-h-[150px] outline-none focus:border-emerald-500 leading-relaxed" value={data.results} onChange={e => setData({...data, results: e.target.value})} />
            </div>
         </div>
         <div className="space-y-4">
            <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest flex items-center gap-2"><ArrowRight size={10} className="text-emerald-900"/> Overview (상세 개요)</label>
            <textarea className="w-full bg-black border border-emerald-900/20 p-5 text-stone-400 text-sm min-h-[150px] outline-none focus:border-emerald-500 leading-relaxed" value={data.overview} onChange={e => setData({...data, overview: e.target.value})} />
         </div>
      </div>

      {/* Footer: Save/Cancel */}
      <div className="flex gap-4 pt-10 border-t border-emerald-900/10">
        <button onClick={() => onSave({...data, status: 'published'})} className="px-12 py-5 bg-emerald-600 text-white font-black uppercase text-[10px] tracking-widest shadow-xl shadow-emerald-950/40 hover:bg-emerald-500 transition-all flex items-center gap-3">
          <Save size={16} /> 프로젝트 저장 및 게시
        </button>
        <button onClick={onCancel} className="px-12 py-5 border border-white/10 text-stone-500 font-black uppercase text-[10px] tracking-widest hover:text-white transition-all">수정 취소</button>
      </div>
    </div>
  );
};

const ServiceEditor: React.FC<{ service?: ServicePackage, onSave: (s: ServicePackage) => void, onCancel: () => void }> = ({ service, onSave, onCancel }) => {
  const [data, setData] = useState<ServicePackage>(service || {
    id: Date.now().toString(), name: '', description: '', price: '0', priceType: 'range', inclusions: [], options: [], image: '', isDeleted: false
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
    <div className="bg-stone-950 border border-emerald-900/10 p-12 rounded-sm space-y-12 shadow-2xl animate-fade-in">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">패키지 이름</label>
            <input className="w-full bg-black border border-emerald-900/20 p-5 text-white font-black text-xl uppercase outline-none focus:border-emerald-500" placeholder="e.g., PREMIUM FILM" value={data.name} onChange={e => setData({...data, name: e.target.value})} />
          </div>
          <div className="space-y-2">
             <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">패키지 이미지</label>
             <div className="flex items-center gap-8">
               <div className="w-32 h-20 border border-white/10 overflow-hidden bg-black flex items-center justify-center">
                 {data.image ? <img src={data.image} className="w-full h-full object-cover grayscale opacity-50" /> : <ImageIcon className="text-stone-800" />}
               </div>
               <button onClick={() => handleFileUpload((img) => setData({...data, image: img}))} className="px-6 py-3 border border-emerald-500/20 text-emerald-500 text-[9px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all">업로드</button>
             </div>
          </div>
        </div>
        <div className="space-y-6">
           <div className="space-y-2">
             <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">설명</label>
             <textarea className="w-full bg-black border border-emerald-900/20 p-5 text-stone-400 text-sm min-h-[120px] outline-none focus:border-emerald-500" placeholder="패키지 구성에 대한 상세 설명..." value={data.description} onChange={e => setData({...data, description: e.target.value})} />
           </div>
           <div className="space-y-2">
             <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">기본 가격</label>
             <input className="w-full bg-black border border-emerald-900/20 p-4 text-white font-black outline-none" placeholder="1,500,000" value={data.price} onChange={e => setData({...data, price: e.target.value})} />
           </div>
        </div>
      </div>
      <div className="flex gap-4 pt-10 border-t border-emerald-900/10">
        <button onClick={() => onSave(data)} className="px-12 py-5 bg-emerald-600 text-white font-black uppercase text-[10px] tracking-widest shadow-xl">패키지 저장</button>
        <button onClick={onCancel} className="px-12 py-5 border border-white/10 text-stone-500 font-black uppercase text-[10px] tracking-widest">취소</button>
      </div>
    </div>
  );
};
