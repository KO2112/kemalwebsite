import { useEffect } from 'react';

const ScrollHandler = ({ sections }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      const currentSection = sections.findIndex((section) => section.isInView);
      if (event.key === 'ArrowDown' && currentSection < sections.length - 1) {
        sections[currentSection + 1].ref.current.scrollIntoView({ behavior: 'smooth' });
      } else if (event.key === 'ArrowUp' && currentSection > 0) {
        sections[currentSection - 1].ref.current.scrollIntoView({ behavior: 'smooth' });
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [sections]);

  return null;
};

export default ScrollHandler;
