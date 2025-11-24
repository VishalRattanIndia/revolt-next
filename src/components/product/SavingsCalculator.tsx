"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { motion } from "framer-motion";


export function SavingsCalculator() {
    const [dailyDistance, setDailyDistance] = useState(50);

    // Constants from old website (ev_ice_comparision.js)
    const petrolPrice = 100; // INR per liter
    const electricityPrice = 6; // INR per unit
    const averageICE = 60; // km per liter
    const averageElectric = 31.25; // km per unit (derived from old code logic)

    const monthlyDistance = dailyDistance * 30;

    // Calculations from old website
    const cost_ice = petrolPrice / averageICE; // ~1.66
    const cost_ev = electricityPrice / averageElectric; // ~0.192

    const monthlyPetrolCost = Math.round(monthlyDistance * cost_ice);
    const monthlyElectricityCost = Math.round(monthlyDistance * cost_ev);

    const monthlySavings = monthlyPetrolCost - monthlyElectricityCost;
    const annualSavings = monthlySavings * 12;

    return (
        <section className="py-24 bg-zinc-100">
            <div className="container mx-auto px-4 max-w-screen-2xl">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-zinc-900">
                                ELECTRIC BIKE <br />
                                <span className="text-primary">SAVINGS CALCULATOR</span>
                            </h2>
                            <p className="text-zinc-600 text-lg">
                                Calculate Your EV Savings Today!
                            </p>
                        </div>

                        <div className="space-y-6 bg-white p-8 rounded-3xl shadow-sm">
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-xl text-zinc-900">KMS Per Day</span>
                                <span className="font-bold text-2xl text-primary">{dailyDistance} KMS</span>
                            </div>

                            <div className="relative pt-6 pb-2">
                                <Slider
                                    value={[dailyDistance]}
                                    onValueChange={(value) => setDailyDistance(value[0])}
                                    max={150}
                                    min={15}
                                    step={1}
                                    className="cursor-pointer"
                                />
                                <div className="flex justify-between text-sm text-zinc-500 mt-2">
                                    <span>15KM</span>
                                    <span>150KM</span>
                                </div>
                            </div>

                            <p className="text-xs text-zinc-400 italic">
                                Note- For calculations, the fuel price is considered to be ₹100 per liter.
                            </p>
                        </div>

                        <p className="text-xs text-zinc-400">
                            *Disclaimer: The savings estimates provided by the EV Saving Calculator are approximate and intended for general informational purposes only. Actual savings may vary based on individual riding behavior, driving conditions, maintenance practices, vehicle efficiency, and other factors.
                        </p>
                    </div>

                    <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-zinc-100">
                        <div className="space-y-8">
                            <div className="flex justify-between items-center border-b border-zinc-100 pb-4">
                                <div>
                                    <p className="text-sm text-zinc-500 mb-1">Petrol Bike/Scooter</p>
                                    <p className="font-bold text-lg text-zinc-900">Monthly Petrol Cost*</p>
                                </div>
                                <p className="text-2xl font-bold text-zinc-900">₹ {monthlyPetrolCost.toLocaleString()}</p>
                            </div>

                            <div className="flex justify-between items-center border-b border-zinc-100 pb-4">
                                <div>
                                    <p className="text-sm text-zinc-500 mb-1">Revolt Bike</p>
                                    <p className="font-bold text-lg text-zinc-900">Monthly electricity cost*</p>
                                </div>
                                <p className="text-2xl font-bold text-zinc-900">₹ {monthlyElectricityCost.toLocaleString()}</p>
                            </div>

                            <div className="pt-4">
                                <p className="text-sm text-zinc-500 mb-4">Your savings on Revolt Bike</p>
                                <div className="flex justify-between items-center mb-4">
                                    <p className="font-bold text-xl text-zinc-900">Monthly Savings</p>
                                    <p className="text-3xl font-bold text-zinc-900">₹ {monthlySavings.toLocaleString()}</p>
                                </div>

                                <motion.div
                                    key={annualSavings}
                                    initial={{ scale: 0.95 }}
                                    animate={{ scale: 1 }}
                                    className="bg-green-50 p-6 rounded-2xl flex justify-between items-center"
                                >
                                    <p className="font-bold text-green-700 text-xl">Annual Savings</p>
                                    <p className="font-bold text-green-700 text-3xl">₹ {annualSavings.toLocaleString()}</p>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
