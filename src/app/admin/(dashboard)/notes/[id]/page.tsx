import { notFound } from "next/navigation";
import { getNoteById } from "@/lib/db/notes";
import EditNoteForm from "./EditNoteForm";

export const dynamic = "force-dynamic";

export default async function EditNotePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const note = await getNoteById(id);
  if (!note) notFound();
  return <EditNoteForm note={note} />;
}
