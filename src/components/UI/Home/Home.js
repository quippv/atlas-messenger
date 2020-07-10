import React from "react";
import friendshipImage from "../../../assets/images/friendship.png";
import classes from "./Home.module.css";

const Home = () => {
  return (
    <main className={classes.Home}>
      <img src={friendshipImage} alt="Friendship" />
    </main>
  );
};

export default Home;
