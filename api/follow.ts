import {
  getFirestore,
  setDoc,
  doc,
  arrayUnion,
  getDoc,
  updateDoc,
  arrayRemove,
} from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";
import firebase from "../constants/FirebaseConfig";
import uuid from 'react-native-uuid';

const follow = async (uid: string) => {
  const auth = getAuth(firebase);
  const currentUser = auth.currentUser?.uid;
  if (currentUser) {
    const db = getFirestore();

    const docRef = doc(db, "following", uid);
    const docSnap = await getDoc(docRef);

    let check = false;
    if (docSnap.exists()) {
       const data = docSnap.data();
       check = data.following.includes(currentUser)
    }

    // user already follows you back,
    // meaning we remove your follower request
    // else we give a follower request to the other
    // user
    if (check) {
        await updateDoc(doc(db, "follower_request", currentUser), {
            follower_request: arrayRemove(uid),
        });
        await setDoc(doc(db, "dms", uuid.v4() as string), {
            users: [currentUser, uid]
        });
    } else {
        await setDoc(doc(db, "follower_request", uid), {
            follower_request: arrayUnion(currentUser),
        });
    }

    await setDoc(doc(db, "following", currentUser), {
      following: arrayUnion(uid),
    });
    await setDoc(doc(db, "followers", uid), {
      followers: arrayUnion(currentUser),
    });
  }
};

export default follow;
