import React from "react";
import Login from "./Login";
import { Uri } from "../../constants";

describe("<Login />", () => {
  beforeEach(() => {
    cy.intercept("POST", "http://localhost:3001/auth/login", (req) => {
      req.reply({
        status: 200,
        body: {
          access_token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJjMDk3MTNmMy01YTJhLTQ4NGQtOWQzYi1hM2M3NGRiNzAwNDgiLCJpYXQiOjE3MDU4MzEyNjYsImV4cCI6MTcwNTgzNDg2Nn0.Jy-USS0FH4RvVv_oXCI_kaBdbN_Ror6VgiW9Sq-1RAE",
        },
      });
    }).as("login");
  });

  it("logins successfully", () => {
    cy.customMount(<Login />);

    cy.getByTestId("email").type("test@test.com");
    cy.getByTestId("password").type("NovataPass");
    cy.getByTestId("login-button").click();

    cy.wait("@login").then(({ request }) => {
      expect(request.body.email).to.equal("test@test.com");
      expect(request.body.password).to.equal("NovataPass");
      cy.location().should((location) => {
        expect(location.pathname).to.eq(Uri.Reports);
      });
    });
  });

  it("can't login with empty fields", () => {
    cy.customMount(<Login />);

    cy.getByTestId("login-button").click();

    cy.contains("Email is required").should("be.visible");
    cy.contains("Password is required").should("be.visible");
  });
});
