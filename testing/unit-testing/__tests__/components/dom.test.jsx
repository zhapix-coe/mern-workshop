import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { DOMTesting } from "../../src/components/dom";

describe("dom testing with react testing library", () => {
  test("validate the use of queries with scope", async () => {
    render(<DOMTesting />);
    const statusElem = screen.getByTitle(/Status/);
    // ASSERT
    expect(statusElem).toHaveTextContent("Status:NO");
    await userEvent.click(screen.getByRole("button"));
    expect(statusElem).toHaveTextContent("Status:YES");
    await userEvent.click(screen.getByRole("button"));
    expect(screen.getByTestId("root")).toMatchSnapshot();
  });

  test("validate querying within element scope", () => {
    const { getByRole } = render(<DOMTesting />);
    const connectContainer = getByRole("status-container");
    const statusElem = within(connectContainer).getByLabelText(
      "Connect Status",
      { selector: "span" }
    );
    expect(statusElem).toHaveTextContent(/Status:NO/);
  });
});
