import TestRideForm from "@/components/test-ride/TestRideForm"

export default function TestRidePage() {
    return (
        <div className="min-h-screen bg-black text-white">
            {/* Hero Section */}
            <div className="relative h-[300px] w-full bg-zinc-900 overflow-hidden mb-8">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-10" />
                {/* <img
                    src="https://revoltmotors.com/images/test-ride-banner.jpg"
                    alt="Test Ride"
                    className="w-full h-full object-cover opacity-50"
                /> */}
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4">
                    <h1 className="text-4xl md:text-6xl font-bold text-center mb-4">
                        <span className="text-red-600">Book</span> A Test Ride
                    </h1>
                    <p className="text-xl text-gray-300 text-center max-w-2xl">
                        Experience the power and intelligence of India&apos;s first AI-enabled electric motorcycle.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 pb-16">
                <TestRideForm />
            </div>
        </div>
    )
}
