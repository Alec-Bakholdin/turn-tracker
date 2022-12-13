import React, { useContext } from "react";

export interface User {
  uid: string;
  username: string;
}

export interface UserActions {
  updateUser: (update: Partial<User>) => (void | Promise<void>);
  user?: User;
}

export const UserContext = React.createContext<UserActions>({updateUser: () => {}});
export function useUser() {
  return useContext(UserContext);
}
