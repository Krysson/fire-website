'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		setIsVisible(true)
	}, [])

	return (
		<section className="relative w-full min-h-[600px] md:min-h-[700px] lg:min-h-[800px] flex items-center justify-center overflow-hidden">
			{/* Animated Gradient Background */}
			<div className="absolute inset-0 gradient-fire-animated opacity-90" />

			{/* Additional animated gradient layer for more movement */}
			<div className="absolute inset-0 gradient-fire-animated-reverse opacity-60" />

			{/* Layered gradient overlays for depth */}
			<div className="absolute inset-0 gradient-fire-radial opacity-30" />
			<div className="absolute inset-0 bg-fire-black/30" />

			{/* Subtle glow effects */}
			<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-fire-orange/20 rounded-full blur-3xl animate-pulse-slow" />
			<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-fire-red/20 rounded-full blur-3xl animate-pulse-slow delay-1000" />

			{/* Content Container */}
			<div className="relative z-10 container mx-auto px-4 py-20 md:py-32 text-center">
				{/* FIRE Logo with enhanced presentation */}
				<div
					className={`mb-10 md:mb-16 flex justify-center transition-all duration-1000 ${
						isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
					}`}
				>
					<div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 group">
						<div className="absolute inset-0 bg-fire-orange/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500" />
						<div className="relative">
							<Image
								src="/logos/FIRELOGO_NOYEAR.png"
								alt="FIRE - Florida Intensive Rope Events"
								fill
								priority
								className="object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
							/>
						</div>
					</div>
				</div>

				{/* Tagline with improved readability */}
				<h1
					className={`text-5xl md:text-6xl lg:text-7xl font-extrabold mb-8 md:mb-10 leading-tight tracking-tight transition-all duration-1000 delay-200 ${
						isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
					}`}
				>
					{/* White text with strong shadow and gradient glow for maximum readability */}
					<span
						className="text-white relative inline-block"
						style={{
							textShadow: `
								0 0 20px rgba(0, 0, 0, 0.9),
								0 0 40px rgba(0, 0, 0, 0.8),
								0 0 60px rgba(0, 0, 0, 0.7),
								0 4px 12px rgba(0, 0, 0, 1),
								0 0 80px rgba(230, 57, 70, 0.4),
								0 0 120px rgba(244, 162, 97, 0.3)
							`,
							WebkitTextStroke: '1px rgba(0, 0, 0, 0.3)',
						}}
					>
						Florida Intensive Rope Events
					</span>
				</h1>

				{/* Description with improved typography */}
				<p
					className={`text-xl md:text-2xl lg:text-3xl text-white/95 max-w-4xl mx-auto mb-12 md:mb-16 leading-relaxed drop-shadow-lg transition-all duration-1000 delay-300 ${
						isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
					}`}
				>
					FIRE is a community-driven organization dedicated to rope bondage education
					and connection. We host three annual events in Orlando, FL, bringing together
					practitioners of all skill levels for intensive learning, artistic expression,
					and meaningful community building.
				</p>

				{/* CTA Button with enhanced animations */}
				<div
					className={`flex justify-center transition-all duration-1000 delay-500 ${
						isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
					}`}
				>
					<Link
						href="/events/blaze-2026"
						className="group inline-flex items-center justify-center px-10 py-5 md:px-12 md:py-6 text-lg md:text-xl font-bold text-white bg-fire-red hover:bg-fire-orange transition-all duration-300 rounded-xl shadow-2xl hover:shadow-fire-orange/60 hover:scale-110 active:scale-105 border-2 border-white/30 hover:border-white/50 relative overflow-hidden"
					>
						{/* Button glow effect */}
						<span className="absolute inset-0 bg-gradient-to-r from-fire-orange to-fire-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
						<span className="relative z-10 flex items-center gap-3">
							Explore Our Next Event
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-6 w-6 group-hover:translate-x-1 transition-transform duration-300"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
								strokeWidth={2.5}
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M13 7l5 5m0 0l-5 5m5-5H6"
								/>
							</svg>
						</span>
					</Link>
				</div>
			</div>

			{/* Scroll Indicator */}
			<div
				className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-700 ${
					isVisible ? 'opacity-100' : 'opacity-0'
				}`}
			>
				<div className="flex flex-col items-center gap-2 animate-bounce-slow">
					<span className="text-white/60 text-sm font-medium">Scroll to explore</span>
					<ChevronDown className="h-6 w-6 text-fire-orange/80" />
				</div>
			</div>

			{/* Enhanced decorative element */}
			<div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-fire-black via-fire-black/80 to-transparent pointer-events-none" />
		</section>
	)
}
