import "./App.css";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import StringComparison from "./ComparisonTable";
import { SearchBox } from "./SearchBox";
import { compareStrings } from "./services/compareStrings";

function App() {
  const [string0, setString0] = useState({});
  const [string1, setString1] = useState({});
  // console.log(string0, string1);

  const { data } = useQuery({
    queryKey: ["string-comparison", string0, string1],
    queryFn: () => compareStrings({
      pcode: string0?.value,
      string1pcode: string1?.value,
    }),
    enabled: !!string0 && !!string1,
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
