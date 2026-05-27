import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import p1 from "@/assets/property-1.jpg";
import p2 from "@/assets/property-2.jpg";
import p3 from "@/assets/property-3.jpg";

// ---------- Types ----------
export type PropertyStatus = "Published" | "Draft" | "Premium";
export type PropertyType = "Sale" | "Rent";

export type Property = {
  id: string;
  title: string;
  location: string;
  price: string;
  status: PropertyStatus;
  type: PropertyType;
  beds: number;
  baths: number;
  size: string;
  description?: string;
  images: string[]; // urls or base64
  featured?: boolean;
  createdAt: string;
  views: number;
};

export type LeadStatus = "New" | "Contacted" | "Qualified" | "Closed";
export type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  property: string;
  message?: string;
  status: LeadStatus;
  date: string;
};

export type Message = {
  id: string;
  from: string;
  email?: string;
  subject?: string;
  text: string;
  time: string;
  read: boolean;
};

// ---------- Seed data ----------
const seedProperties: Property[] = [
  {
    id: "1",
    title: "Modern Villa in El Poblado",
    location: "Medellín, CO",
    price: "$2,450,000",
    status: "Published",
    type: "Sale",
    beds: 4,
    baths: 3,
    size: "3200 sqft",
    description:
      "A signature modern villa with infinity pool, private garden and curated interiors.",
    images: [p1, p2, p3],
    featured: true,
    createdAt: "2026-05-01",
    views: 1284,
  },
  {
    id: "2",
    title: "Oceanfront Villa Bocagrande",
    location: "Cartagena, CO",
    price: "$3,250,000",
    status: "Premium",
    type: "Sale",
    beds: 5,
    baths: 4,
    size: "4500 sqft",
    description: "Beachfront retreat with panoramic Caribbean views.",
    images: [p2, p1, p3],
    featured: true,
    createdAt: "2026-04-22",
    views: 2105,
  },
  {
    id: "3",
    title: "Sky Penthouse Medellín",
    location: "Medellín, CO",
    price: "$2,150,000",
    status: "Draft",
    type: "Rent",
    beds: 4,
    baths: 3,
    size: "2400 sqft",
    description: "Top-floor penthouse with private rooftop terrace.",
    images: [p3, p1, p2],
    featured: true,
    createdAt: "2026-04-15",
    views: 0,
  },
  {
    id: "4",
    title: "Mountain Retreat Llanogrande",
    location: "Llanogrande, CO",
    price: "$1,950,000",
    status: "Published",
    type: "Sale",
    beds: 3,
    baths: 2,
    size: "1600 sqft",
    description: "Serene mountain home surrounded by nature.",
    images: [p1, p3],
    createdAt: "2026-04-05",
    views: 412,
  },
  {
    id: "5",
    title: "Beachfront Villa",
    location: "Bocagrande, CO",
    price: "$4,250,000",
    status: "Premium",
    type: "Sale",
    beds: 4,
    baths: 5,
    size: "3100 sqft",
    description: "Exclusive beachfront residence.",
    images: [p2, p3],
    createdAt: "2026-03-28",
    views: 980,
  },
];

const seedLeads: Lead[] = [
  { id: "L-001", name: "Sofía Mejía", email: "sofia@example.com", phone: "+57 320 555 0101", property: "Oceanfront Villa", status: "New", date: "2026-05-21" },
  { id: "L-002", name: "James Carter", email: "james@example.com", phone: "+1 305 555 0199", property: "El Poblado Villa", status: "Contacted", date: "2026-05-20" },
  { id: "L-003", name: "Camila Rivera", email: "camila@example.com", phone: "+57 311 555 0143", property: "Sky Penthouse", status: "Qualified", date: "2026-05-18" },
];

const seedMessages: Message[] = [
  { id: "m1", from: "Sofía Mejía", email: "sofia@example.com", subject: "Oceanfront Villa", text: "Interested in scheduling a private tour for Friday.", time: "10:24", read: false },
  { id: "m2", from: "James Carter", email: "james@example.com", subject: "Floor plans", text: "Could you send the floor plans?", time: "09:15", read: false },
  { id: "m3", from: "Camila Rivera", email: "camila@example.com", subject: "Thanks", text: "Thank you — talk tomorrow.", time: "Yesterday", read: true },
];

// ---------- Context ----------
type Ctx = {
  properties: Property[];
  addProperty: (p: Omit<Property, "id" | "createdAt" | "views">) => void;
  updateProperty: (id: string, p: Partial<Property>) => void;
  removeProperty: (id: string) => void;
  getProperty: (id: string) => Property | undefined;

  leads: Lead[];
  addLead: (l: Omit<Lead, "id" | "date" | "status">) => void;
  updateLeadStatus: (id: string, status: LeadStatus) => void;
  removeLead: (id: string) => void;

  messages: Message[];
  addMessage: (m: Omit<Message, "id" | "time" | "read">) => void;
  markMessageRead: (id: string) => void;
  removeMessage: (id: string) => void;
};

const DataContext = createContext<Ctx | null>(null);

const KEY = "vc-estates-data-v1";

function loadFromStorage() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    return JSON.parse(raw) as {
      properties: Property[];
      leads: Lead[];
      messages: Message[];
    };
  } catch {
    return null;
  }
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [properties, setProperties] = useState<Property[]>(seedProperties);
  const [leads, setLeads] = useState<Lead[]>(seedLeads);
  const [messages, setMessages] = useState<Message[]>(seedMessages);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on client only (avoids SSR mismatch)
  useEffect(() => {
    const stored = loadFromStorage();
    if (stored) {
      if (stored.properties) setProperties(stored.properties);
      if (stored.leads) setLeads(stored.leads);
      if (stored.messages) setMessages(stored.messages);
    }
    setHydrated(true);
  }, []);

  // Persist
  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;
    window.localStorage.setItem(
      KEY,
      JSON.stringify({ properties, leads, messages })
    );
  }, [hydrated, properties, leads, messages]);

  const addProperty: Ctx["addProperty"] = useCallback((p) => {
    setProperties((xs) => [
      {
        ...p,
        id: `p-${Date.now()}`,
        createdAt: new Date().toISOString().slice(0, 10),
        views: 0,
      },
      ...xs,
    ]);
  }, []);

  const updateProperty: Ctx["updateProperty"] = useCallback((id, patch) => {
    setProperties((xs) => xs.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  }, []);

  const removeProperty: Ctx["removeProperty"] = useCallback((id) => {
    setProperties((xs) => xs.filter((x) => x.id !== id));
  }, []);

  const getProperty: Ctx["getProperty"] = useCallback(
    (id) => properties.find((p) => p.id === id),
    [properties]
  );

  const addLead: Ctx["addLead"] = useCallback((l) => {
    setLeads((xs) => [
      {
        ...l,
        id: `L-${Date.now().toString().slice(-5)}`,
        status: "New",
        date: new Date().toISOString().slice(0, 10),
      },
      ...xs,
    ]);
  }, []);

  const updateLeadStatus: Ctx["updateLeadStatus"] = useCallback((id, status) => {
    setLeads((xs) => xs.map((l) => (l.id === id ? { ...l, status } : l)));
  }, []);

  const removeLead: Ctx["removeLead"] = useCallback((id) => {
    setLeads((xs) => xs.filter((l) => l.id !== id));
  }, []);

  const addMessage: Ctx["addMessage"] = useCallback((m) => {
    setMessages((xs) => [
      {
        ...m,
        id: `m-${Date.now()}`,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        read: false,
      },
      ...xs,
    ]);
  }, []);

  const markMessageRead: Ctx["markMessageRead"] = useCallback((id) => {
    setMessages((xs) => xs.map((m) => (m.id === id ? { ...m, read: true } : m)));
  }, []);

  const removeMessage: Ctx["removeMessage"] = useCallback((id) => {
    setMessages((xs) => xs.filter((m) => m.id !== id));
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      properties,
      addProperty,
      updateProperty,
      removeProperty,
      getProperty,
      leads,
      addLead,
      updateLeadStatus,
      removeLead,
      messages,
      addMessage,
      markMessageRead,
      removeMessage,
    }),
    [
      properties,
      addProperty,
      updateProperty,
      removeProperty,
      getProperty,
      leads,
      addLead,
      updateLeadStatus,
      removeLead,
      messages,
      addMessage,
      markMessageRead,
      removeMessage,
    ]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used inside <DataProvider>");
  return ctx;
}
