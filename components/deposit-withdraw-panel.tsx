"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export function DepositWithdrawPanel() {
  const [tab, setTab] = useState<"deposit" | "withdraw">("deposit");

  return (
    <div className="rounded-xl border border-white/10 bg-zkp-card/80 p-5">
      <div className="flex gap-6 border-b border-white/10 pb-3">
        <button
          type="button"
          onClick={() => setTab("deposit")}
          className={`text-sm font-semibold transition ${
            tab === "deposit"
              ? "border-b-2 border-zkp-indigo text-zkp-mint"
              : "text-zkp-muted hover:text-white"
          }`}
        >
          Deposit
        </button>
        <button
          type="button"
          onClick={() => setTab("withdraw")}
          className={`text-sm font-semibold transition ${
            tab === "withdraw"
              ? "border-b-2 border-zkp-indigo text-zkp-danger"
              : "text-zkp-muted hover:text-white"
          }`}
        >
          Withdraw
        </button>
      </div>

      <div className="mt-4 space-y-4">
        <div className="flex rounded-lg border border-white/10 bg-black/40">
          <input
            type="text"
            readOnly
            defaultValue="10.000"
            className="flex-1 bg-transparent px-3 py-2.5 text-sm tabular-nums text-white outline-none"
          />
          <div className="flex items-center border-l border-white/10 px-3 text-xs text-zkp-muted">
            USDC ▾
          </div>
        </div>
        <div className="space-y-1 text-[11px] text-zkp-muted">
          <p>Allowance: 0</p>
          <p>Available: 1,000 USDC</p>
          <p>Minimum Deposit: 1,000 USDC</p>
        </div>
        <p className="text-xs text-zkp-muted">
          Expected Profit: <span className="text-white">~ 0 / month</span>
        </p>
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-zkp-indigo py-3 text-sm font-semibold text-white transition hover:brightness-110"
        >
          Accept & Sign MLA
          <ArrowUpRight className="h-4 w-4" />
        </button>
        <p className="text-center text-[10px] text-zkp-muted">
          Sign Master Loan Agreement before depositing
        </p>
      </div>
    </div>
  );
}
