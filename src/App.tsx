import "./App.css";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { SearchBox } from "./SearchBox";
import { compareStrings } from "./services/compareStrings";

function App() {
  const [string1, setString1] = useState("");
  const [string2, setString2] = useState("");
  console.log(string1, string2);

  const query = useQuery({
    queryKey: ["string-comparison", string1, string2],
    queryFn: compareStrings,
    enabled: !!string1 && !!string2,
  });

  return (
    <>
      <section id="center">
        <SearchBox value={string1} setValue={setString1} />
        <SearchBox value={string2} setValue={setString2} />
      </section>
    </>
  );
}

export default App;
