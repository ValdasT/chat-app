export default (state, action) => {
  switch (action.type) {
    case 'DARK_MODE':
      return {
        ...state,
        darkMode: action.payload
      }
    case 'SPINNER':
      return {
        ...state,
        spinner: action.payload
      }
    case 'SET_USER':
      return {
        ...state,
        user: { ...action.payload }
      }
    case 'SET_REGIONS':
      return {
        ...state,
        regions: action.payload
      }
      case 'SET_KBS':
        return {
          ...state,
          kbsNames: action.payload
          }
    default:
      throw new Error(`unknown action type: ${action.type}`);;
  }
}