import React from "react"
import "./App.css"
import Layout from "./Components/Layout/Layout"
import BurgerBuilder from "./Containers/BurgerBuilder/BurgerBuilder"
import Checkout from "./Containers/Checkout/Checkout"
import {Route, Switch} from 'react-router-dom';
import Orders from "./Containers/Orders/Orders"

const App = () => {

  return (
<div className="App">
  <Layout>
    <Switch>
    <Route path="/checkout"  component={Checkout} />
      <Route path="/orders"  component={Orders} />
      <Route path="/" component={BurgerBuilder} exact/>
    </Switch>
  </Layout>
  </div>
  )
  
  
}

export default App
