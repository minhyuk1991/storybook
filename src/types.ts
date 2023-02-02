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
