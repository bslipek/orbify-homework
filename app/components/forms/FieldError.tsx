import { useField } from "react-final-form";

type Props = {
  name: string;
};

export const FieldError = ({ name }: Props) => {
  const { input, meta } = useField(name, {
    subscription: { error: true, touched: true },
  });

  const error = meta.touched && meta.error;

  if (!error) {
    return null;
  }

  return (
    <span className="animate-bounce absolute -bottom-1 flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
      {error}
    </span>
  );
};
