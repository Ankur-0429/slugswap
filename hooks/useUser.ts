import { getFirestore, getDoc, doc } from "firebase/firestore/lite";
import { useState } from "react";
import { createUserProps } from "../api/createUser";

export default function useUser(uid: string) {
  const db = getFirestore();
  const docRef = doc(db, "users", uid);
  const [user, setUser] = useState(null as null | createUserProps);

  getDoc(docRef).then((e) => {
    if (e.exists()) {
      setUser(e.data() as createUserProps);
    }
  });

  return { user };
}
