import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";
import { getUserData } from "./getUserData";

export interface RegisterUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  matricNumber: number;
  userRole: string;
}
export interface LoginUser {
  email: string;
  password: string;
}

// Register user with email and password
export const registerUser = async (data: RegisterUserData) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );

  const user = userCredential.user;

  // Save extra data to Firestore
  await setDoc(doc(db, "users", user.uid), {
    firstName: data.firstName,
    lastName: data.lastName,
    fullName: `${data.firstName} ${data.lastName}`,
    email: user.email,
    matricNumber: data.matricNumber,
    createdAt: new Date().toISOString(),
    walletBalance: 0,
    walletId: user.uid,
    status: "active",
    hasPin: "false",
    pin: null,
    transactions: [],
    userRole: data.userRole,
  });

  return user;
};

// Sign in
export const loginUser = async (data: LoginUser) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );
  return userCredential.user;
};

export const getCurrentUser = async () => {
  const currentUser = auth.currentUser;

  if (currentUser) {
    const uid = currentUser.uid;
    try {
      const userData = await getUserData(uid);
      console.log("User Firestore data:", userData);
      return userData;
    } catch (error) {
      throw new Error("User does not exist " + error); // ✅ React Query handles this via `isError`
    }
  }
};

// work on this later
export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out:", error);
  }
};
