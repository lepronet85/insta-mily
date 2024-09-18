import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

const useUser = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = getCookie("token");

      if (token) {
        try {
          const response = await fetch("http://localhost:5000/api/users/me", {
            headers: {
              Authorization: `Bearer ${token.split(" ")[1]}`,
            },
          });

          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            // Token invalide ou utilisateur non trouvé
            setUser(null);
          }
        } catch (error) {
          console.error(
            "Erreur lors de la récupération de l’utilisateur:",
            error
          );
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    };

    fetchUser();
  }, []);

  return { user, loading };
};

export default useUser;
