"use client"

import { useEffect, use } from "react"
import Link from "next/link"
import { CheckCircle2, ArrowRight, Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function ThankYouPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params)
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
            <Card className="max-w-md w-full bg-zinc-900 border-zinc-800 p-8 text-center">
                <div className="flex justify-center mb-6">
                    <div className="h-20 w-20 bg-green-500/10 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="h-10 w-10 text-green-500" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
                <p className="text-zinc-400 mb-8">
                    Your test ride has been successfully booked.
                </p>

                <div className="bg-zinc-950/50 rounded-lg p-4 mb-8 border border-zinc-800/50">
                    <p className="text-sm text-zinc-500 mb-1">Booking Reference ID</p>
                    <p className="text-lg font-mono font-semibold tracking-wider text-white">
                        {id}
                    </p>
                </div>

                <div className="space-y-3">
                    <Link href="/">
                        <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
                            Back to Home
                        </Button>
                    </Link>
                    <Link href="/showrooms">
                        <Button variant="outline" className="w-full border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white">
                            Locate Showroom
                        </Button>
                    </Link>
                </div>
            </Card>
        </div>
    )
}
