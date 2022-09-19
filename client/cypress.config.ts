import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'cft41b',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: '__test__/e2e/**.cy.{ts,tsx}',
  },
});
