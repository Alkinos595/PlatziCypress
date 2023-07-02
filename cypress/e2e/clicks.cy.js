describe('Interactuar con los elementos con click', () => {

    before(() => {
        cy.once('uncaught:exception', () => false);
        cy.visit('/buttons');
    })

    it('click', () => {
        cy.get('button').eq(3).click()
        cy.get('#dynamicClickMessage').should('be.visible').and('contain', 'You have done a dynamic click')
    });
    it('double click', () => {
		cy.get('#doubleClickBtn').dblclick()
		cy.get('#doubleClickMessage')
			.should('be.visible')
			.and('contain', 'You have done a double click')
    });
    it('Right Click', () => {
		cy.get('#rightClickBtn').rightclick()
		cy.get('#rightClickMessage')
			.should('be.visible')
			.and('contain', 'You have done a right click')
	})
    /* it.only('Force Click', () => {
        cy.once('uncaught:exception', () => false);
		cy.visit('/dynamic-properties')
		//cy.get('#enableAfter').click({ timeout: 0 })
		cy.get('#enableAfter').click({ timeout: 0, force: true })
	}) */
    it('Click por posicion', () => {
		cy.get('button').eq(3).parent().parent().click('topRight')
		cy.get('button').eq(3).parent().parent().click('bottomLeft')
		cy.get('button').eq(3).parent().parent().click(5, 60)
	})

	it('Multiple Click', () => {
		cy.get('.btn.btn-primary').click({ multiple: true })
	})

	it('Click con teclas alternativas', () => {
		cy.get('button').eq(3).click({
			shiftKey: true,
			// p optionKey
			altKey: true,
			ctrlKey: true,
			// windows o command en mac
			metaKey: true,
		})
	})

});