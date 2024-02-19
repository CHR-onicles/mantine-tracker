export interface Transaction {
  id: number;
  type: "income" | "expense" | "investment";
  amount: number;
  timestamp: Date;
  action?: string;
  _?: string;
}
