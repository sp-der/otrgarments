"use client";

import { useEffect, useState } from "react";
import { TransitionLink, useCart } from "./AppProviders";

const logos = ["/OTR.png", "/OTR1.png", "/OTR2.png", "/OTR3.png", "/OTR4.png", "/OTR5.png"];

export default function SiteHeader() {
  const [logoIndex, setLogoIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count, openCart } = useCart();

  useEffect(() => {
    const timer = window.setInterval(() => {
      setLogoIndex((current) => (current + 1) % logos.length);
    }, 1050);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "site-header--solid" : ""}`}>
      <nav className="site-header__left" aria-label="Primary navigation">
        <a href="/#shop">SHOP</a>
        <a href="/#lookbook">LOOKBOOK</a>
      </nav>

      <TransitionLink className="brand-cycler" href="/" aria-label="OTR Garments home">
        <img key={logoIndex} src={logos[logoIndex]} alt={logoIndex === 0 ? "OTR Garments" : ""} />
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
        <a href="/#shop" onClick={() => setMenuOpen(false)}>SHOP</a>
        <a href="/#lookbook" onClick={() => setMenuOpen(false)}>LOOKBOOK</a>
        <button type="button" onClick={() => { setMenuOpen(false); openCart(); }}>BAG ({count})</button>
      </div>
    </header>
  );
}
