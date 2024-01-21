import { CSSObjectWithLabel, GroupBase, OptionProps } from "react-select";
import { MetricOption } from "./CreateReport.types";

export const selectConfig = {
  control: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    backgroundColor: "#111827",
    borderColor: "#424b57",
    padding: "4px",
  }),
  option: (
    baseStyles: CSSObjectWithLabel,
    state: OptionProps<MetricOption, true, GroupBase<MetricOption>>,
  ) => ({
    ...baseStyles,
    backgroundColor: state.isFocused ? "#202836" : "#111827",
  }),
  menu: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    backgroundColor: "#111827",
  }),
  multiValueRemove: (baseStyles: CSSObjectWithLabel) => ({
    ...baseStyles,
    color: "#111827",
  }),
};
