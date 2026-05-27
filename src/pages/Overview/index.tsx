import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { type Option } from "@/components/ui/multiple-selector";
import { fetchStrings } from "@/services/listStrings";

import MultipleColumnSelector from "./MultipleColumnSelector";
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
  const [sortBy, setSortBy] = useState<string>("");

  const { data } = useQuery({
    queryKey: ["string-list", sortBy],
    queryFn: () => fetchStrings({ brands: ["Wilson"], sortBy }),
  });

  return (
    <main className="container mx-auto p-10 ">
      <SortFieldSelect onValueChange={(value: string) => setSortBy(value)} />
      <MultipleColumnSelector value={columns} onChange={setColumns} />
      <StringsTable strings={data?.docs || []} columns={columns} />
    </main>
  );
}

export default Overview;
