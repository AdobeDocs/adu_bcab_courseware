describe('Get token', () => {
  it('should sign in and save the user access token', () => {
    cy.task('readJSONFile', 'token.json').then((token) => {
      let getToken = true;
    
      if (token) {
        if (new Date(token.expire) > new Date()) {
          cy.wrap(token).as('token');
          getToken = false;
        }
      }
    
      if (getToken) {
        cy.visit('https://adobe.io');
      
        cy.get('header button').contains('Sign in').click();
      
        cy.wait(4000);
      
        cy.location().then((location) => {
          if (location.host === 'auth.services.adobe.com') {
            cy.signIn();
          
            cy.wait(4000);
          }
        
          cy.window().then((window) => {
            const token = window.adobeIMS.getAccessToken();
            cy.wrap(token).as('token');
            cy.writeFile('token.json', JSON.stringify(token));
          });
        });
      }
    });
  });
});