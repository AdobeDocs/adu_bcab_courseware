describe('Welcome view tests', () => {
    it('should welcome the user to the site', () => {
        cy.visit('https://experience.adobe.com/#/@adobeiodemodev/custom-apps/301276-trainingproject'); 
        cy.getIframeBody()
        .find('#root').should('include.text', 'Get started by listing all briefs or create a new brief')  
  })
})