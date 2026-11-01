import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { generateSlug } from "../src/lib/utils/slug";
import { renderMarkdown } from "../src/lib/utils/markdown";
import {
  ProjectSchema,
  NoteSchema,
  LabSchema,
} from "../src/lib/validation/schemas";

describe("CMS Utilities & Validation", () => {
  describe("Slug Generator (generateSlug)", () => {
    it("converts simple titles to lowercase hyphens", () => {
      assert.equal(generateSlug("My New Project"), "my-new-project");
    });

    it("strips special characters and punctuation", () => {
      assert.equal(
        generateSlug("Distributed Systems: 101 & Beyond!"),
        "distributed-systems-101-beyond"
      );
    });

    it("collapses multiple spaces and underscores", () => {
      assert.equal(generateSlug("hello___world   test"), "hello-world-test");
    });

    it("trims leading and trailing hyphens and whitespace", () => {
      assert.equal(generateSlug("  - leading and trailing -  "), "leading-and-trailing");
    });
  });

  describe("Markdown Parser (renderMarkdown)", () => {
    it("renders headings properly", () => {
      const input = "# Heading 1\n\n## Heading 2\n\n### Heading 3";
      const html = renderMarkdown(input);
      assert.ok(html.includes('<h1 class="mdH1">Heading 1</h1>'));
      assert.ok(html.includes('<h2 class="mdH2">Heading 2</h2>'));
      assert.ok(html.includes('<h3 class="mdH3">Heading 3</h3>'));
    });

    it("renders inline styles: bold, italic, inline code", () => {
      const input = "This is **bold**, *italic*, and `code`.";
      const html = renderMarkdown(input);
      assert.ok(html.includes("<strong>bold</strong>"));
      assert.ok(html.includes("<em>italic</em>"));
      assert.ok(html.includes('<code class="mdInlineCode">code</code>'));
    });

    it("renders code blocks with syntax highlighting classes", () => {
      const input = "```typescript\nconst x: number = 42;\n```";
      const html = renderMarkdown(input);
      assert.ok(html.includes('<pre class="mdCodeBlock"><code class="language-typescript">'));
      assert.ok(html.includes("const x: number = 42;"));
    });

    it("renders images before links without corrupting image tags", () => {
      const input = "![Architecture Diagram](https://example.com/arch.png)";
      const html = renderMarkdown(input);
      assert.ok(html.includes('<img src="https://example.com/arch.png" alt="Architecture Diagram" class="mdImage" />'));
      assert.ok(html.includes('<figcaption class="mdCaption">Architecture Diagram</figcaption>'));
    });

    it("renders links with target blank and rel security attributes", () => {
      const input = "[Live Site](https://example.com)";
      const html = renderMarkdown(input);
      assert.ok(html.includes('href="https://example.com"'));
      assert.ok(html.includes('target="_blank"'));
      assert.ok(html.includes('rel="noopener noreferrer"'));
    });

    it("renders unordered lists correctly", () => {
      const input = "- First item\n- Second item";
      const html = renderMarkdown(input);
      assert.ok(html.includes('<ul class="mdUl">'));
      assert.ok(html.includes('<li class="mdLi">First item</li>'));
      assert.ok(html.includes('<li class="mdLi">Second item</li>'));
    });
  });

  describe("Project Schema Validation (ProjectSchema)", () => {
    it("validates a complete valid project", () => {
      const valid = {
        title: "Distributed Cache",
        slug: "distributed-cache",
        description: "In-memory LRU cache with Raft replication",
        content: "# Full details",
        category: "software",
        github_url: "https://github.com/etor01/cache",
        live_url: "https://cache.example.com",
        status: "active",
        published: "on",
      };
      const result = ProjectSchema.safeParse(valid);
      assert.equal(result.success, true);
    });

    it("rejects project with invalid slug format", () => {
      const invalid = {
        title: "Bad Slug",
        slug: "Invalid Slug With Spaces & Caps!",
        description: "Some description",
        category: "software",
        status: "active",
      };
      const result = ProjectSchema.safeParse(invalid);
      assert.equal(result.success, false);
      assert.ok(result.error.issues.some((i) => i.path[0] === "slug"));
    });

    it("rejects project with invalid status enum", () => {
      const invalid = {
        title: "Invalid Status",
        slug: "invalid-status",
        description: "Some description",
        category: "software",
        status: "non-existent-status",
      };
      const result = ProjectSchema.safeParse(invalid);
      assert.equal(result.success, false);
      assert.ok(result.error.issues.some((i) => i.path[0] === "status"));
    });

    it("rejects project with invalid URL format", () => {
      const invalid = {
        title: "Bad URL",
        slug: "bad-url",
        description: "Some description",
        category: "software",
        status: "active",
        github_url: "not-a-valid-url",
      };
      const result = ProjectSchema.safeParse(invalid);
      assert.equal(result.success, false);
      assert.ok(result.error.issues.some((i) => i.path[0] === "github_url"));
    });
  });

  describe("Note Schema Validation (NoteSchema)", () => {
    it("validates a complete valid note", () => {
      const valid = {
        title: "Reflections on Architecture",
        slug: "reflections-on-architecture",
        excerpt: "A short reflection",
        content: "Complete markdown reflection content here.",
        category: "systems",
        tags_raw: "architecture, scaling",
        published: "on",
      };
      const result = NoteSchema.safeParse(valid);
      assert.equal(result.success, true);
    });

    it("requires title, slug, and content", () => {
      const missing = {
        title: "",
        slug: "",
        content: "",
      };
      const result = NoteSchema.safeParse(missing);
      assert.equal(result.success, false);
      assert.ok(result.error.issues.length >= 3);
    });
  });

  describe("Lab Schema Validation (LabSchema)", () => {
    it("validates a complete valid lab experiment", () => {
      const valid = {
        title: "Memory Profiling Spike",
        slug: "memory-profiling-spike",
        description: "Testing GC pauses on high allocations",
        content: "Analysis findings",
        tools_raw: "pprof, Go, Linux",
        status: "wip",
      };
      const result = LabSchema.safeParse(valid);
      assert.equal(result.success, true);
    });

    it("rejects lab experiment with empty description", () => {
      const invalid = {
        title: "Test",
        slug: "test",
        description: "",
        status: "active",
      };
      const result = LabSchema.safeParse(invalid);
      assert.equal(result.success, false);
      assert.ok(result.error.issues.some((i) => i.path[0] === "description"));
    });
  });
});
