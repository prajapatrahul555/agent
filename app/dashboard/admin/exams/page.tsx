"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { PlusCircle, FileText, Eye } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Toolbar } from "@/components/ui/Toolbar";
import { TableShell, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/TableShell";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { SkeletonLoader } from "@/components/ui/SkeletonLoader";
import { Button } from "@/components/ui/Button";

export default function ExamsPage() {
  const [exams, setExams] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/exams")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setExams(data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredExams = exams.filter(
    (e: any) =>
      e.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.academicYear?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <PageHeader
        title="Examinations & Terms"
        description="Schedule, configure, and monitor term examinations, schedules, and grading boundaries."
        breadcrumbs={[{ label: "Exams & Grades" }]}
        action={
          <Link href="/dashboard/admin/exams/new">
            <Button variant="gold" icon={PlusCircle}>
              Schedule New Exam
            </Button>
          </Link>
        }
      />

      {/* Toolbar */}
      <Toolbar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search by exam title or academic year..."
      >
        <div className="text-xs text-slate-500 font-semibold px-2 py-1 bg-slate-100 rounded-lg">
          Total Exams: <span className="text-slate-900 font-bold tabular-nums">{filteredExams.length}</span>
        </div>
      </Toolbar>

      {/* Table Container */}
      {loading ? (
        <SkeletonLoader type="table" rows={5} />
      ) : filteredExams.length > 0 ? (
        <TableShell>
          <TableHeader>
            <tr>
              <TableHead>Exam Title</TableHead>
              <TableHead>Class Section</TableHead>
              <TableHead>Academic Term</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {filteredExams.map((e: any) => (
              <TableRow key={e._id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-amber-50 border border-amber-200/60 rounded-xl text-amber-700">
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-slate-900 text-sm">{e.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold">
                    {e.classId?.name || "All Classes"}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge status="scheduled">{e.academicYear || "2026 Term"}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <span className="text-xs font-semibold text-slate-500 hover:text-amber-700 cursor-pointer inline-flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" /> View Gradebook
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableShell>
      ) : (
        <EmptyState
          icon={FileText}
          title="No examinations scheduled"
          description={
            searchTerm
              ? `No exams matched "${searchTerm}".`
              : "No upcoming term examinations have been scheduled yet."
          }
          action={
            <Link href="/dashboard/admin/exams/new">
              <Button variant="gold" size="sm" icon={PlusCircle}>
                Schedule Exam
              </Button>
            </Link>
          }
        />
      )}
    </div>
  );
}


