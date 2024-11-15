import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export const Auth = React.createContext<
  | {
      isLogin: boolean;
      login: Function;
    }
  | undefined
>(undefined);

Auth.displayName = "Auth";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    if (!isLogin) {
      if (pathname !== "/login") {
        navigate("/login", {
          replace: true,
        });
      }
    }
  }, [isLogin]);

  return (
    <Auth.Provider
      value={{
        isLogin,
        login: setIsLogin,
      }}
    >
      {children}
    </Auth.Provider>
  );
};

export default AuthProvider;
