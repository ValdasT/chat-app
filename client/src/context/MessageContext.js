import React, { createContext, useReducer, useContext, memo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
// import { sendAnswer } from './ApiCalls';
// import { GlobalContext } from './GlobalState';
// import { useUserSession } from './AuthContext';

// Initial state
const initialState = {
    chatMessages: [
        {
            id : uuidv4(),
            time: Date.now(),
            sender: 'Johan Super',
            message: `Hello dear friend!`
            
        },
       {
            id : uuidv4(),
            time: Date.now(),
            sender: 'me',
            message: ` whoooop whooop!!!`
            
        },
    ]
}

// Reducer
const messageReducer = (state, action) => {
    switch (action.type) {
        // case 'DELETE_MESSAGE':
        //   return {
        //     ...state,
        //     chatMessages: state.chatMessages.filter(message => message.id !== action.payload)
        //   }
        case 'ADD_MESSAGE':
            return {
                ...state,
                chatMessages: [...state.chatMessages, action.payload]
            }
        case 'EDIT_MESSAGE':
            return {
                ...state,
                chatMessages: state.chatMessages.map(chatMessage => chatMessage.message.id === action.payload.id ?
                    { ...chatMessage, message: action.payload.message } : chatMessage)
            }
        default:
            throw new Error(`unknown action type: ${action.type}`);;
    }
}

// Create context
export const MessageContext = createContext(initialState);

// Provider component
export const MessageProvider = memo(({ children }) => {
    // const { showAlert } = useContext(GlobalContext);
    // const { user } = useUserSession();
    const [state, dispatch] = useReducer(messageReducer, initialState);
    const [exampleQuestions, setExampleQuestions] = useState();

    // Actions
    const addMessage = message => {
        let chatMessage = {
            id: uuidv4(),
            time: Date.now(),
            sender: message.sender ? message.sender : 'me',
            message: message
        }
        dispatch({
            type: 'ADD_MESSAGE',
            payload: chatMessage
        });
    }

    const editMessage = (message, id) => {
        message.id = id;
        message.time = 13241515;
        dispatch({
            type: 'EDIT_MESSAGE',
            payload: message
        });
    }

    const getAnswer = async (message, recomendation) => {
        // try {
        //     let token = getLastToken(state.chatMessages);
        //     let tempMessage = {
        //         question: message,
        //         loading: true,
        //         id: uuidv4(),
        //         token:token
        //     }
        //     addMessage({
        //         message: tempMessage,
        //         sender: 'hugo',
        //     });

        //     let res = await sendAnswer(tempMessage, token, user, recomendation);
        //     if (res.id) {
        //         editMessage({
        //             message: res,
        //             sender: 'hugo',
        //         }, res.id);
        //     } else {
        //         addMessage({
        //             message: res,
        //             sender: 'hugo',
        //         });
        //     }
        // } catch (err) {
        //     showAlert('danger', err.name, err.message);
        // }
    };

    return (<MessageContext.Provider value={{
        chatMessages: state.chatMessages,
        addMessage,
        getAnswer,
        exampleQuestions,
        setExampleQuestions
    }}>
        {children}
    </MessageContext.Provider>);
}
)