/* eslint-disable no-useless-catch */
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

// Create/POST

const createUser = async (email, password) => {
  try {
    const userDB = await prisma.users.create({
      data: { email, password },
    });

    return userDB;
  } catch (err) {
    console.log("Error creating user", err);
    return undefined;
  }
};

// Read/GET

const getUserByUsername = async (username) => {
  try {
    const user = await prisma.users.findUnique({
      where: {
        username,
      },
    });
    return user;
  } catch (err) {
    console.log("Error getting user", err);
    return undefined;
  }
};

const getUserById = async (id) => {
  try {
    const userById = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    return userById.user;
  } catch (err) {
    throw err;
  }
};

// Update/PATCH
const updateUser = async (username, password, isAdmin) => {
  try {
    const plainTextPassword = password;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(plainTextPassword, saltRounds);

    const updatedUser = await prisma.user.update({
      where: {
        isAdmin: true,
      },
      data: {
        username,
        password: hashedPassword,
        isAdmin,
      },
    });

    return updatedUser;
  } catch (err) {
    throw err;
  }
};

// Delete

const deleteUser = async (req, id) => {
  try {
    const user = await prisma.users.delete({
      where: {
        id: parseInt(id),
        userId: req.user.id,
      },
    });

    return user;
  } catch (err) {
    console.log("Oops! Try that again.", err);
    throw err;
  }
};

module.exports = {
  createUser,
  getUserByUsername,
  getUserById,
  updateUser,
  deleteUser,
};
