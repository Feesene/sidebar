/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { IconType } from "react-icons";
import { MdArrowDropDown, MdArrowRight } from "react-icons/md";

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
}

export const NavBar = ({ children, componentLink }: INavBar) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [sub, setSub] = useState<ReactNode>();
  const [selected, setSelected] = useState<string>();
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
      }}
    >
      <div className="flex flex-row absolute h-full select-none">
        <div className="flex flex-col min-w-16 h-full bg-[#ededed] overflow-hidden justify-between items-center z-20">
          {children}
        </div>
        {expanded && sub && (
          <div className="flex flex-col gap-1 overflow-y-auto animate-fade-right animate-duration-200 min-w-64 h-full bg-slate-50 overflow-hidden justify-start items-start py-4 px-6">
            {selected && <h1 className="font-medium text-lg text-neutral-400 mb-2">{selected}</h1>}
            {sub}
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
  return <div className="flex flex-col w-full items-center justify-start gap-2 h-[76%] overflow-auto">{children}</div>;
};

const NavBarFooter = ({ children }: { children?: React.ReactNode }) => {
  return <div className="flex flex-col w-full items-center justify-center h-[12%]">{children}</div>;
};

const NavBarItem = ({
  children,
  href,
  label,
  icon: IconComponent,
}: {
  children?: React.ReactNode;
  icon: IconType;
  href?: string;
  label: string;
}) => {
  const { changeExpanded, Link, selected, expanded, changeSelected, changeSub } = UseNavBar();
  const [A, setA] = useState<any>("span");

  useEffect(() => {
    if (href && Link) {
      setA(Link);
    }
  }, [Link, href]);

  return (
    <A to={href} className="w-full">
      <div
        onClick={(e) => {
          if (!href) {
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
        className={`flex flex-col w-full items-center transition-all duration-300 justify-center h-12 cursor-pointer hover:text-green-500 ${
          label == selected ? "text-green-500" : "text-slate-400"
        } `}
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

const NavBarSubGroup = ({ children, href, label }: { children?: React.ReactNode; label?: string; href?: string }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const { sub, Link } = UseNavBar();
  const [A, setA] = useState<any>("span");

  useEffect(() => {
    if (href && Link) {
      setA(Link);
    } else {
      setA("span");
    }
  }, [Link, href]);

  useEffect(() => {
    setExpanded(false);
  }, [sub]);

  return (
    <A to={href} className="w-full teste">
      <div
        onClick={() => {
          if (!href) setExpanded(!expanded);
        }}
        className={`flex flex-col text-sm w-full items-center justify-start cursor-pointer text-neutral-400 hover:text-neutral-600 ${
          expanded && "text-neutral-600 font-medium"
        }`}
      >
        <div className="flex flex-row justify-between items-center w-full">
          {label} {!href && !expanded && <MdArrowRight size={18} />} {!href && expanded && <MdArrowDropDown size={18} />}
        </div>

        <div className={`flex flex-col w-full mt-2 ${!expanded && "hidden"}`}>{children}</div>
      </div>
    </A>
  );
};

const NavBarSubGroupItem = ({
  icon: IconComponent,
  label,
  href,
}: {
  children?: React.ReactNode;
  icon: IconType;
  href?: string;
  label: string;
}) => {
  const { Link } = UseNavBar();
  const [A, setA] = useState<any>("span");

  useEffect(() => {
    if (href && Link) {
      setA(Link);
    }
  }, [Link, href]);

  return (
    <A to={href} className="w-full">
      <div className="flex flex-row w-full font-light items-center justify-start py-2 pl-4 gap-2 cursor-pointer text-neutral-400 hover:text-neutral-600">
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
