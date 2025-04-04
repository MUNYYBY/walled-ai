import { Dispatch, ReactNode, SetStateAction } from "react";

export type NavItem = {
  label: string;
  image: React.ReactNode;
  component?: ReactNode;
};

type NavigationButtonsProps = {
  navs: NavItem[];
  currentNav: NavItem;
  setCurrentNav: Dispatch<SetStateAction<NavItem>>;
};

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  navs,
  currentNav,
  setCurrentNav,
}) => {
  return (
    <div className="guardial_middle_left_button_container">
      {navs.map((items, index) => (
        <button
          key={index}
          onClick={() => setCurrentNav(items)}
          className={`flex items-center justify-center
              ${
                items.label === currentNav.label
                  ? "active_nav"
                  : "in_active_nav"
              } 
              ${index === 0 ? "first_nav" : "last_nav"}
            `}
        >
          <span className="pt-0.5">{items.label}</span>
          {items.image}
        </button>
      ))}
    </div>
  );
};

export { NavigationButtons };
