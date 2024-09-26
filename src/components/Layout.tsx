import { gql } from "@apollo/client";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  TransitionChild,
} from "@headlessui/react";
import {
  ArrowRightStartOnRectangleIcon,
  Bars3Icon,
  Cog6ToothIcon,
  FolderIcon,
  PlusIcon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { ReactNode, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useGetLayoutInfoQuery, UserType } from "../types/graphql";
import { formatUnixDate } from "../utils/format-timestamp";
import { clearAccessToken, hasAccessToken } from "../utils/token-storage";
import CircularProgress from "./CircularProgress";
import CompleteAccount from "./dialogs/CompleteAccount";
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from "./Dropdown";

type LayoutProps = {
  children: ReactNode;
  transparent?: boolean;
};

gql`
  query GetLayoutInfo {
    me {
      type
      name
      username
      tokens
    }
  }
`;

const navigation = [
  { name: "New script", href: "/new-project", icon: PlusIcon },
  { name: "Projects", href: "/projects", icon: FolderIcon },
  { name: "Settings", href: "/settings", icon: Cog6ToothIcon },
];

const faq = [
  { text: "When is the AI Video Generator Launching?", href: "/#launch" },
  { text: "What is the HRC framework?", href: "/#explanation" },
];

const Layout: React.FC<LayoutProps> = ({ children, transparent = false }) => {
  const navigate = useNavigate();

  const { data } = useGetLayoutInfoQuery();

  const [completeAccountOpen, setCompleteAccountOpen] =
    useState<boolean>(false);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [faqOpen, setFaqOpen] = useState<boolean>(false);

  const handleLogout = () => {
    clearAccessToken();
    navigate("/");
  };

  useEffect(() => {
    if (!hasAccessToken()) {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex flex-col w-screen h-screen">
      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="-m-2.5 p-2.5"
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon
                    aria-hidden="true"
                    className="h-6 w-6 text-white"
                  />
                </button>
              </div>
            </TransitionChild>

            <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-2 bg-sidebar ring-1 ring-white/10">
              <div className="flex h-8 w-8 items-center mt-4 select-none">
                <img src="/shadow-logo.png" alt="logo" />
              </div>

              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <NavLink
                            to={item.href}
                            className={({ isActive }) =>
                              clsx(
                                {
                                  "bg-white/5 text-white": isActive,
                                  "text-gray-400 hover:bg-white/5 hover:text-white":
                                    !isActive,
                                },
                                "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 select-none",
                              )
                            }
                          >
                            <item.icon
                              aria-hidden="true"
                              className="h-6 w-6 shrink-0"
                            />
                            {item.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="-mx-6 mt-auto text-gray-200 hover:bg-white/5">
                    <Dropdown>
                      <DropdownButton
                        as="div"
                        className="flex items-center gap-3 w-full px-6 py-3 cursor-pointer"
                      >
                        <div className="w-7">
                          <UserIcon />
                        </div>

                        <div className="text-sm text-left">
                          <h2 className="text-base font-semibold text-ellipsis">
                            {data?.me?.type !== UserType.Guest
                              ? data?.me?.name
                              : "Guest"}
                          </h2>
                          <p className="text-gray-400 text-ellipsis">
                            {data?.me?.username}
                          </p>
                        </div>
                      </DropdownButton>
                      <DropdownMenu
                        className="min-w-64 z-50"
                        anchor="bottom end"
                      >
                        {data?.me?.type === UserType.Guest && (
                          <>
                            <DropdownItem
                              onClick={() => setCompleteAccountOpen(true)}
                            >
                              <UserIcon />
                              <DropdownLabel className="select-none">
                                Complete Account
                              </DropdownLabel>
                            </DropdownItem>

                            <DropdownDivider />
                          </>
                        )}

                        <DropdownItem href="/settings">
                          <Cog6ToothIcon />
                          <DropdownLabel className="select-none">
                            Settings
                          </DropdownLabel>
                        </DropdownItem>

                        <DropdownItem onClick={handleLogout}>
                          <ArrowRightStartOnRectangleIcon />
                          <DropdownLabel className="select-none">
                            Sign out
                          </DropdownLabel>
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 bg-sidebar border-r border-primary-300/10">
          <div className="flex h-8 w-8 items-center mt-4 select-none">
            <img src="/shadow-logo.png" alt="logo" />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                          clsx(
                            {
                              "bg-white/5 text-white": isActive,

                              "text-gray-400 hover:bg-white/5 hover:text-white":
                                !isActive,
                            },
                            "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 select-none",
                          )
                        }
                      >
                        <item.icon
                          aria-hidden="true"
                          className="h-6 w-6 shrink-0"
                        />
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>

              {data?.me.type !== UserType.Default ? null : (
                <li className="-mx-2 mt-auto bg-white/5 rounded-lg flex flex-col p-3 text-gray-400 select-none">
                  <h2 className="text-gray-200 font-bold pb-1 border-b border-gray-600">
                    Voiceover Tokens
                  </h2>
                  <div className="flex mt-1">
                    <div className="flex-1">
                      <p className="flex justify-between text-sm">
                        <span className="font-semibold text-gray-300">
                          Total:{" "}
                        </span>
                        <span>1500</span>
                      </p>
                      <p className="flex justify-between text-sm">
                        <span className="font-semibold text-gray-300">
                          Remaining:{" "}
                        </span>
                        <span>{data.me.tokens}</span>
                      </p>
                      {true && (
                        <p className="flex justify-between text-sm">
                          <span className="font-semibold text-gray-300">
                            Refreshes:{" "}
                          </span>
                          <span>{formatUnixDate(0)}</span>
                        </p>
                      )}
                    </div>
                    <div className="flex items-center pl-4 pr-2">
                      <CircularProgress
                        size={50}
                        pathLength={
                          Math.abs((data?.me.tokens ?? 0) / 1500) * -1
                        }
                        backgroundColor="#374151"
                      >
                        <div className="text-[.6rem] font-bold text-gray-200">
                          {Math.round(
                            Math.abs((data?.me.tokens ?? 0) / 1500) * 100,
                          )}
                          %
                        </div>
                      </CircularProgress>
                    </div>
                  </div>
                </li>
              )}

              <li
                style={
                  data?.me.type !== UserType.Default
                    ? { marginTop: "auto" }
                    : { marginTop: 0 }
                }
                className="-mx-6 mt-auto text-gray-200 hover:bg-white/5"
              >
                <Dropdown>
                  <DropdownButton
                    as="button"
                    className="flex items-center gap-3 w-full px-6 py-3 cursor-pointer"
                  >
                    <div className="w-7">
                      <UserIcon />
                    </div>

                    <div className="text-sm text-left">
                      <h2 className="text-base font-semibold text-ellipsis">
                        {data?.me?.type !== UserType.Guest
                          ? data?.me?.name
                          : "Guest"}
                      </h2>
                      <p className="text-gray-400 text-ellipsis">
                        {data?.me?.username}
                      </p>
                    </div>
                  </DropdownButton>
                  <DropdownMenu className="min-w-64 z-50" anchor="bottom end">
                    {data?.me?.type !== UserType.Guest ? null : (
                      <>
                        <DropdownItem
                          onClick={() => setCompleteAccountOpen(true)}
                        >
                          <UserIcon />
                          <DropdownLabel className="select-none">
                            Complete Account
                          </DropdownLabel>
                        </DropdownItem>

                        <DropdownDivider />
                      </>
                    )}

                    <DropdownItem href="/settings">
                      <Cog6ToothIcon />
                      <DropdownLabel className="select-none">
                        Settings
                      </DropdownLabel>
                    </DropdownItem>

                    <DropdownItem onClick={handleLogout}>
                      <ArrowRightStartOnRectangleIcon />
                      <DropdownLabel className="select-none">
                        Sign out
                      </DropdownLabel>
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div
        className={clsx(
          { "bg-transparent": transparent },
          "sticky top-0 z-40 flex items-center gap-x-6 px-4 py-4 shadow-sm sm:px-6 lg:hidden pointer-events-none",
        )}
      >
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className={clsx(
            { "text-gray-200": transparent, "text-gray-400": !transparent },
            "-m-2.5 p-2.5 lg:hidden pointer-events-auto",
          )}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon
            aria-hidden="true"
            className={clsx({
              "h-8 w-8 stroke-2": transparent,
              "h-6 w-6": !transparent,
            })}
          />
        </button>
      </div>

      <main className="flex-1 overflow-x-hidden overflow-y-auto lg:pl-72">
        <div className="w-full h-full relative">{children}</div>
      </main>

      <CompleteAccount
        open={completeAccountOpen}
        onClose={() => setCompleteAccountOpen(false)}
      />
    </div>
  );
};

export default Layout;
