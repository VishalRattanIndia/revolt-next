"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useAuthStore } from "@/store/authStore"
import axios from "axios"

const INVEST_AMOUNT = [
    { Option: "Min 24 Lacs", Value: "Min 24 Lacs" },
    { Option: "25-30 Lacs", Value: "25-30 Lacs" },
    { Option: "30–40 Lacs", Value: "30–40 Lacs" },
];

const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    age: z.string().refine((val) => parseInt(val) >= 18 && parseInt(val) <= 100, {
        message: "Age must be between 18 and 100",
    }),
    email: z.string().email("Invalid email address"),
    mobile: z.string().length(10, "Mobile number must be 10 digits"),
    state: z.string().min(1, "Please select a state"),
    city: z.string().min(1, "Please select a city"),
    district: z.string().min(1, "District is required"),
    pincode: z.string().length(6, "Pincode must be 6 digits"),
    education: z.string().optional(),
    occupation: z.string().optional(),
    turnover: z.string().optional(),
    experience: z.string().optional(),
    address: z.string().min(10, "Address must be at least 10 characters"),
    otp: z.string().optional(),
    source: z.string().min(1, "Please select where you heard about us"),
    ExistingBusiness: z.string().optional(),
    OwnDealership: z.boolean().default(false),
    brand: z.string().optional(),
    ProposedDealershipPremises: z.string().min(1, "Please select proposed dealership premises"),
    Invest: z.string().min(1, "Please select investment amount"),
}).refine((data) => {
    if (data.OwnDealership && (!data.brand || data.brand.length < 1)) {
        return false;
    }
    return true;
}, {
    message: "Brand name is required if you own a dealership",
    path: ["brand"],
});

type FormData = z.infer<typeof formSchema>

interface State {
    state_id: number
    state_name: string
}

interface City {
    city_id: number
    city_name: string
    state_id: number
}

interface Source {
    id: number
    source: string
}

export default function BecomeDealerForm() {
    const { user } = useAuthStore()
    const [step, setStep] = useState<"form" | "otp">("form")
    const [isLoading, setIsLoading] = useState(false)
    const [otpSent, setOtpSent] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [stateList, setStateList] = useState<State[]>([])
    const [cityList, setCityList] = useState<City[]>([])
    const [availableCities, setAvailableCities] = useState<City[]>([])
    const [sourceList, setSourceList] = useState<Source[]>([])

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema) as any,
        defaultValues: {
            name: user?.name || "",
            email: user?.email || "",
            mobile: user?.mobile || "",
            age: "",
            state: "",
            city: "",
            district: "",
            pincode: "",
            address: "",
            source: "",
            ExistingBusiness: "",
            OwnDealership: false,
            brand: "",
            ProposedDealershipPremises: "",
            Invest: "",
        },
    })

    const { register, handleSubmit, formState: { errors }, trigger, watch, setValue } = form
    const selectedState = watch("state")
    const ownDealership = watch("OwnDealership")

    useEffect(() => {
        const fetchStateCity = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/api/v1/common/getallstatelist`)
                if (response.data && response.data.data) {
                    setStateList(response.data.data.state)
                    setCityList(response.data.data.city)
                }
            } catch (error) {
                console.error("Error fetching state/city list:", error)
            }
        }

        const fetchSource = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_URL_API}/api/v1/customer/dropdown`)
                if (response.data && response.data.message) {
                    setSourceList(response.data.message)
                }
            } catch (error) {
                console.error("Error fetching source list:", error)
            }
        }

        fetchStateCity()
        fetchSource()
    }, [])

    useEffect(() => {
        if (selectedState) {
            const cities = cityList.filter(city => city.state_id === parseInt(selectedState))
            setAvailableCities(cities)
            setValue("city", "") // Reset city when state changes
        } else {
            setAvailableCities([])
        }
    }, [selectedState, cityList, setValue])

    const onSubmit = async (data: FormData) => {
        setIsLoading(true)
        try {
            if (step === "form") {
                // Send OTP
                const response = await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/api/v1/auth/sendotp`, {
                    mobile: data.mobile,
                    email: data.email,
                })
                if (response.data) { // Assuming success if data comes back, adjust based on actual API response
                    setOtpSent(true)
                    setStep("otp")
                } else {
                    alert("Failed to send OTP. Please try again.")
                }
            } else {
                // Verify OTP and Submit
                const verifyResponse = await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/api/v1/auth/verifyotp`, {
                    mobile: data.mobile,
                    otp: data.otp,
                    headers: { Authorization: process.env.NEXT_PUBLIC_API_KEY },
                })

                if (verifyResponse.data.status === true) {
                    // Submit Application
                    const submitResponse = await axios.post(`${process.env.NEXT_PUBLIC_URL_API}/api/v1/customer/becomedealer`, {
                        name: data.name,
                        age: data.age,
                        pincode: data.pincode,
                        mobile: data.mobile,
                        email: data.email,
                        state: data.state,
                        city: data.city,
                        District: data.district,
                        Address: data.address,
                        brand: data.brand,
                        ExistingBusiness: data.ExistingBusiness,
                        NameBusiness: "", // Legacy field, sending empty
                        Turnover: "", // Legacy field, sending empty
                        EducationQualification: "", // Legacy field, sending empty
                        InformationSource: "", // Legacy field, sending empty
                        ProposedDealershipPremises: data.ProposedDealershipPremises,
                        Invest: data.Invest,
                        Details: "", // Legacy field, sending empty
                        Area: "", // Legacy field, sending empty
                        Frontage: "", // Legacy field, sending empty
                        OwnDealership: data.OwnDealership ? 1 : 0,
                        whatsapp: false,
                        source: data.source,
                        ref_source: "",
                        reference: ""
                    })

                    if (submitResponse.data.status !== false) {
                        console.log("Form submitted:", data)
                        setIsSubmitted(true)
                    } else {
                        alert(submitResponse.data.message || "Submission failed.")
                    }
                } else {
                    alert("Invalid OTP. Please try again.")
                }
            }
        } catch (error) {
            console.error("Error:", error)
            alert("An error occurred. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleSendOtp = async () => {
        const isValid = await trigger([
            "name", "email", "mobile", "age", "state", "city", "district", "pincode", "address",
            "source", "ProposedDealershipPremises", "Invest", "brand"
        ])
        if (isValid) {
            handleSubmit(onSubmit)()
        }
    }

    if (isSubmitted) {
        return (
            <div className="max-w-3xl mx-auto bg-zinc-900 border border-zinc-800 p-8 rounded-lg shadow-2xl text-white">
                <h2 className="text-2xl font-bold mb-6 text-center text-red-500">Thank You</h2>
                <div className="space-y-4 text-gray-300">
                    <p>We thank you for showing interest in associating with Revolt Motors as a Channel Partner.</p>
                    <p>We have received your application. We will review your application and contact you back if its gets shortlisted for further review process or if we need more information for the same.</p>
                    <div className="bg-zinc-800 p-4 rounded-md border border-zinc-700 mt-6">
                        <p className="mb-2 font-semibold text-white">Important Notice:</p>
                        <p>In addition, we would like to update you that some unscrupulous elements posing to be employees of /agents of Revolt Motors are offering Dealership allotment of Revolt Motors by providing misleading information through fraudulent websites, emails, telephone, messages, etc. and demanding money in this regard.</p>
                        <p className="mt-2">You are advised not to share any personal data or transfer any money to such fraudsters. We strongly advise you to seek clarifications by writing to us at <a href="mailto:DDREVOLT@REVOLTMOTORS.COM" className="text-red-500 hover:underline">DDREVOLT@REVOLTMOTORS.COM</a> / visiting our official website at <a href="https://www.revoltmotors.com/" target="_blank" rel="noopener noreferrer" className="text-red-500 hover:underline">https://www.revoltmotors.com/</a> or calling us at 9873050505.</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-3xl mx-auto bg-zinc-900 border border-zinc-800 p-8 rounded-lg shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-center text-white">Become a Revolt Dealer</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Personal Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-gray-300">Applicant Name *</Label>
                        <Input id="name" {...register("name")} placeholder="Enter your name" className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-500 focus:border-white" />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="age" className="text-gray-300">Age *</Label>
                        <Input id="age" type="number" {...register("age")} placeholder="Age" className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-500 focus:border-white" />
                        {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-gray-300">Email *</Label>
                        <Input id="email" type="email" {...register("email")} placeholder="Email address" className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-500 focus:border-white" />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="mobile" className="text-gray-300">Mobile *</Label>
                        <Input id="mobile" type="tel" maxLength={10} {...register("mobile")} placeholder="Mobile number" className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-500 focus:border-white" />
                        {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="source" className="text-gray-300">Where did you hear about Revolt *</Label>
                    <Select onValueChange={(value) => setValue("source", value)}>
                        <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white focus:border-white">
                            <SelectValue placeholder="Select Source" />
                        </SelectTrigger>
                        <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                            {sourceList.map((source) => (
                                <SelectItem key={source.id} value={source.id.toString()} className="focus:bg-zinc-700 focus:text-white">
                                    {source.source}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.source && <p className="text-red-500 text-sm">{errors.source.message}</p>}
                </div>

                {/* Existing Business Details */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white">Existing Business Details</h3>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="OwnDealership"
                            checked={ownDealership}
                            onCheckedChange={(checked) => setValue("OwnDealership", checked as boolean)}
                            className="border-zinc-700 data-[state=checked]:bg-white data-[state=checked]:text-black"
                        />
                        <Label htmlFor="OwnDealership" className="text-gray-300">Do you own any automobile dealership?</Label>
                    </div>

                    {ownDealership && (
                        <div className="space-y-2">
                            <Label htmlFor="brand" className="text-gray-300">Name of Automobile brand *</Label>
                            <Input id="brand" {...register("brand")} placeholder="Name of Automobile brand" className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-500 focus:border-white" />
                            {errors.brand && <p className="text-red-500 text-sm">{errors.brand.message}</p>}
                        </div>
                    )}
                </div>

                {/* Proposed Premises Details */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-white">Proposed Premises Details *</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="ProposedDealershipPremises" className="text-gray-300">Proposed Dealership Premises *</Label>
                            <Select onValueChange={(value) => setValue("ProposedDealershipPremises", value)}>
                                <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white focus:border-white">
                                    <SelectValue placeholder="Select Dealership Premises" />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                                    <SelectItem value="Own" className="focus:bg-zinc-700 focus:text-white">Own</SelectItem>
                                    <SelectItem value="Leased" className="focus:bg-zinc-700 focus:text-white">Leased</SelectItem>
                                    <SelectItem value="Rented" className="focus:bg-zinc-700 focus:text-white">Rented</SelectItem>
                                    <SelectItem value="Not finalized" className="focus:bg-zinc-700 focus:text-white">Not finalized</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.ProposedDealershipPremises && <p className="text-red-500 text-sm">{errors.ProposedDealershipPremises.message}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="Invest" className="text-gray-300">Proposed Amount to Invest *</Label>
                            <Select onValueChange={(value) => setValue("Invest", value)}>
                                <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white focus:border-white">
                                    <SelectValue placeholder="Proposed Amount to Invest" />
                                </SelectTrigger>
                                <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                                    {INVEST_AMOUNT.map((item) => (
                                        <SelectItem key={item.Value} value={item.Value} className="focus:bg-zinc-700 focus:text-white">
                                            {item.Option}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.Invest && <p className="text-red-500 text-sm">{errors.Invest.message}</p>}
                        </div>
                    </div>
                </div>

                {/* Location Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    <div className="space-y-2">
                        <Label htmlFor="state" className="text-gray-300">State *</Label>
                        <Select onValueChange={(value) => setValue("state", value)}>
                            <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white focus:border-white">
                                <SelectValue placeholder="Select State" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                                {stateList.map((state) => (
                                    <SelectItem key={state.state_id} value={state.state_id.toString()} className="focus:bg-zinc-700 focus:text-white">
                                        {state.state_name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="city" className="text-gray-300">City *</Label>
                        <Select onValueChange={(value) => setValue("city", value)} disabled={!selectedState}>
                            <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white focus:border-white">
                                <SelectValue placeholder="Select City" />
                            </SelectTrigger>
                            <SelectContent className="bg-zinc-800 border-zinc-700 text-white">
                                {availableCities.map((city) => (
                                    <SelectItem key={city.city_id} value={city.city_id.toString()} className="focus:bg-zinc-700 focus:text-white">
                                        {city.city_name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                    </div>


                    <div className="space-y-2">
                        <Label htmlFor="district" className="text-gray-300">District *</Label>
                        <Input id="district" {...register("district")} placeholder="District" className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-500 focus:border-white" />
                        {errors.district && <p className="text-red-500 text-sm">{errors.district.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="pincode" className="text-gray-300">Pincode *</Label>
                        <Input id="pincode" maxLength={6} {...register("pincode")} placeholder="Pincode" className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-500 focus:border-white" />
                        {errors.pincode && <p className="text-red-500 text-sm">{errors.pincode.message}</p>}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="address" className="text-gray-300">Proposed Dealership Address *</Label>
                    <Textarea id="address" {...register("address")} placeholder="Enter complete address" className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-500 focus:border-white" />
                    {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                </div>

                {/* OTP Section */}
                {step === "otp" && (
                    <div className="space-y-2">
                        <Label htmlFor="otp" className="text-gray-300">Enter OTP</Label>
                        <Input id="otp" {...register("otp")} placeholder="Enter OTP sent to mobile" className="bg-zinc-800 border-zinc-700 text-white placeholder:text-gray-500 focus:border-white" />
                        {errors.otp && <p className="text-red-500 text-sm">{errors.otp.message}</p>}
                    </div>
                )}

                <div className="flex justify-center pt-4">
                    {step === "form" ? (
                        <Button type="button" onClick={handleSendOtp} disabled={isLoading} className="w-full md:w-auto px-8 bg-white text-black hover:bg-gray-200">
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Next
                        </Button>
                    ) : (
                        <Button type="submit" disabled={isLoading} className="w-full md:w-auto px-8 bg-white text-black hover:bg-gray-200">
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                            Submit Application
                        </Button>
                    )}
                </div>
            </form>
        </div>
    )
}
