
export interface HomeContent {
  hero: {
    headline: string;
    subHeadline: string;
    ctaText: string;
    bannerImage: string;
    visible: boolean;
  };
  stats: {
    experience: number;
    projects: number;
    clients: number;
    visible: boolean;
  };
  process: {
    visible: boolean;
    steps: {
      title: string;
      description: string;
    }[];
  };
}

export interface AboutContent {
  manifesto: {
    title: string;
    description: string;
  };
  director: {
    name: string;
    role: string;
    image: string;
  };
  philosophy: {
    title: string;
    items: {
      title: string;
      description: string;
      icon: string;
    }[];
  };
  equipment: {
    title: string;
    categories: {
      title: string;
      list: string[];
    }[];
  };
}

export interface SiteSettings {
  contact: {
    phone: string;
    email: string;
    address: string;
  };
  social: {
    instagram: string;
    youtube: string;
  };
}

export interface Portfolio {
  id: string;
  title: string;
  slug: string;
  status: 'draft' | 'published';
  featured: boolean;
  category: string;
  tags: string[];
  oneLiner: string;
  summary: string;
  clientName?: string;
  industry?: string;
  date?: string;
  scope: string[];
  overview: string;
  problem: string;
  solution: string;
  results: string;
  isDeleted?: boolean;
  mediaGallery: {
    id: string;
    url: string;
    type: 'image' | 'video';
    isHero: boolean;
    order: number;
    caption?: string;
    alt?: string;
  }[];
  videoLinks: {
    platform: string;
    url: string;
    title: string;
  }[];
}

export interface ServicePackage {
  id: string;
  name: string;
  description: string;
  price: string;
  priceType: 'fixed' | 'range' | 'hidden';
  inclusions: string[];
  options: { name: string; price: string }[];
  image: string;
  isDeleted?: boolean;
}

export interface Review {
  id: string;
  author: string;
  company: string;
  content: string;
  rating: number;
  projectUrl?: string;
  image?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Inquiry {
  id: string;
  name: string;
  contact: string;
  purpose: string;
  type: string;
  budget: string;
  date: string;
  status: 'new' | 'processing' | 'completed' | 'hold';
  message: string;
  createdAt: string;
  isDeleted?: boolean;
}
