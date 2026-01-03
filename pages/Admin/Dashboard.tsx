
import React, { useState, useRef } from 'react';
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
import { Portfolio, Inquiry, ServicePackage, AboutContent, HomeContent, SiteSettings } from '../../types.ts';

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

        {/* ... Other tabs follow with similar import updates ... */}
      </main>
    </div>
  );
};

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
      {/* Rest of the component code ... */}
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
        {/* Rest of the component code ... */}
      </div>
    </div>
  );
};
