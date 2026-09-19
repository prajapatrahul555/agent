import StudentForm from "@/components/forms/StudentForm";

export default function NewStudentPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Add New Student</h1>
      <StudentForm />
    </div>
  );
}
