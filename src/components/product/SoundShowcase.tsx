"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

const sounds = [
    { id: "revolt", name: "Revolt", description: "The signature electric hum." },
    { id: "roar", name: "Roar", description: "A deep, throaty growl." },
    { id: "rage", name: "Rage", description: "Aggressive and sporty." },
    { id: "rebel", name: "Rebel", description: "Futuristic and sharp." },
];

export function SoundShowcase() {
    const [playing, setPlaying] = useState<string | null>(null);

    const togglePlay = (id: string) => {
        if (playing === id) {
            setPlaying(null);
            // Stop audio logic here
        } else {
            setPlaying(id);
            // Play audio logic here
            // Simulate playing for 3 seconds then stop
            setTimeout(() => setPlaying(null), 3000);
        }
    };

    return (
        <section className="py-24 bg-zinc-950">
            <div className="container mx-auto px-4 max-w-screen-2xl">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            The Sound of <span className="text-primary">Revolt</span>
                        </h2>
                        <p className="text-zinc-400 text-lg mb-8">
                            Electric doesn&apos;t have to be silent. Choose your sound and make your presence felt.
                            Swipe through the app to change the exhaust note on the fly.
                        </p>

                        <div className="space-y-4">
                            {sounds.map((sound) => (
                                <div
                                    key={sound.id}
                                    className={cn(
                                        "flex items-center justify-between p-4 rounded-xl border transition-all duration-300",
                                        playing === sound.id
                                            ? "bg-primary/10 border-primary"
                                            : "bg-zinc-900 border-zinc-800 hover:border-zinc-700"
                                    )}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center",
                                            playing === sound.id ? "bg-primary text-black" : "bg-zinc-800 text-zinc-400"
                                        )}>
                                            <Volume2 className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold">{sound.name}</h3>
                                            <p className="text-sm text-zinc-500">{sound.description}</p>
                                        </div>
                                    </div>

                                    <Button
                                        size="icon"
                                        variant={playing === sound.id ? "default" : "ghost"}
                                        onClick={() => togglePlay(sound.id)}
                                        className="rounded-full"
                                    >
                                        {playing === sound.id ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="relative h-[400px] lg:h-[500px] bg-zinc-900 rounded-3xl overflow-hidden flex items-center justify-center">
                        <div className="absolute inset-0 bg-[url('/images/sound-wave.png')] bg-cover opacity-20" />
                        {/* Visualizer placeholder */}
                        <div className="flex items-end gap-1 h-32">
                            {[...Array(20)].map((_, i) => (
                                <div
                                    key={i}
                                    className={cn(
                                        "w-2 bg-primary rounded-t-full transition-all duration-100",
                                        playing ? "animate-pulse" : "h-2"
                                    )}
                                    style={{
                                        height: playing ? `${((i * 13) % 60) + 20}%` : '10%',
                                        animationDelay: `${i * 0.05}s`
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
