export type DemoProduct = {
  id: number
  title: string
  price: number
  colour: string
  image: string
  alt: string
  category: string
  description: string
  material: string
  fit: string
  care: string
  origin: string
  images: { src: string; alt: string }[]
  availableColours: { id: string; label: string; swatchClass: string }[]
  availableSizes: string[]
}

export const demoProducts: DemoProduct[] = [
  {
    id: 1,
    title: "The Structured Blazer",
    price: 285,
    colour: "Charcoal",
    image: "/images/products/structured-blazer.jpg",
    alt: "Woman wearing a sharply tailored charcoal blazer.",
    category: "Tailoring",
    description:
      "A precision-cut blazer with architectural shoulders and a nipped waist. Crafted from Italian wool with a soft hand feel. Fully lined, single-button closure.",
    material: "Italian Wool",
    fit: "Structured",
    care: "Dry Clean Only",
    origin: "Made in Italy",
    images: [
      {
        src: "/images/products/structured-blazer.jpg",
        alt: "Front view of the structured blazer.",
      },
      {
        src: "/images/editorial/blue-coat.jpg",
        alt: "Styled tailoring editorial for the structured blazer.",
      },
      {
        src: "/images/editorial/boutique-rack.jpg",
        alt: "Garment rail showing tailoring textures and finishes.",
      },
    ],
    availableColours: [
      { id: "swatch-charcoal", label: "Charcoal", swatchClass: "bg-[#3a3a3a]" },
      { id: "swatch-navy", label: "Navy", swatchClass: "bg-[#1b2a4a]" },
      { id: "swatch-black", label: "Black", swatchClass: "bg-[#1a1a1a]" },
    ],
    availableSizes: ["A10", "A12", "B10", "B12", "C12", "C14"],
  },
  {
    id: 2,
    title: "Draped Midi Dress",
    price: 320,
    colour: "Oxblood",
    image: "/images/products/draped-midi-dress.jpg",
    alt: "Woman wearing a soft draped midi dress for an editorial fashion shoot.",
    category: "Dresses",
    description:
      "Fluid silk crepe dress with bias-cut draping and a subtle cowl neckline. Falls to midi length with a gentle A-line silhouette.",
    material: "Silk Crepe",
    fit: "Relaxed",
    care: "Dry Clean Only",
    origin: "Made in France",
    images: [
      {
        src: "/images/products/draped-midi-dress.jpg",
        alt: "Front view of the draped midi dress.",
      },
      {
        src: "/images/editorial/yellow-look.jpg",
        alt: "Editorial styling reference with a fashion-forward silhouette.",
      },
      {
        src: "/images/editorial/boutique-rack.jpg",
        alt: "Studio garment rail showing refined dress textures.",
      },
    ],
    availableColours: [
      { id: "swatch-oxblood", label: "Oxblood", swatchClass: "bg-brand" },
    ],
    availableSizes: ["A8", "A10", "A12", "B8", "B10", "B12"],
  },
  {
    id: 3,
    title: "Tailored Wide Trousers",
    price: 195,
    colour: "Sand",
    image: "/images/products/tailored-trousers.jpg",
    alt: "Woman styled in tailored wide trousers and a refined neutral look.",
    category: "Trousers",
    description:
      "High-waisted trousers with a wide, flowing leg. Pressed pleats maintain structure through the day. Side pockets, zip closure.",
    material: "Wool Blend",
    fit: "Wide Leg",
    care: "Dry Clean Only",
    origin: "Made in Portugal",
    images: [
      {
        src: "/images/products/tailored-trousers.jpg",
        alt: "Tailored wide trousers in a neutral styled look.",
      },
      {
        src: "/images/products/essential-shirt.jpg",
        alt: "Companion styling image showing the trousers with shirting.",
      },
      {
        src: "/images/editorial/boutique-rack.jpg",
        alt: "Studio rack displaying coordinated separates.",
      },
    ],
    availableColours: [
      { id: "swatch-sand", label: "Sand", swatchClass: "bg-[#c2b280]" },
      { id: "swatch-charcoal", label: "Charcoal", swatchClass: "bg-[#3a3a3a]" },
    ],
    availableSizes: ["A10", "A12", "A14", "B12", "B14", "C14"],
  },
  {
    id: 4,
    title: "The Essential Shirt",
    price: 165,
    colour: "Ivory",
    image: "/images/products/essential-shirt.jpg",
    alt: "Woman wearing an essential ivory shirt with a clean minimalist silhouette.",
    category: "Shirts",
    description:
      "Crisp cotton poplin shirt with a relaxed fit. Point collar, concealed button placket, and curved hem. The foundation piece.",
    material: "Cotton Poplin",
    fit: "Relaxed",
    care: "Machine Wash Cold",
    origin: "Made in Portugal",
    images: [
      {
        src: "/images/products/essential-shirt.jpg",
        alt: "Front view of the essential ivory shirt.",
      },
      {
        src: "/images/products/tailored-trousers.jpg",
        alt: "The essential shirt paired with tailored separates.",
      },
      {
        src: "/images/editorial/boutique-rack.jpg",
        alt: "Studio rack with shirting and light neutral garments.",
      },
    ],
    availableColours: [
      { id: "swatch-ivory", label: "Ivory", swatchClass: "bg-[#f5f5dc]" },
      {
        id: "swatch-light-blue",
        label: "Light Blue",
        swatchClass: "bg-[#b8d4e3]",
      },
      { id: "swatch-navy", label: "Navy", swatchClass: "bg-[#1b2a4a]" },
    ],
    availableSizes: ["A8", "A10", "A12", "B8", "B10", "B12"],
  },
  {
    id: 5,
    title: "Wrap Coat",
    price: 410,
    colour: "Navy",
    image: "/images/editorial/blue-coat.jpg",
    alt: "Model in a structured wrap coat standing in an architectural setting.",
    category: "Outerwear",
    description:
      "Double-faced wool wrap coat with a self-tie belt. Unlined for a lighter weight that still delivers warmth. Midi length.",
    material: "Double-Faced Wool",
    fit: "Wrap",
    care: "Dry Clean Only",
    origin: "Made in Italy",
    images: [
      {
        src: "/images/editorial/blue-coat.jpg",
        alt: "Front view of the wrap coat in an architectural setting.",
      },
      {
        src: "/images/products/structured-blazer.jpg",
        alt: "Tailoring detail that complements the wrap coat styling.",
      },
      {
        src: "/images/editorial/boutique-rack.jpg",
        alt: "Studio rack with outerwear textures and drape.",
      },
    ],
    availableColours: [
      { id: "swatch-navy", label: "Navy", swatchClass: "bg-[#1b2a4a]" },
      { id: "swatch-camel", label: "Camel", swatchClass: "bg-[#c19a6b]" },
    ],
    availableSizes: ["B12", "B14", "C14", "C16", "D14", "D16"],
  },
  {
    id: 6,
    title: "Cropped Jacket",
    price: 275,
    colour: "Olive",
    image: "/images/products/cropped-jacket.jpg",
    alt: "Model in a cropped jacket styled for a contemporary fashion portrait.",
    category: "Outerwear",
    description:
      "Boxy cropped jacket in washed cotton canvas. Patch pockets, snap closure, and a standing collar. Relaxed, utilitarian feel.",
    material: "Cotton Canvas",
    fit: "Boxy",
    care: "Machine Wash Cold",
    origin: "Made in USA",
    images: [
      {
        src: "/images/products/cropped-jacket.jpg",
        alt: "Front view of the cropped jacket.",
      },
      {
        src: "/images/editorial/yellow-look.jpg",
        alt: "Editorial styling reference with a cropped silhouette.",
      },
      {
        src: "/images/editorial/boutique-rack.jpg",
        alt: "Studio rack showing jacket textures and construction.",
      },
    ],
    availableColours: [
      { id: "swatch-olive", label: "Olive", swatchClass: "bg-[#556b2f]" },
      { id: "swatch-stone", label: "Stone", swatchClass: "bg-[#b8b0a8]" },
    ],
    availableSizes: ["A8", "A10", "A12", "B8", "B10", "B12"],
  },
]

export const colourSwatches: Record<string, string> = {
  Charcoal: "bg-[#3a3a3a]",
  Oxblood: "bg-brand",
  Sand: "bg-[#c2b280]",
  Ivory: "bg-[#fffff0]",
  Navy: "bg-[#1b2a4a]",
  Olive: "bg-[#556b2f]",
}

export function getDemoProductById(id: string) {
  return demoProducts.find((product) => String(product.id) === id) ?? null
}

export function getRelatedDemoProducts(currentId: string, count = 4) {
  return demoProducts
    .filter((product) => String(product.id) !== currentId)
    .slice(0, count)
}
