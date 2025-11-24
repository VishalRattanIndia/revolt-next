"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Battery, Zap, Timer } from "lucide-react";

const products = [
    {
        id: "rv400",
        name: "RV400",
        tagline: "The First AI Enabled Motorcycle",
        description: "India's first AI-enabled electric motorcycle with 150km range and 85km/h top speed.",
        image: "/images/rv400-black-v1.png",
        specs: [
            { icon: Battery, label: "150 km", sub: "Range" },
            { icon: Zap, label: "85 km/h", sub: "Top Speed" },
            { icon: Timer, label: "4.5 hrs", sub: "Charging Time" },
        ],
        href: "/rv400",
        color: "bg-zinc-900",
    },
    {
        id: "brz",
        name: "RV400 BRZ",
        tagline: "Pure Electric Performance",
        description: "Experience the thrill of electric riding with the new RV400 BRZ. Simple, powerful, electric.",
        image: "/images/brz_pacific_blue.png",
        specs: [
            { icon: Battery, label: "150 km", sub: "Range" },
            { icon: Zap, label: "85 km/h", sub: "Top Speed" },
            { icon: Timer, label: "4.5 hrs", sub: "Charging Time" },
        ],
        href: "/rv400-brz",
        color: "bg-blue-950/30",
    },
];

export function ProductShowcase() {
    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-4 max-w-screen-2xl">
                <div className="mb-16 text-center">
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                        Choose Your <span className="text-primary">Revolt</span>
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Discover the future of urban mobility with our electric motorcycles.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className={`group relative overflow-hidden rounded-3xl border border-border/50 ${product.color} p-8 transition-colors hover:border-primary/50`}
                        >
                            <div className="relative z-10 flex flex-col h-full">
                                <div className="mb-8">
                                    <h3 className="text-3xl font-bold">{product.name}</h3>
                                    <p className="text-primary font-medium">{product.tagline}</p>
                                    <p className="mt-4 text-muted-foreground">
                                        {product.description}
                                    </p>
                                </div>

                                <div className="relative aspect-[4/3] w-full mb-8">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-contain transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>

                                <div className="grid grid-cols-3 gap-4 mb-8">
                                    {product.specs.map((spec) => (
                                        <div key={spec.label} className="text-center">
                                            <div className="mb-2 flex justify-center text-primary">
                                                <spec.icon className="h-6 w-6" />
                                            </div>
                                            <div className="font-bold">{spec.label}</div>
                                            <div className="text-xs text-muted-foreground">
                                                {spec.sub}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-auto flex gap-4">
                                    <Button className="flex-1" asChild>
                                        <Link href="/book">Book Now</Link>
                                    </Button>
                                    <Button variant="outline" className="flex-1" asChild>
                                        <Link href={product.href}>
                                            Learn More <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
