import { ProductHero } from "@/components/product/ProductHero";
import { ProductFeatures } from "@/components/product/ProductFeatures";
import { ProductSpecs } from "@/components/product/ProductSpecs";
import { products } from "@/data/products";
import { ColorPicker } from "@/components/product/ColorPicker";

import { DetailedSpecs, SpecItem } from "@/components/product/DetailedSpecs";
import { SavingsCalculator } from "@/components/product/SavingsCalculator";
import { EMICalculator } from "@/components/product/EMICalculator";
import { ComparisonSection } from "@/components/product/ComparisonSection";


export default function RV1Page() {
    const product = products["RV1"];

    return (
        <div className="flex flex-col min-h-screen">
            <ProductHero
                name={product.name}
                tagline={product.tagline}
                description={product.description}
                image={product.image}
                price={product.price}
            />

            <ProductFeatures features={product.features} />

            {/* Color Picker Section */}
            {product.colors && (
                <section className="py-24 bg-zinc-950">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                                Choose Your Style
                            </h2>
                            <p className="text-zinc-400 text-lg">
                                Available in {product.colors.length} stunning colors
                            </p>
                        </div>
                        <ColorPicker colors={product.colors} />
                    </div>
                </section>
            )}



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
