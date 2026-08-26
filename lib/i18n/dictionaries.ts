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
    description: string;
    viewAll: string;
    cta: string;
    empty: string;
    emptyHint: string;
    openSellerPage: string;
    sellerId: string;
    notConfigured: string;
    feedNotice: string;
    currentPrice: string;
    condition: string;
    validUntil: string;
    ended: string;
    auctionEnded: string;
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
  inventoryPage: {
    eyebrow: string;
    title: string;
    description: string;
    searchLabel: string;
    searchPlaceholder: string;
    categoryLabel: string;
    categoryAll: string;
    makeLabel: string;
    makeAll: string;
    yearRangeLabel: string;
    yearFrom: string;
    yearTo: string;
    priceRangeLabel: string;
    priceMin: string;
    priceMax: string;
    resetFilters: string;
    showing: string;
    of: string;
    listings: string;
    empty: string;
    emptyHint: string;
    viewSpecs: string;
    inquireNow: string;
    fobPrice: string;
    year: string;
    usage: string;
    engine: string;
    page: string;
    prev: string;
    next: string;
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
      description:
        "日本全国のオークションから、ラビンインターナショナル株式会社が入札代行と輸出手続きをサポートします。",
      viewAll: "オークションをすべて見る",
      cta: "オークションを見る",
      empty: "現在出品中のオークションはありません。",
      emptyHint: "出品者IDの設定をご確認いただくか、後ほど再度ご確認ください。",
      openSellerPage: "出品者ページを見る",
      sellerId: "出品者ID",
      notConfigured: "未設定",
      feedNotice: "フィード通知",
      currentPrice: "現在価格",
      condition: "状態",
      validUntil: "有効期限",
      ended: "終了",
      auctionEnded: "このオークションは終了しました",
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
    inventoryPage: {
      eyebrow: "在庫一覧",
      title: "輸出可能な車両・重機・部品",
      description: "カテゴリー・メーカー・年式・価格で絞り込み、詳細をご確認いただけます。",
      searchLabel: "検索",
      searchPlaceholder: "例: HiAce, Komatsu, RVN-HM",
      categoryLabel: "カテゴリー",
      categoryAll: "すべてのカテゴリー",
      makeLabel: "メーカー",
      makeAll: "すべてのメーカー",
      yearRangeLabel: "年式",
      yearFrom: "from",
      yearTo: "to",
      priceRangeLabel: "価格帯 (USD)",
      priceMin: "最小",
      priceMax: "最大",
      resetFilters: "フィルターをリセット",
      showing: "表示中",
      of: "/",
      listings: "件",
      empty: "該当する在庫がありません",
      emptyHint: "年式・価格の条件を広げるか、フィルターをリセットしてください。",
      viewSpecs: "詳細を見る",
      inquireNow: "お問い合わせ",
      fobPrice: "FOB価格",
      year: "年式",
      usage: "使用状況",
      engine: "エンジン",
      page: "ページ",
      prev: "前へ",
      next: "次へ",
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
      description:
        "Live listings from auctions across Japan — ラビンインターナショナル株式会社 handles bidding support and export logistics.",
      viewAll: "View All Auctions",
      cta: "View Auction",
      empty: "No active auction listings right now.",
      emptyHint: "Check the seller ID configuration, or check back later.",
      openSellerPage: "Open Seller Page",
      sellerId: "Seller ID",
      notConfigured: "Not configured",
      feedNotice: "Feed notice",
      currentPrice: "Current",
      condition: "Condition",
      validUntil: "Valid Until",
      ended: "Ended",
      auctionEnded: "This auction has ended",
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
    inventoryPage: {
      eyebrow: "Live Export Catalog",
      title: "Verified Vehicles, Heavy Machinery & Parts",
      description: "Filter by category, make, year, and price, then open a listing for full specs.",
      searchLabel: "Search",
      searchPlaceholder: "e.g. HiAce, Komatsu, RVN-HM",
      categoryLabel: "Category",
      categoryAll: "All Categories",
      makeLabel: "Make",
      makeAll: "All Makes",
      yearRangeLabel: "Year Range",
      yearFrom: "From",
      yearTo: "To",
      priceRangeLabel: "Price Range (USD)",
      priceMin: "Min",
      priceMax: "Max",
      resetFilters: "Reset Filters",
      showing: "Showing",
      of: "of",
      listings: "listings",
      empty: "No Matching Stock",
      emptyHint: "Try broadening year or price range, or reset filters.",
      viewSpecs: "View Specs",
      inquireNow: "Inquire Now",
      fobPrice: "FOB Price",
      year: "Year",
      usage: "Usage",
      engine: "Engine",
      page: "Page",
      prev: "Prev",
      next: "Next",
    },
  },
};
