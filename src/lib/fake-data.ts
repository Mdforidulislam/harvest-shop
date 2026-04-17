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
  { id: "1", name: "Mustard Oil", nameBn: "সরিষার তেল", slug: "mustard-oil", icon: "🫙", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=300&fit=crop", count: 18 },
  { id: "2", name: "Pure Ghee", nameBn: "ঘি", slug: "ghee", icon: "🧈", image: "https://images.unsplash.com/photo-1631789380832-3c24d98ba86a?w=300&h=300&fit=crop", count: 12 },
  { id: "3", name: "Raw Honey", nameBn: "মধু", slug: "honey", icon: "🍯", image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=300&h=300&fit=crop", count: 15 },
  { id: "4", name: "Dates", nameBn: "খেজুর", slug: "dates", icon: "🌴", image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&h=300&fit=crop", count: 10 },
  { id: "5", name: "Mixed Nuts", nameBn: "বাদাম", slug: "nuts", icon: "🥜", image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=300&h=300&fit=crop", count: 22 },
  { id: "6", name: "Herbal Tea", nameBn: "চা", slug: "tea", icon: "🍵", image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=300&h=300&fit=crop", count: 9 },
  { id: "7", name: "Spices", nameBn: "মশলা", slug: "spices", icon: "🌶️", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop", count: 30 },
  { id: "8", name: "Seeds", nameBn: "বীজ", slug: "seeds", icon: "🌱", image: "https://images.unsplash.com/photo-1515023115689-589c33041d3c?w=300&h=300&fit=crop", count: 14 },
];

/* ─── Products ─────────────────────────────────────────── */
export const products: Product[] = [
  {
    id: "p1", slug: "sundarban-honey-500g",
    name: "Sundarban Pure Honey", nameBn: "সুন্দরবনের মধু",
    category: "Raw Honey", categorySlug: "honey",
    price: 850, salePrice: 720,
    images: [
      "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1558642891-54be180ea339?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1471943311424-646960669fbc?w=600&h=600&fit=crop",
    ],
    rating: 4.8, reviewCount: 142, stock: 34,
    shortDesc: "Pure raw honey collected from the Sundarban mangrove forest. Rich in antioxidants and natural enzymes.",
    description: "Our Sundarban Pure Honey is harvested by indigenous bee-farmers from the world's largest mangrove forest. This raw, unfiltered honey retains all natural pollen, enzymes, and antioxidants. No heating, no adulteration — just pure golden honey.",
    tags: ["honey", "organic", "sundarban", "raw"],
    featured: true, isBestSeller: true,
    variants: [
      { label: "250g", price: 420, stock: 50 },
      { label: "500g", price: 720, stock: 34 },
      { label: "1kg", price: 1350, stock: 20 },
    ],
    specs: { Origin: "Sundarban, Bangladesh", Flavor: "Floral, sweet", Color: "Amber golden", "Shelf Life": "24 months", Storage: "Cool, dry place", Certified: "BSTI approved" },
  },
  {
    id: "p2", slug: "kolkata-mustard-oil-1l",
    name: "Cold-Pressed Mustard Oil", nameBn: "সরিষার তেল (কোল্ড প্রেসড)",
    category: "Mustard Oil", categorySlug: "mustard-oil",
    price: 380,
    images: [
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1601565415266-f4e0a435e9fa?w=600&h=600&fit=crop",
    ],
    rating: 4.6, reviewCount: 89, stock: 60,
    shortDesc: "Traditional cold-pressed mustard oil with pungent aroma, rich in Omega-3 and vitamin E.",
    description: "Made using the traditional ghani (wooden press) method, this cold-pressed mustard oil retains maximum nutrients. Perfect for cooking, hair care, and skin massage.",
    tags: ["mustard-oil", "cold-pressed", "organic"],
    isBestSeller: true,
    variants: [
      { label: "500ml", price: 210, stock: 80 },
      { label: "1L", price: 380, stock: 60 },
      { label: "2L", price: 720, stock: 30 },
    ],
    specs: { Origin: "Jessore, Bangladesh", "Press Method": "Cold press", "Smoke Point": "480°F", "Shelf Life": "18 months", Storage: "Airtight, cool place" },
  },
  {
    id: "p3", slug: "deshi-ghee-500g",
    name: "Pure Deshi Ghee", nameBn: "দেশী ঘি",
    category: "Pure Ghee", categorySlug: "ghee",
    price: 1200, salePrice: 999,
    images: [
      "https://images.unsplash.com/photo-1631789380832-3c24d98ba86a?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1559181567-c3190b6a3a61?w=600&h=600&fit=crop",
    ],
    rating: 4.9, reviewCount: 217, stock: 25,
    shortDesc: "Handmade pure cow ghee using traditional bilona method. Rich aroma, golden colour.",
    description: "Our Deshi Ghee is made from pure cow milk curd using the ancient bilona churning method. Each batch is slow-cooked in clay pots over wood fire to develop that signature nutty aroma. A1 cow milk only.",
    tags: ["ghee", "deshi", "bilona", "a1-cow"],
    featured: true, isBestSeller: true,
    variants: [
      { label: "250g", price: 550, stock: 40 },
      { label: "500g", price: 999, stock: 25 },
      { label: "1kg", price: 1850, stock: 12 },
    ],
    specs: { Origin: "Rajshahi, Bangladesh", "Cow Breed": "Indigenous Deshi Cow", "Method": "Bilona", "Shelf Life": "12 months", Storage: "Room temp, sealed" },
  },
  {
    id: "p4", slug: "medjool-dates-500g",
    name: "Premium Medjool Dates", nameBn: "মেডজুল খেজুর",
    category: "Dates", categorySlug: "dates",
    price: 950, salePrice: 799,
    images: [
      "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1609501676725-7186f017a4b7?w=600&h=600&fit=crop",
    ],
    rating: 4.7, reviewCount: 94, stock: 45,
    shortDesc: "Soft, caramel-sweet Medjool dates directly imported from Saudi Arabia. No preservatives.",
    description: "Known as the king of dates, these Medjool dates are hand-selected for size and sweetness. Packed with natural sugars, fiber, and minerals. Perfect for Iftar or daily energy boost.",
    tags: ["dates", "medjool", "imported", "saudi"],
    isNew: true,
    variants: [
      { label: "250g", price: 420, stock: 60 },
      { label: "500g", price: 799, stock: 45 },
      { label: "1kg", price: 1550, stock: 20 },
    ],
    specs: { Origin: "Saudi Arabia", Variety: "Medjool", "Shelf Life": "6 months", Storage: "Refrigerate after opening", Certified: "Halal" },
  },
  {
    id: "p5", slug: "cashew-nuts-250g",
    name: "Whole Cashew Nuts W240", nameBn: "কাজু বাদাম",
    category: "Mixed Nuts", categorySlug: "nuts",
    price: 680,
    images: [
      "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1630750538568-f35b6e1e6509?w=600&h=600&fit=crop",
    ],
    rating: 4.5, reviewCount: 67, stock: 80,
    shortDesc: "Premium W240 grade whole cashews, lightly roasted with no added oil or salt.",
    description: "W240 grade means approximately 240 cashew kernels per pound — a perfect mid-size that's great for snacking and cooking. Sourced from Vietnam, processed locally with HACCP-certified facility.",
    tags: ["cashew", "nuts", "roasted", "w240"],
    isNew: true,
    variants: [
      { label: "250g", price: 680, stock: 80 },
      { label: "500g", price: 1300, stock: 45 },
    ],
    specs: { Origin: "Vietnam", Grade: "W240", "Process": "Lightly roasted", "Shelf Life": "9 months", Storage: "Airtight, cool" },
  },
  {
    id: "p6", slug: "turmeric-powder-200g",
    name: "Organic Turmeric Powder", nameBn: "হলুদ গুঁড়া",
    category: "Spices", categorySlug: "spices",
    price: 180, salePrice: 145,
    images: [
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1562329265-95a6d7a83440?w=600&h=600&fit=crop",
    ],
    rating: 4.4, reviewCount: 134, stock: 120,
    shortDesc: "High-curcumin turmeric powder from organic farms of Rangpur. Deep golden colour.",
    description: "This turmeric is grown without pesticides in Rangpur's rich alluvial soil. Stone-ground to preserve volatile oils and curcumin content (≥3.5%). Lab tested for heavy metals.",
    tags: ["turmeric", "spice", "organic", "rangpur"],
    isBestSeller: true,
    variants: [
      { label: "100g", price: 80, stock: 200 },
      { label: "200g", price: 145, stock: 120 },
      { label: "500g", price: 340, stock: 60 },
    ],
    specs: { Origin: "Rangpur, Bangladesh", "Curcumin": "≥3.5%", "Grind": "Fine (100 mesh)", "Shelf Life": "24 months", Storage: "Airtight, away from light" },
  },
  {
    id: "p7", slug: "black-seed-100g",
    name: "Black Seed (Kalonji)", nameBn: "কালোজিরা",
    category: "Seeds", categorySlug: "seeds",
    price: 220,
    images: [
      "https://images.unsplash.com/photo-1515023115689-589c33041d3c?w=600&h=600&fit=crop",
    ],
    rating: 4.6, reviewCount: 78, stock: 90,
    shortDesc: "Pure Nigella Sativa seeds (Kalonji). Used in traditional medicine and cooking.",
    description: "These premium black seeds are sourced from small farms in Ethiopia and Egypt. Rich in thymoquinone, the active compound with anti-inflammatory properties. Used in Unani and Ayurvedic medicine for centuries.",
    tags: ["black-seed", "kalonji", "nigella", "seeds"],
    variants: [
      { label: "100g", price: 220, stock: 90 },
      { label: "250g", price: 520, stock: 50 },
    ],
    specs: { Origin: "Ethiopia / Egypt", "Active Compound": "Thymoquinone", "Shelf Life": "18 months", Storage: "Cool, dry, airtight" },
  },
  {
    id: "p8", slug: "green-tea-50bags",
    name: "Organic Green Tea (50 bags)", nameBn: "সবুজ চা",
    category: "Herbal Tea", categorySlug: "tea",
    price: 320, salePrice: 265,
    images: [
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&h=600&fit=crop",
    ],
    rating: 4.3, reviewCount: 55, stock: 70,
    shortDesc: "Premium Darjeeling-blend green tea. High in antioxidants, light and refreshing.",
    description: "Each bag contains a precise blend of first-flush Darjeeling green tea and local Sylhet green tea leaves. Organic certified, no artificial flavours.",
    tags: ["green-tea", "organic", "darjeeling", "antioxidant"],
    isNew: true,
    variants: [
      { label: "25 bags", price: 145, stock: 100 },
      { label: "50 bags", price: 265, stock: 70 },
      { label: "100 bags", price: 499, stock: 40 },
    ],
    specs: { Origin: "Darjeeling / Sylhet blend", "Caffeine": "Low–medium", "Brew Temp": "80°C", "Brew Time": "2–3 minutes", "Shelf Life": "18 months" },
  },
  {
    id: "p9", slug: "almond-500g",
    name: "California Almonds", nameBn: "কাঠবাদাম",
    category: "Mixed Nuts", categorySlug: "nuts",
    price: 780, salePrice: 650,
    images: [
      "https://images.unsplash.com/photo-1573846966650-bd8c4ce62c21?w=600&h=600&fit=crop",
    ],
    rating: 4.7, reviewCount: 103, stock: 55,
    shortDesc: "California Nonpareil almonds — large size, sweet, perfect for snacking.",
    description: "Premium Nonpareil variety almonds from California orchards. No shell, blanched option available. Excellent source of Vitamin E, magnesium and protein.",
    tags: ["almonds", "california", "nuts"],
    isBestSeller: true,
    variants: [
      { label: "250g", price: 360, stock: 80 },
      { label: "500g", price: 650, stock: 55 },
      { label: "1kg", price: 1250, stock: 25 },
    ],
    specs: { Origin: "California, USA", Variety: "Nonpareil", "Process": "Raw, unroasted", "Shelf Life": "12 months", Storage: "Cool, dry" },
  },
  {
    id: "p10", slug: "moringa-powder-100g",
    name: "Moringa Leaf Powder", nameBn: "সজিনা পাতার গুঁড়া",
    category: "Seeds", categorySlug: "seeds",
    price: 290,
    images: [
      "https://images.unsplash.com/photo-1495543378239-02ad42e18e8e?w=600&h=600&fit=crop",
    ],
    rating: 4.5, reviewCount: 41, stock: 40,
    shortDesc: "Pure moringa leaf powder — superfood rich in iron, calcium, and vitamin C.",
    description: "Dried and powdered from organically grown moringa trees in Dinajpur. Moringa is called the 'miracle tree' — ounce for ounce it contains more iron than spinach, more calcium than milk, and more vitamin C than oranges.",
    tags: ["moringa", "superfood", "powder", "organic"],
    isNew: true,
    variants: [
      { label: "100g", price: 290, stock: 40 },
      { label: "250g", price: 680, stock: 20 },
    ],
    specs: { Origin: "Dinajpur, Bangladesh", "Iron": "28mg/100g", "Protein": "27g/100g", "Shelf Life": "12 months", Storage: "Airtight, refrigerate after opening" },
  },
  {
    id: "p11", slug: "cinnamon-sticks-100g",
    name: "Ceylon Cinnamon Sticks", nameBn: "দারচিনি",
    category: "Spices", categorySlug: "spices",
    price: 240, salePrice: 195,
    images: [
      "https://images.unsplash.com/photo-1568665812280-ea7c58f4a97b?w=600&h=600&fit=crop",
    ],
    rating: 4.6, reviewCount: 62, stock: 75,
    shortDesc: "True Ceylon cinnamon sticks with sweet, mild flavour. Not Cassia.",
    description: "Imported directly from Sri Lanka, these are true Cinnamomum verum sticks — far superior to cheaper Cassia. Sweet, delicate flavour. Low coumarin content (safe for daily use).",
    tags: ["cinnamon", "ceylon", "spices", "sri-lanka"],
    variants: [
      { label: "50g", price: 105, stock: 120 },
      { label: "100g", price: 195, stock: 75 },
      { label: "250g", price: 460, stock: 30 },
    ],
    specs: { Origin: "Sri Lanka", Variety: "Cinnamomum verum (Ceylon)", "Coumarin": "Very low", "Shelf Life": "24 months", Storage: "Airtight jar" },
  },
  {
    id: "p12", slug: "walnuts-250g",
    name: "Kashmiri Walnuts (In Shell)", nameBn: "আখরোট",
    category: "Mixed Nuts", categorySlug: "nuts",
    price: 620,
    images: [
      "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=600&h=600&fit=crop",
    ],
    rating: 4.4, reviewCount: 38, stock: 35,
    shortDesc: "Premium paper-shell Kashmiri walnuts. Rich in Omega-3 fatty acids.",
    description: "Thin-shell Kashmiri walnuts crack open to reveal large, meaty kernels with mild bitterness. Excellent source of ALA Omega-3, copper, and manganese.",
    tags: ["walnut", "kashmiri", "nuts", "omega3"],
    variants: [
      { label: "250g", price: 620, stock: 35 },
      { label: "500g", price: 1180, stock: 18 },
    ],
    specs: { Origin: "Kashmir", Shell: "Paper-shell", "Shelf Life": "9 months", Storage: "Cool, dry, airtight" },
  },
];

/* ─── Blog Posts ─────────────────────────────────────── */
export const blogPosts: BlogPost[] = [
  {
    id: "b1", slug: "benefits-of-raw-honey",
    title: "7 Science-Backed Benefits of Raw Honey",
    excerpt: "Raw honey is more than just a sweetener. Discover how this golden nectar can boost your immunity, heal wounds, and improve your gut health.",
    cover: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=1200&h=675&fit=crop",
    author: "Dr. Fatema Islam", authorAvatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop",
    date: "2026-03-15", readTime: 6, category: "Health",
    tags: ["honey", "health", "immunity", "natural-remedy"],
    content: "Raw honey has been used as medicine for thousands of years...",
  },
  {
    id: "b2", slug: "why-cold-pressed-oil",
    title: "Why Cold-Pressed Mustard Oil is Better for Your Heart",
    excerpt: "Cold pressing preserves the vital nutrients in mustard oil. Here's what the science says about its cardiovascular benefits.",
    cover: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1200&h=675&fit=crop",
    author: "Mahmud Hasan", authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
    date: "2026-02-28", readTime: 5, category: "Nutrition",
    tags: ["mustard-oil", "heart-health", "cold-pressed"],
    content: "When oil is extracted using heat, many of its beneficial compounds are destroyed...",
  },
  {
    id: "b3", slug: "dates-for-ramadan",
    title: "Best Dates to Buy This Ramadan — Complete Guide 2026",
    excerpt: "From Medjool to Ajwa, we break down the most popular date varieties, their nutritional profile, and where they're sourced from.",
    cover: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=1200&h=675&fit=crop",
    author: "Nadia Rahman", authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
    date: "2026-02-10", readTime: 8, category: "Guide",
    tags: ["dates", "ramadan", "guide", "nutrition"],
    content: "Dates have been the traditional food to break the fast during Ramadan...",
  },
  {
    id: "b4", slug: "moringa-superfood",
    title: "Moringa: The Most Nutritious Plant on Earth?",
    excerpt: "Scientists are calling moringa the next big superfood. We look at the data behind the hype.",
    cover: "https://images.unsplash.com/photo-1495543378239-02ad42e18e8e?w=1200&h=675&fit=crop",
    author: "Dr. Fatema Islam", authorAvatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=80&h=80&fit=crop",
    date: "2026-01-20", readTime: 7, category: "Nutrition",
    tags: ["moringa", "superfood", "nutrition"],
    content: "Moringa oleifera has more nutrients per gram than almost any other plant...",
  },
  {
    id: "b5", slug: "bilona-ghee-process",
    title: "The Ancient Bilona Process: Why It Makes the Best Ghee",
    excerpt: "Explore the 5,000-year-old bilona method and why modern nutritionists are rediscovering its benefits.",
    cover: "https://images.unsplash.com/photo-1631789380832-3c24d98ba86a?w=1200&h=675&fit=crop",
    author: "Mahmud Hasan", authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop",
    date: "2025-12-05", readTime: 6, category: "Food Science",
    tags: ["ghee", "bilona", "traditional", "food-science"],
    content: "The bilona method involves fermenting milk into curd, churning curd into butter...",
  },
  {
    id: "b6", slug: "turmeric-golden-milk",
    title: "Golden Milk Recipe with Organic Turmeric — Boost Immunity Daily",
    excerpt: "This 5-minute turmeric latte recipe uses our cold-pressed black pepper to enhance curcumin absorption by 2000%.",
    cover: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1200&h=675&fit=crop",
    author: "Nadia Rahman", authorAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop",
    date: "2025-11-18", readTime: 4, category: "Recipe",
    tags: ["turmeric", "recipe", "golden-milk", "immunity"],
    content: "Golden milk, also known as haldi doodh, is a traditional Ayurvedic drink...",
  },
];

/* ─── Reviews ─────────────────────────────────────────── */
export const reviews: Review[] = [
  { id: "r1", productId: "p1", author: "Rabeya Khatun", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&h=80&fit=crop", rating: 5, date: "2026-03-20", comment: "Absolutely genuine Sundarban honey! The colour, smell and taste are exactly like what my grandmother used to buy from the local market. Fast delivery too.", verified: true, featured: true },
  { id: "r2", productId: "p3", author: "Arif Hossain", avatar: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=80&h=80&fit=crop", rating: 5, date: "2026-03-15", comment: "This ghee is next level. The aroma fills the whole kitchen when I add a spoonful to dal. Totally worth the price.", verified: true, featured: true },
  { id: "r3", productId: "p2", author: "Sonia Begum", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop", rating: 4, date: "2026-03-10", comment: "Good quality mustard oil. The pungency is just right — not too strong. I use it for cooking and also for my hair.", verified: true },
  { id: "r4", productId: "p4", author: "Taher Ali", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop", rating: 5, date: "2026-03-08", comment: "Best Medjool dates I've had outside of Saudi Arabia. Plump, juicy and caramel-sweet. Ordered again within a week!", verified: true, featured: true },
  { id: "r5", productId: "p1", author: "Farhana Ahmed", avatar: "https://images.unsplash.com/photo-1494790108755-2616b9e2b3b0?w=80&h=80&fit=crop", rating: 4, date: "2026-02-25", comment: "The honey crystallized a bit but that's actually a sign of purity. Mixed it with warm water and it dissolved perfectly. Happy with the purchase.", verified: true },
  { id: "r6", productId: "p9", author: "Karim Miah", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop", rating: 5, date: "2026-02-18", comment: "Freshest almonds I've found online in Bangladesh. No rancid smell at all. Will definitely buy again.", verified: false },
];

/* ─── Orders (for account page) ────────────────────────── */
export const fakeOrders: Order[] = [
  {
    id: "ORD-10042", date: "2026-04-10",
    status: "delivered",
    items: [
      { name: "Sundarban Pure Honey 500g", qty: 2, price: 720, image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=100&h=100&fit=crop" },
      { name: "Pure Deshi Ghee 250g", qty: 1, price: 550, image: "https://images.unsplash.com/photo-1631789380832-3c24d98ba86a?w=100&h=100&fit=crop" },
    ],
    total: 2050, payment: "bKash", tracking: "PTH-234567",
  },
  {
    id: "ORD-10038", date: "2026-04-02",
    status: "shipped",
    items: [
      { name: "California Almonds 500g", qty: 1, price: 650, image: "https://images.unsplash.com/photo-1573846966650-bd8c4ce62c21?w=100&h=100&fit=crop" },
      { name: "Premium Medjool Dates 500g", qty: 1, price: 799, image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=100&h=100&fit=crop" },
    ],
    total: 1509, payment: "COD", tracking: "SFT-889012",
  },
  {
    id: "ORD-10031", date: "2026-03-22",
    status: "processing",
    items: [
      { name: "Organic Turmeric Powder 200g", qty: 3, price: 145, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=100&h=100&fit=crop" },
    ],
    total: 495, payment: "SSLCommerz",
  },
];

/* ─── Flash Deals ───────────────────────────────────────── */
export const flashDeals = products.filter(p => p.salePrice).slice(0, 4);
export const bestSellers = products.filter(p => p.isBestSeller);
export const newArrivals = products.filter(p => p.isNew);
export const featuredProducts = products.filter(p => p.featured);

/* ─── Hero Slides ───────────────────────────────────────── */
export const heroSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=1400&h=600&fit=crop",
    headline: "Pure from Nature, Fresh to You",
    subheading: "100% organic products sourced directly from Bangladesh's finest farms",
    cta: "Shop Now",
    ctaLink: "/category/honey",
    badge: "New Collection",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1543362906-acfc16c67564?w=1400&h=600&fit=crop",
    headline: "Sundarban Honey — The Gold Standard",
    subheading: "Raw, unfiltered, and bursting with natural goodness",
    cta: "Explore Honey",
    ctaLink: "/category/honey",
    badge: "Best Seller",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1400&h=600&fit=crop",
    headline: "Ramadan Special — Dates & Dry Fruits",
    subheading: "Stock up on premium Medjool dates before they sell out",
    cta: "Shop Dates",
    ctaLink: "/category/dates",
    badge: "Flash Deal",
  },
];

/* ─── Admin KPI ─────────────────────────────────────────── */
export const adminKPIs = {
  revenueToday: 45200,
  ordersToday: 38,
  pendingOrders: 12,
  lowStockProducts: 7,
  revenueChange: 12,
  ordersChange: 5,
};

export const revenueChartData = [
  { day: "Apr 10", revenue: 32000 },
  { day: "Apr 11", revenue: 28500 },
  { day: "Apr 12", revenue: 41000 },
  { day: "Apr 13", revenue: 38200 },
  { day: "Apr 14", revenue: 52100 },
  { day: "Apr 15", revenue: 44800 },
  { day: "Apr 16", revenue: 45200 },
];

export const adminOrders = [
  { id: "ORD-10042", customer: "Rabeya Khatun", items: 3, total: 2050, payment: "bKash", status: "delivered", courier: "Pathao", date: "2026-04-10 14:23" },
  { id: "ORD-10041", customer: "Arif Hossain", items: 1, total: 999, payment: "COD", status: "processing", courier: "—", date: "2026-04-10 11:45" },
  { id: "ORD-10040", customer: "Sonia Begum", items: 4, total: 3200, payment: "SSLCommerz", status: "shipped", courier: "Steadfast", date: "2026-04-10 09:12" },
  { id: "ORD-10039", customer: "Taher Ali", items: 2, total: 1449, payment: "bKash", status: "pending", courier: "—", date: "2026-04-10 08:30" },
  { id: "ORD-10038", customer: "Farhana Ahmed", items: 2, total: 1509, payment: "COD", status: "shipped", courier: "RedX", date: "2026-04-09 16:55" },
  { id: "ORD-10037", customer: "Karim Miah", items: 1, total: 650, payment: "Nagad", status: "delivered", courier: "Pathao", date: "2026-04-09 13:20" },
];

export const topProducts = [
  { name: "Pure Deshi Ghee", sold: 217, revenue: 216783, image: "https://images.unsplash.com/photo-1631789380832-3c24d98ba86a?w=60&h=60&fit=crop" },
  { name: "Sundarban Honey", sold: 142, revenue: 102240, image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=60&h=60&fit=crop" },
  { name: "California Almonds", sold: 103, revenue: 66950, image: "https://images.unsplash.com/photo-1573846966650-bd8c4ce62c21?w=60&h=60&fit=crop" },
  { name: "Medjool Dates", sold: 94, revenue: 75106, image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=60&h=60&fit=crop" },
  { name: "Turmeric Powder", sold: 134, revenue: 19430, image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=60&h=60&fit=crop" },
];
