import React, {  useState } from 'react';
import Aux from '../../hoc/hoc';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import {connect} from 'react-redux';
import './Layout.css';

const Layout = props => {
    const [openDrawer, setOpenDrawer] = useState(false);
     const openSideDrawer = () => setOpenDrawer(true);
     const closeSideDrawer = () => setOpenDrawer(false);
    
    
    return (
        <Aux>
            <Toolbar openSideDraw={openSideDrawer} isAuthenticated={props.isAuthenticated}/>
            <SideDrawer show={openDrawer} closeSideDrawer={closeSideDrawer} isAuthenticated={props.isAuthenticated}/>
            <main className="content">
                {props.children} 
            </main>
        </Aux>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.token !== null
    }
}
export default connect(mapStateToProps)(Layout);