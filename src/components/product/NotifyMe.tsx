"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Bell } from "lucide-react";

interface NotifyMeProps {
    productName: string;
}

export function NotifyMe({ productName }: NotifyMeProps) {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        setTimeout(() => {
            setSubmitted(true);
        }, 1000);
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <Bell className="w-4 h-4" />
                    Notify Me
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Get Notified</SheetTitle>
                    <SheetDescription>
                        Stay updated on the latest news, offers, and availability for the {productName}.
                    </SheetDescription>
                </SheetHeader>

                {submitted ? (
                    <div className="mt-8 text-center space-y-4">
                        <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto">
                            <Bell className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold">You&apos;re on the list!</h3>
                        <p className="text-zinc-400">
                            We&apos;ll send updates to <span className="text-white">{email}</span>.
                        </p>
                        <Button variant="outline" onClick={() => setSubmitted(false)}>
                            Register another email
                        </Button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="you@example.com"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Subscribe
                        </Button>
                    </form>
                )}
            </SheetContent>
        </Sheet>
    );
}
