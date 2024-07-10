export interface Transaction {
  _id?: string;
  from: string;
  to: string;
  amount: number;
  date: Date;
}
