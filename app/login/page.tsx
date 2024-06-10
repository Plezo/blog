"use client";

import { User } from "@/lib/types";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const handleLogin = () => {
    //const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.GOOGLE_CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code&scope=openid%20profile%20email`;
    //window.location.href = googleAuthUrl;
    axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
      {
        headers: {
          Authorization: `Bearer ${user.access_token}`,
          Accept: "application/json",
        },
      }
    );
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout");
    window.location.reload();
  };

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const res = await fetch("/api/protected");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    };
    checkUser();
  }, []);

  return (
    <div>
      {!user && (
        <>
          <button onClick={handleLogin}>Sign in with Google</button>
        </>
      )}
      {user && (
        <>
          <p>Signed in as {user.email}</p>
          <button onClick={handleLogout}>Sign out</button>
        </>
      )}
    </div>
  );
}
