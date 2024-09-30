import { env } from "@/config/env";
import { NoteRequest, NoteType } from "@/types";
import { getCookie } from "@/utils/getCookie";

export async function fetchAllNotes(): Promise<NoteType[]> {
  try {
    const cookieToken = getCookie('accessToken');
      if (!cookieToken) {    
        throw new Error('No Access Cookie found');
      }
    const headers = {      
          Authorization: `Bearer ${cookieToken}`,
    };

    const response = await fetch(`${env.HOSTNAME}/api/notes`, {
      headers,
    });

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Error Obtaining Data");
    }
  } catch (error) {
    console.error("Error on Request", error);
    throw error;
  }
}

export async function fetchActiveNotes(): Promise<NoteType[]> {
  try {
    const cookieToken = getCookie('accessToken');
      if (!cookieToken) {    
        throw new Error('No Access Cookie found');
      }
    const headers = {      
          Authorization: `Bearer ${cookieToken}`,
    };

    const response = await fetch(`${env.HOSTNAME}/api/notes/active`, {
      headers,
    });

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Error Obtaining Data");
    }
  } catch (error) {
    console.error("Error on Request", error);
    throw error;
  }
}

export async function fetchArchivedNotes(): Promise<NoteType[]> {
  try {
    const cookieToken = getCookie('accessToken');
      if (!cookieToken) {    
        throw new Error('No Access Cookie found');
      }
    const headers = {      
          Authorization: `Bearer ${cookieToken}`,
      
    };

    const response = await fetch(`${env.HOSTNAME}/api/notes/archived`, {
      headers,
    });

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Error Obtaining Data");
    }
  } catch (error) {
    console.error("Error on Request", error);
    throw error;
  }
}

export async function filterNotesByCategories(
  categoryIds: string[]
): Promise<NoteType[]> {
  try {
    if (categoryIds.length === 0) {
      return [];
    }

    const queryParams = categoryIds
      .map((id) => `categories=${encodeURIComponent(id)}`)
      .join("&");
    const cookieToken = getCookie("accessToken");

    if (!cookieToken) {
      console.error("Cookie Token Not Found");
    }
    const headers = {
      Authorization: `Bearer ${cookieToken}`,
    };

    const response = await fetch(
      `${env.HOSTNAME}/api/notes/categories?${queryParams}`,
      {
        headers,
      }
    );

    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Error Obtaining Data");
    }
  } catch (error) {
    console.error("Error on Request", error);
    throw error;
  }
}

export const createNote = async (noteData: NoteRequest) => {
  try {
    const cookieToken = getCookie("accessToken");

    if (!cookieToken) {
      console.error("Cookie Token Not Found");
      return { success: false, message: "Cookie Token Not Found" };
    }

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieToken}`,
      },
      body: JSON.stringify(noteData),
    };

    const response = await fetch(`${env.HOSTNAME}/api/notes`, requestOptions);

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

export const updateNote = async (noteId: number, noteData: NoteRequest) => {
  try {
    const cookieToken = getCookie("accessToken");

    if (!cookieToken) {
      console.error("Cookie Token Not Found");
      return { success: false, message: "Cookie Token Not Found" };
    }

    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieToken}`,
      },
      body: JSON.stringify(noteData),
    };

    const response = await fetch(
      `${env.HOSTNAME}/api/notes/${noteId}`,
      requestOptions
    );

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

export const deleteNote = async (noteId: number) => {
  try {
    const cookieToken = getCookie("accessToken");

    if (!cookieToken) {
      console.error("Cookie Token Not Found");
      return { success: false, message: "Cookie Token Not Found" };
    }

    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieToken}`,
      },
    };

    const response = await fetch(
      `${env.HOSTNAME}/api/notes/${noteId}`,
      requestOptions
    );

    if (!response.ok) {
      const responseType = `${response.status}`;
      const errorDesc = response.statusText;
      return { responseType, errorDesc };
    }

    return { success: true };
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    return { success: false, message: "Error al realizar la solicitud" };
  }
};
