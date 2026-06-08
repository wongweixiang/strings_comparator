import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { type Option } from "@/components/ui/multiple-selector";
import { fetchStrings } from "@/services/listStrings";

import { BRAND_OPTIONS, getSelectorOptions } from "./helpers";
import MultipleOptionSelector from "./MultipleOptionSelector";
import { SortFieldSelect } from "./SortFieldSelect";
import { StringsTable } from "./StringsTable";

export type TennisString = {
  name: string;
  material: string;
  stiffness: number;
  energyReturn: number;
  tensionLoss: number;
  spinPotential: number;
};

function Overview() {
  const [columns, setColumns] = useState<Option[]>([]);
  const [brands, setBrands] = useState<Option[]>([]);
  const [sortBy, setSortBy] = useState<string>("");

  const { data, isLoading } = useQuery({
    queryKey: ["string-list", brands, sortBy],
    queryFn: () => fetchStrings({ brands: brands.map((b) => b.value), sortBy }),
  });

  return (
    <main className="container mx-auto p-10 ">
      <SortFieldSelect onValueChange={(value: string) => setSortBy(value)} />
      <MultipleOptionSelector
        onChange={setBrands}
        defaultOptions={BRAND_OPTIONS}
        placeholder="Select brands to filter"
      />
      <MultipleOptionSelector
        onChange={setColumns}
        defaultOptions={getSelectorOptions()}
        placeholder="Columns to highlight"
      />

      <StringsTable
        isLoading={isLoading}
        strings={data?.docs || []}
        columns={columns}
      />
    </main>
  );
}

export default Overview;
