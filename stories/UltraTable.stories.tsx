import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { UltraTable } from "../src";
import "@ant-design/v5-patch-for-react-19";
import { Button } from "antd";
import type { TableColumnType } from "antd";
import { useUltraTable } from "../src/UltraTable";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/UltraTable",
  component: UltraTable,
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
} satisfies Meta<typeof UltraTable>;

export default meta;
type Story = StoryObj<typeof meta>;

interface DataType {
  id: number;
  name: string;
}

const genList = (current, pageSize) => {
  const list: Array<{
    id: number;
    name: string;
  }> = [];
  for (let i = 0; i < pageSize; i++) {
    const fakeId = (current - 1) * pageSize + i + 1;
    list.push({
      id: fakeId,
      name: `No. ${fakeId}`,
    });
  }
  return list;
};

const columns: TableColumnType<any>[] = [
  {
    title: "ID",
    width: 80,
    dataIndex: "id",
  },
  {
    title: "name",
    dataIndex: "name",
    width: 80,
  },
];

const fakeFetch = (params: { current: number; pageSize: number }) => {
  const { current, pageSize } = params;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        list: genList(current, pageSize),
        total: 100,
      });
    }, 1000);
  });
};

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const BasicUsage: Story = {
  args: {},
  render: function Render(args) {
    return <UltraTable columns={columns} request={fakeFetch} />;
  },
};

export const DispatchRequestManually: Story = {
  args: {},
  render: function Render(args) {
    const { refreshKey, dispatchRefresh } = useUltraTable();
    return (
      <>
        <Button
          onClick={dispatchRefresh}
          style={{
            marginBottom: "20px",
          }}
        >
          Refresh
        </Button>
        <UltraTable
          columns={columns}
          request={fakeFetch}
          refreshDeps={[refreshKey]}
        />
      </>
    );
  },
};
