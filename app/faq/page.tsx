import { getOrganizationContent } from '@/lib/content';
import { remark } from 'remark';
import html from 'remark-html';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about FIRE events, policies, registration, venue, and more.',
};

async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

// Parse markdown into sections with Q&A pairs
function parseMarkdownSections(markdown: string) {
  const sections: { title: string; items: { question: string; answer: string }[] }[] = [];
  const lines = markdown.split('\n');

  let currentSection: { title: string; items: { question: string; answer: string }[] } | null = null;
  let currentQuestion: string | null = null;
  let currentAnswer: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // H2 headings are section titles
    if (line.startsWith('## ') && !line.startsWith('## ')) {
      // Save previous Q&A if exists
      if (currentQuestion && currentSection) {
        currentSection.items.push({
          question: currentQuestion,
          answer: currentAnswer.join('\n').trim(),
        });
        currentQuestion = null;
        currentAnswer = [];
      }

      // Save previous section if exists
      if (currentSection) {
        sections.push(currentSection);
      }

      // Start new section
      currentSection = {
        title: line.replace('## ', '').trim(),
        items: [],
      };
    }
    // H3 headings are questions
    else if (line.startsWith('### ')) {
      // Save previous Q&A if exists
      if (currentQuestion && currentSection) {
        currentSection.items.push({
          question: currentQuestion,
          answer: currentAnswer.join('\n').trim(),
        });
      }

      // Start new question
      currentQuestion = line.replace('### ', '').trim();
      currentAnswer = [];
    }
    // Collect answer lines
    else if (currentQuestion && line.trim() !== '' && !line.startsWith('#')) {
      currentAnswer.push(line);
    }
  }

  // Save final Q&A and section
  if (currentQuestion && currentSection) {
    currentSection.items.push({
      question: currentQuestion,
      answer: currentAnswer.join('\n').trim(),
    });
  }
  if (currentSection) {
    sections.push(currentSection);
  }

  return sections;
}

export default async function FAQPage() {
  const content = getOrganizationContent('faq.md');

  if (!content) {
    return (
      <div className="min-h-screen bg-fire-black py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-300">Content not available.</p>
        </div>
      </div>
    );
  }

  const sections = parseMarkdownSections(content.content);

  return (
    <div className="min-h-screen bg-fire-black">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-fire-charcoal to-fire-black border-b border-fire-orange/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              Find answers to common questions about FIRE events, policies, and more.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-16 md:py-24 bg-fire-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {sections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h2 className="text-3xl font-bold text-fire-orange mb-6">
                  {section.title}
                </h2>
                <Accordion type="single" collapsible className="space-y-4">
                  {section.items.map((item, itemIndex) => (
                    <AccordionItem
                      key={`${sectionIndex}-${itemIndex}`}
                      value={`item-${sectionIndex}-${itemIndex}`}
                      className="border border-fire-orange/20 rounded-lg bg-fire-charcoal/50 px-6 data-[state=open]:bg-fire-charcoal"
                    >
                      <AccordionTrigger className="text-left text-lg font-semibold text-white hover:text-fire-yellow py-4 hover:no-underline">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-300 leading-relaxed pb-4 pt-2">
                        <div className="prose prose-invert prose-p:text-gray-300 prose-p:my-2 prose-strong:text-white max-w-none">
                          {item.answer}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 md:py-24 bg-fire-charcoal border-t border-fire-orange/20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Still Have Questions?
            </h2>
            <p className="text-lg md:text-xl text-gray-300 mb-8">
              We're here to help. Reach out to our team and we'll get back to you as soon as possible.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-fire-red hover:bg-fire-orange transition-colors duration-200 rounded-lg shadow-lg"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
