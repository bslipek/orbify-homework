type Props = {
  children: React.ReactNode;
  type?: "submit" | "button";
  as?: "button" | React.ElementType;
  className?: string;
  to?: string;
};

export const Button = ({
  children,
  as: Component = "button",
  className = "",
  ...rest
}: Props) => {
  return (
    <Component
      {...rest}
      className={`${className} text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
    >
      {children}
    </Component>
  );
};
