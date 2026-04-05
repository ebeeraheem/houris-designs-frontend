# Customer Authentication

JWT-based authentication for the public API. The access token and refresh token are both stored as HTTP-only cookies.

## Endpoints

| Method | Route                       | Description                                              |
| ------ | --------------------------- | -------------------------------------------------------- |
| POST   | `/api/auth/register`        | Register a new customer account                          |
| POST   | `/api/auth/login`           | Login — access + refresh tokens set as HTTP-only cookies |
| POST   | `/api/auth/logout`          | Revoke refresh token and clear both cookies              |
| POST   | `/api/auth/refresh`         | Issue a new access token using the refresh token cookie  |
| POST   | `/api/auth/forgot-password` | Send password reset email                                |
| POST   | `/api/auth/reset-password`  | Reset password using emailed token                       |

## Request Models

- `RegisterRequest`: `FullName`, `Email`, `Password`
- `LoginRequest`: `Email`, `Password`
- `ForgotPasswordRequest`: `Email`
- `ResetPasswordRequest`: `Email`, `Token`, `NewPassword`

## Token Strategy

### Access Token (JWT)

- Stored in HTTP-only cookie named `access_token`
- Cookie attributes: `HttpOnly`, `Secure`, `SameSite=Strict`
- Payload: user ID, email, role (`Customer`)
- Short-lived: configurable via `Jwt:AccessTokenExpiryMinutes` (recommended: 15 minutes)
- **Not** returned in the response body

### Refresh Token

- Stored in HTTP-only cookie named `refresh_token`
- Cookie attributes: `HttpOnly`, `Secure`, `SameSite=Strict`
- Persisted in the database (`RefreshTokens` table): `Id`, `UserId`, `Token`, `ExpiresAt`, `IsRevoked`, `CreatedAt`
- Long-lived: configurable via `Jwt:RefreshTokenExpiryDays` (recommended: 7 days)
- **Single-use**: on every call to `/api/auth/refresh`, the current refresh token is revoked and a new one is issued (token rotation)
- Revoked on logout — both cookies are cleared

### Refresh Flow

1. Access token expires (frontend receives 401)
2. Frontend calls `POST /api/auth/refresh` (refresh token cookie sent automatically)
3. API validates the refresh token (exists in DB, not revoked, not expired)
4. API issues a new access token and rotates the refresh token
5. Both new cookies are set on the response

## Other Requirements

- Password reset link: `{Frontend:BaseUrl}/reset-password?token={token}&email={email}`
- Do not expose account enumeration — forgot-password always returns 200 regardless of whether the email exists
- All protected customer endpoints use `[Authorize(Roles = Roles.Customer)]`
- All responses follow the result pattern; no exceptions for flow control
