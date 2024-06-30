import { Icon, Color, Priority, OrderBy } from "../common/enums";

export interface User {
  id: string;
  name: string;
  password: string;
}

export interface List {
  id: string;
  createdTime?: any;
  userId: string;
  name: string;
  orderBy: keyof typeof OrderBy;
  icon: keyof typeof Icon;
  color: keyof typeof Color;
  items: Item[];
  sections: Section[];
  isPreset?: boolean;
}

export interface PresetList {
  id: string;
  name: string;
  color: keyof typeof Color;
  icon: keyof typeof Icon;
  orderBy: OrderBy;
  isPreset: boolean;
  items: Item[];
}

export interface Section {
  id: string;
  list: List;
  listId: string;
  name: string;
  items: Item[];
}

export interface Item {
  id?: string;
  createdTime?: any;
  updatedTime?: any;
  checked: boolean;
  title: string;
  memo?: string;
  url?: string;
  dateTime?: any;
  hasTime?: boolean;
  tags: Tag[];
  priority: Priority;
  flagged: boolean;
  list?: List;
  listId: string;
  section?: Section;
  sectionId?: string;
  image_url?: string;
  subItems: SubItem[];
  isNewItem?: boolean;
}

export interface SubItem {
  id: string;
  item?: Item;
  itemId: string;
  updatedTime: any;
  checked: boolean;
  title: string;
}

export interface Tag {
  id: string;
  name: string;
  items?: Item[];
}