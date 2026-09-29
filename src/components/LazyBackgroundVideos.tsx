"use client";

import { useEffect, useRef } from "react";

type Source = { src: string; poster: string; className: string };

// Posters paint immediately; only the video matching the current breakpoint is
// fetched, and only once the section is near the viewport.
export default function LazyBackgroundVideos({ sources }: { sources: Source[] }) {
  const refs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const visible = refs.current.find((v) => v && getComputedStyle(v).display !== "none");
    if (!visible) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        visible.src = visible.dataset.src!;
        visible.play().catch(() => {});
      },
      { rootMargin: "200px" },
    );
    io.observe(visible);
    return () => io.disconnect();
  }, []);

  return (
    <>
      {sources.map((s, i) => (
        <video
          key={s.src}
          ref={(el) => {
            refs.current[i] = el;
          }}
          data-src={s.src}
          poster={s.poster}
          muted
          loop
          playsInline
          preload="none"
          controls={false}
          disablePictureInPicture
          className={s.className}
          aria-hidden="true"
        />
      ))}
    </>
  );
}
