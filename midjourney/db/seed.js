const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const { createImage } = require("./images");
const { createTag } = require("./tags");
const { createUser } = require("./users");

const users = [];
const productions = [];

const addUsers = async () => {
  console.log("Adding Users");
  const user1 = {
    firstName: "Tyler",
    lastName: "Tyler",
    username: "tylerbo",
    password: bcrypt.hashSync("tyler", 10),
  };
  const user2 = {
    firstName: "Billy",
    lastName: "Bob",
    username: "billyboy",
    password: bcrypt.hashSync("billyboy", 10),
  };
  const user3 = {
    firstName: "Jon",
    lastName: "Doe",
    username: "doeADeer",
    password: bcrypt.hashSync("dr0pOfG0ldenSun", 10),
  };

  users.push(await createUser(user1));
  users.push(await createUser(user2));
  users.push(await createUser(user3));

  console.log("Done adding users");
};

const addProductions = async () => {
  const prod1 = {
    venue: "James Earl Jones Theater",
    title: "Gutenberg! The Musical!",
    runTimeMinutes: 110,
  };
  const prod2 = {
    venue: "Winter Garden",
    title: "Cabaret",
    runTimeMinutes: 130,
  };
  productions.push(await createProduction(prod1));
  productions.push(await createProduction(prod2));
};

const seed = async () => {
  console.log("Starting Seed");

  //create some users
  await addUsers();

  //create some productions
  await addProductions();

  console.log("Ending Seed");
};

seed();
