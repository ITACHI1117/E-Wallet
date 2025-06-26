import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebaseConfig"; // Adjust path

export interface FundWalletData {
  uid: string;
  newBalance: number;
}

export const updateUserWallet = async (data: FundWalletData) => {
  const userRef = doc(db, "users", data.uid);

  // Step 1: Get current user data
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    throw new Error("User not found");
  }

  const currentBalance = userSnap.data().walletBalance || 0;

  // Step 2: Add the new amount
  const updatedBalance = currentBalance + data.newBalance;

  // Step 3: Update the wallet balance
  await updateDoc(userRef, {
    walletBalance: updatedBalance,
  });

  return updatedBalance;
};
