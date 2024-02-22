import { Button } from "~/components/Button";

type Props = {
  className?: string;
};

export const WizardSubmitButton = ({ className }: Props) => {
  return (
    <Button type="submit" {...{ className }}>
      Go to next step
      <svg
        className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 10"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 5h12m0 0L9 1m4 4L9 9"
        />
      </svg>
    </Button>
  );
};
