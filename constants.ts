
import { HomeContent, Portfolio, ServicePackage, Review, FAQ, AboutContent, SiteSettings } from './types';

export const INITIAL_HOME_CONTENT: HomeContent = {
  hero: {
    headline: "시선을 압도하는 영상, 브랜드의 가치를 담다",
    subHeadline: "기획부터 촬영, 편집까지 전문가의 손길로 완성되는 고퀄리티 비디오 솔루션",
    ctaText: "문의하기",
    bannerImage: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=1920",
    visible: true
  },
  stats: {
    experience: 12,
    projects: 450,
    clients: 180,
    visible: true
  },
  process: {
    visible: true,
    steps: [
      { title: "상담", description: "브랜드의 가치와 목적을 파악하기 위한 심도 있는 미팅을 진행합니다." },
      { title: "기획", description: "시나리오 작성 및 스토리보드 제작을 통해 영상의 뼈대를 잡습니다." },
      { title: "촬영", description: "최첨단 장비와 노하우를 바탕으로 최적의 컷을 담아냅니다." },
      { title: "편집", description: "색보정, 사운드 디자인, 그래픽 작업을 통해 완성도를 높입니다." },
      { title: "납품", description: "최종 검토 후 다양한 매체에 최적화된 포맷으로 전달합니다." }
    ]
  }
};

export const INITIAL_ABOUT_CONTENT: AboutContent = {
  manifesto: {
    title: "We don't just capture images. We construct cinematic missions.",
    description: "PRODUCTION TASKFORCE는 단순히 영상을 만드는 곳이 아닙니다. 우리는 브랜드의 본질을 꿰뚫고, 가장 완벽한 시각적 언어로 그 가치를 증명합니다."
  },
  director: {
    name: "PARK HYUN-WOO",
    role: "Director",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800"
  },
  philosophy: {
    title: "Core Philosophy",
    items: [
      { title: "Precision Targeting", description: "영상의 화려함보다 중요한 것은 누구에게 무엇을 전달하느냐입니다.", icon: "Target" },
      { title: "Technical Confidence", description: "최고급 시네마 카메라와 고난도 후반 작업 기술을 통해 브랜드의 체급을 높입니다.", icon: "Zap" },
      { title: "Collaborative Ethics", description: "단순 용역 관계가 아닌 파트너로서 함께 고민하고 결과에 책임을 공유합니다.", icon: "Heart" }
    ]
  },
  equipment: {
    title: "Operational Capacity",
    categories: [
      { title: "Capture Units", list: ["RED V-Raptor 8K", "Sony FX6 / A7S3", "DJI Ronin 4D"] },
      { title: "Optics System", list: ["ARRI Signature Prime", "Zeiss Supreme Prime", "Laowa Probe Lens"] },
      { title: "Editing Lab", list: ["DaVinci Resolve Studio", "Unreal Engine 5", "Dolby Atmos Mixing"] }
    ]
  }
};

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  contact: {
    phone: "+82 10 1234 5678",
    email: "studio@taskforce.co.kr",
    address: "A-402, 123 Teheran-ro, Gangnam-gu, Seoul, Korea"
  },
  social: {
    instagram: "https://instagram.com",
    youtube: "https://youtube.com"
  }
};

export const INITIAL_PORTFOLIOS: Portfolio[] = [
  {
    id: "1",
    title: "현대자동차 브랜드 필름 2024",
    slug: "hyundai-brand-film-2024",
    status: 'published',
    featured: true,
    category: "기업홍보",
    tags: ["브랜드필름", "자동차", "시네마틱"],
    oneLiner: "혁신적인 미래 모빌리티를 향한 현대자동차의 열정을 담았습니다.",
    summary: "새로운 전기차 라인업을 위한 글로벌 캠페인 영상입니다.",
    clientName: "현대자동차",
    industry: "자동차",
    date: "2024-02",
    scope: ["기획", "촬영", "편집", "색보정"],
    overview: "새로운 아이오닉 시리즈의 출시를 기념하여 브랜드의 미래지향적 이미지를 구축하고자 했습니다.",
    problem: "기존의 전형적인 자동차 광고에서 벗어나 감성적이면서도 기술적인 정교함을 동시에 표현해야 했습니다.",
    solution: "다이내믹한 짐벌 촬영과 언리얼 엔진을 활용한 가상 배경 결합을 통해 미래적인 영상미를 구현했습니다.",
    results: "유튜브 조회수 500만 돌파 및 브랜드 선호도 15% 상승 효과를 거두었습니다.",
    mediaGallery: [
      { id: "m1", url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200", type: 'image', isHero: true, order: 1 }
    ],
    videoLinks: []
  }
];

export const INITIAL_SERVICES: ServicePackage[] = [
  {
    id: "s1",
    name: "Standard Package",
    description: "유튜브, SNS 홍보에 최적화된 실속형 패키지",
    price: "1,500,000",
    priceType: "range",
    inclusions: ["기본 기획", "1일 촬영", "자막 및 BGM", "2회 수정"],
    options: [
      { name: "드론 촬영 추가", price: "300,000" },
      { name: "숏폼 추가 제작", price: "200,000" }
    ],
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: "s2",
    name: "Premium Package",
    description: "브랜드 필름, TV CF급 고퀄리티 제작 솔루션",
    price: "5,000,000",
    priceType: "range",
    inclusions: ["심층 기획", "2일 이상 촬영", "전문 성우 녹음", "색보정 및 CG", "무제한 수정"],
    options: [
      { name: "배우 섭외", price: "별도 협의" }
    ],
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800"
  }
];

export const INITIAL_REVIEWS: Review[] = [];
export const INITIAL_FAQS: FAQ[] = [];
