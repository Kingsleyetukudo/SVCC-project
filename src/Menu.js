import React from "react";
import Link from "next/link";

export const Menu = () => {
  return (
    <nav className="navbar navbar-expand-sm bg-drak navbar-dark">
      <div className="navbar">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link href="/">
              <a className="nav-link" />
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/Speakers">
              <a className="nav-link" />
              Speakers
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
