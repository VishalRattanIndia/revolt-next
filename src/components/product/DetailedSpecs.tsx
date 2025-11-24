"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
    Disc,
    Zap,
    Battery,
    Plug,
    Ruler,
    Lightbulb,
    ShieldCheck,
    Key,
    CircleDot,
    Weight,
    Users,
    MapPin,
    Timer,
    ArrowUpFromLine,
    Armchair
} from "lucide-react";

export interface SpecItem {
    label: string;
    value: string;
    icon: string;
    subtext?: string;
}

const iconMap: Record<string, React.ElementType> = {
    Disc,
    Zap,
    Battery,
    Plug,
    Ruler,
    Lightbulb,
    ShieldCheck,
    Key,
    CircleDot,
    Weight,
    Users,
    MapPin,
    Timer,
    ArrowUpFromLine,
    Armchair
};

interface DetailedSpecsProps {
    specs: SpecItem[];
}

export function DetailedSpecs({ specs }: DetailedSpecsProps) {
    return (
        <section className="py-24 bg-zinc-50">
            <div className="container mx-auto px-4 max-w-screen-2xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-zinc-900">
                        Detailed <span className="text-primary">Specifications</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {specs.map((spec, index) => {
                        const isImagePath = spec.icon.startsWith("/");
                        const Icon = !isImagePath ? iconMap[spec.icon] : null;

                        return (
                            <motion.div
                                key={spec.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                viewport={{ once: true }}
                                className="flex items-start gap-4 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="p-3 bg-primary/10 rounded-xl text-primary flex-shrink-0 w-14 h-14 flex items-center justify-center">
                                    {isImagePath ? (
                                        <Image
                                            src={spec.icon}
                                            alt={spec.label}
                                            width={32}
                                            height={32}
                                            className="w-8 h-8 object-contain"
                                        />
                                    ) : (
                                        Icon && <Icon className="w-8 h-8" />
                                    )}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-zinc-900">{spec.label}</h3>
                                    <p className="text-zinc-600 font-medium mt-1">{spec.value}</p>
                                    {spec.subtext && (
                                        <p className="text-xs text-zinc-400 mt-1">{spec.subtext}</p>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-xs text-zinc-500 max-w-4xl mx-auto">
                        *Standard warranty shall be for 3 years or 40,000 kilometers (whichever occurs first) on Vehicle and 3 years or 40,000 kilometers (whichever occurs first) on Battery, from the date of purchase of vehicle. Remaining period / kilometers of warranty shall be treated as extended warranty and shall be provided by Revolt&apos;s authorized service provider only, subject to subscription in Revolt Protect Plan. Customer can subscribe to Revolt Protect Plan at nominal subscription charge. Customer to contact authorized service provider to avail extended warranty*.
                    </p>
                </div>
            </div>
        </section>
    );
}
