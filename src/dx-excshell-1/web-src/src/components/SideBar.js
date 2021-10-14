/*
 * <license header>
 */

import React from 'react';
import { NavLink } from 'react-router-dom';

function SideBar() {
  return (
    <ul className="SideNav">
      <li className="SideNav-item">
        <NavLink className="SideNav-itemLink" activeClassName="is-selected" aria-current="page" exact to="/">
          Home
        </NavLink>
      </li>
      <li className="SideNav-item">
        <NavLink className="SideNav-itemLink" activeClassName="is-selected" aria-current="page" to="/create">
          New brief
        </NavLink>
      </li>
      <li className="SideNav-item">
        <NavLink className="SideNav-itemLink" activeClassName="is-selected" aria-current="page" to="/list">
          List briefs
        </NavLink>
      </li>
    </ul>
  );
}

export default SideBar;
