import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

export interface RegisterUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  matricNumber: number;
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
    email: user.email,
    matricNumber: data.matricNumber,
    createdAt: new Date().toISOString(),
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
