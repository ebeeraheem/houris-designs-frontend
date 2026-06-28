# Next.js template

This is a Next.js template with shadcn/ui.

## API base URL

The shared API client reads `NEXT_PUBLIC_API_BASE_URL` for all integrations. This
variable is **required**: the app fails fast (throws) if it is unset — there is
no staging fallback. For local development, copy `.env.example` to `.env.local`;
for builds and deploys, set it in the environment.

```bash
NEXT_PUBLIC_API_BASE_URL=https://api-staging.hourisdesigns.com
```

Feature adapters append paths such as `/api/auth/register`, so the browser calls
the configured API directly.

## Adding components

To add components to your app, run the following command:

```bash
npx shadcn@latest add button
```

This will place the ui components in the `components` directory.

## Using components

To use the components in your app, import them as follows:

```tsx
import { Button } from "@/components/ui/button"
```
