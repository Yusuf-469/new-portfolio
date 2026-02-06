"use client";

import { useEffect, useState, useRef } from "react";

export function useCustomCursor() {
  const [isActive, setIsActive] = useState(false);
  const cursorRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastX = useRef(0);
  const lastY = useRef(0);

  useEffect(() => {
    const cursor = document.getElementById("cursor");
    if (!cursor) return;
    
    cursorRef.current = cursor;
    setIsActive(true);

    let latestX = 0;
    let latestY = 0;
    let isHovering = false;
    let isMouseMoved = false;

    const updateCursor = (e: MouseEvent) => {
      latestX = e.clientX;
      latestY = e.clientY;
      isMouseMoved = true;
      
      const target = e.target as HTMLElement;
      const isLink = target.tagName === "A" || target.tagName === "BUTTON";
      const isHoverable = target.closest("[data-cursor-hover]");
      
      isHovering = !!isLink || !!isHoverable;
    };

    const animate = () => {
      if (cursorRef.current && isMouseMoved) {
        // Smooth interpolation for cursor position
        const dx = latestX - lastX.current;
        const dy = latestY - lastY.current;
        
        lastX.current += dx * 0.3;
        lastY.current += dy * 0.3;
        
        cursorRef.current.style.transform = `translate3d(${lastX.current - 4}px, ${lastY.current - 4}px, 0)`;
        
        if (isHovering) {
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

  return { isActive };
}
