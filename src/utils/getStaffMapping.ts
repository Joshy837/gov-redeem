import fs from "fs";
import StaffMapping from "../types/staffMappingTypes";
import { STAFF_MAPPING_FILE } from "../config/filepaths";

/**
 * Reads a CSV file and converts it into an array of StaffMapping objects.
 * @param filePath Path to the CSV file.
 * @returns Array of StaffMapping objects with created_at as Date.
 */
const getStaffMapping = (): StaffMapping[] => {
  if (!fs.existsSync(STAFF_MAPPING_FILE)) {
    throw new Error(`Error: File not found at ${STAFF_MAPPING_FILE}`);
  }

  const data = fs.readFileSync(STAFF_MAPPING_FILE, "utf8").trim(); // Read and trim whitespace
  const lines = data.split("\n").map((line) => line.trim()); // Ensure no extra spaces

  if (lines.length < 2) {
    throw new Error("Error: CSV file must have at least one data row.");
  }

  const headers = lines[0].split(",").map((header) => header.trim());
  if (
    !headers.includes("staff_pass_id") ||
    !headers.includes("team_name") ||
    !headers.includes("created_at")
  ) {
    throw new Error("Error: CSV file missing required headers.");
  }

  return lines.slice(1).map((line) => {
    const values = line.split(",");
    return {
      staff_pass_id: String(values[0]).trim(),
      team_name: String(values[1]).trim(),
      created_at: new Date(Number(values[2])), // ✅ Convert from epoch milliseconds to Date
    };
  });
};

export default getStaffMapping;
