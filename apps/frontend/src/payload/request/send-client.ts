export interface SendClient {
  name: string;
  address: string;
  email?: string;
  phone?: string;
  manager?: string;
  main_contact?: string;
  accountant?: string;
  accountant_phone?: string;
  commercial?: string;
  note?: string;
  open?: boolean;
}
