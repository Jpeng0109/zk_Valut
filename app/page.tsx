import { VaultExplorer } from "@/components/vault-explorer";
import { VAULTS } from "@/lib/vaults";

export default function VaultListPage() {
  return <VaultExplorer initialVaults={VAULTS} />;
}
