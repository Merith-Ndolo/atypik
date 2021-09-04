// google.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test

describe("Fonctionnement du site", function () {
  // Se connecter
  it("Connexion", function () {
    cy.visit("https://atypikhous.herokuapp.com/");
    cy.visit("https://atypikhous.herokuapp.com/profil");
    cy.get("#login").click();
    cy.get("#email").type("mani.djei@gmail.com");
    cy.get("#password").type("12345678");
    cy.contains("Se connecter").click();
  });

  //S'enregister
  it("Creation de compte", function () {
    cy.visit("https://atypikhous.herokuapp.com/");
    cy.visit("https://atypikhous.herokuapp.com/profil");
    cy.get("#pseudo").type("john");
    cy.get("#email").type("merithmagni@gmail.com");
    cy.get("#tel").type("33755780388");
    cy.get("#password").type("12345678");
    cy.get("#password-conf").type("12345678");
    cy.get('[type="checkbox"]').check();

    //validate recaptcha
    cy.get("iframe")
      .first()
      .its("0.contentDocument.body")
      .should("not.be.undefined")
      .and("not.be.empty")
      .then(cy.wrap)
      .find("#recaptcha-anchor")
      .should("be.visible")
      .click();
    cy.contains("Se connecter").click();
    cy.contains("Valider inscription").click();
  });

  //Effectuer une reservation
  it("Effectuer une reservation", function () {
    cy.visit("https://atypikhous.herokuapp.com/");
    cy.visit("https://atypikhous.herokuapp.com/home");
    cy.get('img[alt="reserve"]').scrollIntoView().as("reservation").click();
    cy.get("#date_open").type("2021-05-06");
    cy.get("#date_close").type("2021-05-28");
    cy.contains("Valider").click();
    cy.contains("Confirmer reservation").click();
    cy.contains("Payer").click();
    cy.contains("Payer").click();
  });

  //Consulter sa liste des reservations
  it("Consulter la liste des reservations", function () {
    cy.visit("https://atypikhous.herokuapp.com/");
    cy.visit("https://atypikhous.herokuapp.com/mes_reservations");
  });

  //Ajouter une annonce aux favoris
  it("Ajouter une annonce dans les favoris", function () {
    cy.visit("https://atypikhous.herokuapp.com/");
    cy.visit("https://atypikhous.herokuapp.com/home");
    cy.get('img[alt="like"]').scrollIntoView().as("reservation").click();
  });

  //Consulter la liste des favoris
  it("Consulter la liste des favoris", function () {
    cy.visit("https://atypikhous.herokuapp.com/");
    cy.visit("https://atypikhous.herokuapp.com/mes_reservations");
  });

  // Connexion propriétaire
  it("Connexion", function () {
    cy.visit("https://atypikhous.herokuapp.com/");
    cy.visit("https://atypikhous.herokuapp.com/profil_pro");
    cy.get("#login").click();
    cy.get("#email").type("merithndolo@gmail.com");
    cy.get("#password").type("12345678");
    cy.contains("Se connecter").click();
  });

  //creation d'une annonce
  it("Créer une annonce", function () {
    cy.visit("https://atypikhous.herokuapp.com/");
    cy.visit("https://atypikhous.herokuapp.com/profil_pro");
    cy.get("#titre").type("la belle vie");
    cy.get("select").select("yourte");
    cy.get("#superficie").type(10);
    cy.get("select.#departement").select("YVELINES");
    cy.get("#lng").type("1.23456");
    cy.get("#lat").type("5.23456");
    cy.get("#prix").type(250);
    cy.get("#date_open").type("2021-05-06");
    cy.get("#date_close").type("2021-05-28");
    cy.get("#exampleFormControlTextarea2").type("Description...");
    cy.get('input[type="file"]').attachFile({
      fileContent: fileContent.toString(),
      fileName: "testPicture.png",
      mimeType: "image/png",
    });
    cy.contains("Envoyer").click();
  });
});
