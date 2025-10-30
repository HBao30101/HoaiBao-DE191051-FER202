export const initialLoginState = {
  user: null,
  loading: false,
  error: null
};

export const loginReducer = (state, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, loading: true, error: null };
    case 'LOGIN_SUCCESS':
      return { ...state, loading: false, user: action.payload };
    case 'LOGIN_FAILURE':
      return { ...state, loading: false, error: 'Đăng nhập thất bại' };
    case 'LOGOUT':
      return initialLoginState;
    default:
      return state;
  }
};
