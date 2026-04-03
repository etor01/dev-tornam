"use client";

import Link from "next/link";
import { BLOG_POSTS } from "../../data/blog";
import { ArrowRight } from "lucide-react";

export default function LatestPosts() {
    return (
        <section className="py-20 px-6 container mx-auto max-w-5xl" id="blog">
            <div className="flex justify-between items-end mb-12">
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Latest Posts</h2>
                <Link href="/blog" className="text-blue-600 font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                    View all posts <ArrowRight size={20} />
                </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {BLOG_POSTS.slice(0, 2).map((post) => (
                    <Link key={post.id} href={`/blog/${post.slug}`} className="group p-8 rounded-2xl border border-slate-100 hover:border-blue-100 hover:shadow-xl hover:shadow-slate-200/50 transition-all bg-white">
                        <div className="flex gap-4 text-slate-400 text-sm font-medium mb-4">
                            <span>{post.date}</span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-3">
                            {post.title}
                        </h3>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            {post.excerpt}
                        </p>
                    </Link>
                ))}
            </div>
        </section>
    );
}
