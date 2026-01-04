
import React, { useState } from 'react';
import { Send, Check } from 'lucide-react';
import { useSiteStore } from '../store.tsx';

export const Contact: React.FC = () => {
  const { addInquiry, contactContent } = useSiteStore();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    contact: '',
    purpose: contactContent.purposes[0] || '기타',
    type: contactContent.types[0] || '전체 패키지',
    budget: contactContent.budgets[0] || '상담 후 결정',
    date: '', 
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addInquiry({
      name: form.name,
      contact: form.contact,
      purpose: form.purpose,
      type: form.type,
      budget: form.budget,
      date: form.date,
      message: form.message
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-stone-950 flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center space-y-8 animate-fade-in">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-500">
            <Check size={40} strokeWidth={3} />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tighter">{contactContent.successTitle}</h1>
          <p className="text-stone-400 font-light leading-relaxed whitespace-pre-wrap">
            {contactContent.successMessage}
          </p>
          <div className="pt-8">
            <button 
              onClick={() => setSubmitted(false)}
              className="px-10 py-4 bg-white text-black font-black rounded-full hover:bg-emerald-500 transition-all uppercase text-xs tracking-[0.2em]"
            >
              Back to Studio
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter">{contactContent.headline}</h1>
          <p className="text-stone-400 text-lg font-light">{contactContent.subHeadline}</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-stone-900/40 p-8 md:p-12 rounded-3xl border border-white/5 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-black text-stone-500 uppercase tracking-widest">이름 / 업체명</label>
              <input 
                required
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-emerald-500 transition-all"
                placeholder="홍길동"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-stone-500 uppercase tracking-widest">연락처 / 이메일</label>
              <input 
                required
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-emerald-500 transition-all"
                placeholder="010-0000-0000"
                value={form.contact}
                onChange={e => setForm({...form, contact: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-black text-stone-500 uppercase tracking-widest">제작 목적</label>
              <select 
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-emerald-500 transition-all appearance-none"
                value={form.purpose}
                onChange={e => setForm({...form, purpose: e.target.value})}
              >
                {contactContent.purposes.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-stone-500 uppercase tracking-widest">영상 유형</label>
              <select 
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-emerald-500 transition-all appearance-none"
                value={form.type}
                onChange={e => setForm({...form, type: e.target.value})}
              >
                {contactContent.types.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-stone-500 uppercase tracking-widest">예상 예산</label>
              <select 
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-emerald-500 transition-all appearance-none"
                value={form.budget}
                onChange={e => setForm({...form, budget: e.target.value})}
              >
                {contactContent.budgets.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-stone-500 uppercase tracking-widest">희망 일정</label>
              <input 
                type="date"
                required
                className="w-full bg-stone-950 border border-stone-800 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-emerald-500 transition-all"
                value={form.date}
                onChange={e => setForm({...form, date: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-stone-500 uppercase tracking-widest">문의 내용</label>
            <textarea 
              rows={5}
              className="w-full bg-stone-950 border border-stone-800 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-emerald-500 transition-all"
              placeholder="프로젝트에 대해 상세히 적어주세요."
              value={form.message}
              onChange={e => setForm({...form, message: e.target.value})}
            />
          </div>

          <div className="pt-4">
            <button 
              type="submit"
              className="w-full py-5 bg-emerald-600 text-white font-black rounded-xl hover:bg-emerald-500 transition-all flex items-center justify-center space-x-3 text-lg"
            >
              <span>SEND MESSAGE</span>
              <Send size={20} />
            </button>
            <p className="text-center text-[10px] text-stone-600 mt-6 uppercase tracking-widest">By submitting this form, you agree to our privacy policy and terms.</p>
          </div>
        </form>
      </div>
    </div>
  );
};
