import React from 'react'
import { render } from "@testing-library/react";

import { Avatar } from "../Avatar";

describe("Avatar", () => {
  test("should render component", () => {
    const { container } = render(<Avatar />);

    expect(container).toMatchSnapshot();
  });
});
