import type { Metadata } from "next";
import Link from "next/link";
import { Headphones, ThumbsUp } from "lucide-react";

export const metadata: Metadata = {
  title: "Personal — YieldApp",
  description:
    "Personal data overview and vault allocation across YieldApp.",
};

export default function PersonalVaultsPage() {
  return (
    <main className="flex-1 bg-black">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <p className="text-xs text-zkp-muted">
          <Link href="/" className="text-[#9d96f5] hover:text-[#c4bffd]">
            ← Verified Vaults
          </Link>
          <span className="mx-2">·</span>
          <Link
            href="/page2?vault=steven-money"
            className="text-[#9d96f5] hover:text-[#c4bffd]"
          >
            Steven vault detail
          </Link>
        </p>

        <div className="mt-8 space-y-8 sm:space-y-10">
          <section className="rounded-3xl border border-white/10 bg-[#1a1b23] p-6 shadow-xl sm:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="space-y-1">
                <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                  Personal Data Overview
                </h1>
                <p className="max-w-xl text-sm text-zkp-muted sm:text-base">
                  All your assets, yields, and performance across the YieldApp
                  ecosystem.
                </p>
              </div>
              <span className="inline-flex w-fit shrink-0 items-center rounded-full bg-[#9d96f5]/25 px-3 py-1 text-xs font-medium text-[#e8e6ff]">
                Live
              </span>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
              <div className="space-y-1">
                <p className="text-2xl font-semibold tabular-nums tracking-tight text-white sm:text-3xl">
                  24,567
                  <span className="ml-0.5 text-lg font-normal text-zkp-muted sm:text-xl">
                    $
                  </span>
                </p>
                <p className="text-xs text-zkp-muted sm:text-sm">My TVL</p>
              </div>
              <div className="space-y-1">
                <p className="text-lg font-semibold text-indigo-300 tabular-nums sm:text-xl">
                  + $1,234.56
                </p>
                <p className="text-xs text-zkp-muted tabular-nums sm:text-sm">
                  + $234.56 (unrealized)
                </p>
                <p className="text-xs text-zkp-muted sm:text-sm">
                  Intrinsic Yield
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-semibold tabular-nums text-white sm:text-3xl">
                  5
                </p>
                <p className="text-xs text-zkp-muted sm:text-sm">
                  Active Vaults
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-2xl font-semibold tabular-nums text-white sm:text-3xl">
                  12.75%
                </p>
                <p className="text-xs text-zkp-muted sm:text-sm">
                  Current Average APY
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div>
              <h2 className="text-lg font-bold text-white sm:text-xl">
                Vaults
              </h2>
              <div
                className="mt-2 h-1 w-16 rounded-full bg-[#9d96f5]"
                aria-hidden
              />
            </div>

            <div className="rounded-3xl border border-white/10 bg-[#1a1b23] p-6 sm:p-8">
              <h3 className="text-base font-bold text-white sm:text-lg">
                Vaults Allocation
              </h3>
              <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-2xl font-semibold tabular-nums text-white sm:text-3xl">
                    18,200
                    <span className="ml-0.5 text-lg font-normal text-zkp-muted sm:text-xl">
                      $
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-zkp-muted sm:text-sm">
                    Total Value
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-2xl font-semibold tabular-nums text-white sm:text-3xl">
                    74%
                  </p>
                  <p className="mt-1 text-xs text-zkp-muted sm:text-sm">
                    % of Assets
                  </p>
                </div>
              </div>
              <div
                className="mt-6 h-1 w-full overflow-hidden rounded-full bg-zinc-800"
                role="progressbar"
                aria-valuenow={74}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Vaults allocation percent"
              >
                <div className="h-full w-[74%] rounded-full bg-[#9d96f5]" />
              </div>

              <p className="mt-8 text-sm text-zkp-muted">
                Explore vaults on the{" "}
                <Link href="/" className="font-medium text-[#9d96f5] hover:underline">
                  Verified Vaults
                </Link>{" "}
                page — click any card to open detail (B) or view{" "}
                <Link
                  href="/page3?vault=steven-money"
                  className="font-medium text-[#9d96f5] hover:underline"
                >
                  yield breakdown
                </Link>
                .
              </p>
            </div>
          </section>
        </div>

        <div className="pointer-events-none fixed bottom-6 right-6 z-40 flex flex-col gap-2 lg:right-[max(1.5rem,calc(50vw-40rem))]">
          <Link
            href="/page4"
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-[#9d96f5]/40 bg-zinc-900/95 px-4 py-2.5 text-sm font-medium text-white shadow-lg backdrop-blur-md"
          >
            <Headphones className="h-4 w-4 text-[#9d96f5]" />
            Need Help?
          </Link>
          <Link
            href="/page4"
            className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-zinc-900/95 px-4 py-2.5 text-sm font-medium text-slate-200 shadow-lg backdrop-blur-md"
          >
            <ThumbsUp className="h-4 w-4 text-zkp-muted" />
            Feedback
          </Link>
        </div>
      </div>
    </main>
  );
}
