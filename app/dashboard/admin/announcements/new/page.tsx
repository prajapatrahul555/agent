import AnnouncementForm from "@/components/forms/AnnouncementForm";

export default function NewAnnouncementPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Create New Announcement</h1>
      <AnnouncementForm />
    </div>
  );
}
