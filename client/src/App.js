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
import Spinner from './components/Spinner/Spinner'
import ModalList from './components/Modal/ModalList'
import { GlobalProvider } from './context/GlobalState';

// styles
import './styles/App.scss';

const App = () => {
  const { currentUser, loading } = useAuth()
  return (
    <Fragment>
      <GlobalProvider>
        <ModalList />
        <Spinner/>
        {loading ? <Spinner show={true}/> :
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
          </Router>}
      </GlobalProvider>
    </Fragment>
  )
}

export default memo(App);
