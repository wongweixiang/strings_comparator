import { type FC } from "react";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { options } from "@/constants/options";

type SearchBoxProps = {
  value?: string;
  setValue?: (value: string) => void;
};

export const SearchBox: FC<SearchBoxProps> = ({ value, setValue }) => {
  return (
    <Combobox items={options} value={value} onValueChange={setValue}>
      <ComboboxInput placeholder="Select a string" />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(string, index) => (
            <ComboboxItem key={`${string.value}-${index}`} value={string.value}>
              {string.name}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};
