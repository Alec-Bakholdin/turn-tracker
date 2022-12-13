import React, { useEffect } from "react";
import { User, UserActions, UserContext } from "./types/user";
import { signInAnonymously } from "firebase/auth";
import { auth } from "./firebaseApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCookies } from "react-cookie";

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const [authUser] = useAuthState(auth);
  const [{ username }, setCookie] = useCookies(["username"]);
  const updateUsername = (newUsername: string) => {
    setCookie("username", newUsername);
  };
  useEffect(() => {
    signInAnonymously(auth)
      .then(({ user }) => {
        console.log("Logged in " + user.uid);
        if (!username) {
          updateUsername(user.uid.slice(0, 5).toUpperCase());
        }
      })
      .catch(console.error);
  }, []);

  const updateUser = (update: Partial<User>) => {
    if (update.username) {
      updateUsername(update.username);
    }
  };
  console.log(authUser);
  const userActions: UserActions = {
    updateUser,
    ...(authUser && { user: { uid: authUser.uid, username } }),
  };
  return (
    <UserContext.Provider value={userActions}>{children}</UserContext.Provider>
  );
}
