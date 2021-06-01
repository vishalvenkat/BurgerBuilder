import React, {  useEffect } from 'react';
import { connect } from 'react-redux';
import { logout } from '../../../Store/actions/auth';
import { Redirect } from 'react-router-dom';
const Logout = props => {
    const {logout} = props;
    useEffect(() => logout(), [logout])
    return <Redirect to="/" />;
}

const mapDispatchToProps = dispatch => {
    return {
        logout : () => dispatch(logout())
    }
}
export default connect(null,mapDispatchToProps)(Logout);