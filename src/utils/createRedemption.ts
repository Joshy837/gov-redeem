import fs from "fs";
import { Redemption } from "../types/redemptionTypes";
import { REDEMPTION_FILE } from "../config/filepaths";
import getRedemptions from "./getRedemptions"; // ✅ Importing to load existing data

/**
 * Saves redemption data to a JSON file.
 * @param redemptions Array of Redemption objects.
 */
const saveRedemptions = (redemptions: Redemption[]): void => {
  fs.writeFileSync(REDEMPTION_FILE, JSON.stringify(redemptions, null, 2));
};

/**
 * Adds a new redemption for a team without checking for duplicates.
 * @param teamName The name of the team redeeming.
 */
const createRedemption = (teamName: string): void => {
  const redemptions = getRedemptions(); // ✅ Load existing redemptions

  // Create new redemption entry
  const newRedemption: Redemption = {
    team_name: teamName,
    redeemed_at: new Date(), // ✅ Store as Date object
  };

  // Append new redemption & save updated data
  const updatedRedemptions = [...redemptions, newRedemption];
  saveRedemptions(updatedRedemptions);
};

export default createRedemption;
