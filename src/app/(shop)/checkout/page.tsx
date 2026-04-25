"use client";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Trash2, Check, ChevronDown, ShoppingBag, MessageCircle,
  Banknote, CreditCard, Smartphone, Minus, Plus, Tag,
  ChevronRight, Lock, Loader2, X, ShoppingCart,
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import {
  selectCartItems, selectCartTotal, selectCartCount,
  selectCoupon, removeFromCart, updateQty, clearCart, applyCoupon,
} from "@/features/cart/cartSlice";
import { formatPrice } from "@/lib/utils";

/* ─── Data ────────────────────────────────────────────── */
const DISTRICTS = [
  "Barguna", "Barisal", "Bhola", "Jhalokathi", "Patuakhali", "Pirojpur",
  "Bandarban", "Brahmanbaria", "Chandpur", "Chittagong", "Comilla",
  "Cox's Bazar", "Feni", "Khagrachhari", "Lakshmipur", "Noakhali", "Rangamati",
  "Dhaka", "Faridpur", "Gazipur", "Gopalganj", "Kishoreganj", "Madaripur",
  "Manikganj", "Munshiganj", "Narayanganj", "Narsingdi", "Rajbari", "Shariatpur", "Tangail",
  "Bagerhat", "Chuadanga", "Jessore", "Jhenaidah", "Khulna", "Kushtia",
  "Magura", "Meherpur", "Narail", "Satkhira",
  "Jamalpur", "Mymensingh", "Netrokona", "Sherpur",
  "Bogura", "Joypurhat", "Naogaon", "Nawabganj", "Natore", "Pabna", "Rajshahi", "Sirajganj",
  "Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari",
  "Panchagarh", "Rangpur", "Thakurgaon",
  "Habiganj", "Moulvibazar", "Sunamganj", "Sylhet",
].sort();

const THANAS: Record<string, string[]> = {
  Dhaka: [
    "Adabor", "Badda", "Banani", "Cantonment", "Chawkbazar", "Dhanmondi",
    "Demra", "Gendaria", "Gulshan", "Hazaribagh", "Jatrabari", "Khilgaon",
    "Kotwali", "Lalbagh", "Mirpur", "Mohammadpur", "Motijheel", "Mugda",
    "New Market", "Pallabi", "Rampura", "Sabujbagh", "Shah Ali",
    "Sher-e-Bangla Nagar", "Sutrapur", "Tejgaon", "Turag", "Uttara", "Wari",
  ],
  Chittagong: [
    "Akbarshah", "Bakalia", "Bayazid", "Chandgaon", "Double Mooring",
    "Halishahar", "Karnaphuli", "Khulshi", "Kotwali", "Pahartali",
    "Panchlaish", "Patenga", "Sadarghat",
  ],
  Gazipur: ["Gazipur Sadar", "Kaliakair", "Kaliganj", "Kapasia", "Sreepur", "Tongi"],
  Narayanganj: ["Araihazar", "Bandar", "Narayanganj Sadar", "Rupganj", "Sonargaon"],
  Sylhet: [
    "Beanibazar", "Bishwanath", "Companiganj", "Fenchuganj",
    "Golapganj", "Gowainghat", "Jaintiapur", "Kanaighat", "Osmaninagar", "Sylhet Sadar",
  ],
  Rajshahi: ["Boalia", "Charghat", "Durgapur", "Godagari", "Motihar", "Paba", "Rajshahi Sadar", "Tanore"],
  Khulna: ["Batiaghata", "Dacope", "Dighalia", "Dumuria", "Khalishpur", "Khulna Sadar", "Paikgachha", "Rupsa"],
  Bogura: ["Adamdighi", "Bogura Sadar", "Dhunat", "Gabtali", "Kahaloo", "Nandigram", "Sariakandi", "Sherpur", "Shibganj"],
};

const PAYMENT_METHODS = [
  { id: "cod", label: "Cash on Delivery", sub: "Pay at your doorstep", Icon: Banknote },
  { id: "online", label: "Online Payment", sub: "Visa, Mastercard, Amex", Icon: CreditCard },
  { id: "bkash", label: "bKash", sub: "Merchant: 01711223344", Icon: Smartphone },
] as const;

type PaymentId = typeof PAYMENT_METHODS[number]["id"];

/* ─── Shared styles ──────────────────────────────────── */
const INPUT =
  "w-full h-11 px-3 text-[14px] rounded-[6px] border border-[var(--border)] " +
  "bg-[var(--surface)] text-[var(--text)] outline-none transition-colors " +
  "focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/10 " +
  "placeholder:text-[var(--text-muted)]";

const INPUT_ERR = " border-[var(--danger)] focus:border-[var(--danger)] focus:ring-[var(--danger)]/10";

const SELECT =
  "w-full h-11 px-3 text-[14px] rounded-[6px] border border-[var(--border)] " +
  "bg-[var(--surface)] text-[var(--text)] outline-none transition-colors cursor-pointer " +
  "focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/10";

/* ─── Sub-components ─────────────────────────────────── */
function Card({ children, noPad }: { children: React.ReactNode; noPad?: boolean }) {
  return (
    <div className={`bg-[var(--surface)] rounded-[8px] border border-[var(--border)] shadow-sm ${noPad ? "" : "p-5 sm:p-6"}`}>
      {children}
    </div>
  );
}

function CardTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className="w-[3px] h-[18px] bg-[var(--accent)] rounded-full shrink-0" aria-hidden="true" />
      <h2 className="text-[15px] font-bold text-[var(--text)]">{children}</h2>
    </div>
  );
}

function FieldError({ id, msg }: { id?: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p id={id} role="alert" aria-live="polite" className="mt-1 text-[12px] text-[var(--danger)]">
      {msg}
    </p>
  );
}

function Label({ htmlFor, required, children }: { htmlFor: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block text-[12px] font-semibold text-[var(--text-muted)] uppercase tracking-wide mb-1.5">
      {children}{required && <span className="text-[var(--danger)] ml-0.5" aria-hidden="true">*</span>}
    </label>
  );
}

/* ─── Main page ──────────────────────────────────────── */
export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectCartTotal);
  const cartCount = useAppSelector(selectCartCount);
  const coupon = useAppSelector(selectCoupon);

  const [form, setForm] = useState({
    name: "", phone: "", district: "", thana: "", address: "",
    billingName: "", billingDistrict: "", billingThana: "", billingAddress: "",
    notes: "", couponInput: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sameAddress, setSameAddress] = useState(true);
  const [payment, setPayment] = useState<PaymentId>("cod");
  const [couponOpen, setCouponOpen] = useState(false);
  const [couponBusy, setCouponBusy] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [placing, setPlacing] = useState(false);

  const delivery = form.district && form.district !== "Dhaka" ? 130 : 60;
  const grandTotal = Math.max(0, cartTotal + delivery - coupon.discount);
  const thanas = form.district ? (THANAS[form.district] ?? []) : [];
  const billingThanas = form.billingDistrict ? (THANAS[form.billingDistrict] ?? []) : [];

  function validate(field: string, value: string): string {
    if (field === "name") return value.trim() ? "" : "Full name is required";
    if (field === "phone") return /^01[3-9]\d{8}$/.test(value) ? "" : "Enter a valid BD phone (01XXXXXXXXX)";
    if (field === "district") return value ? "" : "Please select a district";
    if (field === "address") return value.trim().length >= 5 ? "" : "Please enter your full address";
    return "";
  }

  function handleChange(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: validate(field, value) }));
  }

  function handleBlur(field: string) {
    setErrors((e) => ({ ...e, [field]: validate(field, (form as Record<string, string>)[field] ?? "") }));
  }

  const isValid = useMemo(
    () =>
      agreed &&
      form.name.trim() !== "" &&
      /^01[3-9]\d{8}$/.test(form.phone) &&
      form.district !== "" &&
      form.address.trim().length >= 5,
    [agreed, form.name, form.phone, form.district, form.address]
  );

  async function handleCoupon() {
    if (!form.couponInput.trim()) return;
    setCouponBusy(true);
    await new Promise((r) => setTimeout(r, 700));
    const code = form.couponInput.trim().toUpperCase();
    const map: Record<string, number> = {
      HONEY10: Math.round(cartTotal * 0.1),
      WELCOME50: 50,
      HARVEST20: Math.round(cartTotal * 0.2),
    };
    if (map[code]) {
      dispatch(applyCoupon({ code, discount: map[code] }));
      setErrors((e) => ({ ...e, coupon: "" }));
    } else {
      setErrors((e) => ({ ...e, coupon: "Invalid coupon code. Try HONEY10 or WELCOME50." }));
    }
    setCouponBusy(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newErr = {
      name: validate("name", form.name),
      phone: validate("phone", form.phone),
      district: validate("district", form.district),
      address: validate("address", form.address),
    };
    setErrors(newErr);
    if (Object.values(newErr).some(Boolean) || !agreed) return;

    setPlacing(true);
    await new Promise((r) => setTimeout(r, 1800));
    const orderId = "HRV-" + Math.floor(100000 + Math.random() * 900000);
    dispatch(clearCart());
    router.push(`/order-success?id=${orderId}`);
  }

  /* Empty cart */
  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-[var(--bg)] px-4">
        <div className="text-center">
          <ShoppingCart size={48} className="mx-auto mb-4 text-[var(--text-muted)]" />
          <h2 className="text-[20px] font-bold text-[var(--text)] mb-2">Your cart is empty</h2>
          <p className="text-[14px] text-[var(--text-muted)] mb-6">Add products before checking out.</p>
          <Link
            href="/category/all"
            className="h-11 px-6 bg-[var(--accent)] text-white rounded-[6px] font-semibold text-[14px] inline-flex items-center hover:opacity-90 transition-opacity"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--bg)] min-h-screen pb-24 lg:pb-10">

      {/* ── Page Header ──────────────────────────────── */}
      <div className="bg-[var(--surface)] border-b border-[var(--border)]">
        <div className="max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-center relative">
          <h1 className="text-[18px] font-bold text-[var(--text)]">Checkout</h1>
          <nav
            aria-label="Breadcrumb"
            className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 text-[12px] text-[var(--text-muted)]"
          >
            <Link href="/" className="hover:text-[var(--accent)] transition-colors">Home</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <span className="text-[var(--text)] font-medium" aria-current="page">Checkout</span>
          </nav>
        </div>
      </div>

      {/* ── Login / Register Banner ───────────────────── */}
      <div className="bg-[var(--surface-2)] border-b border-[var(--border)]">
        <div className="max-w-screen-xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[13px] text-[var(--text-muted)]">
            Have any account? please{" "}
            <Link href="/login" className="text-[var(--accent)] font-semibold hover:underline">
              login
            </Link>{" "}
            or{" "}
            <Link href="/register" className="text-[var(--accent)] font-semibold hover:underline">
              register
            </Link>
          </p>
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="h-8 px-4 border border-[var(--accent)] text-[var(--accent)] text-[12px] font-semibold rounded-[6px] inline-flex items-center hover:bg-[var(--accent-soft)] transition-colors"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="h-8 px-4 bg-[var(--accent)] text-white text-[12px] font-semibold rounded-[6px] inline-flex items-center hover:opacity-90 transition-opacity"
            >
              Register
            </Link>
          </div>
        </div>
      </div>

      {/* ── Body ─────────────────────────────────────── */}
      <div className="max-w-screen-xl mx-auto px-4 py-6">
        <form id="checkout-form" onSubmit={handleSubmit} noValidate>
          <div className="flex flex-col lg:flex-row gap-5 items-start">

            {/* ═══════════════════════════════════════
                LEFT COLUMN  — 60%
            ═══════════════════════════════════════ */}
            <div className="w-full lg:w-[60%] space-y-5">

              {/* 1 · Order Review ─────────────────── */}
              <Card>
                <CardTitle>Order Review</CardTitle>
                <div className="space-y-4" role="list" aria-label="Items in your order">
                  {items.map((item) => (
                    <div key={item.id} role="listitem" className="flex gap-3 items-start py-3 border-b border-[var(--border)] last:border-b-0 last:pb-0 first:pt-0">
                      {/* Thumb */}
                      <div className="relative w-[60px] h-[60px] shrink-0 rounded-[6px] overflow-hidden bg-[var(--surface-2)] border border-[var(--border)]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="60px"
                          className="object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-[var(--text)] line-clamp-2 leading-snug mb-2">
                          {item.name}
                        </p>
                        <div className="flex flex-wrap items-center gap-3">
                          {/* Qty stepper */}
                          <div
                            role="group"
                            aria-label={`Quantity for ${item.name}`}
                            className="flex items-center border border-[var(--border)] rounded-[6px] overflow-hidden bg-[var(--surface-2)] h-8"
                          >
                            <button
                              type="button"
                              aria-label={`Decrease quantity of ${item.name}`}
                              disabled={item.qty <= 1}
                              onClick={() => dispatch(updateQty({ id: item.id, qty: item.qty - 1 }))}
                              className="w-8 h-8 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--border)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                              <Minus size={12} />
                            </button>
                            <span
                              aria-live="polite"
                              className="w-8 text-center text-[13px] font-bold text-[var(--text)] select-none"
                            >
                              {item.qty}
                            </span>
                            <button
                              type="button"
                              aria-label={`Increase quantity of ${item.name}`}
                              disabled={item.qty >= item.stock}
                              onClick={() => dispatch(updateQty({ id: item.id, qty: item.qty + 1 }))}
                              className="w-8 h-8 flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--border)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                              <Plus size={12} />
                            </button>
                          </div>

                          {/* Line total */}
                          <span className="text-[14px] font-bold text-[var(--accent)]">
                            {formatPrice(item.price * item.qty)}
                          </span>

                          {/* Delete */}
                          <button
                            type="button"
                            aria-label={`Remove ${item.name} from order`}
                            onClick={() => dispatch(removeFromCart({ id: item.id }))}
                            className="ml-auto w-8 h-8 flex items-center justify-center rounded-[6px] text-[var(--danger)] hover:bg-[var(--danger)]/10 transition-colors"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* 2 · Shipping Address ─────────────── */}
              <Card>
                <CardTitle>Shipping Address</CardTitle>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <Label htmlFor="sh-name" required>Full Name</Label>
                    <input
                      id="sh-name"
                      type="text"
                      autoComplete="name"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "sh-name-err" : undefined}
                      value={form.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      onBlur={() => handleBlur("name")}
                      placeholder="e.g. Ariful Islam"
                      className={INPUT + (errors.name ? INPUT_ERR : "")}
                    />
                    <FieldError id="sh-name-err" msg={errors.name} />
                  </div>

                  {/* Phone */}
                  <div className="sm:col-span-2">
                    <Label htmlFor="sh-phone" required>Phone Number</Label>
                    <div className="flex">
                      <span
                        className="h-11 px-3 shrink-0 flex items-center bg-[var(--surface-2)] border border-r-0 border-[var(--border)] rounded-l-[6px] text-[14px] font-medium text-[var(--text-muted)] select-none"
                        aria-label="Bangladesh country code +88"
                      >
                        +88
                      </span>
                      <input
                        id="sh-phone"
                        type="tel"
                        maxLength={11}
                        autoComplete="tel-national"
                        required
                        aria-required="true"
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? "sh-phone-err" : undefined}
                        aria-label="Phone number, without country code"
                        value={form.phone}
                        onChange={(e) => handleChange("phone", e.target.value.replace(/\D/g, ""))}
                        onBlur={() => handleBlur("phone")}
                        placeholder="01XXXXXXXXX"
                        className={
                          "flex-1 h-11 px-3 text-[14px] rounded-r-[6px] border border-[var(--border)] " +
                          "bg-[var(--surface)] text-[var(--text)] outline-none transition-colors " +
                          "focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/10 " +
                          "placeholder:text-[var(--text-muted)]" +
                          (errors.phone ? " " + INPUT_ERR.trim() : "")
                        }
                      />
                    </div>
                    <FieldError id="sh-phone-err" msg={errors.phone} />
                  </div>

                  {/* District */}
                  <div>
                    <Label htmlFor="sh-district" required>District</Label>
                    <select
                      id="sh-district"
                      required
                      aria-required="true"
                      aria-invalid={!!errors.district}
                      aria-describedby={errors.district ? "sh-district-err" : undefined}
                      value={form.district}
                      onChange={(e) => {
                        handleChange("district", e.target.value);
                        setForm((f) => ({ ...f, thana: "" }));
                      }}
                      onBlur={() => handleBlur("district")}
                      className={SELECT + (errors.district ? INPUT_ERR : "")}
                    >
                      <option value="">Select District</option>
                      {DISTRICTS.map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                    <FieldError id="sh-district-err" msg={errors.district} />
                  </div>

                  {/* Thana */}
                  <div>
                    <Label htmlFor="sh-thana">
                      Thana{" "}
                      <span className="text-[11px] text-[var(--text-muted)] normal-case tracking-normal font-normal">
                        (optional)
                      </span>
                    </Label>
                    <select
                      id="sh-thana"
                      value={form.thana}
                      onChange={(e) => handleChange("thana", e.target.value)}
                      disabled={thanas.length === 0}
                      className={SELECT + " disabled:opacity-50 disabled:cursor-not-allowed"}
                    >
                      <option value="">
                        {thanas.length ? "Select Thana" : "Select district first"}
                      </option>
                      {thanas.map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  {/* Address */}
                  <div className="sm:col-span-2">
                    <Label htmlFor="sh-address" required>Full Address</Label>
                    <textarea
                      id="sh-address"
                      rows={3}
                      required
                      aria-required="true"
                      aria-invalid={!!errors.address}
                      aria-describedby={errors.address ? "sh-address-err" : undefined}
                      value={form.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                      onBlur={() => handleBlur("address")}
                      placeholder="House no, Road no, Area, Landmark..."
                      className={
                        "w-full px-3 py-2.5 text-[14px] rounded-[6px] border border-[var(--border)] " +
                        "bg-[var(--surface)] text-[var(--text)] outline-none transition-colors resize-none " +
                        "focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/10 " +
                        "placeholder:text-[var(--text-muted)]" +
                        (errors.address ? " " + INPUT_ERR.trim() : "")
                      }
                    />
                    <FieldError id="sh-address-err" msg={errors.address} />
                  </div>
                </div>
              </Card>

              {/* 3 · Billing Address ──────────────── */}
              <Card>
                <CardTitle>Billing Address</CardTitle>
                <div
                  role="radiogroup"
                  aria-label="Billing address options"
                  className="space-y-3"
                >
                  {/* Same as shipping */}
                  <button
                    type="button"
                    role="radio"
                    aria-checked={sameAddress}
                    onClick={() => setSameAddress(true)}
                    className="w-full flex items-center justify-between text-left cursor-pointer group"
                  >
                    <span className="text-[14px] text-[var(--text)]">Same as shipping address</span>
                    <span
                      className={[
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all",
                        sameAddress
                          ? "border-[var(--accent)] bg-[var(--accent)]"
                          : "border-[var(--border)] group-hover:border-[var(--accent)]/60",
                      ].join(" ")}
                    >
                      {sameAddress && <span className="w-2 h-2 rounded-full bg-white" />}
                    </span>
                  </button>

                  {/* Different address */}
                  <button
                    type="button"
                    role="radio"
                    aria-checked={!sameAddress}
                    onClick={() => setSameAddress(false)}
                    className="w-full flex items-center justify-between text-left cursor-pointer group"
                  >
                    <span className="text-[14px] text-[var(--text)]">Use a different billing address</span>
                    <span
                      className={[
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all",
                        !sameAddress
                          ? "border-[var(--accent)] bg-[var(--accent)]"
                          : "border-[var(--border)] group-hover:border-[var(--accent)]/60",
                      ].join(" ")}
                    >
                      {!sameAddress && <span className="w-2 h-2 rounded-full bg-white" />}
                    </span>
                  </button>
                </div>

                {/* Expanded billing fields */}
                {!sameAddress && (
                  <div className="mt-5 pt-5 border-t border-[var(--border)] grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <Label htmlFor="bl-name">Full Name</Label>
                      <input
                        id="bl-name"
                        type="text"
                        autoComplete="billing name"
                        value={form.billingName}
                        onChange={(e) => handleChange("billingName", e.target.value)}
                        placeholder="Billing contact name"
                        className={INPUT}
                      />
                    </div>
                    <div>
                      <Label htmlFor="bl-district">District</Label>
                      <select
                        id="bl-district"
                        value={form.billingDistrict}
                        onChange={(e) => {
                          handleChange("billingDistrict", e.target.value);
                          setForm((f) => ({ ...f, billingThana: "" }));
                        }}
                        className={SELECT}
                      >
                        <option value="">Select District</option>
                        {DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="bl-thana">Thana</Label>
                      <select
                        id="bl-thana"
                        value={form.billingThana}
                        onChange={(e) => handleChange("billingThana", e.target.value)}
                        disabled={billingThanas.length === 0}
                        className={SELECT + " disabled:opacity-50 disabled:cursor-not-allowed"}
                      >
                        <option value="">
                          {billingThanas.length ? "Select Thana" : "Select district first"}
                        </option>
                        {billingThanas.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <Label htmlFor="bl-address">Full Address</Label>
                      <textarea
                        id="bl-address"
                        rows={3}
                        value={form.billingAddress}
                        onChange={(e) => handleChange("billingAddress", e.target.value)}
                        placeholder="Billing address..."
                        className={
                          "w-full px-3 py-2.5 text-[14px] rounded-[6px] border border-[var(--border)] " +
                          "bg-[var(--surface)] text-[var(--text)] outline-none transition-colors resize-none " +
                          "focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/10 " +
                          "placeholder:text-[var(--text-muted)]"
                        }
                      />
                    </div>
                  </div>
                )}
              </Card>
            </div>

            {/* ═══════════════════════════════════════
                RIGHT COLUMN  — 40%, sticky
            ═══════════════════════════════════════ */}
            <div className="w-full lg:w-[40%] lg:sticky lg:top-4 space-y-4">

              {/* 1 · Payment Method ────────────────── */}
              <Card>
                <CardTitle>Payment Method</CardTitle>
                <div className="space-y-3" role="radiogroup" aria-label="Select payment method">
                  {PAYMENT_METHODS.map(({ id, label, sub, Icon }) => (
                    <label
                      key={id}
                      className={[
                        "flex items-center gap-3 p-3 rounded-[6px] border-2 cursor-pointer transition-all",
                        payment === id
                          ? "border-[var(--accent)] bg-[var(--accent)]/5"
                          : "border-[var(--border)] bg-[var(--surface-2)] hover:border-[var(--accent)]/40",
                      ].join(" ")}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={id}
                        checked={payment === id}
                        onChange={() => setPayment(id)}
                        className="sr-only"
                      />
                      <div
                        className={[
                          "w-9 h-9 rounded-[6px] flex items-center justify-center shrink-0 transition-colors",
                          payment === id
                            ? "bg-[var(--accent)] text-white"
                            : "bg-[var(--surface)] text-[var(--text-muted)] border border-[var(--border)]",
                        ].join(" ")}
                      >
                        <Icon size={17} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-[var(--text)]">{label}</p>
                        <p className="text-[11px] text-[var(--text-muted)]">{sub}</p>
                      </div>
                      {payment === id && (
                        <Check size={15} className="text-[var(--accent)] shrink-0" aria-hidden="true" />
                      )}
                    </label>
                  ))}
                </div>
              </Card>

              {/* 2 · Coupon ─────────────────────────── */}
              <Card noPad>
                <button
                  type="button"
                  onClick={() => setCouponOpen((o) => !o)}
                  aria-expanded={couponOpen}
                  className="w-full flex items-center justify-between px-5 py-4 text-[13px] font-semibold text-[var(--text)] hover:text-[var(--accent)] transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Tag size={14} className="text-[var(--accent)]" aria-hidden="true" />
                    Have any coupon or gift voucher?
                  </span>
                  <ChevronDown
                    size={15}
                    aria-hidden="true"
                    className={`text-[var(--text-muted)] transition-transform duration-200 ${couponOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {couponOpen && (
                  <div className="px-5 pb-5 border-t border-[var(--border)] pt-4 space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        aria-label="Coupon or gift voucher code"
                        value={form.couponInput}
                        onChange={(e) => {
                          handleChange("couponInput", e.target.value.toUpperCase());
                          setErrors((er) => ({ ...er, coupon: "" }));
                        }}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleCoupon())}
                        placeholder="Enter coupon code"
                        className="flex-1 h-10 px-3 text-[13px] rounded-[6px] border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] outline-none focus:border-[var(--accent)] placeholder:text-[var(--text-muted)]"
                      />
                      <button
                        type="button"
                        onClick={handleCoupon}
                        disabled={couponBusy || !form.couponInput.trim()}
                        aria-label="Apply coupon code"
                        className="h-10 px-4 bg-[var(--accent)] text-white text-[13px] font-semibold rounded-[6px] hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed shrink-0 flex items-center gap-1"
                      >
                        {couponBusy ? <Loader2 size={14} className="animate-spin" /> : "Apply"}
                      </button>
                    </div>
                    {errors.coupon && (
                      <p className="text-[12px] text-[var(--danger)]">{errors.coupon}</p>
                    )}
                    {coupon.discount > 0 && (
                      <div className="flex items-center justify-between bg-[var(--success)]/10 border border-[var(--success)]/20 rounded-[6px] px-3 py-2">
                        <span className="text-[12px] text-[var(--success)] font-semibold">
                          ✓ &ldquo;{coupon.code}&rdquo; — {formatPrice(coupon.discount)} off
                        </span>
                        <button
                          type="button"
                          aria-label="Remove coupon"
                          onClick={() => dispatch(applyCoupon({ code: "", discount: 0 }))}
                          className="text-[var(--text-muted)] hover:text-[var(--danger)] transition-colors ml-2"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </Card>

              {/* 3 · Order Totals ───────────────────── */}
              <Card>
                <CardTitle>Order Total</CardTitle>
                <div className="space-y-3">
                  <div className="flex justify-between text-[14px]">
                    <span className="text-[var(--text-muted)]">
                      Sub total ({cartCount} item{cartCount !== 1 ? "s" : ""})
                    </span>
                    <span className="font-medium text-[var(--text)]">{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-[14px]">
                    <span className="text-[var(--text-muted)]">Delivery cost</span>
                    <span className="font-medium text-[var(--text)]">{formatPrice(delivery)}</span>
                  </div>
                  {coupon.discount > 0 && (
                    <div className="flex justify-between text-[14px]">
                      <span className="text-[var(--success)]">Coupon ({coupon.code})</span>
                      <span className="font-semibold text-[var(--success)]">
                        −{formatPrice(coupon.discount)}
                      </span>
                    </div>
                  )}
                  <div className="pt-3 mt-1 border-t-2 border-dashed border-[var(--border)] flex items-center justify-between">
                    <span className="text-[14px] font-bold text-[var(--text)] uppercase tracking-wide">
                      Total
                    </span>
                    <span className="text-[22px] font-bold text-[var(--accent)]">
                      {formatPrice(grandTotal)}
                    </span>
                  </div>
                </div>
              </Card>

              {/* 4 · Special Notes ──────────────────── */}
              <Card>
                <CardTitle>Special Notes</CardTitle>
                <textarea
                  id="notes"
                  rows={3}
                  aria-label="Special instructions for your order (optional)"
                  value={form.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                  placeholder="Any special instructions for your order... (optional)"
                  className={
                    "w-full px-3 py-2.5 text-[14px] rounded-[6px] border border-[var(--border)] " +
                    "bg-[var(--surface)] text-[var(--text)] outline-none transition-colors resize-none " +
                    "focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/10 " +
                    "placeholder:text-[var(--text-muted)]"
                  }
                />
              </Card>

              {/* 5 · T&C + Place Order ──────────────── */}
              <div className="space-y-4">
                {/* Checkbox */}
                <label className="flex items-start gap-3 cursor-pointer">
                  <div className="relative mt-0.5 shrink-0">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      aria-label="I agree to the Terms, Privacy Policy and Refund Policy"
                      className="sr-only"
                    />
                    <div
                      onClick={() => setAgreed((a) => !a)}
                      className={[
                        "w-[18px] h-[18px] rounded-[4px] border-2 flex items-center justify-center transition-all cursor-pointer",
                        agreed
                          ? "bg-[var(--accent)] border-[var(--accent)]"
                          : "bg-[var(--surface)] border-[var(--border)] hover:border-[var(--accent)]",
                      ].join(" ")}
                    >
                      {agreed && <Check size={11} className="text-white" strokeWidth={3} />}
                    </div>
                  </div>
                  <p className="text-[13px] text-[var(--text-muted)] leading-relaxed">
                    I agree to the{" "}
                    <Link href="/terms" className="text-[var(--accent)] hover:underline font-medium">
                      Terms of Service
                    </Link>
                    ,{" "}
                    <Link href="/privacy" className="text-[var(--accent)] hover:underline font-medium">
                      Privacy Policy
                    </Link>{" "}
                    &amp;{" "}
                    <Link href="/refund" className="text-[var(--accent)] hover:underline font-medium">
                      Refund Policy
                    </Link>
                  </p>
                </label>

                {/* Desktop CTA */}
                <button
                  type="submit"
                  disabled={!isValid || placing}
                  aria-disabled={!isValid || placing}
                  className={[
                    "hidden lg:flex w-full h-12 items-center justify-center gap-2",
                    "bg-[var(--accent)] text-white font-bold uppercase tracking-wider rounded-[6px]",
                    "text-[14px] transition-all",
                    !isValid || placing
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:opacity-90 active:scale-[0.99]",
                  ].join(" ")}
                >
                  {placing ? (
                    <Loader2 size={17} className="animate-spin" aria-hidden="true" />
                  ) : (
                    <Lock size={15} aria-hidden="true" />
                  )}
                  {placing ? "Placing Order…" : "Place Order"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* ── Floating Cart Pill — desktop only ────────── */}
      <div
        role="status"
        aria-label={`Cart: ${cartCount} items, total ${formatPrice(cartTotal)}`}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-1.5 bg-[var(--accent)] text-white py-4 px-2.5 rounded-l-2xl shadow-xl text-[11px] font-bold leading-tight"
      >
        <ShoppingBag size={17} aria-hidden="true" />
        <span className="text-center">{cartCount} Item{cartCount !== 1 ? "s" : ""}</span>
        <span className="text-white/85 text-center">{formatPrice(cartTotal)}</span>
      </div>

      {/* ── Floating Chat Widget — all viewports ─────── */}
      <a
        href="https://wa.me/8801700000000"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-[5.5rem] right-4 lg:bottom-6 lg:right-6 z-50 w-[52px] h-[52px] rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-transform"
        style={{ background: "#25D366" }}
      >
        <MessageCircle size={24} className="text-white" aria-hidden="true" />
      </a>

      {/* ── Mobile Sticky CTA bar ─────────────────────── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--surface)] border-t border-[var(--border)] px-4 py-3 shadow-2xl lg:hidden"
        aria-label="Order summary and place order"
      >
        <div className="flex items-center justify-between mb-2.5">
          <div>
            <p className="text-[11px] text-[var(--text-muted)]">Order Total</p>
            <p className="text-[16px] font-bold text-[var(--accent)]">{formatPrice(grandTotal)}</p>
          </div>
          <p className="text-[11px] text-[var(--text-muted)]">
            {cartCount} item{cartCount !== 1 ? "s" : ""} · Delivery {formatPrice(delivery)}
          </p>
        </div>
        <button
          type="submit"
          form="checkout-form"
          disabled={!isValid || placing}
          aria-disabled={!isValid || placing}
          onClick={handleSubmit}
          className={[
            "w-full h-11 flex items-center justify-center gap-2",
            "bg-[var(--accent)] text-white font-bold uppercase tracking-wider rounded-[6px] text-[14px]",
            "transition-all",
            !isValid || placing
              ? "opacity-50 cursor-not-allowed"
              : "hover:opacity-90 active:scale-[0.99]",
          ].join(" ")}
        >
          {placing ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <Lock size={14} />
          )}
          {placing ? "Placing Order…" : "Place Order"}
        </button>
      </div>
    </div>
  );
}
