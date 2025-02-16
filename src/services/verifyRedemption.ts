import getRedemptions from "../utils/getRedemptions";
import getStaffMapping from "../utils/getStaffMapping";
import { RedemptionStatus } from "../types/redemptionTypes";

const MESSAGES = {
  invalidTeam: (teamName: string) =>
    `Invalid team name: '${teamName}'. This team does not exist in the staff records.`,
  alreadyRedeemed: (teamName: string) =>
    `Team '${teamName}' has already redeemed.`,
  canRedeem: (teamName: string) =>
    `Team '${teamName}' has not redeemed yet. Eligible for redemption.`,
};

/**
 * Verify if a team can redeem based on the redemption data and a given team name.
 * @param team_name The team name to verify.
 * @returns A structured object containing isValid, canRedeem, and a message.
 */
const verifyRedemptions = (team_name: string): RedemptionStatus => {
  const redemptions = getRedemptions();
  const staffMappings = getStaffMapping();

  // Check if the team exists in staff mappings
  const isValid = staffMappings.some((team) => team.team_name === team_name);
  if (!isValid) {
    return {
      isValid: false,
      canRedeem: false,
      message: MESSAGES.invalidTeam(team_name),
    };
  }

  // Check if the team has already redeemed
  const alreadyRedeemed = redemptions.some((r) => r.team_name === team_name);
  if (alreadyRedeemed) {
    return {
      isValid: true,
      canRedeem: false,
      message: MESSAGES.alreadyRedeemed(team_name),
    };
  }

  return {
    isValid: true,
    canRedeem: true,
    message: MESSAGES.canRedeem(team_name),
  };
};

export default verifyRedemptions;
