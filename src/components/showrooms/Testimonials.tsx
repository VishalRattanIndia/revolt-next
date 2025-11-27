import React from 'react'
import { Star } from 'lucide-react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

const testimonials = [
    {
        name: "Ashutosh Sinha",
        rating: 4.0,
        review: "I’ve been riding the Revolt RV400 for six months now, and it’s been fantastic! The range easily gets me through my daily commute without any worries. I love the removable battery feature — I just take it inside to charge overnight. Plus, the bike feels solid and well-built. Highly recommend it for city riders!",
        avatar: "/images/cityIcon/ashutosh-sinha.jpg" // Placeholder path, assuming images might need to be added or are external
    },
    {
        name: "Robin Kapoor",
        rating: 5.0,
        review: "I commute daily on my Revolt RV400 and have had a smooth experience so far. It’s comfortable and quick enough for city traffic. It’s also nice to know I’m reducing my carbon footprint without compromising on style or performance.",
        avatar: "/images/cityIcon/robin-kapoor.jpg"
    },
    {
        name: "Pramod Verma",
        rating: 4.0,
        review: "Great bike with solid build quality. I enjoy how quiet and smooth the ride is compared to my old petrol bike. The maintenance is minimal, and battery charging is hassle-free. The Revolt RV400 makes daily commuting easy and economical – a smart choice for anyone looking to switch to electric!",
        avatar: "/images/cityIcon/pramod-verma.jpg"
    },
    {
        name: "Mukesh Kumar",
        rating: 5.0,
        review: "The RV1+ is very comfortable with a good charging time. Riding quality is excellent on both city roads and highways. The bike supports fast charging and has strong brakes with good speed.",
        avatar: "/images/cityIcon/mukesh-kumar.jpg"
    },
    {
        name: "Om Shankar",
        rating: 4.5,
        review: "RV1+ is a great option for daily commuters looking for a stylish and affordable EV. Fast charging and great mileage make it stand out against competitors in the same price segment. I absolutely love the bike and feel it is a good investment for office goers.",
        avatar: "/images/cityIcon/om-shankar.jpg"
    }
]

export default function Testimonials() {
    return (
        <div className="py-16 bg-zinc-900">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-white mb-12">What Customer Says</h2>
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full max-w-5xl mx-auto"
                >
                    <CarouselContent>
                        {testimonials.map((item, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <div className="bg-zinc-800 p-6 rounded-xl h-full border border-zinc-700">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-full bg-zinc-700 overflow-hidden">
                                            <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
                                            <div className="w-full h-full flex items-center justify-center text-zinc-500 font-bold text-xl">
                                                {item.name.charAt(0)}
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white">{item.name}</h3>
                                            <div className="flex items-center gap-1">
                                                <span className="text-yellow-500 font-bold">{item.rating.toFixed(1)}</span>
                                                <div className="flex">
                                                    {Array.from({ length: 5 }).map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className={`w-4 h-4 ${i < Math.round(item.rating) ? "fill-yellow-500 text-yellow-500" : "text-zinc-600"}`}
                                                        />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 text-sm italic">“{item.review}”</p>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex" />
                    <CarouselNext className="hidden md:flex" />
                </Carousel>
            </div>
        </div>
    )
}
