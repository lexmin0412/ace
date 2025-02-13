import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RuleEditor } from "../src";
import "@ant-design/v5-patch-for-react-19";
import type { ILogicRule, IProperty } from "../src/RuleEditor";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/RuleEditor",
  component: RuleEditor,
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
} satisfies Meta<typeof RuleEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const BasicUsage: Story = {
  args: {},
  render: () => {
    const DefaultValue = {
      any: [
        {
          all: [
            { fact: "category", operator: "equal", value: "basic" },
            { fact: "count", operator: "greaterThanInclusive", value: 5 },
          ],
        },
        {
          all: [
            { fact: "category", operator: "equal", value: "advanced" },
            { fact: "count", operator: "notEqual", value: 5 },
          ],
        },
      ],
    };

    const DefaultProperties: IProperty[] = [
      {
        title: "分类",
        code: "category",
        type: "String",
        widget: "select",
        controlProps: {
          options: [
            {
              label: "基本信息",
              value: "basic",
            },
            {
              label: "高级配置",
              value: "advanced",
            },
          ],
        },
      },
      {
        title: "使用次数",
        code: "count",
        type: "Numeric",
        widget: "number",
        controlProps: {
          min: 0,
          max: 100,
          step: 1,
        },
      },
    ];

    const [value, setValue] = React.useState<ILogicRule>(DefaultValue);
    const onChange = (newValue: ILogicRule) => {
      setValue(newValue);
    };
    return (
      <>
        <RuleEditor
          properties={DefaultProperties}
          value={value}
          onChange={onChange}
        />

        <div
          style={{
            marginTop: "20px",
          }}
        >
          规则：{JSON.stringify(value, null, 2)}
        </div>
      </>
    );
  },
};
