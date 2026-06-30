# Houris Designs Frontend Audit

**Audit date:** June 13, 2026  
**Repository:** `houris-designs-frontend`  
**Scope:** Security, correctness, performance, accessibility, maintainability,
dependencies, stale data, unused code, routes, production build, and runtime
behavior.

## Executive Summary

The storefront's public browsing experience and core architecture are solid,
but the app is not production-ready yet.

No obvious frontend-critical vulnerability such as exposed authentication
tokens or hardcoded secrets was found. However, there are high-impact
dependency, privacy, correctness, and incomplete-flow problems.

The most important issues are:

1. Production dependencies contain known high-severity vulnerabilities.
2. Saved account addresses are stored only in browser `localStorage`.
3. Production silently falls back to the staging API.
4. The email-change confirmation flow has no frontend route.
5. The live account dashboard displays fabricated customer history.

This audit covered repository code, documentation, dependencies, production
build output, route responses, and browser behavior against the staging API.
The backend implementation itself was not audited.

## High-Severity Findings

### 1. Production dependencies contain known vulnerabilities

`npm audit --omit=dev` reports:

- 6 high-severity vulnerabilities
- 13 moderate-severity vulnerabilities
- 19 total production-tree vulnerabilities

Directly affected dependencies include:

- `next@16.1.7`
- `axios@1.15.0`
- `postcss`
- `shadcn`

`shadcn` is a development CLI but is installed as a production dependency. It
pulls its MCP, Hono, Express, and parsing dependency tree into production
installs.

**Evidence:** `package.json`

**Recommendation:** Upgrade vulnerable direct dependencies as patched releases
become available. Move `shadcn` to `devDependencies` unless it is demonstrably
required at runtime.

### 2. Saved addresses are not saved to the account API

The rendered delivery editor reads and writes shipping addresses directly to
browser `localStorage`.

**Evidence:**

- `features/account/components/DeliveryDetails.tsx`
- `features/orders/components/CheckoutForm.tsx`
- `app/checkout/CheckoutPageContent.tsx`

Consequences:

- Addresses do not follow customers between devices.
- Addresses survive logout and can appear for another account using the same
  browser.
- Any script executing on the origin can read the address.
- Checkout and account data can disagree with the backend.

The correct API hooks already exist but are unused:

- `features/account/usecases/useGetAddress.ts`
- `features/account/usecases/useUpdateAddress.ts`

**Recommendation:** Replace the account page's `localStorage` implementation
with the existing account address API hooks. Only retain temporary local
checkout data where explicitly required, and clear it on logout.

### 3. Production silently falls back to the staging API

If `NEXT_PUBLIC_API_BASE_URL` is missing, all API requests use:

```text
https://api-staging.hourisdesigns.com
```

**Evidence:** `services/api/base-url.ts`

This risks exposing test catalog data or sending real customer credentials and
checkout operations to staging.

The runtime catalog currently displays staging-style records and prices such
as `NGN 149`.

**Recommendation:** Fail fast during production builds when the API base URL is
missing. Do not use staging as the production fallback.

### 4. Email-change confirmation is incomplete

The API adapter, repository, and service exist, but `/confirm-email-change` is
missing and returns HTTP 404.

Customers receiving the documented confirmation email cannot complete the
flow.

**Evidence:**

- `features/account/account.adapter.ts`
- `features/account/account.repository.ts`
- `features/account/account.service.ts`
- `docs/customer-account-management.md`

**Recommendation:** Add the confirmation route and call
`accountService.confirmEmailChange(code)`, with clear success, failure, and
missing-code states.

## Medium-Severity Findings

### 5. Account dashboard displays fabricated customer history

Every customer sees:

- 12 orders
- Member since 2023
- Fit profile B12
- A delivery on March 28, 2026
- A hardcoded preferred finish

**Evidence:** `features/account/components/AccountPageView.tsx`

**Recommendation:** Remove these fields until backed by real API data, or
replace them with truthful account and order-derived values.

### 6. Protected routes rely entirely on client-side redirects

Routes such as `/account`, `/account/orders`, `/account/change-password`,
`/cart`, and `/checkout` initially return HTTP 200 and render page shells
before client-side authentication handling completes.

The backend should still protect customer data, but frontend route guarding and
the unauthenticated user experience are weak.

**Recommendation:** Add a server-compatible authentication gate or a route
protection strategy that prevents protected shells from rendering to
unauthenticated visitors.

### 7. Footer links lead to missing pages

The following routes return HTTP 404:

- `/contact`
- `/terms`
- `/privacy`

**Evidence:** `components/site-footer.tsx`

Missing Terms and Privacy pages are particularly risky for an ecommerce
checkout.

**Recommendation:** Add the pages or remove the links until content is ready.

### 8. "Keep me signed in" does nothing

The sign-in checkbox is not registered, included in the login payload, or
otherwise consumed.

**Evidence:** `features/authentication/components/SignInForm.tsx`

**Recommendation:** Implement the behavior through an explicit backend session
option, or remove the control and claim.

### 9. "New Arrivals" sorting does nothing

The footer links to `/collection?sort=newest`, but the collection page never
reads the `sort` parameter.

**Evidence:**

- `components/site-footer.tsx`
- `features/products/components/ProductCollectionView.tsx`

**Recommendation:** Map a validated sort parameter to the API's `sortBy`
contract, or remove the link.

### 10. Security headers are not configured in the repository

`next.config.mjs` is empty. Runtime responses expose `X-Powered-By: Next.js`
and do not include repository-configured CSP, HSTS, frame restrictions,
permissions policy, or referrer policy.

These headers may be added by deployment infrastructure, but that was not
visible during this audit.

**Evidence:** `next.config.mjs`

**Recommendation:** Define the required headers in Next.js or confirm and
document their deployment-layer configuration.

### 11. Product-image optimization is disabled

Product, cart, swatch, and gallery images use Next.js `Image` with
`unoptimized`.

**Evidence:**

- `features/products/components/ProductGrid.tsx`
- `features/landing/components/featured-collection.tsx`
- `features/cart/components/CartItem.tsx`
- `app/collection/[id]/product-detail-client.tsx`

**Recommendation:** Configure approved remote image hosts and enable Next.js
image optimization, or use a documented external image optimization pipeline.

### 12. Accessibility problems exist in interactive UI

Observed issues:

- Delivery form labels lack `htmlFor` and inputs lack matching IDs.
- The product size-guide modal has no dialog role, focus trap, Escape handling,
  or focus restoration.
- The custom mobile-menu dialog lacks complete focus management.

**Evidence:**

- `features/account/components/DeliveryDetails.tsx`
- `app/collection/[id]/product-detail-client.tsx`
- `components/site-header.tsx`

**Recommendation:** Use the existing dialog primitive for modal experiences,
associate every form label with its input, and verify keyboard-only operation.

## Stale Test And Demo Data

### Live hardcoded account data

`features/account/components/AccountPageView.tsx` contains stale customer
history that is displayed in the live account interface.

### Unused demo product catalog

`features/products/demo-products.ts` contains an entire unused demo catalog,
including product descriptions, colors, images, and helper functions.

The product images under `public/images/products/` appear to be used only by
this unused demo catalog.

## Unused Or Likely Dead Code

Confirmed or strongly indicated unused code includes:

- `features/products/demo-products.ts`
- `features/products/usecases/useCreateProduct.ts`
- `features/products/usecases/useUpdateProduct.ts`
- `features/products/usecases/useDeleteProduct.ts`
- `productService.toggleProduct`
- `features/account/usecases/useGetAddress.ts`
- `features/account/usecases/useUpdateAddress.ts`
- `features/orders/components/CheckoutHighlights.tsx`
- `types/pagination.ts`
- `CHECKOUT_QUERY_KEY`
- `PRODUCT_DETAIL_QUERY_KEY`
- `CART_ROUTES`
- `SIZE_ROUTES`

Some exported interfaces and schemas are also currently unused outside their
own modules. These may be intentional public feature contracts, so they should
be reviewed before deletion.

## Unused And Oversized Assets

Clearly unreferenced media includes:

- `public/images/HeroImages/copy_722EBB19-BDA5-4500-9E45-DDFBAA153BC6.mov`
  at approximately 8.77 MB
- `public/images/HeroImages/IMG_8310.jpeg` at approximately 4.70 MB
- `public/images/hourso3.webp`
- `public/images/HeroImages/houris4.webp`
- `public/images/HeroImages/hourisimage3.webp`
- `public/images/HeroImages/hourisimage4.webp`
- Product demo images under `public/images/products/`

There is at least approximately 14 MB of clearly unreferenced media, excluding
the demo product images.

**Recommendation:** Remove unused assets after confirming they are not used by
external consumers or planned content.

## Additional Quality Findings

### Encoding corruption

Checkout source contains visibly corrupted encoded characters for bullets and
apostrophes.

**Evidence:** `features/orders/components/CheckoutForm.tsx`

### Development auth logging includes customer email

Development logging prints the authenticated customer's email address.

**Evidence:** `features/authentication/usecases/useAuthProfile.ts`

### Runtime GSAP warnings

Ordinary runtime navigation emitted GSAP "target not found" warnings.

### Incomplete web manifest

`public/site.webmanifest` has empty `name` and `short_name` fields.

### No automated tests

No Jest, Vitest, React Testing Library, Playwright, Cypress, or equivalent test
setup was found.

### Formatting is not enforced

Prettier check failed across 169 TypeScript and TSX files.

### Missing route boundaries

No route-level `loading.tsx`, `error.tsx`, or custom `not-found.tsx` files were
found.

### Unvalidated payment redirect

Checkout redirects directly to the backend-provided payment URL without
validating that it belongs to the expected payment-provider origin.

**Evidence:** `app/checkout/CheckoutPageContent.tsx`

The backend should be authoritative, but an allowlist provides defense in
depth against compromised or malformed responses.

## What Works

- Production build succeeds.
- TypeScript strict checking passes.
- ESLint reports no errors and only two warnings.
- Public catalog browsing and product data loading work against staging.
- Cookie-based authentication correctly avoids storing access or refresh
  tokens in browser storage.
- Axios refresh requests are deduplicated.
- Forms generally use Zod validation and React Query invalidation
  appropriately.
- Core cart, checkout, order, account, and product layers are organized
  consistently.
- Reduced-motion handling exists for the main animations.
- The worktree remained clean throughout the audit.

## Checks Run

| Check                                  | Result                  |
| -------------------------------------- | ----------------------- |
| `npm run build`                        | Passed                  |
| `npm run typecheck`                    | Passed                  |
| `npm run lint`                         | Passed with 2 warnings  |
| `npx prettier --check "**/*.{ts,tsx}"` | Failed across 169 files |
| `npm audit --omit=dev`                 | 19 vulnerabilities      |
| Runtime route verification             | Completed               |
| Browser verification                   | Completed               |

The initial sandboxed build failed because `.next/trace` was locked with an
`EPERM` error. Running the production build outside the sandbox succeeded, so
that failure was environmental rather than an application defect.

## Recommended Remediation Order

1. Upgrade vulnerable production dependencies and move `shadcn` to
   `devDependencies`.
2. Replace account address `localStorage` behavior with the account address API.
3. Remove the staging fallback for production builds.
4. Add the email-change confirmation route.
5. Remove hardcoded account history and stale demo data.
6. Add Terms, Privacy, and Contact pages.
7. Add protected-route handling and security headers.
8. Fix payment URL validation, encoding corruption, and no-op controls.
9. Enable image optimization and remove unused large assets.
10. Address accessibility gaps and add automated tests.
11. Apply and enforce the repository's Prettier configuration.
