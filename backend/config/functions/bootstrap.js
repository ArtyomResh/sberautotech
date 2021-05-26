"use strict";

const fs = require("fs");
const path = require("path");
const mime = require("mime-types");
const {
  homepage,
  global,
  SelfDrivingCar,
  Career,
  AboutCompany,
  Flip
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
  homepage['fourth_screen'].map((screenItem, i) => {
    files[`fourth_screen.${i}.background`] = getFileData(screenItem.backgroundName)
    if (screenItem.backgroundPosterName) {
      files[`fourth_screen.${i}.backgroundPoster`] = getFileData(screenItem.backgroundPosterName)
    }
    screenItem['cards'].map((cardItem, k) => {
      files[`fourth_screen.${i}.cards.${k}.image`] = getFileData(cardItem.imageName)
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
    "double_block.bottomVideoPoster": getFileData(SelfDrivingCar['double_block'].bottomVideoPosterName),
    "slider.slider_items": []
  };
  SelfDrivingCar['story_cards'].map((item, i) => {
    files[`story_cards.${i}.image`] = getFileData(item.imageName)
  });
  SelfDrivingCar.slider.slider_items_names.map((item) => {
    files[`slider.slider_items`].push(getFileData(item))
  });
  if (shouldImportSeedData) {
    await createEntry({ model: "self-driving-car", entry: SelfDrivingCar, files });
  }
  await updateEntry({ model: "self-driving-car", entry: SelfDrivingCar, files });
}

async function importCareer(shouldImportSeedData) {
    const files = {
      "top_slider.slider_items": [],
      "bottom_slider.slider_items": []
    };
    Career.top_slider.slider_items_names.map((item) => {
      files[`top_slider.slider_items`].push(getFileData(item))
    });

    Career.bottom_slider.slider_items_names.map((item) => {
      files[`bottom_slider.slider_items`].push(getFileData(item))
    });

    if (shouldImportSeedData) {
      await createEntry({ model: "career", entry: Career, files });
    }
    await updateEntry({ model: "career", entry: Career, files });
}

async function importAboutCompany(shouldImportSeedData) {
  const files = {
    "headerBackground": getFileData(AboutCompany.headerBackgroundName),
    "slider.slider_items": []
  };
  AboutCompany.list['list_items'].map((item, i) => {
    files[`list.list_items.${i}.image`] = getFileData(item.imageName)
  });

  AboutCompany.slider.slider_items_names.map((item) => {
    files[`slider.slider_items`].push(getFileData(item))
  });

  if (shouldImportSeedData) {
    await createEntry({ model: "about-company", entry: AboutCompany, files });
  }
  await updateEntry({ model: "about-company", entry: AboutCompany, files });
}

async function importFlip(shouldImportSeedData) {
  const files = {
    "first_screen.background": getFileData(Flip.first_screen.backgroundName),
    "first_screen.mobileBackground": getFileData(Flip.first_screen.mobileBackgroundName),
    "first_screen.backgroundPoster": getFileData(Flip.first_screen.backgroundPosterName),
    "first_screen.mobileBackgroundPoster": getFileData(Flip.first_screen.mobileBackgroundPosterName),
    "second_screen.background": getFileData(Flip.second_screen.backgroundName),
    "second_screen.mobileBackground": getFileData(Flip.second_screen.mobileBackgroundName),
    "second_screen.backgroundPoster": getFileData(Flip.second_screen.backgroundPosterName),
    "second_screen.mobileBackgroundPoster": getFileData(Flip.second_screen.mobileBackgroundPosterName),
    "third_screen.background": getFileData(Flip.third_screen.backgroundName),
    "third_screen.mobileBackground": getFileData(Flip.third_screen.mobileBackgroundName),
    "third_screen.backgroundPoster": getFileData(Flip.third_screen.backgroundPosterName),
    "third_screen.mobileBackgroundPoster": getFileData(Flip.third_screen.mobileBackgroundPosterName),
    "fourth_screen.background": getFileData(Flip.fourth_screen.backgroundName),
    "fourth_screen.mobileBackground": getFileData(Flip.fourth_screen.mobileBackgroundName),
    "fourth_screen.backgroundPoster": getFileData(Flip.fourth_screen.backgroundPosterName),
    "fourth_screen.mobileBackgroundPoster": getFileData(Flip.fourth_screen.mobileBackgroundPosterName),
    "fifth_screen.background": getFileData(Flip.fifth_screen.backgroundName),
    "fifth_screen.mobileBackground": getFileData(Flip.fifth_screen.mobileBackgroundName),
    "fifth_screen.backgroundPoster": getFileData(Flip.fifth_screen.backgroundPosterName),
    "fifth_screen.mobileBackgroundPoster": getFileData(Flip.fifth_screen.mobileBackgroundPosterName),
    "sixth_screen.background": getFileData(Flip.sixth_screen.backgroundName),
    "sixth_screen.mobileBackground": getFileData(Flip.sixth_screen.mobileBackgroundName),
    "sixth_screen.backgroundPoster": getFileData(Flip.sixth_screen.backgroundPosterName),
    "sixth_screen.mobileBackgroundPoster": getFileData(Flip.sixth_screen.mobileBackgroundPosterName),
    "seventh_screen.background": getFileData(Flip.seventh_screen.backgroundName),
    "seventh_screen.mobileBackground": getFileData(Flip.seventh_screen.mobileBackgroundName),
    "seventh_screen.backgroundPoster": getFileData(Flip.seventh_screen.backgroundPosterName),
    "seventh_screen.mobileBackgroundPoster": getFileData(Flip.seventh_screen.mobileBackgroundPosterName),
    "eighth_screen.background": getFileData(Flip.eighth_screen.backgroundName),
    "eighth_screen.mobileBackground": getFileData(Flip.eighth_screen.mobileBackgroundName),
    "eighth_screen.backgroundPoster": getFileData(Flip.eighth_screen.backgroundPosterName),
    "eighth_screen.mobileBackgroundPoster": getFileData(Flip.eighth_screen.mobileBackgroundPosterName)
  };

  if (shouldImportSeedData) {
    await createEntry({ model: "flip", entry: Flip, files });
  }
  await updateEntry({ model: "flip", entry: Flip, files });
}

async function importSeedData(shouldImportSeedData) {
  await setPublicPermissions({
    global: ['find'],
    homepage: ['find'],
    'self-driving-car': ['find'],
    career: ['find'],
    'about-company': ['find'],
    flip: ['find'],
    form: ['send']
  });
  await importHomepage(shouldImportSeedData);
  await importGlobal(shouldImportSeedData);
  await importSelfDrivingCar(shouldImportSeedData);
  await importCareer(shouldImportSeedData);
  await importAboutCompany(shouldImportSeedData);
  await importFlip(shouldImportSeedData);
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
