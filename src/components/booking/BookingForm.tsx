"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight, ChevronLeft } from "lucide-react";
import { products } from "@/data/products";
import Image from "next/image";

// Create a union of all product keys for Zod validation
const productKeys = Object.keys(products) as [string, ...string[]];

const bookingSchema = z.object({
    model: z.enum(productKeys),
    color: z.string().min(1, "Please select a color"),
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    mobile: z.string().regex(/^[0-9]{10}$/, "Invalid mobile number"),
    state: z.string().min(1, "Please select a state"),
    city: z.string().min(1, "Please select a city"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const steps = ["Model", "Details", "Location", "Summary"];

export function BookingForm() {
    const [step, setStep] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);

    // Transform products object to array for easier mapping
    const models = Object.entries(products).map(([key, product]) => ({
        id: key,
        ...product
    }));

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        trigger,
        formState: { errors },
    } = useForm<BookingFormData>({
        resolver: zodResolver(bookingSchema),
        defaultValues: {
            model: "RV400", // Default to a valid key
            color: products["RV400"].colors[0].name,
        },
    });

    const formData = watch(); // eslint-disable-line react-hooks/incompatible-library

    // Update color when model changes
    const selectedModelData = models.find(m => m.id === formData.model);
    const selectedColorData = selectedModelData?.colors.find(c => c.name === formData.color);

    const nextStep = async () => {
        let fieldsToValidate: (keyof BookingFormData)[] = [];
        if (step === 0) fieldsToValidate = ["model", "color"];
        if (step === 1) fieldsToValidate = ["name", "email", "mobile"];
        if (step === 2) fieldsToValidate = ["state", "city"];

        const isValid = await trigger(fieldsToValidate);
        if (isValid) setStep((prev) => Math.min(prev + 1, steps.length - 1));
    };

    const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

    const onSubmit = (data: BookingFormData) => {
        console.log("Booking Data:", data);
        setIsSubmitted(true);
    };

    if (isSubmitted) {
        return (
            <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6 text-green-500">
                    <Check className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Booking Confirmed!</h2>
                <p className="text-muted-foreground max-w-md mb-8">
                    Thank you for booking your {products[formData.model as keyof typeof products]?.name}.
                    We have sent a confirmation email to {formData.email}.
                </p>
                <Button onClick={() => window.location.href = "/"}>Return Home</Button>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column: Form Steps */}
                <div className="lg:col-span-2">
                    {/* Progress Steps */}
                    <div className="flex justify-between mb-8 relative max-w-xl mx-auto lg:mx-0">
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border -z-10" />
                        {steps.map((label, index) => (
                            <div key={label} className="flex flex-col items-center bg-background px-2">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${index <= step
                                        ? "border-primary bg-primary text-primary-foreground"
                                        : "border-muted-foreground text-muted-foreground"
                                        }`}
                                >
                                    {index + 1}
                                </div>
                                <span className={`text-xs mt-2 ${index <= step ? "text-primary" : "text-muted-foreground"}`}>
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 min-h-[400px]">
                        <AnimatePresence mode="wait">
                            {step === 0 && (
                                <motion.div
                                    key="step1"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8"
                                >
                                    <div className="space-y-6">
                                        <div className="space-y-4">
                                            <h2 className="text-2xl font-bold">Select Model</h2>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                {models.map((model) => (
                                                    <div
                                                        key={model.id}
                                                        onClick={() => {
                                                            setValue("model", model.id);
                                                            setValue("color", model.colors[0].name); // Reset color on model change
                                                        }}
                                                        className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${formData.model === model.id
                                                            ? "border-primary bg-primary/5"
                                                            : "border-border hover:border-primary/50"
                                                            }`}
                                                    >
                                                        <h3 className="font-bold">{model.name}</h3>
                                                        <p className="text-sm text-muted-foreground">{model.price}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <h2 className="text-xl font-bold">Select Color: <span className="text-primary font-normal">{formData.color}</span></h2>
                                            <div className="flex flex-wrap gap-4">
                                                {selectedModelData?.colors.map((color) => (
                                                    <button
                                                        key={color.name}
                                                        type="button"
                                                        onClick={() => setValue("color", color.name)}
                                                        className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${formData.color === color.name
                                                            ? "border-primary scale-110"
                                                            : "border-transparent hover:scale-105"
                                                            }`}
                                                        style={{ backgroundColor: color.code }}
                                                        aria-label={color.name}
                                                    >
                                                        {formData.color === color.name && (
                                                            <Check className={`w-6 h-6 ${["#D1D3D4", "#fff"].includes(color.code) ? "text-black" : "text-white"}`} />
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 1 && (
                                <motion.div
                                    key="step2"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl font-bold">Personal Details</h2>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Full Name</label>
                                            <input
                                                {...register("name")}
                                                className="w-full p-3 rounded-lg border bg-background focus:ring-2 focus:ring-primary outline-none"
                                                placeholder="John Doe"
                                            />
                                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Email</label>
                                            <input
                                                {...register("email")}
                                                className="w-full p-3 rounded-lg border bg-background focus:ring-2 focus:ring-primary outline-none"
                                                placeholder="john@example.com"
                                            />
                                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">Mobile Number</label>
                                            <input
                                                {...register("mobile")}
                                                className="w-full p-3 rounded-lg border bg-background focus:ring-2 focus:ring-primary outline-none"
                                                placeholder="9876543210"
                                            />
                                            {errors.mobile && <p className="text-red-500 text-sm">{errors.mobile.message}</p>}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 2 && (
                                <motion.div
                                    key="step3"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl font-bold">Select Location</h2>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">State</label>
                                            <select
                                                {...register("state")}
                                                className="w-full p-3 rounded-lg border bg-background focus:ring-2 focus:ring-primary outline-none"
                                            >
                                                <option value="">Select State</option>
                                                <option value="DL">Delhi</option>
                                                <option value="MH">Maharashtra</option>
                                                <option value="KA">Karnataka</option>
                                            </select>
                                            {errors.state && <p className="text-red-500 text-sm">{errors.state.message}</p>}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium">City</label>
                                            <select
                                                {...register("city")}
                                                className="w-full p-3 rounded-lg border bg-background focus:ring-2 focus:ring-primary outline-none"
                                            >
                                                <option value="">Select City</option>
                                                <option value="ND">New Delhi</option>
                                                <option value="MU">Mumbai</option>
                                                <option value="BL">Bangalore</option>
                                            </select>
                                            {errors.city && <p className="text-red-500 text-sm">{errors.city.message}</p>}
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {step === 3 && (
                                <motion.div
                                    key="step4"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-6"
                                >
                                    <h2 className="text-2xl font-bold">Booking Summary</h2>
                                    <div className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-xl space-y-4">
                                        <div className="flex justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
                                            <span className="text-muted-foreground">Model</span>
                                            <span className="font-bold">{selectedModelData?.name}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
                                            <span className="text-muted-foreground">Color</span>
                                            <span className="font-bold">{formData.color}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
                                            <span className="text-muted-foreground">Customer</span>
                                            <span className="font-bold">{formData.name}</span>
                                        </div>
                                        <div className="flex justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
                                            <span className="text-muted-foreground">Location</span>
                                            <span className="font-bold">{formData.city}, {formData.state}</span>
                                        </div>
                                        <div className="flex justify-between pt-2">
                                            <span className="text-lg font-bold">Booking Amount</span>
                                            <span className="text-lg font-bold text-primary">₹ 499</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="flex justify-between pt-8">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={prevStep}
                                disabled={step === 0}
                                className={step === 0 ? "invisible" : ""}
                            >
                                <ChevronLeft className="mr-2 h-4 w-4" /> Back
                            </Button>

                            {step < steps.length - 1 ? (
                                <Button type="button" onClick={nextStep}>
                                    Next <ChevronRight className="ml-2 h-4 w-4" />
                                </Button>
                            ) : (
                                <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
                                    Pay ₹ 499 & Book
                                </Button>
                            )}
                        </div>
                    </form>
                </div>

                {/* Right Column: Persistent Preview */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 bg-zinc-100 dark:bg-zinc-900 rounded-2xl p-6 space-y-6">
                        <h3 className="text-xl font-bold">Your Selection</h3>

                        <div className="aspect-[4/3] relative w-full bg-white dark:bg-zinc-800 rounded-xl flex items-center justify-center p-4">
                            <div className="relative w-full h-full">
                                <Image
                                    src={selectedColorData?.image || selectedModelData?.image || "/images/product_black.png"}
                                    alt={selectedModelData?.name || "Bike"}
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <div className="text-sm text-muted-foreground">Model</div>
                                <div className="text-2xl font-bold">{selectedModelData?.name}</div>
                            </div>
                            <div>
                                <div className="text-sm text-muted-foreground">Color</div>
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-4 h-4 rounded-full border border-zinc-300"
                                        style={{ backgroundColor: selectedColorData?.code }}
                                    />
                                    <div className="font-medium">{formData.color}</div>
                                </div>
                            </div>
                            <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
                                <div className="flex justify-between items-end">
                                    <div className="text-sm text-muted-foreground">Price</div>
                                    <div className="text-xl font-bold text-primary">{selectedModelData?.price}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


