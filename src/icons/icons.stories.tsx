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
} from '@kovalevskayaschool/pavetra-icons'


import type { Meta, StoryObj } from '@storybook/react';
// More on how to set up stories at: https://storybook.js.org/docs/7.0/react/writing-stories/introduction
const meta = {
    title: 'Views/Icons',
    tags: ['autodocs'],
} satisfies Meta<typeof MoreHorizontalOutline>;

export default meta;
type Story = StoryObj<typeof meta>;

const imageSrc = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Rembrandt_Self-portrait_%28Kenwood%29.jpg/800px-Rembrandt_Self-portrait_%28Kenwood%29.jpg"

// More on writing stories with args: https://storybook.js.org/docs/7.0/react/writing-stories/args

const icons = [
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
    RefreshOutline
]
export const Default: Story = {
    render: () => (
        <div style={{fontSize: '2rem'}}>
           {icons.map((Icon) => <Icon key={Icon.name} title={Icon.name} />)}
        </div>
    )
};


