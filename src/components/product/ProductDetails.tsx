"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { Check, ChevronRight } from "lucide-react";

export default function ProductDetails() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;

    // Find product by matching ID (handling URL friendly names if needed)
    // For now assuming ID matches key in products object
    // We might need a mapping if IDs in URL are different
    const productKey = Object.keys(products).find(key =>
        key.toLowerCase().replace(/\s+/g, '-') === id ||
        key.toLowerCase().replace(/\s+/g, '') === id ||
        key === id
    );

    const product = productKey ? products[productKey as keyof typeof products] : null;

    const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
    const [selectedPlan, setSelectedPlan] = useState(product?.plans?.[0]);

    const addToCart = useCartStore((state) => state.addToCart);

    useEffect(() => {
        if (product) {
            setSelectedColor(product.colors[0]);
            setSelectedPlan(product.plans[0]);
        }
    }, [product]);

    if (!product) {
        return <div className="min-h-screen flex items-center justify-center">Product not found</div>;
    }

    const handleBookNow = () => {
        addToCart({
            product: productKey!,
            name: product.name,
            image: selectedColor?.image || product.image,
            price: selectedPlan?.price || 0,
            countInStock: 10,
            qty: 1,
            color: selectedColor?.name,
            bookingAmount: selectedPlan?.bookingAmount
        });
        router.push("/book");
    };

    return (
        <div className="min-h-screen bg-background pt-20 pb-10">
            <div className="container mx-auto px-4 max-w-screen-2xl">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Image */}
                    <div className="relative aspect-[4/3] w-full bg-zinc-100 dark:bg-zinc-900 rounded-3xl overflow-hidden p-8 flex items-center justify-center">
                        <div className="relative w-full h-full">
                            <Image
                                src={selectedColor?.image || product.image}
                                alt={product.name}
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>

                    {/* Right: Details */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{product.name}</h1>
                            <p className="text-xl text-muted-foreground mt-2">{product.tagline}</p>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            {product.specs.range && (
                                <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-xl text-center">
                                    <div className="text-2xl font-bold">{product.specs.range}</div>
                                    <div className="text-sm text-muted-foreground">Range</div>
                                </div>
                            )}
                            {product.specs.chargingTime && (
                                <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-xl text-center">
                                    <div className="text-2xl font-bold">{product.specs.chargingTime}</div>
                                    <div className="text-sm text-muted-foreground">Charging Time</div>
                                </div>
                            )}
                            {product.specs.topSpeed && (
                                <div className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-xl text-center">
                                    <div className="text-2xl font-bold">{product.specs.topSpeed}</div>
                                    <div className="text-sm text-muted-foreground">Top Speed</div>
                                </div>
                            )}
                        </div>

                        {/* Color Selection */}
                        <div className="space-y-4">
                            <h3 className="font-medium text-lg">Select Color: <span className="text-muted-foreground">{selectedColor?.name}</span></h3>
                            <div className="flex gap-4">
                                {product.colors.map((color) => (
                                    <button
                                        key={color.name}
                                        onClick={() => setSelectedColor(color)}
                                        className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${selectedColor?.name === color.name ? "border-primary scale-110" : "border-transparent hover:scale-105"
                                            }`}
                                        style={{ backgroundColor: color.code }}
                                        aria-label={color.name}
                                    >
                                        {selectedColor?.name === color.name && (
                                            <Check className={`w-6 h-6 ${["#D1D3D4", "#fff"].includes(color.code) ? "text-black" : "text-white"}`} />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Plan Selection */}
                        <div className="space-y-4">
                            <h3 className="font-medium text-lg">Select Plan</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {product.plans.map((plan) => (
                                    <div
                                        key={plan.id}
                                        onClick={() => setSelectedPlan(plan)}
                                        className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${selectedPlan?.id === plan.id
                                                ? "border-primary bg-primary/5"
                                                : "border-border hover:border-primary/50"
                                            }`}
                                    >
                                        <div className="font-bold text-lg">{plan.name}</div>
                                        {plan.price && <div className="text-muted-foreground">₹{plan.price.toLocaleString()}</div>}
                                        {plan.emi && <div className="text-muted-foreground">EMI: ₹{plan.emi.toLocaleString()}/mo</div>}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4 flex gap-4">
                            <Button size="lg" className="w-full text-lg h-14 rounded-full" onClick={handleBookNow}>
                                Book Now - ₹{selectedPlan?.bookingAmount}
                            </Button>
                        </div>

                        <div className="text-sm text-muted-foreground text-center">
                            *Ex-showroom price. Insurance and other charges extra.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
