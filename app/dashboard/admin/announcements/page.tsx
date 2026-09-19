"use client";

import { useState, useEffect } from "react";
import { Megaphone } from "lucide-react";

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetch("/api/announcements")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setAnnouncements(data.data);
      });
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">School Announcements</h1>
      <div className="space-y-6">
        {announcements.map((a: any) => (
          <div key={a._id} className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100 flex gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl h-fit">
              <Megaphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">{a.title}</h3>
              <p className="text-slate-600 mt-2">{a.message}</p>
              <p className="text-xs text-slate-400 mt-4 italic">
                Posted on {new Date(a.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
