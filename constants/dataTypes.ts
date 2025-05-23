export interface Saving {
  id: string;
  promotion: number;
  date: string;
  category: string;
}

export interface Goal {
  id: string;
  goal: string;
  targetAmount: number;
  startDate: string;
  endDate?: string;
}

export const SAVINGS_KEY = "savings";
export const GOAL_KEY = "goal";
