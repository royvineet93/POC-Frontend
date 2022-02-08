import { Item } from './item';

export class Invoice {
  _id?: number;
  clientName: string;
  invoiceNo: string;
  invoiceDate: Date;
  dueDate: Date;
  PONo: string;
  PODate: Date;
  paymentTerms: string;
  termsAndConditions: string;
  privacyNotes: string
  items: Item[];
  status: string;
}
