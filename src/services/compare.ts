// src/api/compare.ts
type StringStats = {
  stiffness: number | string;
  tensionLoss: number | string;
  energyReturn: number | string;
  spinPotential: number | string;
  stringFriction: number | string;
  ballFriction: number | string;
};

type StringData = {
  code: string;
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
