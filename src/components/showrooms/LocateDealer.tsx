"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Button } from "@/components/ui/button"
import Testimonials from "./Testimonials"
import BikeModels from "./BikeModels"
import LatestUpdates from "./LatestUpdates"
import FaqSection from "./FaqSection"

interface GridCity {
    city_id: string
    city_name: string
    image_url: string
    position: number | null
}

export default function LocateDealer() {
    const router = useRouter()
    const [gridCities, setGridCities] = useState<GridCity[]>([])
    const [showAllCities, setShowAllCities] = useState(false)

    useEffect(() => {
        const fetchGridCities = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/api/v1/common/getcitylist`)
                if (response.data && response.data.status) {
                    setGridCities(response.data.data)
                }
            } catch (error) {
                console.error("Error fetching city grid data:", error)
            }
        }

        fetchGridCities()
    }, [])

    const handleCityClick = (cityName: string) => {
        // Convert city name to URL-friendly slug
        const citySlug = cityName.toLowerCase().replace(/\s+/g, "-")
        router.push(`/showrooms/${citySlug}`)
    }

    return (
        <div className="bg-black min-h-screen">
            <div className="container mx-auto px-4 py-8">
                {/* Explore Revolt Electric Showrooms Section (City Grid) */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold mb-8 text-center text-white">
                        Explore Revolt Electric Showrooms in India
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {gridCities
                            .filter((city) => city.position != null)
                            .sort((a, b) => (a.position || 0) - (b.position || 0))
                            .slice(0, 12)
                            .map((city, idx) => (
                                <div
                                    key={city.city_id || idx}
                                    className="cursor-pointer group"
                                    onClick={() => handleCityClick(city.city_name)}
                                >
                                    <div className="relative aspect-square overflow-hidden rounded-lg mb-2 border border-zinc-800 group-hover:border-red-600 transition-all">
                                        <img
                                            src={city.image_url}
                                            alt={city.city_name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                    <p className="text-center text-white font-medium group-hover:text-red-500 transition-colors">
                                        {city.city_name}
                                    </p>
                                </div>
                            ))}
                    </div>

                    <div className="mt-8 text-center">
                        <Button
                            variant="outline"
                            onClick={() => setShowAllCities(!showAllCities)}
                            className="bg-transparent border-white text-white hover:bg-white hover:text-black transition-colors"
                        >
                            {showAllCities ? "Hide All Cities" : "View All Cities"}
                        </Button>

                        {showAllCities && (
                            <div className="mt-8 p-6 bg-zinc-900 rounded-xl border border-zinc-800">
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {gridCities.length > 12 && gridCities.slice(12).map((city, idx) => (
                                        <div
                                            key={city.city_id || idx}
                                            className="text-left cursor-pointer hover:text-red-500 transition-colors text-gray-300"
                                            onClick={() => handleCityClick(city.city_name)}
                                        >
                                            {city.city_name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Explore Our Nationwide Network Text */}
                <div className="mb-16 text-center max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4 text-white">Explore Our Nationwide Network</h2>
                    <p className="text-gray-400 mb-4">
                        Looking for a Revolt electric bike showroom near your location? Revolt Motors offers wide network of authorized dealerships across India, Including major cities like Delhi, Mumbai, Bangalore, & Agra. Whether you're interested in the Revolt electric bike or the flagship Revolt RV400, numerous showrooms across the country are ready to help you explore these innovative electric bikes. With a Revolt motors showroom in your area, you can get hands-on experience with the RV400 and other models designed for eco-friendly and performance-driven riders.
                    </p>
                    <p className="text-gray-400">
                        Revolt showrooms offer a full range of services, from test rides to after-sales support, ensuring a seamless experience for riders. With electric vehicles gaining popularity, electric bikes in India are becoming the future of commuting. Find a Revolt showroom near you and book your test ride today!
                    </p>
                </div>
            </div>

            {/* Testimonials Section */}
            <Testimonials />

            {/* Bike Models Section */}
            <BikeModels />

            {/* Latest Updates Section */}
            <LatestUpdates />

            {/* FAQ Section */}
            <FaqSection />
        </div>
    )
}
