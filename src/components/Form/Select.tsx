import { FormControl, FormLabel, Select, Text } from "@chakra-ui/react";
import { ChangeEvent } from "react";

interface Option {
  name: string;
  value: string | boolean | any;
}

interface SelectProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  options?: Option[] | undefined;
  cssClass?: string;
  type?: string;
  label?: string;
  register?: any;
  errors?: any;
  name: string;
  required?: boolean;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  placeholdertext?: string;
}
export const AppSelect = ({
  label,
  required,
  options,
  errors,
  name,
  cssClass,
  onChange,
  placeholdertext,
  ...props
}: SelectProps) => {
  return (
    <FormControl
      className={`${cssClass ? cssClass : "col-span-3"} sm:col-full sm:mb-5`}
    >
      {label && (
        <FormLabel fontSize="12px">
          {label}
          {required && <span className="text-red-500"> *</span>}
        </FormLabel>
      )}

      <Select
        placeholder={placeholdertext ? placeholdertext : "Select Option"}
        name={name}
        _placeholder={{
          fontSize: "8px",
        }}
        required
        onChange={onChange}
      >
        {options?.map(({ name, value }) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
      </Select>
      {errors && errors[name] && (
        <Text fontSize="8px" color="red">
          {errors[name].message}
        </Text>
      )}
    </FormControl>
  );
};
