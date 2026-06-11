import type { FC } from "react";

import { type Option } from "@/components/ui/multiple-selector";

import type { TennisString } from "..";
import { StringCard } from "./StringCard";

type MobileViewProps = {
  sortedStrings: TennisString[];
  columns: Option[];
  statsByColumn: Record<string, { min: number; median: number; max: number }>;
};

export const MobileView: FC<MobileViewProps> = ({
  sortedStrings,
  columns,
  statsByColumn,
}) => {
  return (
    <div className="flex flex-col gap-3 sm:hidden">
      {sortedStrings.map((s) => (
        <StringCard
          key={s.name}
          stringData={s}
          statsByColumn={statsByColumn}
          selectedColumns={columns}
        />
      ))}
    </div>
  );
};
