import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "hero-images.json");

interface HeroImage {
  id: string;
  url: string;
  title: string;
  order: number;
  createdAt: string;
}

const DEFAULT_HERO_IMAGES: HeroImage[] = [
  {
    id: "1",
    url: "/images/t7.jpg",
    title: "Hero Image 1",
    order: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    url: "/images/t8.jpg",
    title: "Hero Image 2",
    order: 2,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    url: "/images/t9.jpg",
    title: "Hero Image 3",
    order: 3,
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    url: "/images/t10.jpg",
    title: "Hero Image 4",
    order: 4,
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    url: "/images/t11.jpg",
    title: "Hero Image 5",
    order: 5,
    createdAt: new Date().toISOString(),
  },
  {
    id: "6",
    url: "/images/t12.jpg",
    title: "Hero Image 6",
    order: 6,
    createdAt: new Date().toISOString(),
  },
  {
    id: "7",
    url: "/images/t13.jpg",
    title: "Hero Image 7",
    order: 7,
    createdAt: new Date().toISOString(),
  },
  {
    id: "8",
    url: "/images/t14.jpg",
    title: "Hero Image 8",
    order: 8,
    createdAt: new Date().toISOString(),
  },
  {
    id: "9",
    url: "/images/t15.jpg",
    title: "Hero Image 9",
    order: 9,
    createdAt: new Date().toISOString(),
  },
  {
    id: "10",
    url: "/images/t16.jpg",
    title: "Hero Image 10",
    order: 10,
    createdAt: new Date().toISOString(),
  },
  {
    id: "11",
    url: "/images/t17.jpg",
    title: "Hero Image 11",
    order: 11,
    createdAt: new Date().toISOString(),
  },
];

export function loadHeroImages(): HeroImage[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch {
    // Fall back to default
  }
  saveHeroImages(DEFAULT_HERO_IMAGES);
  return DEFAULT_HERO_IMAGES;
}

export function saveHeroImages(images: HeroImage[]): void {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(images, null, 2));
}

export function addHeroImage(
  image: Omit<HeroImage, "id" | "createdAt">
): HeroImage {
  const images = loadHeroImages();
  const newImage: HeroImage = {
    ...image,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  images.unshift(newImage);
  saveHeroImages(images);
  return newImage;
}

export function updateHeroImage(
  id: string,
  updates: Partial<HeroImage>
): HeroImage | null {
  const images = loadHeroImages();
  const index = images.findIndex((img) => img.id === id);
  if (index === -1) return null;

  images[index] = { ...images[index], ...updates };
  saveHeroImages(images);
  return images[index];
}

export function deleteHeroImage(id: string): boolean {
  const images = loadHeroImages();
  const filtered = images.filter((img) => img.id !== id);
  if (filtered.length === images.length) return false;

  saveHeroImages(filtered);
  return true;
}
