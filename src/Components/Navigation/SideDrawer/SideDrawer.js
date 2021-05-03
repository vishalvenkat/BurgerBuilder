import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './SideDrawer.css';
import Aux from '../../../hoc/hoc';
import Backdrop from '../../UI/Backdrop/Backdrop';
const SideDrawer = ({closeSideDrawer,show}) => {
    let classes = ['SideDrawer'];
        show ? classes = [...classes,'open'] : classes = [...classes,'close'];
    return (
        <Aux>
            <Backdrop show={show} closeModal={closeSideDrawer}/>
            <div className={classes.join(' ')}>
                <div className="Logo">
                    <Logo />
                </div>
                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </Aux>
        
    );
}
export default SideDrawer;