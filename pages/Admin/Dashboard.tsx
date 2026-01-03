
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSiteStore } from '../../store';
import { 
  LayoutDashboard, Briefcase, Settings, MessageSquare, Layers, LogOut, 
  Plus, Trash2, Home, Save, Image as ImageIcon, User, Wrench, 
  Upload, Star, Trash, Globe, Youtube, Phone, Mail, MapPin, 
  Instagram, Heart, Target, Zap, Camera, X, RotateCcw, AlertTriangle
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

  // Filtered lists for rendering
  const deletedPortfolios = portfolios.filter(p => p.isDeleted);
  const deletedServices = services.filter(s => s.isDeleted);
  const deletedInquiries = inquiries.filter(i => i.isDeleted);
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

  const menuItems = [
    { id: 'dash', label: '대시보드', icon: LayoutDashboard },
    { id: 'home', label: '홈 에디터', icon: Layers },
    { id: 'portfolio', label: '포트폴리오', icon: Briefcase },
    { id: 'service', label: '서비스 관리', icon: Wrench },
    { id: 'about', label: '소개 페이지', icon: User },
    { id: 'inquiry', label: '문의 내역', icon: MessageSquare },
    { id: 'settings', label: '사이트 설정', icon: Settings },
    { id: 'trash', label: '휴지통', icon: Trash2 },
  ];

  return (
    <div className="min-h-screen bg-[#050606] text-stone-300 flex font-sans">
      {/* Sidebar */}
      <aside className="w-72 border-r border-emerald-900/10 bg-black flex flex-col sticky top-0 h-screen z-20">
        <div className="p-10 border-b border-emerald-900/10 text-center">
          <span className="text-[9px] tracking-[0.6em] text-emerald-500 uppercase font-black">Intelligence</span>
          <h2 className="text-white font-black tracking-tighter uppercase text-2xl italic leading-none">Taskforce</h2>
        </div>
        
        <nav className="flex-grow px-6 py-8 space-y-2 overflow-y-auto">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id as any); setEditingPortfolioId(null); setEditingServiceId(null); }}
              className={`w-full flex items-center space-x-5 px-6 py-5 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] transition-all ${
                activeTab === item.id ? 'bg-emerald-600 text-white shadow-xl' : 'text-stone-600 hover:text-white hover:bg-white/5'
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
            <span>관리자 로그아웃</span>
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
              <div className="bg-stone-950 border border-emerald-900/10 p-10 rounded-sm">
                <Briefcase className="text-emerald-900 mb-6" size={32} />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-600 mb-2">포트폴리오</p>
                <p className="text-6xl font-black text-white">{portfolios.filter(p => !p.isDeleted).length}</p>
              </div>
              <div className="bg-stone-950 border border-emerald-900/10 p-10 rounded-sm">
                <MessageSquare className="text-emerald-900 mb-6" size={32} />
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-600 mb-2">새 문의사항</p>
                <p className="text-6xl font-black text-emerald-400">{inquiries.filter(i => i.status === 'new' && !i.isDeleted).length}</p>
              </div>
            </div>
          </div>
        )}

        {/* HOME EDITOR */}
        {activeTab === 'home' && (
          <div className="space-y-16 animate-fade-in max-w-5xl">
            <div className="space-y-4">
              <h2 className="text-[10px] font-black text-emerald-500 tracking-[0.5em] uppercase">Visual Hub</h2>
              <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">Home Config</h1>
            </div>
            <div className="bg-stone-950 p-12 border border-emerald-900/10 space-y-12 rounded-sm shadow-xl">
              <section className="space-y-10">
                <h3 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.5em] border-b border-emerald-900/10 pb-6 flex items-center gap-4"><Layers size={16} /> Hero 섹션</h3>
                <div className="space-y-8">
                  <div className="space-y-4">
                    <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">메인 헤드라인</label>
                    <input className="w-full bg-black border border-emerald-900/20 p-5 text-white font-black text-xl outline-none" value={homeContent.hero.headline} onChange={e => updateHome({...homeContent, hero: {...homeContent.hero, headline: e.target.value}})} />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">배너 이미지 업로드</label>
                    <div className="flex items-center gap-8">
                       <img src={homeContent.hero.bannerImage} className="w-40 h-24 object-cover border border-white/10 grayscale opacity-50" />
                       <button onClick={() => handleFileUpload((img) => updateHome({...homeContent, hero: {...homeContent.hero, bannerImage: img}}))} className="px-8 py-4 bg-emerald-900/20 text-emerald-500 border border-emerald-500/20 text-[10px] font-black uppercase hover:bg-emerald-500 hover:text-white transition-all flex items-center gap-3">
                         <Upload size={14} /> 이미지 선택
                       </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}

        {/* ABOUT EDITOR */}
        {activeTab === 'about' && (
          <div className="space-y-16 animate-fade-in max-w-6xl">
            <div className="space-y-4">
              <h2 className="text-[10px] font-black text-emerald-500 tracking-[0.5em] uppercase">Identity</h2>
              <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">About Page</h1>
            </div>
            <div className="space-y-12">
              <section className="bg-stone-950 p-12 border border-emerald-900/10 rounded-sm shadow-xl space-y-10">
                <h3 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.5em] border-b border-emerald-900/10 pb-6 flex items-center gap-4"><Globe size={16} /> 매니페스토 수정</h3>
                <input className="w-full bg-black border border-emerald-900/20 p-6 text-white uppercase font-black text-2xl tracking-tighter outline-none focus:border-emerald-500" value={aboutContent.manifesto.title} onChange={e => updateAbout({...aboutContent, manifesto: {...aboutContent.manifesto, title: e.target.value}})} />
                <textarea className="w-full bg-black border border-emerald-900/20 p-8 text-stone-400 text-sm leading-relaxed outline-none min-h-[150px] focus:border-emerald-500" value={aboutContent.manifesto.description} onChange={e => updateAbout({...aboutContent, manifesto: {...aboutContent.manifesto, description: e.target.value}})} />
              </section>

              <section className="bg-stone-950 p-12 border border-emerald-900/10 rounded-sm shadow-xl space-y-10">
                <h3 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.5em] border-b border-emerald-900/10 pb-6 flex items-center gap-4"><User size={16} /> 감독 프로필</h3>
                <div className="flex items-center gap-12">
                   <div className="relative group w-48 h-60 overflow-hidden border border-white/10">
                      <img src={aboutContent.director.image} className="w-full h-full object-cover grayscale opacity-50 transition-all group-hover:grayscale-0 group-hover:opacity-100" />
                      <button onClick={() => handleFileUpload((img) => updateAbout({...aboutContent, director: {...aboutContent.director, image: img}}))} className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-emerald-500 uppercase text-[10px] font-black">프로필 변경</button>
                   </div>
                   <div className="flex-grow space-y-6">
                      <input className="w-full bg-black border border-emerald-900/20 p-5 text-white font-black text-xl uppercase outline-none" placeholder="이름" value={aboutContent.director.name} onChange={e => updateAbout({...aboutContent, director: {...aboutContent.director, name: e.target.value}})} />
                      <input className="w-full bg-black border border-emerald-900/20 p-5 text-stone-500 font-black uppercase outline-none" placeholder="직책" value={aboutContent.director.role} onChange={e => updateAbout({...aboutContent, director: {...aboutContent.director, role: e.target.value}})} />
                   </div>
                </div>
              </section>
            </div>
          </div>
        )}

        {/* SETTINGS EDITOR */}
        {activeTab === 'settings' && (
          <div className="space-y-16 animate-fade-in max-w-4xl">
            <div className="space-y-4">
              <h2 className="text-[10px] font-black text-emerald-500 tracking-[0.5em] uppercase">Global Variables</h2>
              <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">Site Settings</h1>
            </div>
            <div className="bg-stone-950 p-12 border border-emerald-900/10 space-y-16 rounded-sm shadow-xl">
              <section className="space-y-8">
                <h3 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.5em] border-b border-emerald-900/10 pb-6 flex items-center gap-4"><Phone size={16} /> 연락처 및 푸터 세팅</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">전화번호</label>
                    <input className="w-full bg-black border border-emerald-900/20 p-5 text-white font-black outline-none" value={siteSettings.contact.phone} onChange={e => updateSettings({...siteSettings, contact: {...siteSettings.contact, phone: e.target.value}})} />
                  </div>
                  <div className="space-y-4">
                    <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">이메일</label>
                    <input className="w-full bg-black border border-emerald-900/20 p-5 text-white font-black outline-none" value={siteSettings.contact.email} onChange={e => updateSettings({...siteSettings, contact: {...siteSettings.contact, email: e.target.value}})} />
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[9px] font-black text-stone-600 uppercase tracking-widest">주소</label>
                  <input className="w-full bg-black border border-emerald-900/20 p-5 text-white font-black outline-none" value={siteSettings.contact.address} onChange={e => updateSettings({...siteSettings, contact: {...siteSettings.contact, address: e.target.value}})} />
                </div>
              </section>
              <section className="space-y-8">
                <h3 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.5em] border-b border-emerald-900/10 pb-6 flex items-center gap-4"><Instagram size={16} /> 소셜 채널 링크</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <input className="w-full bg-black border border-emerald-900/20 p-5 text-white outline-none" placeholder="Instagram URL" value={siteSettings.social.instagram} onChange={e => updateSettings({...siteSettings, social: {...siteSettings.social, instagram: e.target.value}})} />
                  <input className="w-full bg-black border border-emerald-900/20 p-5 text-white outline-none" placeholder="YouTube URL" value={siteSettings.social.youtube} onChange={e => updateSettings({...siteSettings, social: {...siteSettings.social, youtube: e.target.value}})} />
                </div>
              </section>
            </div>
          </div>
        )}

        {/* PORTFOLIO CRUD */}
        {activeTab === 'portfolio' && (
          <div className="space-y-12 animate-fade-in">
            <div className="flex justify-between items-end gap-10">
              <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">Portfolio</h1>
              {!editingPortfolioId && <button onClick={() => setEditingPortfolioId('new')} className="px-10 py-5 bg-emerald-600 text-white font-black text-[10px] uppercase tracking-widest rounded-sm">새 미션 추가</button>}
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
                  <div key={p.id} className="bg-stone-950 border border-emerald-900/10 p-4 rounded-sm hover:border-emerald-500 transition-all">
                    <img src={p.mediaGallery.find(m => m.isHero)?.url} className="w-full aspect-video object-cover mb-4" />
                    <h3 className="text-white font-black uppercase text-sm mb-4">{p.title}</h3>
                    <div className="flex justify-between">
                      <button onClick={() => setEditingPortfolioId(p.id)} className="text-[10px] text-emerald-500 uppercase font-black">편집</button>
                      <button onClick={() => toggleDeletePortfolio(p.id, true)} className="text-[10px] text-red-800 uppercase font-black">삭제</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* SERVICE CRUD */}
        {activeTab === 'service' && (
          <div className="space-y-12 animate-fade-in">
             <div className="flex justify-between items-end gap-10">
              <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">Services</h1>
              {!editingServiceId && <button onClick={() => setEditingServiceId('new')} className="px-10 py-5 bg-emerald-600 text-white font-black text-[10px] uppercase tracking-widest rounded-sm">새 패키지</button>}
            </div>
            {editingServiceId ? (
              <ServiceEditor 
                service={editingServiceId === 'new' ? undefined : services.find(s => s.id === editingServiceId)}
                onSave={(s) => { updateServices(services.some(item => item.id === s.id) ? services.map(item => item.id === s.id ? s : item) : [...services, s]); setEditingServiceId(null); }}
                onCancel={() => setEditingServiceId(null)}
              />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {services.filter(s => !s.isDeleted).map(s => (
                  <div key={s.id} className="bg-stone-950 p-10 border border-emerald-900/10 rounded-sm">
                    <h3 className="text-2xl font-black text-white uppercase">{s.name}</h3>
                    <div className="mt-4">
                      <button onClick={() => setEditingServiceId(s.id)} className="text-[10px] text-emerald-500 uppercase font-black">편집</button>
                      <button onClick={() => toggleDeleteService(s.id, true)} className="text-[10px] text-red-800 uppercase font-black ml-4">삭제</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TRASH BIN */}
        {activeTab === 'trash' && (
          <div className="space-y-16 animate-fade-in max-w-7xl">
            <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none">Trash Bin</h1>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
               <div className="space-y-8">
                  <h3 className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.4em] border-b border-white/5 pb-4">삭제된 포트폴리오 ({deletedPortfolios.length})</h3>
                  {deletedPortfolios.map(p => (
                    <div key={p.id} className="bg-stone-900 p-4 border border-red-900/20 flex justify-between items-center">
                      <span className="text-white text-xs font-black uppercase">{p.title}</span>
                      <div className="flex gap-4">
                        <button onClick={() => toggleDeletePortfolio(p.id, false)} className="text-emerald-500"><RotateCcw size={14} /></button>
                        <button onClick={() => { if(confirm('영구 삭제하시겠습니까?')) permanentDeletePortfolio(p.id); }} className="text-red-500"><Trash size={14} /></button>
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

const PortfolioEditor: React.FC<{ portfolio?: Portfolio, onSave: (p: Portfolio) => void, onCancel: () => void }> = ({ portfolio, onSave, onCancel }) => {
  const [data, setData] = useState<Portfolio>(portfolio || {
    id: Date.now().toString(), title: '', slug: '', status: 'draft', featured: false, category: '기업홍보', tags: [],
    oneLiner: '', summary: '', scope: [], overview: '', problem: '', solution: '', results: '',
    mediaGallery: [], videoLinks: []
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
    <div className="bg-stone-950 border border-emerald-900/10 p-12 rounded-sm space-y-12 shadow-2xl">
      <div className="grid grid-cols-2 gap-10">
        <div className="space-y-6">
          <input className="w-full bg-black border border-emerald-900/20 p-5 text-white uppercase font-black text-xl" placeholder="Directive Title" value={data.title} onChange={e => setData({...data, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} />
          <textarea className="w-full bg-black border border-emerald-900/20 p-5 text-stone-400 text-sm min-h-[140px]" placeholder="Briefing" value={data.overview} onChange={e => setData({...data, overview: e.target.value})} />
        </div>
        <div className="space-y-6">
          <div className="flex justify-between items-center border-b border-emerald-900/10 pb-4">
             <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Intelligence Assets</h4>
             <button onClick={() => handleFileUpload((img) => setData({...data, mediaGallery: [...data.mediaGallery, { id: Date.now().toString(), url: img, type: 'image', isHero: data.mediaGallery.length === 0, order: data.mediaGallery.length }]}))} className="text-[9px] font-black uppercase bg-emerald-900/30 text-emerald-500 px-6 py-2">PC Upload</button>
          </div>
          <div className="grid grid-cols-4 gap-4">
            {data.mediaGallery.map(m => (
              <div key={m.id} className="relative aspect-video bg-black overflow-hidden rounded-sm group">
                <img src={m.url} className="w-full h-full object-cover opacity-50 group-hover:opacity-100" />
                <button onClick={() => setData({...data, mediaGallery: data.mediaGallery.filter(x => x.id !== m.id)})} className="absolute top-1 right-1 text-red-500"><Trash size={12} /></button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-4 pt-10 border-t border-emerald-900/10">
        <button onClick={() => onSave(data)} className="px-12 py-5 bg-emerald-600 text-white font-black uppercase text-[10px] tracking-widest">저장하기</button>
        <button onClick={onCancel} className="px-12 py-5 border border-white/10 text-stone-500 font-black uppercase text-[10px] tracking-widest">취소</button>
      </div>
    </div>
  );
};

const ServiceEditor: React.FC<{ service?: ServicePackage, onSave: (s: ServicePackage) => void, onCancel: () => void }> = ({ service, onSave, onCancel }) => {
  const [data, setData] = useState<ServicePackage>(service || {
    id: Date.now().toString(), name: 'New Package', description: '', price: '0', priceType: 'range', inclusions: [], options: [], image: '', isDeleted: false
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
    <div className="bg-stone-950 border border-emerald-900/10 p-12 rounded-sm space-y-12 shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <input className="w-full bg-black border border-emerald-900/20 p-5 text-white font-black text-xl uppercase" placeholder="Package Name" value={data.name} onChange={e => setData({...data, name: e.target.value})} />
          <div className="flex items-center gap-8">
            <div className="w-32 h-20 border border-white/10 overflow-hidden bg-black">
              {data.image && <img src={data.image} className="w-full h-full object-cover" />}
            </div>
            <button onClick={() => handleFileUpload((img) => setData({...data, image: img}))} className="px-6 py-3 border border-emerald-500/20 text-emerald-500 text-[9px] font-black uppercase">이미지 변경</button>
          </div>
        </div>
        <div className="space-y-6">
           <textarea className="w-full bg-black border border-emerald-900/20 p-5 text-stone-400 text-sm min-h-[120px]" placeholder="Description" value={data.description} onChange={e => setData({...data, description: e.target.value})} />
        </div>
      </div>
      <div className="flex gap-4 pt-10 border-t border-emerald-900/10">
        <button onClick={() => onSave(data)} className="px-12 py-5 bg-emerald-600 text-white font-black uppercase text-[10px] tracking-widest">저장하기</button>
        <button onClick={onCancel} className="px-12 py-5 border border-white/10 text-stone-500 font-black uppercase text-[10px] tracking-widest">취소</button>
      </div>
    </div>
  );
};
