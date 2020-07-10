import React, { useState } from "react";
import Logo from "../Logo/Logo";
import classes from "./Navigation.module.css";
import Backdrop from "../UI/Backdrop/Backdrop";
import NavigationItems from "./NavigationItems/NavigationItems";
import Profile from "../Profile/Profile";
import { updatedObject } from "../../shared/utility";

const Navigation = (props) => {
  const [navItem, setNavItem] = useState({
    person: {
      name: "@ Direct Messages",
      sign: "@",
      open: false,
    },
  });

  const navOpenHandler = (event, key) => {
    setNavItem(
      updatedObject(navItem, {
        [key]: updatedObject(navItem[key], {
          open: !navItem[key].open,
        }),
      })
    );
  };

  let drawer = [classes.Navigation, classes.Close];
  if (props.opened) {
    drawer = [classes.Navigation, classes.Open];
  }

  const navArray = [];
  for (const key in navItem) {
    navArray.push({
      id: key,
      ...navItem[key],
    });
  }

  return (
    <React.Fragment>
      {props.opened && <Backdrop closed={props.closed} />}
      <div className={drawer.join(" ")}>
        <Logo />
        <Profile />
        {navArray.map((nav) => (
          <NavigationItems
            key={nav.id}
            open={nav.open}
            opened={(event) => navOpenHandler(event, nav.id)}
            sign={nav.sign}
            name={nav.name}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default Navigation;
