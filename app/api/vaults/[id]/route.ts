import { NextResponse } from "next/server";
import { getPositionByVaultId } from "@/lib/portfolio";
import { VAULTS } from "@/lib/vaults";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export async function GET(_request: Request, { params }: Props) {
  const { id } = await params;
  const vault = VAULTS.find((item) => item.id === id);

  if (!vault) {
    return NextResponse.json({ error: "Vault not found" }, { status: 404 });
  }

  return NextResponse.json({
    vault,
    position: getPositionByVaultId(id) ?? null,
  });
}
