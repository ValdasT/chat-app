import React, { Fragment, memo } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import PrivateRoute from "./components/PrivateRoutes/PrivateRouts"
import Header from './components/Header/Header'
import MainPage from './Pages/MainPage'
import Test from './Pages/Test'
import Auth from './Pages/Auth'
import NotFound from './Pages/NotFound'

import { MessageProvider } from './context/MessageContext';
import { useAuth } from "./context/AuthContext"
// import { GlobalProvider } from './context/GlobalState';

// styles
import './styles/App.scss';

const App = () => {
  const { currentUser } = useAuth()
  // <GlobalProvider>
  return (

    <Fragment>

      <Router>
        <Header />
        <MessageProvider>
          <Switch>
            <PrivateRoute exact path='/' component={MainPage} />
            <PrivateRoute exact path="/test" component={Test} />
            {currentUser && (<Redirect from="/login" to="/" exact />)}
            <Route exact path="/login" component={Auth} />
            <Route component={NotFound} />
          </Switch>
        </MessageProvider>
      </Router>
    </Fragment>

    // </GlobalProvider>
  )
}

export default memo(App);
