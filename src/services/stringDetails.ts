type FetchStringsProps = {
  name: string;
};

type FetchStringDetailsResponse = Record<string, unknown>;

export async function fetchStringDetails({
  name,
}: FetchStringsProps): Promise<FetchStringDetailsResponse> {
  console.log("Fetching string details for:", name);

  const response = await fetch(
    `/api/string_details?name=${encodeURIComponent(name)}`,
  );

  return response.json();
}
