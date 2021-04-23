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
    return await strapi.entityService.create({ data: entry, files }, { model });
  } catch (e) {
    console.log('model', entry, e);
  }
}

async function updateEntry({ model, entry, files }) {
  try {
    const params = {id: entry.id}
    const previousEntry = await strapi.query(model).findOne(params)
    return await strapi.entityService.update({ params, data: previousEntry, files }, { model });
  } catch (e) {
    console.log('model', entry, e);
  }
}

async function importHomepage(shouldImportSeedData) {
  const files = {
    "seo.shareImage": getFileData("default-image.png"),
  };
    
  if (shouldImportSeedData) {
    return await createEntry({ model: "homepage", entry: homepage, files });
  }
  return await updateEntry({ model: "homepage", entry: homepage, files });
}

async function importGlobal(shouldImportSeedData) {
  const files = {
    "favicon": getFileData("favicon.png"),
    "defaultSeo.shareImage": getFileData("default-image.png"),
  };

  if (shouldImportSeedData) {
    return await createEntry({ model: "global", entry: global, files });
  }
  return await updateEntry({ model: "global", entry: global, files });
}

async function importSelfDrivingCar(shouldImportSeedData) {
  if (shouldImportSeedData) {
    return await createEntry({ model: "self-driving-car", entry: SelfDrivingCar });
  }
  return await updateEntry({ model: "self-driving-car", entry: SelfDrivingCar });
}

async function importCareer(shouldImportSeedData) {
  if (shouldImportSeedData) {
    return await createEntry({ model: "career", entry: Career });
  }
  return await updateEntry({ model: "career", entry: Career });
}

async function importCards(shouldImportSeedData) {
  return cards.map(async (card) => {
    const files = {
      image: getFileData(card.imageName),
    };
    if (shouldImportSeedData) {
      return await createEntry({ model: "card", entry: card, files });
    }
    return await updateEntry({ model: "card", entry: card, files });
    
  });
}

async function importBlocks(shouldImportSeedData) {
  return blocks.map(async (block) => {
    const files = {
      background: getFileData(block.backgroundName),
    };

    if (shouldImportSeedData) {
      return await createEntry({ model: "block", entry: block, files });
    }
    return await updateEntry({ model: "block", entry: block, files });
  });
}

async function importDoubleBlocks(shouldImportSeedData) {
  return doubleBlocks.map(async (block) => {
    const files = {
      topBackground: getFileData(block.topBackgroundName),
      bottomVideo: getFileData(block.bottomVideoName),
    };
    if (shouldImportSeedData) {
      return await createEntry({ model: "double-block", entry: block, files });
    }
    return await updateEntry({ model: "double-block", entry: block, files });
  });
}

async function importSliderItems(shouldImportSeedData) {
  return sliderItems.map(async (item) => {
    const files = {
      background: getFileData(item.backgroundName),
    };

    if (shouldImportSeedData) {
      return await createEntry({ model: "slider-item", entry: item, files });
    }
    return await updateEntry({ model: "slider-item", entry: item, files });
  });
}

async function importStoryCards(shouldImportSeedData) {
  return storyCards.map(async (card) => {
    const files = {
      image: getFileData(card.imageName),
    };
    if (shouldImportSeedData) {
      return await createEntry({ model: "story-card", entry: card, files });
    }
    return await updateEntry({ model: "story-card", entry: card, files });
  });
}

async function importSeedData(shouldImportSeedData) {
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

  // Create or update all entries
  await importCards(shouldImportSeedData);
  await importBlocks(shouldImportSeedData);
  await importSliderItems(shouldImportSeedData);
  await importStoryCards(shouldImportSeedData);
  await importDoubleBlocks(shouldImportSeedData);

  // Create or update all pages
  await importHomepage(shouldImportSeedData);
  await importGlobal(shouldImportSeedData);
  await importSelfDrivingCar(shouldImportSeedData);
  await importCareer(shouldImportSeedData);
}

module.exports = async () => {
  const shouldImportSeedData = await isFirstRun();

  // if (shouldImportSeedData) {
    try {
      console.log('Setting up your starter...');
      await importSeedData(shouldImportSeedData);
      console.log('Ready to go');
    } catch (error) {
      console.log('Could not import seed data');
      console.error(error);
    // }
  }
};
