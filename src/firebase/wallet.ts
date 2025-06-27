import {
  doc,
  getDoc,
  updateDoc,
  increment,
  runTransaction,
  serverTimestamp,
  arrayUnion,
} from "firebase/firestore";
import { db } from "./firebaseConfig"; // Adjust path

export interface FundWalletData {
  uid: string;
  newBalance: number;
}

// fund user wallet
export const updateUserWallet = async (data: FundWalletData) => {
  const userRef = doc(db, "users", data.uid);

  // Step 1: Get current user data
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    throw new Error("User not found");
  }

  const currentBalance = userSnap.data().walletBalance || 0;
  const myID = userSnap.data().walletId || 0;

  // Step 2: Add the new amount
  const updatedBalance = currentBalance + data.newBalance;

  // Step 3: Update the wallet balance
  await updateDoc(userRef, {
    walletBalance: updatedBalance,
    transactions: arrayUnion({
      id: myID,
      receiverId: myID,
      amount: data.newBalance,
      narration: "Funded",
      type: "fund",
      date: new Date().toISOString(),
    }),
  });

  return updatedBalance;
};

// Pay for events

export interface PayEventData {
  id: string;
  createdBy: string;
  userId: string;
  amount: number;
  narration?: string;
}

export const contributeToGroup = async (data: PayEventData) => {
  const userRef = doc(db, "users", data.userId);
  const groupRef = doc(db, "eventPayments", data.id);
  const contributionRef = doc(
    db,
    "eventPayments",
    data.id,
    "contributions",
    `${data.userId}_${Date.now()}`
  );

  await runTransaction(db, async (transaction) => {
    const userSnap = await transaction.get(userRef);
    const groupSnap = await transaction.get(groupRef);

    if (!userSnap.exists() || !groupSnap.exists()) {
      throw new Error("User or group does not exist");
    }

    const currentBalance = userSnap.data().walletBalance || 0;

    if (currentBalance < data.amount) {
      throw new Error("Insufficient balance");
    }

    // 1. Deduct user balance and update transaction history
    transaction.update(userRef, {
      walletBalance: currentBalance - data.amount,
      transactions: arrayUnion({
        id: data.id,
        receiverId: data.id,
        amount: data.amount,
        narration: data.narration || "",
        type: "sent",
        date: new Date().toISOString(),
      }),
    });

    // 2. Add contribution record
    transaction.set(contributionRef, {
      userId: data.userId,
      amount: data.amount,
      narration: data.narration || "",
      date: serverTimestamp(),
    });

    // 3. Increment group total
    transaction.update(groupRef, {
      totalAmountReceived: increment(data.amount),
    });
  });
};
