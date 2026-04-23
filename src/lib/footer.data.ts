import { FacebookIcon, TwitterIcon, InstagramIcon, YoutubeIcon, type SvgIcon } from "./social-icons";

export type FooterLink = { label: string; href: string };
export type FooterLinkColumn = { heading: string; ariaLabel: string; links: FooterLink[] };
export type SocialItem = { name: string; href: string; Icon: SvgIcon };
export type AppDownload = { platform: string; href: string; badgeSrc: string; alt: string };
export type PaymentMethod = { name: string; src: string; alt: string };

export type FooterData = {
  brand: { name: string; wordmark: string; description: string };
  contact: { address: string; phone: string; phoneHref: string; email: string };
  socials: SocialItem[];
  appDownloads: AppDownload[];
  linkColumns: FooterLinkColumn[];
  paymentMethods: PaymentMethod[];
  verifiedBadge: { src: string; alt: string };
  copyrightName: string;
};

export const footerData: FooterData = {
  brand: {
    name: "DROVO",
    wordmark: ".BD",
    description:
      "Your trusted online shop for 100% authentic organic products — honey, ghee, spices, and more — delivered right to your doorstep across Bangladesh.",
  },

  contact: {
    address: "Road 12, Gulshan-2, Dhaka-1212, Bangladesh",
    phone: "+880 1700-000000",
    phoneHref: "tel:+8801700000000",
    email: "info@drovo.bd",
  },

  socials: [
    { name: "Facebook",  href: "#", Icon: FacebookIcon  },
    { name: "Twitter",   href: "#", Icon: TwitterIcon   },
    { name: "Instagram", href: "#", Icon: InstagramIcon },
    { name: "YouTube",   href: "#", Icon: YoutubeIcon   },
  ],

  appDownloads: [
    {
      platform: "Google Play",
      href: "#",
      badgeSrc: "https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg",
      alt: "Get it on Google Play",
    },
    {
      platform: "App Store",
      href: "#",
      badgeSrc: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg",
      alt: "Download on the App Store",
    },
  ],

  linkColumns: [
    {
      heading: "Information",
      ariaLabel: "Information links",
      links: [
        { label: "About Us",   href: "/about"   },
        { label: "Blog",       href: "/blog"    },
        { label: "Contact Us", href: "/contact" },
        { label: "Careers",    href: "/careers" },
      ],
    },
    {
      heading: "Shop By",
      ariaLabel: "Shop by category links",
      links: [
        { label: "All Products",  href: "/category/all"              },
        { label: "Best Sellers",  href: "/category/all?sort=popular" },
        { label: "New Arrivals",  href: "/category/all?sort=new"     },
        { label: "Flash Deals",   href: "/category/all?sort=sale"    },
        { label: "Honey",         href: "/category/honey"            },
        { label: "Ghee",          href: "/category/ghee"             },
        { label: "Spices",        href: "/category/spices"           },
      ],
    },
    {
      heading: "Support",
      ariaLabel: "Support links",
      links: [
        { label: "Help Center",  href: "/help"            },
        { label: "Track Order",  href: "/account/orders"  },
        { label: "FAQ",          href: "/faq"             },
        { label: "Report Issue", href: "/contact"         },
      ],
    },
    {
      heading: "Consumer Policy",
      ariaLabel: "Consumer policy links",
      links: [
        { label: "Shipping Policy",    href: "/shipping" },
        { label: "Return Policy",      href: "/refund"   },
        { label: "Privacy Policy",     href: "/privacy"  },
        { label: "Terms & Conditions", href: "/terms"    },
      ],
    },
  ],

  paymentMethods: [
    { name: "Visa",       alt: "Visa",        src: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"                                                          },
    { name: "Mastercard", alt: "Mastercard",  src: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"                                                    },
    { name: "Amex",       alt: "Amex",        src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/American_Express_logo_%282018%29.svg"                                   },
    { name: "bKash",      alt: "bKash",       src: "https://www.bkash.com/sites/default/files/bkash-logo.png"                                                                   },
    { name: "Nagad",      alt: "Nagad",       src: "https://nagad.com.bd/assets/imgs/logo.png"                                                                                  },
    { name: "Rocket",     alt: "Rocket",      src: "https://www.dutchbanglabank.com/images/rocket-logo.png"                                                                     },
  ],

  verifiedBadge: {
    src: "https://backoffice.ghorerbazar.com/company_logo/faysy1756641916.png",
    alt: "Verified by SSLCommerz",
  },

  copyrightName: "GhorerBazar",
};
