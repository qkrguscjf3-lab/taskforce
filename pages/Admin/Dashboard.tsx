
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSiteStore } from '../../store';
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
  ExternalLink,
  Search,
  RotateCcw,
  AlertTriangle,
  Upload,
  Star,
  Tag,
  FileText,
  Calendar,
  GripVertical,
  Zap,
  Heart,
  Target,
  Monitor,
  Camera,
  Trash,
  Globe,
  Youtube,
  Link as LinkIcon,
  Phone,
  Mail,
  MapPin,
  Instagram
} from 'lucide-react';
import { Portfolio, Inquiry, ServicePackage, AboutContent, HomeContent, SiteSettings } from '../../types';

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

  // Define filtered lists for the trash bin
  const deletedPortfolios = portfolios.filter(p => p.isDeleted);
  const deletedServices = services.filter(s => s.isDeleted);
  const deletedInquiries = inquiries.filter(i => i.isDeleted);

  const menuItems = [
    { id: 'dash', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'home', label: 'Home Editor', icon: Layers },
    { id: 'portfolio', label: 'Portfolios', icon: Briefcase },
    { id: 'service', label: 'Services', icon: Wrench },
    { id: 'about', label: 'About Editor', icon: User },
    { id: 'inquiry', label: 'Inquiries', icon: MessageSquare },
    { id: 'settings', label: 'Site Settings', icon: Settings },
    { id: 'trash', label: 'Trash Bin', icon: Trash2 },
  ];

  const totalTrashCount = deletedPortfolios.length + deletedServices.length + deletedInquiries.length;

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
              onClick={() => { 
                setActiveTab(item.id as any); 
                setEditingPortfolioId(null); 
                setEditingServiceId(null);
              }}
              className={`w-full flex items-center space-x-5 px-6 py-5 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                activeTab === item.id 
                  ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-950/40 translate-x-1' 
                  : 'text-stone-600 hover:text-white hover:bg-white/5'
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
              <span>Back to Public Site</span>
            </Link>
          </div>
        </nav>

        <div className="p-8 border-t border-emerald-900/10">
          <button onClick={logout} className="w-full flex items-center space-x-5 px-6 py-4 text-stone-800 hover:text-red-500 transition-colors uppercase text-[10px] font-black tracking-widest">
            <LogOut size={16} />
            <span>Terminate Session</span>
          </button>
        </div>
      </aside>

      <main className="flex-grow p-16 overflow-y-auto bg-black/40">
        {/* DASHBOARD TAB */}
        {activeTab === 'dash' && (
          <div className="space-y-16 animate-fade-in max-w-7xl">
            <div className="space-y-4">
              <h2 className="text-[10px] font-black text-emerald-500 tracking-[0.5em] uppercase">Control Center</h2>
              <h1 className="text-7xl font-black text-white tracking-tighter uppercase leading-none">Operational<br/>Overview</h1>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
              <div className="bg-stone-950 border border-emerald-900/10 p-10 rounded-sm">
                <Briefcase className="text-emerald-900 mb-6" size={32} />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-600 mb-2">Portfolio</p>
                <p className="text-6xl font-black text-white">{portfolios.filter(p => !p.isDeleted).length}</p>
              </div>
              <div className="bg-stone-950 border border-emerald-900/10 p-10 rounded-sm">
                <MessageSquare className="text-emerald-900 mb-6" size={32} />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-600 mb-2">New Inquiries</p>
                <p className="text-6xl font-black text-emerald-400">{inquiries.filter(i => i.status === 'new' && !i.isDeleted).length}</p>
              </div>
              <div className="bg-stone-950 border border-emerald-900/10 p-10 rounded-sm">
                <Wrench className="text-emerald-900 mb-6" size={32} />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-600 mb-2">Services</p>
                <p className="text-6xl font-black text-white">{services.filter(s => !s.isDeleted).length}</p>
              </div>
              <div className="bg-stone-950 border border-red-900/10 p-10 rounded-sm">
                <Trash2 className="text-red-900 mb-6" size={32} />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-600 mb-2">Trash Bin</p>
                <p className="text-6xl font-black text-white">{totalTrashCount}</p>
              </div>
            </div>
          </div>
        )}

        {/* HOME EDITOR TAB */}
        {activeTab === 'home' && (
          <div className="space-y-16 animate-fade-in max-w-5xl">
            <div className="space-y-4">
              <h2 className="text-[10px] font-black text-emerald-500 tracking-[0.5em] uppercase">Visual Hub</h2>
              <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">Home Config</h1>
            </div>
            
            <div className="bg-stone-950 p-12 border border-emerald-900/10 space-y-12 rounded-sm shadow-xl">
              <section className="space-y-10">
                <div className="flex justify-between items-center border-b border-emerald-900/10 pb-6">
                   <h3 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.5em] flex items-center gap-4"><Layers size={16} /> Hero Protocol</h3>
                   <input type="checkbox" checked={homeContent.hero.visible} onChange={e => updateHome({...homeContent, hero: {...homeContent.hero, visible: e.target.checked}})} className="w-5 h-5 accent-emerald-500" />
                </div>
                <div className="grid grid-cols-1 gap-8">
                  <div className="space-y-4">
                    <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Main Headline</label>
                    <input className="w-full bg-black border border-emerald-900/20 p-5 text-white uppercase font-black text-xl outline-none focus:border-emerald-500" value={homeContent.hero.headline} onChange={e => updateHome({...homeContent, hero: {...homeContent.hero, headline: e.target.value}})} />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Sub Headline</label>
                    <textarea className="w-full bg-black border border-emerald-900/20 p-5 text-stone-400 text-sm outline-none focus:border-emerald-500 min-h-[100px]" value={homeContent.hero.subHeadline} onChange={e => updateHome({...homeContent, hero: {...homeContent.hero, subHeadline: e.target.value}})} />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Banner Visual Asset</label>
                    <div className="flex items-center gap-8">
                       <img src={homeContent.hero.bannerImage} className="w-40 h-24 object-cover border border-white/10 rounded-sm grayscale opacity-50 shadow-2xl" alt="Hero Banner" />
                       <button 
                        onClick={() => handleFileUpload((img) => updateHome({...homeContent, hero: {...homeContent.hero, bannerImage: img}}))}
                        className="px-8 py-4 bg-emerald-900/20 text-emerald-500 border border-emerald-500/20 text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all flex items-center gap-3"
                       >
                         <Upload size={14} /> Upload Banner Image
                       </button>
                    </div>
                  </div>
                </div>
              </section>

              <section className="space-y-10 pt-10 border-t border-emerald-900/10">
                <div className="flex justify-between items-center border-b border-emerald-900/10 pb-6">
                   <h3 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.5em] flex items-center gap-4"><Settings size={16} /> Operational Stats</h3>
                   <input type="checkbox" checked={homeContent.stats.visible} onChange={e => updateHome({...homeContent, stats: {...homeContent.stats, visible: e.target.checked}})} className="w-5 h-5 accent-emerald-500" />
                </div>
                <div className="grid grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Years Experience</label>
                    <input type="number" className="w-full bg-black border border-emerald-900/20 p-5 text-white font-black outline-none" value={homeContent.stats.experience} onChange={e => updateHome({...homeContent, stats: {...homeContent.stats, experience: parseInt(e.target.value)}})} />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Total Projects</label>
                    <input type="number" className="w-full bg-black border border-emerald-900/20 p-5 text-white font-black outline-none" value={homeContent.stats.projects} onChange={e => updateHome({...homeContent, stats: {...homeContent.stats, projects: parseInt(e.target.value)}})} />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Happy Clients</label>
                    <input type="number" className="w-full bg-black border border-emerald-900/20 p-5 text-white font-black outline-none" value={homeContent.stats.clients} onChange={e => updateHome({...homeContent, stats: {...homeContent.stats, clients: parseInt(e.target.value)}})} />
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
              <div className="space-y-4">
                <h2 className="text-[10px] font-black text-emerald-500 tracking-[0.5em] uppercase">Visual Assets</h2>
                <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">Portfolio</h1>
              </div>
              {!editingPortfolioId && (
                <button 
                  onClick={() => setEditingPortfolioId('new')} 
                  className="px-10 py-5 bg-emerald-600 text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-sm hover:bg-emerald-500 transition-all flex items-center space-x-3"
                >
                  <Plus size={16} />
                  <span>New Mission</span>
                </button>
              )}
            </div>

            {editingPortfolioId ? (
              <PortfolioEditor 
                portfolio={editingPortfolioId === 'new' ? undefined : portfolios.find(p => p.id === editingPortfolioId)} 
                onSave={(p) => { updatePortfolios(portfolios.some(item => item.id === p.id) ? portfolios.map(item => item.id === p.id ? p : item) : [p, ...portfolios]); setEditingPortfolioId(null); }}
                onCancel={() => setEditingPortfolioId(null)}
                onDelete={() => { toggleDeletePortfolio(editingPortfolioId, true); setEditingPortfolioId(null); }}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {portfolios.filter(p => !p.isDeleted).map(p => (
                  <div key={p.id} className="bg-stone-950 border border-emerald-900/10 group overflow-hidden flex flex-col hover:border-emerald-500/30 transition-all rounded-sm">
                    <div className="aspect-video relative overflow-hidden bg-black">
                      <img src={p.mediaGallery.find(m => m.isHero)?.url || 'https://picsum.photos/800/450'} className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000" />
                      <div className="absolute top-4 left-4">
                        <span className={`px-4 py-1.5 text-[8px] font-black uppercase tracking-widest rounded-full ${p.status === 'published' ? 'bg-emerald-600/20 text-emerald-500' : 'bg-stone-800 text-stone-500'}`}>{p.status}</span>
                      </div>
                    </div>
                    <div className="p-8">
                      <span className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.4em] block mb-3">{p.category}</span>
                      <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-4 group-hover:text-emerald-400 transition-colors">{p.title}</h3>
                      <div className="flex items-center justify-between border-t border-white/5 pt-6 mt-6">
                        <button onClick={() => setEditingPortfolioId(p.id)} className="text-[10px] font-black text-stone-500 hover:text-white uppercase tracking-widest flex items-center gap-2"><Settings size={14} /> Configure</button>
                        <button onClick={() => toggleDeletePortfolio(p.id, true)} className="text-stone-800 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SERVICES TAB */}
        {activeTab === 'service' && (
          <div className="space-y-12 animate-fade-in">
            <div className="flex justify-between items-end gap-10">
              <div className="space-y-4">
                <h2 className="text-[10px] font-black text-emerald-500 tracking-[0.5em] uppercase">Commercial Tiers</h2>
                <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">Services</h1>
              </div>
              {!editingServiceId && (
                <button 
                  onClick={() => setEditingServiceId('new')} 
                  className="px-10 py-5 bg-emerald-600 text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-sm hover:bg-emerald-500 transition-all flex items-center space-x-3"
                >
                  <Plus size={16} />
                  <span>New Package</span>
                </button>
              )}
            </div>

            {editingServiceId ? (
              <ServiceEditor 
                service={editingServiceId === 'new' ? undefined : services.find(s => s.id === editingServiceId)}
                onSave={(s) => { updateServices(services.some(item => item.id === s.id) ? services.map(item => item.id === s.id ? s : item) : [...services, s]); setEditingServiceId(null); }}
                onCancel={() => setEditingServiceId(null)}
                onDelete={() => { toggleDeleteService(editingServiceId, true); setEditingServiceId(null); }}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {services.filter(s => !s.isDeleted).map(s => (
                  <div key={s.id} className="bg-stone-950 p-10 border border-emerald-900/10 rounded-sm group hover:border-emerald-500/20 transition-all">
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">{s.name}</h3>
                        <p className="text-stone-500 text-xs font-black uppercase tracking-widest">₩{s.price} ({s.priceType})</p>
                      </div>
                      <div className="flex space-x-4">
                        <button onClick={() => setEditingServiceId(s.id)} className="text-stone-700 hover:text-emerald-500 transition-colors"><Settings size={20} /></button>
                        <button onClick={() => toggleDeleteService(s.id, true)} className="text-stone-800 hover:text-red-500 transition-colors"><Trash2 size={20} /></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ABOUT TAB */}
        {activeTab === 'about' && (
          <div className="space-y-16 animate-fade-in max-w-6xl">
            <div className="space-y-4">
              <h2 className="text-[10px] font-black text-emerald-500 tracking-[0.5em] uppercase">Identity</h2>
              <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">About Page</h1>
            </div>
            
            <div className="space-y-20">
              {/* Manifesto Section */}
              <section className="bg-stone-950 p-12 border border-emerald-900/10 rounded-sm shadow-xl">
                <h3 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.5em] border-b border-emerald-900/10 pb-6 mb-10 flex items-center gap-4"><Globe size={16} /> Manifesto Protocol</h3>
                <div className="grid grid-cols-1 gap-10">
                   <div className="space-y-4">
                     <label className="text-[10px] font-black text-stone-600 uppercase tracking-widest">Manifesto Title</label>
                     <input 
                       className="w-full bg-black border border-emerald-900/20 p-6 text-white uppercase font-black text-2xl tracking-tighter outline-none focus:border-emerald-500" 
                       value={aboutContent.manifesto.title} 
                       onChange={e => updateAbout({...aboutContent, manifesto: {...aboutContent.manifesto, title: e.target.value}})} 
                     />
                   </div>
                   <div className="space-y-4">
                     <label className="text-[10px] font-black text-stone-600 uppercase tracking-widest">Vision Statement</label>
                     <textarea 
                       className="w-full bg-black border border-emerald-900/20 p-8 text-stone-400 text-sm leading-relaxed outline-none focus:border-emerald-500 min-h-[150px]" 
                       value={aboutContent.manifesto.description} 
                       onChange={e => updateAbout({...aboutContent, manifesto: {...aboutContent.manifesto, description: e.target.value}})} 
                     />
                   </div>
                </div>
              </section>

              {/* Director Section */}
              <section className="bg-stone-950 p-12 border border-emerald-900/10 rounded-sm shadow-xl">
                <h3 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.5em] border-b border-emerald-900/10 pb-6 mb-10 flex items-center gap-4"><User size={16} /> Director Profile</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                   <div className="space-y-6">
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-stone-600 uppercase tracking-widest">Director Name</label>
                        <input className="w-full bg-black border border-emerald-900/20 p-5 text-white font-black text-xl uppercase outline-none focus:border-emerald-500" value={aboutContent.director.name} onChange={e => updateAbout({...aboutContent, director: {...aboutContent.director, name: e.target.value}})} />
                      </div>
                      <div className="space-y-4">
                        <label className="text-[10px] font-black text-stone-600 uppercase tracking-widest">Role Title</label>
                        <input className="w-full bg-black border border-emerald-900/20 p-5 text-stone-500 font-black uppercase outline-none focus:border-emerald-500" value={aboutContent.director.role} onChange={e => updateAbout({...aboutContent, director: {...aboutContent.director, role: e.target.value}})} />
                      </div>
                   </div>
                   <div className="space-y-4 text-center">
                      <label className="text-[10px] font-black text-stone-600 uppercase tracking-widest block mb-4">Profile Portrait</label>
                      <div className="relative group mx-auto w-48 h-60 overflow-hidden rounded-sm border border-emerald-900/20">
                        <img src={aboutContent.director.image} className="w-full h-full object-cover grayscale opacity-50 transition-all group-hover:grayscale-0 group-hover:opacity-100" />
                        <button 
                          onClick={() => handleFileUpload((img) => updateAbout({...aboutContent, director: {...aboutContent.director, image: img}}))}
                          className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-emerald-500"
                        >
                          <Upload size={24} />
                        </button>
                      </div>
                   </div>
                </div>
              </section>

              {/* Philosophy Section */}
              <section className="bg-stone-950 p-12 border border-emerald-900/10 rounded-sm shadow-xl">
                <div className="flex justify-between items-center mb-10 border-b border-emerald-900/10 pb-6">
                  <h3 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.5em] flex items-center gap-4"><Heart size={16} /> Strategic Philosophy</h3>
                  <button 
                    onClick={() => updateAbout({...aboutContent, philosophy: {...aboutContent.philosophy, items: [...aboutContent.philosophy.items, { title: 'New Principle', description: 'Description...', icon: 'Target' }]}})}
                    className="text-emerald-500 hover:text-white text-[9px] font-black uppercase tracking-widest flex items-center gap-2"
                  >
                    <Plus size={14} /> Add Item
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {aboutContent.philosophy.items.map((item, idx) => (
                    <div key={idx} className="bg-black border border-emerald-900/20 p-8 space-y-6 rounded-sm relative group shadow-lg">
                      <button 
                        onClick={() => updateAbout({...aboutContent, philosophy: {...aboutContent.philosophy, items: aboutContent.philosophy.items.filter((_, i) => i !== idx)}})}
                        className="absolute top-4 right-4 text-stone-800 hover:text-red-500 transition-colors"
                      >
                        <Trash size={14} />
                      </button>
                      <input 
                        className="w-full bg-transparent border-b border-white/5 p-2 text-white font-black uppercase tracking-tighter text-lg focus:border-emerald-500 outline-none" 
                        value={item.title} 
                        onChange={e => {
                          const newItems = [...aboutContent.philosophy.items];
                          newItems[idx].title = e.target.value;
                          updateAbout({...aboutContent, philosophy: {...aboutContent.philosophy, items: newItems}});
                        }}
                      />
                      <textarea 
                        className="w-full bg-transparent p-2 text-stone-500 text-[11px] font-medium leading-relaxed outline-none min-h-[80px]" 
                        value={item.description} 
                        onChange={e => {
                          const newItems = [...aboutContent.philosophy.items];
                          newItems[idx].description = e.target.value;
                          updateAbout({...aboutContent, philosophy: {...aboutContent.philosophy, items: newItems}});
                        }}
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* Equipment Section */}
              <section className="bg-stone-950 p-12 border border-emerald-900/10 rounded-sm shadow-xl">
                 <div className="flex justify-between items-center mb-10 border-b border-emerald-900/10 pb-6">
                  <h3 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.5em] flex items-center gap-4"><Camera size={16} /> Operational Capacity</h3>
                  <button 
                    onClick={() => updateAbout({...aboutContent, equipment: {...aboutContent.equipment, categories: [...aboutContent.equipment.categories, { title: 'New Unit', list: ['Sample Item'] }]}})}
                    className="text-emerald-500 hover:text-white text-[9px] font-black uppercase tracking-widest flex items-center gap-2"
                  >
                    <Plus size={14} /> Add Category
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {aboutContent.equipment.categories.map((cat, catIdx) => (
                    <div key={catIdx} className="bg-black border border-emerald-900/20 p-8 space-y-6 rounded-sm relative shadow-lg">
                      <button 
                        onClick={() => updateAbout({...aboutContent, equipment: {...aboutContent.equipment, categories: aboutContent.equipment.categories.filter((_, i) => i !== catIdx)}})}
                        className="absolute top-4 right-4 text-stone-800 hover:text-red-500 transition-colors"
                      >
                        <Trash size={14} />
                      </button>
                      <input 
                        className="w-full bg-transparent border-b border-white/10 p-2 text-emerald-400 font-black uppercase tracking-widest text-xs outline-none focus:border-emerald-500" 
                        value={cat.title} 
                        onChange={e => {
                          const newCats = [...aboutContent.equipment.categories];
                          newCats[catIdx].title = e.target.value;
                          updateAbout({...aboutContent, equipment: {...aboutContent.equipment, categories: newCats}});
                        }}
                      />
                      <div className="space-y-2">
                        {cat.list.map((item, itemIdx) => (
                          <div key={itemIdx} className="flex items-center space-x-2">
                            <input 
                              className="flex-grow bg-stone-900/30 border border-white/5 p-2 text-stone-500 text-[10px] font-black uppercase outline-none focus:text-white"
                              value={item}
                              onChange={e => {
                                const newCats = [...aboutContent.equipment.categories];
                                newCats[catIdx].list[itemIdx] = e.target.value;
                                updateAbout({...aboutContent, equipment: {...aboutContent.equipment, categories: newCats}});
                              }}
                            />
                            <button 
                              onClick={() => {
                                const newCats = [...aboutContent.equipment.categories];
                                newCats[catIdx].list = newCats[catIdx].list.filter((_, i) => i !== itemIdx);
                                updateAbout({...aboutContent, equipment: {...aboutContent.equipment, categories: newCats}});
                              }}
                              className="text-stone-800 hover:text-red-500"
                            >
                              <X size={12} />
                            </button>
                          </div>
                        ))}
                        <button 
                          onClick={() => {
                            const newCats = [...aboutContent.equipment.categories];
                            newCats[catIdx].list.push('New Asset');
                            updateAbout({...aboutContent, equipment: {...aboutContent.equipment, categories: newCats}});
                          }}
                          className="w-full py-2 border border-dashed border-emerald-900/30 text-[8px] font-black text-emerald-900 uppercase tracking-widest hover:border-emerald-500 hover:text-emerald-500 mt-4"
                        >
                          Add Asset
                        </button>
                      </div>
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
              <h2 className="text-[10px] font-black text-emerald-500 tracking-[0.5em] uppercase">Global Protocol</h2>
              <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">Site Settings</h1>
            </div>
            
            <div className="bg-stone-950 p-12 border border-emerald-900/10 space-y-16 rounded-sm shadow-xl">
              <section className="space-y-8">
                <h3 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.5em] border-b border-emerald-900/10 pb-6 flex items-center gap-4"><Phone size={16} /> Contact Protocol</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Phone Line</label>
                    <input className="w-full bg-black border border-emerald-900/20 p-5 text-white font-black outline-none focus:border-emerald-500" value={siteSettings.contact.phone} onChange={e => updateSettings({...siteSettings, contact: {...siteSettings.contact, phone: e.target.value}})} />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">HQ Inbox (Email)</label>
                    <input className="w-full bg-black border border-emerald-900/20 p-5 text-white font-black outline-none focus:border-emerald-500" value={siteSettings.contact.email} onChange={e => updateSettings({...siteSettings, contact: {...siteSettings.contact, email: e.target.value}})} />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Physical HQ Address</label>
                  <input className="w-full bg-black border border-emerald-900/20 p-5 text-white font-black outline-none focus:border-emerald-500" value={siteSettings.contact.address} onChange={e => updateSettings({...siteSettings, contact: {...siteSettings.contact, address: e.target.value}})} />
                </div>
              </section>

              <section className="space-y-8">
                <h3 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.5em] border-b border-emerald-900/10 pb-6 flex items-center gap-4"><Instagram size={16} /> Digital Presence</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">Instagram URL</label>
                    <input className="w-full bg-black border border-emerald-900/20 p-5 text-white font-black outline-none focus:border-emerald-500" value={siteSettings.social.instagram} onChange={e => updateSettings({...siteSettings, social: {...siteSettings.social, instagram: e.target.value}})} />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">YouTube URL</label>
                    <input className="w-full bg-black border border-emerald-900/20 p-5 text-white font-black outline-none focus:border-emerald-500" value={siteSettings.social.youtube} onChange={e => updateSettings({...siteSettings, social: {...siteSettings.social, youtube: e.target.value}})} />
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}

        {/* INQUIRY TAB */}
        {activeTab === 'inquiry' && (
          <div className="space-y-16 animate-fade-in">
            <div className="space-y-4">
              <h2 className="text-[10px] font-black text-emerald-500 tracking-[0.5em] uppercase">Communication</h2>
              <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">Inquiries</h1>
            </div>
            <div className="space-y-8">
              {inquiries.filter(i => !i.isDeleted).map(inq => (
                <div key={inq.id} className="bg-stone-950 p-12 border border-emerald-900/10 rounded-sm relative group hover:border-emerald-500/30 transition-all shadow-xl">
                  <div className="flex justify-between items-start mb-10 gap-10">
                    <div className="space-y-3">
                      <h3 className="text-3xl font-black text-white uppercase tracking-tighter">{inq.name}</h3>
                      <div className="flex items-center space-x-6">
                        <p className="text-[11px] text-emerald-500 font-black uppercase tracking-widest">{inq.contact}</p>
                        <span className="text-stone-800">•</span>
                        <p className="text-[11px] text-stone-600 font-black uppercase tracking-widest">{new Date(inq.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                       <select 
                        className="bg-black border border-emerald-900/20 text-[10px] font-black text-emerald-500 px-8 py-4 uppercase tracking-widest outline-none rounded-sm" 
                        value={inq.status} 
                        onChange={e => updateInquiry(inq.id, e.target.value as any)}
                      >
                        <option value="new">NEW</option>
                        <option value="processing">PROCESSING</option>
                        <option value="completed">COMPLETED</option>
                        <option value="hold">ON HOLD</option>
                      </select>
                      <button onClick={() => toggleDeleteInquiry(inq.id, true)} className="text-stone-800 hover:text-red-500 transition-colors"><Trash2 size={24} /></button>
                    </div>
                  </div>
                  <div className="bg-black/50 p-10 border border-white/5 rounded-sm">
                    <p className="text-stone-400 text-sm leading-relaxed whitespace-pre-wrap">{inq.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TRASH TAB */}
        {activeTab === 'trash' && (
          <div className="space-y-16 animate-fade-in max-w-7xl">
            <div className="space-y-4">
              <h2 className="text-[10px] font-black text-red-500 tracking-[0.5em] uppercase">Disposal Hub</h2>
              <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">Trash Bin</h1>
              <p className="text-stone-500 text-xs font-black uppercase tracking-widest flex items-center gap-2"><AlertTriangle size={14} className="text-amber-500" /> Items here are hidden from the public site.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               <div className="space-y-8">
                  <h3 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.4em] border-b border-white/5 pb-4 flex items-center gap-3"><Briefcase size={16} /> Portfolios</h3>
                  <div className="space-y-4">
                    {deletedPortfolios.map(p => (
                      <div key={p.id} className="bg-stone-900/40 p-6 border border-red-900/20 flex items-center justify-between rounded-sm">
                        <div className="flex items-center space-x-4">
                           <img src={p.mediaGallery.find(m => m.isHero)?.url} className="w-16 h-10 object-cover grayscale opacity-50 rounded-sm" />
                           <h5 className="text-sm font-black text-white uppercase tracking-tight">{p.title}</h5>
                        </div>
                        <div className="flex space-x-2">
                          <button onClick={() => toggleDeletePortfolio(p.id, false)} className="p-2 text-emerald-500 hover:bg-emerald-500/10 rounded-sm transition-colors"><RotateCcw size={16} /></button>
                          <button onClick={() => { if(window.confirm('Permanent delete?')) permanentDeletePortfolio(p.id); }} className="p-2 text-red-500 hover:bg-red-500/10 rounded-sm transition-colors"><Trash2 size={16} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
               <div className="space-y-8">
                  <h3 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.4em] border-b border-white/5 pb-4 flex items-center gap-3"><Wrench size={16} /> Services</h3>
                  <div className="space-y-4">
                    {deletedServices.map(s => (
                      <div key={s.id} className="bg-stone-900/40 p-6 border border-red-900/20 flex items-center justify-between rounded-sm">
                        <h5 className="text-sm font-black text-white uppercase tracking-tight">{s.name}</h5>
                        <div className="flex space-x-2">
                          <button onClick={() => toggleDeleteService(s.id, false)} className="p-2 text-emerald-500 hover:bg-emerald-500/10 rounded-sm transition-colors"><RotateCcw size={16} /></button>
                          <button onClick={() => { if(window.confirm('Permanent delete?')) permanentDeleteService(s.id); }} className="p-2 text-red-500 hover:bg-red-500/10 rounded-sm transition-colors"><Trash2 size={16} /></button>
                        </div>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

// --- SUB-EDITORS ---

const ServiceEditor: React.FC<{
  service?: ServicePackage;
  onSave: (s: ServicePackage) => void;
  onCancel: () => void;
  onDelete: () => void;
}> = ({ service, onSave, onCancel, onDelete }) => {
  const [data, setData] = useState<ServicePackage>(service || {
    id: Date.now().toString(),
    name: 'New Package',
    description: 'Tier specifications...',
    price: '0',
    priceType: 'range',
    inclusions: [],
    options: [],
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=800',
    isDeleted: false
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
    <div className="bg-stone-950 border border-emerald-900/10 p-16 rounded-sm space-y-12 animate-fade-in max-w-7xl mx-auto shadow-2xl">
      <div className="flex justify-between items-center border-b border-emerald-900/10 pb-10">
        <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic">{service ? 'Edit Package' : 'New Strategic Tier'}</h2>
        <div className="flex items-center space-x-8">
          {service && <button onClick={onDelete} className="text-red-500/40 hover:text-red-500 text-[10px] font-black uppercase tracking-widest border border-red-500/20 px-8 py-4">Move to Trash</button>}
          <button onClick={onCancel} className="text-stone-700 hover:text-white text-[10px] font-black uppercase tracking-widest">Abort</button>
          <button onClick={() => onSave(data)} className="bg-emerald-600 text-white font-black text-[10px] uppercase tracking-widest px-12 py-5 rounded-sm flex items-center gap-3"><Save size={16} /> Deploy Service</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        <div className="space-y-10">
          <div className="space-y-4">
            <label className="text-[10px] font-black text-stone-600 uppercase tracking-widest">Package Designation (Name)</label>
            <input className="w-full bg-black border border-emerald-900/20 p-5 text-white uppercase font-black text-2xl tracking-tighter focus:border-emerald-500 outline-none rounded-sm" value={data.name} onChange={e => setData({...data, name: e.target.value})} />
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-stone-600 uppercase tracking-widest">Unit Price</label>
              <input className="w-full bg-black border border-emerald-900/20 p-5 text-white text-xl font-black outline-none focus:border-emerald-500" value={data.price} onChange={e => setData({...data, price: e.target.value})} />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black text-stone-600 uppercase tracking-widest">Strategy</label>
              <select className="w-full bg-black border border-emerald-900/20 p-5 text-[10px] font-black uppercase tracking-widest outline-none" value={data.priceType} onChange={e => setData({...data, priceType: e.target.value as any})}>
                <option value="fixed">Fixed</option><option value="range">Range</option><option value="hidden">Consult</option>
              </select>
            </div>
          </div>
          <div className="space-y-4">
            <label className="text-[10px] font-black text-stone-600 uppercase tracking-widest">Service Image</label>
            <div className="flex items-center gap-8">
               <img src={data.image} className="w-32 h-20 object-cover border border-white/5 shadow-xl" />
               <button 
                onClick={() => handleFileUpload((img) => setData({...data, image: img}))}
                className="px-6 py-3 bg-white/5 text-stone-400 text-[9px] font-black uppercase tracking-widest hover:text-white transition-all border border-white/10"
               >
                 <Upload size={14} className="inline mr-2" /> Local Upload
               </button>
            </div>
          </div>
        </div>

        <div className="space-y-10">
          {/* Options Editor */}
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black text-stone-600 uppercase tracking-widest">Tactical Options</label>
              <button onClick={() => setData({...data, options: [...data.options, { name: 'New Option', price: '0' }]})} className="text-emerald-500 text-[9px] font-black uppercase tracking-widest"><Plus size={12} className="inline mr-1" /> Add Option</button>
            </div>
            <div className="space-y-4">
              {data.options.map((opt, idx) => (
                <div key={idx} className="flex gap-4 items-center bg-black/40 p-4 border border-emerald-900/10 rounded-sm shadow-inner">
                  <input className="flex-grow bg-transparent border-b border-emerald-900/20 p-2 text-[10px] font-black text-white uppercase outline-none" placeholder="Option Name" value={opt.name} onChange={e => {
                    const newOps = [...data.options];
                    newOps[idx].name = e.target.value;
                    setData({...data, options: newOps});
                  }} />
                  <input className="w-24 bg-transparent border-b border-emerald-900/20 p-2 text-[10px] font-black text-emerald-500 uppercase outline-none" placeholder="Price" value={opt.price} onChange={e => {
                    const newOps = [...data.options];
                    newOps[idx].price = e.target.value;
                    setData({...data, options: newOps});
                  }} />
                  <button onClick={() => setData({...data, options: data.options.filter((_, i) => i !== idx)})} className="text-stone-800 hover:text-red-500"><X size={14} /></button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 border-t border-emerald-900/10 pt-8">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black text-stone-600 uppercase tracking-widest">Tier Inclusions</label>
              <button onClick={() => setData({...data, inclusions: [...data.inclusions, 'New Inclusion']})} className="text-emerald-500 text-[9px] font-black uppercase tracking-widest"><Plus size={12} className="inline mr-1" /> Add Inclusion</button>
            </div>
            <div className="flex flex-wrap gap-3">
              {data.inclusions.map((inc, idx) => (
                <div key={idx} className="flex items-center space-x-2 bg-stone-900 border border-white/5 px-4 py-2 rounded-sm group">
                  <input className="bg-transparent border-none text-[9px] font-black text-stone-400 uppercase tracking-widest outline-none focus:text-white" value={inc} onChange={e => {
                    const newInc = [...data.inclusions];
                    newInc[idx] = e.target.value;
                    setData({...data, inclusions: newInc});
                  }} />
                  <button onClick={() => setData({...data, inclusions: data.inclusions.filter((_, i) => i !== idx)})} className="text-stone-700 hover:text-red-500"><X size={12} /></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PortfolioEditor: React.FC<{
  portfolio?: Portfolio;
  onSave: (p: Portfolio) => void;
  onCancel: () => void;
  onDelete: () => void;
}> = ({ portfolio, onSave, onCancel, onDelete }) => {
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
    date: new Date().toISOString().split('T')[0],
    scope: [],
    overview: '',
    problem: '',
    solution: '',
    results: '',
    mediaGallery: [],
    videoLinks: []
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData(prev => ({
          ...prev,
          mediaGallery: [...prev.mediaGallery, { id: Date.now().toString() + Math.random(), url: reader.result as string, type: 'image', isHero: prev.mediaGallery.length === 0, order: prev.mediaGallery.length }]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="bg-stone-950 border border-emerald-900/10 p-16 rounded-sm space-y-16 animate-fade-in max-w-7xl mx-auto shadow-2xl">
      <div className="flex justify-between items-center border-b border-emerald-900/10 pb-10">
        <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic">{portfolio ? 'Edit Mission' : 'Establish New Mission'}</h2>
        <div className="flex items-center space-x-8">
          {portfolio && <button onClick={onDelete} className="text-red-500/40 hover:text-red-500 text-[10px] font-black uppercase tracking-widest border border-red-500/20 px-8 py-4">Move to Trash</button>}
          <button onClick={onCancel} className="text-stone-700 hover:text-white text-[10px] font-black uppercase tracking-widest">Abort</button>
          <button onClick={() => onSave(data)} className="bg-emerald-600 text-white font-black text-[10px] uppercase tracking-widest px-12 py-5 rounded-sm flex items-center gap-3"><Save size={16} /> Deploy Mission</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div className="space-y-12">
          <div className="space-y-4">
            <label className="text-[10px] font-black text-stone-600 uppercase tracking-widest">Directive Title</label>
            <input className="w-full bg-black border border-emerald-900/20 p-5 text-white uppercase font-black text-2xl tracking-tighter outline-none focus:border-emerald-500" value={data.title} onChange={e => setData({...data, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} />
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black text-stone-600 uppercase tracking-widest">Sector (Category)</label>
              <select className="w-full bg-black border border-emerald-900/20 p-5 text-[10px] font-black uppercase tracking-widest outline-none focus:border-emerald-500" value={data.category} onChange={e => setData({...data, category: e.target.value})}>
                <option>기업홍보</option><option>행사스케치</option><option>브랜드필름</option><option>인터뷰</option><option>공연/중계</option><option>교회</option>
              </select>
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black text-stone-600 uppercase tracking-widest">Status</label>
              <select className="w-full bg-black border border-emerald-900/20 p-5 text-[10px] font-black uppercase tracking-widest outline-none" value={data.status} onChange={e => setData({...data, status: e.target.value as any})}>
                <option value="draft">Draft</option><option value="published">Published</option>
              </select>
            </div>
          </div>
          <div className="space-y-4">
            <label className="text-[10px] font-black text-stone-600 uppercase tracking-widest">Catchphrase (One-liner)</label>
            <input className="w-full bg-black border border-emerald-900/20 p-5 text-stone-300 italic focus:border-emerald-500 outline-none" value={data.oneLiner} onChange={e => setData({...data, oneLiner: e.target.value})} />
          </div>
          <div className="space-y-4">
            <label className="text-[10px] font-black text-stone-600 uppercase tracking-widest">Tactical Briefing (Overview)</label>
            <textarea className="w-full bg-black border border-emerald-900/20 p-6 text-stone-400 text-sm leading-relaxed min-h-[140px] focus:border-emerald-500 outline-none" value={data.overview} onChange={e => setData({...data, overview: e.target.value})} />
          </div>
        </div>

        <div className="space-y-12">
           <div className="flex justify-between items-end mb-10 border-b border-emerald-900/10 pb-4">
              <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.5em] flex items-center gap-2"><ImageIcon size={14} /> Intelligence Assets</h4>
              <button onClick={() => fileInputRef.current?.click()} className="text-[9px] font-black uppercase bg-emerald-900/30 text-emerald-500 px-6 py-2 border border-emerald-900/20 hover:bg-emerald-500 hover:text-white transition-all"><Upload size={14} className="inline mr-2" /> PC Upload</button>
              <input type="file" ref={fileInputRef} className="hidden" multiple accept="image/*" onChange={handleFileUpload} />
           </div>
           <div className="grid grid-cols-3 md:grid-cols-4 gap-4">
             {data.mediaGallery.map(m => (
               <div key={m.id} className="aspect-video relative group bg-black border border-white/5 rounded-sm overflow-hidden shadow-2xl">
                 <img src={m.url} className="w-full h-full object-cover opacity-40 group-hover:opacity-100 transition-all" />
                 <button onClick={() => setData({...data, mediaGallery: data.mediaGallery.filter(item => item.id !== m.id)})} className="absolute top-2 right-2 text-stone-800 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"><X size={14} /></button>
                 {m.isHero ? (
                    <div className="absolute top-2 left-2"><Star size={10} className="text-emerald-500 fill-emerald-500 shadow-xl" /></div>
                 ) : (
                    <button onClick={() => setData({...data, mediaGallery: data.mediaGallery.map(img => ({...img, isHero: img.id === m.id}))})} className="absolute bottom-2 left-2 text-[7px] font-black text-white uppercase opacity-0 group-hover:opacity-100 bg-black/60 px-2 py-1 rounded-sm">Set Hero</button>
                 )}
               </div>
             ))}
           </div>
           
           <div className="space-y-6 pt-10 border-t border-emerald-900/10">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.5em] flex items-center gap-2"><Youtube size={14} /> Video Intelligence</h4>
                <button 
                  onClick={() => setData({...data, videoLinks: [...data.videoLinks, { platform: 'Youtube', url: '', title: 'Mission Video' }]})}
                  className="text-stone-500 text-[9px] font-black uppercase hover:text-white transition-colors"
                >
                  <Plus size={12} className="inline mr-1" /> Add Link
                </button>
              </div>
              <div className="space-y-4">
                {data.videoLinks.map((vid, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-black/40 p-4 border border-white/5 rounded-sm shadow-inner">
                    <input className="flex-grow bg-transparent border-b border-emerald-900/20 p-2 text-[10px] font-black text-white uppercase outline-none" placeholder="Video Title" value={vid.title} onChange={e => {
                      const v = [...data.videoLinks]; v[idx].title = e.target.value; setData({...data, videoLinks: v});
                    }} />
                    <input className="w-1/2 bg-transparent border-b border-emerald-900/20 p-2 text-[10px] font-black text-stone-500 outline-none" placeholder="URL" value={vid.url} onChange={e => {
                      const v = [...data.videoLinks]; v[idx].url = e.target.value; setData({...data, videoLinks: v});
                    }} />
                    <button onClick={() => setData({...data, videoLinks: data.videoLinks.filter((_, i) => i !== idx)})} className="text-stone-800 hover:text-red-500"><Trash size={14} /></button>
                  </div>
                ))}
              </div>
           </div>

           <div className="space-y-6 pt-10 border-t border-emerald-900/10 grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-stone-600 uppercase tracking-widest">Client Designation</label>
                <input className="w-full bg-black border border-emerald-900/20 p-4 text-xs text-white outline-none focus:border-emerald-500" value={data.clientName} onChange={e => setData({...data, clientName: e.target.value})} />
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black text-stone-600 uppercase tracking-widest">Operational Date</label>
                <input className="w-full bg-black border border-emerald-900/20 p-4 text-xs text-white outline-none focus:border-emerald-500" type="month" value={data.date} onChange={e => setData({...data, date: e.target.value})} />
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
