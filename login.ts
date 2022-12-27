import inquirer from "inquirer";
import chalk from "chalk";
import { users } from "./data.js";
import { options } from "./options.js";

async function login() {
  let userInfo = await inquirer.prompt([
    {
      name: "userName",
      type: "input",
      message: "Enter your name: ",
    },
    {
      name: "userPassword",
      type: "number",
      message: "Enter your pin: ",
    },
  ]);

  for (let i = 0; i < users.length; i++) {
    if (users[i][0] === userInfo.userName.toLowerCase()) {
      if (users[i][1] === userInfo.userPassword) {
        console.clear();
        console.log(
          chalk.yellow.underline(
            `\nWelcome ${userInfo.userName}\n`.toUpperCase()
          )
        );
        options(users[i]);
        break;
      } else if (users[i][1] !== userInfo.userPassword) {
        console.log(chalk.redBright("Invalid PIN. Please enter again"));
        await login();
      } else if (users[i].includes(userInfo.userName.toLowerCase()) === false) {
        console.log(chalk.redBright("Invalid user"));
      }
    }
  }
}

login();
