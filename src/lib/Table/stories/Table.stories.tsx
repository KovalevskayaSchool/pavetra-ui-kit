import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TrashOutline } from "@kovalevskayaschool/pavetra-icons";

import { Table, Selection } from "..";
import { Typography } from "../../Typography";
import { Button } from "../../Button";
import { Avatar } from "../../Avatar";

// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: "Views/Table",
  component: Table,
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

let columns = [
  { name: "Name", key: "name" },
  { name: "Type", key: "type" },
  { name: "Date Modified", key: "date" },
];

let rows = [
  { id: 1, name: "Games", date: "6/7/2020", type: "File folder" },
  { id: 2, name: "Program Files", date: "4/7/2021", type: "File folder" },
  { id: 3, name: "bootmgr", date: "11/20/2010", type: "System file" },
  { id: 4, name: "log.txt", date: "1/18/2016", type: "Text Document" },
  { id: 5, name: "Games1", date: "6/7/2020", type: "File folder" },
  { id: 6, name: "Program2 Files", date: "4/7/2021", type: "File folder" },
  { id: 7, name: "bootmgr3", date: "11/20/2010", type: "System file" },
  { id: 8, name: "log.txt4", date: "1/18/2016", type: "Text Document" },
];

let users = [
  {
    id: 1,
    name: (
      <div>
        <Avatar
          size={14}
          imageSrc="https://pbs.twimg.com/profile_images/1154161382239039488/Svox2ZEF_normal.png"
        />
        <span>Alex</span>
      </div>
    ),
    date: "6/7/2020",
    type: "File folder",
  },
  {
    id: 2,
    name: (
      <div>
        <Avatar
          size={14}
          imageSrc="https://pbs.twimg.com/profile_images/1154161382239039488/Svox2ZEF_normal.png"
        />
        <span>Steve</span>
      </div>
    ),
    date: "4/7/2021",
    type: "File folder",
  },
  {
    id: 3,
    name: (
      <div>
        <Avatar
          size={14}
          imageSrc="https://pbs.twimg.com/profile_images/1154161382239039488/Svox2ZEF_normal.png"
        />
        <span>Dmitriy</span>
      </div>
    ),
    date: "11/20/2010",
    type: "System file",
  },
  {
    id: 4,
    name: (
      <div>
        <Avatar
          size={14}
          imageSrc="https://pbs.twimg.com/profile_images/1154161382239039488/Svox2ZEF_normal.png"
        />
        <span>Jack</span>
      </div>
    ),
    date: "1/18/2016",
    type: "Text Document",
  },
];

let columnsWithSort = [
  { name: "Name", key: "name", allowsSorting: true },
  { name: "Type", key: "type", allowsSorting: true },
  { name: "Date Modified", key: "date", allowsSorting: true },
];
// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const Default: Story = {
  args: {
    dataSource: rows,
    columns,
  },
};

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args
export const CustomRow: Story = {
  args: {
    dataSource: users,
    columns,
  },
};

const ControlledComponent = () => {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([2]));

  return (
    <div style={{ display: "flex" }}>
      <div>
        <Typography.Title level={3}>multiple</Typography.Title>
        <Button onClick={() => setSelectedKeys(new Set([]))}>Reset</Button>
        <Table
          dataSource={rows}
          columns={columns}
          selectionMode="multiple"
          onSelectionChange={setSelectedKeys}
          selectedKeys={selectedKeys}
        />
      </div>
      <div>
        <Typography.Title level={3}>single</Typography.Title>
        <Table dataSource={rows} columns={columns} selectionMode="single" />
      </div>
    </div>
  );
};

export const SelectionMode: Story = {
  args: {
    dataSource: rows,
    columns,
  },
  render: ControlledComponent,
};

export const Sort: Story = {
  args: {
    dataSource: rows,
    columns: columnsWithSort,
    onSortChange(sort) {
      console.log(sort);
    },
    sortDescriptor: {
      column: "name",
      direction: "ascending",
    },
  },
};

// RESIZE

let actionColumns = [
  { name: "Name", key: "name" },
  { name: "Type", key: "type" },
  { name: "Date Modified", key: "date" },
  {
    name: "Actions",
    key: "actions",
    render: (item, columnKey) => {
      return <Button icon={<TrashOutline />} variant="link" danger onClick={() => console.log(item)}>Remove</Button>;
    },
  },
];

let actionRows = [
  {
    id: 1,
    name: "Games",
    date: "6/7/2020",
    type: "File folder",
    actions: "act",
  },
  {
    id: 2,
    name: "Program Files",
    date: "4/7/2021",
    type: "File folder",
    actions: "act",
  },
  {
    id: 3,
    name: "bootmgr",
    date: "11/20/2010",
    type: "System file",
    actions: "act",
  },
  {
    id: 4,
    name: "log.txt",
    date: "1/18/2016",
    type: "Text Document",
    actions: 'ddd',
  },
  {
    id: 5,
    name: "log.txt",
    date: "1/18/2016",
    type: "Text Document",
    actions: 'second',
  },
];

const ActionsComponent = () => {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([2]));

  return (
    <div style={{ display: "flex" }}>
      <div>
        <Table
          dataSource={actionRows}
          columns={actionColumns}
          onSelectionChange={setSelectedKeys}
          selectedKeys={selectedKeys}
        />
      </div>
    </div>
  );
};

export const Actions: Story = {
  args: {
    dataSource: actionRows,
    columns: actionColumns,
    pagination: true,
  },
  render: ActionsComponent,
};
