"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"

interface Blog {
    slug: string
    title: string
    featuredImage: string
    publishedAt: string
    shortText: string
    isPublished: number
}

interface ExpertReview {
    imgSrc: string
    altText: string
    link: string
    title: string
    description: string
    author: string
}

const expertReviews: ExpertReview[] = [
    {
        imgSrc: "/images/electric-bikes/RVBlazeX.webp",
        altText: "Revolt RV BlazeX launched: Top highlights",
        link: "https://www.msn.com/en-in/autos/news/revolt-rv-blazex-launched-top-highlights/ar-AA1zPmus?ocid=entnewsntp&pc=DCTS&cvid=c2e0805d92e64f60880914338da5b1d2&ei=41",
        title: "Revolt RV BlazeX launched: Top highlights",
        description: "Revolt Motors has launched its latest offering in the market called RV BlazeX....",
        author: "Express Drives Desk",
    },
    {
        imgSrc: "/images/electric-bikes/rvbx.jpg",
        altText: "Revolt RV BlazeX range tested: Real-world numbers vs claimed figures compared",
        link: "https://auto.hindustantimes.com/auto/electric-vehicles/revolt-rv-blazex-range-tested-real-world-numbers-vs-claimed-figures-compared-41742808765579.html",
        title: "Revolt RV BlazeX range tested: Real-world numbers vs claimed figures compared",
        description: " The electric two wheeler market is now gradually seeing the introduction of newer electric bikes...",
        author: "Srinjoy Bal",
    },
    {
        imgSrc: "/images/electric-bikes/RVBlazeX1.webp",
        altText: "Revolt RV BlazeX review: Revolt's latest electric commuter",
        link: "https://www.msn.com/en-in/autos/news/revolt-rv-blazex-review-revolt-s-latest-electric-commuter/ar-AA1AqC5P?ocid=entnewsntp&pc=DCTS&cvid=83ebe4ad96a44a268dac5a10d894f008&ei=31",
        title: "Revolt RV BlazeX review: Revolt's latest electric commuter",
        description: " The RV BlazeX is Revolt's latest electric commuter, positioned as an alternative to 125cc motorcycles",
        author: " Gavin Rodrigues",
    },
]

export default function LatestUpdates() {
    const [activeTab, setActiveTab] = useState<"latestNews" | "expertReview">("latestNews")
    const [blogs, setBlogs] = useState<Blog[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true)
            try {
                const API_BASE_URL_BLOG = process.env.NEXT_PUBLIC_URL_API_BLOG

                if (!API_BASE_URL_BLOG) {
                    console.warn("NEXT_PUBLIC_URL_API_BLOG is not configured")
                    setBlogs([])
                    return
                }

                console.log("Fetching blogs from:", API_BASE_URL_BLOG)

                const res = await fetch(`${API_BASE_URL_BLOG}/api/v1/blogs`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })

                // Check if response is ok
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`)
                }

                const json = await res.json()
                if (json.data) {
                    const published = json.data
                        .filter((b: Blog) => b.isPublished === 1)
                        .slice(0, 3)
                    setBlogs(published)
                }
            } catch (e) {
                console.error("Error fetching blogs:", e)
                // Show a user-friendly message but don't break the UI
                setBlogs([])
            } finally {
                setLoading(false)
            }
        }
        fetchBlogs()
    }, [])

    return (
        <div className="py-16 bg-zinc-900">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-white mb-12">Latest Electric Bike Updates</h2>

                {/* Tabs Navigation */}
                <div className="flex justify-center gap-4 mb-12">
                    <button
                        onClick={() => setActiveTab("latestNews")}
                        className={`px-8 py-3 rounded-lg font-semibold transition-all ${activeTab === "latestNews"
                            ? "bg-red-600 text-white"
                            : "bg-zinc-800 text-gray-400 hover:bg-zinc-700 hover:text-white"
                            }`}
                    >
                        Latest Blogs
                    </button>
                    <button
                        onClick={() => setActiveTab("expertReview")}
                        className={`px-8 py-3 rounded-lg font-semibold transition-all ${activeTab === "expertReview"
                            ? "bg-red-600 text-white"
                            : "bg-zinc-800 text-gray-400 hover:bg-zinc-700 hover:text-white"
                            }`}
                    >
                        Expert Review
                    </button>
                </div>

                {/* Tab Content */}
                {activeTab === "latestNews" && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                            {loading && (
                                <div className="col-span-3 flex items-center justify-center h-64">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                                </div>
                            )}
                            {!loading && blogs.length === 0 && (
                                <div className="col-span-3 text-center text-gray-400 py-16">No blogs found.</div>
                            )}
                            {!loading && blogs.map((blog, index) => (
                                <div key={index} className="bg-zinc-800 rounded-xl overflow-hidden border border-zinc-700 hover:border-red-600 transition-all group">
                                    <Link href={`/blog/${blog.slug}`}>
                                        <div className="relative h-48 w-full overflow-hidden">
                                            <Image
                                                src={blog.featuredImage}
                                                alt={blog.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform"
                                            />
                                        </div>
                                    </Link>
                                    <div className="p-6">
                                        <Link href={`/blog/${blog.slug}`}>
                                            <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 hover:text-red-500 transition-colors">
                                                {blog.title}
                                            </h3>
                                        </Link>
                                        <p className="text-gray-400 text-sm mb-4">
                                            Posted on {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : "-"}
                                        </p>
                                        <p className="text-gray-300 mb-6 line-clamp-3">{blog.shortText}</p>
                                        <Link href={`/blog/${blog.slug}`} className="text-red-500 font-semibold hover:text-red-400 inline-flex items-center gap-1">
                                            Read More →
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center">
                            <Link href="/blog">
                                <Button className="bg-white text-black hover:bg-gray-200">
                                    View All Blogs
                                </Button>
                            </Link>
                        </div>
                    </>
                )}

                {activeTab === "expertReview" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {expertReviews.map((review, index) => (
                            <div key={index} className="bg-zinc-800 rounded-xl overflow-hidden border border-zinc-700 hover:border-red-600 transition-all group">
                                <a href={review.link} target="_blank" rel="nofollow noopener noreferrer">
                                    <div className="relative h-48 w-full overflow-hidden">
                                        <Image
                                            src={review.imgSrc}
                                            alt={review.altText}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform"
                                        />
                                    </div>
                                </a>
                                <div className="p-6">
                                    <a href={review.link} target="_blank" rel="nofollow noopener noreferrer">
                                        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 hover:text-red-500 transition-colors">
                                            {review.title}
                                        </h3>
                                    </a>
                                    <p className="text-gray-400 text-sm mb-4">By {review.author}</p>
                                    <p className="text-gray-300 mb-6 line-clamp-3">{review.description}</p>
                                    <a
                                        href={review.link}
                                        target="_blank"
                                        rel="nofollow noopener noreferrer"
                                        className="text-red-500 font-semibold hover:text-red-400 inline-flex items-center gap-1"
                                    >
                                        Read More →
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
