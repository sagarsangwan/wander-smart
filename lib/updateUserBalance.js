"use server";
import { auth } from "./auth";

async function updateUserBalance() {
  const session = await auth();

  if (!session?.user) {
    console.error("No valid session or user found.");
    return { error: "Session or user not found" }; // Explicit return to avoid undefined
  }

  const { balance, totalBalanceUsed, balanceUsed, freePlanUsed } = session.user;
  console.log(
    "===================================",
    balance,
    totalBalanceUsed,
    balanceUsed,
    freePlanUsed
  );
  let updatedUser = null;

  if (balance >= 1) {
    console.log("User has sufficient balance. Deducting 1 unit.");
    updatedUser = {
      balanceUsed: balanceUsed + 1,
      balance: balance - 1,
      totalBalanceUsed: totalBalanceUsed + 1,
    };
  } else if (balance === 0 && freePlanUsed < 3) {
    console.log("User using free quota.");
    updatedUser = {
      freePlanUsed: freePlanUsed + 1,
      totalBalanceUsed: totalBalanceUsed + 1,
    };
  } else {
    console.warn("No update performed. Check user balance and free quota.");
    updatedUser = { warning: "No balance or free quota available" };
  }

  return updatedUser;
}

export default updateUserBalance;
