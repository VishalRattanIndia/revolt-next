"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

export function Hero() {
    return (
        <section className="relative h-[calc(100vh-4rem)] w-full overflow-hidden bg-black">
            <video
                autoPlay
                loop
                muted
                playsInline
                className="absolute left-0 top-0 h-full w-full object-cover opacity-60"
            >
                <source src="/images/RV400-video-final.mp4" type="video/mp4" />
            </video>

            <div className="container mx-auto relative z-10 flex h-full flex-col justify-center px-4 max-w-screen-2xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-2xl space-y-6"
                >
                    <h1 className="text-5xl font-bold tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl">
                        REVOLT <br />
                        <span className="text-primary">AGAINST</span> THE <br />
                        ORDINARY
                    </h1>
                    <p className="max-w-[600px] text-lg text-gray-300 sm:text-xl">
                        Experience India&apos;s first AI-enabled electric motorcycle.
                        Performance, intelligence, and style combined.
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Button size="lg" className="text-lg px-8" asChild>
                            <Link href="/book">
                                Book Now <ChevronRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="text-lg px-8 bg-transparent text-white hover:bg-white/10 border-white/20"
                            asChild
                        >
                            <Link href="/rv400">Explore RV400</Link>
                        </Button>
                    </div>
                </motion.div>
            </div>

            <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-background to-transparent" />
        </section>
    );
}
