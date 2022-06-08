import { Toast } from "utils";
import { storage } from "firebaseLocal";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

function useFirebase() {
  async function uploadImage(file, uid, namespace) {
    try {
      const storageRef = ref(storage, `/${namespace}/${uid}/${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      const snapshotRef = snapshot.ref;
      const url = await getDownloadURL(snapshotRef);
      return url;
    } catch (error) {
      Toast.error(error.message);
    }
  }

  return { uploadImage };
}

export { useFirebase };
