import {
  Home,
  Waves,
  TreePine,
  Flame,
  Trees,
  Wrench,
  Construction,
  Building2,
  Hammer,
  type LucideIcon,
} from "lucide-react";

export interface Service {
  slug: string;
  title: string;
  short: string;
  description: string;
  included: string[];
  ideal: string;
  icon: LucideIcon;
}

export const SERVICES: Service[] = [
  {
    slug: "kerala-farmhouses",
    title: "Kerala-Style Farmhouses",
    short: "Traditional farmhouse design with brick, wood, and tiled roofing.",
    description:
      "End-to-end farmhouse construction inspired by traditional Kerala architecture — sloped tile roofs, exposed brick or laterite walls, generous verandahs, and modern interior comfort. Built for long-term durability and weekend living.",
    included: [
      "Architectural design and site planning",
      "Brick / laterite / stone masonry",
      "Sloped tile roofing with ornamental fascia",
      "Wooden doors, windows, and verandah work",
      "Interior finishing and electrical fit-out",
    ],
    ideal: "Landowners building a weekend or retirement farmhouse retreat.",
    icon: Home,
  },
  {
    slug: "swimming-pools",
    title: "Swimming Pools",
    short: "Custom swimming pool construction with finishing and lighting.",
    description:
      "Concrete swimming pools built to your dimensions with waterproofing, tile finishing, filtration plumbing, and integrated deck lighting. Designed to fit naturally into farmhouse and resort landscapes.",
    included: [
      "Excavation and structural concrete shell",
      "Multi-layer waterproofing",
      "Tile or pebble pool finishing",
      "Filtration, plumbing, and pump room",
      "Pool-side deck and lighting",
    ],
    ideal: "Farmhouses, resorts, and private villas needing a pool installation.",
    icon: Waves,
  },
  {
    slug: "mandwas-gazebos",
    title: "Mandwas & Gazebos",
    short: "Outdoor sitting structures crafted in wood, brick, and tile.",
    description:
      "Open-air mandwas, gazebos, and pergolas for garden sit-outs, dining areas, and pool-side relaxation. Built with seasoned timber, brick pillars, and traditional roofing for shade and visual character.",
    included: [
      "Foundation and brick pillar work",
      "Timber framing and beam work",
      "Tile or thatched roofing",
      "Built-in seating where required",
      "Lighting and electrical points",
    ],
    ideal: "Outdoor dining, garden sit-outs, and pool-side lounge areas.",
    icon: TreePine,
  },
  {
    slug: "fire-camp-areas",
    title: "Fire Camp Areas",
    short: "Fire pit zones with stone seating for outdoor evening gatherings.",
    description:
      "Designed fire pit areas with stone or brick seating circles, paved flooring, and ambient lighting. Perfect for evening gatherings and a focal point in any farmhouse landscape.",
    included: [
      "Fire pit foundation and stone work",
      "Curved seating in stone or brick",
      "Paved or pebble flooring",
      "Drainage and safety planning",
      "Ambient landscape lighting",
    ],
    ideal: "Farmhouses, resorts, and event venues hosting evening gatherings.",
    icon: Flame,
  },
  {
    slug: "landscaping",
    title: "Landscaping & Garden Development",
    short: "Lawn, planting, pathway, and outdoor lighting development.",
    description:
      "Complete outdoor development — lawn laying, ornamental planting, stepping-stone pathways, garden borders, and warm outdoor lighting that turns the property into an evening landscape.",
    included: [
      "Soil preparation and lawn laying",
      "Ornamental and native planting",
      "Stepping-stone and paved pathways",
      "Garden lighting and bollards",
      "Drip irrigation where suitable",
    ],
    ideal: "Any property looking to transform open space into a usable garden.",
    icon: Trees,
  },
  {
    slug: "fabrication",
    title: "Fabrication Works",
    short: "Steel gates, railings, grills, sheds, and structural fabrication.",
    description:
      "In-house metal fabrication for gates, railings, balcony grills, staircases, sheds, and custom structural steel. Welded, finished, and installed on site with attention to durability and finish.",
    included: [
      "Custom gates and main entry frames",
      "Balcony, staircase, and balcony railings",
      "Steel sheds and roofing structures",
      "Grills, window guards, and partitions",
      "Surface treatment and powder coating",
    ],
    ideal: "Homes, farmhouses, offices, and industrial sites needing metalwork.",
    icon: Wrench,
  },
  {
    slug: "roofing",
    title: "Roofing Structures",
    short: "Sloped tile, metal sheet, and traditional roofing systems.",
    description:
      "Roofing solutions ranging from traditional clay-tile sloped roofs to modern metal sheet structures, designed for the local climate with proper insulation and rain handling.",
    included: [
      "Truss design and structural framing",
      "Clay tile or metal sheet roofing",
      "Insulation and waterproof underlay",
      "Gutters and rain water routing",
      "Decorative fascia and ridge work",
    ],
    ideal: "New construction and re-roofing of farmhouses, sheds, and offices.",
    icon: Construction,
  },
  {
    slug: "office-construction",
    title: "Office Construction",
    short: "Functional office buildings with clean modern finishing.",
    description:
      "Ground-up office construction and fit-out. From layout planning to MEP coordination and interior finishing — delivered as a single accountable project.",
    included: [
      "Site planning and structural work",
      "Electrical and plumbing fit-out",
      "Partitioning and false ceiling",
      "Flooring and wall finishing",
      "Front elevation and signage prep",
    ],
    ideal: "Small to mid-size office buildings and commercial workspaces.",
    icon: Building2,
  },
  {
    slug: "renovation",
    title: "Renovation & Site Development",
    short: "Renovate existing structures or develop a raw site end-to-end.",
    description:
      "Renovation of existing homes, farmhouses, and structures, plus full site development — levelling, compound walls, gates, and infrastructure groundwork to make a plot ready for construction.",
    included: [
      "Site survey and feasibility check",
      "Demolition and rework where needed",
      "Levelling and compound walls",
      "Renovation finishing and fit-out",
      "Project coordination and handover",
    ],
    ideal: "Existing properties needing rework, or new plots needing groundwork.",
    icon: Hammer,
  },
];

export const getService = (slug: string) =>
  SERVICES.find((s) => s.slug === slug);
