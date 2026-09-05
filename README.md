# OTR Garments

Custom Next.js storefront for OTR Garments.

## Architecture

- `app/` routes and global styling
- `components/` isolated storefront, product, cart, header, and transition UI
- `lib/catalog.ts` temporary local product content
- `lib/commerce.ts` commerce boundary ready for a future Shopify Storefront API adapter
- `public/OTR*.png` brand logo set used by the cycling header

## Development

```bash
npm install
npm run dev
```

The current cart persists locally for UI testing. Shopify checkout, inventory, products, orders, discounts, and customer data will replace the local commerce layer before launch.
