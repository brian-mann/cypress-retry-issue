// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --

//this is the retry logic - overrides the visit command
Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  const callUntil200 = (numberOfRetries, interval) => {
    let count = 0;

    function run() {
      cy
        .request({
          url,
          failOnStatusCode: false
        })
        .then(resp => {
          if (resp.status === 200) {
            originalFn(url, options);
            return;
          }

          if (count < numberOfRetries) {
            count += 1;
            cy.wait(interval);
            run();
          }
        });
    }

    run();
  };

  return callUntil200(6, 3000);
});
