import type { Metadata } from "next";
import DonutKpiCard, { type DonutSegment } from "@/components/admin/DonutKpiCard";
import BarKpiCard, { type BarDataPoint } from "@/components/admin/BarKpiCard";
import ProgressKpiCard from "@/components/admin/ProgressKpiCard";
import HeroesKpiCard from "@/components/admin/HeroesKpiCard";
import RecentOrdersCard, { type OrderCategory } from "@/components/admin/RecentOrdersCard";
import SalesChartCard, { type ChartPoint } from "@/components/admin/SalesChartCard";

export const metadata: Metadata = { title: "Admin Dashboard — Harvest" };

/* ── KPI data ───────────────────────────────────────── */

const earningsSegments: DonutSegment[] = [
  { label: "Shoes",  value: 12500, color: "primary" },
  { label: "Gaming", value: 8200,  color: "accent"  },
  { label: "Others", value: 4200,  color: "info"    },
];

const dailySalesData: BarDataPoint[] = [
  { day: "Mon", value: 980  },
  { day: "Tue", value: 1350 },
  { day: "Wed", value: 1120 },
  { day: "Thu", value: 1580 },
  { day: "Fri", value: 1245 },
  { day: "Sat", value: 1890 },
  { day: "Sun", value: 720  },
];

/* ── Recent orders sample data ──────────────────────── */

const HEADPHONE_IMG = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop";
const SHOE_IMG      = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=80&h=80&fit=crop";
const TSHIRT_IMG    = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=80&h=80&fit=crop";
const WATCH_IMG     = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80&h=80&fit=crop";

const recentOrderCategories: OrderCategory[] = [
  {
    key: "headphones",
    label: "Headphones",
    emoji: "🎧",
    rows: [
      { id: "h1", name: "Sony WH-1000XM5",     sku: "SNY-001", image: HEADPHONE_IMG, quantity: 2, price: 12500, total: 25000 },
      { id: "h2", name: "JBL Tune 520BT",        sku: "JBL-002", image: HEADPHONE_IMG, quantity: 1, price:  4800, total:  4800 },
      { id: "h3", name: "Apple AirPods Pro",     sku: "APL-003", image: HEADPHONE_IMG, quantity: 3, price: 28000, total: 84000 },
      { id: "h4", name: "Samsung Galaxy Buds+",  sku: "SMG-004", image: HEADPHONE_IMG, quantity: 2, price:  8500, total: 17000 },
    ],
  },
  {
    key: "shoes",
    label: "Shoes",
    emoji: "👟",
    rows: [
      { id: "s1", name: "Nike Air Max 270",   sku: "NK-001", image: SHOE_IMG, quantity: 1, price:  9500, total:  9500 },
      { id: "s2", name: "Adidas Ultraboost",  sku: "AD-002", image: SHOE_IMG, quantity: 2, price: 14000, total: 28000 },
      { id: "s3", name: "Puma RS-X",          sku: "PM-003", image: SHOE_IMG, quantity: 1, price:  6500, total:  6500 },
      { id: "s4", name: "New Balance 574",    sku: "NB-004", image: SHOE_IMG, quantity: 3, price:  8000, total: 24000 },
    ],
  },
  {
    key: "tshirt",
    label: "T-shirt",
    emoji: "👕",
    rows: [
      { id: "t1", name: "Harvest Premium Tee",     sku: "HP-001", image: TSHIRT_IMG, quantity: 5, price: 1200, total: 6000 },
      { id: "t2", name: "Organic Cotton Shirt",    sku: "OC-002", image: TSHIRT_IMG, quantity: 3, price: 1800, total: 5400 },
      { id: "t3", name: "Sports Performance Tee",  sku: "SP-003", image: TSHIRT_IMG, quantity: 4, price: 1500, total: 6000 },
      { id: "t4", name: "Casual Linen Shirt",      sku: "CL-004", image: TSHIRT_IMG, quantity: 2, price: 2200, total: 4400 },
    ],
  },
  {
    key: "watch",
    label: "Watch",
    emoji: "⌚",
    rows: [
      { id: "w1", name: "Casio G-Shock",         sku: "CSO-001", image: WATCH_IMG, quantity: 1, price:  8500, total:  8500 },
      { id: "w2", name: "Fossil Gen 6",           sku: "FSL-002", image: WATCH_IMG, quantity: 2, price: 15000, total: 30000 },
      { id: "w3", name: "Samsung Galaxy Watch",   sku: "SMG-003", image: WATCH_IMG, quantity: 1, price: 28000, total: 28000 },
      { id: "w4", name: "Amazfit GTR 4",          sku: "AMZ-004", image: WATCH_IMG, quantity: 3, price: 12000, total: 36000 },
    ],
  },
];

/* ── Chart data ─────────────────────────────────────── */

const salesData: ChartPoint[] = [
  { date: "Jun 04", value: 8200  },
  { date: "Jun 07", value: 12400 },
  { date: "Jun 10", value: 9800  },
  { date: "Jun 13", value: 15600 },
  { date: "Jun 16", value: 18350 },
];

const discountedData: ChartPoint[] = [
  { date: "Jun 04", value: 3200 },
  { date: "Jun 07", value: 5800 },
  { date: "Jun 10", value: 4200 },
  { date: "Jun 13", value: 7100 },
  { date: "Jun 16", value: 8750 },
];

const heroAvatars = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
];

/* ── Page ───────────────────────────────────────────── */

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">

      {/* Page title + breadcrumb */}
      <div>
        <h1
          className="text-2xl font-bold"
          style={{ fontFamily: "Plus Jakarta Sans, sans-serif", color: "var(--text)" }}
        >
          eCommerce Dashboard
        </h1>
        <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
          Home &rsaquo; Dashboard
        </p>
      </div>

      {/* ── Two-column grid ─────────────────────────── */}
      {/* Right column (charts) stacks below on laptop; sits beside on xl */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6">

        {/* ── Left column ──────────────────────────── */}
        <div className="space-y-4 min-w-0">

          {/* KPI row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DonutKpiCard
              title="Expected Earnings"
              value={24900}
              delta={2.2}
              segments={earningsSegments}
            />
            <BarKpiCard
              title="Average Daily Sales"
              value={1245}
              delta={1.8}
              data={dailySalesData}
            />
          </div>

          {/* KPI row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ProgressKpiCard
              title="Orders this Month"
              value={1220}
              delta={-3.5}
              current={1220}
              goal={1500}
            />
            <HeroesKpiCard
              title="New Customers this Month"
              value={452}
              delta={5.2}
              heroCount={38}
              avatarUrls={heroAvatars}
            />
          </div>

          {/* Recent orders */}
          <RecentOrdersCard categories={recentOrderCategories} />
        </div>

        {/* ── Right column (charts) ─────────────────── */}
        <div className="space-y-4 min-w-0">
          <SalesChartCard
            title="Sales this months"
            subtitle="Users from all channels"
            value={18350}
            delta={4.2}
            goalGap={1650}
            data={salesData}
            color="success"
          />
          <SalesChartCard
            title="Discounted Product Sales"
            subtitle="Promo & coupon channel"
            value={8750}
            delta={2.1}
            goalGap={1250}
            data={discountedData}
            color="info"
          />
        </div>
      </div>
    </div>
  );
}
