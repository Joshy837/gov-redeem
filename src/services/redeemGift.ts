import verifyRedemption from "./verifyRedemption";
import { RedemptionStatus, RedeemGiftResponse } from "../types/redemptionTypes";
import createRedemption from "../utils/createRedemption";

const MESSAGES = {
  success: (teamName: string) =>
    `Success! Team '${teamName}' has redeemed their gift.`,
};

/**
 * Attempts to redeem a gift for a team.
 * @param teamName The name of the team attempting to redeem.
 * @returns A structured response indicating success or failure.
 */
const redeemGift = (teamName: string): RedeemGiftResponse => {
  // Check if the team is valid and eligible for redemption
  const redemptionStatus: RedemptionStatus = verifyRedemption(teamName);

  if (!redemptionStatus.isValid || !redemptionStatus.canRedeem) {
    return { success: false, message: redemptionStatus.message };
  }

  // Proceed with redemption
  createRedemption(teamName);
  return { success: true, message: MESSAGES.success(teamName) };
};

export default redeemGift;
