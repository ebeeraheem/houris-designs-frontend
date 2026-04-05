# Houris Designs – Product Requirements Document (PRD)

## 1. Overview

**Product Name:** Houris Designs Website

**Purpose:** A customer-facing e-commerce website for ordering custom-made clothing, with an admin backend for managing products, orders, and fulfillment.

Houris Designs sells made-to-measure clothing. Customers do not buy pre-made inventory; instead, they select a design (shown on a model), choose a size, and the clothing is sewn specifically for them.

## 2. Goals & Objectives

### Business Goals

- Enable customers to easily browse, select, and order custom clothing.
- Provide a clean, premium brand experience aligned with fashion/design aesthetics.
- Streamline internal operations for order management and tailoring assignment.
- Support future scale (new products, staff, delivery partners).

### User Goals

- Quickly understand available designs.
- Confidently choose the correct size.
- Seamlessly pay and track orders.
- Manage personal and shipping information.

## 3. Target Users

### Customer

- Individuals browsing and purchasing custom-made clothing.
- May be first-time or returning customers.
- Mobile-first, but desktop supported.

### Admin

- Internal Houris Designs staff.
- Responsible for product management, order fulfillment, and logistics.

## 4. Assumptions & Constraints

- All products are custom-made after purchase.
- No real-time inventory management (sizes are not stock-based).
- Payments must be completed before tailoring begins.
- Delivery is handled by a third-party delivery company.

## 5. User Journeys

### 5.1 Customer Journey – Purchase Flow

1. Customer lands on the homepage.
2. Customer browses featured/latest products.
3. Customer clicks a product.
4. Customer views product details:
   - Images
   - Description (optional)
   - Price
   - Available colours
   - Size guide (inline)
5. Customer selects:
   - Size
   - Colour (if applicable)
6. Customer proceeds to checkout.
7. Customer enters shipping address.
8. Customer completes payment.
9. Order confirmation is shown.

### 5.2 Customer Journey – Account Management

1. Customer logs in.
2. Customer can:
   - View order history
   - View order details
   - Update personal information
   - Update shipping address
   - Change password
3. Customer can reset password via email if forgotten.

### 5.3 Admin Journey – Order Fulfillment

1. Admin logs in.
2. Admin views list of orders:
   - New
   - In progress
   - Completed
3. Admin opens an order.
4. Admin assigns tailoring staff.
5. Admin marks order as sewn/completed.
6. Admin hands over to delivery company.
7. Admin updates order status to shipped/delivered.

## 6. Functional Requirements

### 6.1 Public Pages

#### Homepage

- Hero section (branding, messaging).
- Featured products.
- Product grid/list.
- Navigation to:
  - About
  - Contact
  - Size Guide
  - Login / Account

#### Product Listing Page

- Grid of products.
- Each product shows:
  - Primary image
  - Title
  - Price

#### Product Details Page

- Primary product image.
- Additional images (carousel).
- Product title.
- Price.
- Available colours.
- Size selector.
- Inline size guide.
- Optional description.
- Call-to-action: **Purchase**.

#### Size Guide Page

- Dedicated page explaining measurements.
- Clear instructions on how to measure.
- Consistent with size guide shown on product pages.

#### Checkout Page

- Shipping address form.
- Order summary.
- Payment initiation.

#### Static Pages

- About Us
- Contact Us
- Terms & Conditions
- Privacy Policy

### 6.2 Customer Account Features

#### Authentication

- Sign up.
- Login.
- Forgot password.
- Reset password via email.

#### Account Dashboard

- Order history.
- Order status tracking.
- Personal information management.
- Shipping address management.
- Change password.

### 6.3 Admin Features

#### Admin Authentication

- Admin login.
- Forgot/reset password flow.

#### Admin Dashboard

- Overview of recent orders.
- Order counts by status.

#### Order Management

- View all orders
- View order details:
  - Customer info
  - Selected size
  - Selected colour
  - Shipping address
- Update order status:
  - New
  - In progress
  - Ready for delivery
  - Shipped
  - Delivered

#### Product Management

- Add new products.
- Edit existing products.
- Product fields:
  - Title
  - Price
  - Available colours
  - Primary image
  - Additional images (optional)
  - Description (optional)
- Enable/disable products.

## 7. Future Considerations

- Real-time chat support.
- Customer reviews/ratings.
- Discount codes or promotions.
- Measurement-based sizing instead of fixed sizes.
- Customer profile with saved measurements.
- Notifications (email/SMS) for order updates.
- Analytics dashboard.
