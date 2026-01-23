'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'

interface ScrollRevealProps {
	children: ReactNode
	delay?: number
	className?: string
}

export function ScrollReveal({ children, delay = 0, className = '' }: ScrollRevealProps) {
	const [isVisible, setIsVisible] = useState(false)
	const ref = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setTimeout(() => {
						setIsVisible(true)
					}, delay)
					observer.disconnect()
				}
			},
			{
				threshold: 0.1,
				rootMargin: '0px 0px -50px 0px',
			}
		)

		if (ref.current) {
			observer.observe(ref.current)
		}

		return () => {
			observer.disconnect()
		}
	}, [delay])

	return (
		<div
			ref={ref}
			className={`transition-all duration-1000 ${
				isVisible
					? 'opacity-100 translate-y-0'
					: 'opacity-0 translate-y-8'
			} ${className}`}
		>
			{children}
		</div>
	)
}
