"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { UserPlus, GraduationCap, Eye, Trash2, BookOpen } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Toolbar } from "@/components/ui/Toolbar";
import { TableShell, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/TableShell";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { SkeletonLoader } from "@/components/ui/SkeletonLoader";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/teachers")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setTeachers(data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteTeacher = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete teacher "${name}"? This will also remove their user account.`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/teachers/${id}`, {
        method: "DELETE",
      });

      const resData = await res.json();

      if (res.ok && resData.success) {
        toast.success(`Teacher "${name}" deleted successfully.`);
        setTeachers((prev) => prev.filter((t) => t._id !== id));
      } else {
        toast.error(resData.message || "Failed to delete teacher.");
      }
    } catch (err) {
      toast.error("Error deleting teacher.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredTeachers = teachers.filter((t: any) => {
    const teacherName = t.userId?.name || t.name || "";
    const email = t.userId?.email || t.email || "";
    const empId = t.employeeId || "";
    const subject = Array.isArray(t.subjects) ? t.subjects.join(" ") : t.subjects || "";
    const query = searchTerm.toLowerCase();

    return (
      teacherName.toLowerCase().includes(query) ||
      email.toLowerCase().includes(query) ||
      empId.toLowerCase().includes(query) ||
      subject.toLowerCase().includes(query)
    );
  });

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <PageHeader
        title="Faculty Management"
        description="View, search, and manage registered teachers and academic instructors."
        breadcrumbs={[{ label: "Teachers" }]}
        action={
          <Link href="/dashboard/admin/teachers/new">
            <Button variant="gold" icon={<UserPlus className="w-4 h-4" />}>
              Add New Teacher
            </Button>
          </Link>
        }
      />

      {/* Toolbar */}
      <Toolbar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search by teacher name, email, subject, or employee ID..."
      >
        <div className="text-xs text-slate-500 font-semibold px-2.5 py-1 bg-slate-100 rounded-lg">
          Faculty Count: <span className="text-slate-900 font-bold tabular-nums">{filteredTeachers.length}</span>
        </div>
      </Toolbar>

      {/* Table Container */}
      {loading ? (
        <SkeletonLoader type="table" rows={5} />
      ) : filteredTeachers.length > 0 ? (
        <TableShell>
          <TableHeader>
            <tr>
              <TableHead className="w-36">Employee ID</TableHead>
              <TableHead>Teacher Details</TableHead>
              <TableHead>Subjects</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {filteredTeachers.map((t: any) => {
              const displayName = t.userId?.name || t.name || "Teacher";
              const displayEmail = t.userId?.email || t.email || "No email";
              const displaySubjects = Array.isArray(t.subjects) ? t.subjects.join(", ") : t.subjects || "General";

              return (
                <TableRow key={t._id}>
                  <TableCell className="font-mono font-bold text-slate-900 text-xs tracking-wider">
                    {t.employeeId || "N/A"}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar name={displayName} size="sm" />
                      <div>
                        <p className="font-bold text-slate-900 text-sm leading-snug">{displayName}</p>
                        <p className="text-[11px] text-slate-500 font-mono">{displayEmail}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 border border-amber-200 text-amber-900 rounded-lg text-xs font-semibold">
                      <BookOpen className="w-3 h-3 text-amber-600" />
                      {displaySubjects}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge status="active">Active Faculty</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleDeleteTeacher(t._id, displayName)}
                        disabled={deletingId === t._id}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                        title="Delete Teacher"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </TableShell>
      ) : (
        <EmptyState
          icon={GraduationCap}
          title="No faculty members found"
          description={
            searchTerm
              ? `No teachers matched "${searchTerm}".`
              : "No teacher profiles have been added to the system yet."
          }
          action={
            <Link href="/dashboard/admin/teachers/new">
              <Button variant="gold" size="sm" icon={<UserPlus className="w-4 h-4" />}>
                Add Teacher
              </Button>
            </Link>
          }
        />
      )}
    </div>
  );
}
