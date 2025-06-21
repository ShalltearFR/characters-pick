import { createContext, useContext } from "react";

// Définir le type User selon ce que retourne getUser()
export type User = {
  id: string;
  email: string;
  name?: string;
  image?: string | null;
  // ...
} | null;

export const UserContext = createContext<User>(null);

export function useUser() {
  return useContext(UserContext);
}
