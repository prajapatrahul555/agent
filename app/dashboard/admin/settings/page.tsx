import SettingsForm from "@/components/forms/SettingsForm";

export default function SettingsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">System Settings</h1>
      <SettingsForm />
    </div>
  );
}
