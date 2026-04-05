# Product Catalog

Public API endpoints for browsing products and viewing the size guide. No authentication required.

## Endpoints

| Method | Route                | Description                               |
| ------ | -------------------- | ----------------------------------------- |
| GET    | `/api/products`      | List all enabled products (paginated)     |
| GET    | `/api/products/{id}` | Get product details                       |
| GET    | `/api/sizes`         | Get the full size guide (both dimensions) |

## Requirements

### Product List

Response per item: ID, title, price, primary image URL

### Product Details

Response: ID, title, price, description, available colours (label + swatch image URL), all image URLs (primary + gallery)

> Sizes are universal across all products — do not include size data in the product details response. Consumers call `/api/sizes` once to get the guide.

### Size Guide (`GET /api/sizes`)

The size system is **two-dimensional**. A customer selects one value from each dimension; the combined result is their size (e.g. "A6", "E16")

**Response shape:**

```json
{
  "lengths": [
    { "code": "A", "fullLength": 52, "fullSleeve": 20 },
    ...
  ],
  "widths": [
    { "code": 6, "bustMin": 31, "bustMax": 32, "waistMin": 24, "waistMax": 25, "hipsMin": 35, "hipsMax": 36 },
    ...
  ]
}
```

**Length codes (A–H):** full-length and sleeve measurements in inches.

| Code | Full Length | Full Sleeve |
| ---- | ----------- | ----------- |
| A    | 52          | 20          |
| B    | 54          | 21          |
| C    | 56          | 22          |
| D    | 58          | 23          |
| E    | 60          | 24          |
| F    | 62          | 24          |
| G    | 64          | 25          |
| H    | 66          | 26          |

**Width codes (6–24, even numbers):** bust, waist, and hip measurements as min/max ranges in inches.

| Code | Bust  | Waist | Hips  |
| ---- | ----- | ----- | ----- |
| 6    | 31–32 | 24–25 | 35–36 |
| 8    | 32–33 | 26–27 | 37–38 |
| 10   | 34–35 | 28–29 | 39–40 |
| 12   | 35–36 | 30–31 | 41–42 |
| 14   | 36–37 | 32–33 | 43–44 |
| 16   | 37–38 | 34–35 | 45–46 |
| 18   | 39–40 | 36–37 | 47–48 |
| 20   | 40–41 | 38–39 | 49–50 |
| 22   | 42–43 | 40–41 | 51–52 |
| 24   | 44–45 | 42–43 | 53–54 |

**No individual measurement editing in v1.** The client considers the preset sizes sufficient. Measurement-based customisation is a future consideration (per PRD). At checkout, the customer selects one length code and one width code.

Size data is seeded into the database on first run by `SizeSeeder` and is read-only at runtime.

## Technical Notes

- Only `Enabled = true` products are returned from all public endpoints
- Image URLs are constructed at read time: `{R2:PublicBaseUrl}/{objectKey}` — full URLs are never stored in the database
