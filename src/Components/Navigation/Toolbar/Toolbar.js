import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './Toolbar.css'
const Toolbar = ({openSideDraw}) => {
    return (
        <header className="Toolbar">
            <div onClick={openSideDraw} className="DrawerToggle">
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="Logo">
                <Logo />
            </div>
                
            <nav className="DesktopOnly">
                <NavigationItems />
            </nav>
        </header>
    );
}
export default Toolbar;