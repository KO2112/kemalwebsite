import { useEffect, useState, useCallback } from 'react';

const ScrollHandler = ({ sections }) => {
  const [activeSection, setActiveSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [wheelTimeout, setWheelTimeout] = useState(null);

  // Find the current active section based on scroll position
  const determineActiveSection = useCallback(() => {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const scrollThreshold = 0.4; // Percentage of section that needs to be visible

    for (let i = 0; i < sections.length; i++) {
      const section = sections[i];
      const sectionElement = section.ref.current;
      
      if (sectionElement) {
        const sectionTop = sectionElement.offsetTop;
        const sectionHeight = sectionElement.offsetHeight;
        const sectionBottom = sectionTop + sectionHeight;
        
        // Check if this section is currently the most visible in the viewport
        if (
          (scrollPosition >= sectionTop - windowHeight * scrollThreshold) &&
          (scrollPosition < sectionBottom - windowHeight * scrollThreshold)
        ) {
          return i;
        }
      }
    }
    
    return activeSection;
  }, [sections, activeSection]);

  // Scroll to the specified section
  const scrollToSection = useCallback((index) => {
    if (index >= 0 && index < sections.length && !isScrolling) {
      setIsScrolling(true);
      sections[index].ref.current.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(index);
      
      // Reset scrolling state after animation completes
      setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    }
  }, [sections, isScrolling]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Prevent default behavior for arrow keys
      if (['ArrowDown', 'ArrowUp', 'Space', 'PageDown', 'PageUp', 'Home', 'End'].includes(event.key)) {
        event.preventDefault();
      }
      
      switch(event.key) {
        case 'ArrowDown':
        case 'Space':
        case 'PageDown':
          scrollToSection(activeSection + 1);
          break;
        case 'ArrowUp':
        case 'PageUp':
          scrollToSection(activeSection - 1);
          break;
        case 'Home':
          scrollToSection(0);
          break;
        case 'End':
          scrollToSection(sections.length - 1);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSection, scrollToSection, sections.length]);

  // Handle mouse wheel events
  useEffect(() => {
    const handleWheel = (event) => {
      // Clear any existing timeout
      if (wheelTimeout) {
        clearTimeout(wheelTimeout);
      }
      
      // Set a new timeout to handle the wheel event
      const timeout = setTimeout(() => {
        if (Math.abs(event.deltaY) > 30) {
          if (event.deltaY > 0) {
            scrollToSection(activeSection + 1);
          } else {
            scrollToSection(activeSection - 1);
          }
        }
      }, 50);
      
      setWheelTimeout(timeout);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      if (wheelTimeout) {
        clearTimeout(wheelTimeout);
      }
    };
  }, [activeSection, scrollToSection, wheelTimeout]);

  // Handle touch events for mobile devices
  useEffect(() => {
    const handleTouchStart = (event) => {
      setTouchStartY(event.touches[0].clientY);
    };

    const handleTouchEnd = (event) => {
      const touchEndY = event.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      
      // Threshold to determine if it's a swipe
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          // Swipe up -> go to next section
          scrollToSection(activeSection + 1);
        } else {
          // Swipe down -> go to previous section
          scrollToSection(activeSection - 1);
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [activeSection, scrollToSection, touchStartY]);

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      if (!isScrolling) {
        const newActiveSection = determineActiveSection();
        if (newActiveSection !== activeSection) {
          setActiveSection(newActiveSection);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection, determineActiveSection, isScrolling]);

  // Optional: Add navigation dots
  useEffect(() => {
    // Create navigation dots
    const createNavDots = () => {
      const container = document.createElement('div');
      container.className = 'section-nav-dots';
      container.style.cssText = `
        position: fixed;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        flex-direction: column;
        gap: 10px;
        z-index: 1000;
      `;

      sections.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'nav-dot';
        dot.dataset.index = index;
        dot.style.cssText = `
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: ${index === activeSection ? '#ff6347' : 'rgba(255, 255, 255, 0.5)'};
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        `;
        dot.addEventListener('click', () => scrollToSection(index));
        container.appendChild(dot);
      });

      document.body.appendChild(container);
      return container;
    };

    const navDots = createNavDots();

    // Update active dot
    const updateActiveDot = () => {
      const dots = navDots.querySelectorAll('.nav-dot');
      dots.forEach((dot, index) => {
        dot.style.backgroundColor = index === activeSection ? '#ff6347' : 'rgba(255, 255, 255, 0.5)';
        dot.style.transform = index === activeSection ? 'scale(1.2)' : 'scale(1)';
      });
    };

    updateActiveDot();

    return () => {
      document.body.removeChild(navDots);
    };
  }, [activeSection, scrollToSection, sections]);

  return null;
};

export default ScrollHandler;