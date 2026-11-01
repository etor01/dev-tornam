"use client";

import { useState, useCallback, useRef, useTransition } from "react";
import { createClient } from "@/lib/supabase/client";
import { Upload, Trash2, Copy, Check } from "lucide-react";
import Image from "next/image";

interface MediaFile {
  name: string;
  url: string;
  created_at: string;
  size: number;
}

interface Props {
  initialFiles: MediaFile[];
}

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
const MAX_SIZE_MB = 5;

export default function MediaManager({ initialFiles }: Props) {
  const [files, setFiles] = useState<MediaFile[]>(initialFiles);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [copiedUrl, setCopiedUrl] = useState("");
  const [isPending, startTransition] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const refreshFiles = useCallback(async () => {
    const supabase = createClient();
    const { data } = await supabase.storage.from("media").list("public", {
      sortBy: { column: "created_at", order: "desc" },
    });
    if (!data) return;

    const withUrls: MediaFile[] = data.map((f) => {
      const { data: urlData } = supabase.storage
        .from("media")
        .getPublicUrl(`public/${f.name}`);
      return {
        name: f.name,
        url: urlData.publicUrl,
        created_at: f.created_at ?? "",
        size: f.metadata?.size ?? 0,
      };
    });
    setFiles(withUrls);
  }, []);

  const handleUpload = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      setError("");
      setSuccess("");

      if (!ALLOWED_TYPES.includes(file.type)) {
        setError("Unsupported file type. Allowed: JPEG, PNG, WebP, GIF, SVG.");
        return;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        setError(`File too large. Maximum size is ${MAX_SIZE_MB}MB.`);
        return;
      }

      setUploading(true);
      try {
        const supabase = createClient();
        const ext = file.name.split(".").pop();
        const filename = `public/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

        const { error: uploadError } = await supabase.storage
          .from("media")
          .upload(filename, file, { contentType: file.type });

        if (uploadError) throw uploadError;

        setSuccess("File uploaded successfully.");
        await refreshFiles();
      } catch (err) {
        setError("Upload failed. Please try again.");
        console.error(err);
      } finally {
        setUploading(false);
        if (fileInputRef.current) fileInputRef.current.value = "";
      }
    },
    [refreshFiles]
  );

  const handleDelete = useCallback(
    (name: string) => {
      if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;

      startTransition(async () => {
        const supabase = createClient();
        const { error: delError } = await supabase.storage
          .from("media")
          .remove([`public/${name}`]);

        if (delError) {
          setError("Delete failed: " + delError.message);
          return;
        }
        setSuccess("File deleted.");
        setFiles((prev) => prev.filter((f) => f.name !== name));
      });
    },
    []
  );

  const copyUrl = useCallback((url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(""), 2000);
  }, []);

  return (
    <>
      {error && <div className="adminAlert error" role="alert">✕ {error}</div>}
      {success && <div className="adminAlert success" role="status">✓ {success}</div>}

      {/* Upload area */}
      <div className="adminFormSection">
        <p className="adminFormSectionTitle">Upload Image</p>
        <div
          style={{
            border: "2px dashed var(--ink-border)",
            borderRadius: "4px",
            padding: "2rem",
            textAlign: "center",
            cursor: "pointer",
            transition: "background-color 120ms ease",
          }}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            if (file && fileInputRef.current) {
              const dt = new DataTransfer();
              dt.items.add(file);
              fileInputRef.current.files = dt.files;
              fileInputRef.current.dispatchEvent(new Event("change", { bubbles: true }));
            }
          }}
        >
          <Upload size={24} color="var(--muted)" style={{ marginBottom: "0.5rem" }} />
          <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--text-secondary)" }}>
            {uploading ? "Uploading…" : "Click to select or drag & drop"}
          </p>
          <p style={{ margin: "0.25rem 0 0", fontSize: "0.72rem", color: "var(--muted)", fontFamily: "var(--font-mono), monospace" }}>
            JPEG · PNG · WebP · GIF · SVG — max {MAX_SIZE_MB}MB
          </p>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept={ALLOWED_TYPES.join(",")}
          onChange={handleUpload}
          style={{ display: "none" }}
          id="media-upload-input"
          aria-label="Upload media file"
        />
      </div>

      {/* Media grid */}
      <div className="adminCard">
        <div className="adminCardHeader">
          <h2 className="adminCardTitle">Uploaded Files ({files.length})</h2>
          <button className="adminBtn sm" onClick={refreshFiles} disabled={isPending}>
            Refresh
          </button>
        </div>

        {files.length === 0 ? (
          <div className="adminEmpty">
            <div className="adminEmptyIcon">🖼</div>
            No images uploaded yet.
          </div>
        ) : (
          <div className="adminMediaGrid" style={{ padding: "1.25rem" }}>
            {files.map((file) => (
              <div key={file.name} className="adminMediaThumb" style={{ position: "relative" }}>
                <Image
                  src={file.url}
                  alt={file.name}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="120px"
                  unoptimized
                />
                {/* Overlay actions */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(17,17,17,0.5)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    opacity: 0,
                    transition: "opacity 120ms ease",
                  }}
                  className="mediaThumbOverlay"
                >
                  <button
                    onClick={() => copyUrl(file.url)}
                    title="Copy URL"
                    style={{ background: "var(--surface-card)", border: "none", borderRadius: "4px", padding: "0.3rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                    aria-label="Copy image URL"
                  >
                    {copiedUrl === file.url ? <Check size={14} color="green" /> : <Copy size={14} />}
                  </button>
                  <button
                    onClick={() => handleDelete(file.name)}
                    title="Delete"
                    style={{ background: "#fef2f2", border: "none", borderRadius: "4px", padding: "0.3rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                    aria-label="Delete image"
                    disabled={isPending}
                  >
                    <Trash2 size={14} color="#991b1b" />
                  </button>
                </div>
                <style>{`.mediaThumbOverlay:hover,.adminMediaThumb:hover .mediaThumbOverlay{opacity:1!important}`}</style>
              </div>
            ))}
          </div>
        )}
      </div>

      <p style={{ fontFamily: "var(--font-mono), monospace", fontSize: "0.72rem", color: "var(--muted)" }}>
        Copy image URLs to paste into content fields. Images are stored in the <code>media</code> Supabase Storage bucket.
      </p>
    </>
  );
}
