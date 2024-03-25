/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx, { ClassValue } from "clsx";
import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { IconType } from "react-icons";
import { MdArrowForwardIos } from "react-icons/md";
import { twMerge } from "tailwind-merge";

const merge = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

interface INavBar {
  children?: React.ReactNode;
  componentLink?: any;
}

const NavBarContext = createContext<INavBarContext>({} as INavBarContext);

const UseNavBar = (): INavBarContext => {
  const context = useContext(NavBarContext);

  return context;
};

interface INavBarContext {
  expanded: boolean;
  changeExpanded: (value: boolean) => void;
  sub?: ReactNode;
  changeSub: (value: ReactNode) => void;
  selected?: string;
  changeSelected: (value?: string) => void;
  Link?: any;
  path?: string;
}

export const NavBar = ({ children, componentLink }: INavBar) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [sub, setSub] = useState<ReactNode>();
  const [selected, setSelected] = useState<string>();
  const [path, setPath] = useState<string | undefined>(location.pathname);
  const [Link] = useState(componentLink);

  const changeExpanded = (isSelect: boolean) => {
    setExpanded(isSelect);
  };

  const changeSub = (isSelect: ReactNode) => {
    setSub(isSelect);
  };

  const changeSelected = (isSelect?: string) => {
    setSelected(isSelect);
  };

  return (
    <NavBarContext.Provider
      value={{
        changeExpanded,
        expanded,
        changeSub,
        sub,
        changeSelected,
        selected,
        Link,
        path,
      }}
    >
      <div
        onClick={() => {
          setPath(location.pathname);
        }}
        className="flex flex-row absolute h-full select-none"
      >
        <div className="flex flex-col min-w-16 h-full bg-[#ededed] overflow-hidden justify-between items-center z-20">
          {children}
        </div>
        {expanded && sub && (
          <div className="flex flex-col bg-slate-50 h-full py-4">
            {selected && <h1 className="font-medium text-lg text-neutral-400 mb-2 px-6">{selected}</h1>}
            <div className="flex flex-col gap-1 overflow-y-auto animate-fade-right animate-duration-200 min-w-64 overflow-hidden justify-start items-start px-6">
              {sub}
            </div>
          </div>
        )}
      </div>
      <div className="min-w-16 h-full" />
    </NavBarContext.Provider>
  );
};

const NavBarHeader = ({ children }: { children?: React.ReactNode }) => {
  return <div className="flex flex-col w-full items-center justify-center h-[12%]">{children}</div>;
};

const NavBarContent = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full items-center justify-start gap-2 h-[76%] overflow-auto scroll-hidden">{children}</div>
  );
};

const NavBarFooter = ({ children }: { children?: React.ReactNode }) => {
  return <div className="flex flex-col w-full items-center justify-center h-[12%]">{children}</div>;
};

const NavBarItem = ({
  children,
  href,
  label,
  link = false,
  icon: IconComponent,
}: {
  children?: React.ReactNode;
  icon: IconType;
  href?: string;
  link?: boolean;
  label: string;
}) => {
  const { changeExpanded, path, Link, selected, expanded, changeSelected, changeSub } = UseNavBar();
  const [A, setA] = useState<any>("span");

  useEffect(() => {
    if (href && link && Link) {
      setA(Link);
    }
  }, [Link, link, href]);

  return (
    <A to={href} className="w-full">
      <div
        onClick={(e) => {
          if (!link) {
            if (e.currentTarget.childNodes[1] && e.currentTarget.childNodes[1].hasChildNodes()) {
              changeSub(children);
              changeSelected(label);

              if (!selected) {
                changeExpanded(!expanded);
              }

              if (label == selected) {
                changeExpanded(!expanded);
                changeSelected();
              }

              return;
            }
          }
          changeSelected();
          changeExpanded(false);
        }}
        className={merge(
          `flex flex-col w-full items-center transition-all duration-300 justify-center h-12 cursor-pointer hover:text-green-500`,
          path && href && path.startsWith(href) ? "text-green-500" : "text-slate-400"
        )}
      >
        <IconComponent size={"20px"} />
        <div className="hidden">{children}</div>
      </div>
    </A>
  );
};

const NavBarGroup = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="flex flex-col py-2 w-full items-center justify-center cursor-pointer text-neutral-400 hover:text-green-200">
      {children}
    </div>
  );
};

const NavBarSubGroup = ({
  children,
  href,
  link = false,
  label,
}: {
  children?: React.ReactNode;
  link?: boolean;
  label?: string;
  href?: string;
}) => {
  const { sub, Link, path } = UseNavBar();
  const [expanded, setExpanded] = useState<boolean>(false);
  const [A, setA] = useState<any>("span");

  useEffect(() => {
    if (href && link && Link) {
      setA(Link);
    } else {
      setA("span");
    }
  }, [Link, link, href]);

  useEffect(() => {
    if (path && href && path.startsWith(href)) {
      setExpanded(true);
    } else setExpanded(false);
  }, [sub]);

  return (
    <A to={href} className="w-full">
      <div
        className={merge(
          "flex flex-col text-sm w-full cursor-pointer items-center justify-start text-neutral-400 hover:text-neutral-600",
          expanded && !link && "text-neutral-600 font-medium",
          !link && path && href && path.startsWith(href) && "text-neutral-800 font-medium",
          link && path && href && path.startsWith(href) && "text-green-600 hover:text-green-600 font-medium"
        )}
      >
        <div className="relative flex flex-row justify-between items-center w-full">
          {label}
          <div
            onClick={() => {
              if (!link) setExpanded(!expanded);
            }}
            className="py-4 w-full h-full absolute"
          />
          <span className="text-neutral-400 hover:text-neutral-400">
            {!link && <MdArrowForwardIos size={14} className={`transition-all ${expanded && "rotate-90"}`} />}
          </span>
        </div>

        <div className={`flex flex-col w-full animate-fade-down animate-duration-75 mt-2 ${(!expanded || link) && "hidden"}`}>
          {children}
        </div>
      </div>
    </A>
  );
};

const NavBarSubGroupItem = ({
  icon: IconComponent,
  label,
  href,
  link = false,
}: {
  children?: React.ReactNode;
  icon: IconType;
  href?: string;
  label: string;
  link?: boolean;
}) => {
  const { Link, path } = UseNavBar();
  const [A, setA] = useState<any>("span");

  useEffect(() => {
    if (href && link && Link) {
      setA(Link);
    }
  }, [Link, link, href]);

  return (
    <A to={href} className="w-full">
      <div
        className={merge(
          "flex flex-row w-full font-light items-center justify-start py-2 pl-4 gap-2 cursor-pointer text-neutral-400 hover:text-neutral-600 hover:font-medium",
          link && path && href && path.startsWith(href) && "text-green-600 hover:text-green-600 font-medium"
        )}
      >
        <IconComponent size={"16px"} />
        {label}
      </div>
    </A>
  );
};

NavBar.Header = NavBarHeader;
NavBar.Content = NavBarContent;
NavBar.Footer = NavBarFooter;
NavBar.Item = NavBarItem;
NavBar.Group = NavBarGroup;
NavBar.SubGroup = NavBarSubGroup;
NavBar.SubGroupItem = NavBarSubGroupItem;

export default NavBar;
