import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { fetchStringDetails } from "@/services/stringDetails";

import { StringDetailLayout } from "./Layout";

const StringDetails = () => {
  const { name } = useParams();

  const { data } = useQuery({
    queryKey: ["string-details", name],
    queryFn: () => fetchStringDetails({ name }),
    enabled: !!name, // Only run the query if name is available
  });

  console.log("String details data:", data);

  if (!data) {
    return <div>Loading...</div>;
  }

  return <StringDetailLayout doc={data} />;
};

export default StringDetails;
