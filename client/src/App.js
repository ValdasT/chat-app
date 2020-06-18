import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar'
import MainPage from './components/layout/MainPage'
import Test from './components/mytest/Test'
import NotFound from './components/layout/NotFound'
import { GlobalProvider } from './context/GlobalState';

// styles
import './App.css';

const App = () =>
  <GlobalProvider>
    <Router>
      <Fragment>
        <Navbar />
        <section>
          <Switch>
            <Route exact path='/' component={MainPage} />
            <Route exact path="/test" component={Test} />
            <Route component={NotFound} />
          </Switch>
        </section>
      </Fragment>
    </Router>
  </GlobalProvider>

export default App;
