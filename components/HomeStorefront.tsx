"use client";

import { useMemo, useState } from "react";
import { CATEGORIES, formatPrice, lookbookImages, products, type Category } from "@/lib/catalog";
import { TransitionLink } from "./AppProviders";
import SiteHeader from "./SiteHeader";

const HERO_VIDEO = "https://assets.mixkit.co/videos/preview/mixkit-fast-timelapse-from-the-side-of-a-white-car-driving-50992-large.mp4";
const HERO_POSTER = "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=2000&q=82";

export default function HomeStorefront() {
  const [category, setCategory] = useState<Category>("ALL");
  const [isFiltering, setIsFiltering] = useState(false);

  const filtered = useMemo(() => {
    if (category === "ALL") return products;
    return products.filter((product) => product.categories.includes(category));
  }, [category]);

  const chooseCategory = (next: Category) => {
    if (next === category) return;
    setIsFiltering(true);
    window.setTimeout(() => {
      setCategory(next);
      window.requestAnimationFrame(() => setIsFiltering(false));
    }, 180);
  };

  return (
    <main className="home-page">
      <SiteHeader />

      <section className="hero" aria-label="OTR Garments introduction">
        <video
          className="hero__video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={HERO_POSTER}
          src={HERO_VIDEO}
        />
        <div className="hero__veil" />
        <div className="hero__grain" />
      </section>

      <section className="shop" id="shop">
        <div className="shop__heading">
          <p>COLLECTION / 001</p>
          <h2>GARMENTS FOR<br />THE RUN.</h2>
          <span>{String(filtered.length).padStart(2, "0")} PIECES</span>
        </div>

        <div className="shop__body">
          <aside className="category-rail" aria-label="Product categories">
            {CATEGORIES.map((item) => (
              <button
                key={item}
                type="button"
                className={category === item ? "is-active" : ""}
                onClick={() => chooseCategory(item)}
              >
                <span>{item}</span>
                <small>{String(item === "ALL" ? products.length : products.filter((p) => p.categories.includes(item)).length).padStart(2, "0")}</small>
              </button>
            ))}
          </aside>

          <div className={`product-grid ${isFiltering ? "is-filtering" : ""}`}>
            {filtered.map((product, index) => (
              <article className="product-card" key={product.id} style={{ "--card-delay": `${index * 45}ms` } as React.CSSProperties}>
                <TransitionLink href={`/product/${product.slug}`} className="product-card__image-link">
                  <div className="product-card__image-wrap">
                    <img src={product.images[0]} alt={product.name} loading={index < 4 ? "eager" : "lazy"} />
                    <span className="product-card__view">VIEW</span>
                  </div>
                </TransitionLink>
                <div className="product-card__meta">
                  <div>
                    <TransitionLink href={`/product/${product.slug}`}>{product.name}</TransitionLink>
                    <span>{product.color}</span>
                  </div>
                  <strong>{formatPrice(product.price)}</strong>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="brand-statement">
        <div className="brand-statement__line">ON THE RUN / LOS ANGELES</div>
        <img src="/OTR.png" alt="OTR" />
        <p>STREETWEAR BUILT AROUND MOVEMENT, CARS, LATE NIGHTS AND THE PEOPLE WHO NEVER REALLY CLOCK OUT.</p>
      </section>

      <section className="lookbook" id="lookbook">
        <div className="lookbook__heading">
          <span>FIELD NOTES / 002</span>
          <h2>OUTSIDE<br />THE STUDIO.</h2>
        </div>
        <LifestyleRail />
      </section>

      <footer className="store-footer">
        <img src="/OTR.png" alt="OTR Garments" />
        <div>
          <a href="#shop">SHOP</a>
          <a href="#lookbook">LOOKBOOK</a>
          <a href="mailto:otrservicesie@gmail.com">CONTACT</a>
        </div>
        <small>© 2026 OTR GARMENTS</small>
      </footer>
    </main>
  );
}

export function LifestyleRail({ compact = false }: { compact?: boolean }) {
  const images = [...lookbookImages, ...lookbookImages];
  return (
    <div className={`lifestyle-rail ${compact ? "lifestyle-rail--compact" : ""}`}>
      <div className="lifestyle-rail__track">
        {images.map((image, index) => (
          <figure key={`${image}-${index}`}>
            <img src={image} alt="" loading="lazy" />
            <figcaption>OTR / {String((index % lookbookImages.length) + 1).padStart(2, "0")}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
