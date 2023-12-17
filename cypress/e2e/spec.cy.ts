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

    const bun = getElement("bun-0");
    const sauce = getElement("sauce-0");
    const main = getElement("main-0");
    const constructor = getElement("constructor");

    bun.trigger("dragstart");
    constructor.trigger("drop");
    sauce.trigger("dragstart");
    constructor.trigger("drop");
    main.trigger("dragstart");
    constructor.trigger("drop");

    getElement("submit").click();
    cy.wait(20000);
    cy.contains("начали готовить").should("be.visible");

    getElement("close").click();

    getElement("modal").should("not.exist");
  });
});
