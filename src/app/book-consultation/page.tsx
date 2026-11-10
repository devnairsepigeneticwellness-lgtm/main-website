import React, { Suspense } from "react";
import { Metadata } from "next";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ConsultationBookingEngine from "@/components/booking/ConsultationBookingEngine";
import { getActiveProfessionals } from "@/lib/bookings/availability";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Book a Consultation | Nair's Epigenetic Wellness (N.E.W.)",
  description:
    "Schedule your confidential counselling, psychotherapy or clinical hypnotherapy session with Ajit Kumar Nair and our multidisciplinary clinical team.",
};

interface PageProps {
  searchParams: Promise<{ service?: string; professional?: string }>;
}

async function BookingContent({ searchParams }: PageProps) {
  const params = await searchParams;
  const professionals = await getActiveProfessionals();

  return (
    <ConsultationBookingEngine
      professionals={professionals}
      preselectedService={params.service}
      preselectedProfessional={params.professional}
    />
  );
}

export default function BookConsultationPage(props: PageProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5EF] text-[#24352D]">
      <AnnouncementBar />
      <Navbar />

      <main className="flex-1 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <Suspense
          fallback={
            <div className="py-20 flex flex-col items-center justify-center text-[#59675F] space-y-3">
              <Loader2 className="w-8 h-8 animate-spin text-[#B58B50]" />
              <span className="text-xs font-medium">Loading consultation scheduling system...</span>
            </div>
          }
        >
          <BookingContent {...props} />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
