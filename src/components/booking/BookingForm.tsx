"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, ChevronRight, ChevronLeft } from "lucide-react";

const bookingSchema = z.object({
    model: z.enum(["rv400", "brz"]),
    color: z.string().min(1, "Please select a color"),
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    mobile: z.string().regex(/^[0-9]{10}$/, "Invalid mobile number"),
    state: z.string().min(1, "Please select a state"),
    city: z.string().min(1, "Please select a city"),
});

type BookingFormData = z.infer<typeof bookingSchema>;

const steps = ["Model", "Details", "Location", "Summary"];

const models = [
    { id: "rv400", name: "RV400", price: "₹ 1,39,000", colors: ["Black", "Red", "White"] },
    { id: "brz", name: "RV400 BRZ", price: "₹ 1,28,000", colors: ["Blue", "Green", "Silver"] },
];

export function BookingForm() {
    const [step, setStep] = useState(0);
    const [isSubmitted, setIsSubmitted] = useState(false);

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
            model: "rv400",
            color: "Black",
        },
    });

    const formData = watch(); // eslint-disable-line react-hooks/incompatible-library

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
                    Thank you for booking your {models.find((m) => m.id === formData.model)?.name}.
                    We have sent a confirmation email to {formData.email}.
                </p>
                <Button onClick={() => window.location.href = "/"}>Return Home</Button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            {/* Progress Steps */}
            <div className="flex justify-between mb-12 relative">
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

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <AnimatePresence mode="wait">
                    {step === 0 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <h2 className="text-2xl font-bold">Select Your Model</h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {models.map((model) => (
                                    <div
                                        key={model.id}
                                        onClick={() => {
                                            setValue("model", model.id as "rv400" | "brz");
                                            setValue("color", model.colors[0]); // Reset color on model change
                                        }}
                                        className={`cursor-pointer p-6 rounded-xl border-2 transition-all ${formData.model === model.id
                                            ? "border-primary bg-primary/5"
                                            : "border-border hover:border-primary/50"
                                            }`}
                                    >
                                        <h3 className="text-xl font-bold">{model.name}</h3>
                                        <p className="text-muted-foreground">{model.price}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-medium">Select Color</label>
                                <div className="flex gap-4">
                                    {models
                                        .find((m) => m.id === formData.model)
                                        ?.colors.map((color) => (
                                            <button
                                                key={color}
                                                type="button"
                                                onClick={() => setValue("color", color)}
                                                className={`px-4 py-2 rounded-lg border transition-all ${formData.color === color
                                                    ? "border-primary bg-primary text-primary-foreground"
                                                    : "border-border hover:bg-accent"
                                                    }`}
                                            >
                                                {color}
                                            </button>
                                        ))}
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
                            <div className="bg-zinc-900 p-6 rounded-xl space-y-4">
                                <div className="flex justify-between border-b border-zinc-800 pb-4">
                                    <span className="text-muted-foreground">Model</span>
                                    <span className="font-bold">{models.find(m => m.id === formData.model)?.name}</span>
                                </div>
                                <div className="flex justify-between border-b border-zinc-800 pb-4">
                                    <span className="text-muted-foreground">Color</span>
                                    <span className="font-bold">{formData.color}</span>
                                </div>
                                <div className="flex justify-between border-b border-zinc-800 pb-4">
                                    <span className="text-muted-foreground">Customer</span>
                                    <span className="font-bold">{formData.name}</span>
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
    );
}
