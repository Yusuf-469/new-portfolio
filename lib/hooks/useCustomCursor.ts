"use client";

import { useEffect, useState } from "react";

export function useCustomCursor() {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = document.getElementById("cursor");
    if (!cursor) return;

    const updateCursor = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      
      const target = e.target as HTMLElement;
      const isLink = target.tagName === "A" || target.tagName === "BUTTON";
      const isHoverable = target.closest("[data-cursor-hover]");
      
      setIsHovering(!!isLink || !!isHoverable);
    };

    window.addEventListener("mousemove", updateCursor);

    return () => {
      window.removeEventListener("mousemove", updateCursor);
    };
  }, []);

  useEffect(() => {
    const cursor = document.getElementById("cursor");
    if (cursor) {
      cursor.style.left = `${cursorPosition.x - 4}px`;
      cursor.style.top = `${cursorPosition.y - 4}px`;
      
      if (isHovering) {
        cursor.classList.add("hover");
      } else {
        cursor.classList.remove("hover");
      }
    }
  }, [cursorPosition, isHovering]);

  return { cursorPosition, isHovering };
}
