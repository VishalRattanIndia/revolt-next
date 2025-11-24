"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Feature {
    title: string;
    description: string;
    icon: ReactNode;
}

interface ProductFeaturesProps {
    features: Feature[];
}

export function ProductFeatures({ features }: ProductFeaturesProps) {
    return (
        <section className="py-24 bg-zinc-900">
            <div className="container mx-auto px-4 max-w-screen-2xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Engineered for <span className="text-primary">Excellence</span>
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto">
                        Every detail of the RV400 is designed to provide the best electric riding experience.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="p-8 rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-primary/50 transition-colors"
                        >
                            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-zinc-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
