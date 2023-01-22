import { getFirestore, getDoc, doc } from 'firebase/firestore/lite';

const me = async (uid: string) => {
    const db = getFirestore();
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return false;
}

export default me;