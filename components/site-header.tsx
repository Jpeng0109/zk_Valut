"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

const nav = [
  { href: "/", label: "Verified Vaults" },
  { href: "/page4", label: "Personal" },
  { href: "/page2?vault=steven-money", label: "Vault detail" },
] as const;

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="font-semibold tracking-[0.2em] text-white hover:text-zkp-accent"
        >
          ZKPASS
        </Link>

        <nav
          className="flex flex-wrap items-center gap-0 text-[11px] font-medium uppercase tracking-wider text-zkp-muted"
          aria-label="Primary"
        >
          {nav.map(({ href, label }, i) => {
            const active =
              href === "/"
                ? pathname === "/"
                : pathname === href.split("?")[0];
            return (
              <span key={href} className="flex items-center">
                {i > 0 && (
                  <span
                    className="mx-2 hidden h-3 w-px bg-white/15 sm:inline"
                    aria-hidden
                  />
                )}
                <Link
                  href={href}
                  className={`px-1 py-1 transition ${
                    active ? "text-white" : "hover:text-white"
                  }`}
                >
                  {label}
                </Link>
              </span>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/page4"
            className="hidden items-center gap-1 rounded border border-white/20 px-3 py-1.5 text-xs font-medium text-white transition hover:border-white/40 sm:inline-flex"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-[11px] font-semibold">
              J
            </span>
            Profile
          </Link>
          <Link
            href="/page4"
            className="inline-flex items-center gap-2 bg-zkp-accent px-4 py-2 text-xs font-bold uppercase tracking-wide text-black transition hover:brightness-110"
          >
            Portfolio
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </header>
  );
}
