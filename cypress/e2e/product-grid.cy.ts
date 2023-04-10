describe("Products rendering", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("Visit homepage", () => {
    cy.get("h1").should("contain", "Our local products");

    // To remove once pagination is introduced.
    cy.get('[data-test="totalProducts"]').then((el) => {
      const count = Number(el.text());

      cy.get("article").should("have.length", count);
    });
  });

  it("Check modal", () => {
    cy.get("article")
      .first()
      .find('[data-test="productTitle"]')
      .then((el) => {
        const title = el.text();

        // Open modal
        cy.get('[data-test="productGrid"]')
          .find("article")
          .first()
          .find("button")
          .first()
          .click();

        // Should be focused to modal
        cy.focused().should(
          "have.attr",
          "aria-label",
          `Product modal for ${title}`
        );

        // Should return focus back to product title
        cy.focused().trigger("keydown", { keyCode: 27 });
        cy.focused().should("contain", title);
      });
  });
});
