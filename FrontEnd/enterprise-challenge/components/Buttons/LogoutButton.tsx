"use client";
import { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";

const LogoutButton = () => {
  const [hasToken, setHasToken] = useState(false);

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find(row => row.startsWith("accessToken="));

    if (token) {
      setHasToken(true);
    }
  }, []);

  const handleLogout = () => {
    document.cookie =
      "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";

    window.location.href = "/auth";
  };

  if (!hasToken) {
    return null; 
  }

  return (
    <Button onClick={handleLogout} color="danger" variant="ghost">
      Logout
    </Button>
  );
};

export default LogoutButton;
