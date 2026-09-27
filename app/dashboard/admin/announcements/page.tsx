"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Megaphone, PlusCircle, Calendar } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { EmptyState } from "@/components/ui/EmptyState";
import { SkeletonLoader } from "@/components/ui/SkeletonLoader";
import { Button } from "@/components/ui/Button";

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/announcements")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setAnnouncements(data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto">
      <PageHeader
        title="School Announcements"
        description="Broadcast official notices, events, and circulars to campus faculty and students."
        breadcrumbs={[{ label: "Announcements" }]}
        action={
          <Link href="/dashboard/admin/announcements/new">
            <Button variant="gold" icon={PlusCircle}>
              Post Notice
            </Button>
          </Link>
        }
      />

      {loading ? (
        <SkeletonLoader type="cards" rows={3} />
      ) : announcements.length > 0 ? (
        <div className="space-y-4">
          {announcements.map((a: any) => (
            <div
              key={a._id}
              className="p-6 bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:border-slate-300 transition-all flex items-start gap-4 group"
            >
              <div className="p-3 bg-amber-50 border border-amber-200/60 text-amber-700 rounded-xl shrink-0 group-hover:scale-105 transition-transform">
                <Megaphone className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <h3 className="font-extrabold text-base text-slate-900 font-display truncate">{a.title}</h3>
                  <span className="text-[11px] font-medium text-slate-400 shrink-0 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(a.createdAt || Date.now()).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed font-normal">{a.message}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Megaphone}
          title="No announcements published"
          description="There are currently no active announcements posted on the campus board."
          action={
            <Link href="/dashboard/admin/announcements/new">
              <Button variant="gold" size="sm" icon={PlusCircle}>
                Post First Notice
              </Button>
            </Link>
          }
        />
      )}
    </div>
  );
}

