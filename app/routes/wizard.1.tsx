import type { MetaFunction } from "@remix-run/node";
import { TextInput } from "~/components/forms";
import { composeValidators, required, maxLength } from "~/lib/validators";

export const meta: MetaFunction = () => {
  return [{ title: "Wizard - Step 1" }];
};

export default function Step1() {
  return (
    <TextInput
      name="name"
      label="Your name"
      validate={composeValidators(required(), maxLength(32))}
    />
  );
}
