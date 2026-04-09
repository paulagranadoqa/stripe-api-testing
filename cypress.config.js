const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    video: true, // Isso obriga o Cypress a gravar o vídeo
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});