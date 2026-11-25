import React from "react";
import AdminEventsClient from "@/components/admin/AdminEventsClient";
import { getAllAdminEvents } from "@/lib/events/queries";
import { connection } from "next/server";

interface AdminEventsPageProps {
  searchParams: Promise<{ filter?: string }>;
}

export default async function AdminEventsPage({ searchParams }: AdminEventsPageProps) {
  await connection();
  const [events, resolvedParams] = await Promise.all([
    getAllAdminEvents(),
    searchParams,
  ]);
  const initialFilter = resolvedParams?.filter || "all";

  return (
    <AdminEventsClient
      key={`${initialFilter}-${events.length}`}
      initialEvents={events}
      initialFilter={initialFilter}
      serverNowIso={new Date().toISOString()}
    />
  );
}
