import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { ChevronRight } from "lucide-react";

export default function ElectricBikesPage() {
    const allBikes = Object.entries(products).map(([key, product]) => ({
        id: key,
        ...product,
        link: key === "RV1" ? "/rv1" : key === "RV1+" ? "/rv1plus" : key === "RV400BRZ" ? "/rv400-brz" : key === "RV BlazeX" ? "/rv-blazex" : "/rv400",
    }));

    const featuredBike = allBikes.find(bike => bike.id === "RV BlazeX");
    const otherBikes = allBikes.filter(bike => bike.id !== "RV BlazeX");

    return (
        <div className="min-h-screen bg-background">
            {/* Featured Bike Section (Apple-style Hero) */}
            {featuredBike && (
                <section className="relative h-screen w-full flex flex-col items-center justify-start pt-32 overflow-hidden bg-black text-white">
                    <div className="z-10 text-center space-y-4 animate-fade-in-up">
                        <h2 className="text-xl md:text-2xl font-medium text-primary">New</h2>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">{featuredBike.name}</h1>
                        <p className="text-xl md:text-2xl text-zinc-300 max-w-2xl mx-auto font-light">
                            {featuredBike.tagline}
                        </p>
                        <div className="flex items-center justify-center gap-6 pt-4">
                            <Link href={featuredBike.link}>
                                <Button size="lg" className="rounded-full px-8 text-lg">
                                    Learn more
                                </Button>
                            </Link>
                            <Link href="/book">
                                <Button variant="outline" size="lg" className="rounded-full px-8 text-lg border-primary text-primary hover:bg-primary hover:text-white">
                                    Buy
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="relative w-full h-full mt-10 flex items-end justify-center">
                        {/* Gradient overlay for smooth transition */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 h-40 bottom-0 w-full" />

                        <div className="relative w-full max-w-[1400px] h-[60vh] md:h-[75vh]">
                            <Image
                                src={featuredBike.image}
                                alt={featuredBike.name}
                                fill
                                className="object-contain object-bottom hover:scale-105 transition-transform duration-1000 ease-out"
                                priority
                            />
                        </div>
                    </div>
                </section>
            )}

            {/* Grid Section for Other Bikes */}
            <section className="py-4 bg-white dark:bg-zinc-950">
                <div className="container mx-auto px-4 max-w-screen-2xl">
                    <div className="grid md:grid-cols-2 gap-4">
                        {otherBikes.map((bike) => (
                            <div key={bike.id} className="group relative h-[600px] overflow-hidden bg-[#F5F5F7] dark:bg-zinc-900 flex flex-col items-center justify-start pt-16 text-center transition-all duration-500 hover:shadow-xl">
                                <div className="z-10 space-y-3 px-6">
                                    <h2 className="text-4xl md:text-5xl font-bold text-black dark:text-white">{bike.name}</h2>
                                    <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-300 font-light">{bike.tagline}</p>
                                    <div className="flex items-center justify-center gap-4 pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                                        <Link href={bike.link} className="text-blue-600 hover:underline flex items-center gap-1">
                                            Learn more <ChevronRight className="w-4 h-4" />
                                        </Link>
                                        <Link href="/book" className="text-blue-600 hover:underline flex items-center gap-1">
                                            Buy <ChevronRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>

                                <div className="relative w-full flex-1 mt-8">
                                    <Image
                                        src={bike.image}
                                        alt={bike.name}
                                        fill
                                        className="object-contain object-bottom px-8 pb-8 group-hover:scale-105 transition-transform duration-700 ease-out"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
