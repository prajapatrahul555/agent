"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { UserPlus, Users, Eye, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Toolbar } from "@/components/ui/Toolbar";
import { TableShell, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/TableShell";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { SkeletonLoader } from "@/components/ui/SkeletonLoader";
import { Button } from "@/components/ui/Button";
import { toast } from "sonner";

export default function StudentsPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/students")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setStudents(data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDeleteStudent = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete student "${name}"? This will also remove their user account.`)) {
      return;
    }

    setDeletingId(id);
    try {
      const res = await fetch(`/api/students/${id}`, {
        method: "DELETE",
      });

      const resData = await res.json();

      if (res.ok && resData.success) {
        toast.success(`Student "${name}" deleted successfully.`);
        setStudents((prev) => prev.filter((s) => s._id !== id));
      } else {
        toast.error(resData.message || "Failed to delete student.");
      }
    } catch (err) {
      toast.error("Error deleting student.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredStudents = students.filter((student: any) => {
    const studentName = student.userId?.name || student.name || "";
    const email = student.userId?.email || student.email || "";
    const rollNumber = student.rollNumber || "";
    const query = searchTerm.toLowerCase();

    return (
      studentName.toLowerCase().includes(query) ||
      email.toLowerCase().includes(query) ||
      rollNumber.toLowerCase().includes(query)
    );
  });

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto font-sans">
      {/* Header */}
      <PageHeader
        title="Student Directory"
        description="Search, monitor, and manage enrolled students across all class sections."
        breadcrumbs={[{ label: "Students" }]}
        action={
          <Link href="/dashboard/admin/students/new">
            <Button variant="gold" icon={<UserPlus className="w-4 h-4" />}>
              Add New Student
            </Button>
          </Link>
        }
      />

      {/* Toolbar */}
      <Toolbar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search by student name, email, or roll number..."
      >
        <div className="text-xs text-slate-500 font-semibold px-2.5 py-1 bg-slate-100 rounded-lg">
          Total Students: <span className="text-slate-900 font-bold tabular-nums">{filteredStudents.length}</span>
        </div>
      </Toolbar>

      {/* Content Table or Loader */}
      {loading ? (
        <SkeletonLoader type="table" rows={6} />
      ) : filteredStudents.length > 0 ? (
        <TableShell>
          <TableHeader>
            <tr>
              <TableHead className="w-32">Roll No</TableHead>
              <TableHead>Student Details</TableHead>
              <TableHead>Class & Section</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {filteredStudents.map((student: any) => {
              const displayName = student.userId?.name || student.name || "Student";
              const displayEmail = student.userId?.email || student.email || "No email";
              const className = student.classId?.name || (typeof student.classId === 'string' ? student.classId : "Grade 9");

              return (
                <TableRow key={student._id}>
                  <TableCell className="font-mono font-bold text-slate-900 text-xs tracking-wider">
                    {student.rollNumber || "N/A"}
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
                    <span className="inline-flex items-center px-2.5 py-1 bg-slate-100 border border-slate-200 text-slate-700 rounded-lg text-xs font-semibold">
                      {className} ({student.sectionId || "A"})
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge status="active" />
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleDeleteStudent(student._id, displayName)}
                        disabled={deletingId === student._id}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
                        title="Delete Student"
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
          icon={Users}
          title="No students found"
          description={
            searchTerm
              ? `No students matched your query "${searchTerm}". Try adjusting search terms.`
              : "No student records exist in the system yet. Click below to add the first student."
          }
          action={
            <Link href="/dashboard/admin/students/new">
              <Button variant="gold" size="sm" icon={<UserPlus className="w-4 h-4" />}>
                Create Student Record
              </Button>
            </Link>
          }
        />
      )}
    </div>
  );
}
