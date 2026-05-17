import { NextResponse } from "next/server";
import { getPortfolioSummary } from "@/lib/portfolio";
import { VAULTS } from "@/lib/vaults";

export const dynamic = "force-dynamic";

function matchesSearch(vault: (typeof VAULTS)[number], query: string) {
  if (!query) return true;
  const haystack = [
    vault.listName,
    vault.detailTitle,
    vault.provider,
    vault.asset,
    ...vault.tags,
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query.toLowerCase());
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim() ?? "";
  const view = searchParams.get("view") ?? "active";
  const portfolio = getPortfolioSummary();
  const positionIds = new Set(
    portfolio.positions.map((position) => position.vaultId),
  );

  const vaults = VAULTS.filter((vault) => {
    if (!matchesSearch(vault, query)) return false;
    if (view === "my") return positionIds.has(vault.id);
    return true;
  }).map((vault) => ({
    ...vault,
    position:
      portfolio.positions.find((position) => position.vaultId === vault.id) ??
      null,
  }));

  const protocolTvl = VAULTS.reduce((sum, vault) => {
    const match = vault.tvl.match(/^([\d.]+)M/);
    return sum + (match ? Number(match[1]) : 0);
  }, 0);

  return NextResponse.json({
    vaults,
    stats: {
      protocol: {
        activeVaults: VAULTS.length,
        totalTvl: `${protocolTvl.toFixed(1)}M $`,
      },
      personal: {
        activeVaults: portfolio.activeVaults,
        totalTvl: `${portfolio.totalValue.toLocaleString()} $`,
        yearsExperience: "1.5",
      },
    },
  });
}
