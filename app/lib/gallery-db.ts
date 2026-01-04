// Gallery database - stored in memory with persistence
import fs from "fs";
import path from "path";

export interface GalleryItem {
  id: string;
  title: string;
  image: string;
  createdAt: string;
}

const dataFilePath = path.join(process.cwd(), "data", "gallery.json");

function ensureDataDirectory() {
  const dir = path.dirname(dataFilePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function loadGallery(): GalleryItem[] {
  try {
    ensureDataDirectory();
    if (fs.existsSync(dataFilePath)) {
      const data = fs.readFileSync(dataFilePath, "utf-8");
      return JSON.parse(data);
    }
  } catch (error) {
    throw error;
  }
  return getDefaultGallery();
}

function saveGallery(items: GalleryItem[]): void {
  try {
    ensureDataDirectory();
    fs.writeFileSync(dataFilePath, JSON.stringify(items, null, 2));
  } catch (error) {
    throw error;
  }
}

function getDefaultGallery(): GalleryItem[] {
  return [
    {
      id: "gallery-1",
      title: "Industrial Block Molding Machine in Action",
      image: "/images/t7.jpg",
      createdAt: new Date().toISOString(),
    },
    {
      id: "gallery-2",
      title: "Stone Crusher Manufacturing Facility",
      image: "/images/t1.jpg",
      createdAt: new Date().toISOString(),
    },
    {
      id: "gallery-3",
      title: "Completed Paving Stone Project",
      image: "/images/t7.jpg",
      createdAt: new Date().toISOString(),
    },
    {
      id: "gallery-4",
      title: "Custom Fabrication Workshop",
      image: "/images/t1.jpg",
      createdAt: new Date().toISOString(),
    },
    {
      id: "gallery-5",
      title: "Block Molding Machine Installation",
      image: "/images/t7.jpg",
      createdAt: new Date().toISOString(),
    },
    {
      id: "gallery-6",
      title: "Industrial Equipment Assembly",
      image: "/images/t1.jpg",
      createdAt: new Date().toISOString(),
    },
  ];
}

export { loadGallery, saveGallery, dataFilePath };
