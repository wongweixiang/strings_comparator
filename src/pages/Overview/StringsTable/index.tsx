import { useMemo } from "react";

import { type Option } from "@/components/ui/multiple-selector";
import { Spinner } from "@/components/ui/spinner";
import { usePinnedStrings } from "@/pages/Overview/usePinnedStrings";

import type { TennisString } from "..";
import { getColumnStats } from "../helpers";
import { DesktopView } from "./DesktopView";
import { MobileView } from "./MobileView";

export const StringsTable = ({
  isLoading,
  strings,
  columns,
}: {
  isLoading?: boolean;
  strings: TennisString[];
  columns: Option[];
}) => {
  const statsByColumn = {
    stiffness: getColumnStats(strings, (r) => r.stiffness),
    tensionLoss: getColumnStats(strings, (r) => r.tensionLoss),
    energyReturn: getColumnStats(strings, (r) => r.energyReturn),
    spinPotential: getColumnStats(strings, (r) => r.spinPotential),
  };

  const pinnedStrings = usePinnedStrings((state) => state.pinned);

  const sortedStrings = useMemo(() => {
    const pinnedNames = new Set(pinnedStrings.map((s) => s.name));
    return [
      ...pinnedStrings,
      ...strings.filter((s) => !pinnedNames.has(s.name)),
    ];
  }, [pinnedStrings, strings]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center my-52">
        <Spinner className="size-16" />
      </div>
    );
  }

  if (strings.length === 0) {
    return (
      <div className="text-center h-64 text-muted-foreground">
        No strings found.
      </div>
    );
  }

  return (
    <div className="my-6">
      <MobileView
        sortedStrings={sortedStrings}
        columns={columns}
        statsByColumn={statsByColumn}
      />

      <DesktopView
        sortedStrings={sortedStrings}
        columns={columns}
        statsByColumn={statsByColumn}
      />
    </div>
  );
};
