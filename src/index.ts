import readline from "readline";
import lookupStaffPass from "./services/lookupStaffPass";
import verifyRedemptions from "./services/verifyRedemption";
import redeemGift from "./services/redeemGift";
import resetRedemptionData from "./utils/resetRedemptionData";
import {
  MENU_MESSAGES,
  LOOKUP_MESSAGES,
  REDEMPTION_MESSAGES,
  EXIT_MESSAGES,
  SYSTEM_MESSAGES,
} from "./config/messages";

// Create a readline interface for interactive user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * Displays the main menu.
 */
const displayMenu = () => {
  console.log(MENU_MESSAGES.menuHeader);
  MENU_MESSAGES.menuOptions.forEach((option) => console.log(option));
};

/**
 * Handles user input by calling the appropriate function.
 * @param question The question to prompt the user.
 * @param callback The function to handle the user's response.
 */
const promptUser = (question: string, callback: (input: string) => void) => {
  rl.question(question, (input) => {
    if (input.toLowerCase() === "exit") {
      console.log(EXIT_MESSAGES.exiting);
      rl.close();
    } else {
      callback(input);
    }
  });
};

/**
 * Handles menu selection.
 */
const handleUserInput = (option: string) => {
  switch (option) {
    case "1":
      promptUser(LOOKUP_MESSAGES.enterStaffId, lookupStaff);
      break;
    case "2":
      promptUser(REDEMPTION_MESSAGES.enterTeamName, verifyRedemption);
      break;
    case "3":
      promptUser(REDEMPTION_MESSAGES.enterTeamName, redeemGiftHandler);
      break;
    default:
      console.log(MENU_MESSAGES.invalidOption);
      promptMenu();
  }
};

/**
 * Looks up a staff pass ID and displays the result.
 */
const lookupStaff = (staffPassId: string) => {
  const result = lookupStaffPass(staffPassId);
  console.log(
    result
      ? LOOKUP_MESSAGES.foundRecord(
          staffPassId,
          result.team_name,
          result.created_at.toISOString()
        )
      : LOOKUP_MESSAGES.noRecordFound(staffPassId)
  );
  promptMenu();
};

/**
 * Verifies if a team is eligible for redemption.
 */
const verifyRedemption = (teamName: string) => {
  const result = verifyRedemptions(teamName);
  console.log(result.message);
  promptMenu();
};

/**
 * Redeems a gift for a team.
 */
const redeemGiftHandler = (teamName: string) => {
  const result = redeemGift(teamName);
  console.log(result.message);
  promptMenu();
};

/**
 * Prompts the main menu and waits for user input.
 */
const promptMenu = () => {
  displayMenu();
  promptUser(MENU_MESSAGES.promptOption, handleUserInput);
};

/**
 * Main function to initialize the program.
 */
const main = async () => {
  try {
    resetRedemptionData();
    console.log(SYSTEM_MESSAGES.resetData);
    promptMenu();
  } catch (error) {
    console.error(
      SYSTEM_MESSAGES.error(
        error instanceof Error ? error.message : String(error)
      )
    );
  }
};

// Run the application
main();
