Cypress.Commands.add("fillMandatoryFieldsAndSubmit", (dados) => {
  cy.get("#firstName").click().type(dados.firstName);
  cy.get("#lastName").click().type(dados.lastName);
  cy.get("#email").click().type(dados.email);
  cy.get("#phone").click().type("5199955667722");
  cy.get("#open-text-area").click().type(dados.text);
  cy.get('button[type="submit"]').click();
});
