#!/usr/bin/env node
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
      name: "userPin",
      type: "number",
      message: "Enter your pin: ",
    },
  ]);

  for (let i = 0; i < users.length; i++) {
    if (users[i][0] === userInfo.userName.toLowerCase().trim()) {
      if (users[i][1] === userInfo.userPin) {
        console.clear();
        console.log(
          chalk.yellow.underline(
            `\nWelcome ${userInfo.userName.trim()}\n`.toUpperCase()
          )
        );
        options(users[i]);
        break;
      } else if (users[i][1] !== userInfo.userPin) {
        console.log(chalk.redBright("Invalid PIN. Please enter again"));
        await login();
      }
    }
  }
}

login();
