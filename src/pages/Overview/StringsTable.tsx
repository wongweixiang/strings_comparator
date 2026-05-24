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
import { usePinnedStrings } from "@/pages/Overview/usePinnedStrings";

import { getBg, getColumnStats, mapColumnNames } from "./helpers";

export const StringsTable = ({
  strings,
  columns,
}: {
  strings: Record<string, unknown>[];
  columns: Option[];
}) => {
  const headerValues = mapColumnNames(strings);

  const statsByColumn = {
    stiffness: getColumnStats(strings, (r) => r.stiffness),
    energyReturn: getColumnStats(strings, (r) => r.energyReturn),
    spinPotential: getColumnStats(strings, (r) => r.spinPotential),
  };

  const pinnedStrings = usePinnedStrings((state) => state.pinned);
  console.log("Pinned strings:", pinnedStrings);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead />
          {headerValues.map((hv) => (
            <TableHead>{hv}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {strings.map((s) => (
          <TableRow key={s.name}>
            <TableCell className="bg-gray-100">
              <PinButton name={s.name} />
            </TableCell>
            <TableCell className="font-medium bg-gray-100">{s.name}</TableCell>
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
            <TableCell className="text-right">{s.stringStringCOF}</TableCell>
            <TableCell className="text-right">{s.stringBallCOF}</TableCell>
            <TableCell
              className="text-right"
              style={{
                backgroundColor: getBg({
                  isSelected: columns.some((c) => c.value === "spinPotential"),
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
  );
};
