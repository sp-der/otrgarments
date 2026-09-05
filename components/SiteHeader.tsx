"use client";

import { useEffect, useState } from "react";
import { TransitionLink, useCart } from "./AppProviders";

const logos = ["/OTR.webp", "/OTR1.webp", "/OTR2.webp", "/OTR3.webp", "/OTR4.webp", "/OTR5.webp"];

export default function SiteHeader() {
  const [logoIndex, setLogoIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, openCart } = useCart();

  useEffect(() => {
    let cancelled = false;
    let timer: number | undefined;

    // Decode every small WebP before rotating so a cold cache cannot flash blank.
    const preload = logos.map(async (src, index) => {
      const image = new Image();
      image.src = src;
      try {
        await image.decode();
        return { image, index };
      } catch {
        return null;
      }
    });

    void Promise.all(preload).then((results) => {
      if (cancelled) return;
      const ready = results.filter((result) => result !== null);
      if (ready.length === 0) return;
      let current = 0;
      setLogoIndex(ready[current].index);
      if (ready.length < 2) return;
      timer = window.setInterval(() => {
        current = (current + 1) % ready.length;
        setLogoIndex(ready[current].index);
      }, 500);
    });

    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`site-header ${scrolled ? "site-header--solid" : ""}`}
    >
      <nav className="site-header__left" aria-label="Primary navigation">
        <a href="/#shop">MENU</a>
      </nav>

      <TransitionLink
        className="brand-cycler"
        href="/"
        aria-label="OTR Garments home"
      >
        <img
          src={logos[logoIndex]}
          alt="OTR Garments"
          decoding="async"
          fetchPriority="high"
        />
      </TransitionLink>

      <div className="site-header__right">
        <button className="text-button desktop-only" type="button">SEARCH</button>
        <button className="text-button" type="button" onClick={openCart}>BAG ({count})</button>
        <button
          className="menu-button mobile-only"
          type="button"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>

      <div className={`mobile-nav ${menuOpen ? "is-open" : ""}`}>
        <a href="/#shop" onClick={() => setMenuOpen(false)}>MENU</a>
        <button type="button" onClick={() => { setMenuOpen(false); openCart(); }}>BAG ({count})</button>
      </div>
    </header>
  );
}
