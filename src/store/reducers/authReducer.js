const initState = {
  authError: null
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case "LOGIN_NOTWORKING":
      return {
        ...state,
        authError: "Login failed"
      };
    case "LOGIN_WORKING":
      return {
        ...state,
        authError: null
      };
    case "SIGNOUT_WORKING":
      return state;
    case "SIGNUP_WORKING":
      return {
        ...state,
        authError: null
      };
    case "SIGNUP_ERROR":
      return {
        ...state,
        authError: action.err.message
      };
    default:
      return state;
  }
};

export default authReducer;
