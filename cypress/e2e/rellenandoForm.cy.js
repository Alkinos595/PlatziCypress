describe('Rellenar datos de un formulario', () => {
	let texto;
	/* before(() => {
		cy.once('uncaught:exception', () => false);
		cy.visit('/automation-practice-form');
	}) */

	it('Escribir en un input text', () => {
		cy.get('#firstName').type('Javier')
		cy.get('#lastName').type('Fuentes')
		//Observa que pasa si se vuelve a mandar el type , el texto se concatena
		cy.get('#firstName').type('Javier')
		//Entonces limpiemos el input
		cy.get('#firstName').type('{selectAll}{backspace}')
		cy.get('#firstName').type('Otro nombre')
		//Otra forma de hacerlo
		cy.get('#firstName').clear()
		//Movernos al otro input
		cy.get('#firstName').type('Otro nombre{enter}')
	});
	it('Checkboxes y Radio buttons', () => {
		//cy.get('#gender-radio-1').click()
		//cy.get('#gender-radio-1').click({force:true})
		//cy.get('#gender-radio-1').check({force:true})
		cy.get('label[for="gender-radio-1"]').click()

		//cy.get('#hobbies-checkbox-1').click()
		//cy.get('#hobbies-checkbox-1').click({force:true})
		//cy.get('#hobbies-checkbox-1').check({force:true})
		cy.get('label[for="hobbies-checkbox-1"]').click()
		cy.get('label[for="hobbies-checkbox-1"]').click()
	});

	//Es importante tener el function y no solo un arrow function 
	//Ya que las arrow function carecen de contexto y por ende del this
	it('Extrayendo informacion', function () {
		// a veces fallara porque lo cubre otro elemento

		cy.get('#firstName').as('nombre')
		cy.get('@nombre').type('Javier')
		// Primera manera de hacerlo
		cy.get('@nombre').then(($nombre) => {
			texto = $nombre.val()
			expect(texto).to.equal('Javier')
		})

		// Segunda manera de hacerlo, invoke solo invoca una funcion que en este caso el elemento que nos regresa el get , como jquery tiene
		cy.get('@nombre').invoke('val').should('equal', 'Javier')
		cy.get('@nombre').invoke('val').as('nombreGlobal')
	})

	//Es importante tener el function y no solo un arrow function 
	//Ya que las arrow function carecen de contexto y por ende del this
	it('pasando informacion entre its', function () {
		// Con la variable global
		//cy.get('#lastName').type(texto)

		//CCon el alias
		cy.get('#lastName').type(this.nombreGlobal)
	})

	it('Drowdown(Select list)', function () {
		cy.visit('https://itera-qa.azurewebsites.net/home/automation');

		//Seleccionar por index
		cy.get('.custom-select').select(10)

		//Seleccionar por valor
		cy.get('.custom-select').select('3').should('have.value', '3')

		//Seleccionar por texto
		cy.get('.custom-select').select('Greece').should('have.value', '4')
	})

	it('Drowdown(Select list) dinamico', function () {
		// Con la variable global
		cy.visit('https://react-select.com/home')

		//Seleccionar por index
		cy.get('#react-select-6-input').type(' ')

		//Iterando por cada uno de los elementos
		cy.get('#react-select-6-listbox')
			.children()
			.children()
			/* .contains("Red") ---> Alternativa mas simple
			.click() */
			.each(($el, index, $list) => {
				if ($el.text() === 'Red') {
					$el.on('click')
				}
			})

		//Oh si conoces el id del elemento
		cy.get('#react-select-6-option-3').click()
	})

	it('Tablas', function () {
		cy.visit('https://www.w3schools.com/html/html_tables.asp')
		// Obteniendo los headers de la tabla
		cy.get('#customers')
			.find('th')
			.each(($el, index, $list) => {
				cy.log($el.text())
			})

		cy.get('#customers')
			.find('th')
			.first()
			.invoke('text')
			.should('equal', 'Company')

		cy.get('#customers')
			.find('th')
			.eq(1)
			.invoke('text')
			.should('equal', 'Contact')

		cy.get('#customers')
			.find('th')
			.eq(2)
			.invoke('text')
			.should('equal', 'Country')

		// Validamos el numero de filas
		cy.get('#customers').find('tr').should('have.length', 7)

		cy.get('#customers')
			.find('tr')
			.eq(1)
			.find('td')
			.eq(1)
			.invoke('text')
			.should('equal', 'Maria Anders')

		cy.get('#customers')
			.find('tr')
			.eq(1)
			.find('td')
			.eq(1)
			.then(($el) => {
				const texto = $el.text()
				expect(texto).to.equal('Maria Anders')
				cy.wrap($el).should('contain', 'Maria Anders')})
	})

	it('Interactuando con data picker', () => {
		cy.visit('https://material.angular.io/components/datepicker/overview')
		cy.get('datepicker-overview-example')
			.find('input')
			.eq(0)
			.type('12/02/2005{enter}')

		cy.get('datepicker-overview-example').find('svg').click()
	})

	it('Interactuando con modals', () => {
        cy.visit('/modal-dialogs')
        cy.get('#showSmallModal').click()
        cy.get('#closeSmallModal').click()
    })

    it('Interactuando con popups', () => {
		cy.once('uncaught:exception', () => false);
        cy.visit('/alerts')
        //Cypress automaticamente la acepta

        // Primer forma de hacerlo
        // cy.get('#confirmButton').click()
        // cy.on('window:confirm', (confirm) => {
        //     expect(confirm).to.equal('Do you confirm action?')
        // })
        // cy.contains('You selected Ok').should('exist')

        // Segundo forma de hacerlo
        const stub = cy.stub()
        cy.on('window:confirm', stub)
        cy.get('#confirmButton').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Do you confirm action?')
        })
        cy.contains('You selected Ok').should('exist')


        // rechazar la alerta
        // cy.get('#confirmButton').click()
        // cy.on('window:confirm', (confirm) => {
        //     expect(confirm).to.equal('Do you confirm action?')
        //     return false
        // })
        // cy.contains('You selected Cancel').should('exist')

    })

    it('Interactuando con tooltips', () => {
		cy.once('uncaught:exception', () => false);
        cy.visit('/tool-tips')
        cy.get('#toolTipButton').trigger('mouseover')
        cy.contains('You hovered over the Button').should('exist')
        cy.get('#toolTipButton').trigger('mouseout')
        cy.contains('You hovered over the Button').should('not.exist')
    })
	it.only('Interactuando con drag and drops', () => {
		cy.once('uncaught:exception', () => false);
        cy.visit('/dragabble')
        cy.get('#dragBox')
            .trigger('mousedown', {which: 1, pageX: 600, pageY: 100})
            .trigger('mousemove', {which: 1, pageX: 600, pageY: 600})
            .trigger('mouseup')
    })
});
