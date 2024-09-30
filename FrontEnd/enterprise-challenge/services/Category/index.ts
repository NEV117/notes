import { env } from "@/config/env";
import { CategoriesResponse } from "@/types";
import { getCookie } from "@/utils/getCookie";

export async function fetchCategories(): Promise<CategoriesResponse> {
    try {
      const cookieToken = getCookie('accessToken');
      if (!cookieToken) {    
        throw new Error('No Access Cookie found');
      }
      const headers = {
        Authorization: `Bearer ${cookieToken}`,      
      };
  
      const response = await fetch(
        `${env.HOSTNAME}/api/categories`,
        {
          headers,
        }
      );
  
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Error Obtaining Data');
      }
    } catch (error) {
      console.error('Error on Request', error);
      throw error; 
    }
  }

  export const createCategory = async (categoryName: string) => {
    try {
      const cookieToken = getCookie("accessToken");

      if (!cookieToken) {
        console.error("No se encontró el token en la cookie");
        return null;
      }
  
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookieToken}`,
        },
        body: JSON.stringify({ name: categoryName }),
      };
  
      const response = await fetch(`${env.HOSTNAME}/api/categories`, requestOptions);
  
      if (!response.ok) {
        const responseType = `${response.status}`;
        const errorDesc = response.statusText;
        return { responseType, errorDesc };
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      return null;
    }
  };

  export const deleteCategory = async (categoryId: number) => {
    try {
      const cookieToken = getCookie("accessToken");
  
      if (!cookieToken) {
        console.error("No se encontró el token en la cookie");
        return null;
      }
  
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookieToken}`,
        },
      };
  
      const response = await fetch(
        `${env.HOSTNAME}/api/categories/${categoryId}`,
        requestOptions
      );
  
      if (!response.ok) {
        const resposeType = `${response.status}`;
        const errorDesc = response.statusText;
        return { resposeType, errorDesc };
      }
  
      return { success: true };
    } catch (error) {
      console.error("Error al realizar la solicitud:", error);
      return null;
    }
  };
  
  
  