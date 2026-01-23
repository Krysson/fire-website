'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Calendar, Users } from 'lucide-react'

interface Event {
	id: string
	name: string
	logo: string
	dates: string
	focus: string
	link: string
}

const events: Event[] = [
	{
		id: 'blaze',
		name: 'BLAZE',
		logo: '/logos/blaze-2026.png',
		dates: 'April 17-19, 2026',
		focus: 'Beginner to Intermediate',
		link: '/events/blaze-2026',
	},
	{
		id: 'flare',
		name: 'FLARE',
		logo: '/logos/fire-logo.png',
		dates: 'August 2026',
		focus: 'Intermediate to Advanced',
		link: '/events/flare-2026',
	},
	{
		id: 'fire',
		name: 'FIRE',
		logo: '/logos/fire-logo.png',
		dates: 'February 2027',
		focus: 'All Levels',
		link: '/events/fire-2027',
	},
]

// Helper function to get badge color based on focus level
function getFocusBadgeColor(focus: string): string {
	if (focus.includes('Beginner')) {
		return 'bg-fire-yellow/20 text-fire-yellow border-fire-yellow/30'
	}
	if (focus.includes('Advanced')) {
		return 'bg-fire-red/20 text-fire-red border-fire-red/30'
	}
	return 'bg-fire-orange/20 text-fire-orange border-fire-orange/30'
}

export default function EventCards() {
	const [isVisible, setIsVisible] = useState(false)

	useEffect(() => {
		setIsVisible(true)
	}, [])

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
			{events.map((event, index) => (
				<div
					key={event.id}
					className={`group relative glass-effect rounded-2xl overflow-hidden border border-white/10 transition-all duration-500 hover:border-fire-orange/50 hover:shadow-2xl hover:shadow-fire-orange/20 hover:scale-[1.02] hover:-translate-y-2 ${
						isVisible
							? 'opacity-100 translate-y-0'
							: 'opacity-0 translate-y-8'
					}`}
					style={{
						transitionDelay: `${index * 150}ms`,
					}}
				>
					{/* Gradient overlay on hover */}
					<div className="absolute inset-0 bg-gradient-to-br from-fire-orange/0 via-fire-orange/0 to-fire-red/0 group-hover:from-fire-orange/10 group-hover:via-fire-orange/5 group-hover:to-fire-red/10 transition-all duration-500 z-0" />

					{/* Logo Section */}
					<div className="relative w-full aspect-video bg-gradient-to-br from-fire-dark via-fire-charcoal to-fire-dark flex items-center justify-center p-8 overflow-hidden">
						{/* Animated background pattern */}
						<div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
							<div className="absolute top-0 right-0 w-32 h-32 bg-fire-orange/10 rounded-full blur-2xl" />
							<div className="absolute bottom-0 left-0 w-32 h-32 bg-fire-red/10 rounded-full blur-2xl" />
						</div>

						<div className="relative z-10">
							<Image
								src={event.logo}
								alt={`${event.name} logo`}
								width={300}
								height={300}
								className="object-contain transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-2xl"
							/>
						</div>
					</div>

					{/* Content Section */}
					<div className="relative z-10 p-6 md:p-8 space-y-5">
						{/* Event Name */}
						<div>
							<h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2 group-hover:text-fire-orange transition-colors duration-300">
								{event.name}
							</h3>
						</div>

						{/* Date and Focus */}
						<div className="space-y-3">
							<div className="flex items-center gap-2 text-fire-orange">
								<Calendar className="h-4 w-4" />
								<p className="font-semibold text-sm md:text-base">{event.dates}</p>
							</div>

							<div className="flex items-center gap-2">
								<Users className="h-4 w-4 text-gray-400" />
								<span
									className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getFocusBadgeColor(
										event.focus
									)}`}
								>
									{event.focus}
								</span>
							</div>
						</div>

						{/* CTA Button */}
						<Link
							href={event.link}
							className="relative inline-flex items-center justify-center w-full text-center bg-fire-red hover:bg-fire-orange text-white font-bold py-3.5 px-6 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-fire-orange/50 border border-white/10 hover:border-white/20 overflow-hidden group/button"
						>
							{/* Button gradient overlay */}
							<span className="absolute inset-0 bg-gradient-to-r from-fire-orange to-fire-yellow opacity-0 group-hover/button:opacity-100 transition-opacity duration-300" />
							<span className="relative z-10">Learn More</span>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="relative z-10 ml-2 h-5 w-5 group-hover/button:translate-x-1 transition-transform duration-300"
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
						</Link>
					</div>

					{/* Glow effect on hover */}
					<div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
						<div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-fire-orange/0 via-fire-orange/20 to-fire-red/0 blur-xl" />
					</div>
				</div>
			))}
		</div>
	)
}
