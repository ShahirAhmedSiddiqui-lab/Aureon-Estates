import React, { useState, useEffect } from "react";
import { 
  Home, 
  Shield, 
  Zap, 
  Thermometer, 
  Volume2, 
  Lock, 
  Unlock, 
  Wifi, 
  Tv, 
  Calendar, 
  ArrowUpRight, 
  Sliders, 
  Star, 
  Facebook, 
  Instagram, 
  Linkedin, 
  Phone, 
  Mail, 
  Search, 
  MessageSquare, 
  Check, 
  Sparkles,
  Layers,
  ArrowRight,
  Eye,
  Minimize2,
  Clock,
  User,
  MapPin,
  Compass,
  AlertTriangle,
  Globe,
  Award
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import agentDoninImage from "./assets/images/agent_donin_1780928914779.png";
import agentEricaImage from "./assets/images/agent_erica_1780928859944.png";
import agentTianaImage from "./assets/images/agent_tiana_1780928895528.png";
import cliffsideVillaImage from "./assets/images/cliffside_villa_excellence_1780928836714.png";
import heroVillaImage from "./assets/images/leon_home_hero_1780928812820.png";
import beachfrontVillaImage from "./assets/images/luxury_beachfront_villa_1780928961788.png";
import modernFamilyHomeImage from "./assets/images/modern_family_home_1780928937324.png";

// Types
interface Agent {
  name: string;
  role: string;
  image: string;
  bio: string;
  phone: string;
  email: string;
}

interface Property {
  id: string;
  title: string;
  price: string;
  numericPrice: number;
  category: "coastal" | "forest" | "desert";
  image: string;
  location: string;
  beds: number;
  baths: number;
  sqft: number;
  description: string;
  smartFeatures: string[];
}

interface Inquiry {
  id: string;
  agentName: string;
  propertyName: string;
  clientName: string;
  clientEmail: string;
  date: string;
  notes: string;
  timestamp: string;
}

export default function App() {
  // --- STATE ---
  const [selectedPropertyFilter, setSelectedPropertyFilter] = useState<"all" | "coastal" | "forest" | "desert">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPropertyForModal, setSelectedPropertyForModal] = useState<Property | null>(null);
  
  // Modals / Overlays
  const [selectedAgentForBooking, setSelectedAgentForBooking] = useState<Agent | null>(null);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isSuccessNotification, setIsSuccessNotification] = useState<string | null>(null);

  // Smart Home Simulator Interactive Controls
  const [ambientLighting, setAmbientLighting] = useState<"sunset" | "cyan" | "forest" | "arctic">("sunset");
  const [blindsOpen, setBlindsOpen] = useState(true);
  const [securityArmed, setSecurityArmed] = useState(true);
  const [soundLevel, setSoundLevel] = useState(40);
  const [poolTemp, setPoolTemp] = useState(28);

  // Inquiries Logs (persisted via localStorage)
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [showInquiriesDrawer, setShowInquiriesDrawer] = useState(false);

  // Form Booking Inputs
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingNotes, setBookingNotes] = useState("");

  // Contact Form Inputs
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMsg, setContactMsg] = useState("");

  // Interactive Hover Highlight for Smart Technology Hotspots
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  // Load inquiries
  useEffect(() => {
    const saved = localStorage.getItem("aureon_estates_inquiries");
    if (saved) {
      try {
        setInquiries(JSON.parse(saved));
      } catch (e) {
        console.error("Error reading saved inquiries", e);
      }
    }
  }, []);

  const triggerSuccessToast = (message: string) => {
    setIsSuccessNotification(message);
    setTimeout(() => {
      setIsSuccessNotification(null);
    }, 4500);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingName || !bookingEmail || !bookingDate) {
      alert("Please fill in all requested fields");
      return;
    }

    const newInquiry: Inquiry = {
      id: "inq-" + Date.now(),
      agentName: selectedAgentForBooking ? selectedAgentForBooking.name : "General Agent Desk",
      propertyName: selectedPropertyForModal ? selectedPropertyForModal.title : "Smart Luxury Consultations",
      clientName: bookingName,
      clientEmail: bookingEmail,
      date: bookingDate,
      notes: bookingNotes || "Direct smart-access VIP consultation request.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [newInquiry, ...inquiries];
    setInquiries(updated);
    localStorage.setItem("aureon_estates_inquiries", JSON.stringify(updated));

    // Reset fields & close modals
    setBookingName("");
    setBookingEmail("");
    setBookingDate("");
    setBookingNotes("");
    setSelectedAgentForBooking(null);
    setSelectedPropertyForModal(null);

    triggerSuccessToast("✨ Booking request sent! Our specialist will reach out within 2 hours.");
  };

  const handleQuickContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMsg) {
      alert("Please fill in your name, email, and message.");
      return;
    }

    const newInquiry: Inquiry = {
      id: "inq-" + Date.now(),
      agentName: "General Receptionist Team",
      propertyName: "Immediate Online Inquiry",
      clientName: contactName,
      clientEmail: contactEmail,
      date: "ASAP",
      notes: contactMsg,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [newInquiry, ...inquiries];
    setInquiries(updated);
    localStorage.setItem("aureon_estates_inquiries", JSON.stringify(updated));

    setContactName("");
    setContactEmail("");
    setContactMsg("");

    triggerSuccessToast("🚀 message sent! Your smart representative is logging on.");
  };

  const clearInquiries = () => {
    setInquiries([]);
    localStorage.removeItem("aureon_estates_inquiries");
    triggerSuccessToast("Logs cleared successfully.");
  };

  // --- DATA SOURCES ---
  const agents: Agent[] = [
    {
      name: "Erica Dias",
      role: "Head Manager",
      image: agentEricaImage,
      bio: "With 12+ years in ultra-luxury real estate across Indonesia and Singapore, Erica specializes in architectural curation and premium smart integrations.",
      phone: "+62 319-246-1015",
      email: "erica.dias@aureonestates.luxury"
    },
    {
      name: "Tiana Korsgaard",
      role: "Sales Marketing",
      image: agentTianaImage,
      bio: "Tiana is an expert in global luxury listings. He connects elite investors with next-generation smart architecture and autonomous estates.",
      phone: "+62 319-246-1018",
      email: "korsgaard.tiana@aureonestates.luxury"
    },
    {
      name: "Tiana Donin",
      role: "Property Agent",
      image: agentDoninImage,
      bio: "Donin is passionate about biophilic futuristic designs. She guides prospects through personalized tech installations and solar-efficient layouts.",
      phone: "+62 319-246-1021",
      email: "donin.tiana@aureonestates.luxury"
    }
  ];

  const properties: Property[] = [
    {
      id: "prop-modern-forest",
      title: "Modern Family Home",
      price: "$4,500,000",
      numericPrice: 4500000,
      category: "forest",
      image: modernFamilyHomeImage,
      location: "Ubud Sanctuary, Bali",
      beds: 5,
      baths: 6,
      sqft: 8400,
      description: "An elegant blend of masterfully treated local teakwood and reinforced volcanic concrete. Situated inside a lush, quiet jungle canopy, this residence features fully automated organic swimming water micro-filtration.",
      smartFeatures: ["Autonomous Micro-Climate Controls", "14kW Rooftop Solar Shiptiles", "Voice-Activated Light Sequences", "HEPA Biomass Air Guard", "Smart Geothermal Heated Pool"]
    },
    {
      id: "prop-luxury-beachfront",
      title: "Luxury Beachfront Villa",
      price: "$3,620,000",
      numericPrice: 3620000,
      category: "coastal",
      image: beachfrontVillaImage,
      location: "Canggu Cliffs, Bali",
      beds: 4,
      baths: 4,
      sqft: 6700,
      description: "A gorgeous, minimalist concrete home overlooking pristine tropical white sands. Floor-to-ceiling smart glass panels tint automatically in response to sunlight intensity, mitigating radiant heat seamlessly.",
      smartFeatures: ["Dynamic Auto-Tinting Glass Panels", "Sonos Multi-Room Sound Dispersion", "Ultra-Silent Ducted Air Curtains", "Smart Lock Retina Scanners", "Underwater Pool Acoustics"]
    },
    {
      id: "prop-desert-vista",
      title: "Desert Vista Dome",
      price: "5,900,000",
      numericPrice: 5900000,
      category: "desert",
      image: heroVillaImage,
      location: "Desert Crest Skyline",
      beds: 6,
      baths: 7,
      sqft: 11200,
      description: "Our crowning achievement. Built directly on a granite ledge, this breathtaking curved villa integrates smart home automation into every architectural node. An iconic century-old olive tree stands in the central rock garden.",
      smartFeatures: ["LIDAR-guided Security Matrix", "Whole-Home Water Reclamation Loop", "Tesla Powerwall 3 Ingress", "Intelligent Kinetic Shades", "Automated Ambient Sunset Lighting"]
    }
  ];

  // Filter listings
  const filteredProperties = properties.filter(prop => {
    const matchesCategory = selectedPropertyFilter === "all" || prop.category === selectedPropertyFilter;
    const matchesSearch = prop.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prop.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prop.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getLightingClass = () => {
    switch (ambientLighting) {
      case "sunset": return "bg-amber-500/15 text-amber-500 shadow-[0_0_20px_rgba(245,158,11,0.2)]";
      case "cyan": return "bg-cyan-500/15 text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.2)]";
      case "forest": return "bg-emerald-500/15 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]";
      case "arctic": return "bg-blue-400/15 text-blue-300 shadow-[0_0_20px_rgba(96,165,250,0.2)]";
    }
  };

  const getLightingStyleName = () => {
    switch (ambientLighting) {
      case "sunset": return "Warm Dusk Ambiance (2700K)";
      case "cyan": return "Cyberglass Horizon Cyan";
      case "forest": return "Biophilic Forest Calm Aura";
      case "arctic": return "Eco-Cool Intelligent Daylight";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased overflow-x-hidden selection:bg-neutral-800 selection:text-white">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {isSuccessNotification && (
          <motion.div 
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 text-slate-900 bg-white shadow-2xl rounded-full border border-neutral-200 py-3 px-6 flex items-center gap-3"
            id="toast-notification"
          >
            <div className="w-6 h-6 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xs">✓</div>
            <span className="font-medium text-sm text-neutral-800">{isSuccessNotification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Header Area With Majestic Backdrop */}
      <section className="relative w-full min-h-screen flex flex-col justify-between text-white p-4 md:p-8 overflow-hidden bg-neutral-950">
        
        {/* Background Image with Elegant Dark Overlays */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroVillaImage} 
            alt="AUREON Estates Luxury Villa Backdrop" 
            className="w-full h-full object-cover object-center opacity-85 scale-102 transition-transform duration-1000 ease-out" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-900/30 to-neutral-950/70 z-10" />
        </div>

        {/* --- NAVIGATION LAYER (Sticky-Vibe Overlay) --- */}
        <header className="relative z-20 w-full flex items-center justify-between py-4 px-3 md:px-6 bg-white/10 backdrop-blur-md rounded-full border border-white/10 max-w-7xl mx-auto" id="main-navigation">
          {/* Logo Section */}
          <a href="#" className="flex items-center gap-2 group">
            <span className="w-8 h-8 rounded-full bg-white text-neutral-950 flex items-center justify-center font-serif font-black text-lg shadow-md transition-transform group-hover:rotate-12 duration-300">A</span>
            <span className="font-serif font-semibold text-lg md:text-xl tracking-widest text-white uppercase">AUREON Estates</span>
          </a>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-black/20 p-1 rounded-full border border-white/5">
            <a href="#" className="px-4 py-2 text-xs md:text-xs font-medium uppercase tracking-wider rounded-full bg-white text-neutral-950 transition-all">Home</a>
            <a href="#agents" className="px-4 py-2 text-xs md:text-xs font-medium uppercase tracking-wider rounded-full text-white/85 hover:text-white hover:bg-white/10 transition-all">Agents</a>
            <a href="#simulator" className="px-4 py-2 text-xs md:text-xs font-medium uppercase tracking-wider rounded-full text-white/85 hover:text-white hover:bg-white/10 transition-all flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Demo
            </a>
            <a href="#properties" className="px-4 py-2 text-xs md:text-xs font-medium uppercase tracking-wider rounded-full text-white/85 hover:text-white hover:bg-white/10 transition-all">Properties</a>
            <a href="#inquire" className="px-4 py-2 text-xs md:text-xs font-medium uppercase tracking-wider rounded-full text-white/85 hover:text-white hover:bg-white/10 transition-all">About Us</a>
          </nav>

          {/* Interactive Right Contact Control */}
          <div className="flex items-center gap-3">
            {/* Quick Inquiry Logs button */}
            {inquiries.length > 0 && (
              <button 
                onClick={() => setShowInquiriesDrawer(true)}
                className="relative px-3 py-2 text-xs uppercase tracking-wider font-semibold rounded-full bg-emerald-500/80 backdrop-blur hover:bg-emerald-600 text-white transition-all flex items-center gap-1.5"
                title="View active inquiries"
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Logs ({inquiries.length})</span>
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-400 rounded-full animate-ping"></span>
              </button>
            )}

            <a 
              href="tel:+623192461011" 
              className="px-4 py-2 text-xs md:text-sm font-semibold tracking-wide rounded-full border border-white/30 bg-white/5 backdrop-blur hover:bg-white hover:text-neutral-950 transition-all duration-300 flex items-center gap-2 shadow-lg"
              id="header-phone-badge"
            >
              <Phone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">+62 3192461011</span>
              <span className="sm:hidden">Call</span>
            </a>
          </div>
        </header>

        {/* --- MAIN HERO BODY (Center Lettering and Badges) --- */}
        <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center max-w-5xl mx-auto w-full pt-16 pb-12">
          
          {/* Majestic Hero Headline Name - Overlap Display style */}
          <div className="relative my-4 select-none">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="font-serif text-[13vw] sm:text-[10vw] md:text-[11vw] font-black tracking-tighter leading-none text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)] uppercase"
            >
              AUREON Estates
            </motion.h1>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-48 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          </div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xs sm:text-sm md:text-lg text-white/80 max-w-2xl font-light leading-relaxed mt-2 tracking-wide font-display"
          >
            Autonomous cliffside retreats. Seamless atmospheric climate loops. Ultra-luxurious biophilic living structures designed for the future.
          </motion.p>

          {/* Discover More Smooth-Scroll Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8"
          >
            <a 
              href="#properties"
              className="inline-flex items-center gap-3 bg-white text-neutral-950 font-semibold uppercase tracking-wider text-[11px] md:text-xs px-8 py-4 rounded-full shadow-[0_12px_36px_rgba(0,0,0,0.35)] hover:bg-neutral-950 hover:text-white hover:scale-105 hover:shadow-white/10 active:scale-95 transition-all duration-300 group"
              id="hero-discover-btn"
            >
              <span>Discover More</span>
              <div className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center group-hover:bg-white group-hover:text-neutral-900 transition-colors">
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </div>
            </a>
          </motion.div>
        </div>

        {/* --- HERO FOOTER LAYER (Numbers Stat Cards) --- */}
        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-white/15">
          {/* Quick statement */}
          <div className="hidden lg:block text-left max-w-xs text-white/50 text-[10px] uppercase tracking-wider leading-relaxed">
            Technology Meets Luxury Real Estate. <br />
            Architecturally Redefined Security Matrices.
          </div>

          {/* Stats Overlay Blocks Grid */}
          <div className="w-full md:w-auto flex flex-wrap md:flex-nowrap justify-center gap-4 lg:gap-8">
            {/* Stat item 1 */}
            <div className="bg-neutral-905/35 backdrop-blur-md p-4 rounded-2xl border border-white/5 hover:border-white/15 transition-all w-[180px] sm:w-[220px] text-center md:text-left">
              <div className="font-serif text-2xl lg:text-3xl font-bold tracking-tight text-white mb-1">5.9K+</div>
              <div className="text-[10px] text-white/60 leading-relaxed uppercase tracking-wider">
                Successfully delivering innovative projects globally
              </div>
            </div>

            {/* Stat item 2 */}
            <div className="bg-neutral-905/35 backdrop-blur-md p-4 rounded-2xl border border-white/5 hover:border-white/15 transition-all w-[180px] sm:w-[220px] text-center md:text-left">
              <div className="font-serif text-2xl lg:text-3xl font-bold tracking-tight text-white mb-1">10K+</div>
              <div className="text-[10px] text-white/60 leading-relaxed uppercase tracking-wider">
                Award-winning smart residences active
              </div>
            </div>
          </div>

          {/* Quick statement 2 */}
          <div className="text-center md:text-right text-white/40 text-[10px] tracking-widest uppercase">
            Designed for Futuristic Living © {new Date().getFullYear()}
          </div>
        </div>
      </section>


      {/* Section 2: Experience Excellence In Real Estate */}
      <section className="py-20 px-4 md:px-12 bg-white max-w-7xl mx-auto">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 block mb-3">CURATED MASTERPIECES</span>
          <h2 className="font-serif text-3xl md:text-5xl text-neutral-900 leading-tight">
            Experience Excellence<br />In Real Estate
          </h2>
        </motion.div>

        {/* 3-Column Layout exactly like design */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* ----- Left Column ----- */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-4 flex flex-col justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <div>
              <h3 className="font-display text-xl font-bold text-neutral-900 tracking-tight leading-snug mb-4">
                Your Trusted Partner in Finding the Perfect Home
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed mb-6 font-sans">
                At AUREON Estates, we believe that buying or selling an elite home should be an inspiring and completely stress-free experience. Our properties feature seamlessly integrated state-of-the-art smart systems, organic pools, and off-grid climate loops.
              </p>
              
              <button 
                onClick={() => setIsAboutModalOpen(true)}
                className="px-6 py-2.5 rounded-full bg-neutral-950 text-white font-medium text-xs uppercase tracking-wider hover:bg-neutral-800 transition-all"
                id="about-us-btn"
              >
                About Us
              </button>
            </div>

            {/* Our Partners block */}
            <div className="mt-12 pt-6 border-t border-neutral-200">
              <div className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-3">Our Partners:</div>
              <div className="flex flex-wrap gap-4 items-center text-neutral-500 font-medium text-xs">
                <span className="flex items-center gap-1 hover:text-neutral-900 transition-colors">
                  <Layers className="w-3.5 h-3.5 text-neutral-400" /> Playmoth
                </span>
                <span className="flex items-center gap-1 hover:text-neutral-900 transition-colors">
                  <Shield className="w-3.5 h-3.5 text-neutral-400" /> Boltshift
                </span>
                <span className="flex items-center gap-1 hover:text-neutral-900 transition-colors">
                  <Zap className="w-3.5 h-3.5 text-neutral-400" /> Quotient
                </span>
              </div>
            </div>
          </motion.div>

          {/* ----- Middle Column (Interactive Vertical Image) ----- */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-4 relative overflow-hidden rounded-3xl group shadow-xl"
          >
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-70" />
            <img 
              src={cliffsideVillaImage} 
              alt="Luxury Cliffside Modern Home" 
              className="w-full h-full min-h-[460px] object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              referrerPolicy="no-referrer"
            />

            {/* Interactive Device Spots Overlay */}
            <div className="absolute inset-0 z-20 flex flex-col justify-between p-6">
              <div className="flex justify-end">
                <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-[9px] uppercase tracking-widest px-2.5 py-1.5 rounded-full flex items-center gap-1.5 shadow">
                  <span className="w-2 h-2 rounded-full bg-red-400 animate-ping"></span>
                  Sensors Online
                </span>
              </div>

              {/* Dynamic device highlight triggers */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-white/50 tracking-widest uppercase block">ESTATE TECH MATRIX</span>
                <h4 className="font-serif text-2xl font-bold text-white tracking-wide">Canggu Clifftop Elite</h4>
                <p className="text-xs text-white/80 leading-relaxed font-light">
                  Touch on localized dynamic smart nodes below to preview embedded architectural parameters.
                </p>

                {/* Hotspot buttons selection panel */}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-white/10">
                  <button 
                    onMouseEnter={() => setActiveHotspot("insulation")}
                    onMouseLeave={() => setActiveHotspot(null)}
                    className={`py-1.5 px-2 rounded-lg text-[9px] uppercase font-bold tracking-wider text-left transition-colors flex items-center gap-1 ${activeHotspot === "insulation" ? "bg-white text-neutral-950" : "bg-black/35 text-white/90 border border-white/10"}`}
                  >
                    <Shield className="w-3 h-3" />
                    <span>Smart Insulation</span>
                  </button>

                  <button 
                    onMouseEnter={() => setActiveHotspot("harvesting")}
                    onMouseLeave={() => setActiveHotspot(null)}
                    className={`py-1.5 px-2 rounded-lg text-[9px] uppercase font-bold tracking-wider text-left transition-colors flex items-center gap-1 ${activeHotspot === "harvesting" ? "bg-white text-neutral-950" : "bg-black/35 text-white/90 border border-white/10"}`}
                  >
                    <Zap className="w-3 h-3" />
                    <span>Solar Micro-Grid</span>
                  </button>
                </div>

                {/* Dynamic hotspot information text render */}
                <AnimatePresence mode="wait">
                  {activeHotspot && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="mt-2 text-xs bg-white text-neutral-950 p-2.5 rounded-xl shadow-lg font-sans flex items-start gap-1.5"
                    >
                      {activeHotspot === "insulation" ? (
                        <div>
                          <strong>🌡️ Acoustic/Thermal Insulation:</strong> High-density silica aero-gels are layered directly into structural concrete, blocking 98% of heat transfer and reducing power demand by 45%.
                        </div>
                      ) : (
                        <div>
                          <strong>☀️ Micro-Grid Collectors:</strong> Nano-crystalline smart cladding panel lines on west-facing concrete store energy in integrated wall vaults, powering the resort for 72 hours gridless.
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* ----- Right Column ----- */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="lg:col-span-4 flex flex-col justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="space-y-8">
              {/* Point 1 */}
              <div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xs shrink-0 aspect-square">✓</div>
                  <div>
                    <h4 className="font-display font-bold text-sm md:text-md text-neutral-900 tracking-tight mb-1">Expert Guidance</h4>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      Our certified smart-living agents provide deep consulting regarding local title laws and advanced home automation systems.
                    </p>
                  </div>
                </div>
              </div>

              {/* Point 2 */}
              <div className="pt-6 border-t border-slate-200">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-xs shrink-0 aspect-square">✓</div>
                  <div>
                    <h4 className="font-display font-bold text-sm md:text-md text-neutral-900 tracking-tight mb-1">Wide Property Selection</h4>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      Explore our fully vetted list of properties spanning coastal cliff structures, high-altitude rainforest suites, and subterranean modern estates.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews overlay block from design */}
            <div className="mt-12 pt-6 border-t border-neutral-200">
              <div className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold mb-3">Customer Trust:</div>
              <div className="flex items-center gap-4 bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                
                {/* Micro avatar stack */}
                <div className="flex -space-x-3 overflow-hidden">
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://picsum.photos/seed/customer1/100/100" alt="Customer avatar" referrerPolicy="no-referrer" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://picsum.photos/seed/customer2/100/100" alt="Customer avatar" referrerPolicy="no-referrer" />
                  <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://picsum.photos/seed/customer3/100/100" alt="Customer avatar" referrerPolicy="no-referrer" />
                  <div className="h-8 w-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[9px] font-bold ring-2 ring-white uppercase">10k+</div>
                </div>

                <div>
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-sm text-neutral-900">4.9</span>
                    <div className="flex text-amber-400">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <Star className="w-3 h-3 fill-amber-400" />
                      <Star className="w-3 h-3 fill-amber-400" />
                      <Star className="w-3 h-3 fill-amber-400" />
                      <Star className="w-3 h-3 fill-amber-400" />
                    </div>
                  </div>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-semibold">Customer Ratings</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>


      {/* EXCLUSIVE EXTRA FEATURE: Interactive Live Smart Home Control Simulator Section */}
      <section className="bg-slate-900 text-white py-20 px-4 md:px-12 border-y border-slate-800" id="simulator">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Information & Description Column */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 space-y-6"
          >
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-500/10 py-1.5 px-3.5 rounded-full border border-emerald-500/25 inline-block">
              INTELLIGENT LIVING DEMO
            </span>
            <h3 className="font-serif text-3xl md:text-5xl text-white leading-tight">
              Test-Drive Our Smart Home System
            </h3>
            <p className="text-sm text-slate-350 leading-relaxed font-sans">
              Every curated **AUREON Estates** property comes standard with our award-winning smart integration technology. Try modifying the environmental values on the controller to see the real-time feedback simulator respond!
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400 shadow-md">
                  <Wifi className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-xs uppercase tracking-wider text-slate-400">Connectivity</p>
                  <p className="text-[11px] text-emerald-300 font-semibold uppercase">Zigbee 3.0 Mesh</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-emerald-400 shadow-md">
                  <Shield className="w-4 h-4 animate-pulse" />
                </div>
                <div>
                  <p className="font-bold text-xs uppercase tracking-wider text-slate-400">Security Vault</p>
                  <p className="text-[11px] text-emerald-300 font-semibold uppercase">AES-256 GCM Armed</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Interactive Control Dashboard Panel */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-7 bg-slate-950 p-6 sm:p-8 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden"
          >
            
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-3xl rounded-full pointer-events-none" />

            <div className="flex items-center justify-between pb-6 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                <div>
                  <h4 className="text-sm font-semibold tracking-wide uppercase">Interactive Control Center</h4>
                  <p className="text-[10px] text-slate-400 font-mono tracking-wider">Device ID: AUREON-V1-DOME</p>
                </div>
              </div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 bg-slate-900 border border-slate-800 py-1 px-2.5 rounded-md">VISTADOME #3</span>
            </div>

            {/* Controlled Live Simulator Screen Area */}
            <div className="my-6 p-4 rounded-2xl bg-slate-900/45 border border-slate-800 overflow-hidden relative">
              <div className="absolute inset-0 bg-radial-gradient(from_center,_rgba(0,0,0,0)_60%,_rgba(0,0,0,0.85)) pointer-events-none z-10" />
              
              {/* Backdrop image that glows based on lighting selection */}
              <div className="relative h-44 rounded-xl overflow-hidden shadow-inner flex items-center justify-center">
                <div className="absolute inset-0 bg-neutral-900">
                  <img 
                    src={heroVillaImage} 
                    alt="Scenic simulator room visualization backdrop" 
                    className="w-full h-full object-cover object-center opacity-60 mix-blend-lighten scale-102"
                    referrerPolicy="no-referrer"
                  />
                  {/* Dynamic Color filter overlay */}
                  <div className={`absolute inset-0 transition-all duration-700 mix-blend-color ${
                    ambientLighting === "sunset" ? "bg-amber-500/35" : 
                    ambientLighting === "cyan" ? "bg-cyan-500/40" : 
                    ambientLighting === "forest" ? "bg-emerald-600/35" : 
                    "bg-blue-400/40"
                  }`} />
                </div>

                {/* Overlaid smart values HUD */}
                <div className="relative z-20 text-center space-y-2 p-4 bg-slate-950/80 rounded-2xl backdrop-blur-md border border-slate-800 py-3 px-6 shadow-xl leading-relaxed">
                  <p className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">Live Simulated HUD State</p>
                  
                  <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-left text-xs font-sans">
                    <p className="text-slate-400">Ambient Color:</p>
                    <p className="font-semibold text-white text-right truncate">{getLightingStyleName()}</p>

                    <p className="text-slate-400">Motorized Shades:</p>
                    <p className={`font-semibold text-right ${blindsOpen ? "text-emerald-400" : "text-amber-500"}`}>{blindsOpen ? "Open (100%)" : "Retracted (0%)"}</p>

                    <p className="text-slate-400">Security Armed:</p>
                    <p className={`font-semibold text-right ${securityArmed ? "text-red-400" : "text-gray-400"}`}>{securityArmed ? "Armed Node-Lock" : "Unarmed (Local Walk)"}</p>

                    <p className="text-slate-400">Pool Hot-Temp:</p>
                    <p className="font-semibold text-right text-sky-300">{poolTemp}°C</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid of Control Switches */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              
              {/* Lighting Mood selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Tv className="w-3.5 h-3.5" />
                  <span>Ambient Lighting Colors</span>
                </label>
                <div className="grid grid-cols-4 gap-2">
                  <button 
                    onClick={() => setAmbientLighting("sunset")}
                    className={`py-2 rounded-xl text-[10px] font-bold uppercase transition-all flex flex-col items-center gap-1 ${ambientLighting === "sunset" ? "bg-amber-500 text-slate-950 shadow-[0_0_12px_rgba(245,158,11,0.4)]" : "bg-slate-900 hover:bg-slate-800 text-amber-500 border border-slate-800"}`}
                  >
                    <span>🌅</span>
                    <span>Sunset</span>
                  </button>

                  <button 
                    onClick={() => setAmbientLighting("cyan")}
                    className={`py-2 rounded-xl text-[10px] font-bold uppercase transition-all flex flex-col items-center gap-1 ${ambientLighting === "cyan" ? "bg-cyan-400 text-slate-950 shadow-[0_0_12px_rgba(34,211,238,0.4)]" : "bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800"}`}
                  >
                    <span>💻</span>
                    <span>Cyan</span>
                  </button>

                  <button 
                    onClick={() => setAmbientLighting("forest")}
                    className={`py-2 rounded-xl text-[10px] font-bold uppercase transition-all flex flex-col items-center gap-1 ${ambientLighting === "forest" ? "bg-emerald-500 text-slate-950 shadow-[0_0_12px_rgba(16,185,129,0.4)]" : "bg-slate-900 hover:bg-slate-800 text-emerald-400 border border-slate-800"}`}
                  >
                    <span>🌲</span>
                    <span>Jungle</span>
                  </button>

                  <button 
                    onClick={() => setAmbientLighting("arctic")}
                    className={`py-2 rounded-xl text-[10px] font-bold uppercase transition-all flex flex-col items-center gap-1 ${ambientLighting === "arctic" ? "bg-blue-400 text-slate-950 shadow-[0_0_12px_rgba(96,165,250,0.4)]" : "bg-slate-900 hover:bg-slate-800 text-blue-400 border border-slate-800"}`}
                  >
                    <span>❄️</span>
                    <span>Arctic</span>
                  </button>
                </div>
              </div>

              {/* Security Switch */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Estates Security Active</span>
                </label>
                <button 
                  onClick={() => setSecurityArmed(!securityArmed)}
                  className={`w-full py-3.5 px-4 rounded-xl font-bold uppercase text-xs tracking-wider transition-all flex items-center justify-between ${securityArmed ? "bg-red-500/20 text-red-400 border border-red-500/40" : "bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800"}`}
                >
                  <span className="flex items-center gap-2">
                    {securityArmed ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                    <span>{securityArmed ? "AES Encryption Active" : "Unarmed / Maintenance"}</span>
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-950 border border-white/5">{securityArmed ? "ON" : "OFF"}</span>
                </button>
              </div>

              {/* Temperature Slider */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-widest">
                  <span className="flex items-center gap-2">
                    <Thermometer className="w-3.5 h-3.5" />
                    <span>Geothermal Temperature</span>
                  </span>
                  <span className="font-mono text-emerald-400">{poolTemp}°C</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-bold text-slate-500 uppercase font-mono">18°C</span>
                  <input 
                    type="range" 
                    min="18" 
                    max="36" 
                    value={poolTemp} 
                    onChange={(e) => setPoolTemp(Number(e.target.value))}
                    className="w-full accent-emerald-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <span className="text-[10px] font-bold text-slate-500 uppercase font-mono">36°C</span>
                </div>
              </div>

              {/* Automatic Blinds Toggle */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Atmospheric Window Blinds</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setBlindsOpen(true)}
                    className={`py-2 px-3.5 text-xs font-semibold rounded-xl uppercase transition-all ${blindsOpen ? "bg-white text-slate-950 shadow-md font-bold" : "bg-slate-900 text-slate-400 hover:bg-slate-800"}`}
                  >
                    Extend Shades
                  </button>
                  <button 
                    onClick={() => setBlindsOpen(false)}
                    className={`py-2 px-3.5 text-xs font-semibold rounded-xl uppercase transition-all ${!blindsOpen ? "bg-white text-slate-950 shadow-md font-bold" : "bg-slate-900 text-slate-400 hover:bg-slate-800"}`}
                  >
                    Retract Shades
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>


      {/* Section 3: Meet Our Expert Team */}
      <section className="bg-neutral-950 text-white py-24 px-4 md:px-12" id="agents">
        <div className="max-w-7xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16"
          >
            
            {/* Display Headers Grid Left */}
            <div className="lg:col-span-8 space-y-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#94A3B8] block">VERIFIED ESTATE RECOGNITIONS</span>
              <h2 className="font-serif text-3xl md:text-5xl text-white tracking-wide">
                Meet Our Expert Team
              </h2>
              <p className="text-slate-400 max-w-xl text-sm leading-relaxed font-sans">
                Our meticulously curated collection of elite properties is supported exclusively by highly seasoned real-living professionals who understand localized property laws and automatic system upgrades.
              </p>
            </div>

            {/* Top Right Call action */}
            <div className="lg:col-span-4 lg:text-right flex items-center lg:justify-end gap-3">
              <button 
                onClick={() => {
                  setSelectedAgentForBooking(agents[0]);
                }}
                className="px-6 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur hover:bg-white hover:text-neutral-950 font-bold text-xs uppercase tracking-wider transition-all duration-300"
              >
                Schedule consultation
              </button>
            </div>
          </motion.div>

          {/* Three Agent Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {agents.map((agent, agentIdx) => (
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: agentIdx * 0.15 }}
                key={agent.name} 
                className="bg-neutral-900/50 rounded-3xl p-6 border border-neutral-800/80 hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group flex flex-col justify-between"
              >
                <div>
                   {/* Portrait Container */}
                   <div className="aspect-square w-full rounded-2xl overflow-hidden mb-6 relative">
                     <img 
                       src={agent.image} 
                       alt={agent.name} 
                       className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                       referrerPolicy="no-referrer"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                       <p className="text-xs text-white/90 italic font-sans">{agent.bio}</p>
                     </div>
                   </div>

                   {/* Text meta */}
                   <div className="space-y-1">
                     <h4 className="font-serif text-2xl font-bold tracking-wide text-white">{agent.name}</h4>
                     <p className="text-xs uppercase text-slate-400 tracking-widest font-semibold">{agent.role}</p>
                   </div>
                </div>

                <div className="mt-8 pt-4 border-t border-neutral-800/80 flex items-center justify-between gap-2">
                  <div className="text-[10px] text-slate-400 font-mono tracking-wide leading-tight">
                    <p>{agent.phone}</p>
                    <p className="text-[9px] text-[#A78BFA] mt-0.5">{agent.email}</p>
                  </div>

                  <button 
                    onClick={() => setSelectedAgentForBooking(agent)}
                    className="px-4 py-2 font-bold text-[10px] uppercase tracking-wider rounded-full bg-white text-neutral-950 hover:bg-neutral-950 hover:text-white border border-white transition-all duration-200"
                  >
                    Book Consultation
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>


      {/* Section 4: Property Listings Grid Section */}
      <section className="py-24 px-4 md:px-12 bg-slate-50 border-t border-neutral-200" id="properties">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Row */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 mb-12"
          >
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#94A3B8] block mb-2">IMMERSIVE EXPLORATION</span>
              <h2 className="font-serif text-3xl md:text-5xl text-neutral-900">
                Find Your Dream Home Today
              </h2>
            </div>
            
            <p className="text-sm text-neutral-600 max-w-md leading-relaxed font-sans">
              Explore our latest available listings situated across high-end, secure locations. Click on any estate to view integrated eco and automation parameters.
            </p>
          </motion.div>

          {/* Interactive Filtering and Search Controls bar */}
          <div className="bg-white p-4 rounded-3xl border border-neutral-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
            
            {/* Category tabs */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button 
                onClick={() => setSelectedPropertyFilter("all")}
                className={`py-2 px-4 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${selectedPropertyFilter === "all" ? "bg-neutral-950 text-white" : "bg-slate-50 hover:bg-slate-100 text-neutral-600"}`}
              >
                All Properties
              </button>

              <button 
                onClick={() => setSelectedPropertyFilter("coastal")}
                className={`py-2 px-4 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${selectedPropertyFilter === "coastal" ? "bg-neutral-950 text-white" : "bg-slate-50 hover:bg-slate-100 text-neutral-600"}`}
              >
                Coastal Cliffside
              </button>

              <button 
                onClick={() => setSelectedPropertyFilter("forest")}
                className={`py-2 px-4 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${selectedPropertyFilter === "forest" ? "bg-neutral-950 text-white" : "bg-slate-50 hover:bg-slate-100 text-neutral-600"}`}
              >
                Forest Canopy
              </button>

              <button 
                onClick={() => setSelectedPropertyFilter("desert")}
                className={`py-2 px-4 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${selectedPropertyFilter === "desert" ? "bg-neutral-950 text-white" : "bg-slate-50 hover:bg-slate-100 text-neutral-600"}`}
              >
                Desert Ledge
              </button>
            </div>

            {/* Keyword Search input */}
            <div className="relative w-full md:w-80">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
                <Search className="w-4 h-4" />
              </span>
              <input 
                type="text" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search villas, location or technology..." 
                className="w-full bg-slate-50 border border-neutral-200 py-2.5 pl-10 pr-4 rounded-2xl text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-700 transition-all font-medium"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[10px] uppercase font-bold text-neutral-400 hover:text-neutral-950"
                >
                  Clear
                </button>
              )}
            </div>

          </div>

          {/* Listings Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {filteredProperties.length > 0 ? (
              filteredProperties.map((property) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  key={property.id} 
                  className="bg-white border border-neutral-200 rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 group"
                >
                  {/* Photo container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                    <img 
                      src={property.image} 
                      alt={property.title} 
                      className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-750 ease-out"
                      referrerPolicy="no-referrer"
                    />

                    {/* Meta tag bubbles */}
                    <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-bold uppercase tracking-wider text-neutral-950 shadow">
                        {property.category.toUpperCase()} PROPERTY
                      </span>
                    </div>

                    <div className="absolute bottom-4 right-4">
                      <span className="px-3.5 py-1.5 bg-slate-900 text-white rounded-xl text-xs font-bold shadow-lg">
                        {property.price}
                      </span>
                    </div>
                  </div>

                  {/* Metadata body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-neutral-400 text-[10px] font-bold uppercase tracking-widest mb-2">
                        <MapPin className="w-3.5 h-3.5 shrink-0" />
                        <span>{property.location}</span>
                      </div>

                      <h3 className="font-serif text-2xl font-bold text-neutral-900 tracking-wide mb-3">{property.title}</h3>
                      <p className="text-xs text-neutral-500 leading-relaxed font-sans line-clamp-3 mb-4">{property.description}</p>
                    </div>

                    <div className="pt-4 border-t border-neutral-100 space-y-4">
                      {/* Bed/Bath specs bar */}
                      <div className="flex items-center justify-between text-[11px] text-neutral-500 uppercase font-semibold font-display">
                        <span className="flex items-center gap-1">🛏️ {property.beds} Beds</span>
                        <span className="flex items-center gap-1">🚿 {property.baths} Baths</span>
                        <span className="flex items-center gap-1">📐 {property.sqft.toLocaleString()} SQFT</span>
                      </div>

                      {/* Included key tech line */}
                      <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-1">
                        <span className="text-[8px] uppercase tracking-wider font-extrabold text-neutral-400 block">KEY SMART-TECH INTEGRATION</span>
                        <p className="text-[10px] text-neutral-700 font-semibold truncate flex items-center gap-1">
                          <Check className="w-3 h-3 text-emerald-500 shrink-0" /> {property.smartFeatures[0]}
                        </p>
                      </div>

                      {/* Detail triggers */}
                      <div className="grid grid-cols-2 gap-2">
                        <button 
                          onClick={() => setSelectedPropertyForModal(property)}
                          className="w-full py-2 px-3 text-xs font-bold rounded-xl border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950 transition-all flex items-center justify-center gap-1"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Technology</span>
                        </button>

                        <button 
                          onClick={() => {
                            setSelectedPropertyForModal(property);
                            setSelectedAgentForBooking(agents[0]);
                          }}
                          className="w-full py-2 px-3 text-xs font-bold rounded-xl bg-neutral-950 text-white hover:bg-neutral-850 transition-all shadow"
                        >
                          Send Inquiry
                        </button>
                      </div>
                    </div>
                  </div>

                </motion.div>
              ))
            ) : (
              <div className="col-span-full py-16 text-center text-neutral-500 bg-white rounded-3xl border border-dashed border-neutral-300">
                <AlertTriangle className="w-8 h-8 text-neutral-400 mx-auto mb-3" />
                <p className="font-bold text-lg">No matching smart properties found</p>
                <p className="text-xs text-neutral-450 mt-1 max-w-md mx-auto">
                  Try adjusting your structural category or removing characters inside the keyword search bar.
                </p>
                <button 
                  onClick={() => {
                    setSelectedPropertyFilter("all");
                    setSearchQuery("");
                  }}
                  className="mt-4 px-4 py-2 text-xs font-bold rounded-lg uppercase tracking-wider bg-neutral-950 text-white"
                >
                  Reset Filtering Parameters
                </button>
              </div>
            )}

          </div>

        </div>
      </section>


      {/* Section 5: Dynamic Inquiry Desk & Global Contact Section */}
      <section className="bg-white border-t border-neutral-200 py-20 px-4 md:px-12" id="inquire">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column Information */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-6"
          >
            <span className="text-[10px] bg-slate-100 py-1 px-3 rounded-full text-slate-500 font-bold uppercase tracking-widest inline-block">SECURE CORRESPONDENCE</span>
            <h3 className="font-serif text-3xl md:text-5xl text-neutral-900 tracking-wide">
              Begin Your Smart Transition Today
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed font-sans">
              Whether you are preparing to acquire a bespoke biophilic villa or wish to explore personalized solar water integration grids, our consultants respond securely in complete privacy.
            </p>

            <div className="space-y-4 pt-4 border-t border-slate-100 font-sans text-xs">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-neutral-900 border border-slate-100 shadow-sm shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-neutral-400 text-[10px] uppercase">Secure Electronic Mail</p>
                  <a href="mailto:concierge@aureonestates.luxury" className="font-bold text-neutral-900 hover:underline">concierge@aureonestates.luxury</a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-neutral-900 border border-slate-100 shadow-sm shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-neutral-400 text-[10px] uppercase font-serif">Global Headquarters</p>
                  <p className="font-medium text-neutral-900">Level 42, Centennial Skyways, Central Bali, ID</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column Interactive Dynamic Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-7 bg-slate-50 p-6 md:p-8 rounded-3xl border border-neutral-200"
          >
            <h4 className="font-serif text-xl font-bold tracking-tight text-neutral-900 mb-6 font-sans">Concierge VIP Inquiry System</h4>
            
            <form onSubmit={handleQuickContactSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-neutral-600 text-[10px] uppercase tracking-wider block">Full Human Name</label>
                  <input 
                    type="text" 
                    required
                    value={contactName} 
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Marcus Aurelius" 
                    className="w-full bg-white border border-neutral-200 rounded-xl p-3 text-xs focus:ring-1 focus:ring-neutral-700 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-neutral-600 text-[10px] uppercase tracking-wider block">Private Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={contactEmail} 
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="e.g. marcus@philosophy.org" 
                    className="w-full bg-white border border-neutral-200 rounded-xl p-3 text-xs focus:ring-1 focus:ring-neutral-700 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-neutral-600 text-[10px] uppercase tracking-wider block">Scope of Desired Property or Setup Information</label>
                <textarea 
                  rows={4}
                  required
                  value={contactMsg} 
                  onChange={(e) => setContactMsg(e.target.value)}
                  placeholder="Describe your design space, climate parameters or timeline considerations..." 
                  className="w-full bg-white border border-neutral-200 rounded-xl p-3 text-xs focus:ring-1 focus:ring-neutral-700 focus:outline-none"
                />
              </div>

              <button 
                type="submit" 
                className="w-full py-3.5 rounded-xl bg-neutral-950 hover:bg-neutral-900 text-white font-bold uppercase tracking-widest text-[10px] transition-all shadow-md flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Transmit Secure Inquiry</span>
              </button>
            </form>
          </motion.div>

        </div>
      </section>


      {/* Elegant Footer Details */}
      <footer className="bg-neutral-950 text-[#94A3B8] pt-16 pb-8 px-4 md:px-12 border-t border-neutral-900 text-xs font-sans">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-neutral-900">
          
          {/* Column 1 Logo */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-white text-neutral-950 flex items-center justify-center font-serif font-black text-sm">A</span>
              <span className="font-serif font-semibold text-white tracking-widest uppercase text-md">AUREON Estates</span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              Curating autonomous, biophilic smart-living landmarks on earth. Setting the vanguard standard of aesthetic structural security.
            </p>
          </div>

          {/* Column 2 Direct Links */}
          <div className="md:col-span-3 space-y-3">
            <p className="font-display font-bold text-white text-xs uppercase tracking-widest">Platform</p>
            <ul className="space-y-1.5">
              <li><a href="#" className="hover:text-white transition-colors">Digital Home Showroom</a></li>
              <li><a href="#properties" className="hover:text-white transition-colors">Available Acquisitions</a></li>
              <li><a href="#simulator" className="hover:text-white transition-colors">Atmosphere Simulator</a></li>
              <li><a href="#agents" className="hover:text-white transition-colors">Specialist Agents</a></li>
            </ul>
          </div>

          {/* Column 3 Resources */}
          <div className="md:col-span-3 space-y-3">
            <p className="font-display font-bold text-white text-xs uppercase tracking-widest">Legals</p>
            <ul className="space-y-1.5">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Matrices</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Curatorial Terms</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Secure Title Deeds</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Smart-Contract Escrow</a></li>
            </ul>
          </div>

          {/* Column 4 Icons social */}
          <div className="md:col-span-2 space-y-4">
            <p className="font-display font-bold text-white text-xs uppercase tracking-widest">Connect</p>
            <div className="flex items-center gap-3">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 sm:p-2.5 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 hover:text-white transition-colors border border-white/5" title="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 sm:p-2.5 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 hover:text-white transition-colors border border-white/5" title="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 sm:p-2.5 rounded-full bg-neutral-900 text-white hover:bg-neutral-800 hover:text-white transition-colors border border-white/5" title="Twitter">
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom footer tags */}
        <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>Verified Secure AES Escrow Protocol © AUREON Estates {new Date().getFullYear()}. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <span>•</span>
            <a href="#" className="hover:underline">Terms of Service</a>
            <span>•</span>
            <a href="#" className="hover:underline">Site Matrix</a>
          </div>
        </div>
      </footer>


      {/* --- POPUP OVERLAY MODAL: Property Smart-Technology Details Viewer --- */}
      <AnimatePresence>
        {selectedPropertyForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPropertyForModal(null)}
              className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm"
              id="property-modal-backdrop"
            />

            {/* Content Drawer Box */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative bg-white rounded-3xl overflow-hidden w-full max-w-2xl border border-neutral-200 text-slate-800 shadow-2xl z-20 flex flex-col"
              id="property-specs-modal"
            >
              
              {/* Header preview photo */}
              <div className="h-48 relative overflow-hidden bg-slate-900">
                <img 
                  src={selectedPropertyForModal.image} 
                  alt={selectedPropertyForModal.title} 
                  className="w-full h-full object-cover object-center animate-pulse"
                  style={{ animationDuration: '8s' }}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />
                <button 
                  onClick={() => setSelectedPropertyForModal(null)}
                  className="absolute top-4 right-4 bg-black/60 hover:bg-neutral-900 border border-white/20 p-2 rounded-full text-white transition-all shadow-md hover:scale-105"
                  title="Close specular window"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>

                {/* Left indicators */}
                <div className="absolute bottom-4 left-6 text-white space-y-1">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full inline-block">SPECIFICATIONS REPORT</span>
                  <h4 className="font-serif text-2xl font-bold tracking-wide">{selectedPropertyForModal.title}</h4>
                </div>
              </div>

              {/* Specifications Body */}
              <div className="p-6 md:p-8 space-y-6 overflow-y-auto max-h-[60vh]">
                
                {/* Short parameters review */}
                <div className="grid grid-cols-4 gap-3 text-center border-b border-neutral-100 pb-4">
                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <p className="text-[9px] text-neutral-400 font-bold uppercase">VALUATION</p>
                    <p className="font-serif font-black text-md text-neutral-900">{selectedPropertyForModal.price}</p>
                  </div>

                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <p className="text-[9px] text-neutral-400 font-bold uppercase">KINETIC AREA</p>
                    <p className="font-serif font-black text-md text-neutral-900">{selectedPropertyForModal.sqft} SQFT</p>
                  </div>

                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <p className="text-[9px] text-neutral-400 font-bold uppercase">BEDROOMS</p>
                    <p className="font-serif font-black text-md text-neutral-900">{selectedPropertyForModal.beds}</p>
                  </div>

                  <div className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <p className="text-[9px] text-neutral-400 font-bold uppercase">AUTOMATION</p>
                    <p className="font-serif font-black text-md text-emerald-600">LEVEL 4</p>
                  </div>
                </div>

                {/* Long description text */}
                <div className="space-y-2">
                  <h5 className="font-display font-medium text-xs text-neutral-400 uppercase tracking-widest">Architectural Summary</h5>
                  <p className="text-xs text-neutral-600 leading-relaxed font-sans">{selectedPropertyForModal.description}</p>
                </div>

                {/* Fully interactive listing of Smart integrations */}
                <div className="space-y-3">
                  <h5 className="font-display font-medium text-xs text-neutral-400 uppercase tracking-widest">Integrated Smart Automation Features</h5>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {selectedPropertyForModal.smartFeatures.map((feat) => (
                      <div 
                        key={feat} 
                        className="bg-slate-50 p-3 rounded-xl border border-slate-150 shadow-sm hover:border-slate-350 transition-colors flex items-center gap-2 text-xs"
                      >
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="font-medium text-neutral-700">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Select This Property action wrapper */}
                <div className="bg-slate-900 text-white p-4 rounded-2xl border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h5 className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Interested in this smart residence?</h5>
                    <p className="text-xs text-slate-300 mt-0.5">Receive immediate digital deeds over the telemetry link.</p>
                  </div>

                  <button 
                    onClick={() => {
                      setSelectedPropertyForModal(null);
                      setSelectedAgentForBooking(agents[0]);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-white text-slate-950 hover:bg-neutral-100 transition-all font-bold text-xs uppercase tracking-wider"
                  >
                    Select Residence
                  </button>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* --- POPUP OVERLAY MODAL: Consultation Schedule Portal --- */}
      <AnimatePresence>
        {selectedAgentForBooking && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAgentForBooking(null)}
              className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm"
            />

            {/* Form Drawer */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative bg-white rounded-3xl overflow-hidden w-full max-w-lg border border-neutral-200 text-slate-800 shadow-2xl z-20"
              id="consultation-booking-form"
            >
              
              <div className="p-6 md:p-8 space-y-6">
                
                {/* Header overview matching chosen agent */}
                <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 aspect-square border border-slate-200">
                    <img 
                      src={selectedAgentForBooking.image} 
                      alt={selectedAgentForBooking.name} 
                      className="w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="leading-tight">
                    <span className="text-[9px] uppercase font-bold tracking-widest text-[#6D28D9] bg-[#F5F3FF] border border-[#DDD6FE] py-0.5 px-2.5 rounded-full inline-block">Consultation Assigner</span>
                    <h4 className="font-serif text-xl font-bold text-neutral-900 mt-1">{selectedAgentForBooking.name}</h4>
                    <p className="text-xs text-neutral-500 uppercase tracking-widest font-semibold">{selectedAgentForBooking.role}</p>
                  </div>
                </div>

                {/* Subtitle instructions */}
                <div className="text-center">
                  <h4 className="font-serif text-2xl font-bold tracking-wide">Reserve Your Tele-Consult</h4>
                  <p className="text-xs text-neutral-500 leading-normal max-w-sm mx-auto mt-1">
                    Select a desirable date slot. Our platform synchronizes local calendar registries automatically.
                  </p>
                </div>

                {/* Real-time scheduling form */}
                <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs font-sans">
                  
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-neutral-600 uppercase tracking-wider block">Your Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      placeholder="e.g. Jean-Luc Picard" 
                      className="w-full p-3 bg-slate-50 hover:bg-slate-50/50 border border-neutral-200 rounded-xl focus:ring-1 focus:ring-neutral-700 focus:outline-none"
                    />
                  </div>

                  {/* Email & Date Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-bold text-neutral-600 uppercase tracking-wider block">Your Email Address</label>
                      <input 
                        type="email" 
                        required
                        value={bookingEmail}
                        onChange={(e) => setBookingEmail(e.target.value)}
                        placeholder="e.g. picard@starfleet.org" 
                        className="w-full p-3 bg-slate-50 hover:bg-slate-50/50 border border-neutral-200 rounded-xl focus:ring-1 focus:ring-neutral-700 focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-neutral-600 uppercase tracking-wider block">Calendar Date Selection</label>
                      <input 
                        type="date"
                        required 
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full p-3 bg-slate-50 hover:bg-slate-50/50 border border-neutral-200 rounded-xl focus:ring-1 focus:ring-neutral-700 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Textarea notes */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-neutral-600 uppercase tracking-wider block">Key Requirements or Notes (Optional)</label>
                    <textarea 
                      rows={3}
                      value={bookingNotes}
                      onChange={(e) => setBookingNotes(e.target.value)}
                      placeholder="Mention specific design aesthetics or smart home integrations you wish to review..." 
                      className="w-full p-3 bg-slate-50 hover:bg-slate-50/50 border border-neutral-200 rounded-xl focus:ring-1 focus:ring-neutral-700 focus:outline-none"
                    />
                  </div>

                  {/* Actions buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <button 
                      type="button"
                      onClick={() => setSelectedAgentForBooking(null)}
                      className="w-full py-3.5 rounded-xl border border-neutral-200 bg-white text-neutral-700 hover:bg-slate-50 font-bold uppercase"
                    >
                      Cancel booking
                    </button>

                    <button 
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-neutral-950 hover:bg-neutral-900 text-white font-bold uppercase shadow"
                    >
                      Process reservation
                    </button>
                  </div>

                </form>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* --- POPUP OVERLAY MODAL: "About Us" biophilic values statement --- */}
      <AnimatePresence>
        {isAboutModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAboutModalOpen(false)}
              className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm"
            />

            {/* Box */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative bg-white rounded-3xl p-6 md:p-8 overflow-hidden w-full max-w-md border border-neutral-200 text-slate-800 shadow-2xl z-20 space-y-6"
            >
              <div className="text-center space-y-2">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#059669] bg-[#E6F4EA] px-3.5 py-1 rounded-full border border-[#D1E7DD] inline-block">OUR MISSION ARCHITECTURE</span>
                <h4 className="font-serif text-3xl font-bold tracking-wide">About AUREON Estates</h4>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto leading-normal">
                  Pioneering autonomous real estate with biophilic aesthetics.
                </p>
              </div>

              {/* Mission Statement text */}
              <div className="space-y-4 text-xs font-sans text-neutral-600 leading-relaxed pt-2">
                <p>
                  Established in 2024, **AUREON Estates** represents a bold departure from traditional brick-and-mortar structures. We compose living landmarks that intelligently adapt to climate variables, optimizing energy conservation dynamically.
                </p>
                <p>
                  Our smart microgrids leverage thin-film roof cells and subterranean heat extraction systems to operate standalone from standard civil power lines. At the same time, localized acoustic glass matrices screen out sound pollution, restoring pure silent solace inside Canggu or Ubud canopies.
                </p>
              </div>

              {/* Specifications numbers overview */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between text-center divide-x divide-slate-200">
                <div className="flex-1">
                  <p className="text-md font-serif font-black text-neutral-900">100%</p>
                  <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-wide mt-0.5">Biophilic Materials</p>
                </div>
                <div className="flex-1">
                  <p className="text-md font-serif font-black text-neutral-900">Zero</p>
                  <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-wide mt-0.5">Emission Footprint</p>
                </div>
                <div className="flex-1">
                  <p className="text-md font-serif font-black text-[#6D28D9]">Level 5</p>
                  <p className="text-[9px] text-neutral-400 font-bold uppercase tracking-wide mt-0.5">LIDAR Protections</p>
                </div>
              </div>

              <button 
                onClick={() => setIsAboutModalOpen(false)}
                className="w-full py-3 rounded-xl bg-neutral-950 hover:bg-neutral-900 text-white font-bold text-xs uppercase tracking-wider transition-all shadow"
              >
                Conclude report
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>


      {/* --- INQUIRIES LOGS SYSTEM OVERLAY DRAWER (View simulated client logs) --- */}
      <AnimatePresence>
        {showInquiriesDrawer && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowInquiriesDrawer(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs cursor-pointer"
            />

            {/* Slider panel */}
            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div 
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 180 }}
                className="w-screen max-w-md bg-white border-l border-neutral-200 h-full flex flex-col justify-between text-slate-800 shadow-2xl relative"
              >
                <div className="p-6 overflow-y-auto space-y-6 flex-1">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-emerald-500 animate-pulse" />
                      <div>
                        <h4 className="font-serif text-lg font-bold">Active Inquiry Logs</h4>
                        <p className="text-[10px] text-slate-400 font-mono tracking-wider">Stored locally inside browser state</p>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setShowInquiriesDrawer(false)}
                      className="text-xs uppercase font-extrabold text-neutral-400 hover:text-neutral-950 p-1"
                    >
                      Close Dashboard
                    </button>
                  </div>

                  {/* Log list */}
                  <div className="space-y-4 pt-2">
                    {inquiries.length > 0 ? (
                      inquiries.map((inq) => (
                        <div key={inq.id} className="bg-slate-50 rounded-2xl p-4 border border-slate-200 hover:border-slate-350 transition-colors space-y-2.5 text-xs text-slate-700">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="text-[9px] uppercase font-bold tracking-widest text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">{inq.timestamp} Submitted</span>
                              <h5 className="font-bold text-neutral-900 mt-1">{inq.clientName}</h5>
                              <p className="text-[10px] text-neutral-500 lowercase">{inq.clientEmail}</p>
                            </div>
                            <span className="font-mono text-[9px] font-bold text-slate-400 uppercase bg-white border px-1.5 py-0.5 rounded">active</span>
                          </div>

                          <div className="grid grid-cols-2 gap-2 text-[10px] border-t border-b border-slate-150 py-2 my-1 leading-normal">
                            <div>
                              <p className="text-slate-400 uppercase font-medium">Assigned Agent</p>
                              <p className="font-bold text-neutral-800 truncate">{inq.agentName}</p>
                            </div>
                            <div>
                              <p className="text-slate-400 uppercase font-medium">Estate Core</p>
                              <p className="font-bold text-neutral-800 truncate">{inq.propertyName}</p>
                            </div>
                          </div>

                          <div>
                            <p className="text-[10px] text-slate-400 uppercase font-medium mb-0.5">Specifications Inquire Notes</p>
                            <p className="text-[11px] leading-relaxed italic bg-white p-2 rounded border border-slate-100">{inq.notes}</p>
                          </div>

                          {inq.date !== "ASAP" && (
                            <p className="text-[10px] font-semibold text-slate-600 flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              <span>Scheduled viewing date: <strong>{inq.date}</strong></span>
                            </p>
                          )}
                        </div>
                      ))
                    ) : (
                      <div className="py-24 text-center text-slate-400">
                        <MessageSquare className="w-8 h-8 text-slate-300 mx-auto mb-3" />
                        <p className="font-semibold text-sm">No recorded inquiries logged yet.</p>
                        <p className="text-xs text-slate-400 mt-1">Submit a reservation consultation or prompt contact to preview live state outputs.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Drawer Footer Actions */}
                <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
                  <p className="text-[10px] text-slate-400 leading-normal max-w-[200px]">
                    Simulated secure ledger logs are preserved inside browser cache and do not leave memory.
                  </p>
                  
                  {inquiries.length > 0 && (
                    <button 
                      onClick={clearInquiries}
                      className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-bold uppercase text-[9px] tracking-wider rounded-xl transition-all"
                    >
                      Clear Log cache
                    </button>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
