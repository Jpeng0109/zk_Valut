export type VaultListItem = {
  id: string;
  listName: string;
  detailTitle: string;
  provider: string;
  apy: string;
  apyNumeric: string;
  tvl: string;
  filled: string;
  asset: string;
  duration: string;
  tags: string[];
};

export type VaultDetail = VaultListItem & {
  sharesTicker: string;
  capacity: string;
  nextRedemption: string;
  addresses: string[];
  liquidity: string;
  userDeposit: string;
  tvlNumeric: string;
};

export const VAULTS: VaultDetail[] = [
  {
    id: "steven-money",
    listName: "Steven Money Vault",
    detailTitle: "Steven Personal Vault",
    provider: "Yuzu Money",
    apy: "15.57%",
    apyNumeric: "15.57",
    tvl: "19.8M USDC",
    tvlNumeric: "19,879,347.63 USDC",
    filled: "99.39%",
    asset: "USDC",
    duration: "∞",
    tags: ["YIELD", "OPEN TERM", "PERMISSIONLESS"],
    sharesTicker: "YZM",
    capacity: "20M $USDC",
    nextRedemption: "30.01.26 22:59",
    addresses: ["0x3a2c…E2cB", "0x71Fd…9a12", "0xC02a…bBc"],
    liquidity: "102,985.67 USDC",
    userDeposit: "0 $",
  },
  {
    id: "hyperithm-delta",
    listName: "Hyperithm Delta Neutral Vault",
    detailTitle: "Hyperithm Delta Neutral Vault",
    provider: "Hyperithm",
    apy: "12.40%",
    apyNumeric: "12.40",
    tvl: "8.2M USDC",
    tvlNumeric: "8,200,000.00 USDC",
    filled: "82.10%",
    asset: "USDC",
    duration: "∞",
    tags: ["OPEN TERM", "DELTA NEUTRAL"],
    sharesTicker: "HDN",
    capacity: "10M $USDC",
    nextRedemption: "15.02.26 18:00",
    addresses: ["0x9f1c…A01b"],
    liquidity: "340,120.00 USDC",
    userDeposit: "0 $",
  },
  {
    id: "yuzu-credit",
    listName: "Yuzu Credit Vault",
    detailTitle: "Yuzu Credit Vault",
    provider: "Yuzu Money",
    apy: "18.20%",
    apyNumeric: "18.20",
    tvl: "4.1M USDC",
    tvlNumeric: "4,100,000.00 USDC",
    filled: "95.00%",
    asset: "USDC",
    duration: "180d",
    tags: ["CREDIT", "TERM"],
    sharesTicker: "YCR",
    capacity: "5M $USDC",
    nextRedemption: "01.03.26 12:00",
    addresses: ["0x44Cf…21Aa"],
    liquidity: "88,400.00 USDC",
    userDeposit: "0 $",
  },
  {
    id: "monad-bridge",
    listName: "Monad Bridge Vault",
    detailTitle: "Monad Bridge Vault",
    provider: "Monad Labs",
    apy: "9.85%",
    apyNumeric: "9.85",
    tvl: "12.4M USDC",
    tvlNumeric: "12,400,000.00 USDC",
    filled: "71.25%",
    asset: "USDC",
    duration: "∞",
    tags: ["BRIDGE", "PERMISSIONLESS"],
    sharesTicker: "MBV",
    capacity: "18M $USDC",
    nextRedemption: "22.01.26 09:30",
    addresses: ["0x55ee…cD90"],
    liquidity: "1.2M USDC",
    userDeposit: "0 $",
  },
  {
    id: "stable-max",
    listName: "Stable Yield Max",
    detailTitle: "Stable Yield Max",
    provider: "Credence",
    apy: "11.05%",
    apyNumeric: "11.05",
    tvl: "2.8M USDC",
    tvlNumeric: "2,800,000.00 USDC",
    filled: "56.00%",
    asset: "USDC",
    duration: "∞",
    tags: ["STABLE", "OPEN TERM"],
    sharesTicker: "SYM",
    capacity: "5M $USDC",
    nextRedemption: "10.02.26 20:00",
    addresses: ["0xAAbb…ccDD"],
    liquidity: "402,000.00 USDC",
    userDeposit: "0 $",
  },
  {
    id: "defi-blue",
    listName: "DeFi Blue Chip",
    detailTitle: "DeFi Blue Chip",
    provider: "Blue DeFi",
    apy: "14.10%",
    apyNumeric: "14.10",
    tvl: "6.5M USDC",
    tvlNumeric: "6,500,000.00 USDC",
    filled: "88.90%",
    asset: "ETH",
    duration: "∞",
    tags: ["DEFI", "CREDIT"],
    sharesTicker: "DBC",
    capacity: "8M $ETH",
    nextRedemption: "05.03.26 14:45",
    addresses: ["0x77aa…ff00"],
    liquidity: "220,500.00 USDC",
    userDeposit: "0 $",
  },
];

export function getVaultById(id: string | undefined): VaultDetail {
  if (!id) return VAULTS[0];
  return VAULTS.find((v) => v.id === id) ?? VAULTS[0];
}
