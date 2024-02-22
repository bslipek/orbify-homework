import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "Welcome" }];
};

export default function Index() {
  return (
    <>
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Create you project using Wizard
        </h1>
        <div className="p-4  m-3">
          Hello there! My name is Bartek.
          <br />I used Remix.run for this project, just for fun. Normally i
          would rather use Next.js. We are missing tests, I know. But hey, it's
          <br />
          Try it, create some project and upload you geoJson, this should work.
          <br />
          There is one{" "}
          <Link className="underline cursor-pointer" to="/projects/demo">
            demo project
          </Link>{" "}
          to check.
        </div>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/wizard"
            className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Get started
          </Link>
        </div>
      </div>
    </>
  );
}
