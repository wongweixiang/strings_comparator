import { useState } from "react";

export function useAnalysis() {
  const [completion, setCompletion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const complete = async (prompt: string) => {
    setIsLoading(true);
    setCompletion("");

    const response = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });

    const reader = response.body!.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      setCompletion((prev) => prev + decoder.decode(value));
    }

    setIsLoading(false);
  };

  return { completion, isLoading, complete };
}
