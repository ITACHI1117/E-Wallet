// event payments
import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  where,
  query,
} from "firebase/firestore";
import { db } from "./firebaseConfig";
import { createGroupPaymentProps, getEventsByUserIDProps } from "@/utils/types";

export const createGroupPayment = async (data: createGroupPaymentProps) => {
  const eventRef = collection(db, "eventPayments");

  const doc = await addDoc(eventRef, {
    eventName: data.eventName,
    description: data.description,
    targetAmount: data.targetAmount,
    createdBy: data.createdBy,
    totalAmountReceived: 0,
    status: "active",
    createdAt: serverTimestamp(),
  });

  return doc.id;
};

// get all event created by admin
export const getAdminGroups = async (adminUid) => {
  const q = query(
    collection(db, "eventPayments"),
    where("createdBy", "==", adminUid)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};
