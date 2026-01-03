
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Play, Award, CheckCircle, Users } from 'lucide-react';
import { useSiteStore } from '../store';

const Hero = () => {
  const { homeContent } = useSiteStore();
  const { hero } = homeContent;
  if (!hero.visible) return null;

  return (
    <section className="relative h-[95vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src={hero.bannerImage} alt="Banner" className="w-full h-full object-cover brightness-[0.3]" />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-stone-950/40"></div>
      </div>
      <div className="relative z-10 text-center max-w-5xl px-6">
        <h1 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-[0.9] animate-fade-in uppercase">
          {hero.headline}
        </h1>
        <p className="text-lg md:text-xl text-stone-400 mb-12 font-medium max-w-2xl mx-auto opacity-80">
          {hero.subHeadline}
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8">
          <Link to="/contact" className="px-10 py-5 bg-emerald-600 text-white font-black text-xs uppercase tracking-widest hover:bg-emerald-500 transition-all flex items-center group">
            {hero.ctaText} <ChevronRight className="ml-3 group-hover:translate-x-1 transition-transform" size={16} />
          </Link>
          <Link to="/portfolio" className="px-10 py-5 bg-white/5 text-white font-black text-xs uppercase tracking-widest border border-white/10 hover:bg-white/10 transition-all backdrop-blur-md">
            View Showcase
          </Link>
        </div>
      </div>
    </section>
  );
};

const Stats = () => {
  const { homeContent } = useSiteStore();
  const { stats } = homeContent;
  if (!stats.visible) return null;

  const items = [
    { label: "Experience", value: stats.experience + "Yrs", icon: Award },
    { label: "Projects", value: stats.projects + "+", icon: Play },
    { label: "Clients", value: stats.clients + "+", icon: Users },
  ];

  return (
    <section className="py-20 border-b border-white/5 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center space-x-6 justify-center md:justify-start">
              <div className="p-4 bg-emerald-950/30 border border-emerald-900/20 rounded-full">
                <item.icon className="text-emerald-500" size={24} />
              </div>
              <div>
                <div className="text-4xl font-black text-white tracking-tighter">{item.value}</div>
                <div className="text-[10px] text-stone-600 font-black uppercase tracking-[0.3em] mt-1">{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturedPortfolio = () => {
  const { portfolios } = useSiteStore();
  // Filter out deleted items and only show published ones
  const featured = portfolios.filter(p => !p.isDeleted && p.featured && p.status === 'published').slice(0, 6);

  return (
    <section className="py-32 px-6 bg-stone-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-24">
          <div>
            <h2 className="text-[10px] font-black text-emerald-500 mb-6 tracking-[0.4em] uppercase">The Portfolio</h2>
            <p className="text-5xl md:text-6xl font-black text-white tracking-tighter uppercase">Cinematic Works</p>
          </div>
          <Link to="/portfolio" className="text-stone-500 hover:text-white transition-colors flex items-center text-[10px] font-black uppercase tracking-widest border-b border-stone-900 pb-2">
            Archive <ChevronRight size={14} className="ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {featured.map(item => (
            <Link key={item.id} to={`/portfolio/${item.slug}`} className="group block">
              <div className="relative aspect-video overflow-hidden rounded-sm mb-8 bg-stone-900">
                <img 
                  src={item.mediaGallery.find(m => m.isHero)?.url || 'https://picsum.photos/800/450'} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105 group-hover:opacity-60"
                />
                <div className="absolute inset-0 bg-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                   <div className="px-6 py-3 border border-white/20 backdrop-blur-md text-[10px] font-black text-white uppercase tracking-widest">Explore Project</div>
                </div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-[10px] font-black text-emerald-500 mb-3 uppercase tracking-[0.3em]">{item.category}</div>
                  <h3 className="text-2xl font-black text-white group-hover:text-emerald-400 transition-colors uppercase tracking-tight">{item.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Home: React.FC = () => {
  return (
    <div className="bg-black">
      <Hero />
      <Stats />
      <FeaturedPortfolio />
    </div>
  );
};
