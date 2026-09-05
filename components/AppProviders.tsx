"use client";

import {
  AnchorHTMLAttributes,
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Product } from "@/lib/catalog";

export type CartLine = {
  key: string;
  productId: string;
  slug: string;
  name: string;
  size: string;
  price: number;
  image: string;
  quantity: number;
};

type CartContextValue = {
  lines: CartLine[];
  count: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, size: string) => void;
  removeItem: (key: string) => void;
};

type TransitionContextValue = {
  navigate: (href: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const TransitionContext = createContext<TransitionContextValue | null>(null);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside AppProviders");
  return context;
}

export function TransitionLink({
  href,
  children,
  onClick,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const context = useContext(TransitionContext);

  return (
    <a
      href={href}
      {...props}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        if (href.startsWith("#")) return;
        event.preventDefault();
        context?.navigate(href);
      }}
    >
      {children}
    </a>
  );
}

export default function AppProviders({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [transitionPhase, setTransitionPhase] = useState<"idle" | "closing" | "opening">("idle");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem("otr-garments-cart");
      if (saved) setLines(JSON.parse(saved));
    } catch {
      // Ignore malformed local storage and start clean.
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("otr-garments-cart", JSON.stringify(lines));
  }, [lines]);

  useEffect(() => {
    if (transitionPhase !== "closing") return;
    setTransitionPhase("opening");
    const timer = window.setTimeout(() => setTransitionPhase("idle"), 460);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  const cart = useMemo<CartContextValue>(() => {
    const addItem = (product: Product, size: string) => {
      const key = `${product.id}:${size}`;
      setLines((current) => {
        const existing = current.find((line) => line.key === key);
        if (existing) {
          return current.map((line) =>
            line.key === key ? { ...line, quantity: line.quantity + 1 } : line
          );
        }
        return [
          ...current,
          {
            key,
            productId: product.id,
            slug: product.slug,
            name: product.name,
            size,
            price: product.price,
            image: product.images[0],
            quantity: 1,
          },
        ];
      });
      setIsOpen(true);
    };

    return {
      lines,
      count: lines.reduce((sum, line) => sum + line.quantity, 0),
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      removeItem: (key: string) => setLines((current) => current.filter((line) => line.key !== key)),
    };
  }, [lines, isOpen]);

  const navigate = (href: string) => {
    if (href === `${pathname}`) return;
    setTransitionPhase("closing");
    window.setTimeout(() => router.push(href), 390);
  };

  return (
    <TransitionContext.Provider value={{ navigate }}>
      <CartContext.Provider value={cart}>
        {children}
        <CartDrawer />
        <div className={`route-transition route-transition--${transitionPhase}`} aria-hidden="true">
          <div className="route-transition__vertical" />
          <div className="route-transition__horizontal" />
          <div className="route-transition__mark" />
        </div>
      </CartContext.Provider>
    </TransitionContext.Provider>
  );
}

function CartDrawer() {
  const { lines, isOpen, closeCart, removeItem } = useCart();
  const subtotal = lines.reduce((sum, line) => sum + line.price * line.quantity, 0);

  return (
    <>
      <button
        className={`cart-backdrop ${isOpen ? "is-open" : ""}`}
        aria-label="Close cart"
        onClick={closeCart}
      />
      <aside className={`cart-drawer ${isOpen ? "is-open" : ""}`} aria-hidden={!isOpen}>
        <div className="cart-drawer__head">
          <span>BAG</span>
          <button onClick={closeCart}>CLOSE</button>
        </div>
        <div className="cart-drawer__lines">
          {lines.length === 0 ? (
            <p className="cart-empty">Your bag is empty.</p>
          ) : (
            lines.map((line) => (
              <article className="cart-line" key={line.key}>
                <img src={line.image} alt="" />
                <div>
                  <strong>{line.name}</strong>
                  <span>SIZE {line.size} · QTY {line.quantity}</span>
                  <span>${line.price * line.quantity}</span>
                  <button onClick={() => removeItem(line.key)}>REMOVE</button>
                </div>
              </article>
            ))
          )}
        </div>
        <div className="cart-drawer__foot">
          <div><span>SUBTOTAL</span><strong>${subtotal}</strong></div>
          <button className="checkout-button" disabled={lines.length === 0}>
            CHECKOUT
          </button>
        </div>
      </aside>
    </>
  );
}
