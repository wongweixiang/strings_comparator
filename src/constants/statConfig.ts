export type StatConfig = {
  label: string;
  sublabel: string;
  higherIsBetter: boolean;
  format?: (val: number | string) => string;
};

export const STAT_CONFIG: Record<string, StatConfig> = {
  stiffness: {
    label: "Stiffness",
    sublabel: "lb/in · lower is better",
    higherIsBetter: false,
  },
  tensionLoss: {
    label: "Tension loss",
    sublabel: "% · lower is better",
    higherIsBetter: false,
    format: (v) => `${v}%`,
  },
  energyReturn: {
    label: "Energy return",
    sublabel: "% · higher is better",
    higherIsBetter: true,
    format: (v) => `${v}%`,
  },
  spinPotential: {
    label: "Spin potential",
    sublabel: "higher is better",
    higherIsBetter: true,
  },
  stringFriction: {
    label: "String friction",
    sublabel: "COF · lower is better",
    higherIsBetter: false,
  },
  ballFriction: {
    label: "Ball friction",
    sublabel: "COF · higher is better",
    higherIsBetter: true,
  },
};

export const STAT_KEYS = Object.keys(STAT_CONFIG) as Array<keyof typeof STAT_CONFIG>;