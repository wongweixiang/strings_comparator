import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { type Option } from "@/components/ui/multiple-selector";

import MultipleSelector from "./MultipleSelector";
import { StringsTable } from "./StringsTable";

export type TennisString = {
  name: string;
  material: string;
  stiffness: number;
  energyReturn: number;
  stringStringCOF: number;
  stringBallCOF: number;
  spinPotential: number;
};

function Overview() {
  const strings: TennisString[] = [
    {
      name: "Weiss Cannon Blue Rock N Power",
      material: "Polyester",
      stiffness: 224,
      energyReturn: 88.7,
      stringStringCOF: 0.059,
      stringBallCOF: 0.654,
      spinPotential: 11.1,
    },
    {
      name: "Volkl Cyclone Tour 16 (1.30)",
      material: "Polyester",
      stiffness: 167.4,
      energyReturn: 83.2,
      stringStringCOF: 0.068,
      stringBallCOF: 0.592,
      spinPotential: 8.7,
    },
    {
      name: "Wilson Revolve 17 (1.25)",
      material: "Polyester",
      stiffness: 192,
      energyReturn: 87.2,
      stringStringCOF: 0.066,
      stringBallCOF: 0.507,
      spinPotential: 7.7,
    },
    {
      name: "Head Hawk 16 (1.30)",
      material: "Polyester",
      stiffness: 230.3,
      energyReturn: 88,
      stringStringCOF: 0.071,
      stringBallCOF: 0.454,
      spinPotential: 6.4,
    },
    {
      name: "Yonex Poly Tour Spin 16L (1.25)",
      material: "Polyester",
      stiffness: 213.7,
      energyReturn: 88.5,
      stringStringCOF: 0.1,
      stringBallCOF: 0.632,
      spinPotential: 6.3,
    },
    {
      name: "Grapplesnake Tour Sniper 1.25",
      material: "Polyester",
      stiffness: 206.3,
      energyReturn: 85.6,
      stringStringCOF: 0.086,
      stringBallCOF: 0.501,
      spinPotential: 5.8,
    },
  ];

  const [columns, setColumns] = useState<Option[]>([]);

  const { data } = useQuery({
    queryKey: ["string-list"],
    queryFn: () => fetchStringList(),
  });

  return (
    <main className="container mx-auto p-10 ">
      <MultipleSelector value={columns} onChange={setColumns} />
      <StringsTable strings={strings} columns={columns} />
    </main>
  );
}

export default Overview;
