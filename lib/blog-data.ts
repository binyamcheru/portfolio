export type BlogPost = {
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    slug: string;
    category: string;
    content: string;
    challenge?: string;
    codeSnippet?: string;
};

export const blogPosts: BlogPost[] = [
    {
        title: "What is Node.js? A Comprehensive Guide",
        excerpt: "Discover why Node.js has become the go-to runtime for building fast, scalable network applications.",
        date: "March 13, 2026",
        readTime: "5 min read",
        slug: "what-is-nodejs",
        category: "Backend",
        content: `Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside a web browser. Built on Chrome's V8 JavaScript engine, it allows developers to use JavaScript for server-side scripting.

### Key Features of Node.js

1. **Event-Driven and Non-blocking I/O**: Node.js uses a single-threaded model with event looping. This allows it to handle thousands of concurrent connections without the overhead of thread context switching.
2. **V8 Engine**: Developed by Google, the V8 engine compiles JavaScript directly into native machine code, making it extremely fast.
3. **NPM (Node Package Manager)**: With over a million packages, NPM is the largest ecosystem of open-source libraries in the world.

### Use Cases

Node.js is ideal for data-intensive, real-time applications such as:
- Chat applications
- Streaming services
- Single-page applications (SPAs)
- APIs and Microservices`,
        challenge: "Traditional server-side environments often struggled with high-concurrency connections due to thread-per-request overhead.",
        codeSnippet: `const http = require('http');

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(3000, '127.0.0.1', () => {
  console.log('Server running at http://127.0.0.1:3000/');
});`,
    },
    {
        title: "Next.js Rendering Strategies Explained",
        excerpt: "SSR, SSG, ISR, and CSR: Understand which rendering strategy to choose for your project's performance and SEO goals.",
        date: "March 12, 2026",
        readTime: "7 min read",
        slug: "nextjs-rendering-strategies",
        category: "Frontend",
        content: `Next.js offers multiple ways to render your content, giving you the flexibility to choose the best approach for each page in your application.

### 1. Static Site Generation (SSG)
SSG generates the HTML at **build time**. The pre-rendered HTML is then reused on each request. It is the most performant strategy as pages can be served via CDN.

### 2. Server-Side Rendering (SSR)
SSR generates the HTML for each page on **each request**. This is useful for pages that display frequently updated data or user-specific information.

### 3. Incremental Static Regeneration (ISR)
ISR allows you to update static pages **after** you've built your site, without needing to rebuild the entire site. You can use ISR to scale to millions of pages while keeping them fast.

### 4. Client-Side Rendering (CSR)
In CSR, the page is rendered entirely on the client side using JavaScript. This is common for sections of a page that don't require SEO or are behind an authentication wall.`,
        challenge: "Choosing between performance (Static) and data freshness (Server) used to be a binary choice. Next.js bridges this gap with ISR.",
        codeSnippet: `// Example of Incremental Static Regeneration (ISR)
export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data');
  const data = await res.json();

  return {
    props: {
      data,
    },
    // Re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10,
  };
}`,
    },
];
