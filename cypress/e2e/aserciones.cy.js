describe('Aserciones', () => {
    before(() => {
        cy.once('uncaught:exception', () => false);
        cy.visit('/automation-practice-form');
        cy.wait(3000);
    })

    it('Asercion', () => {
        cy.url().should('include', "demoqa.com")
        cy.get('#firstName').should('be.visible').and('have.attr','placeholder', 'First Name')
    })
    it('Asercion 2', () => {
        cy.get('#firstName').then((element) => {
          expect(element).to.be.visible
          expect(element).to.have.attr('placeholder', 'First Name')
        })
    })
    it('Asercion 3', () => {
        cy.get('#firstName').then((element) => {
          assert.equal(element.attr('placeholder'),'First Name')
        })
    })

});