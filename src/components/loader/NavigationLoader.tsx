"use client";

import { useState } from "react";
import Link from "next/link";

export default function NavigationLoader({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Link
        href={href}
        className={className}
        onClick={() => setLoading(true)}
      >
        {children}
      </Link>

      {loading && (
        <div className="top-loader">
          <div className="top-loader-bar" />
        </div>
      )}
    </>
  );
}