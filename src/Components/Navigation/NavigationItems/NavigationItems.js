import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import './NavigationItems.css'
const NavigationItems = ({isAuthenticated}) => {
    let authorize = <NavigationItem link={'/auth'}>Sign in</NavigationItem>
    let orders = null;
    if(isAuthenticated) {
        authorize = <NavigationItem link={'/logout'}>Logout</NavigationItem>
        orders = <NavigationItem link={'/orders'}>Orders</NavigationItem>
    }
    return (
        <ul className="NavigationItems">
            <NavigationItem 
                link={'/'}
            >Burger Builder</NavigationItem>
            {orders}
            {authorize}
        </ul>
    );
}
export default NavigationItems;