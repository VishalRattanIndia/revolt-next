"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Color {
    name: string;
    code: string;
    image: string;
}

interface ColorPickerProps {
    colors: Color[];
    defaultColor?: string;
}

export function ColorPicker({ colors, defaultColor }: ColorPickerProps) {
    const [selectedColor, setSelectedColor] = useState(defaultColor || colors[0].name);
    const currentImage = colors.find(c => c.name === selectedColor)?.image || colors[0].image;

    return (
        <div className="space-y-8">
            <div className="relative h-[400px] w-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedColor}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                    >
                        <Image
                            src={currentImage}
                            alt={`${selectedColor} bike`}
                            fill
                            className="object-contain"
                            priority
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="flex justify-center gap-4">
                {colors.map((color) => (
                    <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={cn(
                            "w-12 h-12 rounded-full border-2 transition-all duration-200",
                            selectedColor === color.name
                                ? "border-primary scale-110"
                                : "border-transparent hover:scale-105"
                        )}
                        style={{ backgroundColor: color.code }}
                        title={color.name}
                    />
                ))}
            </div>
            <div className="text-center">
                <p className="text-lg font-medium text-white">{selectedColor}</p>
            </div>
        </div>
    );
}
