import { FieldInputProps, FieldMetaState, useField } from "react-final-form";
import { FieldError } from "../FieldError";

type Props<Type> = {
  name: string;
  validate?: (value: string) => string | undefined;
  render: (
    input: FieldInputProps<Type>,
    meta: FieldMetaState<Type>,
    errorClass: string,
  ) => JSX.Element;
};

export const InputField = <Type extends string>({
  name,
  validate,
  render,
}: Props<Type>) => {
  const { input, meta } = useField<Type>(name, { validate });

  const errorClass =
    meta.error && meta.touched ? "border-red-500 bg-red-100" : "";

  return (
    <div className="flex flex-col w-full max-w-sm mx-auto p-4 relative pb-5 mb-3">
      <div className="relative">{render(input, meta, errorClass)}</div>

      <FieldError name={name} />
    </div>
  );
};
