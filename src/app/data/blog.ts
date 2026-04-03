export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    date: string;
    readTime: string;
    excerpt: string;
    content: string;
}

export const BLOG_POSTS: BlogPost[] = [
    {
        id: "1",
        slug: "building-scalable-apis-with-go",
        title: "Building Scalable APIs with Go",
        date: "Jan 15, 2024",
        readTime: "8 min read",
        excerpt: "A deep dive into the design patterns and best practices for building high-performance, concurrent APIs using the Go programming language.",
        content: "Full content of the blog post goes here..."
    },
    {
        id: "2",
        slug: "the-art-of-code-review",
        title: "The Art of Code Review",
        date: "Dec 28, 2023",
        readTime: "5 min read",
        excerpt: "Exploring the social and technical aspects of effective code reviews. Learn how to provide constructive feedback and maintain high code quality.",
        content: "Full content of the blog post goes here..."
    }
];
