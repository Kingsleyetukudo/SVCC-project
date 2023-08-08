import React from "react";
import { Header } from "./Header";
import { Menu } from "./Menu";

function index() {
  return (
    <div>
      <Header />
      <Menu />

      <div className="container">
        <div className="row">
          <div className="col margintopbottom">
            <h2>Home</h2>
            <h6 className="margintopbottom20">
              Code cam is a community event where developers learn from fellow
              developers. we also have developer related topics that include
              software branding. legal issues around software as well as other
              topics developers are interest in hearing about.
            </h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default index;
