

type StatConfig = {
  label: string;
  sublabel: string;
  higherIsBetter: boolean;
  format?: (val: number | string) => string;
};

type StringData = {
  name: string;
  gauge: string;
  material: string;
  stats: Record<string, number | string>;
};

const STAT_CONFIG: Record<string, StatConfig> = {
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

const STAT_KEYS = Object.keys(STAT_CONFIG);

const placeholder: StringData = {
  name: "",
  gauge: "",
  material: "",
  stats: {
    stiffness: '',
    tensionLoss: '',
    energyReturn: '',
    spinPotential: '',
    stringFriction: '',
    ballFriction: '',
  },
};

const DIFF_THRESHOLD = 0.03;

function getWinner(
  valA: number,
  valB: number,
  higherIsBetter: boolean
): "A" | "B" | "tie" {
  const diff = Math.abs(valA - valB) / Math.max(valA, valB);
  if (diff < DIFF_THRESHOLD) return "tie";
  if (higherIsBetter) return valA > valB ? "A" : "B";
  return valA < valB ? "A" : "B";
}

function getBarWidth(val: number, max: number): number {
  return Math.round((val / max) * 64);
}

function formatVal(val: number | string, config: StatConfig): string {
  if (config.format) return config.format(val);
  return String(val);
}

type StatRowProps = {
  statKey: string;
  config: StatConfig;
  valA: number | string;
  valB: number | string;
};

function StatRow({ statKey, config, valA, valB }: StatRowProps) {
  const numA = Number(valA);
  const numB = Number(valB);
  const max = Math.max(numA, numB);
  const winner = getWinner(numA, numB, config.higherIsBetter);

  const cellClass = (side: "A" | "B") => {
    const w = winner === side;
    const l = winner !== "tie" && winner !== side;
    return [
      "flex items-center py-3 px-4",
      w ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300" : "",
      l ? "bg-red-50 text-red-800 dark:bg-red-950 dark:text-red-300" : "",
      !w && !l ? "text-gray-700 dark:text-gray-300" : "",
    ]
      .filter(Boolean)
      .join(" ");
  };

  const barColor = (side: "A" | "B") => {
    if (winner === side) return "bg-emerald-400 dark:bg-emerald-600";
    if (winner !== "tie" && winner !== side) return "bg-red-300 dark:bg-red-700";
    return "bg-gray-200 dark:bg-gray-700";
  };

  return (
    <div className="grid grid-cols-[1fr_100px_1fr] sm:grid-cols-[1fr_140px_1fr] border-t border-gray-100 dark:border-gray-800">
      <div className={cellClass("A")}>
        <div className="flex items-center gap-2 justify-end w-full">
          <span className="text-sm font-medium tabular-nums">
            {formatVal(valA, config)}
          </span>
          <div
            className={`hidden sm:block h-1.5 rounded-full ${barColor("A")}`}
            style={{ width: `${getBarWidth(numA, max)}px` }}
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-3 px-2 border-x border-gray-100 dark:border-gray-800">
        <span className="text-xs font-medium text-gray-600 dark:text-gray-400 text-center leading-tight">
          {config.label}
        </span>
        <span className="hidden sm:block text-[10px] text-gray-400 dark:text-gray-500 text-center mt-0.5 leading-tight">
          {config.sublabel}
        </span>
      </div>

      <div className={cellClass("B")}>
        <div className="flex items-center gap-2 w-full">
          <div
            className={`hidden sm:block h-1.5 rounded-full ${barColor("B")}`}
            style={{ width: `${getBarWidth(numB, max)}px` }}
          />
          <span className="text-sm font-medium tabular-nums">
            {formatVal(valB, config)}
          </span>
        </div>
      </div>
    </div>
  );
}

const StringComparison = ({data}) => {
    const dataIncludingPlaceholder = data ?? { stringA: placeholder, stringB: placeholder }

    const {stringA, stringB} = dataIncludingPlaceholder

  return (
    <div className="max-w-2xl mx-auto p-6 font-sans">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 mb-6">
        <div className='flex flex-col justify-center items-center'>
          <img width='150px' src={`https://img.tennis-warehouse.com/watermark/rs.php?path=${stringA.code}-1.jpg`} />
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{stringA.name}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            {stringA.material}
          </p>
        </div>
        <div className="text-xs text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 text-center">
          vs
        </div>
        <div  className='flex flex-col justify-center items-center'>
          <img width='150px' src={`https://img.tennis-warehouse.com/watermark/rs.php?path=${stringB.code}-1.jpg`} />
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{stringB.name}</p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            {stringB.material}
          </p>
        </div>
      </div>

      <div className="border border-gray-100 dark:border-gray-800 rounded-xl overflow-hidden">
        {STAT_KEYS.map((key) => (
          <StatRow
            key={key}
            statKey={key}
            config={STAT_CONFIG[key]}
            valA={stringA.stats[key]}
            valB={stringB.stats[key]}
          />
        ))}
      </div>

      <div className="flex items-center justify-center gap-5 mt-4">
        {[
          {
            color: "bg-emerald-50 border-emerald-300 dark:bg-emerald-950 dark:border-emerald-700",
            label: "better",
          },
          {
            color: "bg-red-50 border-red-300 dark:bg-red-950 dark:border-red-700",
            label: "worse",
          },
          {
            color: "bg-gray-100 border-gray-300 dark:bg-gray-800 dark:border-gray-600",
            label: "marginal diff",
          },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-sm border ${color}`} />
            <span className="text-xs text-gray-400 dark:text-gray-500">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StringComparison