import inquirer from "inquirer";
import chalk from "chalk";

async function repeat(userData: [string, number, number]) {
  console.log("\n");
  let input = await inquirer.prompt([
    {
      name: "continue",
      type: "confirm",
      message: "Do you want to perform another transaction?",
    },
  ]);
  if (input.continue === true) {
    await options(userData);
  } else if (input.continue === false) {
    console.log(chalk.greenBright(`\nThank you`));
    process.exit();
  }
}

async function options(userData: [string, number, number]) {
  let options = await inquirer.prompt([
    {
      name: "selectedOption",
      type: "list",
      message: "Choose an Option",
      choices: ["Balance Inquiry", "Deposit", "Withdraw", "Exit"],
    },
  ]);

  switch (options.selectedOption) {
    case "Balance Inquiry":
      console.log(chalk.greenBright(`Current balance is: ${userData[2]}`));
      break;

    case "Deposit":
      let deposit = await inquirer.prompt([
        {
          name: "depositAmount",
          type: "number",
          message: "Enter deposit amount: ",
        },
      ]);

      userData[2] += deposit.depositAmount;
      console.log(chalk.greenBright(`New balance is: ${userData[2]}`));
      break;

    case "Withdraw":
      let withdraw = await inquirer.prompt([
        {
          name: "withdrawAmount",
          type: "number",
          message: "Enter deposit amount: ",
        },
      ]);

      if (withdraw.withdrawAmount > userData[2]) {
        console.log(chalk.redBright(`Insufficient balance ${userData[2]}`));
      } else {
        userData[2] -= withdraw.withdrawAmount;
        console.log(chalk.greenBright(`New balance is: ${userData[2]}`));
      }
      break;

    case "Exit":
      console.log(chalk.greenBright(`\nThank you`));
      process.exit();
  }
  await repeat(userData);
}

export { options };
