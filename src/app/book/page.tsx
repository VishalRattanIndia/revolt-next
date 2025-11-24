import { BookingForm } from "@/components/booking/BookingForm";

export default function BookingPage() {
    return (
        <div className="min-h-screen bg-background py-12">
            <div className="container mx-auto px-4 max-w-screen-2xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Book Your Revolt</h1>
                    <p className="text-muted-foreground">
                        Join the revolution in just a few simple steps.
                    </p>
                </div>
                <BookingForm />
            </div>
        </div>
    );
}
