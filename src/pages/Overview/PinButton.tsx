import { Pin } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  MAX_PINNED_STRINGS,
  usePinnedStrings,
} from "@/pages/Overview/usePinnedStrings";

import type { TennisString } from "./index";

export const PinButton = ({ stringData }: { stringData: TennisString }) => {
  const togglePin = usePinnedStrings((state) => state.togglePin);
  const isPinned = usePinnedStrings((state) => state.isPinned);

  return (
    <button
      onClick={() => {
        const result = togglePin(stringData);

        if (result === "limit-reached") {
          alert(`You can only pin up to ${MAX_PINNED_STRINGS} strings.`);
        }
      }}
    >
      <Pin
        className={cn(
          isPinned(stringData)
            ? "fill-current text-blue-500 rotate-45"
            : "text-gray-400",
          "hover:rotate-45 transition-transform",
        )}
        size={16}
      />
    </button>
  );
};
