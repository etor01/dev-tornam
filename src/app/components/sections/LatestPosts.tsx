"use client";

import Link from "next/link";
import { BLOG_POSTS } from "../../data/blog";
import { ArrowRight } from "lucide-react";

export default function LatestPosts() {
  return (
    <section className="py-20 px-6 container mx-auto max-w-5xl" id="blog">
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-3xl font-bold text-(--text-primary) tracking-tight">
          Latest Posts
        </h2>
        <Link
          href="/blog"
          className="text-(--primary) font-semibold flex items-center gap-2 hover:gap-3 transition-all"
        >
          View all posts <ArrowRight size={20} />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {BLOG_POSTS.slice(0, 2).map((post) => (
          <Link
            key={post.id}
            href={`/blog/${post.slug}`}
            className="group p-8 rounded-2xl border border-(--border) hover:border-(--primary) hover:shadow-xl hover:shadow-(--muted)/50 transition-all bg-(--card-bg)"
          >
            <div className="flex gap-4 text-(--muted) text-sm font-medium mb-4">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
            <h3 className="text-xl font-bold text-(--text-primary) group-hover:text-(--primary) transition-colors mb-3">
              {post.title}
            </h3>
            <p className="text-(--text-secondary) text-sm leading-relaxed">
              {post.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
