'use client';

import React, { useState, useEffect } from 'react';

interface ReadingProgressBarProps {
  targetRef: React.RefObject<HTMLElement>;
}

const ReadingProgressBar: React.FC<ReadingProgressBarProps> = ({
  targetRef,
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const scrollableElement = targetRef.current;
    if (!scrollableElement) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = scrollableElement;
      const windowHeight = scrollHeight - clientHeight;

      if (windowHeight > 0) {
        const scrolled = (scrollTop / windowHeight) * 100;
        setProgress(scrolled);
      } else {
        setProgress(100); // If content is not scrollable, bar is full
      }
    };

    scrollableElement.addEventListener('scroll', handleScroll, {
      passive: true,
    });
    handleScroll(); // Initial check

    return () => {
      scrollableElement.removeEventListener('scroll', handleScroll);
    };
  }, [targetRef]);

  return (
    <div className="fixed top-0 left-0 z-50 h-1 w-full bg-gray-200">
      <div
        className="h-1 bg-blue-500 transition-all duration-75 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ReadingProgressBar;
