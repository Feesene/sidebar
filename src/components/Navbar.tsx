import React, { createContext, useContext, useState } from "react";
import { IconType } from "react-icons";

interface INavBar {
  children?: React.ReactNode;
}

const NavBarContext = createContext<INavBarContext>({} as INavBarContext);

const UseNavBar = (): INavBarContext => {
  const context = useContext(NavBarContext);

  return context;
};

interface INavBarContext {
  expanded: boolean;
  changeExpanded: (value: boolean) => void;
  sub?: NodeListOf<ChildNode>;
  changeSub: (value: NodeListOf<ChildNode>) => void;
  selected?: string;
  changeSelected: (value?: string) => void;
}

export const NavBar = ({ children }: INavBar) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [sub, setSub] = useState<NodeListOf<ChildNode>>();
  const [selected, setSelected] = useState<string>();

  const changeExpanded = (isSelect: boolean) => {
    setExpanded(isSelect);
  };

  const changeSub = (isSelect: NodeListOf<ChildNode>) => {
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
      }}
    >
      <div className="flex flex-row absolute h-full">
        <div className="flex flex-col min-w-16 h-full bg-white overflow-hidden justify-between items-center z-20">{children}</div>
        {expanded && (
          <div className="flex flex-col animate-fade-right animate-duration-200 min-w-48 h-full bg-slate-100 overflow-hidden justify-start items-center py-4">
            {selected && <h1 className="font-semibold text-lg text-neutral-400">{selected}</h1>}
            {sub &&
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              Array.from(sub).map((child: any, index) => {
                return <div key={index} dangerouslySetInnerHTML={{ __html: child.innerHTML }} />;
              })}
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
  const { changeExpanded, selected, expanded, changeSelected, changeSub } = UseNavBar();

  return (
    <div
      onClick={(e) => {
        if (!href) {
          if (e.currentTarget.childNodes[1] && e.currentTarget.childNodes[1].hasChildNodes()) {
            changeSub(e.currentTarget.childNodes[1].childNodes);
            changeSelected(label);
            console.log(label, selected);

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
      className={`flex flex-col w-full items-center justify-center h-12 cursor-pointer text-slate-400 hover:text-green-200 ${
        label == selected && "text-green-300"
      } `}
    >
      <IconComponent size={"20px"} />
      <div className="hidden">{children}</div>
    </div>
  );
};

const NavBarSub = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full items-center justify-center h-12 cursor-pointer text-slate-400 hover:text-green-200">
      {children}
    </div>
  );
};

NavBar.Header = NavBarHeader;
NavBar.Content = NavBarContent;
NavBar.Footer = NavBarFooter;
NavBar.Item = NavBarItem;
NavBar.SubGroup = NavBarSub;

export default NavBar;
