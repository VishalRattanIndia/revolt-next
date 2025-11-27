import React from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
    {
        question: "How many electric bike showrooms are available in India?",
        answer: "Revolt Motors has a rapidly growing network of showrooms across India. Please check the locator above for the most current list of cities and dealership locations."
    },
    {
        question: "How to find Revolt bike showrooms near me?",
        answer: "You can use the 'Locate Dealer' feature on our website. Simply select your city from the list or use the search bar to find the nearest showroom."
    },
    {
        question: "What payment methods are accepted at electric bike showrooms?",
        answer: "Our showrooms accept various payment methods including credit/debit cards, net banking, UPI, and financing options are also available."
    },
    {
        question: "How can I book a Revolt bike test ride?",
        answer: "You can book a test ride online through our website or visit your nearest showroom directly to schedule one."
    },
    {
        question: "What is the price range for electric bikes in India?",
        answer: "Revolt electric bikes start from ₹99,999 (Ex-showroom) for the RV1 and go up to ₹1,39,950 for the RV400. Prices may vary by state due to subsidies."
    },
    {
        question: "Do electric bikes require a license and registration?",
        answer: "Yes, all Revolt electric bikes (RV400, RV1, etc.) are high-speed electric vehicles and require a valid driving license and registration."
    },
    {
        question: "How long does it take to charge an electric bike?",
        answer: "The Revolt RV400 battery charges from 0-75% in about 3 hours and 0-100% in about 4.5 hours using a standard 15A socket."
    },
    {
        question: "Can I walk into any showroom without an appointment?",
        answer: "Yes, you are welcome to visit our showrooms anytime during working hours. However, booking an appointment or test ride online can save you time."
    },
    {
        question: "Are all service centers equipped for the latest models?",
        answer: "Yes, all our authorized service centers are fully equipped and trained to service the latest Revolt electric bike models."
    }
]

export default function FaqSection() {
    return (
        <div className="py-16 bg-black">
            <div className="container mx-auto px-4 max-w-4xl">
                <h2 className="text-3xl font-bold text-center text-white mb-12">FAQs</h2>
                <Accordion type="single" collapsible className="w-full space-y-4">
                    {faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="border border-zinc-800 rounded-lg px-4 bg-zinc-900">
                            <AccordionTrigger className="text-white hover:text-red-500 text-left font-medium">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-gray-400">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
        </div>
    )
}
