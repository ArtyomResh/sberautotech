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
  Flip,
  Vacancy
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
    files[`first_screen.${i}.mobileBackground`] = getFileData(screenItem.mobileBackgroundName)
    if (screenItem.backgroundPosterName) {
      files[`first_screen.${i}.backgroundPoster`] = getFileData(screenItem.backgroundPosterName)
    }
    if (screenItem.backgroundPosterName) {
      files[`first_screen.${i}.mobileBackgroundPoster`] = getFileData(screenItem.mobileBackgroundPosterName)
    }
    screenItem['cards'].map((cardItem, k) => {
      files[`first_screen.${i}.cards.${k}.image`] = getFileData(cardItem.imageName)
    })
  });
  homepage['second_screen'].map((screenItem, i) => {
    files[`second_screen.${i}.background`] = getFileData(screenItem.backgroundName)
    files[`second_screen.${i}.mobileBackground`] = getFileData(screenItem.mobileBackgroundName)
    if (screenItem.backgroundPosterName) {
      files[`second_screen.${i}.backgroundPoster`] = getFileData(screenItem.backgroundPosterName)
    }
    if (screenItem.backgroundPosterName) {
      files[`second_screen.${i}.mobileBackgroundPoster`] = getFileData(screenItem.mobileBackgroundPosterName)
    }
    screenItem['cards'].map((cardItem, k) => {
      files[`second_screen.${i}.cards.${k}.image`] = getFileData(cardItem.imageName)
    })
  });
  homepage['third_screen'].map((screenItem, i) => {
    files[`third_screen.${i}.background`] = getFileData(screenItem.backgroundName)
    files[`third_screen.${i}.mobileBackground`] = getFileData(screenItem.mobileBackgroundName)
    if (screenItem.backgroundPosterName) {
      files[`third_screen.${i}.backgroundPoster`] = getFileData(screenItem.backgroundPosterName)
    }
    if (screenItem.backgroundPosterName) {
      files[`third_screen.${i}.mobileBackgroundPoster`] = getFileData(screenItem.mobileBackgroundPosterName)
    }
    screenItem['cards'].map((cardItem, k) => {
      files[`third_screen.${i}.cards.${k}.image`] = getFileData(cardItem.imageName)
    })
  });
  homepage['fourth_screen'].map((screenItem, i) => {
    files[`fourth_screen.${i}.background`] = getFileData(screenItem.backgroundName)
    files[`fourth_screen.${i}.mobileBackground`] = getFileData(screenItem.mobileBackgroundName)
    if (screenItem.backgroundPosterName) {
      files[`fourth_screen.${i}.backgroundPoster`] = getFileData(screenItem.backgroundPosterName)
    }
    if (screenItem.backgroundPosterName) {
      files[`fourth_screen.${i}.mobileBackgroundPoster`] = getFileData(screenItem.mobileBackgroundPosterName)
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
    "double_block.background": getFileData(SelfDrivingCar['double_block'].backgroundName),
    "double_block.backgroundPoster": getFileData(SelfDrivingCar['double_block'].backgroundPosterName),
    "double_block.mobileBackground": getFileData(SelfDrivingCar['double_block'].mobileBackgroundName),
    "double_block.mobileBackgroundPoster": getFileData(SelfDrivingCar['double_block'].mobileBackgroundPosterName),
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
    "first_screen.backgroundOgg": getFileData(Flip.first_screen.backgroundOggName),
    "second_screen.background": getFileData(Flip.second_screen.backgroundName),
    "second_screen.mobileBackground": getFileData(Flip.second_screen.mobileBackgroundName),
    "second_screen.backgroundOgg": getFileData(Flip.second_screen.backgroundOggName),
    "third_screen.background": getFileData(Flip.third_screen.backgroundName),
    "third_screen.mobileBackground": getFileData(Flip.third_screen.mobileBackgroundName),
    "third_screen.backgroundOgg": getFileData(Flip.third_screen.backgroundOggName),
    "fourth_screen.background": getFileData(Flip.fourth_screen.backgroundName),
    "fourth_screen.mobileBackground": getFileData(Flip.fourth_screen.mobileBackgroundName),
    "fourth_screen.backgroundOgg": getFileData(Flip.fourth_screen.backgroundOggName),
    "fifth_screen.background": getFileData(Flip.fifth_screen.backgroundName),
    "fifth_screen.mobileBackground": getFileData(Flip.fifth_screen.mobileBackgroundName),
    "fifth_screen.backgroundOgg": getFileData(Flip.fifth_screen.backgroundOggName),
    "sixth_screen.background": getFileData(Flip.sixth_screen.backgroundName),
    "sixth_screen.mobileBackground": getFileData(Flip.sixth_screen.mobileBackgroundName),
    "sixth_screen.backgroundOgg": getFileData(Flip.sixth_screen.backgroundOggName),
    "seventh_screen.background": getFileData(Flip.seventh_screen.backgroundName),
    "seventh_screen.mobileBackground": getFileData(Flip.seventh_screen.mobileBackgroundName),
    "seventh_screen.backgroundOgg": getFileData(Flip.seventh_screen.backgroundOggName),
    "eighth_screen.background": getFileData(Flip.eighth_screen.backgroundName),
    "eighth_screen.mobileBackground": getFileData(Flip.eighth_screen.mobileBackgroundName),
    "eighth_screen.backgroundOgg": getFileData(Flip.eighth_screen.backgroundOggName)
  };

  if (shouldImportSeedData) {
    await createEntry({ model: "flip", entry: Flip, files });
  }
  await updateEntry({ model: "flip", entry: Flip, files });
}

async function importVacancies(shouldImportSeedData) {
  if (shouldImportSeedData) {
    await createEntry({ model: "vacancy", entry: Vacancy });
  }
  await updateEntry({ model: "vacancy", entry: Vacancy });
}

async function importSeedData(shouldImportSeedData) {
  await setPublicPermissions({
    global: ['find'],
    homepage: ['find'],
    'self-driving-car': ['find'],
    career: ['find'],
    'about-company': ['find'],
    flip: ['find'],
    form: ['send'],
    vacancy: ['find', 'findOne']
  });
  await importHomepage(shouldImportSeedData);
  await importGlobal(shouldImportSeedData);
  await importSelfDrivingCar(shouldImportSeedData);
  await importCareer(shouldImportSeedData);
  await importAboutCompany(shouldImportSeedData);
  await importFlip(shouldImportSeedData);
  await importVacancies(shouldImportSeedData)
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
