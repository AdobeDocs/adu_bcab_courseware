// ***********************************************
// This example commands.js shows you how to
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
Cypress.Commands.add('login', (email, password) => {
  const setToken = () => {
    cy.window().then((window) => {
      const token = window.adobeIMS.getAccessToken();
      cy.wrap(token).as('token');
      cy.writeFile('token.json', JSON.stringify(token));
    });
  };
  
  cy.task('readFileMaybe', 'token.json').then((token) => {
    let getToken = true;
    
    if (token) {
      const parsedToken = JSON.parse(token);
      if (new Date(parsedToken.expire) > new Date()) {
        cy.wrap(parsedToken).as('token');
        getToken = false;
      }
    }
    
    if (getToken) {
      cy.visit('https://adobe.io');
  
      cy.get('header button').contains('Sign in').click();
  
      cy.wait(4000);
  
      cy.location().then((location) => {
        if (location.host === 'www.adobe.io') {
          setToken();
        }
        else {
          cy.get('[data-id="EmailPage-EmailField"]').type(email);
          cy.get('[data-id="EmailPage-ContinueButton"]').click();
          cy.get('[data-id="AccountChooser-AccountList-individual"]').click();
          cy.get('[data-id="PasswordPage-PasswordField"]').type(password);
          cy.get('[data-id="PasswordPage-ContinueButton"]').click();
      
          cy.wait(4000);
      
          setToken();
        }
      });
    }
  });
  
  
  // cy.window().then((win) => {
  //   cy.get('[data-id="EmailPage-EmailField"]').type(email, { release: false });
    // cy.get('[data-id="EmailPage-ContinueButton"]').click();
    // cy.get('[data-id="AccountChooser-AccountList-individual"]').click();
    // cy.get('[data-id="PasswordPage-PasswordField"]').type(password);
    // cy.get('[data-id="PasswordPage-ContinueButton"]').click();
  // });
  
  
  
  // cy.url().should('contain', 'adobe.io');
  //
  // cy.window().then((win) => {
  //   console.log(win);
  //   // console.log(win.adobeIMS.getAccessToken().token);
  // });
});
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
