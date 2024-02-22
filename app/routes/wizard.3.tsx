import type { MetaFunction } from "@remix-run/node";
import { RangeInput } from "~/components/forms";
import { composeValidators, required } from "~/lib/validators";

export const meta: MetaFunction = () => {
  return [{ title: "Wizard - Step 1" }];
};

export default function Step3() {
  return (
    <RangeInput
      name="range"
      label="Data range"
      validate={composeValidators(required())}
    />
  );
}
