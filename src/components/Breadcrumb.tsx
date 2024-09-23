import { ChevronRightIcon, HomeIcon } from "@heroicons/react/20/solid";
import Link from "./Link";

type BreadcrumbItem = {
  name: string | null | undefined;
  href: string;
};

type BreadcrumbProps = {
  items: Array<BreadcrumbItem>;
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="flex pt-8">
      <ol role="list" className="flex items-center space-x-2">
        <li>
          <div>
            <Link
              href="/projects"
              className="text-gray-400 hover:text-gray-500 select-none"
            >
              <HomeIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {items.map((item, index) => (
          <li key={index}>
            <div className="flex items-center">
              <ChevronRightIcon
                aria-hidden="true"
                className="h-5 w-5 flex-shrink-0 text-gray-400"
              />
              <Link
                href={item.href}
                aria-current={index < items.length - 1 ? undefined : "page"}
                className="ml-2 text-sm font-medium text-gray-500 hover:text-gray-700 select-none"
              >
                {item.name}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
