describe('Sign in', () => {
  it('should sign in and save the user access token', () => {
    cy.login(Cypress.env('email'), Cypress.env('password'));
  });
});