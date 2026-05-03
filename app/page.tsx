import Link from "next/link";
import {
  ExternalLink,
  LayoutGrid,
  List,
  Search,
  Shield,
} from "lucide-react";
import { VAULTS } from "@/lib/vaults";

export default function VaultListPage() {
  return (
    <main className="flex flex-1 flex-col bg-[#0f111a]">
      <div className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Verified Vaults
              </h1>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-zkp-muted">
                <Shield className="h-3 w-3 text-indigo-400" />
                Powered by zkPass
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <section className="rounded-2xl border border-white/10 bg-zkp-card p-6">
            <p className="text-xs font-medium uppercase tracking-wide text-zkp-muted">
              Protocol Data
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-2xl font-bold tabular-nums text-white">5</p>
                <p className="text-xs text-zkp-muted">Active Vaults</p>
              </div>
              <div>
                <p className="text-2xl font-bold tabular-nums text-white">
                  46.9M $
                </p>
                <p className="text-xs text-zkp-muted">Total TVL</p>
              </div>
            </div>
          </section>
          <section className="rounded-2xl border border-white/10 bg-zkp-card p-6">
            <p className="text-xs font-medium uppercase tracking-wide text-zkp-muted">
              Personal Data
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div>
                <p className="text-xl font-bold text-white">0</p>
                <p className="text-[11px] text-zkp-muted">Active Vaults</p>
              </div>
              <div>
                <p className="text-xl font-bold text-white">0 $</p>
                <p className="text-[11px] text-zkp-muted">Total TVL</p>
              </div>
              <div>
                <p className="text-xl font-bold text-white">1.5</p>
                <p className="text-[11px] text-zkp-muted">Years Experience</p>
              </div>
            </div>
            <Link
              href="/page4"
              className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-sky-400 hover:text-sky-300"
            >
              View Personal Dashboard
              <ExternalLink className="h-3 w-3" />
            </Link>
          </section>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2 rounded-full border border-white/10 bg-black/30 p-1">
            <button
              type="button"
              className="rounded-full bg-sky-500/20 px-4 py-2 text-xs font-semibold text-sky-300"
            >
              Active Vaults
            </button>
            <button
              type="button"
              className="rounded-full px-4 py-2 text-xs font-medium text-zkp-muted hover:text-white"
            >
              My Positions
            </button>
            <button
              type="button"
              className="rounded-full px-4 py-2 text-xs font-medium text-zkp-muted hover:text-white"
            >
              All Vaults
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zkp-muted" />
              <input
                type="search"
                placeholder="Search by name, tags, or asset..."
                className="w-full rounded-lg border border-white/10 bg-black/50 py-2 pl-9 pr-3 text-sm text-white placeholder:text-zkp-muted focus:border-white/20 focus:outline-none"
              />
            </div>
            <button
              type="button"
              className="rounded-lg border border-white/10 p-2 text-zkp-muted hover:text-white"
              aria-label="Grid view"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="rounded-lg border border-white/10 p-2 text-zkp-muted hover:text-white"
              aria-label="List view"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VAULTS.map((v) => (
            <article
              key={v.id}
              className="flex flex-col rounded-xl border border-white/10 bg-[#161922] p-5 shadow-lg transition hover:border-indigo-500/40"
            >
              <div className="flex gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500/40 to-purple-600/30 text-xs font-bold text-white">
                  {v.provider.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold leading-snug text-white">
                    {v.listName}
                  </h2>
                  <p className="text-xs text-zkp-muted">{v.provider}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {v.tags.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-zkp-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-zkp-muted">TVL</p>
                  <p className="font-medium text-white">{v.tvl}</p>
                </div>
                <div>
                  <p className="text-zkp-muted">Filled</p>
                  <p className="font-medium tabular-nums text-white">
                    {v.filled}
                  </p>
                </div>
                <div>
                  <p className="text-zkp-muted">Asset</p>
                  <p className="font-medium text-white">{v.asset}</p>
                </div>
                <div>
                  <p className="text-zkp-muted">Duration</p>
                  <p className="font-medium text-white">{v.duration}</p>
                </div>
              </div>

              <div className="mt-5 border-t border-white/5 pt-4">
                <p className="text-[11px] text-zkp-muted">Expected Net APY</p>
                <p className="text-apy-glow mt-1 text-3xl font-bold tabular-nums leading-none text-sky-400 sm:text-4xl">
                  {v.apy}
                </p>
              </div>

              <Link
                href={`/page2?vault=${v.id}`}
                className="mt-5 block w-full rounded-lg border border-indigo-500/50 bg-black py-2.5 text-center text-sm font-medium text-white transition hover:border-indigo-400 hover:bg-white/5"
              >
                View
              </Link>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
