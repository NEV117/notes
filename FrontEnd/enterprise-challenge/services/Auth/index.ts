import { env } from "@/config/env";
import { LoginData, RegisterData } from "@/types";

export const createAccessToken = async (loginData: LoginData) => {
    try {
        const response = await fetch(`${env.HOSTNAME}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            const errorType = `${response.status}`;
            return errorType;
        }

        const data = await response.json();
        const accessToken = data.token;

        if (accessToken) {
            const expirationTime = 120 * 60 * 1000; // 120 minutos en milisegundos
            document.cookie = `accessToken=${accessToken}; expires=${new Date(new Date().getTime() + expirationTime).toUTCString()}; path=/;`;
            return true;
        }
    } catch (error) {
        console.error('Request Error:', error);
        return error instanceof Error ? error.message : 'Request Error';
    }
};

export const registerUser = async (registerData: RegisterData) => {
    try {
      const response = await fetch(`${env.HOSTNAME}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData)
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        const errorType = `${response.status}`;
        return errorType;
      }
  
      const data = await response.json();
      console.log("Registration successful", data);
  
      return true;
    } catch (error) {
      console.error('Request Error:', error);
      return error instanceof Error ? error.message : 'Request Error';
    }
  };