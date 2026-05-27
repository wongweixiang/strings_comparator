import chroma from "chroma-js";

export const getColumnStats = <T>(rows: T[], accessor: (row: T) => number) => {
  const values = rows
    .map(accessor)
    .filter((v) => Number.isFinite(v))
    .sort((a, b) => a - b);

  const min = values[0];
  const max = values[values.length - 1];

  const middle = Math.floor(values.length / 2);

  const median =
    values.length % 2 === 0
      ? (values[middle - 1] + values[middle]) / 2
      : values[middle];

  return {
    min,
    max,
    median,
  };
};

const headerMapping = {
  name: "Name",
  material: "Material",
  stiffness: "Stiffness (lb/in)",
  energyReturn: "Energy Return (%)",
  tensionLoss: "Tension Loss",
  spinPotential: "Spin Potential",
};

export const mapColumnNames = (data: Record<string, string>[]) => {
  if (data.length === 0) {
    return [];
  }

  const headerKeys = Object.keys(data[0]);

  return headerKeys.map((hk) => headerMapping[hk]);
};

export const getSelectorOptions = () => {
  const columnsToExclude = ["name", "material"];

  return Object.keys(headerMapping)
    .map((key) => ({
      label: headerMapping[key],
      value: key,
    }))
    .filter((option) => !columnsToExclude.includes(option.value));
};

export const getBg = ({
  isSelected,
  value,
  stats,
  higherIsBetter,
}: {
  isSelected: boolean;
  value: number;
  stats: { min: number; max: number; median: number };
  higherIsBetter: boolean;
}) => {
  if (!isSelected) {
    return "transparent";
  }

  const spectrum = higherIsBetter
    ? ["#fecaca", "#ffffff", "#bbf7d0"]
    : ["#bbf7d0", "#ffffff", "#fecaca"];

  const scale = chroma
    .scale(spectrum)
    .domain([stats.min, stats.median, stats.max]);

  return scale(value).hex();
};

export const BRAND_OPTIONS = [
  { label: "Solinco", value: "Solinco" },
  { label: "Toroline", value: "Toroline" },
  { label: "Wilson", value: "Wilson" },
  { label: "Babolat", value: "Babolat" },
  { label: "Head", value: "Head" },
  { label: "Luxilon", value: "Luxilon" },
  { label: "Tecnifibre", value: "Tecnifibre" },
  { label: "Yonex", value: "Yonex" },
  { label: "Prince", value: "Prince" },
  { label: "Gamma", value: "Gamma" },
  { label: "Volkl", value: "Volkl" },
  { label: "Dunlop", value: "Dunlop" },
  { label: "Kirschbaum", value: "Kirschbaum" },
  { label: "Ashaway", value: "Ashaway" },
  { label: "Gosen", value: "Gosen" },
  { label: "Pacific", value: "Pacific" },
];
