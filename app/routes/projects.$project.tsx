import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { ClientOnly } from "remix-utils/client-only";

import { db } from "~/lib/db.server";
import { Map } from "~/components/Map.client";
import { Button } from "~/components/Button";

export async function loader({ params }: LoaderFunctionArgs) {
  const project = db[params.project as string];

  if (!project) {
    throw new Response(null, {
      status: 404,
      statusText: "Not Found",
    });
  }

  return json({ project });
}

export default function Component() {
  const { project } = useLoaderData<typeof loader>();
  return (
    <div className="p-4">
      <h1 className="text-5xl font-bold mb-2">{project.name}</h1>
      <p className="mb-4">{project.description}</p>
      <ClientOnly>
        {() => <Map data={project.file} height="500px" />}
      </ClientOnly>
      <Button className="mt-4" as={Link} to="/wizard/1">
        Back to Wizard
      </Button>
    </div>
  );
}
