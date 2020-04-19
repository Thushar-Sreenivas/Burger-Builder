import React, { Component } from 'react';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Layout from './hoc/Layout/Layout' 
import Checkout from './containers/Checkout/Checkout'
import { Route } from 'react-router-dom'

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Layout>
        <Route path="/" exact component={BurgerBuilder}/> 
        <Route path="/checkout" component={Checkout}/> 
        </Layout>
       
      </div>
    );
  }
}

export default App;
