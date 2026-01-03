
import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowRight } from 'lucide-react';
import { useSiteStore } from '../store.tsx';

export const PortfolioList: React.FC = () => {
  const { portfolios } = useSiteStore();
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  // Exclude deleted portfolios globally for the public view
  const activePortfolios = useMemo(() => portfolios.filter(p => !p.isDeleted), [portfolios]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(activePortfolios.map(p => p.category)));
    return ['All', ...cats];
  }, [activePortfolios]);

  const filtered = activePortfolios.filter(p => {
    if (p.status !== 'published') return false;
    const matchCat = filter === 'All' || p.category === filter;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                       p.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-black min-h-screen py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24">
           <h2 className="text-[10px] font-black text-emerald-500 mb-6 tracking-[0.4em] uppercase">Archive</h2>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase leading-none">Works</h1>
          <p className="text-stone-500 text-lg max-w-2xl font-medium opacity-80 uppercase tracking-tighter">Explore our visual missions and cinematic case studies.</p>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-16 space-y-8 md:space-y-0">
          <div className="flex flex-wrap gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-8 py-3 rounded-sm text-[9px] font-black uppercase tracking-widest transition-all border ${
                  filter === cat 
                    ? 'bg-emerald-600 border-emerald-600 text-white' 
                    : 'bg-transparent border-emerald-900/20 text-stone-600 hover:border-emerald-700/40 hover:text-stone-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-700 group-focus-within:text-emerald-500 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Search Missions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-black border border-emerald-900/20 text-white pl-16 pr-8 py-4 rounded-sm text-[10px] font-black tracking-widest w-full md:w-96 focus:outline-none focus:border-emerald-500 transition-all uppercase"
            />
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {filtered.length > 0 ? filtered.map(item => (
            <Link key={item.id} to={`/portfolio/${item.slug}`} className="group relative">
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-stone-900 mb-8">
                <img 
                  src={item.mediaGallery.find(m => m.isHero)?.url || 'https://picsum.photos/800/600'} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 group-hover:opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-8 left-8 right-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.slice(0, 1).map(tag => (
                      <span key={tag} className="text-[8px] font-black uppercase tracking-[0.3em] bg-emerald-600 text-white px-3 py-1">
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-black text-white leading-tight uppercase tracking-tight">{item.title}</h3>
                </div>
              </div>
              <div className="flex items-center justify-between text-stone-700 group-hover:text-emerald-400 transition-colors px-1">
                <p className="text-[10px] font-black uppercase tracking-[0.3em]">{item.category}</p>
                <ArrowRight size={18} className="translate-x-[-15px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
              </div>
            </Link>
          )) : (
            <div className="col-span-full py-40 text-center text-stone-800 uppercase font-black tracking-widest text-xs border border-emerald-900/10 rounded-sm">
              No Missions Found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
