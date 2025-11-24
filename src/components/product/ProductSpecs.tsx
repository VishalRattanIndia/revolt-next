"use client";

import { motion } from "framer-motion";

interface SpecCategory {
    category: string;
    items: {
        label: string;
        value: string;
    }[];
}

interface ProductSpecsProps {
    specs: SpecCategory[];
}

export function ProductSpecs({ specs }: ProductSpecsProps) {
    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-4 max-w-screen-2xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">
                        Technical <span className="text-primary">Specifications</span>
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-12">
                    {specs.map((category, index) => (
                        <motion.div
                            key={category.category}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <h3 className="text-2xl font-bold border-b border-border pb-4">
                                {category.category}
                            </h3>
                            <div className="space-y-4">
                                {category.items.map((item) => (
                                    <div key={item.label} className="flex justify-between items-center py-2">
                                        <span className="text-muted-foreground">{item.label}</span>
                                        <span className="font-medium text-right">{item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
