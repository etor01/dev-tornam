"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

interface Props {
  id: string;
  slug: string;
  published: boolean;
  onToggle: (id: string, slug: string, published: boolean) => Promise<{ error?: string }>;
  deleteAction: (id: string) => Promise<void>;
  previewHref?: string;
}

export default function ContentActions({
  id,
  slug,
  published,
  onToggle,
  deleteAction,
  previewHref,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleToggle = () => {
    startTransition(async () => {
      const result = await onToggle(id, slug, !published);
      if (result.error) alert(result.error);
      else router.refresh();
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      await deleteAction(id);
    });
  };

  return (
    <>
      <div className="adminActionRow">
        {previewHref && (
          <a
            href={previewHref}
            target="_blank"
            rel="noopener noreferrer"
            className="adminBtn sm"
          >
            Preview ↗
          </a>
        )}

        <button
          type="button"
          className={`adminBtn sm ${published ? "" : "primary"}`}
          onClick={handleToggle}
          disabled={isPending}
        >
          {published ? "Unpublish" : "Publish"}
        </button>

        <button
          type="button"
          className="adminBtn sm danger"
          onClick={() => setShowConfirm(true)}
          disabled={isPending}
        >
          Delete
        </button>
      </div>

      {/* Confirmation dialog */}
      {showConfirm && (
        <div className="adminDialogOverlay" role="dialog" aria-modal="true">
          <div className="adminDialog">
            <h2 className="adminDialogTitle">Confirm Delete</h2>
            <p className="adminDialogBody">
              This action cannot be undone. The content will be permanently
              removed.
            </p>
            <div className="adminDialogActions">
              <button
                className="adminBtn"
                onClick={() => setShowConfirm(false)}
                disabled={isPending}
              >
                Cancel
              </button>
              <button
                className="adminBtn danger"
                onClick={handleDelete}
                disabled={isPending}
              >
                {isPending ? "Deleting…" : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// useState needs to be imported for the component above
import { useState } from "react";
