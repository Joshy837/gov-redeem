import getStaffMapping from "../utils/getStaffMapping";

/**
 * Look up a staff pass ID from a given list of staff mappings and return team name + created_at timestamp.
 * @param staffPassId The staff pass ID to search for.
 * @param staffMappings The list of staff mappings.
 * @returns { team_name: string, created_at: Date } if found, otherwise null.
 */
const lookupStaffPass = (
  staffPassId: string
): { team_name: string; created_at: Date } | null => {
  const staffMappings = getStaffMapping();
  const staff = staffMappings.find(
    (entry) => entry.staff_pass_id === staffPassId
  );
  return staff
    ? { team_name: staff.team_name, created_at: staff.created_at }
    : null;
};

export default lookupStaffPass;
