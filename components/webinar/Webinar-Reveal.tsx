import React, { useEffect, useRef } from "react";

type IO = { observe(el: Element): void; unobserve(el: Element): void; disconnect(): void };

const optionsMap = new WeakMap<Element, { once: boolean; delay: number; onReveal?: () => void }>();
let sharedObserver: IO | null | undefined;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
function formatNumber(n: number, decimals: number) {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(n);
}
function startCounter(el: any) {
  const toAttr = el.getAttribute?.("data-count-to");
  if (!toAttr) return;

  const duration = parseInt(el.getAttribute("data-duration") || "1000", 10);
  const decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
  const prefix = el.getAttribute("data-prefix") || "";
  const suffix = el.getAttribute("data-suffix") || "";
  const from = parseFloat(el.getAttribute("data-count-from") || "0");
  const to = parseFloat(toAttr);

  const t0 = performance.now();
  function step(now: number) {
    const t = Math.min(1, (now - t0) / duration);
    const eased = easeOutCubic(t);
    const val = from + (to - from) * eased;
    el.textContent = `${prefix}${formatNumber(val, decimals)}${suffix}`;
    if (t < 1) requestAnimationFrame(step);
    else el.textContent = `${prefix}${formatNumber(to, decimals)}${suffix}`;
  }
  requestAnimationFrame(step);
}
function runCounters(container: any) {
  const nodes = container.querySelectorAll?.("[data-count-to]") || [];
  nodes.forEach((n: any) => startCounter(n));
}

/* ---------- Shared observer ---------- */
function getObserver(): IO | null {
  if (typeof window === "undefined") return null;
  if (!("IntersectionObserver" in window)) return null;

  if (!sharedObserver) {
    const real = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el: any = entry.target as any;
          const opts = optionsMap.get(el) || { once: true, delay: 0 };
          if (entry.isIntersecting) {
            const doShow = () => {
              el.classList.add("is-visible");
              runCounters(el);
              opts.onReveal?.();
            };
            if (opts.delay > 0) setTimeout(() => requestAnimationFrame(doShow), opts.delay);
            else requestAnimationFrame(doShow);

            if (opts.once) {
              real.unobserve(el);
              optionsMap.delete(el);
            }
          } else if (!opts.once) {
            el.classList.remove("is-visible");
          }
        }
      },
      { root: null, rootMargin: "0px 0px 0px 0px", threshold: 0.5 }
    );

    sharedObserver = {
      observe: real.observe.bind(real),
      unobserve: real.unobserve.bind(real),
      disconnect: real.disconnect.bind(real),
    };
  }
  return sharedObserver || null;
}

/* ---------- Variants ---------- */
type Variant = "up" | "fade" | "left" | "right" | "Dup" | "FlipX" | "zoom";
const variantClass = (v: Variant) =>
  v === "fade" ? "reveal--fade" :
  v === "left" ? "reveal--left" :
  v === "right" ? "reveal--right" :
  v === "Dup" ? "reveal--Dup" :
  v === "FlipX" ? "reveal--flipX" :
  v === "zoom" ? "reveal--zoom" : "";

/* ---------- Props ---------- */
type RevealProps = {
  as?: any;            // keep 'any' to avoid JSX namespace issues
  variant?: Variant;
  delay?: number;
  once?: boolean;
  className?: string;
  onReveal?: () => void;
  children?: any;      // avoid React.ReactNode to bypass missing types
};

export default function Reveal({
  as = "div",
  variant = "up",
  delay = 0,
  once = true,
  className = "",
  onReveal,
  children,
}: RevealProps) {
  // No generic type arg here → avoids “Expected 0 type arguments” error
  const ref = useRef(null);

  // Apply base + variant at render (prevents FOUC)
  const classes = ["reveal", variantClass(variant), className].filter(Boolean).join(" ");

  useEffect(() => {
    const el: any = ref.current;
    if (!el) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (delay > 0) (el.style as any).transitionDelay = `${delay}ms`;

    if (reduce) {
      el.classList.add("is-visible");
      runCounters(el);
      onReveal?.();
      return;
    }

    const io = getObserver();
    optionsMap.set(el, { once: !!once, delay: delay ?? 0, onReveal });

    if (io) io.observe(el);
    else {
      el.classList.add("is-visible");
      runCounters(el);
      onReveal?.();
    }

    return () => {
      const io2 = getObserver();
      if (io2) io2.unobserve(el);
      optionsMap.delete(el);
    };
  }, [delay, once, onReveal, variant]);

  const Tag = (as || "div") as any;
  return (
    <Tag ref={ref as any} className={classes}>
      {children}
    </Tag>
  );
}
