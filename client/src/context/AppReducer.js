export default (state, action) => {
    switch(action.type) {
      case 'DELETE_MESSAGE':
        return {
          ...state,
          chatMessages: state.chatMessages.filter(message => message.id !== action.payload)
        }
      case 'ADD_MESSAGE':
        return {
          ...state,
          chatMessages: [...state.chatMessages, action.payload]
        }
      default:
        return state;
    }
  }