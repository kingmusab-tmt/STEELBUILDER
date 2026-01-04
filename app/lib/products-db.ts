// Product database - stored in memory with persistence
import fs from "fs";
import path from "path";

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  specifications: string[];
  applications: string[];
  features: string[];
  createdAt: string;
}

const dataFilePath = path.join(process.cwd(), "data", "products.json");

function ensureDataDirectory() {
  const dir = path.dirname(dataFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function loadProducts(): Product[] {
  try {
    ensureDataDirectory();
    if (fs.existsSync(dataFilePath)) {
      const data = fs.readFileSync(dataFilePath, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    throw error;
  }
  return getDefaultProducts();
}

function saveProducts(products: Product[]): void {
  try {
    ensureDataDirectory();
    fs.writeFileSync(dataFilePath, JSON.stringify(products, null, 2));
  } catch (error) {
    throw error;
  }
}

function getDefaultProducts(): Product[] {
  return [
    {
      id: "qtj4-40",
      name: "QTJ4-40 Block Making Machine",
      category: "Block Molding",
      description:
        "A stationary, semi-automatic concrete block making machine designed for producing various types of blocks and paving stones. Features a vibration system for compact and high-density bricks, manual operation for feeding and mold movement, and a durable Q345 steel structure.",
      image: "/images/t7.jpg",
      specifications: [
        "Power: Around 9.6 kW",
        "Cycle Time: Approximately 35-40 seconds",
        "Main Machine Weight: About 1.5 tons",
        "Overall Dimensions: 1160mm x 1650mm x 2000mm",
        "Pallet Size: 850mm x 450mm x 20mm",
      ],
      applications: [
        "Concrete blocks",
        "Hollow blocks",
        "Solid and cavity bricks",
        "Paving stones (interlocking and curb)",
        "Garden and landscaping products",
      ],
      features: [
        "Stationary & Semi-Automatic operation",
        "Powerful vibration system for fast forming",
        "Molding versatility with interchangeable molds",
        "Robust Q345 steel frame construction",
        "Rubber column cushioning system",
        "JZQ reducer for mold lifting",
        "Wear-resistant guide column sleeves",
        "Heat-treated durable molds",
      ],
      createdAt: new Date().toISOString(),
    },
    {
      id: "stone-crusher-1",
      name: "Industrial Stone Crusher Machine",
      category: "Stone Crushing",
      description:
        "Heavy-duty stone crushing machine designed for aggregate production and material processing. Capable of handling various rock types and sizes with high throughput capacity.",
      image: "/images/t1.jpg",
      specifications: [
        "Capacity: 50-200 tons/hour",
        "Motor Power: 30-75 kW",
        "Feed Size: Up to 800mm",
        "Output Size: Adjustable 5-40mm",
        "Weight: 8-15 tons",
      ],
      applications: [
        "Aggregate production",
        "Granite and limestone crushing",
        "Recycling of construction waste",
        "Road base material",
        "Concrete raw material",
      ],
      features: [
        "Jaw crusher for primary crushing",
        "Impact crusher for secondary crushing",
        "Adjustable discharge opening",
        "Heavy-duty construction",
        "Low maintenance requirements",
        "Energy-efficient operation",
        "Multiple discharge options",
      ],
      createdAt: new Date().toISOString(),
    },
    {
      id: "paving-stone-machine",
      name: "Automatic Paving Stone Machine",
      category: "Paving Stones",
      description:
        "Fully automatic paving stone and interlocking brick production machine with high production capacity and precision molding.",
      image: "/images/t7.jpg",
      specifications: [
        "Production Capacity: 2000-3000 pieces/day",
        "Cycle Time: 20-30 seconds",
        "Power: 15 kW",
        "Machine Weight: 3 tons",
        "Footprint: 2.5m x 1.8m",
      ],
      applications: [
        "Paving stones",
        "Interlocking bricks",
        "Curb stones",
        "Decorative pavers",
        "Landscape design products",
      ],
      features: [
        "Automatic feeding system",
        "Precision vibration molding",
        "High production efficiency",
        "Multiple mold options available",
        "Automatic pallet removal",
        "User-friendly control panel",
        "Quality assurance system",
      ],
      createdAt: new Date().toISOString(),
    },
  ];
}

export { loadProducts, saveProducts, dataFilePath };
