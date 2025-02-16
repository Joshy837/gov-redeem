import fs from "fs";
import { Redemption } from "../types/redemptionTypes";
import { REDEMPTION_FILE } from "../config/filepaths";

/**
 * Loads redemption data from a JSON file and converts `redeemed_at` into Date objects.
 * @param filePath Path to the redemption JSON file.
 * @returns An array of Redemption objects.
 */
const getRedemptions = (): Redemption[] => {
  try {
    if (!fs.existsSync(REDEMPTION_FILE)) {
      console.warn(
        `Warning: File not found at ${REDEMPTION_FILE}. Returning empty array.`
      );
      return [];
    }

    const data = fs.readFileSync(REDEMPTION_FILE, "utf8");
    const parsed = JSON.parse(data);

    if (!Array.isArray(parsed)) {
      throw new Error("Invalid redemption data format. Expected an array.");
    }

    return parsed.map((r) => ({
      team_name: String(r.team_name),
      redeemed_at: new Date(r.redeemed_at),
    }));
  } catch (error) {
    console.error(
      "Error loading redemptions:",
      error instanceof Error ? error.message : error
    );
    return [];
  }
};

export default getRedemptions;
