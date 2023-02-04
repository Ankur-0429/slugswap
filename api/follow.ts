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

        let users = [currentUser, uid];
        users = users.sort();

        await setDoc(doc(db, "dms", uuid.v4() as string), {
            firstUser: users[0],
            secondUser: users[1]
        });
    } else {

        const docFollowerRequest = doc(db, "follower_request", uid);
        const ifFollowerRequestExist = await (await getDoc(docFollowerRequest)).exists();

        if (ifFollowerRequestExist) {
            await updateDoc(doc(db, "follower_request", uid), {
                follower_request: arrayUnion(currentUser),
            });
        }
        else {
            await setDoc(doc(db, "follower_request", uid), {
                follower_request: arrayUnion(currentUser),
            });
        }
    }

    const docRefFollowing = doc(db, "following", currentUser);
    const ifFollowingExist = await (await getDoc(docRefFollowing)).exists();

    const docRefFollowers = doc(db, "followers", uid);
    const ifFollowersExist = await (await getDoc(docRefFollowers)).exists();

    if (ifFollowingExist) {
        await updateDoc(doc(db, "following", currentUser), {
            following: arrayUnion(uid),
        });
    }
    else {
        await setDoc(doc(db, "following", currentUser), {
            following: arrayUnion(uid),
        });
    }
    if (ifFollowersExist) {
        await updateDoc(doc(db, "followers", uid), {
            followers: arrayUnion(currentUser),
        });
    }
    else {
        await setDoc(doc(db, "followers", uid), {
            followers: arrayUnion(currentUser),
        });
    }
  }
};

export default follow;
