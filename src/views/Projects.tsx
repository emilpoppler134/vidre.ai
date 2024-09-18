import { gql } from "@apollo/client";
import {
  BarsArrowUpIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import ActivityIndicator from "../components/ActivityIndicator";
import Breadcrumb from "../components/Breadcrumb";
import Layout from "../components/Layout";
import ProjectList from "../components/ProjectList";
import { useListProjectsQuery } from "../types/graphql";

gql`
  query ListProjects {
    projects {
      id
      name
      script
      timestamp
    }
  }
`;

export default function Projects() {
  const { data, loading } = useListProjectsQuery();

  const breadcrumb = [{ name: "Projects", href: "/projects" }];

  return (
    <Layout>
      <div className="px-8 border-b border-gray-200">
        <Breadcrumb items={breadcrumb} />
        <div className="pt-4 pb-5 sm:flex sm:items-center sm:justify-between">
          <h3 className="text-xl font-semibold leading-6 text-gray-900">
            Projects
          </h3>
          <div className="mt-3 sm:ml-4 sm:mt-0">
            <label htmlFor="mobile-search-project" className="sr-only">
              Search
            </label>
            <label htmlFor="desktop-search-project" className="sr-only">
              Search
            </label>
            <div className="flex rounded-md shadow-sm">
              <div className="relative flex-grow focus-within:z-10">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon
                    aria-hidden="true"
                    className="h-5 w-5 text-gray-400"
                  />
                </div>
                <input
                  id="mobile-search-project"
                  name="mobile-search-project"
                  type="text"
                  placeholder="Search"
                  className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:hidden"
                />
                <input
                  id="desktop-search-project"
                  name="desktop-search-project"
                  type="text"
                  placeholder="Search projects"
                  className="hidden w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-sm leading-6 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:block"
                />
              </div>
              <button
                type="button"
                className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                <BarsArrowUpIcon
                  aria-hidden="true"
                  className="-ml-0.5 h-5 w-5 text-gray-400"
                />
                Sort
                <ChevronDownIcon
                  aria-hidden="true"
                  className="-mr-1 h-5 w-5 text-gray-400"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <ActivityIndicator />
      ) : (
        <ProjectList projects={data?.projects ?? []} />
      )}
    </Layout>
  );
}
