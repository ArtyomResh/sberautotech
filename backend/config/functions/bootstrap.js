"use strict";

const fs = require("fs");
const mime = require("mime-types");
const {
  homepageRu,
  homepageEn,
  globalRu,
  globalEn,
  SelfDrivingCarRu,
  SelfDrivingCarEn,
  CareerRu,
  CareerEn,
  AboutCompanyRu,
  AboutCompanyEn,
  FlipRu,
  FlipEn,
  NavPanelRu,
  NavPanelEn,
  FooterRu,
  FooterEn,
  PrivacyPolicyRu,
  PrivacyPolicyEn,
  RespondFormRu,
  RespondFormEn,
  VacanciesPageRu,
  VacanciesPageEn,
  VacancyPageRu,
  VacancyPageEn,
  Vacancies,
  Tags,
  Directions,
  Cities,
  Areas,
  JobTypes
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
    if (previousEntry) {
      return await strapi.entityService.update({ params, data: previousEntry, files }, { model });
    }
    return await strapi.entityService.create({ data: entry, files }, { model });
  } catch (e) {
    console.log('model', entry, e);
  }
}

async function importTags(shouldImportSeedData) {
  for (const item of Tags.data) {
    if (shouldImportSeedData) {
      await createEntry({ model: "tag", entry: item });
    }
    await updateEntry({ model: "tag", entry: item });
  }
}

async function importDirections(shouldImportSeedData) {
  for (const item of Directions.data) {
    if (shouldImportSeedData) {
      await createEntry({ model: "direction", entry: item });
    }
    await updateEntry({ model: "direction", entry: item });
  }
}

async function importCities(shouldImportSeedData) {
  for (const item of Cities.data) {
    if (shouldImportSeedData) {
      await createEntry({ model: "city", entry: item });
    }
    await updateEntry({ model: "city", entry: item });
  }
}

async function importAreas(shouldImportSeedData) {
  for (const item of Areas.data) {
    if (shouldImportSeedData) {
      await createEntry({ model: "area", entry: item });
    }
    await updateEntry({ model: "area", entry: item });
  }
}

async function importJobTypes(shouldImportSeedData) {
  for (const item of JobTypes.data) {
    if (shouldImportSeedData) {
      await createEntry({ model: "job-type", entry: item });
    }
    await updateEntry({ model: "job-type", entry: item });
  }
}

async function importVacancies(shouldImportSeedData) {
  for (const item of Vacancies.data) {
    if (shouldImportSeedData) {
      await createEntry({ model: "vacancy", entry: item });
    }
    await updateEntry({ model: "vacancy", entry: item });
  }
}

async function importHomepage(shouldImportSeedData) {
  const files = {
    "seo.shareImage": getFileData("default-image.png"),
  };
  homepageRu['first_screen'].map((screenItem, i) => {
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
  homepageRu['second_screen'].map((screenItem, i) => {
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
  homepageRu['third_screen'].map((screenItem, i) => {
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
  homepageRu['fourth_screen'].map((screenItem, i) => {
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
    await createEntry({ model: "homepage", entry: homepageRu, files });
    await createEntry({ model: "homepage", entry: homepageEn, files });
  }
  await updateEntry({ model: "homepage", entry: homepageRu, files });
  await updateEntry({ model: "homepage", entry: homepageEn, files });
}

async function importGlobal(shouldImportSeedData) {
  const files = {
    "favicon": getFileData("favicon.png"),
    "defaultSeo.shareImage": getFileData("default-image.png"),
  };

  if (shouldImportSeedData) {
    await createEntry({ model: "global", entry: globalRu, files });
    await createEntry({ model: "global", entry: globalEn, files });
  }
  await updateEntry({ model: "global", entry: globalRu, files });
  await updateEntry({ model: "global", entry: globalEn, files });
}

async function importSelfDrivingCar(shouldImportSeedData) {
  const files = {
    "double_block.background": getFileData(SelfDrivingCarRu['double_block'].backgroundName),
    "double_block.backgroundPoster": getFileData(SelfDrivingCarRu['double_block'].backgroundPosterName),
    "double_block.mobileBackground": getFileData(SelfDrivingCarRu['double_block'].mobileBackgroundName),
    "double_block.mobileBackgroundPoster": getFileData(SelfDrivingCarRu['double_block'].mobileBackgroundPosterName),
    "slider.slider_items": []
  };
  SelfDrivingCarRu['story_cards'].map((item, i) => {
    files[`story_cards.${i}.image`] = getFileData(item.imageName)
  });
  SelfDrivingCarRu.slider.slider_items_names.map((item) => {
    files[`slider.slider_items`].push(getFileData(item))
  });
  if (shouldImportSeedData) {
    await createEntry({ model: "self-driving-car", entry: SelfDrivingCarRu, files });
    await createEntry({ model: "self-driving-car", entry: SelfDrivingCarEn, files });
  }
  await updateEntry({ model: "self-driving-car", entry: SelfDrivingCarRu, files });
  await updateEntry({ model: "self-driving-car", entry: SelfDrivingCarEn, files });
}

async function importCareer(shouldImportSeedData) {
    const files = {
      "top_slider.slider_items": [],
      "bottom_slider.slider_items": []
    };
    CareerRu.top_slider.slider_items_names.map((item) => {
      files[`top_slider.slider_items`].push(getFileData(item))
    });

    CareerRu.bottom_slider.slider_items_names.map((item) => {
      files[`bottom_slider.slider_items`].push(getFileData(item))
    });

    if (shouldImportSeedData) {
      await createEntry({ model: "career", entry: CareerRu, files });
      await createEntry({ model: "career", entry: CareerEn, files });
    }
    await updateEntry({ model: "career", entry: CareerRu, files });
    await updateEntry({ model: "career", entry: CareerEn, files });
}

async function importAboutCompany(shouldImportSeedData) {
  const files = {
    "headerBackground": getFileData(AboutCompanyRu.headerBackgroundName),
    "slider.slider_items": []
  };
  AboutCompanyRu.list['list_items'].map((item, i) => {
    files[`list.list_items.${i}.image`] = getFileData(item.imageName)
  });

  AboutCompanyRu.slider.slider_items_names.map((item) => {
    files[`slider.slider_items`].push(getFileData(item))
  });

  if (shouldImportSeedData) {
    await createEntry({ model: "about-company", entry: AboutCompanyRu, files });
    await createEntry({ model: "about-company", entry: AboutCompanyEn, files });
  }
  await updateEntry({ model: "about-company", entry: AboutCompanyRu, files });
  await updateEntry({ model: "about-company", entry: AboutCompanyEn, files });
}

async function importFlip(shouldImportSeedData) {
  const files = {
    "first_screen.background": getFileData(FlipRu.first_screen.backgroundName),
    "first_screen.mobileBackground": getFileData(FlipRu.first_screen.mobileBackgroundName),
    "first_screen.backgroundOgg": getFileData(FlipRu.first_screen.backgroundOggName),
    "second_screen.background": getFileData(FlipRu.second_screen.backgroundName),
    "second_screen.mobileBackground": getFileData(FlipRu.second_screen.mobileBackgroundName),
    "second_screen.backgroundOgg": getFileData(FlipRu.second_screen.backgroundOggName),
    "third_screen.background": getFileData(FlipRu.third_screen.backgroundName),
    "third_screen.mobileBackground": getFileData(FlipRu.third_screen.mobileBackgroundName),
    "third_screen.backgroundOgg": getFileData(FlipRu.third_screen.backgroundOggName),
    "fourth_screen.background": getFileData(FlipRu.fourth_screen.backgroundName),
    "fourth_screen.mobileBackground": getFileData(FlipRu.fourth_screen.mobileBackgroundName),
    "fourth_screen.backgroundOgg": getFileData(FlipRu.fourth_screen.backgroundOggName),
    "fifth_screen.background": getFileData(FlipRu.fifth_screen.backgroundName),
    "fifth_screen.mobileBackground": getFileData(FlipRu.fifth_screen.mobileBackgroundName),
    "fifth_screen.backgroundOgg": getFileData(FlipRu.fifth_screen.backgroundOggName),
    "sixth_screen.background": getFileData(FlipRu.sixth_screen.backgroundName),
    "sixth_screen.mobileBackground": getFileData(FlipRu.sixth_screen.mobileBackgroundName),
    "sixth_screen.backgroundOgg": getFileData(FlipRu.sixth_screen.backgroundOggName),
    "seventh_screen.background": getFileData(FlipRu.seventh_screen.backgroundName),
    "seventh_screen.mobileBackground": getFileData(FlipRu.seventh_screen.mobileBackgroundName),
    "seventh_screen.backgroundOgg": getFileData(FlipRu.seventh_screen.backgroundOggName),
    "eighth_screen.background": getFileData(FlipRu.eighth_screen.backgroundName),
    "eighth_screen.mobileBackground": getFileData(FlipRu.eighth_screen.mobileBackgroundName),
    "eighth_screen.backgroundOgg": getFileData(FlipRu.eighth_screen.backgroundOggName)
  };

  if (shouldImportSeedData) {
    await createEntry({ model: "flip", entry: FlipRu, files });
    await createEntry({ model: "flip", entry: FlipEn, files });
  }
  await updateEntry({ model: "flip", entry: FlipRu, files });
  await updateEntry({ model: "flip", entry: FlipEn, files });
}

async function importVacanciesPage(shouldImportSeedData) {
  if (shouldImportSeedData) {
    await createEntry({ model: "vacancies-page", entry: VacanciesPageRu });
    await createEntry({ model: "vacancies-page", entry: VacanciesPageEn });
  }
  await updateEntry({ model: "vacancies-page", entry: VacanciesPageRu });
  await updateEntry({ model: "vacancies-page", entry: VacanciesPageEn });
}

async function importVacancyPage(shouldImportSeedData) {
  const files = {
    "video": getFileData(VacancyPageRu.videoName),
    "videoPoster": getFileData(VacancyPageRu.videoPosterName)
  };
  if (shouldImportSeedData) {
    await createEntry({ model: "vacancy-page", entry: VacancyPageRu, files });
    await createEntry({ model: "vacancy-page", entry: VacancyPageEn, files });
  }
  await updateEntry({ model: "vacancy-page", entry: VacancyPageRu, files });
  await updateEntry({ model: "vacancy-page", entry: VacancyPageEn, files });
}

async function importNavPanel(shouldImportSeedData) {
  if (shouldImportSeedData) {
    await createEntry({ model: "nav-panel", entry: NavPanelRu });
    await createEntry({ model: "nav-panel", entry: NavPanelEn });
  }
  await updateEntry({ model: "nav-panel", entry: NavPanelRu });
  await updateEntry({ model: "nav-panel", entry: NavPanelEn });
}

async function importPrivacyPolicy(shouldImportSeedData) {
  if (shouldImportSeedData) {
    await createEntry({ model: "privacy-policy", entry: PrivacyPolicyRu });
    await createEntry({ model: "privacy-policy", entry: PrivacyPolicyEn });
  }
  await updateEntry({ model: "privacy-policy", entry: PrivacyPolicyRu });
  await updateEntry({ model: "privacy-policy", entry: PrivacyPolicyEn });
}

async function importRespondForm(shouldImportSeedData) {
  if (shouldImportSeedData) {
    await createEntry({ model: "respond-form", entry: RespondFormRu });
    await createEntry({ model: "respond-form", entry: RespondFormEn });
  }
  await updateEntry({ model: "respond-form", entry: RespondFormRu });
  await updateEntry({ model: "respond-form", entry: RespondFormEn });
}

async function importFooter(shouldImportSeedData) {
  if (shouldImportSeedData) {
    await createEntry({ model: "footer", entry: FooterRu });
    await createEntry({ model: "footer", entry: FooterEn });
  }
  await updateEntry({ model: "footer", entry: FooterRu });
  await updateEntry({ model: "footer", entry: FooterEn });
}

async function importSeedData(shouldImportSeedData) {
  await setPublicPermissions({
    global: ['find'],
    homepage: ['find'],
    'self-driving-car': ['find'],
    career: ['find'],
    'about-company': ['find'],
    flip: ['find'],
    'nav-panel': ['find'],
    'vacancies-page': ['find'],
    'vacancy-page': ['find'],
    footer: ['find'],
    'privacy-policy': ['find'],
    'respond-form': ['find'],
    form: ['send'],
    vacancy: ['find', 'findone'],
    tag: ['find', 'findone'],
    direction: ['find', 'findone'],
    city: ['find', 'findone'],
    area: ['find', 'findone'],
    'job-type': ['find', 'findone']
  });
  await importTags(shouldImportSeedData);
  await importDirections(shouldImportSeedData);
  await importCities(shouldImportSeedData);
  await importAreas(shouldImportSeedData);
  await importJobTypes(shouldImportSeedData);
  await importVacancies(shouldImportSeedData);
  await importHomepage(shouldImportSeedData);
  await importGlobal(shouldImportSeedData);
  await importSelfDrivingCar(shouldImportSeedData);
  await importCareer(shouldImportSeedData);
  await importAboutCompany(shouldImportSeedData);
  await importFlip(shouldImportSeedData);
  await importNavPanel(shouldImportSeedData);
  await importFooter(shouldImportSeedData);
  await importPrivacyPolicy(shouldImportSeedData);
  await importRespondForm(shouldImportSeedData);
  await importVacanciesPage(shouldImportSeedData);
  await importVacancyPage(shouldImportSeedData);
}

module.exports = async () => {
  const shouldImportSeedData = await isFirstRun();

  if (shouldImportSeedData) {
    await strapi.query('locale', 'i18n').create({
      id: 2,
      code: 'en',
      name: 'English (en)'
    })
  }

  try {
    console.log('Setting up your starter...');
    await importSeedData(shouldImportSeedData);
    console.log('Ready to go');
  } catch (error) {
    console.log('Could not import seed data');
    console.error(error);
  }
};
