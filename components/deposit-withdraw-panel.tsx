"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

type Props = {
  vaultId?: string;
  asset?: string;
  apy?: string;
};

export function DepositWithdrawPanel({
  vaultId = "steven-money",
  asset = "USDC",
  apy = "0",
}: Props) {
  const [tab, setTab] = useState<"deposit" | "withdraw">("deposit");
  const [amount, setAmount] = useState("1000");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const numericAmount = Number(amount);
  const expectedMonthly = Number.isFinite(numericAmount)
    ? ((numericAmount * Number(apy)) / 100 / 12).toFixed(2)
    : "0.00";

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
          aria-pressed={tab === "deposit"}
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
          aria-pressed={tab === "withdraw"}
        >
          Withdraw
        </button>
      </div>

      <div className="mt-4 space-y-4">
        <div className="flex rounded-lg border border-white/10 bg-black/40">
          <input
            type="number"
            min="0"
            step="100"
            value={amount}
            onChange={(event) => {
              setAmount(event.target.value);
              setMessage("");
              setError("");
            }}
            className="flex-1 bg-transparent px-3 py-2.5 text-sm tabular-nums text-white outline-none"
          />
          <div className="flex items-center border-l border-white/10 px-3 text-xs text-zkp-muted">
            {asset} ▾
          </div>
        </div>
        <div className="space-y-1 text-[11px] text-zkp-muted">
          <p>Allowance: {tab === "deposit" ? "0" : `${amount || "0"} ${asset}`}</p>
          <p>
            Available: {tab === "deposit" ? `1,000 ${asset}` : `${amount || "0"} ${asset}`}
          </p>
          <p>
            {tab === "deposit" ? "Minimum Deposit" : "Minimum Withdrawal"}: 1,000 {asset}
          </p>
        </div>
        <p className="text-xs text-zkp-muted">
          Expected Profit: {" "}
          <span className="text-white">~ {expectedMonthly} {asset} / month</span>
        </p>
        <button
          type="button"
          disabled={isSubmitting}
          onClick={async () => {
            setMessage("");
            setError("");
            setIsSubmitting(true);
            try {
              const response = await fetch("/api/portfolio/intent", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  action: tab,
                  amount: Number(amount),
                  asset,
                  vaultId,
                }),
              });
              const data = (await response.json()) as {
                message?: string;
                error?: string;
              };
              if (!response.ok) throw new Error(data.error ?? "Request failed");
              setMessage(data.message ?? "Request prepared.");
            } catch (caught) {
              setError(caught instanceof Error ? caught.message : "Request failed");
            } finally {
              setIsSubmitting(false);
            }
          }}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-zkp-indigo py-3 text-sm font-semibold text-white transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting
            ? "Preparing..."
            : tab === "deposit"
              ? "Accept & Sign MLA"
              : "Request Withdrawal"}
          <ArrowUpRight className="h-4 w-4" />
        </button>
        {message ? (
          <p className="rounded-lg border border-zkp-mint/20 bg-zkp-mint/10 px-3 py-2 text-xs text-zkp-mint">
            {message}
          </p>
        ) : null}
        {error ? (
          <p className="rounded-lg border border-zkp-danger/20 bg-zkp-danger/10 px-3 py-2 text-xs text-zkp-danger">
            {error}
          </p>
        ) : null}
        <p className="text-center text-[10px] text-zkp-muted">
          {tab === "deposit"
            ? "Sign Master Loan Agreement before depositing"
            : "Withdrawals are queued for the next redemption window"}
        </p>
      </div>
    </div>
  );
}
