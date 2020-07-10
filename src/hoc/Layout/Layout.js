import React, { useState } from "react";
import classes from "./Layout.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Navigation from "../../components/Navigation/Navigation";

const Layout = (props) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const openDrawerHandler = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <div className={classes.Layout}>
      <Sidebar openDraw={openDrawerHandler} />
      <Navigation opened={openDrawer} closed={openDrawerHandler} />
      {props.children}
    </div>
  );
};

export default Layout;
