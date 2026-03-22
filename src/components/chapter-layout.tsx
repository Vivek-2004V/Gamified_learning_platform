'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import ReadingProgressBar from './reading-progress-bar';

interface ChapterSection {
  id: string;
  heading: string;
  content?: string[];
  activities?: Activity[];
}

interface Activity {
  id: string;
  title: string;
  instructions: string[];
}

interface Chapter {
  class: string;
  subject: string;
  chapterNumber: number;
  title: string;
  subtitle: string;
  reprintYear: string;
  sections: ChapterSection[];
}

interface ChapterLayoutProps {
  chapter: Chapter;
}

const ChapterLayout: React.FC<ChapterLayoutProps> = ({ chapter }) => {
  const [activeSection, setActiveSection] = useState<string>('');
  const mainContentRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<string, HTMLElement>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [chapter.sections]);

  const scrollToSection = (id: string) => {
    sectionRefs.current[id]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  const renderContent = (section: ChapterSection) => {
    if (section.content) {
      return section.content.map((paragraph, index) => (
        <p key={index} className="mb-4 text-lg leading-relaxed text-gray-700">
          {paragraph}
        </p>
      ));
    }
    if (section.activities) {
      return section.activities.map((activity) => (
        <Card
          key={activity.id}
          className="mb-8 bg-blue-50 border-blue-200 shadow-sm"
        >
          <CardHeader>
            <CardTitle className="text-xl font-bold text-blue-800">
              {activity.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc space-y-2 pl-5 text-gray-700">
              {activity.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ));
    }
    return null;
  };

  const TableOfContents = ({ isMobile = false }) => (
    <nav className={isMobile ? 'p-4' : 'sticky top-24'}>
      <h3 className="mb-4 text-lg font-semibold uppercase tracking-wider text-gray-500">
        Contents
      </h3>
      <ul className="space-y-2">
        {chapter.sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(section.id);
              }}
              className={`block rounded-md p-2 text-sm font-medium transition-colors ${
                activeSection === section.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {section.heading}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <>
      <ReadingProgressBar targetRef={mainContentRef} />
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Mobile TOC (in a Sheet) */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Menu className="h-5 w-5" />
                  Table of Contents
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Chapter Contents</SheetTitle>
                </SheetHeader>
                <TableOfContents isMobile />
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop TOC */}
          <aside className="hidden md:block">
            <TableOfContents />
          </aside>

          {/* Main Content */}
          <main
            ref={mainContentRef}
            className="md:col-span-3 h-[calc(100vh-100px)] overflow-y-auto pr-4"
          >
            <header className="mb-12 border-b-2 border-gray-200 pb-8">
              <div className="mb-4 flex items-center justify-between">
                <p className="font-semibold text-gray-500">
                  Class {chapter.class} &ndash; {chapter.subject}
                </p>
                <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-700">
                  Reprint {chapter.reprintYear}
                </span>
              </div>
              <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
                Chapter {chapter.chapterNumber}: {chapter.title}
              </h1>
              <p className="text-md text-gray-500">{chapter.subtitle}</p>
            </header>

            <div className="prose prose-lg max-w-none">
              {chapter.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  ref={(el) => {
                    if (el) sectionRefs.current[section.id] = el;
                  }}
                  className="mb-12 scroll-mt-20"
                >
                  <h2 className="mb-6 text-3xl font-bold text-gray-800">
                    {section.heading}
                  </h2>
                  {renderContent(section)}
                </section>
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ChapterLayout;
