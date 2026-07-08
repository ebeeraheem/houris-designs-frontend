export interface LegalSection {
  title: string
  paragraphs?: string[]
  bullets?: string[]
}

export interface LegalDocument {
  eyebrow: string
  title: string
  description: string
  lastUpdated: string
  sections: LegalSection[]
}

export const termsDocument: LegalDocument = {
  eyebrow: "Terms & Conditions",
  title: "Terms & Conditions",
  description:
    "The terms that govern access to the Houris Designs website, made-to-order purchases, payments, production, delivery, and customer responsibilities.",
  lastUpdated: "July 8, 2026",
  sections: [
    {
      title: "1. Introduction",
      paragraphs: [
        "Welcome to the official website of HOURIS DESIGNS LIMITED. By accessing or using this website, creating an account, placing an order, or using our services, you agree to these Terms & Conditions.",
        "If you do not agree with these Terms & Conditions, please do not use the website or place an order through it.",
      ],
    },
    {
      title: "2. Business Information",
      paragraphs: [
        "HOURIS DESIGNS LIMITED is a made-to-order fashion brand rooted in Kano, Nigeria.",
        "Registered address: NO 65 RIJIYAR ZAKI QTRS UNGOGO KANO.",
        "For enquiries, contact info@hourisdesigns.com. For customer support, contact support@hourisdesigns.com.",
      ],
    },
    {
      title: "3. Eligibility and Use of the Website",
      paragraphs: [
        "This website and our services are available only to persons aged 18 years or older. By accessing or using the website, creating an account, or placing an order, you confirm that you are at least 18 years old and have the legal capacity to enter into a binding transaction. If you are under 18, you may not use this website or our services.",
        "You agree not to misuse the website, attempt fraud, interfere with the website's operation, copy or exploit website content for commercial purposes without permission, or provide false information when creating an account or placing an order.",
      ],
    },
    {
      title: "4. Products and Made-to-Order Production",
      paragraphs: [
        "Houris Designs products are strictly made to order. We do not sell pre-made inventory through this website.",
        "Product images, colours, fabrics, finishes, and design details are presented as accurately as possible, but may vary slightly because of screen settings, photography, fabric availability, production realities, and the handmade nature of fashion production.",
      ],
    },
    {
      title: "5. Sizing and Customer Responsibilities",
      paragraphs: [
        "Our sizing system uses length and width codes to help customers choose a better fit. Customers are responsible for reviewing the size guide carefully and selecting the correct size combination before placing an order.",
        "The final fit of a garment can also be affected by the product style, fabric, cut, and the customer's chosen size. If you are unsure about sizing, contact us before placing an order.",
      ],
    },
    {
      title: "6. Orders, Payments, and Acceptance",
      paragraphs: [
        "Orders are placed through the website and payment is processed through Paystack or any other payment processor we may make available in the future. Houris Designs does not collect or store card details. We only receive payment references, payment status, and related order-confirmation information from the payment processor.",
        "A Paystack payment confirmation means that payment processing has occurred. It does not, by itself, mean that Houris Designs has accepted the order. We may review an order before accepting or rejecting it.",
        "If we reject an order after payment, we will begin the refund process as soon as our payment processor releases the funds to us or otherwise enables the refund.",
      ],
    },
    {
      title: "7. Production Timeline",
      paragraphs: [
        "Production begins after payment. We aim to complete most orders in less than two weeks, and many orders may be completed before then.",
        "Some orders may take longer because of fabric availability, design complexity, order volume, quality-control checks, public holidays, logistics constraints, or events outside our reasonable control. If a delay occurs on our side, we will notify you by email and provide an updated expected completion date where possible.",
      ],
    },
    {
      title: "8. Returns and Refunds",
      paragraphs: [
        "Because every product is made to order, refunds are not available after production starts, except where Houris Designs is clearly at fault.",
        "If there is a clear production error, material defect, or significant misalignment with the accepted order specification caused by Houris Designs, contact support@hourisdesigns.com promptly with your order details and supporting photos. Depending on the issue, we may repair, adjust, remake, replace, or refund the affected item in line with applicable law and the facts of the case.",
        "Refunds are not available for change of mind, incorrect size selection by the customer, incorrect delivery details provided by the customer, or issues caused by misuse, alteration, or improper care after delivery.",
      ],
    },
    {
      title: "9. Shipping and Delivery",
      paragraphs: [
        "We ship globally. Regional and national deliveries may be handled by local delivery companies or riders. International deliveries may be handled by established international courier providers.",
        "Once an order is completed, packaged, and handed over to a courier, delivery timelines and in-transit handling are managed by the courier. We will provide reasonable support with courier information and delivery follow-up, but delays, customs processing, import charges, and courier handling issues may be outside our direct control.",
        "Customers are responsible for providing complete and accurate shipping information and for paying any customs duties, import taxes, or destination charges that may apply to international deliveries.",
      ],
    },
    {
      title: "10. Intellectual Property",
      paragraphs: [
        "The Houris Designs name, logo, product designs, images, written content, website content, graphics, and other brand materials are owned by or licensed to HOURIS DESIGNS LIMITED and are protected by applicable intellectual property laws.",
        "You may not copy, reproduce, modify, distribute, publish, sell, or commercially exploit our content without written permission.",
      ],
    },
    {
      title: "11. Limitation of Liability",
      paragraphs: [
        "To the fullest extent permitted by applicable law, Houris Designs will not be liable for indirect, incidental, special, or consequential losses arising from use of the website or services.",
        "Nothing in these Terms & Conditions excludes liability that cannot be excluded under applicable law, including liability arising from our clear fault, fraud, or wilful misconduct.",
      ],
    },
    {
      title: "12. Privacy",
      paragraphs: [
        "Our Privacy Policy explains how we collect, use, share, and protect personal information. Please read it before creating an account or placing an order.",
      ],
    },
    {
      title: "13. Changes to These Terms",
      paragraphs: [
        "We may update these Terms & Conditions from time to time. The latest version will be posted on this page with an updated date. Continued use of the website after an update means you accept the updated terms.",
      ],
    },
    {
      title: "14. Contact",
      paragraphs: [
        "For questions about these Terms & Conditions, contact info@hourisdesigns.com or support@hourisdesigns.com.",
      ],
    },
  ],
}

export const privacyDocument: LegalDocument = {
  eyebrow: "Privacy Policy",
  title: "Privacy Policy",
  description:
    "How Houris Designs collects, uses, shares, protects, and retains personal information for accounts, orders, contact messages, payment references, and delivery.",
  lastUpdated: "July 8, 2026",
  sections: [
    {
      title: "1. Introduction",
      paragraphs: [
        "HOURIS DESIGNS LIMITED respects your privacy and is committed to protecting your personal information.",
        "This Privacy Policy explains how we collect, use, disclose, retain, and protect personal information when you visit our website, create an account, place an order, contact us, or use our services.",
      ],
    },
    {
      title: "2. Who We Are",
      paragraphs: [
        "HOURIS DESIGNS LIMITED is a made-to-order fashion brand rooted in Kano, Nigeria.",
        "Registered address: NO 65 RIJIYAR ZAKI QTRS UNGOGO KANO.",
        "For privacy questions, contact info@hourisdesigns.com or support@hourisdesigns.com.",
      ],
    },
    {
      title: "3. Information We Collect",
      paragraphs: [
        "We collect only the information needed to operate our website, provide made-to-order fashion services, communicate with customers, process orders, and arrange delivery.",
      ],
      bullets: [
        "Account and profile information, such as your name, email address, password credentials, and account preferences.",
        "Order information, such as selected products, colours, length-and-width size codes, prices, order status, and order history.",
        "Shipping information, such as recipient name, delivery address, city, state or region, country, and postal code.",
        "Payment-related information, such as Paystack payment references, payment status, transaction metadata, and order-confirmation details. We do not collect or store card details.",
        "Contact information and messages submitted through the contact form, including name, email address, subject, message, form-loaded timestamp, and anti-spam honeypot data.",
        "Technical information needed to keep the website secure and functional, such as browser/device information, IP address, request logs, authentication/session cookies, and error logs.",
      ],
    },
    {
      title: "4. How We Use Information",
      bullets: [
        "To create and manage customer accounts.",
        "To process made-to-order purchases and communicate order progress.",
        "To verify Paystack payment references and payment status.",
        "To produce garments according to selected product, colour, and size details.",
        "To arrange regional, national, or international delivery.",
        "To respond to customer support, contact form, privacy, and legal enquiries.",
        "To prevent fraud, abuse, spam, security incidents, and unauthorized access.",
        "To comply with legal, accounting, tax, regulatory, dispute-resolution, and recordkeeping obligations.",
      ],
    },
    {
      title: "5. Cookies and Tracking",
      paragraphs: [
        "We use cookies and similar technologies that are necessary for website functionality, authentication, account sessions, cart or checkout flows, security, and service operation.",
        "We do not currently use analytics tracking, advertising pixels, or behavioural advertising technologies. If this changes, we will update this Privacy Policy and provide any required notices or choices.",
      ],
    },
    {
      title: "6. Sharing of Information",
      paragraphs: [
        "We do not sell personal information. We share information only where needed to provide our services, protect our business, comply with law, or complete a transaction requested by the customer.",
      ],
      bullets: [
        "Payment processors such as Paystack, for payment processing and verification.",
        "Courier, delivery, and logistics partners, for regional, national, and international shipping.",
        "Technology, hosting, email, security, and support providers that help operate the website and services.",
        "Professional advisers, regulators, courts, law-enforcement bodies, or government authorities where required or permitted by law.",
      ],
    },
    {
      title: "7. International Processing and Delivery",
      paragraphs: [
        "Because we ship globally, personal information may be shared with courier or logistics partners outside Nigeria where necessary to deliver an order. Those partners may process delivery information in the destination country or in transit countries.",
      ],
    },
    {
      title: "8. Data Retention",
      paragraphs: [
        "We retain personal information for as long as reasonably necessary to provide services, manage accounts, fulfil orders, resolve disputes, comply with legal and tax obligations, prevent fraud, and maintain business records.",
        "When information is no longer needed, we will delete, anonymize, or securely retain it only where required by law or legitimate business purposes.",
      ],
    },
    {
      title: "9. Data Security",
      paragraphs: [
        "We use reasonable administrative, technical, and organizational safeguards to protect personal information. No online service can guarantee absolute security, but we work to reduce unauthorized access, misuse, loss, alteration, or disclosure.",
      ],
    },
    {
      title: "10. Your Privacy Rights",
      paragraphs: [
        "Subject to applicable law, including Nigerian data protection law, you may have rights to be informed, access your personal information, request correction, object to or restrict processing, request deletion, request data portability, withdraw consent where processing is based on consent, and lodge a complaint with the appropriate supervisory authority.",
        "To exercise privacy rights, contact info@hourisdesigns.com or support@hourisdesigns.com. We may need to verify your identity before responding.",
      ],
    },
    {
      title: "11. Age Restriction",
      paragraphs: [
        "This website and our services are intended solely for persons aged 18 years or older. We do not knowingly collect personal information from anyone under 18.",
        "If we become aware that personal information has been collected from a person under 18, we will delete it. If you believe a person under 18 has provided us with personal information, contact info@hourisdesigns.com.",
      ],
    },
    {
      title: "12. Third-Party Links and Services",
      paragraphs: [
        "Our website may link to third-party services such as payment processors or courier platforms. We are not responsible for the privacy practices of third-party websites or services. Please review their privacy notices when using them.",
      ],
    },
    {
      title: "13. Updates to This Policy",
      paragraphs: [
        "We may update this Privacy Policy from time to time. The latest version will be posted on this page with an updated date. Continued use of the website after an update means the updated policy applies.",
      ],
    },
    {
      title: "14. Contact",
      paragraphs: [
        "For privacy questions or requests, contact info@hourisdesigns.com or support@hourisdesigns.com.",
      ],
    },
  ],
}
