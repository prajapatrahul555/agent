"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { DollarSign, PlusCircle } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Toolbar } from "@/components/ui/Toolbar";
import { TableShell, TableHeader, TableHead, TableBody, TableRow, TableCell } from "@/components/ui/TableShell";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { SkeletonLoader } from "@/components/ui/SkeletonLoader";
import { Button } from "@/components/ui/Button";

export default function FeesPage() {
  const [fees, setFees] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/fees")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setFees(data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredFees = fees.filter(
    (f: any) =>
      f.studentId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <PageHeader
        title="Fee & Financial Ledger"
        description="Track tuition payments, overdue balances, and student transaction statuses."
        breadcrumbs={[{ label: "Fees & Ledger" }]}
        action={
          <Link href="/dashboard/admin/fees/new">
            <Button variant="gold" icon={PlusCircle}>
              Record New Fee
            </Button>
          </Link>
        }
      />

      {/* Toolbar */}
      <Toolbar
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        placeholder="Search by student name or status..."
      >
        <div className="text-xs text-slate-500 font-semibold px-2 py-1 bg-slate-100 rounded-lg">
          Records: <span className="text-slate-900 font-bold tabular-nums">{filteredFees.length}</span>
        </div>
      </Toolbar>

      {/* Table Container */}
      {loading ? (
        <SkeletonLoader type="table" rows={5} />
      ) : filteredFees.length > 0 ? (
        <TableShell>
          <TableHeader>
            <tr>
              <TableHead>Student Name</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </tr>
          </TableHeader>
          <TableBody>
            {filteredFees.map((f: any) => (
              <TableRow key={f._id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar name={f.studentId?.name || "Student"} size="sm" />
                    <div>
                      <span className="font-bold text-slate-900 text-sm">{f.studentId?.name || "Unassigned"}</span>
                      {f.studentId?.rollNumber && (
                        <p className="text-[11px] font-mono text-slate-400">Roll: {f.studentId.rollNumber}</p>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="font-extrabold text-slate-900 text-sm tabular-nums">
                  ${Number(f.amount ?? 0).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge status={f.status} />
                </TableCell>
                <TableCell className="text-right">
                  <span className="text-xs font-semibold text-amber-700 hover:underline cursor-pointer">
                    Manage Payment
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableShell>
      ) : (
        <EmptyState
          icon={DollarSign}
          title="No fee records found"
          description={
            searchTerm
              ? `No fee records matched "${searchTerm}".`
              : "No fee entries have been recorded yet."
          }
          action={
            <Link href="/dashboard/admin/fees/new">
              <Button variant="gold" size="sm" icon={PlusCircle}>
                Add Fee Record
              </Button>
            </Link>
          }
        />
      )}
    </div>
  );
}

