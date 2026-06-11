// src/components/StringCard.tsx
import { Link } from "react-router-dom";

import { type Option } from "@/components/ui/multiple-selector";
import { PinButton } from "@/pages/Overview/PinButton";

import type { TennisString } from "..";
import { getBg } from "../helpers";

type StringCardProps = {
  stringData: TennisString;
  statsByColumn: Record<string, { min: number; max: number; median: number }>;
  selectedColumns: Option[];
};

function StatPill({
  label,
  value,
  backgroundColor,
}: {
  label: string;
  value: number | null;
  backgroundColor: string;
}) {
  return (
    <div
      className="flex flex-col items-center gap-0.5"
      style={{
        backgroundColor,
      }}
    >
      <span className="text-[10px] text-gray-400 uppercase">{label}</span>
      <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
        {value ?? "—"}
      </span>
    </div>
  );
}

export function StringCard({
  stringData,
  statsByColumn,
  selectedColumns,
}: StringCardProps) {
  const {
    name,
    material,
    stiffness,
    tensionLoss,
    energyReturn,
    spinPotential,
  } = stringData;

  return (
    <div className="rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <Link
          to={`/string_details/${encodeURIComponent(name)}`}
          className="flex-1 min-w-0"
        >
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100 leading-snug">
            {name}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">{material}</p>
        </Link>
        <PinButton stringData={stringData} />
      </div>

      <div className="h-px bg-gray-100 dark:bg-gray-800" />

      <div className="grid grid-cols-4 divide-x divide-gray-100 dark:divide-gray-800">
        <StatPill
          label="Stiffness (lb/in)"
          value={stiffness}
          backgroundColor={getBg({
            isSelected: selectedColumns.some((c) => c.value === "stiffness"),
            value: stiffness,
            stats: statsByColumn.stiffness,
            higherIsBetter: false,
          })}
        />
        <StatPill
          label="Tension Loss"
          value={tensionLoss}
          backgroundColor={getBg({
            isSelected: selectedColumns.some((c) => c.value === "tensionLoss"),
            value: tensionLoss,
            stats: statsByColumn.tensionLoss,
            higherIsBetter: false,
          })}
        />
        <StatPill
          label="Energy Return (%)"
          value={energyReturn}
          backgroundColor={getBg({
            isSelected: selectedColumns.some((c) => c.value === "energyReturn"),
            value: energyReturn,
            stats: statsByColumn.energyReturn,
            higherIsBetter: true,
          })}
        />
        <StatPill
          label="Spin Potential"
          value={spinPotential}
          backgroundColor={getBg({
            isSelected: selectedColumns.some(
              (c) => c.value === "spinPotential",
            ),
            value: spinPotential,
            stats: statsByColumn.spinPotential,
            higherIsBetter: true,
          })}
        />
      </div>
    </div>
  );
}
