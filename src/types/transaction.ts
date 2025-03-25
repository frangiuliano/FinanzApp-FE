export type Transaction = {
  _id: string;
  amount: number;
  type: "income" | "expense";
  category: string;
  method: "credit card" | "debit card" | "cash" | "transfer";
  installments: boolean;
  installmentCount?: number;
  currentInstallment?: number;
  installmentGroupId?: string;
  description?: string;
  date: string;
  createdBy: string;
  spaceId: string;
  sharedWith: string[];
  status: "pending" | "completed" | "cancelled";
};
