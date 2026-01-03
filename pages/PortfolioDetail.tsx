
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ChevronLeft, Calendar, User, Tag, ArrowRight, Play } from 'lucide-react';
import { useSiteStore } from '../store';

export const PortfolioDetail: React.FC = () => {
  const { slug } = useParams();
  const { portfolios } = useSiteStore();
  const project = portfolios.find(p => p.slug === slug);

  if (!project) return <Navigate to="/portfolio" />;

  const related = portfolios
    .filter(p => p.category === project.category && p.id !== project.id)
    .slice(0, 3);

  return (
    <div className="bg-stone-950 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] flex items-end px-6 pb-20">
        <div className="absolute inset-0 z-0">
          <img 
            src={project.mediaGallery.find(m => m.isHero)?.url || 'https://picsum.photos/1920/1080'} 
            className="w-full h-full object-cover" 
            alt={project.title} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-stone-950/20"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <Link to="/portfolio" className="inline-flex items-center text-stone-400 hover:text-amber-500 transition-colors mb-8 text-sm font-bold uppercase tracking-widest">
            <ChevronLeft size={16} className="mr-2" /> Back to list
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(t => (
                  <span key={t} className="text-[10px] font-black uppercase tracking-[0.2em] bg-amber-500 text-black px-2 py-0.5 rounded">#{t}</span>
                ))}
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tighter mb-4">{project.title}</h1>
              <p className="text-stone-300 text-xl font-light italic opacity-80">"{project.oneLiner}"</p>
            </div>
            <div className="flex flex-col space-y-4">
              {project.videoLinks.length > 0 && (
                <a 
                  href={project.videoLinks[0].url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-amber-500 transition-all flex items-center justify-center"
                >
                  <Play size={18} fill="currentColor" className="mr-2" /> Watch Video
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <section className="py-24 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-16">
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-8 h-[1px] bg-amber-500 mr-4"></span> Project Overview
              </h2>
              <div className="text-stone-400 leading-relaxed text-lg space-y-6">
                <p>{project.overview}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-lg font-bold text-amber-500 mb-4">Problem</h3>
                <p className="text-stone-400 text-sm leading-relaxed">{project.problem}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-amber-500 mb-4">Solution</h3>
                <p className="text-stone-400 text-sm leading-relaxed">{project.solution}</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="w-8 h-[1px] bg-amber-500 mr-4"></span> The Result
              </h2>
              <p className="text-stone-400 leading-relaxed text-lg italic bg-stone-900/40 p-8 rounded-2xl border-l-4 border-amber-500">
                {project.results}
              </p>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-stone-900/40 rounded-3xl p-8 sticky top-28 border border-white/5">
              <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] mb-8 border-b border-white/5 pb-4">Project Details</h3>
              <ul className="space-y-6">
                {project.clientName && (
                  <li className="flex justify-between items-start">
                    <div className="flex items-center text-stone-500 text-xs font-bold uppercase"><User size={14} className="mr-2" /> Client</div>
                    <div className="text-sm font-bold text-white text-right">{project.clientName}</div>
                  </li>
                )}
                <li className="flex justify-between items-start">
                  <div className="flex items-center text-stone-500 text-xs font-bold uppercase"><Calendar size={14} className="mr-2" /> Date</div>
                  <div className="text-sm font-bold text-white text-right">{project.date}</div>
                </li>
                <li className="flex justify-between items-start">
                  <div className="flex items-center text-stone-500 text-xs font-bold uppercase"><Tag size={14} className="mr-2" /> Industry</div>
                  <div className="text-sm font-bold text-white text-right">{project.industry}</div>
                </li>
                <li>
                  <div className="text-stone-500 text-xs font-bold uppercase mb-4">Scope of Work</div>
                  <div className="flex flex-wrap gap-2">
                    {project.scope.map(s => (
                      <span key={s} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-stone-300">{s}</span>
                    ))}
                  </div>
                </li>
              </ul>
              <div className="mt-12">
                <Link to="/contact" className="w-full block py-4 bg-amber-500 text-black font-black text-center rounded-xl hover:bg-amber-400 transition-all uppercase text-sm tracking-widest">
                  비슷한 영상 문의하기
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-sm font-black text-amber-500 mb-12 tracking-[0.2em] uppercase text-center">Gallery</h2>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {project.mediaGallery.map(media => (
              <div key={media.id} className="overflow-hidden rounded-2xl bg-stone-900 border border-white/5 hover:border-amber-500/20 transition-all">
                <img src={media.url} alt="Gallery item" className="w-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {related.length > 0 && (
        <section className="py-24 px-6 bg-stone-900/20 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-black text-white mb-12 tracking-tighter">Related Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map(item => (
                <Link key={item.id} to={`/portfolio/${item.slug}`} className="group">
                  <div className="aspect-video rounded-2xl overflow-hidden mb-4 bg-stone-900">
                    <img src={item.mediaGallery.find(m => m.isHero)?.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-500 transition-colors">{item.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
