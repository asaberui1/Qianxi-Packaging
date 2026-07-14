import ogImageSrc from '@images/social.png';

export const SITE = {
  title: 'Qianxi Packaging',
  tagline: 'Your Trusted Corrugated Box Manufacturer',
  description:
    'Chengdu Qianxi Packaging Materials Co., Ltd. — Factory-direct custom corrugated boxes. 3-layer, 5-layer, heavy-duty, and custom printed packaging solutions with global shipping.',
  description_short:
    'Factory-direct custom corrugated boxes from China. ISO certified, free sampling, 24/7 support.',
  url: 'https://asaberui1.github.io',
  author: 'Whereby',
};

export const COMPANY = {
  name: 'Chengdu Qianxi Packaging Materials Co., Ltd.',
  nameZh: '成都芊西包装材料有限公司',
  address: {
    en: 'Building 22, No. 301 Lianhua Road, Baiguo Street, Jintang County, Chengdu, Sichuan, China',
    zh: '四川省成都市金堂县白果街道莲花路301号淮州智造新谷22栋1层',
  },
  email: 'sales@qianxipackaging.com',
  phone: '+86 XXX XXXX XXXX',
  whatsapp: '+86 XXX XXXX XXXX',
  coordinates: {
    lat: 30.6822917,
    lng: 104.5567195,
    dms: {
      lat: "30°40'56.2501\"N",
      lng: "104°33'24.1903\"E",
    },
  },
};

export const SEO = {
  title: SITE.title,
  description: SITE.description,
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: COMPANY.name,
    url: SITE.url,
    description: SITE.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Building 22, No. 301 Lianhua Road, Baiguo Street, Huaizhou Zhizao Xingu',
      addressLocality: 'Jintang County, Chengdu',
      addressRegion: 'Sichuan',
      addressCountry: 'CN',
      postalCode: '610400',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: COMPANY.email,
      contactType: 'sales',
    },
  },
};

export const OG = {
  locale: 'en_US',
  type: 'website',
  url: SITE.url,
  title: `${SITE.title} — Factory Direct Corrugated Box Manufacturer`,
  description:
    'Custom corrugated boxes from Chengdu Qianxi Packaging. ISO certified factory, free sampling, 24-hour quotation. 3-layer, 5-layer, heavy-duty, and custom printed boxes for global export.',
  image: ogImageSrc,
};

export const partnersData: Array<{
  icon: string;
  name: string;
  href: string;
}> = [];
