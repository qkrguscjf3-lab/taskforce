
import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Plus, ArrowRight, ShieldCheck } from 'lucide-react';
import { useSiteStore } from '../store';

export const Service: React.FC = () => {
  const { services } = useSiteStore();
  const activeServices = services.filter(s => !s.isDeleted);

  return (
    <div className="bg-black min-h-screen py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-24 text-center md:text-left">
          <h2 className="text-[10px] font-black text-emerald-500 mb-6 tracking-[0.4em] uppercase">Solutions</h2>
          <h1 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase leading-none">Service</h1>
          <p className="text-stone-500 text-lg max-w-2xl font-medium opacity-80 uppercase tracking-tighter">
            브랜드의 성장을 위한 최적화된 영상 제작 패키지를 제안합니다.
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
          {activeServices.map((pkg) => (
            <div key={pkg.id} className="bg-stone-900/20 border border-emerald-900/10 rounded-sm overflow-hidden flex flex-col group hover:border-emerald-500/30 transition-all duration-500">
              <div className="aspect-[21/9] overflow-hidden">
                <img src={pkg.image} alt={pkg.name} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 scale-105 group-hover:scale-100" />
              </div>
              <div className="p-10 flex-grow flex flex-col">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">{pkg.name}</h3>
                    <p className="text-stone-500 text-sm font-medium">{pkg.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest block mb-1">Starts From</span>
                    <span className="text-2xl font-black text-white">
                      {pkg.priceType === 'hidden' ? '상담 후 확정' : `₩${pkg.price}${pkg.priceType === 'range' ? '~' : ''}`}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 mb-10 flex-grow">
                  <p className="text-[10px] font-black text-stone-600 uppercase tracking-[0.2em] mb-4">Inclusions</p>
                  {pkg.inclusions.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <ShieldCheck size={14} className="text-emerald-500" />
                      <span className="text-sm text-stone-400 font-medium">{item}</span>
                    </div>
                  ))}
                </div>

                <Link 
                  to="/contact" 
                  className="w-full py-5 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center space-x-4 hover:bg-emerald-500 transition-all"
                >
                  <span>Inquire This Package</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
          {activeServices.length === 0 && (
            <div className="col-span-full py-24 text-center border border-dashed border-emerald-900/10">
              <p className="text-[10px] font-black uppercase tracking-widest text-stone-700">No active service packages found.</p>
            </div>
          )}
        </div>

        {/* Add-ons & Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <div>
              <h3 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-10">Additional Options</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activeServices[0]?.options.map((opt, idx) => (
                  <div key={idx} className="flex items-center justify-between p-6 bg-stone-900/10 border border-emerald-900/5 rounded-sm">
                    <div className="flex items-center space-x-4">
                      <Plus size={16} className="text-emerald-800" />
                      <span className="text-sm font-bold text-stone-300 uppercase tracking-tight">{opt.name}</span>
                    </div>
                    <span className="text-xs font-black text-emerald-500">₩{opt.price}</span>
                  </div>
                ))}
                {!activeServices[0]?.options.length && <p className="text-[9px] text-stone-700 font-black uppercase">No active options.</p>}
              </div>
            </div>
          </div>

          <div className="space-y-12">
            <div>
              <h3 className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em] mb-10">Standard Deliverables</h3>
              <ul className="space-y-6">
                <li className="border-b border-emerald-900/10 pb-4 flex justify-between">
                  <span className="text-[10px] font-black text-stone-600 uppercase tracking-widest">Resolution</span>
                  <span className="text-xs font-bold text-white uppercase">4K / 10bit 422</span>
                </li>
                <li className="border-b border-emerald-900/10 pb-4 flex justify-between">
                  <span className="text-[10px] font-black text-stone-600 uppercase tracking-widest">Formats</span>
                  <span className="text-xs font-bold text-white uppercase">MP4, MOV (ProRes)</span>
                </li>
                <li className="border-b border-emerald-900/10 pb-4 flex justify-between">
                  <span className="text-[10px] font-black text-stone-600 uppercase tracking-widest">Copyright</span>
                  <span className="text-xs font-bold text-white uppercase">BGM & Stock Licensed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
