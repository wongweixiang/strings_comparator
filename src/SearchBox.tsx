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

type StringOption = {
  name: string
  value: string
}

type SearchBoxProps = {
  value?: StringOption;
  setValue?: (value: StringOption) => void;
};

// value={value} onValueChange={setValue}

export const SearchBox: FC<SearchBoxProps> = ({ value, setValue }) => {
  return (
    <Combobox items={options} 
    value={value} onValueChange={setValue}
    itemToStringValue={(option) => option.name}
    >
      <ComboboxInput placeholder="Select a string" 
      />
      <ComboboxContent>
        <ComboboxEmpty>No items found.</ComboboxEmpty>
        <ComboboxList>
          {(string) => (
            <ComboboxItem key={string.name} value={string}>
              {string.name}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
};
