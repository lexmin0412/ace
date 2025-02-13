import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Copyable } from "../src";
import '@ant-design/v5-patch-for-react-19';
import { Button } from "antd";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Copyable",
  component: Copyable,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    // backgroundColor: { control: 'color' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof Copyable>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const BasicUsage: Story = {
  args: {
    content: "测试内容",
    children: <Button>点我复制</Button>,
  },
  render: function Render(args) {
    const content = args.content;
    return (
      <Copyable content={content}>
        {args.children}
      </Copyable>
    );
  },
};
