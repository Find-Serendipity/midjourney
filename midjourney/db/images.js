// Delete

// images

/* eslint-disable no-useless-catch */
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Read/GET

const getImages = async () => {
  try {
    const images = await prisma.images.findMany();
    return images;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getImageId = async (id) => {
  try {
    const image = await prisma.tags.findUnique({
      where: {
        id: id,
      },
    });
    return image;
  } catch (err) {
    console.log(err);
    return undefined;
  }
};

// Update/PATCH
// require user

const updateImageTag = async (id, tagsId) => {
  try {
    const updatedTag = await prisma.images.update({
      where: {
        id,
      },
      data: {
        tagsId,
      },
    });

    return updatedTag;
  } catch (err) {
    throw err;
  }
};

const addTagToImage = async (id, tagText) => {
  await prisma.images.update({
    where: {
      id,
    },
    data: {
      tags: {
        create: [
          {
            tags: {
              connectOrCreate: {
                where: {
                  tagText,
                },
                create: {
                  tagText,
                },
              },
            },
          },
        ],
      },
    },
  });
};

// "Delete"

const deleteImageTag = async (id, tagsId) => {
  try {
    const tags = tagsId.map((tag) => tag.tagsId);
    const updatedImage = await prisma.images.update({
      where: {
        id,
      },
      data: {
        tagsId: tags - tagsId,
      },
    });

    return updatedImage;
  } catch (err) {
    throw err;
  }
};

const deleteImageTagDavid = async (id, tagText) => {
  try {
    const updatedImage = await prisma.images_tags.delete({
      where: {
        images: { id },
        tags: { tagText },
      },
    });

    return updatedImage;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getImages,
  getImageId,
  updateImageTag,
  deleteImageTag,
};
