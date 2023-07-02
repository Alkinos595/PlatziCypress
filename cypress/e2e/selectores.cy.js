describe('Tipos de Selectores test', () => {
    it('Visitar la pagina', () => {
        cy.once('uncaught:exception', () => false);
        cy.visit('/automation-practice-form');
        cy.wait(3000);
    });
    it('Obtener por medio de tag(etiqueta)', () => {
        cy.get('input');
    });
    it('Obtener por medio de atributo', () => {
        cy.get('[placeholder="First Name"]');
    });

    it('Obteniendo por un atributo y tag', () => {
        cy.get('input[placeholder="First Name"]')
    });

    it('Obteniendo por un id', () => {
        cy.get('#firstName')
    });

    it('Obteniendo por un class', () => {
        cy.get('.mr-sm-2.form-control')
    });
    it('Usando parent', () => {
		// Obten el elemento Padre
		cy.get('input[placeholder="First Name"]').parent()
		//Obtener los elementos Padres en general
		cy.get('input[placeholder="First Name"]').parents()
		// Obten el elemento Padre y el elemento Hijo
		cy.get('input[placeholder="First Name"]').parents().find('label')

		// Obteniendo el elemento padre y el elemento hijo limitando el padre
		cy.get('input[placeholder="First Name"]').parents('form').find('label')

		cy.get('form').find('label')
		//uso incorrrecto de find
		//cy.find('label') --> esto no funciona
	})
});