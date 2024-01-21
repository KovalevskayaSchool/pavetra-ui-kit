import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "../lib/Typography";

import "./color.css";
// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: "Colors",
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

function getVariable(element, variable, reader = String) {
  const style = window.getComputedStyle(element);
  return reader(style.getPropertyValue(variable).trim());
}
const root = document.querySelector("body");

function getRootCSSVariables() {
  const rootVariables = [];
  const styleSheetsArray = Array.from(document.styleSheets);

  for (const styleSheet of styleSheetsArray) {
    const cssRules = styleSheet.cssRules || styleSheet.rules;

    if (cssRules) {
      // @ts-ignore
      for (const rule of cssRules) {
        if (rule.selectorText === ":root") {
          const declarations = rule.style;
          for (let i = 0; i < declarations.length; i++) {
            const propertyName = declarations[i];

            if (propertyName.startsWith("--pv-color")) {
              const propertyValue = declarations.getPropertyValue(propertyName);
              // @ts-ignore
              rootVariables.push({ name: propertyName, value: propertyValue });
            }
          }
        }
      }
    }
  }

  return rootVariables;
}

function ColorBlock({ value, name }) {
  return (
    <div className="color-block" style={{ backgroundColor: value }}>
      <span>{name}</span>
    </div>
  );
}

const CSSVariables = getRootCSSVariables();

export const Default: Story = {
  render: () => (
    <div>
      <Typography.Title>Colors</Typography.Title>
      {CSSVariables?.map(({ name, value }) => (
        <ColorBlock key={value + name} value={value} name={name} />
      ))}
    </div>
  ),
};
