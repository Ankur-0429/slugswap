import { getFirestore, getDoc, doc } from 'firebase/firestore/lite';

const me = async (uid: string) => {
    const db = getFirestore();
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
}

export default me;