import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// Initial state
const initialState = {
    chatMessages: [
        {
            id: 234234,
            message: 'heeeloo mate!',
            sender: 'hugo',
            time: "Today at 9:30 AM"
        }

  ]
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  function deleteMessage(id) {
    dispatch({
      type: 'DELETE_MESSAGE',
      payload: id
    });
  }

  function addMessage(message) {
    dispatch({
      type: 'ADD_MESSAGE',
      payload: message
    });
  }

  return (<GlobalContext.Provider value={{
    chatMessages: state.chatMessages,
    deleteMessage,
    addMessage
  }}>
    {children}
  </GlobalContext.Provider>);
}