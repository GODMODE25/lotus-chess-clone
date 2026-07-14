"use client";

/**
 * Route-level template for the (dashboard) group.
 *
 * Next.js re-mounts a `template.tsx` on every navigation, which makes it the
 * idiomatic place to apply enter animations during route changes without
 * re-mounting the shared layout (navbar/footer).
 */
export default function DashboardTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="animate-page-enter">{children}</div>;
}
