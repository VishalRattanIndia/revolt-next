"use client";

import { ProductHero } from "@/components/product/ProductHero";
import { ProductFeatures } from "@/components/product/ProductFeatures";
import { ProductSpecs } from "@/components/product/ProductSpecs";
import { products } from "@/data/products";
import { ColorPicker } from "@/components/product/ColorPicker";
import { DetailedSpecs, SpecItem } from "@/components/product/DetailedSpecs";
import { SavingsCalculator } from "@/components/product/SavingsCalculator";
import { EMICalculator } from "@/components/product/EMICalculator";
import { ComparisonSection } from "@/components/product/ComparisonSection";
import { Bike360View } from "@/components/product/Bike360View";
import { SoundShowcase } from "@/components/product/SoundShowcase";
import { NotifyMe } from "@/components/product/NotifyMe";

export default function RV400Page() {
    const product = products["RV400"];

    return (
        <div className="flex flex-col min-h-screen">
            <ProductHero
                name={product.name}
                tagline={product.tagline}
                description={product.description}
                image={product.image}
                price={product.price}
            />

            {/* 360 View & Color Picker Section */}
            <section className="py-24 bg-zinc-950">
                <div className="container mx-auto px-4 max-w-screen-2xl">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                            Experience <span className="text-primary">360°</span>
                        </h2>
                        <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                            Explore the RV400 from every angle. Choose your style.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <Bike360View image="/images/rv400-black-v1.png" alt="RV400 360 View" />

                        <div className="space-y-12">
                            <div>
                                <h3 className="text-2xl font-bold text-white mb-6">Choose Your Color</h3>
                                {product.colors && (
                                    <ColorPicker colors={product.colors} />
                                )}
                            </div>

                            <div className="p-6 bg-zinc-900 rounded-2xl border border-zinc-800">
                                <h3 className="text-xl font-bold text-white mb-2">Out of Stock?</h3>
                                <p className="text-zinc-400 mb-4">
                                    Get notified when your favorite color is back in stock.
                                </p>
                                <NotifyMe productName="RV400" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <SoundShowcase />

            <ProductFeatures features={product.features} />

            {/* Detailed Specs */}
            {product.detailedSpecs && (
                <DetailedSpecs specs={product.detailedSpecs as SpecItem[]} />
            )}

            {/* Calculators */}
            <SavingsCalculator />
            <EMICalculator />

            {/* Comparison */}
            <ComparisonSection />

            <ProductSpecs specs={product.specs} />
        </div>
    );
}
