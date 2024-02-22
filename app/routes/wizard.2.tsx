import type { MetaFunction } from "@remix-run/node";
import { TextAreaInput } from "~/components/forms";

export const meta: MetaFunction = () => {
  return [{ title: "Wizard - Step 1" }];
};

export default function Step2() {
  return <TextAreaInput name="description" label="Description" />;
}
