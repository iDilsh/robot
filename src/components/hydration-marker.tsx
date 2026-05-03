'use client';

import { useEffect } from 'react';

/**
 * Marks the <html> element with data-hydrated="true" after React mounts.
 * This signals to CSS that JavaScript has successfully hydrated,
 * allowing Framer Motion animations to take control of opacity/transform.
 *
 * Without this, the CSS safety net in globals.css forces all
 * Framer Motion elements visible (overriding their opacity:0 initial state).
 */
export default function HydrationMarker() {
  useEffect(() => {
    document.documentElement.setAttribute('data-hydrated', 'true');
  }, []);

  return null;
}
