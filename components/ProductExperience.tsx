"use client";

import { useMemo, useState } from "react";
import { formatPrice, products, type Product } from "@/lib/catalog";
import { TransitionLink, useCart } from "./AppProviders";
import SiteHeader from "./SiteHeader";
import { LifestyleRail } from "./HomeStorefront";

export default function ProductExperience({ product }: { product: Product }) {
  const [size, setSize] = useState("");
  const [error, setError] = useState("");
  const { addItem } = useCart();

  const recommendations = useMemo(
    () => products.filter((item) => item.id !== product.id).slice(0, 4),
    [product.id]
  );

  const handleAdd = () => {
    if (!size) {
      setError("SELECT A SIZE");
      return;
    }
    setError("");
    addItem(product, size);
  };

  return (
    <main className="product-page">
      <SiteHeader />

      <div className="product-mobile-title">
        <span>{product.color}</span>
        <h1>{product.name}</h1>
        <strong>{formatPrice(product.price)}</strong>
      </div>

      <section className="product-layout">
        <aside className="product-info product-sticky">
          <p className="eyebrow">OTR GARMENTS / {product.id.toUpperCase()}</p>
          <h1>{product.name}</h1>
          <p className="product-color">{product.color}</p>
          <p className="product-description">{product.description}</p>

          <div className="product-accordions">
            <details open>
              <summary>DETAILS <span>+</span></summary>
              <ul>{product.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
            </details>
            <details>
              <summary>SIZE + FIT <span>+</span></summary>
              <p>Relaxed OTR fit. Take your usual size for the intended silhouette.</p>
            </details>
            <details>
              <summary>SHIPPING + RETURNS <span>+</span></summary>
              <p>Shipping and returns policy will connect to Shopify before launch.</p>
            </details>
          </div>
        </aside>

        <div className="product-gallery" aria-label={`${product.name} product images`}>
          {product.images.map((image, index) => (
            <figure key={image}>
              <img src={image} alt={`${product.name} view ${index + 1}`} loading={index === 0 ? "eager" : "lazy"} />
              <figcaption>{String(index + 1).padStart(2, "0")} / {String(product.images.length).padStart(2, "0")}</figcaption>
            </figure>
          ))}
        </div>

        <aside className="product-buy product-sticky">
          <div className="product-buy__top">
            <span>{product.name}</span>
            <strong>{formatPrice(product.price)}</strong>
          </div>
          <p>SELECT SIZE</p>
          <div className="size-grid">
            {product.sizes.map((item) => (
              <button
                type="button"
                key={item}
                className={size === item ? "is-selected" : ""}
                onClick={() => { setSize(item); setError(""); }}
              >
                {item}
              </button>
            ))}
          </div>
          <button className="add-button" type="button" onClick={handleAdd}>ADD TO BAG</button>
          <span className="product-error">{error}</span>
          <small>Taxes and shipping calculated at checkout.</small>
        </aside>
      </section>

      <section className="recommendations">
        <div className="recommendations__head">
          <span>KEEP MOVING / 003</span>
          <h2>YOU MAY LIKE</h2>
        </div>
        <div className="recommendation-grid">
          {recommendations.map((item) => (
            <article key={item.id}>
              <TransitionLink href={`/product/${item.slug}`}>
                <img src={item.images[0]} alt={item.name} loading="lazy" />
              </TransitionLink>
              <div><span>{item.name}</span><strong>{formatPrice(item.price)}</strong></div>
            </article>
          ))}
        </div>
      </section>

      <section className="product-lookbook">
        <div className="product-lookbook__head">
          <span>SEEN OUTSIDE / 004</span>
          <p>OTR IN MOTION</p>
        </div>
        <LifestyleRail compact />
      </section>

      <div className="mobile-buybar">
        <div>
          <span>{product.name}</span>
          <strong>{formatPrice(product.price)}</strong>
        </div>
        <select value={size} onChange={(event) => setSize(event.target.value)} aria-label="Select size">
          <option value="">SIZE</option>
          {product.sizes.map((item) => <option key={item}>{item}</option>)}
        </select>
        <button type="button" onClick={handleAdd}>ADD</button>
      </div>
    </main>
  );
}
