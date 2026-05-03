import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black py-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-xs text-zkp-muted sm:flex-row sm:px-6">
        <p>© 2026 Credence. All rights reserved.</p>
        <div className="flex gap-8">
          <Link href="#" className="transition hover:text-white">
            Privacy Policy
          </Link>
          <Link href="#" className="transition hover:text-white">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
