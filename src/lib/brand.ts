/**
 * BRAND CONFIGURATION
 * --------------------
 * Edit this file to update contact details and WhatsApp number
 * across the entire website. Nothing else needs to change.
 */

export const BRAND = {
  name: "Harihara Constructions & Fabrication",
  shortName: "Harihara",
  tagline: "Traditional Spaces. Modern Strength.",
  description:
    "Harihara Constructions & Fabrication designs and builds Kerala-style farmhouses, swimming pools, mandwas, fire camp areas, landscape spaces, fabrication structures, and office construction projects with a balance of traditional beauty and modern durability.",

  // ⚠️ REPLACE THESE WITH YOUR REAL DETAILS
  phone: "+91 87907 05975",
  phoneRaw: "+918790705975",
  whatsapp: "+91 87907 05975",
  whatsappRaw: "918790705975", // digits only, no +, no spaces — used in wa.me links
  email: "contact@harihara.in",
  address: "Plot No. 76, Road No. 9, Pashamylaram, Isnapur, Patancheru, Hyderabad, Telangana 502307",

  whatsappMessage:
    "Hello, Harihara Constructions & Fabrication, I am interested in your construction services. Please contact me.",
} as const;

export const waLink = (msg: string = BRAND.whatsappMessage) =>
  `https://wa.me/${BRAND.whatsappRaw}?text=${encodeURIComponent(msg)}`;

export const telLink = () => `tel:${BRAND.phoneRaw}`;
export const mailLink = (subject?: string) =>
  `mailto:${BRAND.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
