import type { TennisString } from "@/pages/Overview";

type FetchStringsProps = {
  brands?: string[];
  sortBy?: string | undefined;
};

type FetchStringsResponse = {
  docs: TennisString[];
};

export async function fetchStrings({
  brands,
  sortBy,
}: FetchStringsProps): Promise<FetchStringsResponse> {
  console.log("Fetching strings with brands filter:", brands);

  const response = await fetch(
    `/api/strings?brands=${brands?.join(",")}&sortBy=${sortBy}`,
  );
  console.log("tension loss and energy return has a bug, columns reversed");

  return response.json();
}
