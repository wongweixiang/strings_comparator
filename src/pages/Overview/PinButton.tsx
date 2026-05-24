import { Pin } from "lucide-react";

import { cn } from "@/lib/utils";
import { usePinnedStrings } from "@/pages/Overview/usePinnedStrings";

export const PinButton = ({ name }: { name: string }) => {
  const togglePin = usePinnedStrings((state) => state.togglePin);
  const isPinned = usePinnedStrings((state) => state.isPinned);

  return (
    <button onClick={() => togglePin(name)}>
      <Pin
        className={cn(
          isPinned(name)
            ? "fill-current text-blue-500 rotate-45"
            : "text-gray-400",
          "hover:rotate-45 transition-transform",
        )}
        size={16}
      />
    </button>
  );
};
