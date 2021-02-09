const AppReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MODAL':
      return {
        ...state,
        modalsArray: [...state.modalsArray, action.payload]
      }
    case 'REMOVE_MODAL':
      return {
        ...state,
        modalsArray: state.modalsArray.filter(modal => modal.id !== action.payload)
      }
      case 'SPINNER':
        return {
          ...state,
          spinner: action.payload
        }
    default:
      throw new Error(`unknown action type: ${action.type}`);;
  }
}

export default AppReducer