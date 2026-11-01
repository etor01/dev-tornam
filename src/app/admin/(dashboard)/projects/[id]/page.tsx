import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/db/projects";
import EditProjectForm from "./EditProjectForm";

interface Props {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) notFound();

  return <EditProjectForm project={project} />;
}
