//EXERCICIO 2

describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("src/index.html");
  });

  it("verifica o título da aplicação", () => {
    cy.title().should("eq", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatórios e envia o formulário", () => {
    cy.clock();

    const textoLongo = Cypress._.repeat("Loaland", 10);

    cy.get("#firstName").click().type("Guilherme");
    cy.get("#lastName").click().type("Alves", { delay: 0 });
    cy.get("#email").click().type("cactat@email.com");
    cy.get("#phone").click().type("5199955667722");
    cy.get("#open-text-area").click().type(textoLongo, { delay: 0 });
    cy.contains("button", "Enviar").click();
    cy.get(".success").should("be.visible");

    cy.tick(3000);

    cy.get(".success").should("not.be.visible");
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.clock();

    cy.get("#firstName").click().type("Guilherme");
    cy.get("#lastName").click().type("Alves");
    cy.get("#email").click().type("cactat");
    cy.get("#phone").click().type("5199955667722");
    cy.get("#open-text-area").click().type("Belo curso!");
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");

    cy.tick(3000);

    cy.get(".success").should("not.be.visible");
  });

  it("Valida se campo telefone continua vazio após inserir um valor não-numerico", () => {
    cy.get("#firstName").click().type("Guilherme");
    cy.get("#lastName").click().type("Alves", { delay: 0 });
    cy.get("#email").click().type("cactat@email.com");

    cy.get("#phone").click().type("teste").should("have.value", "");
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.clock();

    cy.get("#firstName").click().type("Guilherme");
    cy.get("#lastName").click().type("Alves");
    cy.get("#email").click().type("cactat@mail.com");
    cy.get("#phone-checkbox").click();
    cy.contains("button", "Enviar").click();

    cy.get(".error").should("be.visible");

    cy.tick(3000);

    cy.get(".success").should("not.be.visible");
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName")
      .click()
      .type("Guilherme")
      .should("have.value", "Guilherme")
      .clear()
      .should("have.value", "");
    cy.get("#lastName")
      .click()
      .type("Alves")
      .should("have.value", "Alves")
      .clear()
      .should("have.value", "");
    cy.get("#email")
      .click()
      .type("cactat@mail.com")
      .should("have.value", "cactat@mail.com")
      .clear()
      .should("have.value", "");
    cy.get("#phone")
      .click()
      .type("992537676")
      .should("have.value", "992537676")
      .clear()
      .should("have.value", "");
  });

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.contains("button", "Enviar").click();
    cy.get(".error").should("be.visible");
  });

  it("envia o formuário com sucesso usando um comando customizado (commands)", () => {
    cy.clock();

    const dados = {
      firstName: "Guilherme",
      lastName: "Alves",
      email: "cactat@mail.com",
      text: "Teste.",
    };

    cy.fillMandatoryFieldsAndSubmit(dados);

    cy.get(".success").should("be.visible");

    cy.tick(3000);

    cy.get(".success").should("not.be.visible");
  });

  //EXERCICIO 3

  describe("Selecionando opções em campos de seleção suspensa", () => {
    it("seleciona um produto (YouTube) por seu texto", () => {
      cy.get("#product").select("YouTube").should("have.value", "youtube");
    });

    it("seleciona um produto (Mentoria) por seu valor (value)", () => {
      cy.get("#product").select("mentoria").should("have.value", "mentoria");
    });

    it("seleciona um produto (Blog) por seu índice", () => {
      cy.get("#product").select(1).should("have.value", "blog");
    });
  });

  //EXERCICIO 4

  describe("Marcando inputs do tipo radio", () => {
    it('marca o tipo de atendimento "Feedback"', () => {
      cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should("be.checked");
    });

    it("marca cada tipo de atendimento", () => {
      cy.get('input[type="radio"][value="ajuda"]').check().should("be.checked");
      cy.get('input[type="radio"][value="elogio"]')
        .check()
        .should("be.checked");
      cy.get('input[type="radio"][value="feedback"]')
        .check()
        .should("be.checked");
    });

    //EXERCICIO ANTERIOR USANDO .each e .wrap

    it("marca cada tipo de atendimento", () => {
      cy.get('input[type="radio"]').each((typeOfService) => {
        cy.wrap(typeOfService).check().should("be.checked");
      });
    });
  });

  //EXERCICIO 5

  describe("Marcando (e desmarcando) inputs do tipo checkbox", () => {
    it("marca ambos checkboxes, depois desmarca o último", () => {
      cy.get('input[type="checkbox"]')
        .check()
        .should("be.checked")
        .last()
        .uncheck()
        .should("not.be.checked");
    });

    it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
      cy.clock();

      cy.get("#firstName").click().type("Guilherme");
      cy.get("#lastName").click().type("Alves");
      cy.get("#email").click().type("cactat@mail.com");
      cy.get("#phone-checkbox").check();
      cy.contains("button", "Enviar").click();

      cy.get(".error").should("be.visible");

      cy.tick(3000);

      cy.get(".success").should("not.be.visible");
    });
  });

  //EXERCICIO 6

  describe("Fazendo upload de arquivos com Cypress", () => {
    it("seleciona um arquivo da pasta fixtures", () => {
      cy.get("#file-upload")
        .selectFile("cypress/fixtures/example.json")
        //passando uma função para checar se o nome do arquivo está correto
        .should((input) => {
          expect(input[0].files[0].name).to.equal("example.json");
        });
    });

    it("seleciona um arquivo simulando um drag-and-drop", () => {
      cy.get("#file-upload")
        //abaixo foi passada uma função para simular como se o arquivo fosse arrastado da pasta para a aplicação
        .selectFile("cypress/fixtures/example.json", { action: "drag-drop" })
        .should((input) => {
          expect(input[0].files[0].name).to.equal("example.json");
        });
    });

    it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", () => {
      cy.fixture("example.json").as("sampleFile");
      cy.get("#file-upload")
        .selectFile("@sampleFile")
        .should((input) => {
          expect(input[0].files[0].name).to.equal("example.json");
        });
    });
  });

  //EXERCICIO 7

  describe("Lidando com links que abrem em outra aba", () => {
    it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () => {
      cy.contains("a", "Política de Privacidade")
        .should("have.attr", "href", "privacy.html")
        .and("have.attr", "target", "_blank");
    });

    it("acessa a página da política de privacidade removendo o target e então clicando no link", () => {
      cy.contains("a", "Política de Privacidade")
        .invoke("removeAttr", "target")
        .click();
      cy.contains("h1", "CAC TAT - Política de Privacidade").should(
        "be.visible"
      );
    });
  });

  //EXERCICIO 8

  describe("Simulando o viewport de um dispositivo móvel", () => {
    it("", () => {});
  });

  //EXERCICIO 12

  it("exibe e oculta as mensagens de sucesso e erro usando .invoke()", () => {
    cy.get(".success")
      .should("not.be.visible")
      .invoke("show")
      .should("be.visible")
      .and("contain", "Mensagem enviada com sucesso.")
      .invoke("hide")
      .should("not.be.visible");
    cy.get(".error")
      .should("not.be.visible")
      .invoke("show")
      .should("be.visible")
      .and("contain", "Valide os campos obrigatórios!")
      .invoke("hide")
      .should("not.be.visible");
  });

  it("preenche o campo da área de texto usando o comando invoke", () => {
    cy.get("#open-text-area")
      .invoke("val", "Qualquer texto digitado")
      .should("have.value", "Qualquer texto digitado");
  });

  it("faz uma requisição HTTP", () => {
    cy.request("https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html")
      .as("getRequest")
      .its("status")
      .should("be.equal", 200);
    cy.get("@getRequest").its("statusText").should("be.equal", "OK");
    cy.get("@getRequest").its("body").should("include", "CAC TAT");
  });

  //EXERCICIO 13

  it("Encontra o gato escondido na aplicação", () => {
    cy.get("#cat").invoke("show").should("be.visible");
    cy.get("#title").invoke("text", "CAT TAT");
    cy.get("#subtitle").invoke("text", "Eu amo gatos");
  });
});
