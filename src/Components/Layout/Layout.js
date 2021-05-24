import React, { Component } from 'react';
import Aux from '../../hoc/hoc';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import {connect} from 'react-redux';
import './Layout.css';

class Layout extends Component {
    state = {
        openDrawer: false
    }
     openSideDrawer = () => {
        this.setState({openDrawer: true})
    }
     closeSideDrawer = () => {
        this.setState({openDrawer: false})
    }
    render() {
    return (
        <Aux>
            <Toolbar openSideDraw={this.openSideDrawer} isAuthenticated={this.props.isAuthenticated}/>
            <SideDrawer show={this.state.openDrawer} closeSideDrawer={this.closeSideDrawer} isAuthenticated={this.props.isAuthenticated}/>
            <main className="content">
                {this.props.children} 
            </main>
        </Aux>
    )
}
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.token !== null
    }
}
export default connect(mapStateToProps)(Layout);