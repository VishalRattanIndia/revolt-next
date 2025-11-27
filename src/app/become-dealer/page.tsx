import { Metadata } from "next"
import BecomeDealerForm from "@/components/dealer/BecomeDealerForm"

export const metadata: Metadata = {
    title: "Become an Electric Bike Dealer - Revolt Motors",
    description: "Explore dealer opportunities for electric bikes. Join us and boost your business with India's number 1 electric bike brand.",
}

export default function BecomeDealerPage() {
    return (
        <div className="min-h-screen bg-black py-12 text-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto space-y-8">
                    <div className="text-center space-y-4">
                        <h1 className="text-3xl font-bold text-white">Become a Revolt Dealer</h1>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Revolt Motors employs a comprehensive and professional process for Dealership allotment.
                            Dealer selection is done based on a variety of criteria including a personal meeting with the applicant.
                        </p>
                    </div>

                    <div className="bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded-r-md">
                        <div className="flex">
                            <div className="ml-3">
                                <h3 className="text-sm font-medium text-yellow-500">Important Notice</h3>
                                <div className="mt-2 text-sm text-yellow-600/90">
                                    <p>
                                        There are some unscrupulous elements posing to be employees/agents of Revolt Motors offering
                                        Dealership allotment by providing misleading information. You are advised not to share any
                                        personal data or transfer any money to such fraudsters.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <BecomeDealerForm />
                </div>
            </div>
        </div>
    )
}
