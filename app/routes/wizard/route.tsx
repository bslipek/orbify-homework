import type { MetaFunction, ActionFunctionArgs } from "@remix-run/node";

import {
  json,
  unstable_parseMultipartFormData,
  unstable_createMemoryUploadHandler,
  redirect,
} from "@remix-run/node";
import {
  useActionData,
  useLocation,
  useNavigate,
  useSubmit,
  Link,
} from "@remix-run/react";

import { useRef, useCallback, useEffect } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import { Form } from "react-final-form";

import { AnimatedOutlet } from "~/lib/AnimatedOutlet";
import { WizardSubmitButton } from "./WizardSubmitButton";
import {
  composeValidators,
  isValidGeoJSON,
  maxLength,
  required,
} from "~/lib/validators";
import { db } from "~/lib/db.server";

export const meta: MetaFunction = () => {
  return [{ title: "Wizard" }];
};

const NUMBER_OF_STEPS = 4;

export default function Wizard() {
  const location = useLocation();
  const nodeRef = useRef(null);
  const navigate = useNavigate();
  const submit = useSubmit();
  const actionData = useActionData<{ error: Record<string, string> }>();

  const onSubmit = useCallback(
    async (values: Values) => {
      const currentStep = parseInt(location.pathname.split("/").pop()!);

      if (currentStep < NUMBER_OF_STEPS) {
        return navigate(`${currentStep + 1}`);
      }

      const payload = new FormData();
      payload.append("file", values.file[0]);

      for (const [key, value] of Object.entries(values)) {
        if (key !== "file") {
          payload.append(key, value);
        }
      }

      const response = await submit(payload, {
        method: "post",
        encType: "multipart/form-data",
        action: "/wizard",
      });
      // const data = await response.json();
      console.log("Success!", response);
    },
    [location.pathname, navigate, submit],
  );

  useEffect(() => {
    if (location.pathname === "/wizard" && !actionData?.error) {
      return navigate("/wizard/1");
    }
  }, [actionData?.error, location.pathname, navigate]);

  if (actionData?.error) {
    return (
      <>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
          <h1 className="text-lg font-bold">Error</h1>
          <pre className="mt-2">
            {Object.entries(actionData.error)
              .map(([key, value]) => `${key}: ${value}`)
              .join("\n")}
          </pre>
        </div>
        <Link to="/wizard/1" className="text-blue-500 hover:underline">
          Better try again
        </Link>
      </>
    );
  }

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form className="text-center  " onSubmit={handleSubmit}>
          <SwitchTransition>
            <CSSTransition
              key={location.pathname}
              timeout={500}
              nodeRef={nodeRef}
              classNames={{
                enter: "opacity-0",
                enterActive: "opacity-100",
                exitActive: "opacity-0 -translate-y-10",
              }}
            >
              <div ref={nodeRef} className="transition-all duration-500">
                <AnimatedOutlet />
              </div>
            </CSSTransition>
          </SwitchTransition>

          <WizardSubmitButton />
        </form>
      )}
    />
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const uploadHandler = unstable_createMemoryUploadHandler({
    maxPartSize: 500_000,
  });

  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler,
  );

  // Get data
  const name = formData.get("name") as string;
  const description = formData.get("description");
  const range = formData.get("range") as string;
  let file;
  try {
    const blob = formData.get("file") as Blob;
    file = JSON.parse(await blob?.text());
  } catch (e) {
    file = "not a json file";
  }

  const nameValidator = composeValidators(required(), maxLength(32));
  const rangeValidator = composeValidators(required());
  const fileValidator = composeValidators(required(), isValidGeoJSON());

  const error = {
    name: nameValidator(name),
    range: rangeValidator(range),
    file: typeof file === "string" ? file : fileValidator(file),
  };

  // if (Object.values(error).some((e) => e !== undefined)) {
  //   return json({ error });
  // }

  const randomName = Math.random().toString(36).substring(7);
  db[randomName] = { name, description, range, file };

  return redirect(`/projects/${randomName}`);
}
