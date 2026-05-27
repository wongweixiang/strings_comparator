import MultipleSelector, {
  type Option,
} from "@/components/ui/multiple-selector";

import { getSelectorOptions } from "./helpers";

const OPTIONS: Option[] = getSelectorOptions();

type MultipleColumnSelectorProps = {
  value?: Option[];
  onChange?: (value: Option[]) => void;
};

const MultipleColumnSelector = ({
  value,
  onChange,
}: MultipleColumnSelectorProps) => {
  return (
    <div className="flex w-full flex-col gap-5 px-10">
      <MultipleSelector
        value={value}
        onChange={onChange}
        defaultOptions={OPTIONS}
        placeholder="Columns to highlight"
        emptyIndicator={
          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
            no results found.
          </p>
        }
      />
    </div>
  );
};

export default MultipleColumnSelector;
