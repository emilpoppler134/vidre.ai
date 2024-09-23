import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import {
  DocumentDuplicateIcon,
  EllipsisHorizontalIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { Project } from "../types/graphql";
import { formatUnixDateTime } from "../utils/format-timestamp";
import Link from "./Link";

type ProjectItemProps = {
  project: Project;
  disabled?: boolean;
  onRemove: (id: string) => void;
};

const ProjectItem: React.FC<ProjectItemProps> = ({
  project,
  disabled = false,
  onRemove,
}) => {
  const navigate = useNavigate();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(project?.script ?? "");
    } catch {}
  };

  return (
    <div className="relative group rounded-lg hover:bg-gray-50">
      <Link
        href={`/projects/${project.id}`}
        className={clsx(
          { "pointer-events-none": disabled },
          "flex flex-col cursor-pointer group",
        )}
      >
        <div className="px-2 pt-2">
          <div className="bg-gray-100 border aspect-video w-full overflow-hidden rounded-lg py-4 flex justify-center">
            <div className="flex flex-col text-[60px] justify-start items-center h-full overflow-hidden p-4 w-2/5 bg-white shadow-md">
              <h2 className="text-[10%] font-semibold mb-[4px] select-none">
                {project.name}
              </h2>
              <span className="text-[10%] text-center select-none text-gray-700">
                {project.script}
              </span>
            </div>
          </div>
        </div>

        <div className="p-2">
          <p
            className={clsx(
              { "group-hover:underline": !disabled },
              "pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900",
            )}
          >
            {project.name}
          </p>
          <p className="pointer-events-none block text-sm font-medium text-gray-500">
            {formatUnixDateTime(project.timestamp)}
          </p>
        </div>
      </Link>

      <Menu as="div" className="absolute top-4 right-4">
        {({ open }) => (
          <>
            <MenuButton
              className={clsx(
                { "opacity-100": open },
                "opacity-0 group-hover:opacity-100",
                "p-1 rounded-lg cursor-default hover:bg-black/5 transition-colors",
              )}
            >
              <EllipsisHorizontalIcon className="w-6 h-6 text-black/60" />
            </MenuButton>

            <MenuItems
              transition
              anchor="bottom end"
              className="w-52 origin-top-right rounded-xl border border-white/5 bg-drowdown p-1 text-sm/6 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
            >
              {disabled ? null : (
                <>
                  <MenuItem>
                    <button
                      onClick={() => navigate(`/projects/${project.id}`)}
                      className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 cursor-default select-none"
                    >
                      <PencilIcon className="size-4 fill-white/75" />
                      Edit
                      <kbd className="ml-auto hidden font-sans text-xs text-white/75 group-data-[focus]:inline">
                        ⌘E
                      </kbd>
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      onClick={handleCopy}
                      className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 cursor-default select-none"
                    >
                      <DocumentDuplicateIcon className="size-4 fill-white/75" />
                      Copy script
                      <kbd className="ml-auto hidden font-sans text-xs text-white/75 group-data-[focus]:inline">
                        ⌘C
                      </kbd>
                    </button>
                  </MenuItem>
                  <div className="my-1 h-px bg-white/5" />
                </>
              )}
              <MenuItem>
                <button
                  onClick={() => onRemove(project.id)}
                  className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10 cursor-default select-none"
                >
                  <TrashIcon className="size-4 fill-white/75" />
                  Delete
                  <kbd className="ml-auto hidden font-sans text-xs text-white/75 group-data-[focus]:inline">
                    ⌘D
                  </kbd>
                </button>
              </MenuItem>
            </MenuItems>
          </>
        )}
      </Menu>
    </div>
  );
};

export default ProjectItem;
