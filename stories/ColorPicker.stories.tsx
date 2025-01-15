import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { ColorPicker } from "../src";
import { Button } from "antd";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/ColorPicker",
  component: ColorPicker,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // labelForSelected: { control: 'color' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onChange: fn() },
} satisfies Meta<typeof ColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const BasicUsage: Story = {
  args: {
    children: <>请选择</>,
  },
  render: function Render(args) {
    const [color, setColor] = useState("#000");

    const handleChange = (value: string) => {
      setColor(value);
    };

    return (
      <>
        <ColorPicker value={color} onChange={handleChange}>
          <Button
            style={{ color: color, borderColor: color, marginRight: "20px" }}
          >
            Pick Color
          </Button>
        </ColorPicker>
        <span style={{ color: color }}>currentColor: {color}</span>
      </>
    );
  },
};

export const CustomCurrentLabel: Story = {
  args: {
    labelForSelected: "Using",
    children: <>请选择</>,
  },
  render: () => {
    const [color, setColor] = useState('#000');
  
    const handleChange = (value: string) => {
      setColor(value);
    };
  
    return (
      <>
        <ColorPicker
          labelForSelected="Using"
          value={color}
          onChange={handleChange}
        >
          <Button
            style={{ color: color, borderColor: color, marginRight: '20px' }}
          >
            Pick Color
          </Button>
        </ColorPicker>
        <span style={{ color: color }}>currentColor: {color}</span>
      </>
    );
  }
}