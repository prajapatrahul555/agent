import MessageForm from "@/components/forms/MessageForm";

export default function NewMessagePage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Send New Message</h1>
      <MessageForm />
    </div>
  );
}
