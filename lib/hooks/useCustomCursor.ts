"use client";

import { useEffect, useState, useRef } from "react";

export function useCustomCursor() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cursorRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const cursor = document.getElementById("cursor");
    if (!cursor) return;
    
    cursorRef.current = cursor;

    let latestX = 0;
    let latestY = 0;
    let latestIsHovering = false;

    const updateCursor = (e: MouseEvent) => {
      latestX = e.clientX;
      latestY = e.clientY;
      
      const target = e.target as HTMLElement;
      const isLink = target.tagName === "A" || target.tagName === "BUTTON";
      const isHoverable = target.closest("[data-cursor-hover]");
      
      latestIsHovering = !!isLink || !!isHoverable;
    };

    const animate = () => {
      if (cursorRef.current) {
        // Use transform for smoother performance
        cursorRef.current.style.transform = `translate3d(${latestX - 4}px, ${latestY - 4}px, 0)`;
        
        if (latestIsHovering) {
          cursorRef.current.classList.add("hover");
        } else {
          cursorRef.current.classList.remove("hover");
        }
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", updateCursor);
    animate();

    return () => {
      window.removeEventListener("mousemove", updateCursor);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return { cursorPosition, isHovering };
}
