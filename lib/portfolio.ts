import { VAULTS } from "@/lib/vaults";

export type PortfolioPosition = {
  vaultId: string;
  amount: number;
  asset: string;
  unrealizedYield: number;
};

export const PORTFOLIO_POSITIONS: PortfolioPosition[] = [
  {
    vaultId: "steven-money",
    amount: 10000,
    asset: "USDC",
    unrealizedYield: 129.45,
  },
  {
    vaultId: "hyperithm-delta",
    amount: 7200,
    asset: "USDC",
    unrealizedYield: 58.12,
  },
  {
    vaultId: "stable-max",
    amount: 3000,
    asset: "USDC",
    unrealizedYield: 24.87,
  },
];

export function getPortfolioSummary() {
  const totalValue = PORTFOLIO_POSITIONS.reduce((sum, item) => sum + item.amount, 0);
  const totalYield = PORTFOLIO_POSITIONS.reduce(
    (sum, item) => sum + item.unrealizedYield,
    0,
  );
  const activeVaults = PORTFOLIO_POSITIONS.length;
  const weightedApy =
    PORTFOLIO_POSITIONS.reduce((sum, item) => {
      const vault = VAULTS.find((v) => v.id === item.vaultId);
      return sum + item.amount * Number(vault?.apyNumeric ?? 0);
    }, 0) / Math.max(totalValue, 1);

  return {
    totalValue,
    totalYield,
    activeVaults,
    weightedApy,
    positions: PORTFOLIO_POSITIONS,
  };
}

export function getPositionByVaultId(vaultId: string) {
  return PORTFOLIO_POSITIONS.find((position) => position.vaultId === vaultId);
}
