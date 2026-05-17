import { NextResponse } from "next/server";
import { VAULTS } from "@/lib/vaults";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | {
        action?: string;
        amount?: number;
        asset?: string;
        vaultId?: string;
      }
    | null;

  const action = body?.action === "withdraw" ? "withdraw" : "deposit";
  const amount = Number(body?.amount ?? 0);
  const vault = VAULTS.find((item) => item.id === body?.vaultId);

  if (!vault) {
    return NextResponse.json({ error: "Unknown vault" }, { status: 400 });
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json(
      { error: "Enter an amount greater than 0" },
      { status: 400 },
    );
  }

  return NextResponse.json({
    status: "ready",
    message:
      action === "deposit"
        ? "Deposit intent created. Sign MLA to continue."
        : "Withdrawal request prepared for the next redemption window.",
    intent: {
      id: `intent_${Date.now()}`,
      action,
      amount,
      asset: body?.asset ?? vault.asset,
      vaultId: vault.id,
      vaultName: vault.detailTitle,
    },
  });
}
