type ItemProps = {
  id?: string;
  label?: string | React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  type?: "divider" | "item";
};

export type MenuItemProps = ItemProps;
