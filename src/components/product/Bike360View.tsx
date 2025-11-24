"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { RotateCw } from "lucide-react";

export interface Bike360ViewProps {
    image: string;
    alt: string;
}

export function Bike360View({ image, alt }: Bike360ViewProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [rotation, setRotation] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Simulated 360 view using a single image rotating (since we don't have the sequence)
    // In a real implementation, we would swap images based on rotation index.

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartX(e.clientX);
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging) return;
        const delta = e.clientX - startX;
        setRotation((prev) => prev + delta * 0.5);
        setStartX(e.clientX);
    };



    useEffect(() => {
        const handleGlobalMouseUp = () => setIsDragging(false);
        window.addEventListener("mouseup", handleGlobalMouseUp);
        return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
    }, []);

    return (
        <div className="relative w-full h-[500px] bg-zinc-900/50 rounded-3xl overflow-hidden cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            ref={containerRef}
        >
            <div className="absolute top-4 right-4 z-10 bg-black/50 p-2 rounded-full backdrop-blur-sm">
                <RotateCw className="w-6 h-6 text-white" />
            </div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div
                    className="relative w-full h-full transition-transform duration-75 ease-out"
                    style={{ transform: `rotateY(${rotation}deg)` }}
                >
                    <Image
                        src={image}
                        alt={alt}
                        fill
                        className="object-contain p-8"
                        draggable={false}
                    />
                </div>
            </div>

            <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none">
                <p className="text-zinc-400 text-sm bg-black/50 inline-block px-4 py-2 rounded-full backdrop-blur-sm">
                    Drag to rotate
                </p>
            </div>
        </div>
    );
}
