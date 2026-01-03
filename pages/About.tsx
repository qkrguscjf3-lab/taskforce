
import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Zap, Heart, Camera, Monitor, Settings } from 'lucide-react';
import { useSiteStore } from '../store.tsx';

const IconMap: Record<string, any> = {
  Target,
  Zap,
  Heart
};

export const About: React.FC = () => {
  const { aboutContent } = useSiteStore();
  const { manifesto, director, philosophy, equipment } = aboutContent;

  return (
    <div className="bg-black min-h-screen overflow-hidden">
      {/* Hero Manifesto */}
      <section className="relative pt-40 pb-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <h2 className="text-[10px] font-black text-emerald-500 mb-8 tracking-[0.6em] uppercase">Manifesto</h2>
          <h1 className="text-4xl md:text-7xl font-black text-white max-w-5xl leading-[1.1] tracking-tighter uppercase mb-12">
            {manifesto.title}
          </h1>
          <p className="text-stone-500 text-lg md:text-xl max-w-3xl font-medium leading-relaxed opacity-80 uppercase tracking-tighter whitespace-pre-wrap">
            {manifesto.description}
          </p>
        </div>
      </section>

      {/* Profile & Philosophy */}
      <section className="py-32 px-6 bg-stone-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="aspect-[4/5] rounded-sm overflow-hidden bg-stone-900 relative">
            <img src={director.image} alt={director.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
            <div className="absolute inset-0 bg-emerald-950/10"></div>
            <div className="absolute bottom-10 left-10">
               <span className="text-[8px] font-black text-emerald-500 uppercase tracking-[0.6em] block mb-2">{director.role}</span>
               <h3 className="text-4xl font-black text-white uppercase tracking-tighter italic">{director.name}</h3>
            </div>
          </div>

          <div className="space-y-16">
            <div className="space-y-6">
              <h3 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em]">{philosophy.title}</h3>
              <div className="grid grid-cols-1 gap-12">
                {philosophy.items.map((item, idx) => {
                  const Icon = IconMap[item.icon] || Heart;
                  return (
                    <div key={idx} className="flex space-x-6">
                      <div className="flex-shrink-0 w-12 h-12 border border-emerald-900/30 flex items-center justify-center text-emerald-500">
                        <Icon size={20} />
                      </div>
                      <div>
                        <h4 className="text-xl font-black text-white uppercase tracking-tight mb-3">{item.title}</h4>
                        <p className="text-sm text-stone-500 leading-relaxed font-medium">{item.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment / Specs */}
      <section className="py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-xl">
              <h2 className="text-[10px] font-black text-emerald-500 mb-6 tracking-[0.4em] uppercase">Intelligence</h2>
              <h3 className="text-5xl font-black text-white tracking-tighter uppercase leading-none">{equipment.title}</h3>
            </div>
            <p className="text-stone-500 text-sm font-black uppercase tracking-widest max-w-xs text-right">최고의 결과물을 위해 타협하지 않는 최고 사양의 장비를 운용합니다.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {equipment.categories.map((cat, idx) => {
              const icons = [Camera, Settings, Monitor];
              const Icon = icons[idx % icons.length];
              return (
                <div key={idx} className="p-12 border border-emerald-900/10 bg-stone-950/20 group hover:border-emerald-500/20 transition-all duration-500">
                  <Icon className="text-emerald-900 group-hover:text-emerald-500 transition-colors mb-8" size={32} />
                  <h4 className="text-xl font-black text-white uppercase tracking-widest mb-6">{cat.title}</h4>
                  <ul className="space-y-3">
                    {cat.list.map((li, lidx) => (
                      <li key={lidx} className="text-[10px] font-bold text-stone-600 uppercase tracking-widest">{li}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-40 px-6 border-t border-emerald-900/10">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-12 italic">Ready for the mission?</h3>
          <Link to="/contact" className="inline-block px-12 py-6 bg-emerald-600 text-white text-xs font-black uppercase tracking-[0.4em] hover:bg-emerald-500 transition-all shadow-2xl shadow-emerald-950/40">
            Start Collaboration
          </Link>
        </div>
      </section>
    </div>
  );
};
