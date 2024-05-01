/* eslint-disable no-useless-catch */
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Create/POST

const createTag = async (tagText) => {
  try {
    const tagDB = await prisma.tags.create({
      data: { tagText },
    });

    return tagDB;
  } catch (err) {
    console.log("Error creating tag", err);
    return undefined;
  }
};

// Read/GET

const getTags = async () => {
  try {
    const tags = await prisma.tags.findMany();
    return tags;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getTagsId = async (id) => {
  try {
    const tags = await prisma.tags.findUnique({
      where: {
        id: id,
      },
    });
    return tags;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

// Update/PATCH

const updateTags = async (id, tagText) => {
  try {
    const updatedTag = await prisma.tags.update({
      where: {
        id,
      },
      data: {
        tagText,
      },
    });

    return updatedTag;
  } catch (err) {
    throw err;
  }
};

// Delete

const deleteTag = async (id) => {
  try {
    const tag = await prisma.tags.delete({
      where: {
        id: parseInt(id),
      },
    });

    return tag;
  } catch (err) {
    console.log("ERROR", err);
    throw err;
  }
};

module.exports = {
  createTag,
  getTags,
  getTagsId,
  updateTags,
  deleteTag,
};
