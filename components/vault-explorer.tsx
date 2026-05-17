"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ExternalLink,
  LayoutGrid,
  List,
  Search,
  Shield,
} from "lucide-react";
import type { VaultDetail } from "@/lib/vaults";

type ViewMode = "grid" | "list";
type FilterMode = "active" | "my" | "all";

type VaultWithPosition = VaultDetail & {
  position?: {
    amount: number;
    asset: string;
    unrealizedYield: number;
  } | null;
};

type ApiResponse = {
  vaults: VaultWithPosition[];
  stats: {
    protocol: {
      activeVaults: number;
      totalTvl: string;
    };
    personal: {
      activeVaults: number;
      totalTvl: string;
      yearsExperience: string;
    };
  };
};

const filters: Array<{ id: FilterMode; label: string }> = [
  { id: "active", label: "Active Vaults" },
  { id: "my", label: "My Positions" },
  { id: "all", label: "All Vaults" },
];

const fallbackStats: ApiResponse["stats"] = {
  protocol: {
    activeVaults: 0,
    totalTvl: "0 $",
  },
  personal: {
    activeVaults: 0,
    totalTvl: "0 $",
    yearsExperience: "1.5",
  },
};

export function VaultExplorer({ initialVaults }: { initialVaults: VaultDetail[] }) {
  const [filter, setFilter] = useState<FilterMode>("active");
  const [view, setView] = useState<ViewMode>("grid");
  const [query, setQuery] = useState("");
  const [vaults, setVaults] = useState<VaultWithPosition[]>(initialVaults);
  const [stats, setStats] = useState<ApiResponse["stats"]>({
    ...fallbackStats,
    protocol: {
      activeVaults: initialVaults.length,
      totalTvl: "46.9M $",
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({ view: filter });
    if (query.trim()) params.set("q", query.trim());

    setIsLoading(true);
    fetch(`/api/vaults?${params.toString()}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load vaults");
        return response.json() as Promise<ApiResponse>;
      })
      .then((data) => {
        setVaults(data.vaults);
        setStats(data.stats);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          const normalizedQuery = query.trim().toLowerCase();
          const filtered = initialVaults.filter((vault) => {
            const text = [
              vault.listName,
              vault.provider,
              vault.asset,
              ...vault.tags,
            ]
              .join(" ")
              .toLowerCase();
            return !normalizedQuery || text.includes(normalizedQuery);
          });
          setVaults(filtered);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setIsLoading(false);
      });

    return () => controller.abort();
  }, [filter, initialVaults, query]);

  const emptyLabel = useMemo(() => {
    if (filter === "my") return "No matching positions yet.";
    return "No vaults match this search.";
  }, [filter]);

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
                <p className="text-2xl font-bold tabular-nums text-white">
                  {stats.protocol.activeVaults}
                </p>
                <p className="text-xs text-zkp-muted">Active Vaults</p>
              </div>
              <div>
                <p className="text-2xl font-bold tabular-nums text-white">
                  {stats.protocol.totalTvl}
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
                <p className="text-xl font-bold text-white">
                  {stats.personal.activeVaults}
                </p>
                <p className="text-[11px] text-zkp-muted">Active Vaults</p>
              </div>
              <div>
                <p className="text-xl font-bold text-white">
                  {stats.personal.totalTvl}
                </p>
                <p className="text-[11px] text-zkp-muted">Total TVL</p>
              </div>
              <div>
                <p className="text-xl font-bold text-white">
                  {stats.personal.yearsExperience}
                </p>
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
            {filters.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={`rounded-full px-4 py-2 text-xs transition ${
                  filter === item.id
                    ? "bg-sky-500/20 font-semibold text-sky-300"
                    : "font-medium text-zkp-muted hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative flex-1 sm:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zkp-muted" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by name, tags, or asset..."
                className="w-full rounded-lg border border-white/10 bg-black/50 py-2 pl-9 pr-3 text-sm text-white placeholder:text-zkp-muted focus:border-white/20 focus:outline-none"
              />
            </div>
            <button
              type="button"
              onClick={() => setView("grid")}
              className={`rounded-lg border p-2 transition ${
                view === "grid"
                  ? "border-sky-400/50 bg-sky-400/10 text-sky-300"
                  : "border-white/10 text-zkp-muted hover:text-white"
              }`}
              aria-label="Grid view"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setView("list")}
              className={`rounded-lg border p-2 transition ${
                view === "list"
                  ? "border-sky-400/50 bg-sky-400/10 text-sky-300"
                  : "border-white/10 text-zkp-muted hover:text-white"
              }`}
              aria-label="List view"
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {vaults.length === 0 ? (
          <div className="mt-8 rounded-xl border border-white/10 bg-[#161922] p-8 text-center text-sm text-zkp-muted">
            {isLoading ? "Loading vaults..." : emptyLabel}
          </div>
        ) : (
          <div
            className={
              view === "grid"
                ? "mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
                : "mt-8 flex flex-col gap-4"
            }
          >
            {vaults.map((v) => (
              <article
                key={v.id}
                className={`rounded-xl border border-white/10 bg-[#161922] p-5 shadow-lg transition hover:border-indigo-500/40 ${
                  view === "grid"
                    ? "flex flex-col"
                    : "grid gap-5 md:grid-cols-[1fr_auto_auto]"
                }`}
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

                <div className="mt-4 grid grid-cols-2 gap-3 text-xs md:mt-0">
                  <div>
                    <p className="text-zkp-muted">TVL</p>
                    <p className="font-medium text-white">{v.tvl}</p>
                  </div>
                  <div>
                    <p className="text-zkp-muted">Filled</p>
                    <p className="font-medium tabular-nums text-white">{v.filled}</p>
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

                <div className="mt-5 border-t border-white/5 pt-4 md:mt-0 md:min-w-40 md:border-l md:border-t-0 md:pl-5 md:pt-0">
                  <p className="text-[11px] text-zkp-muted">Expected Net APY</p>
                  <p className="text-apy-glow mt-1 text-3xl font-bold tabular-nums leading-none text-sky-400 sm:text-4xl">
                    {v.apy}
                  </p>
                  {v.position ? (
                    <p className="mt-2 text-[11px] text-zkp-mint">
                      Position: {v.position.amount.toLocaleString()} {v.position.asset}
                    </p>
                  ) : null}
                  <Link
                    href={`/page2?vault=${v.id}`}
                    className="mt-5 block w-full rounded-lg border border-indigo-500/50 bg-black py-2.5 text-center text-sm font-medium text-white transition hover:border-indigo-400 hover:bg-white/5"
                  >
                    View
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
