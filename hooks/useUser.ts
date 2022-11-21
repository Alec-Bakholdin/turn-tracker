import { useAuthState } from "react-firebase-hooks/auth";
import { auth, database } from "config/firebaseApp";
import { useEffect, useMemo } from "react";
import { useObjectVal } from "react-firebase-hooks/database";
import { User, UserData } from "types/User";
import { ref, update } from "@firebase/database";

export function useUser() {
  const [userSnapshot, userLoading, userError] = useAuthState(auth);
  const userDataRef = useMemo(
    () => userSnapshot && ref(database, `users/${userSnapshot.uid}`),
    [userSnapshot?.uid]
  );
  const [userDataSnapshot, userDataLoading, userDataError] =
    useObjectVal<User>(userDataRef);
  const loading = userLoading || userDataLoading;
  useEffect(() => {}, [userSnapshot, userLoading]);

  const user = useMemo(() => {
    if (userSnapshot?.uid && userDataSnapshot && !loading) {
      return {
        ...userDataSnapshot,
      } as User;
    } else {
      return undefined;
    }
  }, [userSnapshot, userDataSnapshot, userLoading, userDataLoading]);

  const updateUser = async (userUpdate: Partial<UserData>) => {
    if (userDataRef) {
      return update(userDataRef, userUpdate);
    }
    throw new Error("User is not authenticated");
  };

  return {
    user,
    loading,
    error: userError || userDataError,
    updateUser,
  };
}
