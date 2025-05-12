export interface Saving {
  id: string; // UUID
  promotional: number;
  date: string;
  category: string;
}

export interface Goal {
  id: string;
  goal: string;
  targetAmount: number;
  currentAmount: number;
  startDate: string;
  endDate?: string;
  savingId: number;
}
