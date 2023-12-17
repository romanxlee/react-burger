describe("template spec", () => {
  const getElement = (selector: string) => {
    return cy.get(`[data-testid=${selector}]`);
  };
  before(function () {
    cy.visit("http://localhost:3000");
  });

  it("should render correctly", () => {
    cy.contains("Соберите бургер");
    getElement("submit").should("be.disabled");
  });

  it("should create order correctly", () => {
    cy.visit("/login");
    getElement("login-email").type("test_user@te.ru");
    getElement("login-password").type("pass");
    getElement("login-submit").click();
  });
});
