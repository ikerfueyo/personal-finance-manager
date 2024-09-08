const authReducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN':
        localStorage.setItem('token', action.payload.token);
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload.user,
          token: action.payload.token
        };
      case 'LOGOUT':
        localStorage.removeItem('token');
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          token: null
        };
      default:
        return state;
    }
  };
  
  export default authReducer;
  