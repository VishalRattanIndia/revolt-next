import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { products } from "@/data/products";
import { ChevronRight } from "lucide-react";

export default function Home() {
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
        <section className="relative w-full aspect-[21/9] overflow-hidden bg-black text-white">
          {/* Background Image */}
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={featuredBike.image}
              alt={featuredBike.name}
              fill
              className="object-cover object-center"
              priority
              sizes="100vw"
            />
            {/* Overlay for text readability */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.8)_0%,transparent_60%)]" />
          </div>

          {/* Content Overlay */}
          <div className="relative z-10 h-full container mx-auto px-4 max-w-screen-2xl flex flex-col justify-center items-start">
            <div className="max-w-xl space-y-6 animate-fade-in-up">
              <h2 className="text-xl md:text-2xl font-medium text-primary">New</h2>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">{featuredBike.name}</h1>
              <p className="text-xl md:text-2xl text-zinc-200 font-light">
                {featuredBike.tagline}
              </p>
              <div className="flex items-center gap-6 pt-4">
                <Link href={featuredBike.link}>
                  <Button size="lg" className="rounded-full px-8 text-lg">
                    Learn more
                  </Button>
                </Link>
                <Link href="/book">
                  <Button variant="outline" size="lg" className="rounded-full px-8 text-lg border-white text-white hover:bg-white hover:text-black">
                    Buy
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Grid Section for Other Bikes */}
      <section className="py-4 bg-white dark:bg-zinc-950">
        <div className="container mx-auto px-4 max-w-screen-2xl">
          <div className="grid md:grid-cols-2 gap-4">
            {otherBikes.map((bike) => (
              <div key={bike.id} className="group relative w-full aspect-[16/9] overflow-hidden bg-[#F5F5F7] dark:bg-zinc-900 rounded-2xl transition-all duration-500 hover:shadow-xl">
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                  <Image
                    src={bike.image}
                    alt={bike.name}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.8)_0%,transparent_60%)]" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 h-full flex flex-col justify-center items-start px-8 md:px-12 text-left">
                  <div className="space-y-3 transform transition-transform duration-500 group-hover:-translate-y-2">
                    <h2 className="text-4xl md:text-5xl font-bold text-white">{bike.name}</h2>
                    <p className="text-lg md:text-xl text-zinc-200 font-light max-w-xs">{bike.tagline}</p>

                    <div className="flex items-center gap-4 pt-4">
                      <Link href={bike.link} className="text-white hover:text-primary transition-colors flex items-center gap-1 font-medium">
                        Learn more <ChevronRight className="w-4 h-4" />
                      </Link>
                      <Link href="/book" className="text-white hover:text-primary transition-colors flex items-center gap-1 font-medium">
                        Buy <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
