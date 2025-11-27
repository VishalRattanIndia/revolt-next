"use client"

import { useState, useEffect, use, useRef } from "react"
import Link from "next/link"
import axios from "axios"
import { useJsApiLoader, GoogleMap, Marker, InfoWindow } from "@react-google-maps/api"
import { MapPin, Phone, Navigation, Calendar, Search, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Hub {
    hub_id: string
    hub_name: string
    latitude: string
    longitude: string
    dealer_address: string
    dealer_number: string
    dealer_link?: string
    office_time?: string
    city_id: string
}

interface CityData {
    state: any[]
    city: { city_id: string; city_name: string; status: string }[]
    hub: Hub[]
}

const mapContainerStyle = {
    height: "500px",
    width: "100%",
    borderRadius: "0.5rem",
}

const defaultCenter = {
    lat: 28.6455413,
    lng: 77.3024774,
}

export default function CityDetailPage({ params }: { params: Promise<{ cityName: string }> }) {
    const { cityName: rawCityName } = use(params)
    const cityName = rawCityName.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase())

    const [cityData, setCityData] = useState<CityData | null>(null)
    const [hubs, setHubs] = useState<Hub[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [mapCenter, setMapCenter] = useState(defaultCenter)
    const [mapZoom, setMapZoom] = useState(12)
    const [activeMarker, setActiveMarker] = useState<string | null>(null)

    const mapRef = useRef<google.maps.Map | null>(null)
    const mapSectionRef = useRef<HTMLDivElement | null>(null)

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""
    })

    const handleHubClick = (hub: Hub) => {
        // Set the active marker to open the info window
        setActiveMarker(hub.hub_id)

        // Center and zoom the map on the selected hub
        const hubPosition = {
            lat: parseFloat(hub.latitude),
            lng: parseFloat(hub.longitude)
        }

        if (mapRef.current) {
            mapRef.current.panTo(hubPosition)
            mapRef.current.setZoom(16)
        }

        // Scroll to the map section smoothly
        if (mapSectionRef.current) {
            mapSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all city data including hubs
                const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/api/v1/common/getallstatelist`)
                if (response.data && response.data.data) {
                    const data = response.data.data
                    setCityData(data)

                    // Find the matching city and its hubs
                    const city = data.city.find((c: any) =>
                        c.city_name.toLowerCase() === cityName.toLowerCase()
                    )

                    if (city && data.hub) {
                        const cityHubs = data.hub.filter((h: Hub) => h.city_id === city.city_id)
                        setHubs(cityHubs)

                        // Center map on hubs
                        if (cityHubs.length > 0) {
                            if (cityHubs.length === 1) {
                                setMapCenter({
                                    lat: parseFloat(cityHubs[0].latitude),
                                    lng: parseFloat(cityHubs[0].longitude)
                                })
                                setMapZoom(14)
                            } else {
                                // Calculate center from all hubs
                                const avgLat = cityHubs.reduce((sum: number, h: Hub) => sum + parseFloat(h.latitude), 0) / cityHubs.length
                                const avgLng = cityHubs.reduce((sum: number, h: Hub) => sum + parseFloat(h.longitude), 0) / cityHubs.length
                                setMapCenter({ lat: avgLat, lng: avgLng })
                            }
                        }
                    }
                }
            } catch (error) {
                console.error("Error fetching hubs:", error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [cityName])

    const onLoad = (map: google.maps.Map) => {
        mapRef.current = map

        // Fit bounds to show all markers
        if (hubs.length > 1 && typeof window !== 'undefined' && window.google && window.google.maps) {
            const bounds = new window.google.maps.LatLngBounds()
            hubs.forEach(hub => {
                bounds.extend({ lat: parseFloat(hub.latitude), lng: parseFloat(hub.longitude) })
            })
            map.fitBounds(bounds)
        }
    }

    const onUnmount = () => {
        mapRef.current = null
    }

    return (
            <div className="min-h-screen bg-black text-white">
                {/* Hero Section */}
                <div className="relative h-[300px] w-full bg-zinc-900 overflow-hidden">
                    <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/80 z-10" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4">
                        <h1 className="text-3xl md:text-5xl font-bold text-center mb-4">
                            <span className="text-red-600">Locate Revolt Motors</span> Showrooms in {cityName}
                        </h1>
                        <div className="flex items-center gap-2 text-gray-400">
                            <Link href="/" className="hover:text-white transition-colors">Home</Link>
                            <span>/</span>
                            <Link href="/showrooms" className="hover:text-white transition-colors">Locate Us</Link>
                            <span>/</span>
                            <span className="text-white">{cityName}</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 py-16">
                    <h2 className="text-2xl font-bold mb-8">
                        {hubs.length > 0 ? (
                            <>
                                <span className="text-red-600 mr-2">{hubs.length}</span>
                                Revolt Bike Showrooms in {cityName}
                            </>
                        ) : (
                            "No Showrooms Found"
                        )}
                    </h2>

                    {/* Hubs List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {hubs.map((hub) => (
                            <div
                                key={hub.hub_id}
                                onClick={() => handleHubClick(hub)}
                                className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-red-600 transition-all group cursor-pointer"
                            >
                                <div className="flex items-start gap-4 mb-6">
                                    <div className="p-3 bg-zinc-800 rounded-lg group-hover:bg-red-600/10 group-hover:text-red-600 transition-colors">
                                        <MapPin className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">
                                            {hub.hub_name}
                                        </h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">
                                            {hub.dealer_address}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 mb-4 text-gray-300">
                                    <Phone className="h-4 w-4" />
                                    <a href={`tel:${hub.dealer_number}`} className="hover:text-white transition-colors">
                                        {hub.dealer_number}
                                    </a>
                                </div>

                                {hub.office_time && (
                                    <div className="flex items-center gap-3 mb-6 text-gray-300">
                                        <Clock className="h-4 w-4" />
                                        <span>{hub.office_time}</span>
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-4">
                                    <Link href="/test-ride" className="w-full">
                                        <Button className="w-full bg-white text-black hover:bg-gray-200">
                                            <Calendar className="mr-2 h-4 w-4" />
                                            Book Test Ride
                                        </Button>
                                    </Link>
                                    {hub.dealer_link && (
                                        <a href={hub.dealer_link} target="_blank" rel="noopener noreferrer" className="w-full">
                                            <Button variant="outline" className="w-full border-zinc-700 hover:bg-zinc-800 hover:text-white">
                                                <Navigation className="mr-2 h-4 w-4" />
                                                Directions
                                            </Button>
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {isLoading ? (
                        <div className="flex items-center justify-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                        </div>
                    ) : (
                        <>
                            {/* Map Section */}
                            {hubs.length > 0 && (
                                <div ref={mapSectionRef} className="mb-16">
                                    <div className="bg-zinc-900 p-4 my-5 rounded-xl border border-zinc-800">
                                        {isLoaded ? (
                                            <GoogleMap
                                                mapContainerStyle={mapContainerStyle}
                                                center={mapCenter}
                                                zoom={mapZoom}
                                                onLoad={onLoad}
                                                onUnmount={onUnmount}
                                                options={{
                                                    styles: [
                                                        { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
                                                        { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
                                                        { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
                                                        {
                                                            featureType: "administrative.locality",
                                                            elementType: "labels.text.fill",
                                                            stylers: [{ color: "#d59563" }],
                                                        },
                                                        {
                                                            featureType: "poi",
                                                            elementType: "labels.text.fill",
                                                            stylers: [{ color: "#d59563" }],
                                                        },
                                                        {
                                                            featureType: "poi.park",
                                                            elementType: "geometry",
                                                            stylers: [{ color: "#263c3f" }],
                                                        },
                                                        {
                                                            featureType: "poi.park",
                                                            elementType: "labels.text.fill",
                                                            stylers: [{ color: "#6b9a76" }],
                                                        },
                                                        {
                                                            featureType: "road",
                                                            elementType: "geometry",
                                                            stylers: [{ color: "#38414e" }],
                                                        },
                                                        {
                                                            featureType: "road",
                                                            elementType: "geometry.stroke",
                                                            stylers: [{ color: "#212a37" }],
                                                        },
                                                        {
                                                            featureType: "road",
                                                            elementType: "labels.text.fill",
                                                            stylers: [{ color: "#9ca5b3" }],
                                                        },
                                                        {
                                                            featureType: "road.highway",
                                                            elementType: "geometry",
                                                            stylers: [{ color: "#746855" }],
                                                        },
                                                        {
                                                            featureType: "road.highway",
                                                            elementType: "geometry.stroke",
                                                            stylers: [{ color: "#1f2835" }],
                                                        },
                                                        {
                                                            featureType: "road.highway",
                                                            elementType: "labels.text.fill",
                                                            stylers: [{ color: "#f3d19c" }],
                                                        },
                                                        {
                                                            featureType: "transit",
                                                            elementType: "geometry",
                                                            stylers: [{ color: "#2f3948" }],
                                                        },
                                                        {
                                                            featureType: "transit.station",
                                                            elementType: "labels.text.fill",
                                                            stylers: [{ color: "#d59563" }],
                                                        },
                                                        {
                                                            featureType: "water",
                                                            elementType: "geometry",
                                                            stylers: [{ color: "#17263c" }],
                                                        },
                                                        {
                                                            featureType: "water",
                                                            elementType: "labels.text.fill",
                                                            stylers: [{ color: "#515c6d" }],
                                                        },
                                                        {
                                                            featureType: "water",
                                                            elementType: "labels.text.stroke",
                                                            stylers: [{ color: "#17263c" }],
                                                        },
                                                    ],
                                                }}
                                            >
                                                {hubs.map((hub) => (
                                                    <Marker
                                                        key={hub.hub_id}
                                                        position={{ lat: parseFloat(hub.latitude), lng: parseFloat(hub.longitude) }}
                                                        onClick={() => setActiveMarker(hub.hub_id)}
                                                    >
                                                        {activeMarker === hub.hub_id && (
                                                            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                                                                <div className="text-black p-2 max-w-[200px]">
                                                                    <h3 className="font-bold mb-1">{hub.hub_name}</h3>
                                                                    <p className="text-sm mb-1">{hub.dealer_address}</p>
                                                                    <p className="text-sm font-semibold">{hub.dealer_number}</p>
                                                                    {hub.dealer_link && (
                                                                        <a href={hub.dealer_link} target="_blank" rel="noreferrer" className="text-blue-600 text-sm underline mt-1 block">
                                                                            Get Directions
                                                                        </a>
                                                                    )}
                                                                </div>
                                                            </InfoWindow>
                                                        )}
                                                    </Marker>
                                                ))}
                                            </GoogleMap>
                                        ) : (
                                            <div className="h-[500px] w-full flex items-center justify-center bg-zinc-800 rounded-lg text-gray-400">
                                                Loading Map...
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}


                        </>
                    )}
                </div>
            </div >
    )
}
