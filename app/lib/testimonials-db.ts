import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "testimonials.json");

interface Testimonial {
  id: string;
  name: string;
  company: string;
  message: string;
  rating: number;
  image: string;
  order: number;
  createdAt: string;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    name: "John Doe",
    company: "ABC Manufacturing Ltd",
    message:
      "Steel Builders delivered our block molding machine on time and within budget. Their technical support team is exceptional.",
    rating: 5,
    image: "/images/t1.jpg",
    order: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Jane Smith",
    company: "XYZ Industries",
    message:
      "The quality of their fabrication work is outstanding. They have become our trusted partner for all industrial machinery needs.",
    rating: 5,
    image: "/images/t2.jpg",
    order: 2,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Michael Johnson",
    company: "Prime Construction Co.",
    message:
      "Excellent craftsmanship and attention to detail. We have completed multiple projects with Steel Builders with great results.",
    rating: 5,
    image: "/images/t3.jpg",
    order: 3,
    createdAt: new Date().toISOString(),
  },
];

export function loadTestimonials(): Testimonial[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch {
    // Fall back to default
  }
  saveTestimonials(DEFAULT_TESTIMONIALS);
  return DEFAULT_TESTIMONIALS;
}

export function saveTestimonials(testimonials: Testimonial[]): void {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(testimonials, null, 2));
}

export function addTestimonial(
  testimonial: Omit<Testimonial, "id" | "createdAt">
): Testimonial {
  const testimonials = loadTestimonials();
  const newTestimonial: Testimonial = {
    ...testimonial,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  testimonials.unshift(newTestimonial);
  saveTestimonials(testimonials);
  return newTestimonial;
}

export function updateTestimonial(
  id: string,
  updates: Partial<Testimonial>
): Testimonial | null {
  const testimonials = loadTestimonials();
  const index = testimonials.findIndex((t) => t.id === id);
  if (index === -1) return null;

  testimonials[index] = { ...testimonials[index], ...updates };
  saveTestimonials(testimonials);
  return testimonials[index];
}

export function deleteTestimonial(id: string): boolean {
  const testimonials = loadTestimonials();
  const filtered = testimonials.filter((t) => t.id !== id);
  if (filtered.length === testimonials.length) return false;

  saveTestimonials(filtered);
  return true;
}
