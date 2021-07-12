/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

const fs = require('fs');
const JSON5 = require('json5');

const readFile = (filename) => {
  if (fs.existsSync(filename)) {
    const content = fs.readFileSync(filename, 'utf8');
    
    return JSON5.parse(content);
  }
  
  return null;
};

/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  
  on('task', {
    readJSONFile(filename) {
      return readFile(filename);
    },
    getAppURL() {
      const {project} = readFile('.aio');
      return `https://experience.adobe.com/#/@${project.org.name.toLowerCase().replace(/\s/g,'')}/custom-apps/${project.org.id}-${project.name}`;
    }
  })
};
