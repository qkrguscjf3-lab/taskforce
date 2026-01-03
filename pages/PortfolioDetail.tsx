
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ChevronLeft, Calendar, User, Tag, Play } from 'lucide-react';
import { useSiteStore } from '../store.tsx';

export const PortfolioDetail: React.FC = () => {
  const { slug } = useParams();
  const { portfolios } = useSiteStore();
  const project = portfolios.find(p => p.slug === slug);

  if (!project) return <Navigate to="/portfolio" />;

  const related = portfolios
    .filter(p => p.category === project.category && p.id !== project.id && !p.isDeleted && p.status === 'published')
    .slice(0, 3);

  const heroImage = project.mediaGallery.find(m => m.isHero)?.url || project.mediaGallery[0]?.url || 'https://picsum.photos/1920/1080';

  return (
    <div className="bg-stone-950 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-end px-6 pb-24">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            className="w-full h-full object-cover brightness-[0.4]" 
            alt={project.title} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <Link to="/portfolio" className="inline-flex items-center text-emerald-500 hover:text-white transition-all mb-10 text-[10px] font-black uppercase tracking-[0.4em]">
            <ChevronLeft size={16} className="mr-2" /> Project Archive
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
            <div className="max-w-4xl">
              <div className="flex flex-wrap gap-4 mb-6">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] bg-emerald-600 text-white px-4 py-1.5 rounded-sm">{project.category}</span>
                {project.tags.map(t => (
                  <span key={t} className="text-[10px] font-black uppercase tracking-[0.3em] text-stone-500 border border-stone-800 px-4 py-1.5 rounded-sm">#{t}</span>
                ))}
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-8 uppercase">{project.title}</h1>
              <p className="text-emerald-500 text-xl md:text-2xl font-black uppercase tracking-tighter opacity-90 italic">
                {project.oneLiner ? `"${project.oneLiner}"` : ""}
              </p>
            </div>
            <div className="flex flex-col">
              {project.videoLinks.length > 0 && (
                <a 
                  href={project.videoLinks[0].url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-12 py-5 bg-emerald-600 text-white font-black uppercase tracking-widest text-xs hover:bg-emerald-500 transition-all flex items-center justify-center group"
                >
                  <Play size={18} fill="currentColor" className="mr-3 group-hover:scale-110 transition-transform" /> Play Mission
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <section className="py-32 px-6 border-b border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-24">
          <div className="lg:col-span-8 space-y-24">
            <div>
              <h2 className="text-[10px] font-black text-emerald-500 mb-10 tracking-[0.4em] uppercase flex items-center gap-4">
                <span className="w-12 h-[1px] bg-emerald-900"></span> Mission Overview
              </h2>
              <div className="text-stone-400 leading-relaxed text-lg md:text-xl font-medium whitespace-pre-wrap">
                {project.overview}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="p-10 bg-stone-900/20 border border-emerald-900/10 rounded-sm">
                <h3 className="text-[10px] font-black text-emerald-500 mb-6 uppercase tracking-[0.3em]">The Problem</h3>
                <p className="text-stone-300 text-sm leading-relaxed whitespace-pre-wrap">{project.problem || "N/A"}</p>
              </div>
              <div className="p-10 bg-stone-900/20 border border-emerald-900/10 rounded-sm">
                <h3 className="text-[10px] font-black text-emerald-500 mb-6 uppercase tracking-[0.3em]">The Solution</h3>
                <p className="text-stone-300 text-sm leading-relaxed whitespace-pre-wrap">{project.solution || "N/A"}</p>
              </div>
            </div>

            <div>
              <h2 className="text-[10px] font-black text-emerald-500 mb-10 tracking-[0.4em] uppercase flex items-center gap-4">
                <span className="w-12 h-[1px] bg-emerald-900"></span> Final Results
              </h2>
              <div className="text-stone-200 leading-relaxed text-lg md:text-xl font-black uppercase tracking-tight p-12 bg-emerald-950/20 border-l-4 border-emerald-500 italic">
                {project.results || "No results documented."}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-stone-950/80 border border-emerald-900/20 rounded-sm p-10 sticky top-32">
              <h3 className="text-[10px] font-black text-white uppercase tracking-[0.4em] mb-12 border-b border-white/5 pb-6">Intelligence Details</h3>
              <ul className="space-y-8">
                {project.clientName && (
                  <li className="flex justify-between items-start">
                    <div className="flex items-center text-stone-600 text-[9px] font-black uppercase tracking-widest"><User size={14} className="mr-3 text-emerald-900" /> Client</div>
                    <div className="text-xs font-black text-white text-right uppercase tracking-tighter">{project.clientName}</div>
                  </li>
                )}
                {project.date && (
                  <li className="flex justify-between items-start">
                    <div className="flex items-center text-stone-600 text-[9px] font-black uppercase tracking-widest"><Calendar size={14} className="mr-3 text-emerald-900" /> Operation Date</div>
                    <div className="text-xs font-black text-white text-right uppercase tracking-tighter">{project.date}</div>
                  </li>
                )}
                {project.industry && (
                  <li className="flex justify-between items-start">
                    <div className="flex items-center text-stone-600 text-[9px] font-black uppercase tracking-widest"><Tag size={14} className="mr-3 text-emerald-900" /> Sector</div>
                    <div className="text-xs font-black text-white text-right uppercase tracking-tighter">{project.industry}</div>
                  </li>
                )}
                <li>
                  <div className="text-[9px] font-black text-stone-600 uppercase tracking-widest mb-6">Mission Scope</div>
                  <div className="flex flex-wrap gap-2">
                    {project.scope.length > 0 ? project.scope.map(s => (
                      <span key={s} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[8px] font-black text-stone-400 uppercase tracking-widest">{s}</span>
                    )) : <span className="text-[8px] text-stone-800 uppercase">None specified</span>}
                  </div>
                </li>
              </ul>
              <div className="mt-16 pt-10 border-t border-white/5">
                <Link to="/contact" className="w-full block py-5 bg-emerald-600 text-white font-black text-center rounded-sm hover:bg-emerald-500 transition-all uppercase text-[10px] tracking-[0.3em]">
                  Start Similar Mission
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-32 px-6 bg-stone-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-[10px] font-black text-emerald-500 mb-6 tracking-[0.6em] uppercase">Visual Assets</h2>
            <p className="text-4xl font-black text-white uppercase tracking-tighter">Mission Gallery</p>
          </div>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {project.mediaGallery.map(media => (
              <div key={media.id} className="group relative overflow-hidden rounded-sm bg-black border border-emerald-900/10">
                <img src={media.url} alt={media.alt || project.title} className="w-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
                {(media.caption || media.alt) && (
                  <div className="absolute inset-x-0 bottom-0 p-6 bg-black/80 backdrop-blur-md translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-1">{media.caption || 'Operational Asset'}</p>
                    <p className="text-xs text-stone-400 italic">"{media.alt || ''}"</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {related.length > 0 && (
        <section className="py-32 px-6 bg-black border-t border-emerald-900/10">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-end mb-16">
               <h2 className="text-4xl font-black text-white uppercase tracking-tighter">Related Missions</h2>
               <Link to="/portfolio" className="text-[10px] font-black text-emerald-500 uppercase tracking-widest border-b border-emerald-900 pb-2">Archive</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {related.map(item => (
                <Link key={item.id} to={`/portfolio/${item.slug}`} className="group block">
                  <div className="aspect-video rounded-sm overflow-hidden mb-6 bg-stone-950 border border-emerald-900/5">
                    <img src={item.mediaGallery.find(m => m.isHero)?.url || item.mediaGallery[0]?.url} alt={item.title} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                  </div>
                  <div className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.3em] mb-2">{item.category}</div>
                  <h3 className="text-lg font-black text-white group-hover:text-emerald-400 transition-colors uppercase tracking-tight leading-none">{item.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
