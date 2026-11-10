"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  ArrowRight,
  Menu,
  X,
  Phone,
  Calendar,
  ChevronDown,
  Sparkles,
  Heart,
  Brain,
  Compass,
  Shield,
  Activity,
  Layers,
  GraduationCap,
  Users,
  Briefcase,
  School,
} from "lucide-react";

interface NavbarProps {
  onOpenBooking?: (serviceOrProgramme?: string) => void;
  currentPage?: "home" | "about" | "services" | "programmes" | "professionals" | "workshops" | "contact" | "events" | "assessment";
}

export default function Navbar({ onOpenBooking, currentPage }: NavbarProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [programmesDropdownOpen, setProgrammesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileProgrammesOpen, setMobileProgrammesOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");

  const servicesTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const programmesTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Automatically close menus and dropdowns on route changes
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
    setProgrammesDropdownOpen(false);
  }

  // Close menus on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesDropdownOpen(false);
        setProgrammesDropdownOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Sync scroll position & active route highlights
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (pathname === "/services" || currentPage === "services") {
        setActiveSection("services");
        return;
      }
      if (pathname === "/assessment" || pathname === "/screening" || currentPage === "assessment") {
        setActiveSection("assessment");
        return;
      }
      if (pathname === "/about" || currentPage === "about") {
        setActiveSection("about");
        return;
      }
      if (pathname === "/programmes" || currentPage === "programmes") {
        setActiveSection("programmes");
        return;
      }
      if (pathname === "/professionals" || pathname === "/our-professionals" || currentPage === "professionals") {
        setActiveSection("professionals");
        return;
      }
      if (pathname === "/contact" || currentPage === "contact") {
        setActiveSection("contact");
        return;
      }
      if (pathname === "/events" || pathname.startsWith("/events/") || currentPage === "events" || currentPage === "workshops") {
        setActiveSection("events");
        return;
      }

      if (pathname === "/") {
        const sections = [
          "home",
          "about",
          "services",
          "programmes",
          "founder",
          "contact",
        ];
        const scrollPosition = window.scrollY + 200;

        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname, currentPage]);

  const navLinks = [
    { label: "Home", shortLabel: "Home", href: "/", id: "home" },
    { label: "About Us", shortLabel: "About", href: "/about", id: "about" },
    { label: "Services", shortLabel: "Services", href: "/services", id: "services", hasDropdown: true },
    { label: "Assessment", shortLabel: "Assessment", href: "/assessment", id: "assessment" },
    { label: "Programmes", shortLabel: "Programmes", href: "/programmes", id: "programmes", hasDropdown: true },
    { label: "Our Professionals", shortLabel: "Professionals", href: "/professionals", id: "professionals" },
    { label: "Workshops & Events", shortLabel: "Events", href: "/events", id: "events" },
    { label: "Contact", shortLabel: "Contact", href: "/contact", id: "contact" },
  ];

  const serviceSubItems = [
    {
      title: "Individual Counselling",
      desc: "Safe, confidential dialogue for personal growth & emotional clarity.",
      href: "/services#counselling",
      icon: Heart,
    },
    {
      title: "Cognitive Psychotherapy (CBT/REBT)",
      desc: "Structured rational reframing of distressful thought patterns.",
      href: "/services#counselling",
      icon: Brain,
    },
    {
      title: "Clinical Hypnotherapy",
      desc: "Subconscious alignment, somatic ease & deep stress resolution.",
      href: "/services#hypnotherapy",
      icon: Sparkles,
    },
    {
      title: "Online Rehabilitation (RCI)",
      desc: "Neurodevelopmental guidance & clinical rehabilitation counselling.",
      href: "/services#rehabilitation",
      icon: Shield,
    },
    {
      title: "The Renewal Programme",
      desc: "Holistic recovery pathway for burnout, grief & existential transitions.",
      href: "/services#renewal",
      icon: Compass,
    },
    {
      title: "Personalised Support Plans",
      desc: "Multi-dimensional, ongoing care tailored to your unique context.",
      href: "/services#support-plans",
      icon: Layers,
    },
  ];

  const programmeSubItems = [
    {
      title: "Internship Programmes",
      desc: "Practical clinical exposure, case formulation & ethical immersion for students.",
      href: "/programmes#internships",
      icon: GraduationCap,
    },
    {
      title: "Practitioner Mentorship",
      desc: "One-on-one reflective supervision & boundary guidance for emerging clinicians.",
      href: "/programmes#mentorship",
      icon: Users,
    },
    {
      title: "Corporate Wellbeing",
      desc: "Science-backed workplace stress mitigation, burnout prevention & leadership EQ.",
      href: "/programmes#corporate",
      icon: Briefcase,
    },
    {
      title: "Educational & School Training",
      desc: "Curricula for schools, educators, parents & emotional classroom regulation.",
      href: "/programmes#educational",
      icon: School,
    },
  ];

  // Services dropdown hover handlers
  const handleMouseEnterServices = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    if (programmesTimeoutRef.current) clearTimeout(programmesTimeoutRef.current);
    setProgrammesDropdownOpen(false);
    setServicesDropdownOpen(true);
  };

  const handleMouseLeaveServices = () => {
    servicesTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 150);
  };

  // Programmes dropdown hover handlers
  const handleMouseEnterProgrammes = () => {
    if (servicesTimeoutRef.current) clearTimeout(servicesTimeoutRef.current);
    if (programmesTimeoutRef.current) clearTimeout(programmesTimeoutRef.current);
    setServicesDropdownOpen(false);
    setProgrammesDropdownOpen(true);
  };

  const handleMouseLeaveProgrammes = () => {
    programmesTimeoutRef.current = setTimeout(() => {
      setProgrammesDropdownOpen(false);
    }, 150);
  };

  // Smooth scroll handler for anchor links when on homepage
  const handleNavLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    id: string
  ) => {
    if (pathname === "/" && href.startsWith("/#")) {
      e.preventDefault();
      const targetId = href.replace("/#", "");
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setActiveSection(id);
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#102E27]/95 backdrop-blur-md shadow-lg border-b border-[#DFBD83]/20 py-3"
          : "bg-[#102E27]/90 backdrop-blur-sm border-b border-[#DFBD83]/15 py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 md:gap-4 lg:gap-5 xl:gap-8">
          {/* Brand Logo & Name */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 sm:gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFBD83] shrink-0"
            aria-label="Nair's Epigenetic Wellness Home"
          >
            {/* Monogram Seal */}
            {/* <div className="relative w-9 h-9 sm:w-10 sm:h-10 xl:w-11 xl:h-11 rounded-full bg-[#173D34] text-[#DFBD83] flex items-center justify-center font-serif text-xs sm:text-sm xl:text-base font-semibold tracking-tighter border border-[#DFBD83]/50 shadow-xs group-hover:border-[#DFBD83] group-hover:scale-105 transition-all shrink-0">
              <span>N.E.W.</span>
              <div className="absolute inset-0 rounded-full border border-[#DFBD83]/20 scale-110 pointer-events-none" />
            </div> */}

            {/* Brand Title */}
            <div className="flex flex-col">
              <span className="font-serif text-sm sm:text-base xl:text-lg 2xl:text-xl font-medium tracking-tight text-[#F7F5EF] group-hover:text-[#DFBD83] transition-colors leading-snug whitespace-nowrap">
                Nair&apos;s Epigenetic Wellness
              </span>
              <span className="text-[9px] xl:text-[10px] 2xl:text-[11px] font-sans tracking-[0.14em] uppercase text-[#DFBD83]/75 whitespace-nowrap hidden sm:block">
                Understanding · Supporting · Wellbeing
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-2.5 xl:gap-3.5 2xl:gap-5 shrink-0">
            {navLinks.map((link) => {
              const isServicesLink = link.id === "services";
              const isProgrammesLink = link.id === "programmes";
              const isCurrentRoute =
                link.href === "/"
                  ? pathname === "/" && activeSection === "home"
                  : pathname === link.href || pathname.startsWith(link.href + "#");
              const isActive = isCurrentRoute || activeSection === link.id;

              // Services Dropdown
              if (isServicesLink) {
                return (
                  <div
                    key={link.id}
                    className="relative"
                    onMouseEnter={handleMouseEnterServices}
                    onMouseLeave={handleMouseLeaveServices}
                  >
                    <Link
                      href="/services"
                      className={`inline-flex items-center gap-1 text-[13px] xl:text-sm tracking-wide whitespace-nowrap transition-all duration-200 relative py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFBD83] ${
                        isActive
                          ? "text-[#DFBD83] font-medium"
                          : "text-[#F7F5EF]/85 hover:text-[#DFBD83]"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          servicesDropdownOpen ? "rotate-180 text-[#DFBD83]" : "text-[#DFBD83]/70"
                        }`}
                      />
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#DFBD83] rounded-full" />
                      )}
                    </Link>

                    {/* Luxury Services Hover Dropdown Menu */}
                    {servicesDropdownOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[560px] bg-[#102E27] border border-[#DFBD83]/30 rounded-2xl shadow-2xl p-5 z-50 animate-in fade-in zoom-in-95 duration-200">
                        {/* Dropdown Header */}
                        <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-[#173D34]">
                          <div>
                            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#DFBD83] block">
                              Clinical &amp; Therapeutic Pathways
                            </span>
                            <span className="font-serif text-sm font-medium text-[#F7F5EF]">
                              Evidence-Informed, Person-Centred Care
                            </span>
                          </div>
                          <Link
                            href="/services"
                            onClick={() => setServicesDropdownOpen(false)}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#DFBD83] hover:text-[#F7F5EF] bg-[#173D34] hover:bg-[#214B40] px-3 py-1.5 rounded-full transition-colors border border-[#DFBD83]/20"
                          >
                            <span>Explore All Services</span>
                            <ArrowUpRight className="w-3 h-3 text-[#DFBD83]" />
                          </Link>
                        </div>

                        {/* Modalities Grid */}
                        <div className="grid grid-cols-2 gap-2.5">
                          {serviceSubItems.map((item) => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={item.title}
                                href={item.href}
                                onClick={() => setServicesDropdownOpen(false)}
                                className="group p-2.5 rounded-xl hover:bg-[#173D34]/80 border border-transparent hover:border-[#DFBD83]/30 transition-all flex items-start gap-3 text-left"
                              >
                                <div className="p-2 rounded-lg bg-[#173D34] text-[#DFBD83] group-hover:bg-[#214B40] group-hover:text-[#F7F5EF] transition-colors shrink-0 mt-0.5 border border-[#DFBD83]/15">
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="text-xs font-medium text-[#F7F5EF] group-hover:text-[#DFBD83] transition-colors leading-snug">
                                    {item.title}
                                  </div>
                                  <p className="text-[11px] text-[#E8EDE4]/70 leading-tight line-clamp-1 mt-0.5">
                                    {item.desc}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>

                        {/* Dropdown Footer Advice */}
                        <div className="mt-3.5 pt-3 border-t border-[#173D34] flex items-center justify-between text-xs text-[#E8EDE4]/75">
                          <Link
                            href="/assessment"
                            onClick={() => setServicesDropdownOpen(false)}
                            className="flex items-center gap-1.5 font-medium text-[#DFBD83] hover:text-[#F7F5EF] transition-colors"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-[#DFBD83]" />
                            <span>Take Self-Assessment Check-In &rarr;</span>
                          </Link>
                          <Link
                            href="/book-consultation?service=General%20Consultation"
                            onClick={() => setServicesDropdownOpen(false)}
                            className="text-[#DFBD83] hover:text-[#F7F5EF] font-medium inline-flex items-center gap-1"
                          >
                            <span>Book an Exploratory Call &rarr;</span>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              // Programmes Dropdown
              if (isProgrammesLink) {
                return (
                  <div
                    key={link.id}
                    className="relative"
                    onMouseEnter={handleMouseEnterProgrammes}
                    onMouseLeave={handleMouseLeaveProgrammes}
                  >
                    <Link
                      href="/programmes"
                      className={`inline-flex items-center gap-1 text-[13px] xl:text-sm tracking-wide whitespace-nowrap transition-all duration-200 relative py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFBD83] ${
                        isActive
                          ? "text-[#DFBD83] font-medium"
                          : "text-[#F7F5EF]/85 hover:text-[#DFBD83]"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          programmesDropdownOpen ? "rotate-180 text-[#DFBD83]" : "text-[#DFBD83]/70"
                        }`}
                      />
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#DFBD83] rounded-full" />
                      )}
                    </Link>

                    {/* Luxury Programmes Hover Dropdown Menu */}
                    {programmesDropdownOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[560px] bg-[#102E27] border border-[#DFBD83]/30 rounded-2xl shadow-2xl p-5 z-50 animate-in fade-in zoom-in-95 duration-200">
                        {/* Dropdown Header */}
                        <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-[#173D34]">
                          <div>
                            <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#DFBD83] block">
                              Academic &amp; Professional Pathways
                            </span>
                            <span className="font-serif text-sm font-medium text-[#F7F5EF]">
                              Experiential Learning &amp; Institutional Capacity
                            </span>
                          </div>
                          <Link
                            href="/programmes"
                            onClick={() => setProgrammesDropdownOpen(false)}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#DFBD83] hover:text-[#F7F5EF] bg-[#173D34] hover:bg-[#214B40] px-3 py-1.5 rounded-full transition-colors border border-[#DFBD83]/20"
                          >
                            <span>Explore All Programmes</span>
                            <ArrowUpRight className="w-3 h-3 text-[#DFBD83]" />
                          </Link>
                        </div>

                        {/* Tracks Grid */}
                        <div className="grid grid-cols-2 gap-2.5">
                          {programmeSubItems.map((item) => {
                            const Icon = item.icon;
                            return (
                              <Link
                                key={item.title}
                                href={item.href}
                                onClick={() => setProgrammesDropdownOpen(false)}
                                className="group p-2.5 rounded-xl hover:bg-[#173D34]/80 border border-transparent hover:border-[#DFBD83]/30 transition-all flex items-start gap-3 text-left"
                              >
                                <div className="p-2 rounded-lg bg-[#173D34] text-[#DFBD83] group-hover:bg-[#214B40] group-hover:text-[#F7F5EF] transition-colors shrink-0 mt-0.5 border border-[#DFBD83]/15">
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div>
                                  <div className="text-xs font-medium text-[#F7F5EF] group-hover:text-[#DFBD83] transition-colors leading-snug">
                                    {item.title}
                                  </div>
                                  <p className="text-[11px] text-[#E8EDE4]/70 leading-tight line-clamp-1 mt-0.5">
                                    {item.desc}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>

                        {/* Dropdown Footer Advice */}
                        <div className="mt-3.5 pt-3 border-t border-[#173D34] flex items-center justify-between text-xs text-[#E8EDE4]/75">
                          <span className="flex items-center gap-1.5 font-light">
                            <GraduationCap className="w-3.5 h-3.5 text-[#DFBD83]" />
                            <span>Cohort, Academic &amp; Institutional Batches</span>
                          </span>
                          <Link
                            href="/book-consultation?service=Programmes%20Inquiry"
                            onClick={() => setProgrammesDropdownOpen(false)}
                            className="text-[#DFBD83] hover:text-[#F7F5EF] font-medium inline-flex items-center gap-1"
                          >
                            <span>Enquire for Batches &rarr;</span>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              // Standard Navigation Links
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavLinkClick(e, link.href, link.id)}
                  className={`text-[13px] xl:text-[13.5px] 2xl:text-sm tracking-wide whitespace-nowrap transition-all duration-200 relative py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DFBD83] ${
                    isActive
                      ? "text-[#DFBD83] font-medium"
                      : "text-[#F7F5EF]/85 hover:text-[#DFBD83]"
                  }`}
                >
                  <span className="2xl:hidden">{link.shortLabel}</span>
                  <span className="hidden 2xl:inline">{link.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#DFBD83] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Button (Desktop & Tablet) */}
          <div className="hidden sm:flex items-center gap-2.5 xl:gap-3 shrink-0">
            {onOpenBooking ? (
              <button
                onClick={() => onOpenBooking("General Consultation")}
                className="group inline-flex items-center gap-1.5 xl:gap-2 px-5 py-2.5 xl:px-6 xl:py-2.5 rounded-full bg-[#DFBD83] hover:bg-[#E5B86F] text-[#102E27] text-xs xl:text-sm font-semibold tracking-wide shadow-md hover:shadow-lg hover:scale-[1.02] border border-[#DFBD83]/90 transition-all duration-200 whitespace-nowrap"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-[#102E27] group-hover:translate-x-0.5 transition-transform shrink-0" />
              </button>
            ) : (
              <Link
                href="/book-consultation"
                className="group inline-flex items-center gap-1.5 xl:gap-2 px-5 py-2.5 xl:px-6 xl:py-2.5 rounded-full bg-[#DFBD83] hover:bg-[#E5B86F] text-[#102E27] text-xs xl:text-sm font-semibold tracking-wide shadow-md hover:shadow-lg hover:scale-[1.02] border border-[#DFBD83]/90 transition-all duration-200 whitespace-nowrap"
              >
                <span>Book a Consultation</span>
                <ArrowRight className="w-3.5 h-3.5 xl:w-4 xl:h-4 text-[#102E27] group-hover:translate-x-0.5 transition-transform shrink-0" />
              </Link>
            )}
          </div>

          {/* Mobile & Tablet Menu Button */}
          <div className="flex lg:hidden items-center gap-1.5 sm:gap-2 shrink-0">
            {onOpenBooking ? (
              <button
                onClick={() => onOpenBooking("Mobile Booking")}
                className="hidden xs:flex sm:hidden p-2 rounded-full bg-[#DFBD83] text-[#102E27] hover:bg-[#E5B86F]"
                title="Book Consultation"
              >
                <Calendar className="w-4 h-4" />
              </button>
            ) : (
              <Link
                href="/book-consultation"
                className="hidden xs:flex sm:hidden p-2 rounded-full bg-[#DFBD83] text-[#102E27] hover:bg-[#E5B86F]"
                title="Book Consultation"
              >
                <Calendar className="w-4 h-4" />
              </Link>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 sm:p-2.5 rounded-lg text-[#F7F5EF] hover:bg-[#173D34] transition-colors focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#102E27] border-b border-[#DFBD83]/20 px-6 pt-4 pb-8 shadow-xl animate-in slide-in-from-top-4 duration-300 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col divide-y divide-[#173D34]">
            {navLinks.map((link) => {
              // Mobile Services Accordion
              if (link.id === "services") {
                return (
                  <div key={link.id} className="py-2">
                    <div className="flex items-center justify-between py-2">
                      <Link
                        href="/services"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-base text-[#F7F5EF] hover:text-[#DFBD83] font-medium"
                      >
                        Services Overview
                      </Link>
                      <button
                        onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                        className="p-1.5 rounded-md hover:bg-[#173D34] text-[#DFBD83]"
                        aria-label="Toggle services list"
                      >
                        <ChevronDown
                          className={`w-4 h-4 text-[#DFBD83] transition-transform ${
                            mobileServicesOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {/* Mobile Sub-Services Drawer */}
                    {mobileServicesOpen && (
                      <div className="pl-3 pb-2 space-y-2 border-l-2 border-[#DFBD83]/30 ml-2">
                        <Link
                          href="/assessment"
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-1.5 text-xs text-[#DFBD83] font-medium hover:text-white transition-colors"
                        >
                          ✦ Self-Assessment Check-In
                        </Link>
                        {serviceSubItems.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-1.5 text-xs text-[#E8EDE4]/80 hover:text-[#DFBD83] transition-colors"
                          >
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              // Mobile Programmes Accordion
              if (link.id === "programmes") {
                return (
                  <div key={link.id} className="py-2">
                    <div className="flex items-center justify-between py-2">
                      <Link
                        href="/programmes"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-base text-[#F7F5EF] hover:text-[#DFBD83] font-medium"
                      >
                        Programmes Overview
                      </Link>
                      <button
                        onClick={() => setMobileProgrammesOpen(!mobileProgrammesOpen)}
                        className="p-1.5 rounded-md hover:bg-[#173D34] text-[#DFBD83]"
                        aria-label="Toggle programmes list"
                      >
                        <ChevronDown
                          className={`w-4 h-4 text-[#DFBD83] transition-transform ${
                            mobileProgrammesOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {/* Mobile Sub-Programmes Drawer */}
                    {mobileProgrammesOpen && (
                      <div className="pl-3 pb-2 space-y-2 border-l-2 border-[#DFBD83]/30 ml-2">
                        {programmeSubItems.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="block py-1.5 text-xs text-[#E8EDE4]/80 hover:text-[#DFBD83] transition-colors"
                          >
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    handleNavLinkClick(e, link.href, link.id);
                    setMobileMenuOpen(false);
                  }}
                  className="py-3 text-base text-[#F7F5EF] hover:text-[#DFBD83] font-medium transition-colors flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-[#DFBD83]">→</span>
                </Link>
              );
            })}
          </div>

          <div className="mt-6 flex flex-col gap-3">
            {onOpenBooking ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking("Mobile Consultation Booking");
                }}
                className="w-full py-3.5 rounded-full bg-[#DFBD83] hover:bg-[#E5B86F] text-[#102E27] text-sm font-semibold tracking-wide flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <span>Book a Consultation</span>
                <ArrowUpRight className="w-4 h-4 text-[#102E27]" />
              </button>
            ) : (
              <Link
                href="/book-consultation"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3.5 rounded-full bg-[#DFBD83] hover:bg-[#E5B86F] text-[#102E27] text-sm font-semibold tracking-wide flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <span>Book a Consultation</span>
                <ArrowUpRight className="w-4 h-4 text-[#102E27]" />
              </Link>
            )}

            <a
              href="tel:+919446477779"
              className="flex items-center justify-center gap-2 text-xs text-[#E8EDE4]/70 py-2"
            >
              <Phone className="w-3.5 h-3.5 text-[#DFBD83]" />
              <span>Direct helpline: +91 94464 77779</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
