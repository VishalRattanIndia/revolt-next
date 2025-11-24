"use client";

import { useAuthStore } from "@/store/authStore";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
    const user = useAuthStore((state) => state.user);

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Welcome back, {user?.name}</h1>
                    <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your Revolt.</p>
                </div>
                <Link
                    href="/book"
                    className="bg-primary text-primary-foreground px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors"
                >
                    Book New Bike <ArrowRight className="w-4 h-4" />
                </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-6 rounded-xl border bg-card"
                >
                    <h3 className="text-lg font-medium mb-2">Total Orders</h3>
                    <p className="text-3xl font-bold">0</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="p-6 rounded-xl border bg-card"
                >
                    <h3 className="text-lg font-medium mb-2">Saved Addresses</h3>
                    <p className="text-3xl font-bold">1</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="p-6 rounded-xl border bg-card"
                >
                    <h3 className="text-lg font-medium mb-2">Revolt Coins</h3>
                    <p className="text-3xl font-bold text-primary">0</p>
                </motion.div>
            </div>

            <div className="rounded-xl border bg-card p-8 text-center py-16">
                <h3 className="text-xl font-bold mb-2">No Active Rides</h3>
                <p className="text-muted-foreground mb-6">You haven&apos;t booked a Revolt yet.</p>
                <Link
                    href="/book"
                    className="text-primary hover:underline font-medium"
                >
                    Explore Models
                </Link>
            </div>
        </div>
    );
}
