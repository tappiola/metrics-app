import "./commands";
import { mount } from "cypress/react18";

declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof mount;
      customMount: typeof mount;
      getByTestId(testId: string): Chainable;
    }
  }
}
