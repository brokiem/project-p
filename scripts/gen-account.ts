'use strict';

import bcrypt from "bcrypt";
// @ts-ignore
import readlineSync from "readline-sync";
import {randomUUID} from "crypto";

interface Account {
  uuid: string | null;
  username: string | null;
  email: string | null;
  password: string | null;
}

const generateAccount = async () => {
  const account: Account = {
    uuid: null,
    username: null,
    email: null,
    password: null
  }

  console.log("> Generating UUID...");
  account.uuid = randomUUID();
  console.log("> UUID generated!");

  // get username
  account.username = readlineSync.question('Please enter the username: ');
  // get email
  account.email = readlineSync.question('Please enter the email: ');
  if (!validateEmail(account.email!)) {
    console.log("Invalid email");
    return;
  }
  // get password
  const rawPass = readlineSync.question('Please enter the password: ');

  console.log("> Generating password hash...");

  // hash password
  bcrypt.genSalt(16, function (err, salt) {
    if (err) return console.log("Error: Failed to create salt");

    bcrypt.hash(rawPass, salt, function (err, hash) {
      if (err) return console.log("Error: Failed to hash password");

      account.password = hash;

      console.log("Generated account:");
      console.log(account);
    });
  });
}

function validateEmail(email: string) {
  const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,10})$/;
  return reg.test(email);
}

await generateAccount()
