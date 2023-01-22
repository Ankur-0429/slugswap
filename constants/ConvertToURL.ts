import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  getStorage,
} from "firebase/storage";

const convertToURL = async (uri: string, filename: string) => {
  const storage = getStorage();
  let blobFile = null;

  if (uri != null) {
    const r = await fetch(uri);
    const b = await r.blob();
    blobFile = b;
  }

  if (!blobFile) return;
  const storageRef = ref(storage, `image/${filename}`);
  const uploadTask = await uploadBytesResumable(storageRef, blobFile);
  const url = await getDownloadURL(uploadTask.ref);
  return url;
};

export default convertToURL;
