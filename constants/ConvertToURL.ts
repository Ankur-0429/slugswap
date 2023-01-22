import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  getStorage,
} from "firebase/storage";

const convertToURL = async (uri: string, filename: string) => {
  const storage = getStorage();

  let fileName = null;
  let blobFile = null;

  if (uri != null) {
    const r = await fetch(uri);
    const b = await r.blob();
    blobFile = b;
  }

  if (!blobFile) return;
  const storageRef = ref(storage, `image/${fileName}`);
  const uploadTask = uploadBytesResumable(storageRef, blobFile);
  uploadTask.on(
    "state_changed",
    null,
    (error) => console.log(error),
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        return downloadURL;
      });
    }
  );
};

export default convertToURL;
