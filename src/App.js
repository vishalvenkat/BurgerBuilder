import React, {useEffect, Suspense} from "react"
import "./App.css"
import Layout from "./Components/Layout/Layout"
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder"
import {Route, Switch, Redirect} from 'react-router-dom';
import Logout from "./Containers/Auth/Logout/Logout"
import { connect } from 'react-redux';
import { checkAuthState } from "./Store/actions/auth"
const Checkout = React.lazy(() => {
  return import('./Containers/Checkout/Checkout');
});
const Orders = React.lazy(() => {
  return import('./Containers/Orders/Orders');
});
const Auth = React.lazy(() => {
  return import('./Containers/Auth/Auth');
});


const App = props => {
  const {autoSignUp} = props;
  useEffect(() => autoSignUp(),[autoSignUp])
  let routes = (
    <Switch>
      <Route path="/auth" exact render={(props) => <Auth {...props}/>} />
      <Route path="/" component={BurgerBuilder} exact/>
      <Redirect to="/" />
    </Switch>
  )

  if(props.isAuthenticated) {
    routes = (
      <Switch>
      <Route path="/checkout"  render={(props) =><Checkout {...props}/>} />
      <Route path="/orders"  render={(props) =><Orders {...props}/>} />
      <Route path="/logout"  component={Logout} />
      <Route path="/auth" exact render={(props) => <Auth {...props}/>} />
      <Route path="/" component={BurgerBuilder} exact/>
      <Redirect to="/" />
    </Switch>
    )
  }
  return (
<div className="App">
  <Layout>
    <Suspense fallback={<p>loading...</p>}>{routes}</Suspense>
  </Layout>
  </div>
  )
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
