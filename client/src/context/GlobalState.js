import React, { createContext, useReducer } from 'react';
import api from '../utils/api';
import AppReducer from './AppReducer';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

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

  const addMessage = message => {
    message.id = uuidv4();
    message.time = moment().calendar();
    dispatch({
      type: 'ADD_MESSAGE',
      payload: message
    });
  }

  const getAnswer = async () =>  {
    try {
      const res = await api.post('/hugo/get-answer');
      console.log(res.data);
      addMessage({
        message: res.data.answer,
        sender: 'hugo',
    });
    } catch (err) {
      console.log(err);
    }
  };

  return (<GlobalContext.Provider value={{
    chatMessages: state.chatMessages,
    deleteMessage,
    addMessage,
    getAnswer
  }}>
    {children}
  </GlobalContext.Provider>);
}