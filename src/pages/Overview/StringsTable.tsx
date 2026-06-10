import { useMemo } from "react";
import { Link } from "react-router";

import { type Option } from "@/components/ui/multiple-selector";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PinButton } from "@/pages/Overview/PinButton";
import { usePinnedStrings } from "@/pages/Overview/usePinnedStrings";

import type { TennisString } from ".";
import { getBg, getColumnStats, mapColumnNames } from "./helpers";
import { StringCard } from "./StringCard";

export const StringsTable = ({
  isLoading,
  strings,
  columns,
}: {
  isLoading?: boolean;
  strings: TennisString[];
  columns: Option[];
}) => {
  const headerValues = mapColumnNames(strings);

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

      <div className="hidden sm:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead />
              {headerValues.map((hv) => (
                <TableHead key={hv}>{hv}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedStrings.map((s) => (
              <TableRow key={s.name}>
                <TableCell>
                  <PinButton stringData={s} />
                </TableCell>
                <Link
                  className="block w-full"
                  key={s.name}
                  to={{
                    pathname: `/string_details/${encodeURIComponent(s.name)}`,
                  }}
                >
                  <TableCell className="font-medium text-left">
                    {s.name}
                  </TableCell>
                </Link>
                <TableCell>{s.material}</TableCell>
                <TableCell
                  style={{
                    backgroundColor: getBg({
                      isSelected: columns.some((c) => c.value === "stiffness"),
                      value: s.stiffness,
                      stats: statsByColumn.stiffness,
                      higherIsBetter: false,
                    }),
                  }}
                >
                  {s.stiffness}
                </TableCell>
                <TableCell
                  className="text-right"
                  style={{
                    backgroundColor: getBg({
                      isSelected: columns.some(
                        (c) => c.value === "energyReturn",
                      ),
                      value: s.energyReturn,
                      stats: statsByColumn.energyReturn,
                      higherIsBetter: true,
                    }),
                  }}
                >
                  {s.energyReturn}
                </TableCell>
                <TableCell
                  className="text-right"
                  style={{
                    backgroundColor: getBg({
                      isSelected: columns.some(
                        (c) => c.value === "tensionLoss",
                      ),
                      value: s.tensionLoss,
                      stats: statsByColumn.tensionLoss,
                      higherIsBetter: false,
                    }),
                  }}
                >
                  {s.tensionLoss}
                </TableCell>
                <TableCell
                  className="text-right"
                  style={{
                    backgroundColor: getBg({
                      isSelected: columns.some(
                        (c) => c.value === "spinPotential",
                      ),
                      value: s.spinPotential,
                      stats: statsByColumn.spinPotential,
                      higherIsBetter: true,
                    }),
                  }}
                >
                  {s.spinPotential}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
