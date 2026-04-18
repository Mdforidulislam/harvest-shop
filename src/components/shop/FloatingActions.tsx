"use client";
import { MessageCircle, Phone, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppDispatch, useAppSelector } from "@/hooks/useAppDispatch";
import { setDrawerOpen, selectCartCount, selectCartTotal } from "@/features/cart/cartSlice";
import { ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/utils";

export default function FloatingActions() {
    const dispatch = useAppDispatch();
    const cartCount = useAppSelector(selectCartCount);
    const cartTotal = useAppSelector(selectCartTotal);
    const [showTop, setShowTop] = useState(false);

    useEffect(() => {
        const handler = () => setShowTop(window.scrollY > 400);
        window.addEventListener("scroll", handler);
        return () => window.removeEventListener("scroll", handler);
    }, []);

    return (
        <div className="fixed bottom-8 right-6 z-[100] flex flex-col gap-4">

            {/* Scroll to Top */}
            <AnimatePresence>
                {showTop && (
                    <motion.button
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="w-12 h-12 rounded-2xl bg-white border border-[#EDEDED] shadow-xl flex items-center justify-center text-[#333] hover:bg-[#F9F9F9] transition-all"
                    >
                        <ArrowUp size={20} />
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Floating Bag (Mobile/Sticky) */}
            <motion.button
                onClick={() => dispatch(setDrawerOpen(true))}
                className="relative group bg-[#F58220] text-white w-20 h-24 rounded-[2rem] flex flex-col items-center justify-center shadow-2xl shadow-orange-500/30 active:scale-95 transition-all overflow-hidden"
            >
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <ShoppingBag size={24} className="mb-1" />
                <span className="text-[10px] font-black uppercase tracking-tighter">{cartCount} Items</span>
                <span className="text-[10px] font-black">{formatPrice(cartTotal)}</span>
            </motion.button>

            {/* WhatsApp Action */}
            <a
                href="https://wa.me/8801700000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 rounded-2xl bg-[#25D366] text-white flex items-center justify-center shadow-xl shadow-green-500/20 hover:scale-110 active:scale-90 transition-all ml-auto"
            >
                <MessageCircle size={28} fill="white" className="text-[#25D366]" />
            </a>

        </div>
    );
}
