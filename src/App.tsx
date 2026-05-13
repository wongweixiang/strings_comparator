import "./App.css";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import StringComparison from "./ComparisonTable";
import type { Option } from "./constants/options";
import { SearchBox } from "./SearchBox";
import { compareStrings } from "./services/compareStrings";

function App() {
  const [string0, setString0] = useState<Option | null>({ name: "Ashaway Dynamite Soft 18", value: "D18SOFT"  });
  const [string1, setString1] = useState<Option | null>({ name: "Diadem Solstice Pro 16L (1.25)", value: "DSPRO16L" });
  // console.log(string0, string1);

  const { data } = useQuery({
    queryKey: ["string-comparison", string0, string1],
    queryFn: () => compareStrings({
      pcode: string0?.value as string,
      string1pcode: string1?.value as string,
    }),
    enabled: !!string0?.value && !!string1?.value,
  });

  return (
    <>
      <section id="center">
        <SearchBox value={string0} setValue={setString0} />
        <SearchBox value={string1} setValue={setString1} />
        <StringComparison data={data}/>
      </section>
    </>
  );
}

export default App;
