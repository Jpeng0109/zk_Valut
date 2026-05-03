import type { Metadata } from "next";
import Link from "next/link";
import {
  Coffee,
  ExternalLink,
  Info,
  Leaf,
  Lock,
  Sparkles,
} from "lucide-react";
import { VaultPriceChart } from "@/components/vault-price-chart";
import { getVaultById } from "@/lib/vaults";

type Props = { searchParams: Promise<{ vault?: string }> };

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { vault } = await searchParams;
  const v = getVaultById(vault);
  return {
    title: `Yield breakdown — ${v.detailTitle}`,
    description: "Share price and expected net APY breakdown.",
  };
}

export default async function YieldBreakdownPage({ searchParams }: Props) {
  const { vault } = await searchParams;
  const v = getVaultById(vault);

  return (
    <main className="relative flex-1 bg-black pb-28">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-zkp-muted">
            <Link
              href={`/page2?vault=${v.id}`}
              className="text-sky-400 hover:text-sky-300"
            >
              ← Back to vault
            </Link>
            <span className="mx-2">·</span>
            <Link href="/" className="text-sky-400 hover:text-sky-300">
              All vaults
            </Link>
            <span className="mx-2">·</span>
            <Link href="/page4" className="text-sky-400 hover:text-sky-300">
              Personal
            </Link>
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <section className="rounded-3xl border border-white/10 bg-[#1a1b23] p-6 sm:p-8">
            <div className="flex items-start justify-between gap-2">
              <h2 className="text-lg font-semibold text-white sm:text-xl">
                Share Price Over Time{" "}
                <span className="tabular-nums text-sky-300">1.00987 USDC</span>
              </h2>
              <button
                type="button"
                className="text-zkp-muted hover:text-white"
                aria-label="Info"
              >
                <Info className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-6">
              <VaultPriceChart />
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-[#1a1b23] p-6 sm:p-8">
            <div className="flex items-start gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-medium uppercase tracking-wide text-zkp-muted">
                    Expected Net APY
                  </p>
                  <Info className="h-3.5 w-3.5 text-zkp-muted" />
                </div>
                <p className="mt-2 text-5xl font-bold tracking-tight text-sky-500">
                  {v.apy}
                </p>
                <p className="mt-1 text-xs text-zkp-muted">Projected</p>
              </div>
            </div>

            <ul className="mt-10 space-y-5 border-t border-white/10 pt-8 text-sm">
              <li className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2 text-zkp-muted">
                  <Lock className="h-4 w-4 shrink-0 text-zkp-muted" />
                  Native APY
                </span>
                <span className="font-semibold tabular-nums text-white">
                  10.0%
                </span>
              </li>
              <li className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <span className="flex items-center gap-2 text-zkp-muted">
                  <Sparkles className="h-4 w-4 shrink-0 text-amber-400" />
                  Rewards
                </span>
                <div className="flex flex-wrap items-center gap-2 sm:justify-end">
                  <span className="font-semibold tabular-nums text-white">
                    2.87%
                  </span>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 rounded border border-white/20 bg-black px-2 py-1 text-[10px] font-medium text-white"
                  >
                    Claim
                    <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              </li>
              <li className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2 text-zkp-muted">
                  <Leaf className="h-4 w-4 shrink-0 text-green-400" />
                  Points
                </span>
                <span className="font-semibold text-white">~3%</span>
              </li>
              <li className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2 text-zkp-muted">
                  <Coffee className="h-4 w-4 shrink-0 text-orange-300" />
                  Yuzu Juice Points
                </span>
                <span className="font-semibold text-white">×3</span>
              </li>
              <li className="flex flex-col gap-1 border-t border-white/10 pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-zkp-muted">Performance Fee</span>
                  <span className="font-semibold tabular-nums text-red-500">
                    -0.3%
                  </span>
                </div>
                <p className="text-right text-[11px] text-red-500/90">
                  Daily average
                </p>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs">
              <button
                type="button"
                className="inline-flex items-center gap-1.5 text-zkp-muted hover:text-white"
              >
                <Info className="h-3.5 w-3.5" />
                Where is the yield coming from?
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300"
              >
                Learn more
                <ExternalLink className="h-3 w-3" />
              </button>
            </div>
          </section>
        </div>

        <p className="mx-auto mt-12 max-w-4xl text-center text-[11px] leading-relaxed text-zkp-muted sm:text-xs">
          Yields shown are estimates based on current strategy allocations and
          incentive programs. They may change at any time and are not
          guaranteed. Your returns depend on market conditions, strategy
          performance, and incentive emissions. You may earn more or less than
          the projected APY.
        </p>
      </div>

      <div className="pointer-events-none fixed bottom-6 right-6 z-40 flex flex-col gap-2">
        <Link
          href="/page4"
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-indigo-500/40 bg-zinc-900/95 px-4 py-2.5 text-sm font-medium text-white shadow-lg backdrop-blur-md transition hover:border-indigo-400"
        >
          Need Help?
        </Link>
        <Link
          href="/page4"
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white px-4 py-2.5 text-sm font-medium text-black shadow-lg transition hover:bg-white/90"
        >
          Feedback
        </Link>
      </div>
    </main>
  );
}
