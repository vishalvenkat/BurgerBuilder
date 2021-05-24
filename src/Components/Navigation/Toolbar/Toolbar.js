import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './Toolbar.css'
const Toolbar = ({openSideDraw,isAuthenticated}) => {
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
                <NavigationItems isAuthenticated={isAuthenticated}/>
            </nav>
        </header>
    );
}
export default Toolbar;