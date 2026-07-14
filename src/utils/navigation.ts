const navBarLinks = [
  { name: 'Home', url: '/' },
  { name: 'Products', url: '/products' },
  { name: 'About Us', url: '/about' },
  { name: 'Contact', url: '/contact' },
];

const megaMenuLinks = {
  byFluteType: [
    { name: '3-Layer Corrugated Boxes', url: '/products' },
    { name: '5-Layer Corrugated Boxes', url: '/products' },
    { name: '7-Layer Heavy-Duty Boxes', url: '/products' },
    { name: 'E-Flute Cosmetic Boxes', url: '/products' },
  ],
  byUsage: [
    { name: 'Moving / Relocation Boxes', url: '/products' },
    { name: 'E-commerce Shipping Boxes', url: '/products' },
    { name: 'Industrial / Heavy Parts', url: '/products' },
    { name: 'Retail / Custom Printed', url: '/products' },
  ],
};

const footerLinks = [
  {
    section: 'Quick Links',
    links: [
      { name: 'Home', url: '/' },
      { name: 'About Us', url: '/about' },
      { name: 'Products', url: '/products' },
      { name: 'Contact', url: '/contact' },
    ],
  },
  {
    section: 'Products',
    links: [
      { name: '3-Layer Boxes', url: '/products' },
      { name: '5-Layer Boxes', url: '/products' },
      { name: 'Heavy-Duty Boxes', url: '/products' },
      { name: 'Custom Printed Boxes', url: '/products' },
    ],
  },
  {
    section: 'Support',
    links: [
      { name: 'FAQ', url: '/#faq' },
      { name: 'Shipping Info', url: '#' },
      { name: 'Custom Order', url: '/contact' },
      { name: 'Samples', url: '/contact' },
    ],
  },
];

const socialLinks = {
  facebook: 'https://www.facebook.com/',
  x: 'https://twitter.com/',
  instagram: 'https://www.instagram.com/',
  linkedin: 'https://www.linkedin.com/',
};

export default {
  navBarLinks,
  megaMenuLinks,
  footerLinks,
  socialLinks,
};
