import type { StringDoc } from "@/services/stringDetails";

import { Analysis } from "./Analysis";

type StringDetailProps = {
  doc: StringDoc;
};

function StatCard({
  label,
  value,
  unit,
  children,
}: {
  label: string;
  value: string | number | null;
  unit?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-md bg-gray-50 dark:bg-gray-900 p-4">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-2xl font-medium text-gray-900 dark:text-gray-100">
        {value ?? "—"}
        {unit && (
          <span className="text-xs font-normal text-gray-400 ml-1">{unit}</span>
        )}
      </p>
      {children}
    </div>
  );
}

function DetailRow({
  label,
  value,
}: {
  label: string;
  value: string | number | null;
}) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800 last:border-0 text-sm">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-900 dark:text-gray-100">
        {value ?? "—"}
      </span>
    </div>
  );
}

export function StringDetailLayout({ doc }: StringDetailProps) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-5">
      {/* header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-1">
            {doc.name}
          </h1>
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              {doc.material}
            </span>
            <span className="text-xs text-gray-400">
              {doc.gaugeNominal} mm nominal
              {doc.gaugeActual ? ` · ${doc.gaugeActual} mm actual` : ""}
            </span>
          </div>
        </div>
        <span className="text-xs text-gray-400 bg-gray-50 dark:bg-gray-900 px-3 py-1 rounded font-mono">
          {doc.custom_id}
        </span>
      </div>

      {/* key stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <StatCard label="Stiffness" value={doc.stiffness} unit="lb/in" />
        <StatCard label="Spin potential" value={doc.spinPotential}>
          <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700 space-y-1.5">
            <div className="flex justify-between">
              <span className="text-[11px] text-gray-400">
                String / string COF
              </span>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                {doc.stringStringCOF ?? "—"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[11px] text-gray-400">
                String / ball COF
              </span>
              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                {doc.stringBallCOF ?? "—"}
              </span>
            </div>
          </div>
        </StatCard>
        <StatCard label="Tension loss" value={doc.tensionLoss} unit="%" />
        <StatCard label="Energy return" value={doc.energyReturn} unit="%" />
      </div>

      {/* AI analysis */}
      <Analysis doc={doc} />

      {/* percentile */}
      <div className="rounded-xl border border-gray-100 dark:border-gray-800 p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-1">
          Percentile vs database
        </p>
        <p className="text-xs text-gray-400 mb-4">
          How this string ranks across all strings in the database
        </p>
        <div className="space-y-3.5">
          {[
            { label: "Stiffness" },
            { label: "Spin potential" },
            { label: "Tension loss" },
            { label: "Energy return" },
          ].map(({ label }) => (
            <div key={label}>
              <div className="flex justify-between mb-1.5">
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {label}
                </span>
                <span className="text-xs text-gray-400">— percentile</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-gray-400 w-6 text-right">
                  low
                </span>
                <div className="flex-1 h-1.5 rounded-full bg-gray-100 dark:bg-gray-800" />
                <span className="text-[11px] text-gray-400 w-6">high</span>
              </div>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-gray-300 dark:text-gray-600 mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
          Percentile data loads from API
        </p>
      </div>

      {/* detail tables */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-xl border border-gray-100 dark:border-gray-800 p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-3">
            Tension & loss
          </p>
          <DetailRow
            label="Ref. tension"
            value={doc.refTension ? `${doc.refTension} lbs` : null}
          />
          <DetailRow
            label="Pre-impact tension"
            value={doc.preImpactTension ? `${doc.preImpactTension} lbs` : null}
          />
          <DetailRow
            label="Tension change"
            value={doc.tensionChange ? `${doc.tensionChange} lbs` : null}
          />
          <DetailRow
            label="Static loss"
            value={doc.staticLoss ? `${doc.staticLoss} lbs` : null}
          />
          <DetailRow
            label="Stabilization loss"
            value={
              doc.stabilizationLoss ? `${doc.stabilizationLoss} lbs` : null
            }
          />
          <DetailRow
            label="Impact loss"
            value={doc.impactLoss ? `${doc.impactLoss} lbs` : null}
          />
          <DetailRow
            label="Total loss"
            value={doc.totalLoss ? `${doc.totalLoss} lbs` : null}
          />
        </div>
        <div className="rounded-xl border border-gray-100 dark:border-gray-800 p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-gray-400 mb-3">
            Impact & stretch
          </p>
          <DetailRow
            label="Dwell time"
            value={doc.dwellTime ? `${doc.dwellTime} ms` : null}
          />
          <DetailRow
            label="Deflection"
            value={doc.deflection ? `${doc.deflection} mm` : null}
          />
          <DetailRow
            label="Peak tension"
            value={doc.peakTension ? `${doc.peakTension} lbs` : null}
          />
          <DetailRow
            label="Peak perp. force"
            value={doc.peakPerpForce ? `${doc.peakPerpForce} lbs` : null}
          />
          <DetailRow
            label="Stretch at 40 lbs"
            value={doc.stretchAt40 ? `${doc.stretchAt40}%` : null}
          />
          <DetailRow
            label="Stretch at 51 lbs"
            value={doc.stretchAt51 ? `${doc.stretchAt51}%` : null}
          />
          <DetailRow
            label="Stretch at 62 lbs"
            value={doc.stretchAt62 ? `${doc.stretchAt62}%` : null}
          />
        </div>
      </div>
    </div>
  );
}
