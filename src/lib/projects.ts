import farmhouseTwin from "@/assets/farmhouse-twin-night.jpg";
import landscapePool from "@/assets/landscape-pool-night.jpg";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";
import p5 from "@/assets/project-5.jpg";
import p6 from "@/assets/project-6.jpg";
import p7 from "@/assets/project-7.jpg";
import p8 from "@/assets/project-8.jpg";
import p9 from "@/assets/project-9.jpg";

export type ProjectCategory =
  | "Farmhouses"
  | "Swimming Pools"
  | "Landscaping"
  | "Mandwa / Outdoor Seating"
  | "Fire Camp Areas"
  | "Fabrication / Roofing"
  | "Office Construction";

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  image: string;
  alt: string;
  serviceSlug: string;
}

export const PROJECTS: Project[] = [
  {
    id: "twin-farmhouse-night",
    title: "Twin Kerala-Style Farmhouse",
    description:
      "Two adjacent farmhouses with traditional sloped tile roofs, exposed brick walls, and warm verandah lighting.",
    category: "Farmhouses",
    image: farmhouseTwin,
    alt: "Twin Kerala-style farmhouses at night with brick walls and tiled roofs",
    serviceSlug: "kerala-farmhouses",
  },
  {
    id: "landscaped-pool-night",
    title: "Landscape & Pool Setting",
    description:
      "Full landscape development with lawn, planted borders, pathway lighting, and pool integration.",
    category: "Landscaping",
    image: landscapePool,
    alt: "Landscaped garden with swimming pool, lawn, and pathway lights at night",
    serviceSlug: "landscaping",
  },
  {
    id: "p1",
    title: "Farmhouse Exterior",
    description: "Traditional farmhouse exterior with brick masonry and tiled roofing.",
    category: "Farmhouses",
    image: p1,
    alt: "Farmhouse exterior with traditional brick and tile work",
    serviceSlug: "kerala-farmhouses",
  },
  {
    id: "p2",
    title: "Outdoor Living Area",
    description: "Open outdoor living area integrated with the farmhouse layout.",
    category: "Mandwa / Outdoor Seating",
    image: p2,
    alt: "Outdoor sitting area built into a farmhouse landscape",
    serviceSlug: "mandwas-gazebos",
  },
  {
    id: "p3",
    title: "Swimming Pool Build",
    description: "Concrete pool construction with deck finishing and lighting.",
    category: "Swimming Pools",
    image: p3,
    alt: "Swimming pool surrounded by deck and landscape lighting",
    serviceSlug: "swimming-pools",
  },
  {
    id: "p4",
    title: "Garden Pathway",
    description: "Stepping-stone pathway through landscaped garden borders.",
    category: "Landscaping",
    image: p4,
    alt: "Stepping-stone pathway through a planted garden",
    serviceSlug: "landscaping",
  },
  {
    id: "p5",
    title: "Fire Camp Setting",
    description: "Stone fire pit area with surrounding seating for evening use.",
    category: "Fire Camp Areas",
    image: p5,
    alt: "Outdoor fire camp area with stone seating",
    serviceSlug: "fire-camp-areas",
  },
  {
    id: "p6",
    title: "Roofing & Fabrication",
    description: "Sloped roofing structure and metal fabrication detailing.",
    category: "Fabrication / Roofing",
    image: p6,
    alt: "Sloped roofing with metal fabrication details",
    serviceSlug: "fabrication",
  },
  {
    id: "p7",
    title: "Mandwa Construction",
    description: "Open mandwa structure built with brick pillars and timber roof.",
    category: "Mandwa / Outdoor Seating",
    image: p7,
    alt: "Mandwa structure with brick pillars and timber roofing",
    serviceSlug: "mandwas-gazebos",
  },
  {
    id: "p8",
    title: "Pool & Garden Combo",
    description: "Integrated pool and garden development for a private property.",
    category: "Swimming Pools",
    image: p8,
    alt: "Pool integrated into a private garden",
    serviceSlug: "swimming-pools",
  },
  {
    id: "p9",
    title: "Site Lighting",
    description: "Pathway and ambient lighting installed across the property.",
    category: "Landscaping",
    image: p9,
    alt: "Property pathway with ambient lighting",
    serviceSlug: "landscaping",
  },
];

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "Farmhouses",
  "Swimming Pools",
  "Landscaping",
  "Mandwa / Outdoor Seating",
  "Fire Camp Areas",
  "Fabrication / Roofing",
  "Office Construction",
];
