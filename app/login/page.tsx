"use client";

export default function Home() {
  const handleLogin = () => {
    window.location.href = "/api/auth/login";
  };

  return (
    <div>
      <h1>Login with Google</h1>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
