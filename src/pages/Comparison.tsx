import "../App.css";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import StringComparison from "../ComparisonTable";
import { SearchBox } from "../SearchBox";
import { fetchComparison } from "../services/compare";

function Comparison() {
  const [string0, setString0] = useState({
    name: "Volkl V-Square 16 (1.30)",
    value: "VSQ16",
  });

  const [string1, setString1] = useState({
    name: "Babolat RPM Blast Rough 17",
    value: "BRPMBRS",
  });

  const { data } = useQuery({
    queryKey: ["string-comparison", string0.value, string1.value],
    queryFn: () => fetchComparison(string0.value, string1.value),
    enabled: !!string0.value && !!string1.value,
  });

  console.log("Comparison data:", data);

  return (
    <>
      <section id="center">
        <SearchBox value={string0} setValue={setString0} />
        <SearchBox value={string1} setValue={setString1} />
        <StringComparison data={data} />
      </section>
    </>
  );
}

export default Comparison;
