describe('Guardando elementos', () => {
    before(() => {
        cy.once('uncaught:exception', () => false);
        cy.visit('/automation-practice-form');
        cy.wait(3000);
    })

    it('Repeticion', () => {
        // Obten el elemento Padre
        cy.get('input[placeholder="First Name"]').parent()
        //Obtener los elementos Padres en general
        cy.get('input[placeholder="First Name"]').parents()
        // Obten el elemento Padre y el elemento Hijo
        cy.get('input[placeholder="First Name"]').parents().find('label')

        // Obteniendo el elemento padre y el elemento hijo limitando el padre
        cy.get('input[placeholder="First Name"]').parents('form').find('label')

        cy.get('form').find('label')
    })

    it('Evitar repeticion', () => {

        cy.get('input[placeholder="First Name"]').parents("form").then((form) => {
            const inputs = form.find("input")
            const divs = form.find("div")
            const labels = form.find("label")

            expect(inputs.length).equal(15)//Sintaxis de jquery
            cy.wrap(inputs).should('have.length', 15)//Sintaxis de Cypress con wrap

            expect(divs.length).equal(70)
            expect(labels.length).equal(16)

            //console.log("Soy la longitud: ", inputs.length)

            cy.log('Soy la longitud: ',inputs.length);//Console log de cypress
            //cy.pause()//Pausa el script
            //debugger//Pausa el script y entra en modo debuggin si las devtools estan abiertas
            
            //TODO Colocar el task en el cypress.config.js
            /* on('task', {
                log(message) {
                    console.log(`Soy el console log del Task: ${message}`)
                    return null
                }
            }) */
            cy.task('log', inputs.length)//Ejecuntando el task 
        })
        cy.get('input[placeholder="First Name"]').then(console.log)//solo imprime el elemento
        cy.get('input[placeholder="First Name"]').debug()//imprime el elemento completo

    });

});