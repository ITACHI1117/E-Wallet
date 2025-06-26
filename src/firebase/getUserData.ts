import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebaseConfig"; // adjust path as needed

export const getUserData = async (uid: string) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data(); // This is the user data object
  } else {
    throw new Error("User not found");
  }
};
