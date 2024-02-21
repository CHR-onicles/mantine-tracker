import { Transaction } from "@customTypes/index";


const generateRandomTransaction = (): Transaction => {
  const types = ["income", "expense", "investment"];
  const randomType = types[Math.floor(Math.random() * types.length)];

  // Generate a random amount between 100 and 1000
  const amount = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;

  // Generate a random timestamp within the last year
  const startDate = new Date();
  startDate.setFullYear(startDate.getFullYear() - 1);
  const endDate = new Date();
  const randomTimestamp = new Date(
    startDate.getTime() +
      Math.random() * (endDate.getTime() - startDate.getTime())
  );

  const transaction: Transaction = {
    id: Math.floor(Math.random() * 1000) + 1, // Random ID
    type: randomType,
    amount: amount,
    timestamp: randomTimestamp,
  };

  return transaction;
};

// Generate 10 random transactions
export const generateRandomTransactions = (count: number): Transaction[] => {
  const transactions: Transaction[] = [];
  for (let i = 0; i < count; i++) {
    transactions.push(generateRandomTransaction());
  }
  return transactions;
};

// Example usage:
// const randomTransactions = generateRandomTransactions(10);
// console.log(randomTransactions);

export const colors: Record<string, string> = {
  income: "green",
  investment: "blue",
  expense: "pink",
};
