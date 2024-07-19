import { getUser } from "@/db/apiAuth";
import useFetchApi from "@/hooks/useFetchApi";
import { createContext, useContext, useEffect } from "react";

const UrlContext = createContext();

const UrlProvider = ({ children }) => {
  const { data: user, loading, fn: fetchUser } = useFetchApi(getUser);
  const isAuthenticated = user?.role === "authenticated";
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <UrlContext.Provider value={{ user, fetchUser, loading, isAuthenticated }}>
      {children}
    </UrlContext.Provider>
  );
};

export const UrlState = () => {
  return useContext(UrlContext);
};

export default UrlProvider;
