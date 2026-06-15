type FetchStringsProps = {
  name: string;
};

export type StringDoc = {
  custom_id: string;
  name: string;
  material: string;
  gaugeNominal: number | null;
  gaugeActual: number | null;
  stiffness: number | null;
  spinPotential: number | null;
  tensionLoss: number | null;
  energyReturn: number | null;
  stringStringCOF: number | null;
  stringBallCOF: number | null;
  refTension: number | null;
  preImpactTension: number | null;
  tensionChange: number | null;
  staticLoss: number | null;
  stabilizationLoss: number | null;
  impactLoss: number | null;
  totalLoss: number | null;
  dwellTime: number | null;
  deflection: number | null;
  peakTension: number | null;
  peakPerpForce: number | null;
  stretchAt40: number | null;
  stretchAt51: number | null;
  stretchAt62: number | null;
};

type FetchStringDetailsResponse = StringDoc;

export async function fetchStringDetails({
  name,
}: FetchStringsProps): Promise<FetchStringDetailsResponse> {
  console.log("Fetching string details for:", name);

  const response = await fetch(
    `/api/string_details?name=${encodeURIComponent(name)}`,
  );

  return response.json();
}
