export type Product = {
  id: string;
  slug: string;
  name: string;
  nameBn?: string;
  category: string;
  categorySlug: string;
  price: number;
  salePrice?: number;
  images: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  description: string;
  shortDesc: string;
  tags: string[];
  featured?: boolean;
  isNew?: boolean;
  isBestSeller?: boolean;
  variants?: { label: string; price: number; stock: number }[];
  specs: Record<string, string>;
  brand?: { name: string; logo?: string };
  whatsappNumber?: string;
  callNumber?: string;
  infoBullets?: string[];
  videoUrl?: string;
};

export type Category = {
  id: string;
  name: string;
  nameBn: string;
  slug: string;
  icon: string;
  image: string;
  count: number;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: number;
  category: string;
  tags: string[];
  content: string;
};

export type Order = {
  id: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: { name: string; qty: number; price: number; image: string }[];
  total: number;
  payment: string;
  tracking?: string;
};

export type Review = {
  id: string;
  productId: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  featured?: boolean;
};

/* ─── Categories ─────────────────────────────────────── */
export const categories: Category[] = [
  { id: "1", name: "Mustard Oil", nameBn: "সরিষার তেল", slug: "mustard-oil", icon: "🫙", image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=300&h=300&fit=crop", count: 18 },
  { id: "2", name: "Pure Ghee", nameBn: "ঘি", slug: "ghee", icon: "🧈", image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=300&h=300&fit=crop", count: 12 },
  { id: "3", name: "Raw Honey", nameBn: "মধু", slug: "honey", icon: "🍯", image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=300&h=300&fit=crop", count: 15 },
  { id: "4", name: "Dates", nameBn: "খেজুর", slug: "dates", icon: "🌴", image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=300&h=300&fit=crop", count: 10 },
  { id: "5", name: "Mixed Nuts", nameBn: "বাদাম", slug: "nuts", icon: "🥜", image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=300&h=300&fit=crop", count: 22 },
  { id: "6", name: "Herbal Tea", nameBn: "চা", slug: "tea", icon: "🍵", image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=300&fit=crop", count: 9 },
  { id: "7", name: "Spices", nameBn: "মশলা", slug: "spices", icon: "🌶️", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop", count: 30 },
  { id: "8", name: "Seeds", nameBn: "বীজ", slug: "seeds", icon: "🌱", image: "https://images.unsplash.com/photo-1515942400420-2b98fed1f515?w=300&h=300&fit=crop", count: 14 },
  { id: "8", name: "Seeds", nameBn: "বীজ", slug: "seeds", icon: "🌱", image: "https://images.unsplash.com/photo-1515942400420-2b98fed1f515?w=300&h=300&fit=crop", count: 14 },
  { id: "8", name: "Seeds", nameBn: "বীজ", slug: "seeds", icon: "🌱", image: "https://images.unsplash.com/photo-1515942400420-2b98fed1f515?w=300&h=300&fit=crop", count: 14 },
  { id: "8", name: "Seeds", nameBn: "বীজ", slug: "seeds", icon: "🌱", image: "https://images.unsplash.com/photo-1515942400420-2b98fed1f515?w=300&h=300&fit=crop", count: 14 },
  { id: "8", name: "Seeds", nameBn: "বীজ", slug: "seeds", icon: "🌱", image: "https://images.unsplash.com/photo-1515942400420-2b98fed1f515?w=300&h=300&fit=crop", count: 14 },
];

/* ─── Products ─────────────────────────────────────────── */
export const products: Product[] = [
  {
    id: "p1", slug: "sundarban-honey-500g",
    name: "Sundarban Pure Honey", nameBn: "সুন্দরবনের মধু",
    category: "Raw Honey", categorySlug: "honey",
    price: 850, salePrice: 720,
    images: ["https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&h=600&fit=crop"],
    rating: 5, reviewCount: 142, stock: 34,
    shortDesc: "Pure raw honey collected from the Sundarban mangrove forest.",
    description: "Our Sundarban Pure Honey is harvested by indigenous bee-farmers...",
    tags: ["honey", "organic", "sundarban", "raw"],
    featured: true, isBestSeller: true,
    variants: [{ label: "250g", price: 420, stock: 18 }, { label: "500g", price: 720, stock: 34 }, { label: "1kg", price: 1350, stock: 10 }],
    specs: { Origin: "Sundarban, Bangladesh", Type: "Raw & Unfiltered", Color: "Amber", Texture: "Thick", "Harvest Season": "Oct–Dec" },
    brand: { name: "Drovo Naturals" },
    whatsappNumber: "+8801700000000",
    callNumber: "+8801700000000",
    infoBullets: [
      "100% Pure & Raw — No additives, heating, or filtration",
      "Direct from Sundarban — Harvested by indigenous bee-farmers",
      "Lab Tested & Certified — Quality verified by BSTI",
      "Ships in sealed glass jar — Freshness & purity guaranteed",
      "Rich in antioxidants — Natural enzymes fully intact",
      "7-day hassle-free return policy",
    ],
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
  },
  {
    id: "p1_2", slug: "lichu-honey-500g",
    name: "Litchi Flower Honey", nameBn: "লিচুর মধু",
    category: "Raw Honey", categorySlug: "honey",
    price: 650, salePrice: 550,
    images: ["https://images.unsplash.com/photo-1555243896-c709bfa0b564?w=600&h=600&fit=crop"],
    rating: 4.8, reviewCount: 96, stock: 40,
    shortDesc: "Delicate honey with the subtle aroma of litchi flowers.",
    description: "Collected from the litchi orchards of Dinajpur...",
    tags: ["honey", "litchi", "sweet"],
    isNew: true,
    specs: { Origin: "Dinajpur, Bangladesh" },
    brand: { name: "Sundarban Gold" },
  },
  {
    id: "p1_3", slug: "black-seed-honey-500g",
    name: "Black Seed Infused Honey", nameBn: "কালোজিরা ফুলের মধু",
    category: "Raw Honey", categorySlug: "honey",
    price: 950, salePrice: 850,
    images: ["https://images.unsplash.com/photo-1582560475093-ba66accbc424?w=600&h=600&fit=crop"],
    rating: 4.9, reviewCount: 112, stock: 15,
    shortDesc: "Powerful combination of premium honey and black seeds.",
    description: "Harvested from black seed fields during the flowering season...",
    tags: ["honey", "black-seed", "health"],
    isNew: true,
    specs: { Origin: "Jessore, Bangladesh" },
    brand: { name: "Forest Pure" },
  },
  {
    id: "p3", slug: "deshi-ghee-500g",
    name: "Pure Deshi Cow Ghee", nameBn: "দেশী ঘি",
    category: "Pure Ghee", categorySlug: "ghee",
    price: 1200, salePrice: 999,
    images: ["https://images.unsplash.com/photo-1571748982800-fa51082c2224?w=600&h=600&fit=crop"],
    rating: 5, reviewCount: 217, stock: 25,
    shortDesc: "Handmade pure cow ghee using traditional bilona method.",
    description: "Our Deshi Ghee is made from pure cow milk curd...",
    tags: ["ghee", "deshi", "bilona"],
    featured: true, isBestSeller: true,
    isNew: true,
    specs: { Origin: "Rajshahi, Bangladesh", Method: "Traditional Bilona", Source: "Deshi Cow Milk", "Fat Content": "99.8%" },
    brand: { name: "Drovo Organics" },
    whatsappNumber: "+8801700000000",
    callNumber: "+8801700000000",
    infoBullets: [
      "Made via traditional Bilona method — hand-churned from curd",
      "100% Pure Deshi Cow Milk — no buffalo or powder mix",
      "Rich in Vitamins A, D, E & K2",
      "No preservatives, colorants, or artificial flavors",
      "Ships in airtight glass jar — aroma & nutrients preserved",
      "7-day easy return policy",
    ],
  },
  {
    id: "p3_2", slug: "buffalo-ghee-500g",
    name: "Premium Buffalo Ghee", nameBn: "মহিষের ঘি",
    category: "Pure Ghee", categorySlug: "ghee",
    price: 1100, salePrice: 950,
    images: ["https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=600&h=600&fit=crop"],
    rating: 4.7, reviewCount: 84, stock: 30,
    shortDesc: "Rich, creamy buffalo ghee for traditional cooking.",
    description: "Traditional buffalo ghee from the coastal regions...",
    tags: ["ghee", "buffalo", "cooking"],
    isNew: true,
    specs: { Origin: "Bhola, Bangladesh" },
  },
  {
    id: "p4", slug: "medjool-dates-500g",
    name: "Premium Medjool Dates", nameBn: "মেডজুল খেজুর",
    category: "Dates", categorySlug: "dates",
    price: 950, salePrice: 799,
    images: ["https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=600&h=600&fit=crop"],
    rating: 4.7, reviewCount: 94, stock: 45,
    shortDesc: "Soft, caramel-sweet Medjool dates directly imported.",
    description: "Known as the king of dates...",
    tags: ["dates", "medjool", "imported"],
    isNew: true,
    specs: { Origin: "Saudi Arabia" },
  },
  {
    id: "p4_2", slug: "ajwa-dates-250g",
    name: "Holy Ajwa Dates", nameBn: "আজওয়া খেজুর",
    category: "Dates", categorySlug: "dates",
    price: 1500, salePrice: 1350,
    images: ["https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=600&h=600&fit=crop"],
    rating: 5, reviewCount: 156, stock: 20,
    shortDesc: "Prophetic Ajwa dates from Al-Madinah. Dark and rich.",
    description: "The most sought-after variety of dates...",
    tags: ["dates", "ajwa", "madinah"],
    isBestSeller: true,
    specs: { Origin: "Al-Madinah, KSA" },
  },
  {
    id: "p6", slug: "turmeric-powder-200g",
    name: "Organic Turmeric Powder", nameBn: "হলুদ গুঁড়া",
    category: "Spices", categorySlug: "spices",
    price: 180, salePrice: 145,
    images: ["https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=600&fit=crop"],
    rating: 4.4, reviewCount: 134, stock: 120,
    shortDesc: "High-curcumin turmeric powder from organic farms.",
    description: "This turmeric is grown without pesticides...",
    tags: ["turmeric", "spice", "organic"],
    isBestSeller: true,
    specs: { Origin: "Rangpur, Bangladesh" },
  },
  {
    id: "p6_2", slug: "chilli-powder-200g",
    name: "Authentic Chilli Powder", nameBn: "মরিচ গুঁড়া",
    category: "Spices", categorySlug: "spices",
    price: 220, salePrice: 190,
    images: ["https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600&h=600&fit=crop"],
    rating: 4.5, reviewCount: 88, stock: 100,
    shortDesc: "Sun-dried red chillies ground to perfection.",
    description: "Directly sourced from the farms of Bogra...",
    tags: ["chilli", "spice", "hot"],
    specs: { Origin: "Bogra, Bangladesh" },
  },
  {
    id: "p5", slug: "cashew-nuts-250g",
    name: "Whole Cashew Nuts", nameBn: "কাজু বাদাম",
    category: "Mixed Nuts", categorySlug: "nuts",
    price: 680, salePrice: 599,
    images: ["https://images.unsplash.com/photo-1614088685112-0a760b71a3c8?w=600&h=600&fit=crop"],
    rating: 4.5, reviewCount: 67, stock: 80,
    shortDesc: "Premium whole cashews, lightly roasted.",
    description: "W240 grade means approximately 240 kernels per pound...",
    tags: ["cashew", "nuts", "roasted"],
    isNew: true,
    specs: { Origin: "Vietnam" },
  },
  {
    id: "p5_2", slug: "almonds-500g",
    name: "California Almonds", nameBn: "কাঠবাদাম",
    category: "Mixed Nuts", categorySlug: "nuts",
    price: 850, salePrice: 750,
    images: ["https://images.unsplash.com/photo-1574856344991-aaa31b6f4ce3?w=600&h=600&fit=crop"],
    rating: 4.8, reviewCount: 124, stock: 55,
    shortDesc: "Crunchy and nutrient-rich California almonds.",
    description: "Top-grade almonds for snacking or baking...",
    tags: ["almonds", "nuts", "california"],
    isBestSeller: true,
    specs: { Origin: "California, USA" },
  },
];

/* ─── Blog Posts ─────────────────────────────────────── */
export const blogPosts: BlogPost[] = [
  {
    id: "b1", slug: "benefits-of-raw-honey",
    title: "7 Science-Backed Benefits of Raw Honey",
    excerpt: "Raw honey is more than just a sweetener...",
    cover: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=1200&h=675&fit=crop",
    author: "Dr. Fatema Islam", authorAvatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop",
    date: "2026-03-15", readTime: 6, category: "Health",
    tags: ["honey", "health"],
    content: "Raw honey has been used as medicine...",
  },
];

/* ─── Reviews ─────────────────────────────────────────── */
export const reviews: Review[] = [
  { id: "r1", productId: "p1", author: "Rabeya Khatun", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop", rating: 5, date: "2026-03-20", comment: "Absolutely genuine honey! The taste is so pure and the aroma is amazing. Will definitely order again.", verified: true, featured: true },
  { id: "r2", productId: "p1", author: "Mohammad Hasan", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop", rating: 5, date: "2026-04-01", comment: "Best honey I've ever tasted. Very fresh and you can feel the natural sweetness. Highly recommended!", verified: true },
  { id: "r3", productId: "p1", author: "Nasrin Akter", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop", rating: 4, date: "2026-04-10", comment: "Excellent quality, packaging was very secure. Slight delay in delivery but overall a great product.", verified: true },
  { id: "r4", productId: "p3", author: "Karim Uddin", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop", rating: 5, date: "2026-04-05", comment: "Authentic deshi ghee — the aroma when cooking is incredible. Pure product, no adulteration.", verified: true },
  { id: "r5", productId: "p3", author: "Sumaiya Islam", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop", rating: 5, date: "2026-04-12", comment: "Exactly like homemade ghee from my childhood. Beautiful golden color and authentic taste.", verified: true },
];

/* ─── Orders ────────────────────────── */
export const fakeOrders: Order[] = [];

/* ─── Computed ───────────────────────────────────────── */
export const flashDeals = products.filter(p => p.salePrice).slice(0, 6);
export const bestSellers = products.filter(p => p.isBestSeller);
export const newArrivals = products.filter(p => p.isNew);
export const featuredProducts = products.filter(p => p.featured);

/* ─── Hero Slides ───────────────────────────────────────── */
export const heroSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=1400&h=600&fit=crop",
    headline: "Pure from Nature, Fresh to You",
    subheading: "100% organic products sourced directly from farms",
    cta: "Shop Now", ctaLink: "/category/honey", badge: "New Collection",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1543362906-acfc16c67564?w=1400&h=600&fit=crop",
    headline: "Sundarban Honey — The Gold ",
    subheading: "Raw, unfiltered, and bursting with natural goodness",
    cta: "Explore Honey", ctaLink: "/category/honey", badge: "Best Seller",
  },
];
