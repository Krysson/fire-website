import Link from 'next/link';
import Hero from '@/components/home/Hero';
import EventCards from '@/components/home/EventCards';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FIRE Orlando - Rope Bondage Education',
  description: 'FIRE (Florida Intensive Rope Events) hosts three annual rope bondage conventions in Orlando, FL: BLAZE, FLARE, and FIRE. Educational workshops for all skill levels.',
  openGraph: {
    title: 'FIRE Orlando - Rope Bondage Education',
    description: 'Three annual rope bondage education events in Orlando, FL. Join us for BLAZE, FLARE, and FIRE.',
    type: 'website',
    url: 'https://fireorlando.com',
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-fire-black">
      {/* Hero Section */}
      <Hero />

      {/* Our Events Section */}
      <section className="py-20 md:py-32 bg-fire-charcoal relative overflow-hidden">
       	{/* Background decorative elements */}
       	<div className="absolute top-0 right-0 w-96 h-96 bg-fire-orange/5 rounded-full blur-3xl" />
       	<div className="absolute bottom-0 left-0 w-96 h-96 bg-fire-red/5 rounded-full blur-3xl" />

       	<div className="container mx-auto px-4 relative z-10">
         	<div className="text-center mb-16 md:mb-20">
           	<h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
             	<span className="gradient-fire-text">Our Events</span>
           	</h2>
           	<p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
             	Three unique events each year, each designed to serve different experience levels
             	and learning goals in the rope bondage community.
           	</p>
         	</div>
         	<EventCards />
       	</div>
     	</section>

     	{/* About Preview Section */}
     	<section className="py-20 md:py-32 bg-fire-black relative overflow-hidden">
       	{/* Background pattern */}
       	<div className="absolute inset-0 opacity-5">
         	<div className="absolute inset-0" style={{
           	backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
           	backgroundSize: '40px 40px'
         	}} />
       	</div>

       	<div className="container mx-auto px-4 relative z-10">
         	<div className="max-w-6xl mx-auto">
           	{/* Two-column layout on desktop */}
           	<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
             	{/* Left column - Visual element */}
             	<div className="hidden lg:block">
               	<div className="relative">
                 	<div className="absolute inset-0 bg-gradient-to-br from-fire-orange/20 to-fire-red/20 rounded-3xl blur-3xl transform rotate-6" />
                 	<div className="relative glass-effect rounded-3xl p-12 border border-white/10">
                   	<div className="space-y-6">
                     	<div className="flex items-center gap-4">
                       	<div className="w-16 h-16 rounded-full bg-gradient-to-br from-fire-red to-fire-orange flex items-center justify-center">
                         	<svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           	<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                         	</svg>
                       	</div>
                       	<div>
                         	<h3 className="text-xl font-bold text-white">Education</h3>
                         	<p className="text-gray-400 text-sm">Intensive learning experiences</p>
                       	</div>
                     	</div>
                     	<div className="flex items-center gap-4">
                       	<div className="w-16 h-16 rounded-full bg-gradient-to-br from-fire-orange to-fire-yellow flex items-center justify-center">
                         	<svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           	<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                         	</svg>
                       	</div>
                       	<div>
                         	<h3 className="text-xl font-bold text-white">Community</h3>
                         	<p className="text-gray-400 text-sm">Meaningful connections</p>
                       	</div>
                     	</div>
                     	<div className="flex items-center gap-4">
                       	<div className="w-16 h-16 rounded-full bg-gradient-to-br from-fire-red to-fire-yellow flex items-center justify-center">
                         	<svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           	<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                         	</svg>
                       	</div>
                       	<div>
                         	<h3 className="text-xl font-bold text-white">Artistic Expression</h3>
                         	<p className="text-gray-400 text-sm">Creative exploration</p>
                       	</div>
                     	</div>
                   	</div>
                 	</div>
               	</div>
             	</div>

             	{/* Right column - Content */}
             	<div className="text-center lg:text-left">
               	<div className="inline-block px-4 py-2 bg-fire-orange/10 border border-fire-orange/30 rounded-full mb-6">
                 	<span className="text-fire-orange font-semibold text-sm uppercase tracking-wide">
                   	Who We Are
                 	</span>
               	</div>
               	<h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6">
                 	About FIRE
               	</h2>
               	<div className="space-y-6 mb-10">
                 	<p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                   	FIRE (Florida Intensive Rope Events) is a community-driven organization dedicated
                   	to advancing rope bondage education in a safe, inclusive, and supportive environment.
                   	Since our founding, we have brought together practitioners from across the country
                   	for intensive learning experiences, artistic exploration, and meaningful community connection.
                 	</p>
                 	<p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                   	Based in Orlando, Florida, we host three annual events that cater to different skill
                   	levels and learning objectives, ensuring that everyone from curious beginners to
                   	seasoned experts can find their place in our community.
                 	</p>
               	</div>
               	<Link
                 	href="/about"
                 	className="group inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-fire-black bg-fire-orange hover:bg-fire-yellow transition-all duration-300 rounded-xl shadow-2xl hover:shadow-fire-orange/50 hover:scale-105 relative overflow-hidden"
               	>
                 	<span className="absolute inset-0 bg-gradient-to-r from-fire-yellow to-fire-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                 	<span className="relative z-10 flex items-center gap-2">
                   	Learn More About FIRE
                   	<svg
                     	xmlns="http://www.w3.org/2000/svg"
                     	className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300"
                     	fill="none"
                     	viewBox="0 0 24 24"
                     	stroke="currentColor"
                     	strokeWidth={2.5}
                   	>
                     	<path
                       	strokeLinecap="round"
                       	strokeLinejoin="round"
                       	d="M9 5l7 7-7 7"
                     	/>
                   	</svg>
                 	</span>
               	</Link>
             	</div>
           	</div>
         	</div>
       	</div>
     	</section>

     	{/* Upcoming Highlight Section */}
     	<section className="py-20 md:py-32 relative overflow-hidden">
       	{/* Enhanced gradient background */}
       	<div className="absolute inset-0 bg-gradient-to-br from-fire-charcoal via-fire-dark to-fire-charcoal" />
       	<div className="absolute inset-0 bg-gradient-to-t from-fire-red/10 via-transparent to-fire-orange/10" />
       	<div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full bg-gradient-radial from-fire-orange/5 via-transparent to-transparent" />

       	{/* Decorative border */}
       	<div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-fire-orange/50 to-transparent" />

       	<div className="container mx-auto px-4 relative z-10">
         	<div className="max-w-5xl mx-auto">
           	<div className="glass-effect rounded-3xl p-8 md:p-12 border border-fire-orange/30 shadow-2xl shadow-fire-orange/10">
             	<div className="text-center">
               	{/* Enhanced badge */}
               	<div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-fire-red/20 via-fire-orange/20 to-fire-yellow/20 border border-fire-orange/40 rounded-full mb-8 backdrop-blur-sm">
                 	<div className="w-2 h-2 bg-fire-orange rounded-full animate-pulse" />
                 	<span className="text-fire-orange font-bold text-sm uppercase tracking-wider">
                   	Next Event
                 	</span>
               	</div>

               	{/* Event name with gradient */}
               	<h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6">
                 	<span className="gradient-fire-text">BLAZE 2026</span>
               	</h2>

               	{/* Date with icon */}
               	<div className="flex items-center justify-center gap-3 mb-6">
                 	<svg className="w-6 h-6 text-fire-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   	<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                 	</svg>
                 	<p className="text-2xl md:text-3xl text-fire-orange font-bold">
                   	April 17-19, 2026
                 	</p>
               	</div>

               	{/* Description */}
               	<p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
                 	Our beginner-to-intermediate focused event returns this spring. Join us for a
                 	weekend of foundational rope education, hands-on practice, and community connection.
               	</p>

               	{/* Enhanced CTA buttons */}
               	<div className="flex flex-col sm:flex-row gap-4 justify-center">
                 	<Link
                   	href="/events/blaze-2026"
                   	className="group inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-fire-red hover:bg-fire-orange transition-all duration-300 rounded-xl shadow-2xl hover:shadow-fire-orange/50 hover:scale-105 border border-white/10 relative overflow-hidden"
                 	>
                   	<span className="absolute inset-0 bg-gradient-to-r from-fire-orange to-fire-yellow opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                   	<span className="relative z-10">View Event Details</span>
                 	</Link>
                 	<a
                   	href="https://forbiddentickets.com/events/blaze-2026"
                   	target="_blank"
                   	rel="noopener noreferrer"
                   	className="group inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-fire-orange border-2 border-fire-orange hover:bg-fire-orange hover:text-fire-black transition-all duration-300 rounded-xl hover:scale-105 hover:shadow-xl hover:shadow-fire-orange/30 relative overflow-hidden"
                 	>
                   	<span className="absolute inset-0 bg-fire-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                   	<span className="relative z-10 flex items-center gap-2">
                     	Get Tickets
                     	<svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                       	<path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                     	</svg>
                   	</span>
                 	</a>
               	</div>
             	</div>
           	</div>
         	</div>
       	</div>
     	</section>
    </div>
  );
}
