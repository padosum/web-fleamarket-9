/// <reference types="cypress" />
import 'cypress-file-upload';

// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      setupBasicInterceptor: () => void;
      setupImageUploadInterceptor: () => void;
      //   login(email: string, password: string): Chainable<void>
      //   drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //   dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //   visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
    }
  }
}

Cypress.Commands.add('setupBasicInterceptor', () => {
  cy.intercept(
    { method: 'GET', url: '/api/users/me' },
    { fixture: 'myInfo.json' },
  ).as('usersMe');
  cy.intercept(
    { method: 'GET', url: '/api/category' },
    { fixture: 'categories.json' },
  ).as('category');
  cy.intercept(
    { method: 'GET', url: '/api/location/me' },
    { fixture: 'myLocation.json' },
  ).as('locationMe');
  cy.intercept(
    { method: 'GET', url: '/api/item*' },
    { fixture: 'homeItem.json' },
  );
  cy.intercept(
    { method: 'GET', url: '/api/item/*' },
    { fixture: 'itemDetail.json' },
  );
  cy.intercept(
    { method: 'GET', url: '/api/item/me' },
    { fixture: 'myItem.json' },
  );
});

Cypress.Commands.add('setupImageUploadInterceptor', () => {
  cy.intercept(
    { method: 'POST', url: '/api/image' },
    {
      url: 'https://media.bunjang.co.kr/product/199664302_1_1663559233_w856.jpg',
    },
  ).as('uploadImage');
});
