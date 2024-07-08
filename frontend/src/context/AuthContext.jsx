import { createContext, useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import api from "../api/api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [auth, setAuth] = useState({});
  const refresh = useRefreshToken();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const newAccessToken = await refresh();

        const response = await api.get("/doctor/me/", {
          headers: { Authorization: `Bearer ${newAccessToken}` },
        });

        const username = response.data.user.username;
        const email = response.data.user.email;
        const userpic = response.data.userpic;
        const clinic_photos = response.data.clinic_photos;
        const break_photo = response.data.break_photo;
        const static_text = response.data.static_text;

        setAuth({
          username,
          email,
          userpic,
          clinic_photos,
          break_photo,
          static_text,
        });
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.username ? fetchData() : setIsLoading(false);

    return () => (isMounted = false);
  }, [refresh]);

  useEffect(() => {
    console.log("Auth state updated:", auth);
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
