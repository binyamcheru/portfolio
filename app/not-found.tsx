import Link from "next/link";

export default function NotFound() {
  return (
    <div className="py-32">
      <p className="font-mono text-xs text-subtle">404</p>
      <h1 className="mt-3 text-2xl font-medium tracking-tight text-foreground">Page not found</h1>
      <p className="mt-3 text-sm text-muted">The page you’re looking for doesn’t exist or has moved.</p>
      <Link href="/" className="mt-6 inline-block text-sm text-foreground underline underline-offset-4">
        Back to home
      </Link>
    </div>
  );
}
