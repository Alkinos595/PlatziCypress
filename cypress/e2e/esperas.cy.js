describe('Esperando por elementos', () => {

    before(() => {
        cy.once('uncaught:exception', () => false);
        cy.visit('/automation-practice-form');
    })

    it('Esperar por tiempo definido', () => {
        cy.wait(5000)
    });
    it.only('Espera por un elemento', () => {
		//el tiempo por default es de 4 segundos
		//cy.get('#firstName',{timeout:6000})//Espera este tiempo hasta que el elemento aparesca
        cy.get('#firstName',{timeout:0})//No espera por el elemento
	})
});