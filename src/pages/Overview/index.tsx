import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { type Option } from "@/components/ui/multiple-selector";
import { fetchStrings } from "@/services/listStrings";

import MultipleColumnSelector from "./MultipleColumnSelector";
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

  const { data } = useQuery({
    queryKey: ["string-list"],
    queryFn: () => fetchStrings({ brands: ["Wilson"] }),
  });

  return (
    <main className="container mx-auto p-10 ">
      <MultipleColumnSelector value={columns} onChange={setColumns} />
      <StringsTable strings={data?.docs || []} columns={columns} />
    </main>
  );
}

export default Overview;
