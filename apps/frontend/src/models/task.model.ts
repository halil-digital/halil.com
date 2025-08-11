import { Client } from "./client.model";

export interface Task {
  id: number;
  note: string;
  date: string; // "YYYY-MM-DD"
  hour: string; // "hh:mm:ss"
  client: Client;
}
