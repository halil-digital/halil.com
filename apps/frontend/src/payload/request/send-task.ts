export interface SendTask {
  note: string;
  date: string; // "YYYY-MM-DD"
  hour: string; // "hh:mm:ss"
  client: { id: number };
}
