export type Language = "ja" | "en";

export type Dictionary = {
  nav: {
    home: string;
    inventory: string;
    auctions: string;
    gallery: string;
    about: string;
    contact: string;
  };
  common: {
    viewAll: string;
    viewDetails: string;
    contactUs: string;
    langToggle: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  value: {
    items: { title: string; desc: string }[];
  };
  featured: {
    eyebrow: string;
    title: string;
    viewAll: string;
    empty: string;
  };
  process: {
    eyebrow: string;
    title: string;
    steps: { title: string; desc: string }[];
  };
  auctions: {
    eyebrow: string;
    title: string;
    viewAll: string;
    cta: string;
    empty: string;
  };
  gallery: {
    eyebrow: string;
    title: string;
    viewAll: string;
  };
  contactBand: {
    title: string;
    subtitle: string;
    cta: string;
  };
  footer: {
    companyLabel: string;
    navLabel: string;
    contactLabel: string;
    rights: string;
  };
};

export const dictionaries: Record<Language, Dictionary> = {
  ja: {
    nav: {
      home: "ホーム",
      inventory: "在庫",
      auctions: "オークション",
      gallery: "ギャラリー",
      about: "会社概要",
      contact: "お問い合わせ",
    },
    common: {
      viewAll: "すべて見る",
      viewDetails: "詳細を見る",
      contactUs: "お問い合わせ",
      langToggle: "言語を切り替え",
    },
    hero: {
      eyebrow: `正規ライセンス業者 No. 452740019730`,
      title: "世界へ、確かな一台を。",
      subtitle:
        "Certified Japanese vehicles, machinery, and parts — inspected, verified, and exported worldwide.",
      ctaPrimary: "在庫を見る",
      ctaSecondary: "お問い合わせ",
    },
    value: {
      items: [
        {
          title: "正規ライセンス",
          desc: "古物商許可 第452740019730号の正規事業者。",
        },
        {
          title: "透明な検査",
          desc: "すべての車両・機械を検査し、状態を明確にご報告。",
        },
        {
          title: "グローバル配送",
          desc: "見積りから船積みまで、輸出手続きを一貫サポート。",
        },
        {
          title: "多カテゴリー対応",
          desc: "車両・重機・トラック・部品まで幅広く対応。",
        },
      ],
    },
    featured: {
      eyebrow: "最新在庫",
      title: "輸出可能な最新車両・機械",
      viewAll: "在庫をすべて見る",
      empty: "現在準備中です。近日中に最新の在庫を掲載いたします。",
    },
    process: {
      eyebrow: "ご購入の流れ",
      title: "ご購入までの流れ",
      steps: [
        {
          title: "ご要望をお聞かせください",
          desc: "希望する車種・機械、ご予算、仕向地をお知らせください。",
        },
        {
          title: "検査済み在庫のご案内",
          desc: "検査レポートと写真付きで候補をご提案します。",
        },
        {
          title: "手配・輸出",
          desc: "ご承認後、輸出書類の手配と船積みを進めます。",
        },
        {
          title: "配送・お届け",
          desc: "仕向港までの配送状況を随時ご報告します。",
        },
      ],
    },
    auctions: {
      eyebrow: "ヤフオク出品情報",
      title: "ヤフオク出品情報",
      viewAll: "オークションをすべて見る",
      cta: "オークションを見る",
      empty: "現在出品中のオークションはありません。",
    },
    gallery: {
      eyebrow: "検査・出荷の様子",
      title: "ギャラリー",
      viewAll: "ギャラリーをすべて見る",
    },
    contactBand: {
      title: "お気軽にご相談ください",
      subtitle: "在庫やオークション、輸出手続きについて、お気軽にお問い合わせください。",
      cta: "お問い合わせフォーム",
    },
    footer: {
      companyLabel: "会社情報",
      navLabel: "ナビゲーション",
      contactLabel: "お問い合わせ",
      rights: "All rights reserved.",
    },
  },
  en: {
    nav: {
      home: "Home",
      inventory: "Inventory",
      auctions: "Auctions",
      gallery: "Gallery",
      about: "About Us",
      contact: "Contact",
    },
    common: {
      viewAll: "View All",
      viewDetails: "View Details",
      contactUs: "Contact Us",
      langToggle: "Switch language",
    },
    hero: {
      eyebrow: "Licensed Dealer No. 452740019730",
      title: "Trusted Units, Delivered Worldwide.",
      subtitle:
        "Certified Japanese vehicles, machinery, and parts — inspected, verified, and exported worldwide.",
      ctaPrimary: "View Inventory",
      ctaSecondary: "Contact Us",
    },
    value: {
      items: [
        {
          title: "Licensed Dealer",
          desc: "Officially licensed, Secondhand Dealer No. 452740019730.",
        },
        {
          title: "Transparent Inspection",
          desc: "Every vehicle and machine is inspected with clear condition reports.",
        },
        {
          title: "Global Shipping",
          desc: "End-to-end export support, from quote to shipment.",
        },
        {
          title: "Multi-Category",
          desc: "Vehicles, heavy machinery, commercial trucks, and parts.",
        },
      ],
    },
    featured: {
      eyebrow: "Latest Stock",
      title: "Latest Export-Ready Vehicles & Machinery",
      viewAll: "View Full Inventory",
      empty: "New stock is being prepared — check back soon.",
    },
    process: {
      eyebrow: "How It Works",
      title: "How Buying Works",
      steps: [
        {
          title: "Share Your Requirements",
          desc: "Tell us the vehicles or machinery you need, your budget, and destination.",
        },
        {
          title: "Review Verified Inventory",
          desc: "We share inspected candidates with condition reports and photos.",
        },
        {
          title: "Arrange & Export",
          desc: "Once approved, we handle export documentation and shipment booking.",
        },
        {
          title: "Delivery",
          desc: "We keep you updated until the shipment reaches your destination port.",
        },
      ],
    },
    auctions: {
      eyebrow: "Yahoo Auctions Listings",
      title: "Yahoo Auctions Listings",
      viewAll: "View All Auctions",
      cta: "View Auction",
      empty: "No active auction listings right now.",
    },
    gallery: {
      eyebrow: "Inspection & Shipping",
      title: "Gallery",
      viewAll: "View Full Gallery",
    },
    contactBand: {
      title: "Get In Touch",
      subtitle: "Questions about stock, auctions, or export procedures? We're happy to help.",
      cta: "Contact Form",
    },
    footer: {
      companyLabel: "Company",
      navLabel: "Navigation",
      contactLabel: "Contact",
      rights: "All rights reserved.",
    },
  },
};
