import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import type { Components } from 'react-markdown';
import { cn } from '@/lib/utils';

/**
 * Renders organization markdown (about, policies, etc.) with explicit element
 * styles so structure from the .md file reads clearly on dark backgrounds—
 * richer than raw HTML + prose alone.
 */
const markdownComponents: Components = {
	// Hero already shows the page title; skip duplicate document h1 from the file.
	h1: () => null,
	h2: ({ children }) => (
		<h2 className="scroll-mt-24 mt-14 border-b border-fire-orange/25 pb-3 text-3xl font-bold text-fire-orange first:mt-0">
			{children}
		</h2>
	),
	h3: ({ children }) => (
		<h3 className="mt-10 mb-3 text-xl font-semibold text-fire-yellow md:text-2xl">
			{children}
		</h3>
	),
	p: ({ children }) => (
		<p className="mb-4 text-lg leading-relaxed text-gray-300 last:mb-0">{children}</p>
	),
	ul: ({ children }) => (
		<ul className="my-6 list-none space-y-4 pl-0">{children}</ul>
	),
	ol: ({ children }) => (
		<ol className="my-6 list-decimal space-y-3 pl-6 marker:text-fire-orange">{children}</ol>
	),
	li: ({ children }) => (
		<li className="relative border-l-2 border-fire-orange/35 pl-5 text-lg leading-relaxed text-gray-300">
			{children}
		</li>
	),
	strong: ({ children }) => (
		<strong className="font-semibold text-white">{children}</strong>
	),
	em: ({ children }) => (
		<em className="italic text-gray-400">{children}</em>
	),
	hr: () => (
		<hr className="my-12 h-px border-0 bg-linear-to-r from-transparent via-fire-orange/45 to-transparent" />
	),
	blockquote: ({ children }) => (
		<blockquote className="my-8 border-l-4 border-fire-orange/50 pl-5 text-gray-400 italic">
			{children}
		</blockquote>
	),
	a: ({ href, children }) => {
		if (!href) {
			return <span>{children}</span>
		}
		const className =
			'font-medium text-fire-orange underline-offset-2 transition-colors hover:text-fire-yellow hover:underline'
		if (href.startsWith('/')) {
			return (
				<Link href={href} className={className}>
					{children}
				</Link>
			)
		}
		const isExternal = href.startsWith('http')
		return (
			<a
				href={href}
				className={className}
				{...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
			>
				{children}
			</a>
		)
	},
}

interface OrganizationMarkdownProps {
	children: string
	className?: string
}

export function OrganizationMarkdown({ children, className }: OrganizationMarkdownProps) {
	return (
		<div
			className={cn(
				// Tighter paragraphs inside list items (CommonMark wraps items in <p>).
				'[&_li>p]:mb-2! [&_li>p]:mt-0!',
				className,
			)}
		>
			<ReactMarkdown
				remarkPlugins={[remarkGfm, remarkBreaks]}
				components={markdownComponents}
			>
				{children}
			</ReactMarkdown>
		</div>
	)
}
