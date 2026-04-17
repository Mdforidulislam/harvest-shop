import Image from "next/image";
import Link from "next/link";
import { Leaf, Heart, Users, Award } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "About Us — Our Story & Mission" };

const team = [
  { name: "Ariful Islam", role: "Founder & CEO", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" },
  { name: "Nadia Rahman", role: "Head of Sourcing", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop" },
  { name: "Dr. Fatema Islam", role: "Nutritionist", avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop" },
  { name: "Mahmud Hasan", role: "Head of Logistics", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop" },
];

const values = [
  { icon: Leaf, title: "100% Organic", desc: "We work exclusively with farms that use zero synthetic pesticides or fertilizers." },
  { icon: Heart, title: "Community First", desc: "Fair pricing for farmers, fair pricing for customers. No exploitation in our supply chain." },
  { icon: Users, title: "Transparent Sourcing", desc: "Every product page tells you exactly where the product came from and how it was processed." },
  { icon: Award, title: "Quality Guaranteed", desc: "Third-party lab testing on every batch. We publish the results openly." },
];

const milestones = [
  { year: "2020", event: "Founded in a small Dhaka apartment with 3 honey products" },
  { year: "2021", event: "Partnered with 50+ farmers across Bangladesh" },
  { year: "2022", event: "Expanded to 200+ products, launched same-day Dhaka delivery" },
  { year: "2023", event: "BSTI certification for all products, launched mobile app" },
  { year: "2024", event: "10,000+ happy customers, expanded to 8 product categories" },
  { year: "2026", event: "200+ farmer partners, nationwide delivery in 48 hours" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <Image src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1400&h=500&fit=crop" alt="Farm" fill className="object-cover" sizes="100vw" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,rgba(47,107,58,0.9) 0%,rgba(47,107,58,0.6) 100%)" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 text-center text-white">
          <span className="badge badge-accent mb-4">Est. 2020</span>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
            Pure. Honest. Organic.
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            We started Harvest because we believed Bangladeshi families deserved better than adulterated food products. Six years later, we're proud to serve 10,000+ households with 200+ certified organic products.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="badge badge-primary mb-3">Our Story</span>
            <h2 className="section-title mb-4">From a Kitchen Experiment to Bangladesh's Trusted Organic Brand</h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>
              It started when our founder couldn't find genuine Sundarban honey in Dhaka's supermarkets. Everything was diluted, processed, or mislabeled. So he drove to the Sundarbans himself and brought back 20 jars of real honey.
            </p>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
              His friends and family loved it so much that word spread quickly. Within six months, he had 200 regular customers. Today, Harvest partners with over 200 small farms across Bangladesh, cutting out middlemen and bringing farm-direct products to your doorstep.
            </p>
            <Link href="/category/all" className="btn-lg btn-primary inline-flex">Shop Our Collection</Link>
          </div>
          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <Image src="https://images.unsplash.com/photo-1543362906-acfc16c67564?w=600&h=600&fit=crop" alt="Our farm" fill className="object-cover" sizes="(max-width:1024px) 100vw,50vw" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: "var(--surface-2)" }}>
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="text-center mb-10">
            <h2 className="section-title mb-2">What We Stand For</h2>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>Our values guide every decision we make</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="card p-6 text-center">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4" style={{ background: "var(--primary-soft)" }}>
                  <Icon size={24} style={{ color: "var(--primary)" }} />
                </div>
                <h3 className="font-bold text-base mb-2" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>{title}</h3>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="section-title text-center mb-10">Our Journey</h2>
        <div className="space-y-6">
          {milestones.map((m) => (
            <div key={m.year} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-white flex-shrink-0" style={{ background: "var(--primary)" }}>{m.year.slice(2)}</div>
                <div className="w-0.5 flex-1 mt-1" style={{ background: "var(--border)", minHeight: "20px" }} />
              </div>
              <div className="pb-4">
                <span className="font-bold text-sm" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--primary)" }}>{m.year}</span>
                <p className="text-sm mt-0.5" style={{ color: "var(--text)" }}>{m.event}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section style={{ background: "var(--surface)" }}>
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="section-title text-center mb-10">The Team</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="relative w-24 h-24 rounded-full overflow-hidden mx-auto mb-3 ring-4 ring-[var(--primary-soft)]">
                  <Image src={member.avatar} alt={member.name} fill className="object-cover" sizes="96px" />
                </div>
                <h3 className="font-bold text-sm" style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}>{member.name}</h3>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
