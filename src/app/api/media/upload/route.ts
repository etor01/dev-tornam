import { NextResponse, type NextRequest } from "next/server";
import { requireAdmin } from "@/lib/auth/helpers";
import { createClient } from "@/lib/supabase/server";

const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export async function POST(request: NextRequest) {
  try {
    // 1. Enforce admin authentication
    await requireAdmin();

    // 2. Parse form data
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file provided in 'file' field" },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          error:
            "Invalid file type. Allowed formats: JPEG, PNG, WebP, GIF, SVG.",
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE_BYTES) {
      return NextResponse.json(
        { error: "File exceeds 5MB size limit." },
        { status: 400 }
      );
    }

    // 3. Generate sanitized unique filename
    const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
    const cleanBase = file.name
      .replace(/\.[^/.]+$/, "")
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "-")
      .slice(0, 40);
    const filename = `public/${Date.now()}-${cleanBase}.${ext}`;

    // 4. Upload to Supabase Storage bucket 'media'
    const supabase = await createClient();
    const buffer = Buffer.from(await file.arrayBuffer());

    const { error: uploadError } = await supabase.storage
      .from("media")
      .upload(filename, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (uploadError) {
      console.error("[api/media/upload] upload error:", uploadError);
      return NextResponse.json(
        { error: `Upload failed: ${uploadError.message}` },
        { status: 500 }
      );
    }

    // 5. Get public URL
    const { data: urlData } = supabase.storage
      .from("media")
      .getPublicUrl(filename);

    return NextResponse.json({
      success: true,
      url: urlData.publicUrl,
      path: filename,
      name: filename.replace(/^public\//, ""),
      size: file.size,
    });
  } catch (err: unknown) {
    if (err instanceof Response) {
      return err;
    }
    console.error("[api/media/upload] unexpected error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred during upload." },
      { status: 500 }
    );
  }
}
