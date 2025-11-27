"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, ShoppingCart, User, ChevronDown, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";

const bikes = [
    {
        name: "RV1",
        image: "/images/home-product/top/Rv1.webp",
        href: "/rv1",
        price: "From ₹89,990*",
    },
    {
        name: "RV1+",
        image: "/images/home-product/top/RV1Plus.webp",
        href: "/rv1plus",
        price: "From ₹1,04,990*",
    },
    {
        name: "RV BlazeX",
        image: "/images/home-product/top/RV-BlazeX.webp",
        href: "/rv-blazex",
        price: "From ₹1,19,990*",
    },
    {
        name: "RV400 BRZ",
        image: "/images/home-product/top/RV-BRZ.webp",
        href: "/rv400-brz",
        price: "From ₹1,29,950*",
    },
    {
        name: "RV400",
        image: "/images/home-product/top/top400.webp",
        href: "/rv400",
        price: "From ₹1,39,950*",
    },
];

const dealershipLinks = [
    { name: "Become A Dealer", href: "/become-dealer" },
    { name: "Locate A Dealer", href: "/showrooms" },
];

const supportLinks = [
    { name: "Email Us", href: "mailto:contact@revoltmotors.com", icon: Mail, detail: "contact@revoltmotors.com" },
    { name: "Call Us", href: "tel:+919873050505", icon: Phone, detail: "+91-98 7305 0505" },
    { name: "WhatsApp", href: "https://wa.me/919873050505?text=Hi", icon: Phone, detail: "Chat with us" }, // Using Phone icon as placeholder for WhatsApp
];

export function Header() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [activeMenu, setActiveMenu] = React.useState<string | null>(null);
    const [scrolled, setScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleMouseEnter = (menu: string) => {
        setActiveMenu(menu);
    };

    const handleMouseLeave = () => {
        setActiveMenu(null);
    };

    return (
        <header
            className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled || activeMenu
                ? "bg-background/95 backdrop-blur border-b border-border/40"
                : "bg-transparent border-transparent"
                }`}
            onMouseLeave={handleMouseLeave}
        >
            <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
                {/* Logo */}
                <div className="flex items-center gap-6 z-50">
                    <Link href="/" className="flex items-center space-x-2">
                        <Image
                            src="/images/revolt-motors-logo.svg"
                            alt="Revolt Motors"
                            width={120}
                            height={40}
                            className="h-8 w-auto dark:invert"
                        />
                    </Link>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 items-center gap-8 h-full">
                    {/* Electric Bikes Mega Menu Trigger */}
                    <div
                        className="h-full flex items-center"
                        onMouseEnter={() => handleMouseEnter("bikes")}
                    >
                        <button className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 h-full">
                            Electric Bikes
                        </button>
                    </div>

                    {/* Dealership Dropdown Trigger */}
                    <div
                        className="h-full flex items-center relative"
                        onMouseEnter={() => handleMouseEnter("dealership")}
                    >
                        <button className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 h-full">
                            Dealership <ChevronDown className="h-4 w-4" />
                        </button>

                        {/* Dealership Dropdown */}
                        <AnimatePresence>
                            {activeMenu === "dealership" && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full left-0 w-48 bg-background border border-border rounded-md shadow-lg overflow-hidden"
                                >
                                    <div className="py-2">
                                        {dealershipLinks.map((link) => (
                                            <Link
                                                key={link.name}
                                                href={link.href}
                                                className="block px-4 py-2 text-sm hover:bg-muted transition-colors"
                                            >
                                                {link.name}
                                            </Link>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Support Dropdown Trigger */}
                    <div
                        className="h-full flex items-center relative"
                        onMouseEnter={() => handleMouseEnter("support")}
                    >
                        <button className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1 h-full">
                            Support <ChevronDown className="h-4 w-4" />
                        </button>

                        {/* Support Dropdown */}
                        <AnimatePresence>
                            {activeMenu === "support" && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute top-full left-0 w-64 bg-background border border-border rounded-md shadow-lg overflow-hidden"
                                >
                                    <div className="py-2">
                                        {supportLinks.map((link) => (
                                            <a
                                                key={link.name}
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-start gap-3 px-4 py-3 text-sm hover:bg-muted transition-colors"
                                            >
                                                <link.icon className="h-5 w-5 mt-0.5 text-muted-foreground" />
                                                <div>
                                                    <div className="font-medium">{link.name}</div>
                                                    <div className="text-xs text-muted-foreground">{link.detail}</div>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </nav>

                {/* Right Side Actions */}
                <div className="flex items-center gap-4 z-50">
                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            href="/test-ride"
                            className="text-sm font-medium hover:text-primary transition-colors"
                        >
                            Test Ride
                        </Link>
                        <Button asChild>
                            <Link href="/book">Book Now</Link>
                        </Button>
                        <Button variant="ghost" size="icon">
                            <User className="h-5 w-5" />
                            <span className="sr-only">Account</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                            <ShoppingCart className="h-5 w-5" />
                            <span className="sr-only">Cart</span>
                        </Button>
                    </div>

                    {/* Mobile Menu Trigger */}
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-full sm:w-[400px] overflow-y-auto">
                            <div className="flex flex-col gap-6 mt-6">
                                <div className="space-y-4">
                                    <h3 className="font-semibold text-lg">Electric Bikes</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        {bikes.map((bike) => (
                                            <Link
                                                key={bike.name}
                                                href={bike.href}
                                                className="flex flex-col items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                <div className="relative w-full aspect-[3/2]">
                                                    <Image
                                                        src={bike.image}
                                                        alt={bike.name}
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                                <span className="text-sm font-medium">{bike.name}</span>
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <h3 className="font-semibold text-lg">Dealership</h3>
                                    {dealershipLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            className="block py-2 text-muted-foreground hover:text-foreground"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                </div>

                                <div className="space-y-2">
                                    <h3 className="font-semibold text-lg">Support</h3>
                                    {supportLinks.map((link) => (
                                        <a
                                            key={link.name}
                                            href={link.href}
                                            className="block py-2 text-muted-foreground hover:text-foreground"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {link.name}
                                        </a>
                                    ))}
                                </div>

                                <div className="flex flex-col gap-4 mt-4">
                                    <Button asChild className="w-full">
                                        <Link href="/book">Book Now</Link>
                                    </Button>
                                    <Button variant="outline" asChild className="w-full">
                                        <Link href="/test-ride">Test Ride</Link>
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>

            {/* Mega Menu Content */}
            <AnimatePresence>
                {activeMenu === "bikes" && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="absolute top-full left-0 w-full bg-background border-b border-border shadow-xl overflow-hidden z-40"
                        onMouseEnter={() => setActiveMenu("bikes")}
                        onMouseLeave={() => setActiveMenu(null)}
                    >
                        <div className="container mx-auto max-w-screen-2xl px-4 py-12">
                            <div className="grid grid-cols-5 gap-8">
                                {bikes.map((bike) => (
                                    <Link
                                        key={bike.name}
                                        href={bike.href}
                                        className="group flex flex-col items-center gap-4"
                                    >
                                        <div className="relative w-full aspect-[16/10] overflow-hidden">
                                            <Image
                                                src={bike.image}
                                                alt={bike.name}
                                                fill
                                                className="object-contain transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="text-center space-y-1">
                                            <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                                {bike.name}
                                            </h3>
                                            <div className="flex gap-4 text-sm text-muted-foreground justify-center">
                                                <span className="underline decoration-transparent group-hover:decoration-primary transition-all">
                                                    Learn
                                                </span>
                                                <span className="underline decoration-transparent group-hover:decoration-primary transition-all">
                                                    Order
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
