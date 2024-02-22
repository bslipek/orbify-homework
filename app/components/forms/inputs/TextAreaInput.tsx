import cn from "classnames";
import { InputField } from "./InputField";

type Props = {
  name: string;
  label: string;
  validate?: (value: string) => string | undefined;
};

export const TextAreaInput = ({ name, label, validate }: Props) => {
  return (
    <InputField
      name={name}
      validate={validate}
      render={(input, _meta, errorClass) => {
        return (
          <>
            <textarea
              {...input}
              className={cn(
                "block rounded-lg px-7 pb-2.5 pt-5 w-full text-lg text-gray-900 bg-white  border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer",
                errorClass,
              )}
              placeholder=" "
            />
            <label
              htmlFor={input.name}
              className="absolute text-lg text-gray-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] start-2.5 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4"
            >
              {label}:{" "}
            </label>
          </>
        );
      }}
    />
  );
};
