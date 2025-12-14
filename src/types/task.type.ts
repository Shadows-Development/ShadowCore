export type Task = {
  name: string;
  interval: number;
  timer: NodeJS.Timeout;
  callback: () => void;
};
