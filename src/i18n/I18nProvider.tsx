import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "es";

const STORAGE_KEY = "vc.lang";

// Spanish dictionary keyed by English source string.
// Any string not present here falls back to the English key.
const es: Record<string, string> = {
  // Navbar
  "Home": "Inicio",
  "Properties": "Propiedades",
  "About": "Nosotros",
  "Contact": "Contacto",
  "Admin": "Admin",
  "CONTACT": "CONTACTO",
  "Menu": "Menú",

  // Hero
  "Private Real Estate · Colombia": "Bienes Raíces Privados · Colombia",
  "Discover": "Descubre",
  "premium": "premium",
  "properties in Colombia": "propiedades en Colombia",
  "A curated portfolio of luxury homes, beachfront villas and elite residences — handpicked for discerning buyers and international investors.":
    "Un portafolio curado de casas de lujo, villas frente al mar y residencias exclusivas — seleccionadas para compradores exigentes e inversionistas internacionales.",
  "Location": "Ubicación",
  "Cartagena, Medellín...": "Cartagena, Medellín...",
  "Property type": "Tipo de propiedad",
  "Villa, Penthouse...": "Villa, Penthouse...",
  "Price range": "Rango de precio",
  "$500K – $5M": "$500K – $5M",
  "FIND NOW": "BUSCAR AHORA",
  "Curated listings": "Listados curados",
  "Years of expertise": "Años de experiencia",
  "In transactions": "En transacciones",

  // Featured Properties
  "Featured Properties": "Propiedades Destacadas",
  "Handpicked residences,": "Residencias seleccionadas,",
  "extraordinary spaces.": "espacios extraordinarios.",
  "VIEW ALL": "VER TODAS",
  "Beds": "Hab.",
  "Baths": "Baños",

  // Premium Banner
  "For International Investors": "Para Inversionistas Internacionales",
  "Premium properties.": "Propiedades premium.",
  "Priced in USD.": "Precios en USD.",
  "Exclusive access to Colombia's most coveted addresses — beachfront estates, mountain retreats and signature residences, available to global investors with full concierge support.":
    "Acceso exclusivo a las direcciones más codiciadas de Colombia — propiedades frente al mar, retiros en la montaña y residencias emblemáticas, disponibles para inversionistas globales con concierge completo.",
  "EXPLORE PREMIUM": "EXPLORAR PREMIUM",
  "BOOK A PRIVATE TOUR": "AGENDAR TOUR PRIVADO",

  // CTA
  "A bridge to your next home": "Un puente hacia tu próximo hogar",
  "Let us guide you to your": "Permítenos guiarte hacia tu",
  "next signature address.": "próxima dirección emblemática.",
  "Our private advisors curate properties tailored to your lifestyle, portfolio and ambitions. Discreet, dedicated, distinguished.":
    "Nuestros asesores privados seleccionan propiedades adaptadas a tu estilo de vida, portafolio y ambiciones. Discretos, dedicados, distinguidos.",
  "SCHEDULE A CONSULTATION": "AGENDAR CONSULTA",
  "BROWSE PROPERTIES": "VER PROPIEDADES",

  // Footer
  "VC Estates — a private real estate agency curating premium properties across Colombia for local and international clients.":
    "VC Estates — una agencia inmobiliaria privada que selecciona propiedades premium en Colombia para clientes locales e internacionales.",
  "Explore": "Explorar",
  "Premium": "Premium",
  "All rights reserved.": "Todos los derechos reservados.",
  "PRIVATE · LUXURY · TRUST": "PRIVADO · LUJO · CONFIANZA",

  // Properties listing
  "Our Collection": "Nuestra Colección",
  "A curated selection of signature residences. Use the filters to refine by location, type and price.":
    "Una selección curada de residencias emblemáticas. Usa los filtros para refinar por ubicación, tipo y precio.",
  "Filters": "Filtros",
  "Clear All": "Limpiar Todo",
  "Property Type": "Tipo de Propiedad",
  "Price Range": "Rango de Precio",
  "Bedrooms": "Habitaciones",
  "Bathrooms": "Baños",
  "Property Status": "Estado de la Propiedad",
  "For Sale (120)": "En Venta (120)",
  "For Rent (45)": "En Alquiler (45)",
  "Premium (28)": "Premium (28)",
  "APPLY FILTERS": "APLICAR FILTROS",
  "All Locations": "Todas las Ubicaciones",
  "Any Type": "Cualquier Tipo",
  "House": "Casa",
  "Apartment": "Apartamento",
  "Penthouse": "Penthouse",
  "Villa": "Villa",
  "Land": "Lote",
  "Any": "Cualquiera",
  "properties found": "propiedades encontradas",
  "Sort by": "Ordenar por",
  "Newest": "Más recientes",
  "Price: Low to High": "Precio: Menor a Mayor",
  "Price: High to Low": "Precio: Mayor a Menor",
  "Most Popular": "Más Populares",
  "For Sale": "En Venta",
  "For Rent": "En Alquiler",

  // About
  "About VC Estates": "Sobre VC Estates",
  "A private agency for": "Una agencia privada para",
  "signature addresses.": "direcciones emblemáticas.",
  "VC Estates is a boutique real estate house. We curate a small, private portfolio of Colombia's most refined homes for clients who value architecture, privacy and a relationship that lasts.":
    "VC Estates es una boutique inmobiliaria. Curamos un pequeño portafolio privado de las casas más refinadas de Colombia para clientes que valoran la arquitectura, la privacidad y una relación que perdura.",
  "Our Story": "Nuestra Historia",
  "Built on trust, refined by": "Construida sobre la confianza, refinada por el",
  "time": "tiempo",
  "Our Values": "Nuestros Valores",
  "What we stand for.": "Lo que nos representa.",
  "Discretion": "Discreción",
  "Every client and every listing is handled with absolute confidentiality.":
    "Cada cliente y cada propiedad se gestiona con absoluta confidencialidad.",
  "Curation": "Curaduría",
  "We don't list everything. We hand-pick properties that meet our standard.":
    "No listamos todo. Seleccionamos a mano propiedades que cumplen nuestro estándar.",
  "Connection": "Conexión",
  "We bridge buyers and homes through a long, human relationship — not a transaction.":
    "Conectamos compradores y hogares a través de una relación humana y duradera — no una transacción.",
  "Global Reach": "Alcance Global",
  "Local roots in Colombia, with clients and partners across the Americas and Europe.":
    "Raíces locales en Colombia, con clientes y aliados en América y Europa.",
  "The Team": "El Equipo",
  "People behind the portfolio.": "Las personas detrás del portafolio.",
  "A small, senior team of advisors with deep market knowledge in Colombia and a global network of clients and partners.":
    "Un equipo pequeño y senior de asesores con profundo conocimiento del mercado en Colombia y una red global de clientes y aliados.",
  "Years curating luxury": "Años curando lujo",
  "Active listings": "Listados activos",
  "Countries served": "Países atendidos",

  // Contact
  "Get in touch": "Hablemos",
  "Let's start a": "Iniciemos una",
  "private conversation.": "conversación privada.",
  "Our private advisors are available for confidential consultations across Bogotá, Medellín and Cartagena.":
    "Nuestros asesores privados están disponibles para consultas confidenciales en Bogotá, Medellín y Cartagena.",
  "Send us a message": "Envíanos un mensaje",
  "Full name": "Nombre completo",
  "Email": "Correo",
  "Phone": "Teléfono",
  "Subject": "Asunto",
  "Message": "Mensaje",
  "Send Message": "Enviar Mensaje",
  "Message sent": "Mensaje enviado",
  "Thank you. One of our advisors will contact you shortly.":
    "Gracias. Uno de nuestros asesores te contactará pronto.",
  "General inquiry": "Consulta general",
  "Buy a property": "Comprar una propiedad",
  "Sell my property": "Vender mi propiedad",
  "Premium portfolio": "Portafolio premium",
  "International client": "Cliente internacional",
  "Press / Media": "Prensa / Medios",
  "Our Offices": "Nuestras Oficinas",
  "Follow us": "Síguenos",
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (s: string) => string };

const I18nContext = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (stored === "en" || stored === "es") setLangState(stored);
    } catch {}
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
      document.documentElement.lang = l;
    } catch {}
  };

  const t = (s: string) => (lang === "es" ? es[s] ?? s : s);

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export function useT() {
  return useI18n().t;
}
