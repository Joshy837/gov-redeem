export type Redemption = {
  team_name: string;
  redeemed_at: Date;
};

export type RedemptionStatus = {
  isValid: boolean;
  canRedeem: boolean;
  message: string;
};

export type RedeemGiftResponse = {
  success: boolean;
  message: string;
};
