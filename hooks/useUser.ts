import { User } from "@/lib/types";
import { getUserFromJWT } from "@/lib/utils";
import { useEffect, useState } from "react";

export function useUser() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    if (token) {
      const userData = getUserFromJWT(token);
      setUser(userData);
    }
  }, []);

  return user;
}
