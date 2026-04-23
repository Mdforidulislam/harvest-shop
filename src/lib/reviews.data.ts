export type Review = {
  id: string;
  text: string;
  name: string;
  role: string;
  avatarSrc?: string;
};

export const reviews: Review[] = [
  {
    id: "r1",
    text: "The Sundarban honey is absolutely pure and delicious. I've been buying from GhorerBazar for over a year and the quality never disappoints. Fast delivery too!",
    name: "Rabeya Khanam",
    role: "Housewife",
  },
  {
    id: "r2",
    text: "খাঁটি মধু পেয়ে সত্যিই খুশি হয়েছি। বাজারে অনেক ভেজাল পণ্য আছে, কিন্তু ঘরের বাজারের পণ্য সম্পূর্ণ বিশ্বাসযোগ্য। দাম একটু বেশি হলেও মানের জন্য মূল্য দেওয়া যায়।",
    name: "Md. Shahadat Hossain",
    role: "Banker",
  },
  {
    id: "r3",
    text: "I ordered ghee and mustard oil together. Both arrived well-packed and on time. The mustard oil has an authentic aroma I haven't found anywhere else in Dhaka.",
    name: "Priya Chakraborty",
    role: "Entrepreneur",
  },
  {
    id: "r4",
    text: "আমি নিয়মিত এখান থেকে মশলা কিনি। হলুদ ও ধনে গুঁড়া একদম খাঁটি, কোনো ভেজাল নেই। সার্ভিসও দ্রুত এবং প্যাকেজিং অনেক সুন্দর।",
    name: "Nasrin Begum",
    role: "School Teacher",
  },
  {
    id: "r5",
    text: "Ordered the black seed honey combo. It arrived within 24 hours in Dhaka. Packaging was secure and the products are genuinely authentic. Highly recommended.",
    name: "Arif Rahman",
    role: "Software Engineer",
  },
  {
    id: "r6",
    text: "The organic ghee is exceptional — rich golden colour and the aroma is exactly like homemade. I use it daily for cooking. Will definitely keep ordering from GhorerBazar.",
    name: "Fatema Akter",
    role: "Nutritionist",
  },
  {
    id: "r7",
    text: "পণ্যের মান নিয়ে কোনো অভিযোগ নেই। বিশেষ করে সুন্দরবনের মধু অসাধারণ। অনলাইনে অর্ডার করা থেকে শুরু করে ডেলিভারি পর্যন্ত পুরো অভিজ্ঞতা চমৎকার।",
    name: "Karim Uddin",
    role: "Business Owner",
  },
  {
    id: "r8",
    text: "I bought the spice bundle as a gift for my mother. She loved every item. The stone-ground turmeric smells completely different from commercial brands — so fresh!",
    name: "Tania Islam",
    role: "Doctor",
  },
  {
    id: "r9",
    text: "Best organic grocery shop in Bangladesh online. I've tried several stores but GhorerBazar stands out for authenticity. The return policy is also hassle-free — great experience.",
    name: "Zahir Ahmed",
    role: "University Lecturer",
  },
];
