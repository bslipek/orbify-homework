import type { MetaFunction } from "@remix-run/node";
import { FileInput } from "~/components/forms";
import { composeValidators, required } from "~/lib/validators";

export const meta: MetaFunction = () => {
  return [{ title: "Wizard - Step 1" }];
};

export default function Step4() {
  return (
    <FileInput
      name="file"
      label="Upload a file"
      validate={composeValidators(required())}
    />
  );
}
