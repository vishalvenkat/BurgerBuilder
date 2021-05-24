import React, {Component} from "react"
import "./App.css"
import Layout from "./Components/Layout/Layout"
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder"
import Checkout from "./Containers/Checkout/Checkout"
import {Route, Switch, Redirect} from 'react-router-dom';
import Orders from "./Containers/Orders/Orders"
import Auth from "./Containers/Auth/Auth"
import Logout from "./Containers/Auth/Logout/Logout"
import { connect } from 'react-redux';
import { checkAuthState } from "./Store/actions/auth"

class App extends Component {
  componentDidMount() {
    this.props.autoSignUp();
  }
render() {
  let routes = (
    <Switch>
      <Route path="/auth" exact component={Auth} />
      <Route path="/" component={BurgerBuilder} exact/>
      <Redirect to="/" />
    </Switch>
  )

  if(this.props.isAuthenticated) {
    routes = (
      <Switch>
      <Route path="/checkout"  component={Checkout} />
      <Route path="/orders"  component={Orders} />
      <Route path="/logout"  component={Logout} />
      <Route path="/" component={BurgerBuilder} exact/>
      <Redirect to="/" />
    </Switch>
    )
  }
  return (
<div className="App">
  <Layout>
  {routes}
  </Layout>
  </div>
  )
}
  
}

const mapStateToProps = state => {
  return {
      isAuthenticated: state.authReducer.token !== null
  }
}
const mapDispatchToProps = dispatch => {
  return {
    autoSignUp: () => dispatch(checkAuthState())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
