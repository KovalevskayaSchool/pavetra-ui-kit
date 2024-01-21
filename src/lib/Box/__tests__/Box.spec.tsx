import React from "react";
import { render } from "@testing-library/react";

import { Box } from "../Box";

describe("Box", () => {
  test("should render component", () => {
    const { container } = render(<Box />);

    expect(container).toMatchSnapshot();
  });
});
