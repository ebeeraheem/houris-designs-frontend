# Customer Account Management

Authenticated API endpoints for customers to manage their profile and personal settings. All endpoints require a valid auth cookie except `GET /api/account/email/confirm`.

## Endpoints

| Method | Route                        | Description                                              |
| ------ | ---------------------------- | -------------------------------------------------------- |
| GET    | `/api/account/profile`       | Get profile                                              |
| PUT    | `/api/account/profile`       | Update full name                                         |
| POST   | `/api/account/email`         | Request email change (sends verification to new address) |
| GET    | `/api/account/email/confirm` | Confirm email change via opaque code                     |
| GET    | `/api/account/address`       | Get saved shipping address                               |
| PUT    | `/api/account/address`       | Create or replace shipping address                       |
| PUT    | `/api/account/password`      | Change password                                          |

## Requirements

### Profile

- Readable fields: full name, email
- Full name is editable via `PUT /api/account/profile`
- Email is changed via a dedicated verification flow (see below)

### Change Email Flow

1. Customer POSTs to `/api/account/email` with `NewEmail`
2. A verification link is sent to the **new** email address: `{Frontend:BaseUrl}/confirm-email-change?code={opaqueCode}`
3. `opaqueCode` is a Data Protection-encrypted payload containing the user ID, new email, and Identity token — no PII is visible in the URL
4. The current email remains active until the customer confirms
5. Customer follows the link → frontend calls `GET /api/account/email/confirm?code={opaqueCode}`
6. API decrypts the code, validates the token, and updates the email

### Shipping Address

Fields: recipient name, address line 1, address line 2 (optional), city, state/region, country, postal code

- One saved address per customer (`CustomerShippingAddresses` table, unique index on `CustomerId`)
- `PUT /api/account/address` creates the address if it does not exist, otherwise replaces it
- At checkout the customer may use this saved address or supply a different one

### Change Password

- Request: `CurrentPassword`, `NewPassword`, `ConfirmNewPassword`
- Current password must be validated before the change is applied
