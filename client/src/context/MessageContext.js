import React, { createContext, useReducer, memo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import socketIOClient from "socket.io-client";
import { saveMessage } from '../services/ApiCalls'
const socket = socketIOClient();

// Initial state
const initialState = {
    chatMessages: [
        // {
        //     id: uuidv4(),
        //     createdAt: Date.now(),
        //     creator: 'Johan Super',
        //     message: `Hello dear friend!`

        // },
        // {
        //     id: uuidv4(),
        //     createdAt: Date.now(),
        //     creator: 'me',
        //     message: ` whoooop whooop!!!`

        // },
    ],
    chatDoc: {}
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
        case 'SET_MESSAGES':
            return {
                ...state,
                chatMessages: [...action.payload.messages],
                chatDoc: { ...action.payload }

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
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [loadingFriends, setLoadingFriends] = useState(false);

    // Actions
    const addMessage = async (message, user) => {
        let chatMessage = {
            id: uuidv4(),
            createdAt: Date.now(),
            creator: user._id,
            message: message
        }

        await saveMessage(chatMessage, state.chatDoc)
        // socket.on("FromAPI", data => {
        //     console.log(data);
        //   });
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

    const setMessages = (messages) => {
        dispatch({
            type: 'SET_MESSAGES',
            payload: messages
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
        setMessages,
        getAnswer,
        loadingMessages,
        setLoadingMessages,
        loadingFriends,
        setLoadingFriends
    }}>
        {children}
    </MessageContext.Provider>);
}
)