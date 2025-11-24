"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface ProductHeroProps {
    name: string;
    tagline: string;
    description: string;
    image: string;
    price: string;
}

export function ProductHero({ name, tagline, description, image, price }: ProductHeroProps) {
    return (
        <section className="relative w-full aspect-[21/9] overflow-hidden bg-black text-white">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover object-center"
                    priority
                />
                {/* Overlay for text readability */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.8)_0%,transparent_60%)]" />
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 h-full container mx-auto px-4 max-w-screen-2xl flex flex-col justify-center items-start">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-xl space-y-8"
                >
                    <div>
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-4">
                            {name}
                        </h1>
                        <p className="text-2xl md:text-3xl text-primary font-medium">
                            {tagline}
                        </p>
                    </div>

                    <p className="text-lg text-zinc-200">
                        {description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center pt-4">
                        <div>
                            <p className="text-sm text-zinc-400 mb-1">Starting at</p>
                            <p className="text-3xl font-bold text-white">{price}</p>
                        </div>
                        <Button size="lg" className="px-8 rounded-full" asChild>
                            <Link href="/book">
                                Book Now <ChevronRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
