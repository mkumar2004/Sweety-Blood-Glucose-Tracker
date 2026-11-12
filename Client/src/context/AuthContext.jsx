
import {
  createContext,
  useReducer,
  useEffect,
} from "react";

export const AuthContext = createContext();

const getStoredUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch {
    return null;
  }
};

const initialState = {
  user: getStoredUser(),
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
      };

    case "LOGOUT":
      return {
        ...initialState,
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false,
      };

    case "INITIALIZE":
      return {
        ...state,
        user: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    authReducer,
    initialState
  );

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      dispatch({ type: "INITIALIZE", payload: null });
      return;
    }

    // User details will be loaded through a profile API
    dispatch({ type: "INITIALIZE", payload: null });
  }, []);

  const login = (data) => {
    localStorage.setItem("token", data.token);
    if (data.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }

    dispatch({
      type: "LOGIN",
      payload: data,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
