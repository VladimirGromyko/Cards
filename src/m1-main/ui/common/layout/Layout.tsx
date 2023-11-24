import React, { ReactNode } from "react";
import Navigation from "m1-main/navigation/Navigation";

type LayoutType = {
  children: ReactNode;
};
const Layout: React.FC<LayoutType> = ({ children }) => {
  debugger;
  return (
    <div>
      <Navigation />
      {children}
    </div>
  );
};

export default Layout;
