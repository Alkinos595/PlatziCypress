describe('Navegacion',{ browser: '!chrome' }, () => {
//{ browser: '!chrome' } en todos los navegadores menos chrome, y sin ! es especificando chrome
    it("Navegar a nuestra primera pagina", () => {
        cy.visit('www.platzi.com')
    })

    it('Recargar pagina', () => {
        cy.reload()
    });

    it('Recarga forzada', () => {
        cy.visit('www.google.com')
        cy.reload(true)
    });
    it.only('Volver a atras o adelante', () => {
        cy.visit('www.google.com')
        cy.visit('https://www.google.com/search?q=agua&rlz=1C1YTUH_esVE1060VE1060&oq=agua&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRhA0gEHNDQ4ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8');
        cy.go("back")
        cy.go("forward")
        cy.go(-1)
        cy.go(1)
    });

});