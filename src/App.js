import React, { Component } from 'react';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Layout from './components/Layout/Layout' 

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
        <BurgerBuilder></BurgerBuilder>
        </Layout>
      </div>
    );
  }
}

export default App;
