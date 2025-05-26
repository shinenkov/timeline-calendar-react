export type Department = {
  id: number;
  manager?: string;
  name: string;
};

export type User = {
  id: number;
  name: string;
  department?: string | number;
};
