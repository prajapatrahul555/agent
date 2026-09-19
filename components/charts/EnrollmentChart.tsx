"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', students: 400 },
  { name: 'Feb', students: 320 },
  { name: 'Mar', students: 650 },
  { name: 'Apr', students: 820 },
  { name: 'May', students: 780 },
  { name: 'Jun', students: 950 },
];

export function EnrollmentChart() {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0f172a',
              borderRadius: '12px',
              border: 'none',
              color: '#fff',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            }}
            cursor={{ fill: '#f8fafc' }}
          />
          <Bar dataKey="students" fill="#6366f1" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

