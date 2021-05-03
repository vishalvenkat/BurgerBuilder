import React, { useState } from 'react';
import Aux from '../../hoc/hoc';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import './Layout.css';

const Layout = ({children}) => {
    const [open, setOpen] = useState(false);
    const openSideDrawer = () => {
        setOpen(true)
    }
    const closeSideDrawer = () => {
        setOpen(false)
    }
    
    return (
        <Aux>
            <Toolbar openSideDraw={openSideDrawer}/>
            <SideDrawer show={open} closeSideDrawer={closeSideDrawer}/>
            <main className="content">
                {children} 
            </main>
        </Aux>
    )
}
export default Layout;