import cn from "classnames";
import { InputField } from "./InputField";

type Props = {
  name: string;
  label: string;
  validate?: (value: string) => string | undefined;
};

export const RangeInput = ({ name, label, validate }: Props) => {
  return (
    <InputField
      name={name}
      validate={validate}
      render={(input, _meta, errorClass) => {
        return (
          <div className="text-left">
            <label
              htmlFor={input.name}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            >
              {label}
            </label>
            <div className="flex justify-center content-center">
              <input
                {...input}
                type="range"
                className={cn(
                  "block text-sm font-medium text-gray-900 w-full",
                  errorClass,
                )}
              />
              <div className="min-h-[30px] min-w-9 pl-3">{input.value}</div>
            </div>
          </div>
        );
      }}
    />
  );
};
