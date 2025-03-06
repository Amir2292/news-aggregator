import React from "react";

const Header: React.FC = () => {
  return (
    <header
      className="w-full bg-center bg-cover h-72"
      style={{backgroundImage: `url('/banner.png')`}}
    ></header>
  );
};

export default Header;
