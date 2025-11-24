import Link from "next/link";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="border-t bg-background">
            <div className="container mx-auto flex flex-col gap-8 py-8 md:py-12 px-4 max-w-screen-2xl">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    <div className="flex flex-col gap-4">
                        <Link href="/" className="flex items-center space-x-2">
                            <Image
                                src="/images/revolt-motors-logo.svg"
                                alt="Revolt Motors"
                                width={120}
                                height={40}
                                className="h-8 w-auto dark:invert"
                            />
                        </Link>
                        <p className="text-sm text-muted-foreground">
                            India&apos;s First AI Enabled Electric Motorcycle.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="font-semibold">Products</h3>
                        <Link href="/rv400" className="text-sm text-muted-foreground hover:underline">
                            RV400
                        </Link>
                        <Link href="/rv400-brz" className="text-sm text-muted-foreground hover:underline">
                            RV400 BRZ
                        </Link>
                        <Link href="/accessories" className="text-sm text-muted-foreground hover:underline">
                            Accessories
                        </Link>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="font-semibold">Company</h3>
                        <Link href="/about" className="text-sm text-muted-foreground hover:underline">
                            About Us
                        </Link>
                        <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
                            Contact
                        </Link>
                        <Link href="/careers" className="text-sm text-muted-foreground hover:underline">
                            Careers
                        </Link>
                    </div>
                    <div className="flex flex-col gap-2">
                        <h3 className="font-semibold">Support</h3>
                        <Link href="/faq" className="text-sm text-muted-foreground hover:underline">
                            FAQ
                        </Link>
                        <Link href="/dealers" className="text-sm text-muted-foreground hover:underline">
                            Locate Dealer
                        </Link>
                        <Link href="/book" className="text-sm text-muted-foreground hover:underline">
                            Book Now
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <p className="text-xs text-muted-foreground">
                        © 2024 Revolt Motors. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        <Link href="/privacy" className="text-xs text-muted-foreground hover:underline">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="text-xs text-muted-foreground hover:underline">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
