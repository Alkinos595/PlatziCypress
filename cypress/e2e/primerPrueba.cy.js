describe("Primer prueba", () => {

    it("Navegar a nuestra primera pagina", () => {
        cy.visit("www.google.com");
        cy.wait(3000);
        cy.visit('www.platzi.com');
    })

})