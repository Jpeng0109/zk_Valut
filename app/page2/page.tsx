import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, Circle, ExternalLink, Send } from "lucide-react";
import { DepositWithdrawPanel } from "@/components/deposit-withdraw-panel";
import { getVaultById } from "@/lib/vaults";

type Props = { searchParams: Promise<{ vault?: string }> };

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const { vault } = await searchParams;
  const v = getVaultById(vault);
  return {
    title: `${v.detailTitle} — YieldApp`,
    description: `Vault detail, TVL, and operations for ${v.detailTitle}.`,
  };
}

export default async function VaultDetailPage({ searchParams }: Props) {
  const { vault } = await searchParams;
  const v = getVaultById(vault);

  return (
    <main className="flex-1 bg-[#0d1117]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <p className="text-xs text-zkp-muted">
          <Link href="/" className="text-sky-400 hover:text-sky-300">
            ← Verified Vaults
          </Link>
          <span className="mx-2">·</span>
          <Link href="/page4" className="text-sky-400 hover:text-sky-300">
            Personal
          </Link>
        </p>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <h1 className="text-2xl font-bold text-white sm:text-3xl">
              {v.detailTitle}
            </h1>
            <div className="mt-3 flex flex-wrap gap-2">
              {v.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-white/5 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-zkp-muted"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
              <span className="inline-flex items-center gap-1.5 text-zkp-mint">
                <Circle className="h-2 w-2 fill-current" />
                Live
              </span>
              <span className="inline-flex items-center gap-1 text-white">
                <BadgeCheck className="h-4 w-4 text-sky-400" />
                Verified
              </span>
              <a
                href="#"
                className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300"
              >
                Monad Bridge
                <ExternalLink className="h-3 w-3" />
              </a>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-black px-3 py-1.5 text-xs text-white"
              >
                <Send className="h-3.5 w-3.5" />
                Set Telegram Bot
              </button>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <p className="text-xs text-zkp-muted">Expected Net APY</p>
                <Link
                  href={`/page3?vault=${v.id}`}
                  className="group mt-1 inline-flex flex-col"
                >
                  <span className="text-5xl font-bold tracking-tight text-zkp-indigo transition group-hover:text-indigo-400">
                    {v.apy}
                  </span>
                  <span className="text-xs text-zkp-muted">
                    Tap for yield breakdown →
                  </span>
                </Link>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs text-zkp-muted">TVL</p>
                  <p className="text-lg font-semibold tabular-nums text-white">
                    {v.tvlNumeric}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-zkp-muted">Liquidity</p>
                  <p className="text-lg font-semibold tabular-nums text-white">
                    {v.liquidity}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-zkp-muted">My Current Deposit</p>
                  <p className="text-lg font-semibold text-white">
                    {v.userDeposit}
                  </p>
                </div>
              </div>
            </div>

            <dl className="mt-10 space-y-3 border-t border-white/10 pt-8 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-zkp-muted">Asset</dt>
                <dd className="font-medium text-white">{v.asset}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-zkp-muted">Shares Ticker</dt>
                <dd className="font-medium text-white">{v.sharesTicker}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-zkp-muted">Capacity</dt>
                <dd className="font-medium text-white">{v.capacity}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-zkp-muted">Next Redemption</dt>
                <dd className="font-medium tabular-nums text-white">
                  {v.nextRedemption}
                </dd>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <dt className="text-zkp-muted">Vault Addresses</dt>
                <dd className="flex flex-wrap justify-end gap-2">
                  {v.addresses.map((a) => (
                    <button
                      key={a}
                      type="button"
                      className="rounded-full bg-white/5 px-2.5 py-1 font-mono text-xs text-sky-300 hover:bg-white/10"
                    >
                      {a}
                    </button>
                  ))}
                </dd>
              </div>
            </dl>
          </div>

          <aside className="lg:pt-2">
            <DepositWithdrawPanel />
          </aside>
        </div>

        <section className="mt-14 border-t border-white/10 pt-8">
          <div className="flex flex-wrap gap-6 border-b border-white/10 pb-3 text-sm">
            {["Overview", "Analytics", "Verification", "History", "Vault Provider"].map(
              (label, i) => (
                <button
                  key={label}
                  type="button"
                  className={`border-b-2 pb-2 font-medium transition ${
                    i === 0
                      ? "border-zkp-indigo text-white"
                      : "border-transparent text-zkp-muted hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ),
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold">
            {["All Transactions", "Deposits", "Withdrawals", "Loan & Repayment"].map(
              (label, i) => (
                <span
                  key={label}
                  className={
                    i === 0
                      ? "border-b-2 border-zkp-mint pb-1 text-zkp-mint"
                      : "text-zkp-muted"
                  }
                >
                  {label}
                </span>
              ),
            )}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {[
              ["Total transactions", "101"],
              ["Deposits", "65"],
              ["Total Withdrawals", "7"],
              ["Total volume", "21.83M$"],
              ["24h Transaction Volume", "221.55K$"],
              ["Average transaction", "303.3K$"],
            ].map(([k, val]) => (
              <div key={k} className="rounded-lg bg-white/5 p-4">
                <p className="text-[11px] text-zkp-muted">{k}</p>
                <p className="mt-1 text-lg font-bold tabular-nums text-white">
                  {val}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 overflow-x-auto rounded-xl border border-white/10">
            <table className="w-full min-w-[720px] text-left text-xs">
              <thead className="border-b border-white/10 bg-black/40 text-[11px] uppercase tracking-wide text-zkp-muted">
                <tr>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Date / Time</th>
                  <th className="px-4 py-3 font-medium">From</th>
                  <th className="px-4 py-3 font-medium">Tx Hash</th>
                  <th className="px-4 py-3 font-medium text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                <tr>
                  <td className="px-4 py-3 font-semibold text-zkp-danger">
                    WITHDRAW
                  </td>
                  <td className="px-4 py-3 tabular-nums text-zkp-muted">
                    02.05.26 14:22
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-zkp-mint/15 px-2 py-0.5 font-mono text-[10px] text-zkp-mint">
                      0x71Fd…9a12
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-zkp-mint/15 px-2 py-0.5 font-mono text-[10px] text-zkp-mint">
                      0xabc…def1
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-zkp-danger">
                    -11,020.01 USDC
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-semibold text-zkp-mint">
                    DEPOSIT
                  </td>
                  <td className="px-4 py-3 tabular-nums text-zkp-muted">
                    01.05.26 09:10
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-zkp-mint/15 px-2 py-0.5 font-mono text-[10px] text-zkp-mint">
                      0x3a2c…E2cB
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-zkp-mint/15 px-2 py-0.5 font-mono text-[10px] text-zkp-mint">
                      0x991…002a
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-zkp-mint">
                    +100,000 USDC
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
