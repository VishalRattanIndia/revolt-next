"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import axios from "axios"
import {
    Loader2,
    AlertCircle,
    User,
    Smartphone,
    Mail,
    MapPin,
    Calendar,
    Clock,
    CheckCircle2,
    Bike
} from "lucide-react"
import { format } from "date-fns"
import { useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"

// Bike models with images
const BIKE_MODELS = [
    { name: "RV400", image: "/images/400.png" },
    { name: "RV400 BRZ", image: "/images/BRZ.png" },
    { name: "RV1", image: "/images/rv1.webp" },
    { name: "RV1+", image: "/images/rv1-plus.webp" },
    { name: "RV BLAZEX", image: "/images/blazex.png" },
]

// Schema
const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    mobile: z.string().length(10, "Mobile number must be 10 digits"),
    email: z.string().email("Invalid email address"),
    model: z.string().min(1, "Please select a model"),
    state: z.string().min(1, "Please select a state"),
    city: z.string().min(1, "Please select a city"),
    hub: z.string().min(1, "Please select a hub"),
    testDate: z.string().min(1, "Please select a date"),
    otp: z.string().optional(),
    whatsapp: z.boolean(),
})

// Bike Details Data
const BIKE_DETAILS: any = {
    "RV400": {
        colors: [
            { name: "Rebel Red", hex: "#E31D2B", image: "/images/rebel-red/4.png" },
            { name: "Cosmic Black", hex: "#1A1A1A", image: "/images/cosmic-black/4.png" },
            { name: "Mist Grey", hex: "#808080", image: "/images/mist_grey/4.png" },
            { name: "Stealth Black", hex: "#000000", image: "/images/stealth_black/4.png" },
            { name: "India Blue", hex: "#0047AB", image: "/images/india_blue/4.png" },
        ],
        features: [
            { label: "0-80%", value: "3 Hrs 30 Mins", icon: "/images/calenderhours.svg" },
            { label: "Fast Charging", value: "0-80% in 1 Hr 20 Mins", icon: "/images/fast-charging.png" },
            { label: "Top Speed", value: "85 KM/H", icon: "/images/speed.svg" },
            { label: "Range", value: "150 KMS", sub: "Eco Mode", icon: "/images/battery.svg" },
        ]
    },
    "RV400 BRZ": {
        colors: [
            { name: "Cosmic Black", hex: "#1A1A1A", image: "/images/brz_cosmic_black.png" },
            { name: "Dark Lunar Green", hex: "#013220", image: "/images/brz_dark_lunar_green.png" },
            { name: "Dark Silver", hex: "#A9A9A9", image: "/images/brz_dark_silver.png" },
            { name: "Pacific Blue", hex: "#0096FF", image: "/images/brz_pacific_blue.png" },
            { name: "Rebel Red", hex: "#E31D2B", image: "/images/brz_rebel_red.png" },
        ],
        features: [
            { label: "0-80%", value: "3 Hrs 30 Mins", icon: "/images/calenderhours.svg" },
            { label: "Fast Charging", value: "0-80% in 1 Hr 20 Mins", icon: "/images/fast-charging.png" },
            { label: "Top Speed", value: "85 KM/H", icon: "/images/speed.svg" },
            { label: "Range", value: "150 KMS", sub: "Eco Mode", icon: "/images/battery.svg" },
        ]
    },
    "RV1": {
        colors: [
            { name: "Titan Red", hex: "#FF4500", image: "/images/rv1/rv1_titan_red.png" },
            { name: "Cosmic Black", hex: "#1A1A1A", image: "/images/rv1/rv1_cosmos_red.png" }, // Assuming cosmos red is the black variant based on legacy or just a placeholder if black not found
            { name: "Neon Green", hex: "#39FF14", image: "/images/rv1/rv1_neon_green.png" },
            { name: "Midnight Blue", hex: "#191970", image: "/images/rv1/rv1_midnight_blue.png" },
        ],
        features: [
            { label: "0-80%", value: "2 Hrs 15 Mins", icon: "/images/calenderhours.svg" },
            { label: "Top Speed", value: "70 KM/H", icon: "/images/speed.svg" },
            { label: "Range", value: "100 KMS", sub: "Eco Mode", icon: "/images/battery.svg" },
        ]
    },
    "RV1+": {
        colors: [
            { name: "Titan Red", hex: "#FF4500", image: "/images/rv1/rvplus_titan_red.png" },
            { name: "Cosmic Black", hex: "#1A1A1A", image: "/images/rv1/rvplus_cosmos_red.png" },
            { name: "Neon Green", hex: "#39FF14", image: "/images/rv1/rvplus_neon_green.png" },
            { name: "Midnight Blue", hex: "#191970", image: "/images/rv1/rvplus_midnight_blue.png" },
        ],
        features: [
            { label: "0-80%", value: "3 Hrs 30 Mins", icon: "/images/calenderhours.svg" },
            { label: "Fast Charging", value: "0-80% in 1 Hr 20 Mins", icon: "/images/fast-charging.png" },
            { label: "Top Speed", value: "70 KM/H", icon: "/images/speed.svg" },
            { label: "Range", value: "160 KMS", sub: "Eco Mode", icon: "/images/battery.svg" },
        ]
    },
    "RV BLAZEX": {
        colors: [
            { name: "Eclipse Red", hex: "#8B0000", image: "/images/blazex/rv-blazex-eclipse-red.png" },
            { name: "Sterling Silver", hex: "#C0C0C0", image: "/images/blazex/rv-blazex-sterling-silver.png" },
        ],
        features: [
            { label: "0-80%", value: "3 Hrs 30 Mins", icon: "/images/calenderhours.svg" },
            { label: "Fast Charging", value: "0-80% in 1 Hr 20 Mins", icon: "/images/fast-charging.png" },
            { label: "Top Speed", value: "85 KM/H", icon: "/images/speed.svg" },
            { label: "Range", value: "150 KMS", sub: "Eco Mode", icon: "/images/battery.svg" },
        ]
    }
}

export default function TestRideForm() {
    const searchParams = useSearchParams()
    const [step, setStep] = useState<"form" | "otp">("form")
    const [isLoading, setIsLoading] = useState(false)

    // Data States
    const [stateList, setStateList] = useState<any[]>([])
    const [cityList, setCityList] = useState<any[]>([])
    const [hubList, setHubList] = useState<any[]>([])

    const [availableCities, setAvailableCities] = useState<any[]>([])
    const [availableHubs, setAvailableHubs] = useState<any[]>([])
    const [timeSlots, setTimeSlots] = useState<any[]>([])

    // Special states for unavailable locations
    const [isUnavailable, setIsUnavailable] = useState(false)
    const [hubName, setHubName] = useState("")
    const [locationInfo, setLocationInfo] = useState("")

    // Form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            mobile: "",
            email: "",
            model: "RV400",
            state: "",
            city: "",
            hub: "",
            testDate: "",
            otp: "",
            whatsapp: true,
        },
    })

    // Fetch Initial Data (States, Cities, Hubs)
    useEffect(() => {
        const fetchCommonData = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/api/v1/common/getallstatelist`)
                if (response.data && response.data.data) {
                    setStateList(response.data.data.state.filter((s: any) => s.status == 1))
                    setCityList(response.data.data.city.filter((c: any) => c.status == 1))
                    setHubList(response.data.data.hub)
                }
            } catch (error) {
                console.error("Error fetching common data:", error)
            }
        }
        fetchCommonData()
    }, [])



    // Filter Cities when State changes
    const selectedState = form.watch("state")
    useEffect(() => {
        if (selectedState) {
            const cities = cityList.filter(city => city.state_id === parseInt(selectedState))
            setAvailableCities(cities)
            form.setValue("city", "")
            form.setValue("hub", "")
        } else {
            setAvailableCities([])
        }
    }, [selectedState, cityList, form])

    // Filter Hubs when City changes
    const selectedCity = form.watch("city")
    useEffect(() => {
        if (selectedCity) {
            const hubs = hubList.filter(hub => hub.city_id === parseInt(selectedCity))
            setAvailableHubs(hubs)
            form.setValue("hub", "")

            // Check if selected hub is unavailable
            const selectedHubData = hubs.find(h => h.hub_id === parseInt(form.getValues("hub")))
            if (selectedHubData) {
                setHubName(selectedHubData.hub_name)
                setIsUnavailable(selectedHubData.hub_name === "REVOLT CENTRAL HUB")
            }
        } else {
            setAvailableHubs([])
        }
    }, [selectedCity, hubList, form])

    // Fetch Time Slots when Date/Hub changes
    const selectedHub = form.watch("hub")
    const selectedDate = form.watch("testDate")

    useEffect(() => {
        const fetchSlots = async () => {
            if (selectedHub && selectedDate && !isUnavailable) {
                // Logic for fetching slots removed as per user request
            }
        }
        fetchSlots()
    }, [selectedHub, selectedDate, isUnavailable])

    // Handle Notify Me (for unavailable locations)
    const handleNotifyMe = async () => {
        const isValid = await form.trigger(["name", "mobile", "email", "model", "state", "city", "hub"])
        if (!isValid) return

        setIsLoading(true)
        try {
            const values = form.getValues()
            const response = await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/api/v1/customer/notifyme`, {
                name: values.name,
                mobile: values.mobile,
                email: values.email,
                model: values.model,
                state: values.state,
                city: values.city,
                hub: values.hub,
                whatsapp: values.whatsapp,
                search: searchParams.toString(),
            })

            if (response.data.status) {
                toast.success("Thank You!", {
                    description: "We'll notify you when we're available in your area.",
                })
            } else {
                toast.error("Error", {
                    description: response.data.message || "Failed to register notification",
                })
            }
        } catch (error) {
            toast.error("Error", {
                description: "Something went wrong. Please try again.",
            })
        } finally {
            setIsLoading(false)
        }
    }

    // Handle Send OTP
    const handleSendOtp = async () => {
        // Check if location is unavailable
        if (isUnavailable) {
            handleNotifyMe()
            return
        }

        const isValid = await form.trigger(["name", "mobile", "email", "model", "state", "city", "hub", "testDate"])
        if (!isValid) return

        setIsLoading(true)
        try {
            const { mobile, email } = form.getValues()
            const response = await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/api/v1/auth/sendotp`, {
                mobile,
                email,
            })

            if (response.data.status) {
                setStep("otp")
                toast.success("OTP Sent", {
                    description: "Please check your mobile number for OTP.",
                })
            } else {
                toast.error("Error", {
                    description: response.data.message || "Failed to send OTP",
                })
            }

        } catch (error) {
            toast.error("Error", {
                description: "Failed to send OTP. Please try again.",
            })
        } finally {
            setIsLoading(false)
        }
    }

    // Handle Final Submission
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true)
        try {
            // Verify OTP
            const verifyResponse = await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/api/v1/auth/verifyotp`, {
                mobile: data.mobile,
                otp: data.otp,
                headers: { Authorization: process.env.NEXT_PUBLIC_API_KEY },
            })

            if (verifyResponse.data.status === true) {
                // Submit Test Ride
                const submitResponse = await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/api/v1/customer/testRide`, {
                    name: data.name,
                    mobile: data.mobile,
                    email: data.email,
                    otp: data.otp,
                    model: data.model,
                    product_type: data.model,
                    state: data.state,
                    city: data.city,
                    hub: data.hub,
                    testdate: data.testDate,
                    whatsapp: data.whatsapp,
                    isSeller: false,
                    source: "web",
                    search: searchParams.toString(),
                })

                if (submitResponse.data.status) {
                    toast.success("Success!", {
                        description: "Your test ride has been booked successfully.",
                    })
                    window.location.href = `/thankyouride/${submitResponse.data.ride_id}`
                } else {
                    toast.error("Submission Failed", {
                        description: submitResponse.data.message || "Could not book test ride.",
                    })
                }
            } else {
                toast.error("Invalid OTP", {
                    description: "Please enter the correct OTP.",
                })
            }
        } catch (error) {
            toast.error("Error", {
                description: "Something went wrong. Please try again.",
            })
        } finally {
            setIsLoading(false)
        }
    }

    // Helper to get tomorrow's date for min date attribute
    const getMinDate = () => {
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        return format(tomorrow, 'yyyy-MM-dd')
    }







    const [selectedColor, setSelectedColor] = useState<any>(null)

    // Update selected color when model changes
    const selectedModel = form.watch("model")
    useEffect(() => {
        if (selectedModel && BIKE_DETAILS[selectedModel]) {
            setSelectedColor(BIKE_DETAILS[selectedModel].colors[0])
        }
    }, [selectedModel])

    return (
        <Card className="w-full max-w-7xl mx-auto bg-zinc-950 border-zinc-800 text-white shadow-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Left Side: Form */}
                <div className="lg:col-span-7 p-6 md:p-10 border-r border-zinc-800">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold mb-2 tracking-tight">
                            Book Your <span className="text-red-600">Test Ride</span>
                        </h2>
                        <p className="text-zinc-400">
                            Experience the thrill of India&apos;s first AI-enabled electric motorcycle
                        </p>
                    </div>

                    {/* Unavailable Location Alert */}
                    {isUnavailable && (
                        <Alert className="mb-8 bg-yellow-950/30 border-yellow-600/50 text-yellow-200">
                            <AlertCircle className="h-5 w-5 text-yellow-500" />
                            <AlertTitle className="text-yellow-500 font-semibold mb-1">Location Unavailable</AlertTitle>
                            <AlertDescription className="text-yellow-200/80">
                                We are currently unavailable at this location. Click "Notify Me" to get updates when we arrive in your area.
                            </AlertDescription>
                        </Alert>
                    )}

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit as any)} className="space-y-8">

                            {/* Section 1: Model Selection */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-lg font-semibold text-white/90">
                                    <div className="p-2 rounded-lg bg-red-600/10 text-red-500">
                                        <Bike className="w-5 h-5" />
                                    </div>
                                    <h3>Select Your Model</h3>
                                </div>

                                <div className="grid grid-cols-3 gap-3">
                                    {BIKE_MODELS.map((model) => (
                                        <div
                                            key={model.name}
                                            className={`cursor-pointer rounded-lg border px-3 py-2 text-center transition-all duration-300 ${form.watch("model") === model.name
                                                ? "border-red-600 bg-red-600/10 text-red-500"
                                                : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-600 text-zinc-400 hover:text-white"
                                                }`}
                                            onClick={() => form.setValue("model", model.name)}
                                        >
                                            <div className="font-medium text-sm">
                                                {model.name}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <Separator className="bg-zinc-900" />

                            {/* Section 2: Personal Details */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-lg font-semibold text-white/90">
                                    <div className="p-2 rounded-lg bg-blue-600/10 text-blue-500">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <h3>Personal Details</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-zinc-400">Full Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Full Name" {...field} className="bg-zinc-900 border-zinc-800 focus:border-red-600 focus:ring-red-600/20" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="mobile"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-zinc-400">Mobile Number</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="10 digit number" {...field} maxLength={10} className="bg-zinc-900 border-zinc-800 focus:border-red-600 focus:ring-red-600/20" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem className="md:col-span-2">
                                                <FormLabel className="text-zinc-400">Email Address</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Email address" {...field} className="bg-zinc-900 border-zinc-800 focus:border-red-600 focus:ring-red-600/20" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Section 3: Location Details */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-lg font-semibold text-white/90">
                                    <div className="p-2 rounded-lg bg-green-600/10 text-green-500">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <h3>Location Details</h3>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                    <FormField
                                        control={form.control}
                                        name="state"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-zinc-400">State</FormLabel>
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="bg-zinc-900 border-zinc-800 focus:ring-red-600/20">
                                                            <SelectValue placeholder="Select State" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {stateList.map((state) => (
                                                            <SelectItem key={state.state_id} value={state.state_id.toString()}>
                                                                {state.state_name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="city"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-zinc-400">City</FormLabel>
                                                <Select onValueChange={field.onChange} value={field.value} disabled={!selectedState}>
                                                    <FormControl>
                                                        <SelectTrigger className="bg-zinc-900 border-zinc-800 focus:ring-red-600/20">
                                                            <SelectValue placeholder="Select City" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {availableCities.map((city) => (
                                                            <SelectItem key={city.city_id} value={city.city_id.toString()}>
                                                                {city.city_name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="hub"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-zinc-400">Preferred Hub</FormLabel>
                                                <Select onValueChange={field.onChange} value={field.value} disabled={!selectedCity}>
                                                    <FormControl>
                                                        <SelectTrigger className="bg-zinc-900 border-zinc-800 focus:ring-red-600/20">
                                                            <SelectValue placeholder="Select Hub" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        {availableHubs.map((hub) => (
                                                            <SelectItem key={hub.hub_id} value={hub.hub_id.toString()}>
                                                                {hub.hub_name}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                {locationInfo && (
                                    <p className="text-sm text-green-500 flex items-center gap-2">
                                        <CheckCircle2 className="w-3 h-3" /> {locationInfo}
                                    </p>
                                )}
                            </div>

                            {/* Section 4: Schedule - Only show if location is available */}
                            {!isUnavailable && (
                                <>
                                    <Separator className="bg-zinc-900" />
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 text-lg font-semibold text-white/90">
                                            <div className="p-2 rounded-lg bg-purple-600/10 text-purple-500">
                                                <Calendar className="w-5 h-5" />
                                            </div>
                                            <h3>Schedule Your Ride</h3>
                                        </div>

                                        <div className="space-y-4">
                                            <FormField
                                                control={form.control}
                                                name="testDate"
                                                render={({ field }) => (
                                                    <FormItem className="flex flex-col">
                                                        <FormLabel className="text-zinc-400">Preferred Date</FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                type="date"
                                                                min={getMinDate()}
                                                                {...field}
                                                                className="bg-zinc-900 border-zinc-800 focus:border-red-600 focus:ring-red-600/20 block w-full md:w-1/2"
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />

                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="bg-zinc-900/50 rounded-lg p-3 border border-zinc-800">
                                <FormField
                                    control={form.control}
                                    name="whatsapp"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                    className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                                                />
                                            </FormControl>
                                            <div className="space-y-1 leading-none">
                                                <FormLabel className="text-zinc-300 font-normal cursor-pointer text-sm">
                                                    Get updates on <span className="text-green-500 font-semibold">WhatsApp</span>
                                                </FormLabel>
                                            </div>
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {step === "otp" && !isUnavailable && (
                                <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                                    <FormField
                                        control={form.control}
                                        name="otp"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-zinc-400">Enter OTP</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter 6 digit OTP"
                                                        {...field}
                                                        maxLength={6}
                                                        className="bg-zinc-900 border-zinc-800 focus:border-red-600 focus:ring-red-600/20 text-center text-lg tracking-widest"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            )}

                            <div className="pt-2">
                                {step === "form" ? (
                                    <Button
                                        type="button"
                                        onClick={handleSendOtp}
                                        disabled={isLoading}
                                        className="w-full bg-red-600 hover:bg-red-700 text-white h-12 text-lg font-semibold rounded-lg shadow-lg shadow-red-900/20 transition-all duration-300"
                                    >
                                        {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : isUnavailable ? "Notify Me When Available" : "Book Test Ride"}
                                    </Button>
                                ) : (
                                    <Button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-red-600 hover:bg-red-700 text-white h-12 text-lg font-semibold rounded-lg shadow-lg shadow-red-900/20 transition-all duration-300"
                                    >
                                        {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Verify OTP & Submit"}
                                    </Button>
                                )}
                                <p className="text-center text-zinc-500 text-xs mt-3">
                                    By booking, you agree to our Terms & Conditions.
                                </p>
                            </div>
                        </form>
                    </Form>
                </div>

                {/* Right Side: Image Display */}
                <div className="lg:col-span-5 relative bg-zinc-900/30 flex flex-col items-center justify-center p-6 min-h-[400px] lg:min-h-auto border-l border-zinc-800/50">
                    <div className="sticky top-10 w-full flex flex-col items-center">
                        {/* Bike Image */}
                        <div className="relative w-full aspect-square max-w-[500px] mb-6">
                            {selectedColor && (
                                <img
                                    key={selectedColor.image}
                                    src={selectedColor.image}
                                    alt={selectedModel}
                                    className="w-full h-full object-contain transition-all duration-500 animate-in fade-in zoom-in-95"
                                />
                            )}
                        </div>

                        {/* Model Name & Tagline */}
                        <div className="text-center mb-8">
                            <h3 className="text-4xl font-bold text-white mb-2 tracking-tight">{selectedModel}</h3>
                            <p className="text-zinc-400 text-lg">
                                {selectedModel === "RV400" && "India's First AI-Enabled Motorcycle"}
                                {selectedModel === "RV400 BRZ" && "Pure Performance, No Compromise"}
                                {selectedModel === "RV1" && "The New Standard of Commuting"}
                                {selectedModel === "RV1+" && "More Range, More Freedom"}
                                {selectedModel === "RV BLAZEX" && "Blaze Through the City"}
                            </p>
                        </div>

                        {/* Color Selection */}
                        {BIKE_DETAILS[selectedModel]?.colors && (
                            <div className="mb-10">
                                <p className="text-zinc-500 text-sm font-medium mb-3 text-center uppercase tracking-wider">Available Colors</p>
                                <div className="flex flex-wrap justify-center gap-3">
                                    {BIKE_DETAILS[selectedModel].colors.map((color: any) => (
                                        <div
                                            key={color.name}
                                            className={`group relative w-10 h-10 rounded-full cursor-pointer transition-all duration-300 ${selectedColor?.name === color.name
                                                ? "ring-2 ring-white ring-offset-4 ring-offset-zinc-950 scale-110"
                                                : "hover:scale-110 opacity-80 hover:opacity-100"
                                                }`}
                                            style={{ backgroundColor: color.hex }}
                                            onClick={() => setSelectedColor(color)}
                                            title={color.name}
                                        >
                                            {selectedColor?.name === color.name && (
                                                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-white bg-zinc-800 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                                    {color.name}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <p className="text-center text-zinc-300 mt-3 font-medium">{selectedColor?.name}</p>
                            </div>
                        )}

                        {/* Features Grid */}
                        {BIKE_DETAILS[selectedModel]?.features && (
                            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                                {BIKE_DETAILS[selectedModel].features.map((feature: any, idx: number) => (
                                    <div key={idx} className="bg-zinc-900/50 border border-zinc-800 p-4 rounded-xl flex flex-col items-center text-center hover:bg-zinc-900 transition-colors">
                                        <div className="h-10 w-10 mb-3 opacity-80">
                                            <img src={feature.icon} alt={feature.label} className="w-full h-full object-contain invert" />
                                        </div>
                                        <div className="text-2xl font-bold text-white mb-1">{feature.value}</div>
                                        <div className="text-xs text-zinc-500 uppercase tracking-wider font-medium">{feature.label}</div>
                                        {feature.sub && <div className="text-xs text-zinc-600 mt-1">{feature.sub}</div>}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    )
}
