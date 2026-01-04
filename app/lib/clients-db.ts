import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "clients.json");

interface Client {
  id: string;
  name: string;
  logo: string;
  order: number;
  createdAt: string;
}

const DEFAULT_CLIENTS: Client[] = [
  {
    id: "1",
    name: "Client 1",
    logo: "/images/t1.jpg",
    order: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Client 2",
    logo: "/images/t2.jpg",
    order: 2,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Client 3",
    logo: "/images/t3.jpg",
    order: 3,
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Client 4",
    logo: "/images/t4.jpg",
    order: 4,
    createdAt: new Date().toISOString(),
  },
];

export function loadClients(): Client[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const data = fs.readFileSync(DATA_FILE, "utf-8");
      return JSON.parse(data);
    }
  } catch {
    // Fall back to default
  }
  saveClients(DEFAULT_CLIENTS);
  return DEFAULT_CLIENTS;
}

export function saveClients(clients: Client[]): void {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(clients, null, 2));
}

export function addClient(client: Omit<Client, "id" | "createdAt">): Client {
  const clients = loadClients();
  const newClient: Client = {
    ...client,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  clients.unshift(newClient);
  saveClients(clients);
  return newClient;
}

export function updateClient(
  id: string,
  updates: Partial<Client>
): Client | null {
  const clients = loadClients();
  const index = clients.findIndex((c) => c.id === id);
  if (index === -1) return null;

  clients[index] = { ...clients[index], ...updates };
  saveClients(clients);
  return clients[index];
}

export function deleteClient(id: string): boolean {
  const clients = loadClients();
  const filtered = clients.filter((c) => c.id !== id);
  if (filtered.length === clients.length) return false;

  saveClients(filtered);
  return true;
}
