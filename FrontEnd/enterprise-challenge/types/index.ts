import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface Category {
  category_id: number;
  name: string;
}

export type CategoriesResponse = Category[]; 

export interface NoteType {
  noteId: number;
  userId: number;
  title: string;
  content: string;
  archive: boolean;
  active: boolean;
  categories: string[]; // IDs of categories
  createdAt: string;
  updatedAt: string | null;
}

export interface NoteRequest {
  title: string;
  content: string;
  categories: string[];
  archive: boolean;
  active: boolean;
}

export type NoteResponse = NoteType[];

export type LoginData = {
  username: string;
  password: string;
}

export type  RegisterData = {
  name: string;
  email: string;
  username: string;
  password: string;
}
