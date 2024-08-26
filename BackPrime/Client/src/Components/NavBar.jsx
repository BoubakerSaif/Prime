import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <ul>
        <Link to={"/"}>
          <li>Home</li>
        </Link>

        <Link to={"/rules"}>
          <li>ServerRules</li>
        </Link>
        <Link to={"/infos"}>
          <li>ServerInfos</li>
        </Link>
        <Link to={"/shop"}>
          <li>Shop</li>
        </Link>
        <ul>
          <li>Application</li>
          <Link to={"application/whitelist"}>
            <li>WhiteList</li>
          </Link>
          <Link to={"application/ems"}>
            <li>EMS</li>
          </Link>
          <Link to={"application/warden"}>
            <li>Warden</li>
          </Link>
        </ul>
        <Link to={"/profile"}>
          <li>Profile</li>
        </Link>
        <button> Join With Discord </button>
      </ul>
    </div>
  );
};

export default NavBar;
