import React from "react";
import Link from "next/link";
import { Camera, Plus, ArrowUpRight } from "lucide-react";
import {
  getAllAdminEvents,
  getAllAdminGalleryImages,
  computeEventStatus,
} from "@/lib/events/queries";
import { connection } from "next/server";
import AdminStickyHeader from "@/components/admin/AdminStickyHeader";

export default async function AdminGalleryOverviewPage() {
  await connection();
  const [events, allPhotos] = await Promise.all([
    getAllAdminEvents(),
    getAllAdminGalleryImages(),
  ]);

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <AdminStickyHeader>
        <div>
          <span className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#B58B50] block">
            Workshop Media
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#173D34]">
            Event Photo Galleries
          </h1>
          <p className="text-xs text-[#59675F] font-light mt-1">
            Pick an event below to upload, caption, or organize its photos.
          </p>
        </div>

        <Link
          href="/admin/events/new/previous"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-[#173D34] hover:bg-[#102E27] text-[#DFBD83] hover:text-white text-xs font-semibold tracking-wide transition-all shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Past Event &amp; Photos</span>
        </Link>
      </AdminStickyHeader>

      {/* Event Cards Grid */}
      <div>
        <h2 className="font-serif text-lg font-medium text-[#173D34] mb-3">
          Choose an Event ({events.length})
        </h2>
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {events.map((ev) => {
              const status = computeEventStatus(ev);
              return (
                <Link
                  key={ev.id}
                  href={`/admin/events/${ev.id}/gallery`}
                  className="p-5 rounded-2xl bg-white border border-[#B58B50]/20 hover:border-[#B58B50] shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-[11px] text-[#59675F] gap-2">
                      <span className="bg-[#E8EDE4] px-2.5 py-0.5 rounded-full text-[#173D34] font-medium truncate">
                        {ev.category}
                      </span>
                      <span className="flex items-center gap-1 font-semibold text-[#173D34] shrink-0">
                        <Camera className="w-3.5 h-3.5 text-[#B58B50]" />
                        <span>{ev.gallery_count || 0} Photos</span>
                      </span>
                    </div>

                    <h3 className="font-serif text-base font-medium text-[#173D34] group-hover:text-[#B58B50] transition-colors leading-snug line-clamp-2">
                      {ev.title}
                    </h3>

                    <span className="inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#F7F5EF] text-[#59675F]">
                      {status}
                    </span>
                  </div>

                  <div className="pt-4 mt-4 border-t border-[#E8EDE4] flex items-center justify-between text-xs font-semibold text-[#173D34] group-hover:text-[#B58B50]">
                    <span>Upload &amp; Manage Photos &rarr;</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="p-10 rounded-3xl bg-white border border-[#B58B50]/20 text-center space-y-3 text-xs text-[#59675F]">
            <p>No events exist yet. Create an upcoming or past event first, then upload its photos.</p>
            <Link
              href="/admin/events/new"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#173D34] text-white font-semibold"
            >
              <Plus className="w-3.5 h-3.5 text-[#DFBD83]" />
              <span>Create First Event</span>
            </Link>
          </div>
        )}
      </div>

      {/* All Uploaded Photos Feed */}
      <div className="pt-6 border-t border-[#E8EDE4]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-lg font-medium text-[#173D34]">
            All Uploaded Photos ({allPhotos.length})
          </h2>
          <span className="text-xs text-[#59675F]">
            Click any photo to open its event gallery
          </span>
        </div>

        {allPhotos.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {allPhotos.map((photo) => {
              const inner = (
                <div className="relative aspect-square rounded-xl overflow-hidden bg-[#102E27] border border-[#B58B50]/20 group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.image_path}
                    alt={photo.caption || "Workshop photo"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {!photo.is_published && (
                    <span className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full bg-red-600 text-white text-[9px] font-semibold">
                      Hidden
                    </span>
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-end text-[10px] text-white">
                    <span className="line-clamp-2">{photo.caption || photo.event_title}</span>
                  </div>
                </div>
              );

              return photo.event_id ? (
                <Link key={photo.id} href={`/admin/events/${photo.event_id}/gallery`}>
                  {inner}
                </Link>
              ) : (
                <div key={photo.id}>{inner}</div>
              );
            })}
          </div>
        ) : (
          <div className="p-8 rounded-2xl bg-white border border-[#B58B50]/20 text-center text-xs text-[#59675F]">
            No gallery photographs uploaded yet.
          </div>
        )}
      </div>
    </div>
  );
}
