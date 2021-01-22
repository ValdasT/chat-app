import React, { createContext, useReducer, memo } from 'react';
import AppReducer from './AppReducer';
import { store } from 'react-notifications-component'

// Initial state
const initialState = {
  kbsNames: [],
  darkMode: false,
  spinner: false,
  regions: null
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = memo(({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const setRegions = async regions => {
    dispatch({
      type: 'SET_REGIONS',
      payload: regions
    });
  }

  const setKbs = async kbsNames => {
    dispatch({
      type: 'SET_KBS',
      payload: kbsNames
    });
  }

  const setDarkMode = async mode => {
    dispatch({
      type: 'DARK_MODE',
      payload: mode
    });
  }

  const setSpinner = status => {
    dispatch({
      type: 'SPINNER',
      payload: status
    });
  }

  const showAlert = (type, title, message, duration) => {
    store.addNotification({
      title: title,
      message: message,
      type: type,
      insert: "top",
      container: "top-center",
      showIcon: true,
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: duration ? duration : 3000,
      },
    });
  }

  return (<GlobalContext.Provider value={{
    darkMode: state.darkMode,
    setDarkMode,
    setKbs,
    kbsNames: state.kbsNames,
    setSpinner,
    spinner: state.spinner,
    showAlert,
    regions: state.regions,
    setRegions,
  }}>
    {children}
  </GlobalContext.Provider>);
})