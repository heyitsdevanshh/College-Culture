import { useEffect, useRef } from 'react';

/**
 * Ensures that when a user hovers and scrolls inside this container,
 * only this container scrolls and the surrounding page/section remains strictly static.
 */
export function useStaticScroll<T extends HTMLElement = HTMLDivElement>() {
  const containerRef = useRef<T | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      // Prevent wheel event from bubbling to parent or window
      e.stopPropagation();

      const { scrollTop, scrollHeight, clientHeight } = el;
      const isScrollable = scrollHeight > clientHeight;

      // If content does not exceed container or is at boundaries, prevent outer window scroll
      if (!isScrollable) {
        e.preventDefault();
        return;
      }

      const delta = e.deltaY;
      const isAtTop = scrollTop <= 0;
      const isAtBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight - 1;

      // Prevent window scroll chaining when hitting boundaries
      if ((delta < 0 && isAtTop) || (delta > 0 && isAtBottom)) {
        e.preventDefault();
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return containerRef;
}
