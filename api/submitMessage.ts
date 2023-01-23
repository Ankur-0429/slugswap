import { getAuth } from "firebase/auth";
import { arrayUnion, collection, doc, getDocs, getFirestore, query, serverTimestamp, updateDoc, where } from "firebase/firestore";
import moment from "moment";
import firebase from "../constants/FirebaseConfig";
import { Message } from "../types";

const SubmitMessage = async (uid: string, message: Message) => {
    message.createdAt = moment().toISOString();
    const auth = getAuth(firebase);
    const firestore = getFirestore();
    const dmRef = collection(firestore, "dms");
    const q =  query(dmRef, where("users", "array-contains-any", [uid, auth.currentUser?.uid]))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((d) => {
        updateDoc(doc(firestore, d.ref.path), {
            messages: arrayUnion(message)
        })
    });
}

export default SubmitMessage;