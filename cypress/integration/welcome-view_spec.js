describe('Welcome view tests', () => {
  it('should welcome the user to the site', () => {
    cy.task('getAppURL').then((url) => {
      
      cy.visit(url);
    
      cy.wait(4000);
    
      cy.location().then((location) => {
        if (location.host === 'auth.services.adobe.com') {
          cy.signIn();
        
          cy.wait(12000);
        }
        
        cy.getIframeBody()
          .find('#root').should('include.text', 'Get started by listing all briefs or create a new brief')
      });
    });
  });
});