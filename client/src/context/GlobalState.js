import React, { createContext, useReducer, useState } from 'react';
import api from '../utils/api';
import AppReducer from './AppReducer';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

// Initial state
const initialState = {chatMessages:[]}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const [showDrawer, setshowDrawer] = useState(true);
  const [showLoadingAnswer, setshowLoadingAnswer] = useState(false);
  const [darkMode, setdarkMode] = useState(false);

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
    message.sender = message.sender ? message.sender : 'me';
    dispatch({
      type: 'ADD_MESSAGE',
      payload: message
    });
  }

  const getAnswer = async (message) => {
    const body = JSON.stringify({ message: message })
    setshowLoadingAnswer(true);
    try {
      const res = await api.post('/hugo/get-answer', body);
      console.log(res.data);
      addMessage({
        message: res.data.answer,
        sender: 'hugo',
      });
      setshowLoadingAnswer(false);
    } catch (err) {
      setshowLoadingAnswer(false);
      console.log(err);
    }
  };

  return (<GlobalContext.Provider value={{
    chatMessages: state.chatMessages,
    deleteMessage,
    addMessage,
    getAnswer,
    showDrawer,
    setshowDrawer,
    showLoadingAnswer,
    darkMode,
    setdarkMode
  }}>
    {children}
  </GlobalContext.Provider>);
}