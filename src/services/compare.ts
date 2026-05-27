// src/api/compare.ts
type StringStats = {
  stiffness: number | null;
  tensionLoss: number | null;
  energyReturn: number | null;
  spinPotential: number | null;
  stringFriction: number | null;
  ballFriction: number | null;
};

type StringData = {
  name: string;
  material: string;
  stats: StringStats;
};

type CompareResponse = {
  stringA: StringData;
  stringB: StringData;
};

export async function fetchComparison(
  idA: string,
  idB: string,
): Promise<CompareResponse> {
  const params = new URLSearchParams({ idA, idB });
  const response = await fetch(`/api/compare?${params}`);

  if (!response.ok) {
    throw new Error("Failed to fetch comparison");
  }

  return response.json();
}
