import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { currentUser } from "../constants/Atoms";
import { getFirestore, onSnapshot, doc } from "firebase/firestore";

export default function useFollowerAndFollowing() {
  const firestore = getFirestore();
  const [currUser] = useAtom(currentUser);
  const folowerRef = doc(firestore, "followers", currUser!.uid);
  const followingRef = doc(firestore, "followers", currUser!.uid);
  const [followers, setFollowers] = useState([] as string[]);
  const [following, setFollowing] = useState([] as string[])

  useEffect(() => {
    const unsubscribe = onSnapshot(folowerRef, (snapshot) => {
      setFollowers(snapshot.data()?.followers);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(followingRef, (snapshot) => {
      setFollowing(snapshot.data()?.following);
    });
    return unsubscribe;
  }, []);

  return {followers, following};
}
