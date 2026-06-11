import { type FC } from "react";
import { Link } from "react-router";

import { type Option } from "@/components/ui/multiple-selector";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PinButton } from "@/pages/Overview/PinButton";

import type { TennisString } from "..";
import { getBg, mapColumnNames } from "../helpers";

type DesktopViewProps = {
  sortedStrings: TennisString[];
  columns: Option[];
  statsByColumn: Record<string, { min: number; median: number; max: number }>;
};

export const DesktopView: FC<DesktopViewProps> = ({
  sortedStrings,
  columns,
  statsByColumn,
}) => {
  const headerValues = mapColumnNames(sortedStrings);

  return (
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
                    isSelected: columns.some((c) => c.value === "energyReturn"),
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
                    isSelected: columns.some((c) => c.value === "tensionLoss"),
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
  );
};
