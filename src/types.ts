export type EventMouse = MouseEvent & {
  currentTarget: EventTarget & HTMLElement;
};

export type TabItem = { name: string; isChecked: boolean };
export type TabItems = TabItem[];
