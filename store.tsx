
import React, { createContext, useContext, useState, useEffect } from 'react';
import { HomeContent, Portfolio, ServicePackage, Review, FAQ, Inquiry, AboutContent, SiteSettings } from './types';
import { INITIAL_HOME_CONTENT, INITIAL_PORTFOLIOS, INITIAL_SERVICES, INITIAL_REVIEWS, INITIAL_FAQS, INITIAL_ABOUT_CONTENT, INITIAL_SITE_SETTINGS } from './constants';

interface SiteData {
  homeContent: HomeContent;
  aboutContent: AboutContent;
  siteSettings: SiteSettings;
  portfolios: Portfolio[];
  services: ServicePackage[];
  reviews: Review[];
  faqs: FAQ[];
  inquiries: Inquiry[];
}

interface SiteContextType extends SiteData {
  updateHome: (content: HomeContent) => void;
  updateAbout: (content: AboutContent) => void;
  updateSettings: (settings: SiteSettings) => void;
  updatePortfolios: (list: Portfolio[]) => void;
  updateServices: (list: ServicePackage[]) => void;
  updateReviews: (list: Review[]) => void;
  updateFaqs: (list: FAQ[]) => void;
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => void;
  updateInquiry: (id: string, status: Inquiry['status']) => void;
  
  toggleDeletePortfolio: (id: string, isDeleted: boolean) => void;
  toggleDeleteService: (id: string, isDeleted: boolean) => void;
  toggleDeleteInquiry: (id: string, isDeleted: boolean) => void;
  
  permanentDeletePortfolio: (id: string) => void;
  permanentDeleteService: (id: string) => void;
  permanentDeleteInquiry: (id: string) => void;

  isAdmin: boolean;
  login: (pw: string) => boolean;
  logout: () => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

export const SiteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SiteData>(() => {
    try {
      const saved = localStorage.getItem('site_data_v5');
      if (saved) {
        const parsed = JSON.parse(saved);
        // 기본 데이터 구조가 유효한지 간단히 확인
        if (parsed.homeContent && parsed.siteSettings) return parsed;
      }
    } catch (e) {
      console.error("Critical: Storage parsing failed. Falling back to initial state.", e);
    }
    return {
      homeContent: INITIAL_HOME_CONTENT,
      aboutContent: INITIAL_ABOUT_CONTENT,
      siteSettings: INITIAL_SITE_SETTINGS,
      portfolios: INITIAL_PORTFOLIOS,
      services: INITIAL_SERVICES,
      reviews: INITIAL_REVIEWS,
      faqs: INITIAL_FAQS,
      inquiries: []
    };
  });

  const [isAdmin, setIsAdmin] = useState(() => localStorage.getItem('is_admin') === 'true');

  useEffect(() => {
    try {
      localStorage.setItem('site_data_v5', JSON.stringify(data));
    } catch (e) {
      console.error("Failed to save data to localStorage", e);
    }
  }, [data]);

  const updateHome = (content: HomeContent) => setData(prev => ({ ...prev, homeContent: content }));
  const updateAbout = (content: AboutContent) => setData(prev => ({ ...prev, aboutContent: content }));
  const updateSettings = (settings: SiteSettings) => setData(prev => ({ ...prev, siteSettings: settings }));
  const updatePortfolios = (list: Portfolio[]) => setData(prev => ({ ...prev, portfolios: list }));
  const updateServices = (list: ServicePackage[]) => setData(prev => ({ ...prev, services: list }));
  const updateReviews = (list: Review[]) => setData(prev => ({ ...prev, reviews: list }));
  const updateFaqs = (list: FAQ[]) => setData(prev => ({ ...prev, faqs: list }));

  const addInquiry = (inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInq: Inquiry = {
      ...inquiry,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'new'
    };
    setData(prev => ({ ...prev, inquiries: [newInq, ...prev.inquiries] }));
  };

  const updateInquiry = (id: string, status: Inquiry['status']) => {
    setData(prev => ({
      ...prev,
      inquiries: prev.inquiries.map(inq => inq.id === id ? { ...inq, status } : inq)
    }));
  };

  const toggleDeletePortfolio = (id: string, isDeleted: boolean) => {
    setData(prev => ({ ...prev, portfolios: prev.portfolios.map(p => p.id === id ? { ...p, isDeleted } : p) }));
  };

  const toggleDeleteService = (id: string, isDeleted: boolean) => {
    setData(prev => ({ ...prev, services: prev.services.map(s => s.id === id ? { ...s, isDeleted } : s) }));
  };

  const toggleDeleteInquiry = (id: string, isDeleted: boolean) => {
    setData(prev => ({ ...prev, inquiries: prev.inquiries.map(i => i.id === id ? { ...i, isDeleted } : i) }));
  };

  const permanentDeletePortfolio = (id: string) => {
    setData(prev => ({ ...prev, portfolios: prev.portfolios.filter(p => p.id !== id) }));
  };

  const permanentDeleteService = (id: string) => {
    setData(prev => ({ ...prev, services: prev.services.filter(s => s.id !== id) }));
  };

  const permanentDeleteInquiry = (id: string) => {
    setData(prev => ({ ...prev, inquiries: prev.inquiries.filter(i => i.id !== id) }));
  };

  const login = (pw: string) => {
    if (pw === '1111') {
      setIsAdmin(true);
      localStorage.setItem('is_admin', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('is_admin');
  };

  return (
    <SiteContext.Provider value={{
      ...data,
      updateHome,
      updateAbout,
      updateSettings,
      updatePortfolios,
      updateServices,
      updateReviews,
      updateFaqs,
      addInquiry,
      updateInquiry,
      toggleDeletePortfolio,
      toggleDeleteService,
      toggleDeleteInquiry,
      permanentDeletePortfolio,
      permanentDeleteService,
      permanentDeleteInquiry,
      isAdmin,
      login,
      logout
    }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSiteStore = () => {
  const context = useContext(SiteContext);
  if (!context) throw new Error('useSiteStore must be used within SiteProvider');
  return context;
};
