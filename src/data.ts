// Azzi Lounge Barbers & Spa Data File

// Import generated images to ensure Vite bundles them correctly
import heroBg from './assets/images/azzi_hero_bg_1783508699075.jpg';
import reception from './assets/images/azzi_reception_1783508721785.jpg';
import barberCutting from './assets/images/azzi_barber_cutting_1783508734314.jpg';
import spaMassage from './assets/images/azzi_spa_massage_1783508745580.jpg';
import stylingChairs from './assets/images/azzi_styling_chairs_1783508764543.jpg';
import groomingTools from './assets/images/azzi_grooming_tools_1783508779525.jpg';

export interface ServiceItem {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  popular?: boolean;
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string; // lucide icon identifier
  description: string;
  items: ServiceItem[];
}

export const SERVICES_DATA: ServiceCategory[] = [
  {
    id: 'barbering',
    name: 'Barbering & Hair Styling',
    icon: 'Scissors',
    description: 'Master craftsmanship, custom cuts, and hot-lather shaves tailored to your unique style.',
    items: [
      { id: 'fade_cut', name: 'Fade Cut', price: 500, duration: '30 mins', description: 'Skin fade, drop fade, high/low taper with clean hairline finishing.', popular: true },
      { id: 'buzz_cut', name: 'Buzz Cut', price: 400, duration: '15 mins', description: 'Even all-over length with razor-sharp hairline edge up.' },
      { id: 'scissor_cut', name: 'Scissor Cut', price: 700, duration: '40 mins', description: 'Classic longer scissor shear work tailored to your head shape.' },
      { id: 'curly_specialist', name: 'Curly Hair Specialist', price: 1000, duration: '45 mins', description: 'Expert shaping, moisturizing and styling for tight curls, coils, and afros.', popular: true },
      { id: 'beard_trim', name: 'Beard Trim & Conditioning', price: 600, duration: '25 mins', description: 'Sculpting beard trim, facial massage, organic oil treatment & dye alignment.' },
      { id: 'hot_towel_shave', name: 'Hot Towel Shave', price: 500, duration: '30 mins', description: 'Pre-shave essential oils, relaxing warm towels, and dynamic lather shave.' },
      { id: 'straight_razor', name: 'Straight Razor Shave', price: 400, duration: '20 mins', description: 'Ultra-smooth skin shave using hygienic disposable straight-edge blade.' },
      { id: 'head_shave', name: 'Head Shave', price: 500, duration: '25 mins', description: 'Shining clean head shave finished with moisturizing balm.' },
      { id: 'children_cut', name: 'Children\'s Cut', price: 300, duration: '20 mins', description: 'Patient, gentle, and child-friendly barbering for boys under 12 years.' },
      { id: 'scalp_treatment', name: 'Scalp Treatment', price: 1200, duration: '30 mins', description: 'Exfoliating shampoo, therapeutic tea-tree scalp scrub and deep massage.' },
      { id: 'vip_cut', name: 'VIP Cut & Wash', price: 1500, duration: '50 mins', description: 'Premium haircut, hair washing, head & neck massage, with choice beverage.', popular: true },
      { id: 'groom_package', name: 'Groom & VIP Package', price: 3500, duration: '90 mins', description: 'Ultra VIP haircut, hair color, beard treatment, face steam and express pedicure.' }
    ]
  },
  {
    id: 'spa',
    name: 'Luxury Spa & Grooming',
    icon: 'Sparkles',
    description: 'Unwind and rejuvenate with our signature nail therapy, facials, and deep massage treatments.',
    items: [
      { id: 'manicure', name: 'Premium Manicure', price: 1000, duration: '35 mins', description: 'Nail shaping, cuticle grooming, hand massage, and professional hand scrub.', popular: true },
      { id: 'pedicure', name: 'Royal Pedicure', price: 1500, duration: '45 mins', description: 'Foot bath, deep exfoliating scrub, callus removal, massage, and nail grooming.', popular: true },
      { id: 'face_steam', name: 'Ozone Face Steam & Cleansing', price: 800, duration: '25 mins', description: 'Pore-opening warm ozone steam, charcoal blackhead extraction, and organic mask.' },
      { id: 'body_scrub', name: 'Full Body Scrub', price: 2500, duration: '60 mins', description: 'Dead-sea salt or coffee scrub exfoliator to rejuvenate and soften your entire skin.' },
      { id: 'massage', name: 'Therapeutic Full Body Massage', price: 3000, duration: '60 mins', description: 'Swedish or deep tissue muscle relaxation massage with aromatherapy oils.', popular: true },
      { id: 'waxing', name: 'Professional Waxing', price: 1200, duration: '30 mins', description: 'Gentle and clean hair removal for arms, legs, back or chest.' }
    ]
  }
];

export const TESTIMONIALS = [
  {
    quote: "It was a good experience ever, happy client, will refer more people.",
    author: "Maurice Owiti",
    role: "Regular Client",
    rating: 5
  },
  {
    quote: "Very child friendly. Amazing customer service. My boys had a perfect haircut.",
    author: "Anne Wagema",
    role: "Happy Parent",
    rating: 5
  }
];

export const GALLERY_IMAGES = [
  {
    id: 'g1',
    src: heroBg,
    alt: 'Azzi Lounge premium barbershop interior showing styling chairs and clean marble floors',
    title: 'Modern Barber Lounge'
  },
  {
    id: 'g2',
    src: reception,
    alt: 'Luxury spa reception lobby with an emerald green velvet sofa and backlit marble panel',
    title: 'Luxury Waiting Area'
  },
  {
    id: 'g3',
    src: barberCutting,
    alt: 'Professional barber giving a sharp styling haircut to a client',
    title: 'Precision Cuts'
  },
  {
    id: 'g4',
    src: spaMassage,
    alt: 'Serene spa treatment room with professional massage therapy',
    title: 'Rejuvenating Spa Therapy'
  },
  {
    id: 'g5',
    src: stylingChairs,
    alt: 'A row of modern black leather styling chairs in front of warm glowing backlit mirrors',
    title: 'Premium Styling Chairs'
  },
  {
    id: 'g6',
    src: groomingTools,
    alt: 'Premium gold-plated clippers, scissors and straight razors on a dark counter',
    title: 'Elite Grooming Tools'
  }
];

export const GOOD_TO_KNOW = [
  { icon: 'Accessibility', label: 'Wheelchair Accessible', desc: 'Step-free entrance and spacious interior.' },
  { icon: 'Car', label: 'On-Site Parking', desc: 'Secure and ample parking spaces right next to the lounge.' },
  { icon: 'UserCheck', label: 'Walk-ins & Appointments', desc: 'Both welcomed! Appointments skip any waiting.' },
  { icon: 'Users', label: 'Gender-Neutral Toilets', desc: 'Clean, modern, and inclusive facilities.' },
  { icon: 'Coffee', label: 'Complementary Beverages', desc: 'Warm coffee, cold water, and soft drinks served.' },
  { icon: 'Smile', label: 'Child-Friendly', desc: 'Patient barbers, sweet treats, and kid-approved styling.' }
];

export const CONTACT_INFO = {
  phone: '0716 058500',
  phoneDirector: '0700 051 405',
  phoneRaw: '+254716058500',
  phoneDirectorRaw: '+254700051405',
  email: 'azzilounge254@gmail.com',
  instagram: 'azzihairandspa',
  instagramUrl: 'https://instagram.com/azzihairandspa',
  tiktok: 'azzi.loung.barbers',
  tiktokUrl: 'https://www.tiktok.com/@azzi.loung.barbers',
  address: 'Oginga Odinga Avenue, Nakucity Mall (opp. FEM Church, next to Sakinya Motors), Nakuru, Kenya',
  hours: {
    days: 'Open Daily',
    time: '8:00 AM - 8:00 PM',
    note: 'Including public holidays'
  },
  tagline: "More Than a Cut — It's a Vibe."
};
