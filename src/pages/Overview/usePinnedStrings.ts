import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { TennisString } from "./index";

interface PinnedStringsStore {
  pinned: TennisString[];
  togglePin: (
    stringData: TennisString,
  ) => "unpinned" | "pinned" | "limit-reached";
  isPinned: (stringData: TennisString) => boolean;
}

export const MAX_PINNED_STRINGS = 3;

export const usePinnedStrings = create<PinnedStringsStore>()(
  persist(
    (set, get) => ({
      pinned: [],
      togglePin: (stringData) => {
        const { pinned } = get();

        const isAlreadyPinned = pinned.some((s) => s.name === stringData.name);

        if (isAlreadyPinned) {
          set({ pinned: pinned.filter((s) => s.name !== stringData.name) });
          return "unpinned";
        }

        if (pinned.length >= MAX_PINNED_STRINGS) {
          return "limit-reached";
        }

        set({ pinned: [...pinned, stringData] });
        return "pinned";
      },
      isPinned: (stringData) =>
        get().pinned.some((s) => s.name === stringData.name),
    }),
    { name: "pinned-strings" },
  ),
);
