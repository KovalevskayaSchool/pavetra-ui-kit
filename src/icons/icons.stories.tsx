import {
  Whatsapp,
  EditOutline,
  EyeOffOutline,
  EyeOutline,
  Telegram,
  TrashOutline,
  Instagram,
  PaperPlaneOutline,
  PeopleOutline,
  PersonOutline,
  PlusOutline,
  AttachOutline,
  SearchOutline,
  SettingsOutline,
  Skype,
  SunOutline,
  DoneAllOutline,
  GridOutline,
  LogOutOutline,
  CalendarOutline,
  CheckmarkOutline,
  ChevronDownOutline,
  ChevronLeftOutline,
  ChevronRightOutline,
  ChevronUpOutline,
  CircleOutline,
  CloseOutline,
  CreditCardOutline,
  Viber,
  Vk,
  MoreVerticalOutline,
  BellOutline,
  BookOutline,
  BookmarkOutline,
  MenuArrowOutline,
  MenuOutline,
  MessageCircleOutline,
  MoonOutline,
  MoreHorizontalOutline,
  RefreshOutline,
  CalendarEmptyOutline,
  CalendarPlusOutline,
  CheckVerifiedOutline,
  ChevronLeftDoubleOutline,
  ChevronRightDoubleOutline,
  ChartOutline,
  ClockOutline,
  CopyOutline,
} from "@symblight/pavetra-icons";

import styles from "./styles.module.css";

import type { Meta, StoryObj } from "@storybook/react";
// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
  title: "Views/Icons",
  tags: ["autodocs"],
} satisfies Meta<typeof MoreHorizontalOutline>;

export default meta;
type Story = StoryObj<typeof meta>;

const icons = [
  ChartOutline,
  ClockOutline,
  Whatsapp,
  EditOutline,
  EyeOffOutline,
  EyeOutline,
  Telegram,
  TrashOutline,
  Instagram,
  PaperPlaneOutline,
  PeopleOutline,
  PersonOutline,
  PlusOutline,
  AttachOutline,
  SearchOutline,
  SettingsOutline,
  Skype,
  SunOutline,
  DoneAllOutline,
  GridOutline,
  LogOutOutline,
  CalendarOutline,
  CheckmarkOutline,
  ChevronDownOutline,
  ChevronLeftOutline,
  ChevronRightOutline,
  ChevronUpOutline,
  CircleOutline,
  CloseOutline,
  CreditCardOutline,
  Viber,
  Vk,
  MoreVerticalOutline,
  BellOutline,
  BookOutline,
  BookmarkOutline,
  MenuArrowOutline,
  MenuOutline,
  MessageCircleOutline,
  MoonOutline,
  MoreHorizontalOutline,
  RefreshOutline,
  CalendarEmptyOutline,
  CalendarPlusOutline,
  CheckVerifiedOutline,
  ChevronLeftDoubleOutline,
  ChevronRightDoubleOutline,
  CopyOutline,
];
export const Default: Story = {
  render: () => (
    <div style={{ fontSize: "2rem" }} className={styles["icons"]}>
      {icons.map((Icon) => (
        <div className={styles["icon"]} key={Icon.name}>
          <Icon title={Icon.name} />
          <span className={styles["icon__label"]}>{`<${Icon.name} />`}</span>
        </div>
      ))}
    </div>
  ),
};
