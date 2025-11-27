import React from 'react'
import { Button } from "@/components/ui/button"

const bikes = [
    {
        name: "Revolt RV1",
        price: "₹99,999",
        image: "/images/home-product/top/Rv1.webp", // Placeholder
        link: "/rv1"
    },
    {
        name: "Revolt RV1+",
        price: "₹1,04,990",
        image: "/images/home-product/top/RV1Plus.webp", // Placeholder
        link: "/rv1plus"
    },
    {
        name: "Revolt BlazeX",
        price: "₹1,19,990",
        image: "/images/home-product/top/RV-BlazeX.webp", // Placeholder
        link: "/rv-blazex"
    },
    {
        name: "Revolt RV400 BRZ",
        price: "₹1,29,950",
        image: "/images/home-product/top/RV-BRZ.webp", // Placeholder
        link: "/rv400-brz"
    },
    {
        name: "Revolt RV400",
        price: "₹1,39,950",
        image: "/images/home-product/top/top400.webp", // Placeholder
        link: "/rv400"
    }
]

export default function BikeModels() {
    return (
        <div className="py-16 bg-black">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-white mb-12">Revolt Electric Bike Models</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {bikes.map((bike, index) => (
                        <div key={index} className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-red-600 transition-all group">
                            <div className="aspect-video bg-zinc-800 relative overflow-hidden">
                                {/* Placeholder for bike image */}
                                {/* <div className="absolute inset-0 flex items-center justify-center text-zinc-600 font-bold text-2xl">
                                    {bike.name}
                                </div> */}
                                <img src={bike.image} alt={bike.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-bold text-white mb-2">{bike.name}</h3>
                                <p className="text-gray-400 mb-6">Introductory Pricing: <span className="text-white font-bold">{bike.price}</span></p>
                                <Button
                                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                                    onClick={() => window.location.href = bike.link}
                                >
                                    Explore {bike.name.replace('Revolt ', '')}
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
