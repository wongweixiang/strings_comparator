import MultipleSelector, {
  type Option,
} from "@/components/ui/multiple-selector";

type MultipleColumnSelectorProps = {
  onChange?: (value: Option[]) => void;
  defaultOptions?: Option[];
  placeholder?: string;
};

const MultipleOptionSelector = ({
  onChange,
  defaultOptions,
  placeholder,
}: MultipleColumnSelectorProps) => {
  return (
    <MultipleSelector
      onChange={onChange}
      defaultOptions={defaultOptions}
      placeholder={placeholder}
      emptyIndicator={
        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
          No fields found.
        </p>
      }
    />
  );
};

export default MultipleOptionSelector;
