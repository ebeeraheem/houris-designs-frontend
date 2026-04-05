# Cart

Persistent cart that allows authenticated customers to stage multiple items before proceeding to checkout. Each unique combination of product, colour, size, and measurements is a separate line item.

## Endpoints

| Method | Route                      | Description                          |
| ------ | -------------------------- | ------------------------------------ |
| GET    | `/api/cart`                | Get current cart                     |
| POST   | `/api/cart/items`          | Add item to cart                     |
| PUT    | `/api/cart/items/{itemId}` | Update item (measurements, quantity) |
| DELETE | `/api/cart/items/{itemId}` | Remove a single item                 |
| DELETE | `/api/cart`                | Clear the entire cart                |

## Add Item Request

- `ProductId`
- `Colour` — must be one of the product's available colours
- `BaseSize` — one of A–F
- `MeasurementOverrides` — optional; per-field overrides of the base size preset values
- `Quantity` — defaults to 1, must be ≥ 1

## Cart Behaviour

- One cart per authenticated customer; created automatically on the first item add if none exists
- **Same product + same colour + same base size + same measurement overrides**: increment quantity on the existing item rather than creating a duplicate
- **Different colour or different size on the same product**: treated as a separate line item
- Price is **not** stored on cart items — it is captured from the live product price at checkout time
- If a product is disabled between cart add and checkout, the checkout must reject that item and inform the customer

## Cart Response

Each cart item includes: item ID, product ID, product title, primary image URL, current unit price, colour, base size, measurement overrides (if any), quantity, line subtotal.

Cart-level response also includes the cart total.

## Technical Notes

- Cart is associated with the authenticated customer's user ID
- Cart is cleared automatically after a successful checkout (i.e., after payment is confirmed)
- A cart persists between sessions; items are not lost on logout
