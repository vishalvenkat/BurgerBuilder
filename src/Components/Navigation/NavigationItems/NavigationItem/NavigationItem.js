import React from 'react';
import {NavLink} from 'react-router-dom';
import './NavigationItem.css';
const NavigationItem = ({children, link}) => {
    return (
       <li className="NavigationItem">
           <NavLink to={link} exact activeClassName="active">{children}</NavLink>
       </li>
    );
}
export default NavigationItem;