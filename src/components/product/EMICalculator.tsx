"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function EMICalculator() {
    const [downpayment, setDownpayment] = useState(28500);
    const [tenure, setTenure] = useState(60);
    const [selectedColor, setSelectedColor] = useState("Black Midnight Blue");
    const [selectedBank, setSelectedBank] = useState<"idfc" | "icici" | "rupyy" | "jana">("idfc");

    const bikePrice = 99999; // Base price, should ideally come from props or context

    // Bank configurations from old website
    const bankConfig = {
        idfc: {
            name: "IDFC",
            rate: 7.99,
            tenures: [12, 24, 36, 48, 60],
            logo: "/images/banks/idfc.svg" // Placeholder path
        },
        icici: {
            name: "ICICI",
            rate: 9.99,
            tenures: [12, 24, 36],
            logo: "/images/banks/icici.png" // Placeholder path
        },
        rupyy: {
            name: "Rupyy",
            rate: 9.5,
            tenures: [12, 24, 36, 48, 60, 72],
            logo: "/images/banks/rupyy.png" // Placeholder path
        },
        jana: {
            name: "Jana",
            rate: 8.99,
            tenures: [12, 24, 36, 48],
            logo: "/images/banks/jana.png" // Placeholder path
        }
    };

    const currentBank = bankConfig[selectedBank];

    // Update tenure logic moved to bank selection handler


    const loanAmount = bikePrice - downpayment;

    // Calculation logic from old website (Flat Rate for "Month" type)
    // calculatedEmi = (loanAmount + loanAmount * (rate/100) * (tenure/12)) / tenure
    const interestRate = currentBank.rate;
    const totalInterest = loanAmount * (interestRate / 100) * (tenure / 12);
    const totalAmountPayable = loanAmount + totalInterest;
    const emi = Math.ceil(totalAmountPayable / tenure);

    const colors = [
        { name: "Cosmos Red", code: "#E31E24" },
        { name: "Midnight Blue", code: "#1C2B4B" },
        { name: "Neon Green", code: "#C4D600" },
        { name: "Titan Red", code: "#8A151B" },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 max-w-screen-2xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-zinc-900">RV1 EMI Calculator</h2>

                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        {/* Model & Color Selection */}
                        <div className="space-y-6">
                            <div className="flex gap-4 overflow-x-auto pb-2">
                                <Button variant="outline" className="rounded-full border-primary text-primary bg-primary/5">RV1</Button>
                                <Button variant="ghost" className="rounded-full text-zinc-600">RV1+</Button>
                                <Button variant="ghost" className="rounded-full text-zinc-600">RV400</Button>
                                <Button variant="ghost" className="rounded-full text-zinc-600">RV400 BRZ</Button>
                            </div>

                            <div className="space-y-4">
                                <p className="font-medium text-zinc-900">Color : {selectedColor}</p>
                                <div className="flex gap-4">
                                    {colors.map((color) => (
                                        <button
                                            key={color.name}
                                            onClick={() => setSelectedColor(color.name)}
                                            className={cn(
                                                "w-8 h-8 rounded-full border-2 transition-all",
                                                selectedColor === color.name ? "border-primary scale-110" : "border-transparent"
                                            )}
                                            style={{ backgroundColor: color.code }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Downpayment Slider */}
                        <div className="space-y-6">
                            <div className="flex justify-between items-center">
                                <span className="text-lg text-zinc-900">Downpayment</span>
                                <span className="text-xl font-bold text-zinc-900">₹ {downpayment.toLocaleString()}</span>
                            </div>
                            <Slider
                                value={[downpayment]}
                                onValueChange={(value) => setDownpayment(value[0])}
                                max={50000}
                                min={5000}
                                step={500}
                                className="cursor-pointer"
                            />
                            <div className="flex justify-between text-sm text-zinc-400">
                                <span>Min: ₹ 5,000</span>
                                <span>Max: ₹ 50,000</span>
                            </div>
                        </div>

                        {/* Bank Partners */}
                        <div className="space-y-4">
                            <p className="font-medium text-zinc-900">Select Bank :</p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {(Object.keys(bankConfig) as Array<keyof typeof bankConfig>).map((bankKey) => (
                                    <button
                                        key={bankKey}
                                        onClick={() => {
                                            setSelectedBank(bankKey);
                                            const newBank = bankConfig[bankKey];
                                            if (!newBank.tenures.includes(tenure)) {
                                                setTenure(newBank.tenures[newBank.tenures.length - 1]);
                                            }
                                        }}
                                        className={cn(
                                            "flex flex-col items-center p-4 rounded-xl border-2 transition-all",
                                            selectedBank === bankKey
                                                ? "border-primary bg-primary/5"
                                                : "border-zinc-100 hover:border-zinc-200"
                                        )}
                                    >
                                        <span className="font-bold text-lg text-zinc-900">{bankConfig[bankKey].name}</span>
                                        <span className="text-sm text-zinc-500">{bankConfig[bankKey].rate}%</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Tenure Selection */}
                        <div className="space-y-4">
                            <p className="font-medium text-zinc-900">Tenure (Months) :</p>
                            <div className="flex gap-4 flex-wrap">
                                {currentBank.tenures.map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setTenure(t)}
                                        className={cn(
                                            "w-12 h-12 rounded-lg font-bold transition-all",
                                            tenure === t
                                                ? "bg-primary text-white shadow-lg scale-110"
                                                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
                                        )}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Summary Card */}
                    <div className="bg-white p-8 rounded-3xl shadow-xl border border-zinc-100 h-fit">
                        <div className="space-y-8 text-center">
                            <div className="border-b border-zinc-100 pb-6">
                                <p className="text-zinc-500 mb-2">Bike Price</p>
                                <p className="text-3xl font-bold text-zinc-900">₹ {bikePrice.toLocaleString()}</p>
                            </div>

                            <div className="border-b border-zinc-100 pb-6">
                                <p className="text-zinc-500 mb-2">You will pay</p>
                                <p className="text-4xl font-bold text-primary">₹ {emi.toLocaleString()}<span className="text-lg text-zinc-400 font-normal">/month</span></p>
                            </div>

                            <div className="pb-6">
                                <p className="text-zinc-500 mb-2">Loan Amount</p>
                                <p className="text-2xl font-bold text-zinc-900">₹ {loanAmount.toLocaleString()}</p>
                            </div>

                            <Button className="w-full h-12 text-lg rounded-xl" size="lg">
                                Book Now <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
