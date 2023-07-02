const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportWidth: 1024,
  viewportHeight: 768,
  projectId: "96qg5n",  
  e2e: {
    baseUrl: 'https://demoqa.com',
    testIsolation: false, //& Aislamiento de pruebas 
  /* 
  Si el aislamiento de pruebas está deshabilitado,
  el estado del navegador, incluyendo la página, las cookies,
  el almacenamiento local y el almacenamiento de sesión,
  no se borra entre pruebas en esa suite.
  */

    setupNodeEvents(on, config) {
      // implement node event listeners here
      //& El siguiente es un plugin para imprimir en la consola del terminal
      on('task',{
        log(message){
          console.log(`Soy el console log del Task: ${message}`)
          return null
        }
      })
      return {
        excludeSpecPattern: [
          "./cypress/e2e/1-getting-started/*.cy.js",
          "./cypress/e2e/2-advanced-examples/*.cy.js"
        ],
      }
    },
  },
});
