export const initialState = {
  isLogin: true,
  loading: false
}

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_LOGIN':
      return { ...state, isLogin: !state.isLogin }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}
