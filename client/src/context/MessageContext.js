import React, { createContext, useReducer, memo, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { saveMessage } from '../services/ApiCalls'
import useSockets from "../components/UseSockets/UseSockets";

// Initial state
const initialState = {
    chatMessages: [],
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
    const [state, dispatch] = useReducer(messageReducer, initialState);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [loadingFriends, setLoadingFriends] = useState(false);
    const [friendMessage, setFriendMessage] = useState();
    const { sendMessage, messageFromSocket } = useSockets();

    // Actions
    const addMessage = async (message, user) => {
        let chatMessage = {
            id: uuidv4(),
            createdAt: Date.now().toString(),
            creator: user._id,
            message: message
        }
        if (state.chatDoc._id) {
            sendMessage(chatMessage, state.chatDoc)
            // await saveMessage(chatMessage, state.chatDoc) 
        }
    }

    useEffect(() => {
        if (messageFromSocket.user && messageFromSocket.user.room === state.chatDoc._id) {
            dispatch({
                type: 'ADD_MESSAGE',
                payload: messageFromSocket.message
            });
        }
    }, [messageFromSocket, state.chatDoc])

    const editMessage = (message, id) => {
        message.id = id;
        message.time = 13241515;
        dispatch({
            type: 'EDIT_MESSAGE',
            payload: message
        });
    }

    const setMessages = (user, messages) => {
        dispatch({
            type: 'SET_MESSAGES',
            payload: messages
        });
    }

    return (<MessageContext.Provider value={{
        chatMessages: state.chatMessages,
        addMessage,
        setMessages,
        loadingMessages,
        setLoadingMessages,
        loadingFriends,
        setLoadingFriends,
        setFriendMessage
    }}>
        {children}
    </MessageContext.Provider>);
}
)