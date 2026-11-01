import { z } from "zod";

export const ProjectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug may only contain lowercase letters, numbers, and hyphens"),
  description: z.string().min(1, "Description is required"),
  content: z.string().optional(),
  cover_image: z.string().optional(),
  tech_stack_raw: z.string().optional(), // comma-separated
  category: z.string().min(1, "Category is required"),
  github_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  live_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  year: z.string().optional(),
  status: z.enum(["active", "archived", "wip"]),
  featured: z.string().optional(), // checkbox → "on" | undefined
  display_order: z.string().optional(),
  published: z.string().optional(), // checkbox → "on" | undefined
});

export const NoteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug may only contain lowercase letters, numbers, and hyphens"),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  cover_image: z.string().optional(),
  category: z.string().optional(),
  tags_raw: z.string().optional(),
  published: z.string().optional(),
});

export const LabSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z
    .string()
    .min(1, "Slug is required")
    .regex(/^[a-z0-9-]+$/, "Slug may only contain lowercase letters, numbers, and hyphens"),
  description: z.string().min(1, "Description is required"),
  content: z.string().optional(),
  tools_raw: z.string().optional(),
  status: z.enum(["active", "archived", "wip"]),
  published: z.string().optional(),
});

export type ProjectInput = z.infer<typeof ProjectSchema>;
export type NoteInput = z.infer<typeof NoteSchema>;
export type LabInput = z.infer<typeof LabSchema>;
