"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";

const TRANSITION_MS = 400;

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [visible, setVisible] = useState(true);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setDisplayChildren(children);
      return;
    }

    setVisible(false);
    const t = setTimeout(() => {
      setDisplayChildren(children);
      setVisible(true);
    }, TRANSITION_MS / 2);

    return () => clearTimeout(t);
    // Intentionally keyed on pathname only — children updates are picked up
    // from the closure once the route (and therefore pathname) changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <main
      className="flex-1 transition-opacity ease-in-out"
      style={{
        opacity: visible ? 1 : 0,
        transitionDuration: `${TRANSITION_MS / 2}ms`,
      }}
    >
      {displayChildren}
    </main>
  );
}
