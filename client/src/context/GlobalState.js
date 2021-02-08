import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import { v4 as uuidv4 } from 'uuid';

// Initial state
const initialState = {
  modalsArray: [],
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const setSpinner = status => {
    dispatch({
      type: 'SPINNER',
      payload: status
    });
  }

  const showModal = modalSettings => {
    let modal = {
      id: uuidv4(),
      type: modalSettings.type,
      name: modalSettings.name,
      body: modalSettings.body,
      onClose: modalSettings.onClose,
      onCloseBtn: modalSettings.onCloseBtn,
      onConfirm: modalSettings.onConfirm,
      onConfirmBtn: modalSettings.onConfirmBtn,
    }
    dispatch({
      type: 'ADD_MODAL',
      payload: modal
    });
  }

  const removeModal = modalId => {
    dispatch({
      type: 'REMOVE_MODAL',
      payload: modalId
    });
  }

  return (<GlobalContext.Provider value={{
    modalsArray: state.modalsArray,
    setSpinner,
    spinner: state.spinner,
    showModal,
    removeModal
  }}>
    {children}
  </GlobalContext.Provider>);
}