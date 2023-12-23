import React from 'react'
import { render } from "@testing-library/react";

import { Badge } from "../Badge";

describe("Badge", () => {
  test("should render component", () => {
    const { container } = render(<Badge />);

    expect(container).toMatchSnapshot();
  });
});
