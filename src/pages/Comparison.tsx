import "../App.css";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import StringComparison from "../ComparisonTable";
import { SearchBox } from "../SearchBox";
import { fetchComparison } from "../services/compare";

function Comparison() {
  const [string0, setString0] = useState("Toroline O-Toro Spin 17 (1.23)");
  const [string1, setString1] = useState("Diadem Solstice Pro 16L (1.25)");

  const { data } = useQuery({
    queryKey: ["string-comparison", string0, string1],
    queryFn: () => fetchComparison(string0, string1),
    enabled: !!string0 && !!string1,
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
