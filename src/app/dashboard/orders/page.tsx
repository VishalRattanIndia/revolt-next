"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OrdersPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">My Orders</h1>
                <p className="text-muted-foreground">View and track your bookings.</p>
            </div>

            <div className="flex flex-col items-center justify-center py-16 rounded-xl border bg-card border-dashed">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">No orders yet</h3>
                <p className="text-muted-foreground mb-6">Looks like you haven&apos;t made any bookings yet.</p>
                <Button asChild>
                    <Link href="/book">
                        Book Now
                    </Link>
                </Button>
            </div>
        </div>
    );
}
