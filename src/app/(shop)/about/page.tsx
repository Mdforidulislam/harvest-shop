"use client";
import Image from "next/image";
import Link from "next/link";
import { Leaf, Heart, Users, Award, Sparkles, MapPin, Star, ShieldCheck, ChevronRight, Globe, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const team = [
  { name: "Ariful Islam", role: "Founder & CEO", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop" },
  { name: "Nadia Rahman", role: "Head of Sourcing", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop" },
  { name: "Dr. Fatema Islam", role: "Nutritionist", avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop" },
  { name: "Mahmud Hasan", role: "Head of Logistics", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop" },
];

const values = [
  { icon: Leaf, title: "100% Organic", desc: "No synthetic pesticides. No fertilizers. Just pure biology in every harvest." },
  { icon: Heart, title: "Ethical First", desc: "We ensure fair wages for our farmers, empowering rural communities directly." },
  { icon: Globe, title: "Farm Traceability", desc: "Scan any product to see exactly which farm it came from and who harvested it." },
  { icon: ShieldCheck, title: "Certified Lab-Pure", desc: "Third-party NMR testing on every batch ensures zero adulteration." },
];

const milestones = [
  { year: "2020", event: "Founded in a small Dhaka apartment with 3 honey samples and a big dream." },
  { year: "2021", event: "Secured partnerships with 50+ marginal farmers in the Sundarbans." },
  { year: "2022", event: "Expanded to 200+ products and launched our cold-pressed oil facility." },
  { year: "2023", event: "Achieved full BSTI certification and launched our community app." },
  { year: "2024", event: "Reached 15,000+ happy families and opened physical Experience Center." },
  { year: "2026", event: "Leading Bangladesh&apos;s organic revolution with nationwide cold-chain delivery." },
];

export default function AboutPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=1920&h=1080&fit=crop"
            alt="Organic Farm"
            fill
            className="object-cover scale-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary)]/95 via-[var(--primary)]/80 to-[var(--bg)]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 mb-8 text-xs font-black uppercase tracking-widest">
              <Sparkles size={14} className="text-yellow-400" />
              <span>Established 2020</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white mb-8 leading-[1.1] tracking-tighter" style={{ fontFamily: "Plus Jakarta Sans, sans-serif" }}>
              Purity is Our <br /> <span className="text-[var(--accent)]">Only Ingredient.</span>
            </h1>
            <p className="text-white/80 text-lg md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
              Harvest was born out of a simple need: a father&apos;s search for pure honey. Today, we bridge the gap between marginal farmers and modern tables.
            </p>
          </motion.div>
        </div>

        {/* Floating Stats */}
        <div className="absolute bottom-0 left-0 right-0 h-32 flex items-center justify-center">
          <div className="max-w-7xl w-full px-4 grid grid-cols-2 md:grid-cols-4 gap-4 translate-y-12">
            {[
              { l: "Farmers", v: "200+" },
              { l: "Families", v: "15k+" },
              { l: "Products", v: "250+" },
              { l: "Awards", v: "12" }
            ].map((s, i) => (
              <div key={i} className="bg-[var(--surface)] p-6 rounded-[2rem] shadow-2xl border border-[var(--border)] text-center">
                <p className="text-3xl font-black text-[var(--primary)]">{s.v}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] opacity-60 mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="max-w-7xl mx-auto px-4 py-32 md:py-48">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-[2px] bg-[var(--primary)]" />
              <span className="text-sm font-black uppercase tracking-widest text-[var(--primary)]">Our Origin</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight" style={{ color: "var(--text)" }}>From a Kitchen Jar to Nationwide Purity</h2>
            <div className="space-y-6 text-lg font-medium text-[var(--text-muted)] leading-relaxed">
              <p>
                It started when our founder, Ariful Islam, couldn&apos;t find genuine Sundarban honey for his young daughter in Dhaka&apos;s local supermarkets. Every jar was mislabeled or heavily processed.
              </p>
              <p>
                So he drove 350 miles to the Sundarbans himself, meeting local mouals (honey hunters). He brought back just 20 jars. His friends loved it so much that he had to go back next week. And the week after.
              </p>
              <div className="p-8 bg-[var(--primary-soft)] rounded-[2.5rem] border-l-8 border-[var(--primary)] mt-10">
                <p className="text-[var(--primary)] italic font-bold text-xl">
                  &quot;Success doesn&apos;t mean profit anymore. It means the 15,000 families who trust us with their health every day.&quot;
                </p>
                <div className="mt-6 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-white">
                    <Image src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="Ariful Islam" width={48} height={48} />
                  </div>
                  <div>
                    <p className="font-black text-sm text-[var(--primary)]">Ariful Islam</p>
                    <p className="text-xs font-bold opacity-60 text-[var(--primary)] text-left">Founder of Harvest</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl z-10"
            >
              <Image
                src="https://images.unsplash.com/photo-1543362906-acfc16c67564?w=800&h=800&fit=crop"
                alt="Sustainable Farming"
                fill
                className="object-cover"
              />
            </motion.div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[var(--accent)]/10 rounded-full blur-[100px]" />
            <div className="absolute -top-10 -left-10 w-64 h-64 bg-[var(--primary)]/10 rounded-full blur-[100px]" />

            {/* Badge Overlay */}
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-[2rem] shadow-2xl z-20 border border-[var(--border)] max-w-[180px]">
              <div className="flex items-center gap-2 mb-2">
                <Star size={16} fill="var(--warning)" className="text-warning" />
                <Star size={16} fill="var(--warning)" className="text-warning" />
                <Star size={16} fill="var(--warning)" className="text-warning" />
              </div>
              <p className="text-[10px] font-black uppercase text-[var(--text)] leading-tight">Voted Most Trusted Organic Brand 2024</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32" style={{ background: "var(--surface-2)" }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black mb-4">Our Core Rituals</h2>
            <p className="text-lg font-bold opacity-60 max-w-xl mx-auto">These aren&apos;t just values; they are daily rituals that define our purity.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map(({ icon: Icon, title, desc }, idx) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group flex flex-col p-10 rounded-[3rem] bg-white border border-[var(--border)] hover:shadow-2xl hover:shadow-black/5 transition-all hover:-translate-y-2"
              >
                <div className="w-16 h-16 rounded-[1.5rem] bg-[var(--primary-soft)] flex items-center justify-center mb-8 group-hover:rotate-6 transition-transform">
                  <Icon size={32} className="text-[var(--primary)]" />
                </div>
                <h3 className="text-2xl font-black mb-4" style={{ color: "var(--text)" }}>{title}</h3>
                <p className="text-sm font-medium leading-relaxed text-[var(--text-muted)]">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="max-w-5xl mx-auto px-4 py-32 md:py-48">
        <div className="flex items-center justify-center gap-4 mb-20 text-center">
          <TrendingUp size={32} className="text-[var(--primary)]" />
          <h2 className="text-4xl md:text-6xl font-black">Our Evolution</h2>
        </div>

        <div className="relative space-y-16">
          {/* Central Line */}
          <div className="absolute left-6 md:left-1/2 top-10 bottom-10 w-1 bg-gradient-to-b from-[var(--primary)] via-[var(--accent)] to-[var(--primary-soft)] -translate-x-1/2 opacity-20 hidden md:block" />

          {milestones.map((m, idx) => (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}`}
            >
              <div className="flex-1 w-full text-center md:text-left hidden md:block">
                {idx % 2 !== 0 && (
                  <div className="p-8 rounded-[2.5rem] bg-[var(--surface-2)] border border-[var(--border)] shadow-xl shadow-black/5">
                    <span className="text-6xl font-black opacity-10 mb-4 block" style={{ WebkitTextStroke: "1px var(--text)" }}>{m.year}</span>
                    <p className="text-lg font-bold text-[var(--text-muted)] leading-relaxed">{m.event}</p>
                  </div>
                )}
              </div>

              <div className="relative z-10 w-16 h-16 rounded-full bg-white border-8 border-[var(--primary-soft)] flex items-center justify-center shadow-2xl flex-shrink-0">
                <div className="w-4 h-4 rounded-full bg-[var(--primary)]" />
              </div>

              <div className="flex-1 w-full text-center md:text-left">
                {(idx % 2 === 0 || typeof window !== 'undefined' && window.innerWidth < 768) && (
                  <div className={`p-8 rounded-[2.5rem] bg-[var(--surface-2)] border border-[var(--border)] shadow-xl shadow-black/5 ${idx % 2 === 0 ? "md:text-left" : "md:text-left"}`}>
                    <span className="text-6xl font-black opacity-10 mb-4 block" style={{ WebkitTextStroke: "1px var(--text)" }}>{m.year}</span>
                    <p className="text-lg font-bold text-[var(--text-muted)] leading-relaxed text-left md:text-left">{m.event}</p>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="py-32 relative overflow-hidden" style={{ background: "var(--surface)" }}>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black mb-6">Faces Behind the Basket</h2>
            <p className="text-lg font-bold opacity-60">Passionate humans dedicated to your well-being.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-12">
            {team.map((member, idx) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center group"
              >
                <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-[3rem] overflow-hidden mx-auto mb-8 shadow-2xl transition-all group-hover:-translate-y-4 group-hover:rotate-3">
                  <Image src={member.avatar} alt={member.name} fill className="object-cover transition-transform group-hover:scale-110" sizes="224px" />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-0 right-0">
                    <div className="flex justify-center gap-3">
                      <Link href="#" className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors">
                        <Globe size={14} className="text-white group-hover:text-black" />
                      </Link>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-black mb-1" style={{ color: "var(--text)" }}>{member.name}</h3>
                <p className="text-sm font-bold uppercase tracking-widest text-[var(--primary)]">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-32 md:py-48 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-7xl font-black mb-8 leading-tight">Ready to taste <br /><span className="text-[var(--primary)]">true purity?</span></h2>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/category/all" className="h-16 px-12 rounded-2xl bg-[var(--primary)] text-white font-black flex items-center justify-center text-xl shadow-2xl shadow-green-900/30 hover:scale-105 active:scale-95 transition-all">
              Start Your Harvest
            </Link>
            <Link href="/contact" className="h-16 px-12 rounded-2xl border-2 border-[var(--primary)] text-[var(--primary)] font-black flex items-center justify-center text-xl hover:bg-[var(--primary)] hover:text-white transition-all">
              Join Our Mission
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
