import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header'
import MainPage from './Pages/MainPage'
import Test from './Pages/Test'
import Auth from './Pages/Auth'
import NotFound from './Pages/NotFound'

import { MessageProvider } from './context/MessageContext';
// import { GlobalProvider } from './context/GlobalState';

// styles
import './styles/App.scss';

const App = () =>
  // <GlobalProvider>
  <Router>
    <Fragment>
      <Header />
      <MessageProvider>
        <section>
          <Switch>
            <Route exact path='/' component={MainPage} />
            <Route exact path="/login" component={Auth} />
            <Route exact path="/test" component={Test} />
            <Route component={NotFound} />
          </Switch>
        </section>
      </MessageProvider>
    </Fragment>
  </Router>
// </GlobalProvider>

export default App;
