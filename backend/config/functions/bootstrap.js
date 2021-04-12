"use strict";

const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
const {
  homepage,
  global,
  blocks,
  cards,
  doubleBlocks,
  storyCards,
  sliderItems,
  SelfDrivingCar,
  Career
} = require("../../data/data.json");

async function isFirstRun() {
  const pluginStore = strapi.store({
    environment: strapi.config.environment,
    type: "type",
    name: "setup",
  });
  const initHasRun = await pluginStore.get({ key: "initHasRun" });
  await pluginStore.set({ key: "initHasRun", value: true });
  return !initHasRun;
};

async function setPublicPermissions(newPermissions) {
  // Find the ID of the public role
  const publicRole = await strapi
    .query("role", "users-permissions")
    .findOne({ type: "public" });

  // List all available permissions
  const publicPermissions = await strapi
    .query("permission", "users-permissions")
    .find({
      type: ["users-permissions", "application"],
      role: publicRole.id,
    });

  // Update permission to match new config
  const controllersToUpdate = Object.keys(newPermissions);
  const updatePromises = publicPermissions
    .filter((permission) => {
      // Only update permissions included in newConfig
      if (!controllersToUpdate.includes(permission.controller)) {
        return false;
      }
      if (!newPermissions[permission.controller].includes(permission.action)) {
        return false;
      }
      return true;
    })
    .map((permission) => {
      // Enable the selected permissions
      return strapi
        .query("permission", "users-permissions")
        .update({ id: permission.id }, { enabled: true })
    });
  await Promise.all(updatePromises);
}

function getFileSizeInBytes(filePath) {
  const stats = fs.statSync(filePath);
  const fileSizeInBytes = stats["size"];
  return fileSizeInBytes;
};

function getFileData(fileName) {
  const filePath = `./data/uploads/${fileName}`;

  // Parse the file metadata
  const size = getFileSizeInBytes(filePath);
  const ext = fileName.split(".").pop();
  const mimeType = mime.lookup(ext);

  return {
    path: filePath,
    name: fileName,
    size,
    type: mimeType,
  }
}

// Create an entry and attach files if there are any
async function createEntry({ model, entry, files }) {
  try {
    const createdEntry = await strapi.query(model).create(entry);
    if (files) {
      await strapi.entityService.uploadFiles(createdEntry, files, {
        model,
      });
    }
  } catch (e) {
    console.log('model', entry, e);
  }
}

async function importHomepage() {
  const files = {
    "seo.shareImage": getFileData("default-image.png"),
  };
  await createEntry({ model: "homepage", entry: homepage, files });
}

async function importGlobal() {
  const files = {
    "favicon": getFileData("favicon.png"),
    "defaultSeo.shareImage": getFileData("default-image.png"),
  };
  await createEntry({ model: "global", entry: global, files });
}

async function importSelfDrivingCar() {
  return await createEntry({ model: "self-driving-car", entry: SelfDrivingCar });
}

async function importCareer() {
  return await createEntry({ model: "career", entry: Career });
}

async function importCards() {
  return cards.map(async (card) => {
    const files = {
      image: getFileData(card.imageName),
    };
    await createEntry({ model: "card", entry: card, files });
  });
}

async function importBlocks() {
  return blocks.map(async (block) => {
    const files = {
      background: getFileData(block.backgroundName),
    };
    await createEntry({ model: "block", entry: block, files });
  });
}

async function importDoubleBlocks() {
  return doubleBlocks.map(async (block) => {
    const files = {
      topBackground: getFileData(block.topBackgroundName),
      bottomBackground: getFileData(block.bottomBackgroundName),
    };
    await createEntry({ model: "double-block", entry: block, files });
  });
}

async function importSliderItems() {
  return sliderItems.map(async (item) => {
    const files = {
      background: getFileData(item.backgroundName),
    };
    await createEntry({ model: "slider-item", entry: item, files });
  });
}

async function importStoryCards() {
  return storyCards.map(async (card) => {
    const files = {
      image: getFileData(card.imageName),
    };
    await createEntry({ model: "story-card", entry: card, files });
  });
}

async function importSeedData() {
  // Allow read of application content types
  await setPublicPermissions({
    global: ['find'],
    homepage: ['find'],
    'self-driving-car': ['find'],
    career: ['find'],
    block: ['find', 'findone'],
    card: ['find', 'findone'],
    'double-block': ['find', 'findone'],
    'slider-item': ['find', 'findone'],
    'story-card': ['find', 'findone']
  });

  // Create all entries
  await importCards();
  await importBlocks();
  await importSliderItems();
  await importStoryCards();
  await importDoubleBlocks();

  // Create all pages
  await importHomepage();
  await importGlobal();
  await importSelfDrivingCar();
  await importCareer();
}

module.exports = async () => {
  const shouldImportSeedData = await isFirstRun();

  if (shouldImportSeedData) {
    try {
      console.log('Setting up your starter...');
      await importSeedData();
      console.log('Ready to go');
    } catch (error) {
      console.log('Could not import seed data');
      console.error(error);
    }
  }
};
