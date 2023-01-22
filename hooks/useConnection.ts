import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { currentUser } from "../constants/Atoms";
import { getFirestore, onSnapshot, doc } from "firebase/firestore";

export default function useConnection() {
  const firestore = getFirestore();
  const [currUser] = useAtom(currentUser);
  const folowerRef = doc(firestore, "followers", currUser!.uid);
  const followingRef = doc(firestore, "followers", currUser!.uid);
  const requestRef = doc(firestore, "follower_request", currUser!.uid);
  const [followers, setFollowers] = useState([] as string[]);
  const [following, setFollowing] = useState([] as string[]);
  const [request, setRequests] = useState([] as string[]);


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

  useEffect(() => {
    const unsubscribe = onSnapshot(requestRef, (snapshot) => {
      setRequests(snapshot.data()?.["follower_request"]);
    });
    return unsubscribe;
  }, []);

  const dms = followers.filter((e) => {return following.includes(e)})

  return {followers, following, dms, request};
}
