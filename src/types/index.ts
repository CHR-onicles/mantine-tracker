export interface Transaction {
  id: number;
  type: "income" | "expense" | "investment" | string;
  amount: number;
  timestamp: Date;
  action?: string;
  _?: string;
}
