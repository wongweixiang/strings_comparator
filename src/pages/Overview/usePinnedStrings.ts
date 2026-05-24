import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PinnedStringsStore {
  pinned: string[];
  togglePin: (name: string) => void;
  isPinned: (name: string) => boolean;
}

export const usePinnedStrings = create<PinnedStringsStore>()(
  persist(
    (set, get) => ({
      pinned: [],
      togglePin: (name) =>
        set((state) => ({
          pinned: state.pinned.includes(name)
            ? state.pinned.filter((s) => s !== name)
            : [...state.pinned, name],
        })),
      isPinned: (name) => get().pinned.includes(name),
    }),
    { name: "pinned-strings" },
  ),
);
