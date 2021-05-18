"use strict";

const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
const {
  homepage,
  global,
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
    await strapi.entityService.create({ data: entry, files }, { model });
  } catch (e) {
    console.log('model', entry, e);
  }
}

async function updateEntry({ model, entry, files }) {
  try {
    const params = {id: entry.id}
    const previousEntry = await strapi.query(model).findOne(params)
    await strapi.entityService.update({ params, data: previousEntry, files }, { model });
  } catch (e) {
    console.log('model', entry, e);
  }
}

async function importHomepage(shouldImportSeedData) {
  const files = {
    "seo.shareImage": getFileData("default-image.png"),
  };
  homepage['first_screen'].map((screenItem, i) => {
    files[`first_screen.${i}.background`] = getFileData(screenItem.backgroundName)
    if (screenItem.backgroundPosterName) {
      files[`first_screen.${i}.backgroundPoster`] = getFileData(screenItem.backgroundPosterName)
    }
    screenItem['cards'].map((cardItem, k) => {
      files[`first_screen.${i}.cards.${k}.image`] = getFileData(cardItem.imageName)
    })
  });
  homepage['second_screen'].map((screenItem, i) => {
    files[`second_screen.${i}.background`] = getFileData(screenItem.backgroundName)
    if (screenItem.backgroundPosterName) {
      files[`second_screen.${i}.backgroundPoster`] = getFileData(screenItem.backgroundPosterName)
    }
    screenItem['cards'].map((cardItem, k) => {
      files[`second_screen.${i}.cards.${k}.image`] = getFileData(cardItem.imageName)
    })
  });
  homepage['third_screen'].map((screenItem, i) => {
    files[`third_screen.${i}.background`] = getFileData(screenItem.backgroundName)
    if (screenItem.backgroundPosterName) {
      files[`third_screen.${i}.backgroundPoster`] = getFileData(screenItem.backgroundPosterName)
    }
    screenItem['cards'].map((cardItem, k) => {
      files[`third_screen.${i}.cards.${k}.image`] = getFileData(cardItem.imageName)
    })
  });
    
  if (shouldImportSeedData) {
    await createEntry({ model: "homepage", entry: homepage, files });
  }
  await updateEntry({ model: "homepage", entry: homepage, files });
}

async function importGlobal(shouldImportSeedData) {
  const files = {
    "favicon": getFileData("favicon.png"),
    "defaultSeo.shareImage": getFileData("default-image.png"),
  };

  if (shouldImportSeedData) {
    await createEntry({ model: "global", entry: global, files });
  }
  await updateEntry({ model: "global", entry: global, files });
}

async function importSelfDrivingCar(shouldImportSeedData) {
  const files = {
    "double_block.topBackground": getFileData(SelfDrivingCar['double_block'].topBackgroundName),
    "double_block.bottomVideo": getFileData(SelfDrivingCar['double_block'].bottomVideoName),
    "double_block.bottomVideoPoster": getFileData(SelfDrivingCar['double_block'].bottomVideoPosterName)
  };
  SelfDrivingCar['story_cards'].map((item, i) => {
    files[`story_cards.${i}.image`] = getFileData(item.imageName)
  });
  SelfDrivingCar['slider_items'].map((item, i) => {
    files[`slider_items.${i}.background`] = getFileData(item.backgroundName)
  });
  if (shouldImportSeedData) {
    await createEntry({ model: "self-driving-car", entry: SelfDrivingCar, files });
  }
  await updateEntry({ model: "self-driving-car", entry: SelfDrivingCar, files });
}

async function importCareer(shouldImportSeedData) {
    const files = {};
    Career['top_slider'].map((item, i) => {
      files[`top_slider.${i}.background`] = getFileData(item.backgroundName)
    });

    Career['bottom_slider'].map((item, i) => {
      files[`bottom_slider.${i}.background`] = getFileData(item.backgroundName)
    });

    if (shouldImportSeedData) {
      await createEntry({ model: "career", entry: Career, files });
    }
    await updateEntry({ model: "career", entry: Career, files });

}

async function importSeedData(shouldImportSeedData) {
  // Allow read of application content types
  await setPublicPermissions({
    global: ['find'],
    homepage: ['find'],
    'self-driving-car': ['find'],
    career: ['find'],
    form: ['send']
  });
  await importHomepage(shouldImportSeedData);
  await importGlobal(shouldImportSeedData);
  await importSelfDrivingCar(shouldImportSeedData);
  await importCareer(shouldImportSeedData);
}

module.exports = async () => {
  const shouldImportSeedData = await isFirstRun();

  try {
    console.log('Setting up your starter...');
    await importSeedData(shouldImportSeedData);
    console.log('Ready to go');
  } catch (error) {
    console.log('Could not import seed data');
    console.error(error);
  }
};
