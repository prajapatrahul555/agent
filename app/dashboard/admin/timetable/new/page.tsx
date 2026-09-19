import TimetableForm from "@/components/forms/TimetableForm";

export default function NewTimetablePage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Create Weekly Timetable</h1>
      <TimetableForm />
    </div>
  );
}
