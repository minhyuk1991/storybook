export type EventMouse = MouseEvent & {
  currentTarget: EventTarget & HTMLElement;
};

export type TabItem = { name: string; isChecked: boolean };
export type TabItems = TabItem[];

export type Folder = {
  name: string;
  children: Array<Folder>;
};

export type RootFolder = Folder[];

export type MockData = {
  hostName: string;
  top: number;
  cpu: number;
  mem: number;
  swap: number;
  disk: number;
  diskName: string;
};

export type MockDataColumn = {
  width: number;
  dataName: string;
  display: string;
};
