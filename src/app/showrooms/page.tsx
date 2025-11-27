// Showrooms page component
import LocateDealer from "@/components/showrooms/LocateDealer"

export default function ShowroomsPage() {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <div className="relative h-[300px] w-full bg-zinc-900 overflow-hidden mb-8">
                <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/80 z-10" />
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4">
                    <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
                        <span className="text-red-600">Locate Revolt Motors</span> Showrooms in Your City
                    </h1>
                    <p className="text-gray-300 text-center max-w-2xl">
                        Find the nearest Revolt Hub to experience the future of mobility.
                    </p>
                </div>
            </div>

            <LocateDealer />
        </div>
    )
}
