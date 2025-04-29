import { useReducer, createContext, useContext } from "react";

const initialState = {
  user: null,
  isAuthenticated: false,
};
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("unknown action");
  }
}
const AuthContext = createContext();

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password ) {
      if (FAKE_USER.email === email && FAKE_USER.password === password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }

  function logout() {
    dispatch({ type: "logout" });
  }
  return <AuthContext.Provider value={{user, isAuthenticated, login, logout}}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("context has been used outside Auth provider");
  return context;
}

export {AuthProvider, useAuth}
