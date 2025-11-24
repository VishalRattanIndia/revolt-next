"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Define types for better type safety
type BikeColor = {
    name: string;
    hex: string;
    image: string;
};

type BikeData = {
    name: string;
    price: string;
    range: string;
    topSpeed: string;
    chargingTime: string;
    fastCharging: string;
    batteryCapacity: string;
    weight: string;
    brakes: string;
    tyres: string;
    frontFork: string;
    rearSuspension: string;
    batteryType: string;
    motor: string;
    wheelBase: string;
    seatHeight: string;
    carryingCapacity: string;
    lighting: string;
    groundClearance: string;
    warranty: string;
    colors: BikeColor[];
};

// Data from legacy bikeData.js with updated image paths
const bikeData: Record<string, BikeData> = {
    "RV1": {
        name: "RV1",
        price: "₹ 84,990",
        range: "100 kms (Eco Mode)",
        topSpeed: "75 km/h",
        chargingTime: "2 hrs 15 min (0-80%)",
        fastCharging: "-",
        batteryCapacity: "2.2 KWh",
        weight: "108 Kg",
        brakes: "Front Disc 240mm / Rear Disc 240mm (CBS)",
        tyres: "Front 90/80-17 / Rear 110/80-17",
        frontFork: "Telescopic Forks",
        rearSuspension: "Twin Shocker",
        batteryType: "Lithium Ion",
        motor: "Peak 2.8KW (Mid Drive)",
        wheelBase: "1350mm",
        seatHeight: "790mm",
        carryingCapacity: "2 Persons/Maximum 250Kg",
        lighting: "LED Head Lamp, Tail Lamp, Indicators",
        groundClearance: "180 mm",
        warranty: "5 years or 75,000 Km",
        colors: [
            { name: "Cosmos Red", hex: "#E31E24", image: "/images/rv1/rv1_cosmos_red.png" },
            { name: "Midnight Blue", hex: "#1C2B4B", image: "/images/rv1/rv1_midnight_blue.png" },
            { name: "Neon Green", hex: "#C4D600", image: "/images/rv1/rv1_neon_green.png" },
            { name: "Titan Red", hex: "#8A151B", image: "/images/rv1/rv1_titan_red.png" },
        ]
    },
    "RV1+": {
        name: "RV1+",
        price: "₹ 99,990",
        range: "160 kms (Eco Mode)",
        topSpeed: "75 km/h",
        chargingTime: "2 hr 45 min (0-80%)",
        fastCharging: "1 hr 30 min (0-80%)",
        batteryCapacity: "3.24 KWh",
        weight: "105 Kg",
        brakes: "Front Disc 220mm / Rear Disc 220mm",
        tyres: "Front 80/90 R17 - Rear 90/80 R17",
        frontFork: "Telescopic Forks",
        rearSuspension: "Monoshock",
        batteryType: "Lithium Ion",
        motor: "Peak 3.5KW (Hub Motor)",
        wheelBase: "1350mm",
        seatHeight: "790mm",
        carryingCapacity: "2 Persons/Maximum 250Kg",
        lighting: "LED Head Lamp, Tail Lamps, Indicators",
        groundClearance: "180 mm",
        warranty: "5 years or 75,000 Km",
        colors: [
            { name: "Cosmos Red", hex: "#E31E24", image: "/images/rv1/rvplus_cosmos_red.png" },
            { name: "Midnight Blue", hex: "#1C2B4B", image: "/images/rv1/rvplus_midnight_blue.png" },
            { name: "Neon Green", hex: "#C4D600", image: "/images/rv1/rvplus_neon_green.png" },
            { name: "Titan Red", hex: "#8A151B", image: "/images/rv1/rvplus_titan_red.png" },
        ]
    },
    "RV400": {
        name: "RV400",
        price: "₹ 1,18,750",
        range: "150 kms (Eco Mode)",
        topSpeed: "85 km/h",
        chargingTime: "2 hr 15 min (0-80%)",
        fastCharging: "1 hr 20 min (0-80%)",
        batteryCapacity: "3.24 KWh",
        weight: "108 Kg",
        brakes: "Front Disc 240mm / Rear Disc 240mm (CBS)",
        tyres: "Front 90/80 R17 - Rear 110/80 R17",
        frontFork: "Upside Down Forks",
        rearSuspension: "Monoshock (Adjustable)",
        batteryType: "Lithium Ion",
        motor: "Peak 4.1KW (Mid Drive)",
        wheelBase: "1350mm",
        seatHeight: "815 mm",
        carryingCapacity: "2 Persons/Maximum 150Kg",
        lighting: "LED Projection Head Lamp",
        groundClearance: "200 mm",
        warranty: "5 years or 75,000 Km",
        colors: [
            { name: "Rebel Red", hex: "#E31E24", image: "/images/rebel-red/1.png" },
            { name: "Cosmic Black", hex: "#000000", image: "/images/cosmic-black/1.png" },
            { name: "Mist Grey", hex: "#808080", image: "/images/mist_grey/1.png" },
            { name: "Stealth Black", hex: "#1A1A1A", image: "/images/stealth_black/1.png" },
            { name: "India Blue", hex: "#0000FF", image: "/images/india_blue/1.png" },
        ]
    },
    "RV400 BRZ": {
        name: "RV400 BRZ",
        price: "₹ 1,08,750",
        range: "150 kms (Eco Mode)",
        topSpeed: "85 km/h",
        chargingTime: "2 hr 30 min (0-80%)",
        fastCharging: "1 hr 20 min (0-80%)",
        batteryCapacity: "3.24 KWh",
        weight: "110 Kg",
        brakes: "Front Disc 240mm / Rear Disc 240mm (CBS)",
        tyres: "Front 90/80 R17 - Rear 110/80 R17",
        frontFork: "Upside Down Forks",
        rearSuspension: "Monoshock (Adjustable)",
        batteryType: "Lithium Ion",
        motor: "Peak 4.1KW (Mid Drive)",
        wheelBase: "1350mm",
        seatHeight: "815 mm",
        carryingCapacity: "2 Persons/Maximum 150Kg",
        lighting: "LED Projection Head Lamp",
        groundClearance: "200 mm",
        warranty: "5 years or 75,000 Km",
        colors: [
            { name: "Dark Lunar Green", hex: "#006400", image: "/images/brz_dark_lunar_green.png" },
            { name: "Dark Silver", hex: "#A9A9A9", image: "/images/brz_dark_silver.png" },
            { name: "Pacific Blue", hex: "#000080", image: "/images/brz_pacific_blue.png" },
            { name: "Rebel Red", hex: "#E31E24", image: "/images/brz_rebel_red.png" },
            { name: "Cosmic Black", hex: "#000000", image: "/images/brz_cosmic_black.png" },
        ]
    },
    "RV BlazeX": {
        name: "RV BlazeX",
        price: "₹ 1,14,990",
        range: "150 kms (Eco Mode)",
        topSpeed: "90 km/h",
        chargingTime: "3 hr 30 min (0-80%)",
        fastCharging: "1 hr 10 min (0-80%)",
        batteryCapacity: "4.0 KWh",
        weight: "115 Kg",
        brakes: "Front Disc 250mm / Rear Disc 250mm (CBS)",
        tyres: "Front 100/80 R17 - Rear 120/80 R17",
        frontFork: "Upside Down Forks",
        rearSuspension: "Monoshock (Adjustable)",
        batteryType: "Lithium Ion",
        motor: "Peak 5.0KW (Mid Drive)",
        wheelBase: "1400mm",
        seatHeight: "820 mm",
        carryingCapacity: "2 Persons/Maximum 160Kg",
        lighting: "LED Projection Head Lamp",
        groundClearance: "210 mm",
        warranty: "5 years or 75,000 Km",
        colors: [
            { name: "Black", hex: "#000000", image: "/images/blazex.png" },
        ]
    }
};

export function ComparisonSection() {
    const [selectedBike1, setSelectedBike1] = useState("RV1");
    const [selectedBike2, setSelectedBike2] = useState("RV1+");
    const [selectedColor1, setSelectedColor1] = useState<BikeColor | null>(bikeData["RV1"].colors[0]);
    const [selectedColor2, setSelectedColor2] = useState<BikeColor | null>(bikeData["RV1+"].colors[0]);



    // Update selected color when bike changes
    // Update selected color logic moved to onChange handlers


    const data1 = bikeData[selectedBike1];
    const data2 = bikeData[selectedBike2];

    const comparisonRows = [
        { label: "Price", key: "price" },
        { label: "Range", key: "range" },
        { label: "Top Speed", key: "topSpeed" },
        { label: "Motor", key: "motor" },
        { label: "Charging Time", key: "chargingTime" },
        { label: "Fast Charging", key: "fastCharging" },
        { label: "Battery Capacity", key: "batteryCapacity" },
        { label: "Kerb Weight", key: "weight" },
        { label: "Brakes", key: "brakes" },
        { label: "Tyres", key: "tyres" },
        { label: "Front Fork", key: "frontFork" },
        { label: "Rear Suspension", key: "rearSuspension" },
        { label: "Wheel Base", key: "wheelBase" },
        { label: "Seat Height", key: "seatHeight" },
        { label: "Ground Clearance", key: "groundClearance" },
        { label: "Warranty", key: "warranty" },
    ];

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4 max-w-screen-2xl">
                <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center text-zinc-900">
                    Choose Your <span className="text-primary">Revolt Motorcycle</span>
                </h2>

                <div className="grid grid-cols-3 gap-4 mb-8 items-start">
                    <div className="col-span-1"></div>

                    {/* Bike 1 Selection */}
                    <div className="col-span-1 text-center space-y-4">
                        <select
                            value={selectedBike1}
                            onChange={(e) => {
                                const newBike = e.target.value;
                                setSelectedBike1(newBike);
                                const bikeDataEntry = bikeData[newBike];
                                if (bikeDataEntry && bikeDataEntry.colors.length > 0) {
                                    setSelectedColor1(bikeDataEntry.colors[0]);
                                }
                            }}
                            className="p-2 border rounded-md font-bold text-zinc-900 bg-white border-zinc-300 w-full max-w-[200px]"
                        >
                            {Object.keys(bikeData).map(bike => (
                                <option key={bike} value={bike}>{bike}</option>
                            ))}
                        </select>

                        <div className="relative h-48 md:h-64 w-full">
                            {selectedColor1 && (
                                <Image
                                    src={selectedColor1.image}
                                    alt={`${data1.name} ${selectedColor1.name}`}
                                    fill
                                    className="object-contain"
                                />
                            )}
                        </div>

                        <div className="flex justify-center gap-2 flex-wrap">
                            {data1.colors.map((color) => (
                                <button
                                    key={color.name}
                                    onClick={() => setSelectedColor1(color)}
                                    className={cn(
                                        "w-6 h-6 rounded-full border-2 transition-all",
                                        selectedColor1?.name === color.name ? "border-primary scale-110" : "border-zinc-200"
                                    )}
                                    style={{ backgroundColor: color.hex }}
                                    title={color.name}
                                />
                            ))}
                        </div>
                        <p className="text-sm font-medium text-zinc-600">{selectedColor1?.name}</p>
                    </div>

                    {/* Bike 2 Selection */}
                    <div className="col-span-1 text-center space-y-4">
                        <select
                            value={selectedBike2}
                            onChange={(e) => {
                                const newBike = e.target.value;
                                setSelectedBike2(newBike);
                                const bikeDataEntry = bikeData[newBike];
                                if (bikeDataEntry && bikeDataEntry.colors.length > 0) {
                                    setSelectedColor2(bikeDataEntry.colors[0]);
                                }
                            }}
                            className="p-2 border rounded-md font-bold text-zinc-900 bg-white border-zinc-300 w-full max-w-[200px]"
                        >
                            {Object.keys(bikeData).map(bike => (
                                <option key={bike} value={bike}>{bike}</option>
                            ))}
                        </select>

                        <div className="relative h-48 md:h-64 w-full">
                            {selectedColor2 && (
                                <Image
                                    src={selectedColor2.image}
                                    alt={`${data2.name} ${selectedColor2.name}`}
                                    fill
                                    className="object-contain"
                                />
                            )}
                        </div>

                        <div className="flex justify-center gap-2 flex-wrap">
                            {data2.colors.map((color) => (
                                <button
                                    key={color.name}
                                    onClick={() => setSelectedColor2(color)}
                                    className={cn(
                                        "w-6 h-6 rounded-full border-2 transition-all",
                                        selectedColor2?.name === color.name ? "border-primary scale-110" : "border-zinc-200"
                                    )}
                                    style={{ backgroundColor: color.hex }}
                                    title={color.name}
                                />
                            ))}
                        </div>
                        <p className="text-sm font-medium text-zinc-600">{selectedColor2?.name}</p>
                    </div>
                </div>

                {/* Comparison Rows */}
                <div className="space-y-4">
                    {comparisonRows.map((row, index) => (
                        <div key={row.key} className={cn(
                            "grid grid-cols-3 gap-4 py-4 items-center border-b border-zinc-100",
                            index % 2 === 0 ? "bg-zinc-50/50" : "bg-white"
                        )}>
                            <div className="col-span-1 font-bold text-zinc-900 pl-4 md:pl-8 text-sm md:text-base">
                                {row.label}
                            </div>
                            <div className="col-span-1 text-center text-zinc-700 font-medium text-sm md:text-base px-2">
                                {data1[row.key as keyof Omit<BikeData, "colors">]}
                            </div>
                            <div className="col-span-1 text-center text-zinc-700 font-medium text-sm md:text-base px-2">
                                {data2[row.key as keyof Omit<BikeData, "colors">]}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-3 gap-4 mt-8">
                    <div className="col-span-1"></div>
                    <div className="col-span-1 text-center">
                        <button className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-colors">
                            Book Now
                        </button>
                    </div>
                    <div className="col-span-1 text-center">
                        <button className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-colors">
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
