import { products, type Product } from "./catalog";

/**
 * Commerce boundary for OTR Garments.
 *
 * The storefront consumes this shape instead of talking directly to Shopify.
 * When Shopify is connected, replace the local implementation with a
 * Storefront API adapter and keep the UI components unchanged.
 */
export interface CommerceClient {
  getProducts(): Promise<Product[]>;
  getProduct(slug: string): Promise<Product | null>;
}

export const localCommerce: CommerceClient = {
  async getProducts() {
    return products;
  },
  async getProduct(slug) {
    return products.find((product) => product.slug === slug) ?? null;
  },
};
