import { notFound } from "next/navigation";
import { getExperimentById } from "@/lib/db/lab";
import EditLabForm from "./EditLabForm";

export const dynamic = "force-dynamic";

export default async function EditLabPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const experiment = await getExperimentById(id);
  if (!experiment) notFound();
  return <EditLabForm experiment={experiment} />;
}
