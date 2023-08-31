export enum Filter {
  All,
  Active,
  Completed,
}

export interface FilterButton {
  type: Filter;
  label: string;
  isActive: boolean;
}
