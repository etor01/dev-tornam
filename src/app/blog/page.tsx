"use client";

import { useState } from "react";
import { BLOG_POSTS, BlogPost } from "../data/blog";
import { X, Clock, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
    const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

    return (
        <main className="bg-white min-h-screen py-20 px-6">
            <div className="container mx-auto max-w-5xl">
                {/* Header */}
                <div className="mb-16">
                    <Link href="/" className="text-blue-600 font-semibold flex items-center gap-2 mb-4 hover:gap-3 transition-all">
                        ← Back to Home
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
                        Blog
                    </h1>
                    <p className="text-slate-500 text-lg max-w-2xl">
                        Thoughts on software engineering, AI, and building digital products.
                    </p>
                </div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {BLOG_POSTS.map((post) => (
                        <article 
                            key={post.id} 
                            className="group flex flex-col bg-white border border-slate-100 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all"
                        >
                            <div className="p-8 flex flex-col flex-1">
                                <div className="flex items-center gap-4 text-slate-400 text-xs font-medium mb-4">
                                    <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                                    <span className="flex items-center gap-1"><Clock size={14} /> {post.readTime}</span>
                                </div>
                                
                                <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                                    {post.title}
                                </h2>
                                
                                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-1">
                                    {post.excerpt}
                                </p>
                                
                                <button 
                                    onClick={() => setSelectedPost(post)}
                                    className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:gap-3 transition-all"
                                >
                                    Read more <ArrowRight size={16} />
                                </button>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedPost && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-slate-900/40 backdrop-blur-sm">
                    <div 
                        className="bg-white w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-50">
                            <div className="flex items-center gap-4 text-slate-400 text-xs font-medium">
                                <span className="flex items-center gap-1"><Calendar size={14} /> {selectedPost.date}</span>
                                <span className="flex items-center gap-1"><Clock size={14} /> {selectedPost.readTime}</span>
                            </div>
                            <button 
                                onClick={() => setSelectedPost(null)}
                                className="p-2 rounded-full hover:bg-slate-50 text-slate-400 hover:text-slate-900 transition-all"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-8 md:p-12 overflow-y-auto">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-8 tracking-tight">
                                {selectedPost.title}
                            </h2>
                            <div className="prose prose-slate max-w-none">
                                <p className="text-slate-600 text-lg leading-relaxed mb-6 italic border-l-4 border-blue-100 pl-6">
                                    {selectedPost.excerpt}
                                </p>
                                <div className="text-slate-700 leading-relaxed space-y-4">
                                    {/* For a real app, this would be markdown or HTML. 
                                        Here we split by newlines for demo purposes. */}
                                    {selectedPost.content.split('\n').map((para, i) => (
                                        <p key={i}>{para}</p>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-slate-50 flex justify-end">
                            <button 
                                onClick={() => setSelectedPost(null)}
                                className="px-6 py-2 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-800 transition-all"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                    
                    {/* Backdrop Click to Close */}
                    <div className="absolute inset-0 -z-10" onClick={() => setSelectedPost(null)}></div>
                </div>
            )}
        </main>
    );
}
