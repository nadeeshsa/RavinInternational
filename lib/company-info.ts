export type CompanyInfo = {
  companyNameEnglish: string;
  companyNameJapanese: string;
  companyNameCombined: string;
  shortDisplayName: string;
  businessScopeEnglish: string;
  businessScopeJapanese: string;
  representativeDirectorEnglish: string;
  representativeDirectorJapanese: string;
  representativeDirectorCombined: string;
  dealerLicenseEnglish: string;
  dealerLicenseJapanese: string;
  dealerLicenseNumber: string;
  addressEnglish: string;
  addressJapanese: string;
  addressCombined: string;
  mobile: string;
  telFax: string;
  email: string;
  mobileCallLink: string;
  telFaxCallLink: string;
  emailLink: string;
  whatsappLink: string;
  googleMapsEmbedUrl: string;
  placeGalleryImages: string[];
};

export const companyInfo: CompanyInfo = {
  companyNameEnglish: "Ravin International Co., Ltd.",
  companyNameJapanese: "ラビンインターナショナル株式会社",
  companyNameCombined: "Ravin International Co., Ltd. (ラビンインターナショナル株式会社)",
  shortDisplayName: "ラビンインターナショナル株式会社",
  businessScopeEnglish:
    "Purchase & Export of Used Vehicles, Heavy Machinery, Industrial Equipment, and Spare Parts",
  businessScopeJapanese: "中古車・重機・機械・部品 買取・輸出業",
  representativeDirectorEnglish: "Ravindra Abeykoon",
  representativeDirectorJapanese: "代表取締役 ラヴィンドラ・アベーコーン",
  representativeDirectorCombined: "Ravindra Abeykoon (代表取締役 ラヴィンドラ・アベーコーン)",
  dealerLicenseEnglish: "Secondhand Dealer License No. 452740019730",
  dealerLicenseJapanese: "古物商許可番号 第452740019730号",
  dealerLicenseNumber: "452740019730",
  addressEnglish:
    "286-1 Mimase, Aikawa-machi, Aiko-gun, Kanagawa 243-0308, Japan",
  addressJapanese: "〒243-0308 神奈川県愛甲郡愛川町三増 286-1",
  addressCombined:
    "〒243-0308 神奈川県愛甲郡愛川町三増 286-1 (286-1 Mimase, Aikawa-machi, Aiko-gun, Kanagawa 243-0308, Japan)",
  mobile: "080-4387-3344",
  telFax: "046-210-4308",
  email: "rvinint.jp@gmail.com",
  mobileCallLink: "tel:08043873344",
  telFaxCallLink: "tel:0462104308",
  emailLink: "mailto:rvinint.jp@gmail.com",
  whatsappLink: "https://wa.me/818043873344",
  googleMapsEmbedUrl:
    "https://maps.google.com/maps?q=%E3%83%A9%E3%83%93%E3%83%B3%E3%82%A4%E3%83%B3%E3%82%BF%E3%83%BC%E3%83%8A%E3%82%B7%E3%83%A7%E3%83%8A%E3%83%AB%E6%A0%AA%E5%BC%8F%E4%BC%9A%E7%A4%BE,%20286-1%20%E4%B8%89%E5%A2%9E,%20Aikawa,%20Aiko%20District,%20Kanagawa%20243-0308&z=17&output=embed",
  placeGalleryImages: [
    "https://maps.google.com/maps/api/staticmap?center=35.61321165%2C140.0700928&zoom=14&size=900x900&language=en&sensor=false&key=AIzaSyBoYjeRtfVI0Jd8Q_9mnflo9i4sOYpShB0&signature=7r3pUBKCIbPiRA8KBiaSyC0PrpU",
  ],
};
